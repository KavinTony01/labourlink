import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JobTypeConfig, JOB_TYPES, JOB_CATEGORIES, JOB_SKILLS, PriceGuidance } from '../models/job-type.model';

@Injectable({
  providedIn: 'root'
})
export class JobTypeService {
  private jobTypes$ = new BehaviorSubject<JobTypeConfig[]>(JOB_TYPES);
  private categories$ = new BehaviorSubject<string[]>(JOB_CATEGORIES);

  constructor() {}

  /**
   * Get all job types
   */
  getAllJobTypes(): JobTypeConfig[] {
    return this.jobTypes$.value;
  }

  /**
   * Get all job types as observable
   */
  getJobTypes$(): Observable<JobTypeConfig[]> {
    return this.jobTypes$.asObservable();
  }

  /**
   * Get job types by category
   */
  getJobTypesByCategory(category: string): JobTypeConfig[] {
    return this.jobTypes$.value.filter(t => t.category === category);
  }

  /**
   * Get single job type by ID
   */
  getJobType(typeId: string): JobTypeConfig | undefined {
    return this.jobTypes$.value.find(t => t.id === typeId);
  }

  /**
   * Get all categories
   */
  getCategories(): string[] {
    return this.categories$.value;
  }

  /**
   * Get categories as observable
   */
  getCategories$(): Observable<string[]> {
    return this.categories$.asObservable();
  }

  /**
   * Get skills for a specific job type
   */
  getSkillsForType(typeId: string): string[] {
    const jobType = this.getJobType(typeId);
    return jobType ? jobType.skillsRequired : [];
  }

  /**
   * Get price guidance for a job type
   */
  getPriceGuidance(typeId: string): PriceGuidance | undefined {
    const jobType = this.getJobType(typeId);
    return jobType ? jobType.priceGuidance : undefined;
  }

  /**
   * Get suggested questions for a job type
   */
  getSuggestedQuestions(typeId: string): string[] {
    const jobType = this.getJobType(typeId);
    return jobType ? jobType.suggestedQuestions : [];
  }

  /**
   * Get estimated duration for a job type
   */
  getEstimatedDuration(typeId: string): string | undefined {
    const jobType = this.getJobType(typeId);
    return jobType ? jobType.estimatedDuration : undefined;
  }

  /**
   * Check if insurance is recommended
   */
  isInsuranceRecommended(typeId: string): boolean {
    const jobType = this.getJobType(typeId);
    return jobType ? jobType.insuranceRecommended : false;
  }

  /**
   * Create new job type (for admin)
   */
  createJobType(config: JobTypeConfig): void {
    const currentTypes = this.jobTypes$.value;
    if (!currentTypes.find(t => t.id === config.id)) {
      const updatedTypes = [...currentTypes, config];
      this.jobTypes$.next(updatedTypes);
      this.updateCategories();
    }
  }

  /**
   * Update job type (for admin)
   */
  updateJobType(typeId: string, config: Partial<JobTypeConfig>): void {
    const currentTypes = this.jobTypes$.value;
    const index = currentTypes.findIndex(t => t.id === typeId);
    if (index !== -1) {
      const updatedTypes = [...currentTypes];
      updatedTypes[index] = { ...updatedTypes[index], ...config };
      this.jobTypes$.next(updatedTypes);
      this.updateCategories();
    }
  }

  /**
   * Delete job type (for admin)
   */
  deleteJobType(typeId: string): void {
    const currentTypes = this.jobTypes$.value;
    const filtered = currentTypes.filter(t => t.id !== typeId);
    this.jobTypes$.next(filtered);
    this.updateCategories();
  }

  /**
   * Search job types by name
   */
  searchJobTypes(query: string): JobTypeConfig[] {
    const lowerQuery = query.toLowerCase();
    return this.jobTypes$.value.filter(t =>
      t.name.toLowerCase().includes(lowerQuery) ||
      t.description.toLowerCase().includes(lowerQuery) ||
      t.category.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Get all available skills
   */
  getAllSkills(): string[] {
    return JOB_SKILLS;
  }

  /**
   * Private helper to update categories
   */
  private updateCategories(): void {
    const categories = Array.from(new Set(this.jobTypes$.value.map(t => t.category)));
    this.categories$.next(categories);
  }
}
