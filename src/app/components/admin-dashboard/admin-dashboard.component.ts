import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { JobService } from '../../services/job.service';
import { User } from '../../models/user.model';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  // Statistics
  totalUsers: number = 0;
  totalClients: number = 0;
  totalWorkers: number = 0;
  totalJobs: number = 0;
  jobsOpen: number = 0;
  jobsBooked: number = 0;
  jobsCompleted: number = 0;
  totalRevenue: number = 0;
  avgRating: number = 0;
  ratedJobs: number = 0;
  
  // Data
  users: User[] = [];
  jobs: Job[] = [];
  
  // View state
  selectedTab: 'statistics' | 'users' | 'jobs' | 'settings' = 'statistics';
  
  constructor(private authService: AuthService, private jobService: JobService) {}
  
  ngOnInit() {
    this.loadStatistics();
  }
  
  private loadStatistics() {
    // Load users
    this.users = this.authService.getAllUsers();
    this.totalUsers = this.users.length;
    this.totalClients = this.users.filter(u => u.role === 'Client').length;
    this.totalWorkers = this.users.filter(u => u.role === 'Worker').length;
    
    // Load jobs
    this.jobService.jobs$.subscribe(jobs => {
      this.jobs = jobs;
      this.totalJobs = jobs.length;
      this.jobsOpen = jobs.filter(j => j.status === 'open').length;
      this.jobsBooked = jobs.filter(j => j.status === 'booked').length;
      this.jobsCompleted = jobs.filter(j => j.status === 'completed').length;
      this.totalRevenue = jobs.reduce((sum, j) => sum + j.pay, 0);
      
      // Calculate average rating
      const ratedJobs = jobs.filter(j => j.rating !== undefined && j.rating !== null);
      this.ratedJobs = ratedJobs.length;
      if (ratedJobs.length > 0) {
        this.avgRating = ratedJobs.reduce((sum, j) => sum + (j.rating || 0), 0) / ratedJobs.length;
      }
    });
  }
  
  selectTab(tab: 'statistics' | 'users' | 'jobs' | 'settings') {
    this.selectedTab = tab;
  }
}
