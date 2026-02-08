import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Job } from '../../models/job.model';
import { RatingService } from '../../services/rating.service';
import { AuthService } from '../../services/auth.service';
import { RatingStats } from '../../models/rating.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css']
})
export class JobCardComponent implements OnInit {
  @Input() job!: Job;
  @Input() showOnlyOpen = false;
  @Output() book = new EventEmitter<string>();

  showDetails = false;
  ratingStats: RatingStats | null = null;
  currentUser: User | null = null;

  constructor(private ratingService: RatingService, private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.job.worker) {
      this.ratingStats = this.ratingService.getUserRatingStats(this.job.worker.id);
    }
  }

  emitBook() { 
    this.book.emit(this.job.id); 
  }
}
