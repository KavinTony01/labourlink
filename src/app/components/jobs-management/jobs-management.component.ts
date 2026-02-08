import { Component, Input, OnInit } from '@angular/core';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-jobs-management',
  templateUrl: './jobs-management.component.html',
  styleUrls: ['./jobs-management.component.css']
})
export class JobsManagementComponent implements OnInit {
  @Input() jobs: Job[] = [];
  
  filteredJobs: Job[] = [];
  searchText: string = '';
  filterStatus: string = '';
  selectedJobForDetail: Job | null = null;
  showJobDetail: boolean = false;
  
  ngOnInit() {
    this.filteredJobs = this.jobs;
  }
  
  applyFilters() {
    this.filteredJobs = this.jobs.filter(job => {
      const searchMatch = job.type.toLowerCase().includes(this.searchText.toLowerCase()) ||
                         job.description.toLowerCase().includes(this.searchText.toLowerCase()) ||
                         job.location.toLowerCase().includes(this.searchText.toLowerCase());
      const statusMatch = !this.filterStatus || job.status === this.filterStatus;
      return searchMatch && statusMatch;
    });
  }
  
  getStatusClass(status: string): string {
    return `status-${status}`;
  }

  viewJob(job: Job): void {
    this.selectedJobForDetail = job;
    this.showJobDetail = true;
  }

  closeJobDetail(): void {
    this.showJobDetail = false;
    this.selectedJobForDetail = null;
  }

  editJob(job: Job): void {
    alert('Edit job functionality coming soon');
  }

  deleteJob(job: Job): void {
    if (confirm(`Delete job "${job.type}"? This action cannot be undone.`)) {
      const index = this.jobs.findIndex(j => j.id === job.id);
      if (index > -1) {
        this.jobs.splice(index, 1);
        this.applyFilters();
        alert('Job deleted successfully');
      }
    }
  }
}
