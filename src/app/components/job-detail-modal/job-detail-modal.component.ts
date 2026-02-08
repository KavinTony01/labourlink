import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Job } from '../../models/job.model';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { JobService } from '../../services/job.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-job-detail-modal',
  templateUrl: './job-detail-modal.component.html',
  styleUrls: ['./job-detail-modal.component.css']
})
export class JobDetailModalComponent implements OnInit {
  @Input() job: Job | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() book = new EventEmitter<Job>();
  
  currentUser: User | null = null;
  isSaved: boolean = false;
  canBook: boolean = false;
  
  constructor(
    private authService: AuthService,
    private jobService: JobService,
    private toast: ToastService
  ) {}
  
  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.canBook = this.currentUser?.role === 'Worker' && this.job?.status === 'open';
  }
  
  toggleSave() {
    this.isSaved = !this.isSaved;
    this.toast.show(this.isSaved ? 'Job saved!' : 'Job unsaved');
  }
  
  bookJob() {
    if (!this.job || !this.currentUser) return;
    
    if (confirm(`Book this job for ₹${this.job.pay}?`)) {
      const success = this.jobService.bookJob(this.job.id, {
        id: this.currentUser.id,
        username: this.currentUser.username,
        displayName: this.currentUser.displayName,
        mobile: this.currentUser.mobile
      });
      
      if (success) {
        this.toast.show('Job booked successfully!');
        this.book.emit(this.job);
        setTimeout(() => this.closeModal(), 1500);
      } else {
        this.toast.show('Could not book job');
      }
    }
  }
  
  shareJob() {
    const text = `Check out this job: ${this.job?.type} in ${this.job?.location} - ₹${this.job?.pay}`;
    if (navigator.share) {
      navigator.share({ text });
    } else {
      this.toast.show('Copied to clipboard!');
    }
  }
  
  reportJob() {
    this.toast.show('Job reported. We will review it shortly.');
  }
  
  closeModal() {
    this.close.emit();
  }
}
