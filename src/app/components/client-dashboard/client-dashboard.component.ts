import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {
  currentUser: User | null = null;
  jobs: Job[] = [];
  
  // Statistics
  totalJobsPosted: number = 0;
  activeJobs: number = 0;
  completedJobs: number = 0;
  totalSpent: number = 0;
  
  // View state
  showPostJobForm: boolean = false;
  selectedFilter: 'all' | 'open' | 'booked' | 'completed' | 'cancelled' = 'all';
  selectedJobForDetail: Job | null = null;
  showJobDetail: boolean = false;
  
  constructor(private authService: AuthService, private jobService: JobService) {}
  
  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.loadJobs();
  }
  
  private loadJobs() {
    this.jobService.jobs$.subscribe(jobs => {
      this.jobs = jobs.filter(j => j.postedBy.id === this.currentUser?.id);
      this.calculateStatistics();
    });
  }
  
  private calculateStatistics() {
    this.totalJobsPosted = this.jobs.length;
    this.activeJobs = this.jobs.filter(j => j.status === 'open' || j.status === 'booked').length;
    this.completedJobs = this.jobs.filter(j => j.status === 'completed').length;
    this.totalSpent = this.jobs.reduce((sum, j) => sum + j.pay, 0);
  }
  
  getFilteredJobs(): Job[] {
    if (this.selectedFilter === 'all') return this.jobs;
    return this.jobs.filter(j => j.status === this.selectedFilter);
  }

  viewJobDetail(job: Job): void {
    this.selectedJobForDetail = job;
    this.showJobDetail = true;
  }

  closeJobDetail(): void {
    this.showJobDetail = false;
    this.selectedJobForDetail = null;
  }

  editJob(job: Job): void {
    // TODO: Implement edit job functionality
    alert('Edit job functionality coming soon');
  }

  cancelJob(job: Job): void {
    if (confirm(`Cancel job "${job.type}"? This action cannot be undone.`)) {
      // Update job status to cancelled
      const jobs = this.jobs.map(j => 
        j.id === job.id ? { ...j, status: 'cancelled' as const } : j
      );
      this.jobService.jobs$ as any; // Just trigger update
      alert('Job cancelled successfully');
      this.loadJobs();
    }
  }

  reopenJob(job: Job): void {
    if (confirm(`Reopen job "${job.type}"? This will reset the job to open status and clear the assigned worker.`)) {
      // Update job status to open and clear worker assignment
      const jobs = this.jobs.map(j => 
        j.id === job.id ? { ...j, status: 'open' as const, worker: null, rating: undefined, review: undefined, completedDate: undefined } : j
      );
      this.jobService.jobs$ as any; // Just trigger update
      alert('Job reopened successfully');
      this.closeJobDetail();
      this.loadJobs();
    }
  }
  
  openPostJobForm() {
    this.showPostJobForm = true;
  }
  
  closePostJobForm() {
    this.showPostJobForm = false;
  }
}
