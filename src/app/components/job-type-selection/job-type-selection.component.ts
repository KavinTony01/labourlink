import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { JobTypeService } from '../../services/job-type.service';
import { JobTypeConfig } from '../../models/job-type.model';

@Component({
  selector: 'app-job-type-selection',
  templateUrl: './job-type-selection.component.html',
  styleUrls: ['./job-type-selection.component.css']
})
export class JobTypeSelectionComponent implements OnInit {
  @Input() selectedTypeId: string | null = null;
  @Output() selectionChange = new EventEmitter<JobTypeConfig>();
  
  categories: string[] = [];
  selectedCategory: string = '';
  jobTypesInCategory: JobTypeConfig[] = [];
  searchText: string = '';
  selectedJobType: JobTypeConfig | null = null;
  showDetails: boolean = false;
  
  constructor(private jobTypeService: JobTypeService) {}
  
  ngOnInit() {
    this.categories = this.jobTypeService.getCategories();
    if (this.categories.length > 0) {
      this.selectCategory(this.categories[0]);
    }
  }
  
  selectCategory(category: string) {
    this.selectedCategory = category;
    this.jobTypesInCategory = this.jobTypeService.getJobTypesByCategory(category);
    this.searchText = '';
  }
  
  selectJobType(jobType: JobTypeConfig) {
    this.selectedJobType = jobType;
    this.selectedTypeId = jobType.id;
    this.selectionChange.emit(jobType);
  }
  
  getFilteredJobTypes(): JobTypeConfig[] {
    if (!this.searchText) {
      return this.jobTypesInCategory;
    }
    return this.jobTypesInCategory.filter(t =>
      t.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  
  toggleDetails(jobType: JobTypeConfig) {
    if (this.selectedJobType?.id === jobType.id) {
      this.showDetails = !this.showDetails;
    } else {
      this.selectJobType(jobType);
      this.showDetails = true;
    }
  }
}
