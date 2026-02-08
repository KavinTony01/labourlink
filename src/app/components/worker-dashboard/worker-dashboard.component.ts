import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { User } from '../../models/user.model';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-worker-dashboard',
  templateUrl: './worker-dashboard.component.html',
  styleUrls: ['./worker-dashboard.component.css']
})
export class WorkerDashboardComponent implements OnInit {
  currentUser: User | null = null;
  availableJobs: Job[] = [];
  bookedJobs: Job[] = [];
  completedJobs: Job[] = [];
  selectedJobForDetail: Job | null = null;
  showJobDetail = false;
  
  // Statistics
  availableCount: number = 0;
  bookedCount: number = 0;
  completedCount: number = 0;
  monthlyEarnings: number = 0;
  
  // Filters
  selectedJobType: string = '';
  selectedLocation: string = '';
  searchText: string = '';
  
  // Available job types
  jobTypes = ['Plumbing', 'Cleaning', 'Repairs', 'Carpentry', 'Painting', 'Electrical', 'Landscaping', 'Other'];
  
  constructor(private authService: AuthService, private jobService: JobService, private toast: ToastService) {}
  
  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.loadJobs();
  }
  
  private loadJobs() {
    this.jobService.jobs$.subscribe(jobs => {
      this.availableJobs = jobs.filter(j => j.status === 'open');
      this.bookedJobs = jobs.filter(j => j.worker?.id === this.currentUser?.id && j.status === 'booked');
      this.completedJobs = jobs.filter(j => j.worker?.id === this.currentUser?.id && j.status === 'completed');
      this.calculateStatistics();
    });
  }
  
  private calculateStatistics() {
    this.availableCount = this.availableJobs.length;
    this.bookedCount = this.bookedJobs.length;
    this.completedCount = this.completedJobs.length;
    this.monthlyEarnings = [...this.bookedJobs, ...this.completedJobs].reduce((sum, j) => sum + j.pay, 0);
  }
  
  getFilteredJobs(): Job[] {
    return this.availableJobs.filter(job => {
      const typeMatch = !this.selectedJobType || job.type === this.selectedJobType;
      const locationMatch = !this.selectedLocation || job.location.toLowerCase().includes(this.selectedLocation.toLowerCase());
      const searchMatch = !this.searchText || 
        job.description.toLowerCase().includes(this.searchText.toLowerCase()) ||
        job.type.toLowerCase().includes(this.searchText.toLowerCase());
      return typeMatch && locationMatch && searchMatch;
    });
  }
  
  bookJob(job: Job) {
    if (!this.currentUser) return;
    
    if (confirm(`Book this job for ₹${job.pay}?`)) {
      const success = this.jobService.bookJob(job.id, {
        id: this.currentUser.id,
        username: this.currentUser.username,
        displayName: this.currentUser.displayName || '',
        mobile: this.currentUser.mobile
      });
      if (success) {
        this.toast.show('Job booked successfully!');
      } else {
        this.toast.show('Could not book job (already booked)');
      }
    }
  }

  viewJobDetail(job: Job) {
    this.selectedJobForDetail = job;
    this.showJobDetail = true;
  }

  contactClient(job: Job) {
    if (job.postedBy?.mobile) {
      const message = `Hi, I'm interested in the "${job.type}" job for ₹${job.pay}. Contact me!`;
      alert(`Client: ${job.postedBy.displayName}\nMobile: ${job.postedBy.mobile}\n\nMessage: ${message}`);
      this.toast.show(`Contact info copied: ${job.postedBy.mobile}`);
    } else {
      this.toast.show('Client contact info not available');
    }
  }

  closeJobDetail() {
    this.showJobDetail = false;
    this.selectedJobForDetail = null;
  }

  markJobComplete(job: Job) {
    if (confirm(`Mark "${job.type}" as completed? You can then leave a review.`)) {
      const success = this.jobService.completeJob(job.id);
      if (success) {
        this.toast.show('Job marked as completed!');
        this.closeJobDetail();
      } else {
        this.toast.show('Failed to complete job');
      }
    }
  }
}
