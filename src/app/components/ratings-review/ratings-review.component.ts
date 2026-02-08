import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rating, RatingStats } from '../../models/rating.model';
import { RatingService } from '../../services/rating.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ratings-review',
  templateUrl: './ratings-review.component.html',
  styleUrls: ['./ratings-review.component.css']
})
export class RatingsReviewComponent implements OnInit, OnDestroy {
  @Input() userId: string | null = null;
  @Input() jobId: string | null = null;
  @Input() raterRole: string | null = null; // Current user's role (e.g., 'Client')
  @Input() rateeRole: string | null = null; // The person being rated role (e.g., 'Worker')

  ratingForm: FormGroup;
  ratings: Rating[] = [];
  ratingStats: RatingStats | null = null;
  loading = false;
  error: string | null = null;
  showForm = false;
  hoverRating = 0;
  selectedFilter = 'recent';
  showAllReviews = false;
  Math = Math; // Expose Math to template
  currentUser: User | null = null;
  canRate = false;

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private ratingService: RatingService, private authService: AuthService) {
    this.ratingForm = this.fb.group({
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      title: ['', [Validators.required, Validators.minLength(5)]],
      review: ['', [Validators.required, Validators.minLength(10)]],
      category: ['overall']
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    
    // Check if current user can rate
    if (this.raterRole && this.rateeRole && this.jobId) {
      const validation = this.ratingService.canRateWorker(this.raterRole, this.rateeRole, this.jobId);
      this.canRate = validation.allowed;
    }
    
    if (this.userId) {
      this.loadUserRatings();
    } else if (this.jobId) {
      this.loadJobRatings();
    }

    this.ratingService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(loading => this.loading = loading);

    this.ratingService.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe(error => this.error = error);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadUserRatings(): void {
    if (!this.userId) return;
    
    this.ratingService.getUserRatings(this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (ratings) => {
          this.ratings = ratings;
          this.ratingStats = this.ratingService.getUserRatingStats(this.userId!);
        },
        error: (err) => this.error = 'Failed to load ratings'
      });
  }

  loadJobRatings(): void {
    if (!this.jobId) return;

    const filter = {
      sortBy: this.selectedFilter as 'recent' | 'highest' | 'lowest' | 'helpful',
      limit: this.showAllReviews ? 100 : 5
    };

    this.ratingService.getJobRatings(this.jobId, filter)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (ratings) => this.ratings = ratings,
        error: (err) => this.error = 'Failed to load reviews'
      });
  }

  setRating(value: number): void {
    this.ratingForm.patchValue({ rating: value });
  }

  submitRating(): void {
    if (this.ratingForm.invalid || !this.userId) return;

    // Validate that client can rate worker
    const validation = this.ratingService.canRateWorker(this.raterRole || '', this.rateeRole || '', this.jobId);
    if (!validation.allowed) {
      this.error = validation.reason || 'You cannot rate this user';
      return;
    }

    const { rating, title, review, category } = this.ratingForm.value;
    const newRating: Omit<Rating, 'id' | 'createdAt' | 'updatedAt'> = {
      fromUserId: this.currentUser?.id || 'current-user',
      toUserId: this.userId,
      jobId: this.jobId || undefined,
      rating,
      title,
      review,
      category
    };

    this.ratingService.addRating(newRating)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.ratingForm.reset();
          this.showForm = false;
          this.loadUserRatings();
        },
        error: () => this.error = 'Failed to submit rating'
      });
  }

  markHelpful(ratingId: string): void {
    this.ratingService.markHelpful(ratingId);
    const rating = this.ratings.find(r => r.id === ratingId);
    if (rating) {
      rating.helpful = (rating.helpful || 0) + 1;
    }
  }

  getStarArray(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < rating ? 1 : 0);
  }

  deleteRating(ratingId: string): void {
    if (confirm('Are you sure you want to delete this review?')) {
      this.ratingService.deleteRating(ratingId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.ratings = this.ratings.filter(r => r.id !== ratingId);
            if (this.userId) {
              this.ratingStats = this.ratingService.getUserRatingStats(this.userId);
            }
          },
          error: () => this.error = 'Failed to delete rating'
        });
    }
  }

  toggleShowAllReviews(): void {
    this.showAllReviews = !this.showAllReviews;
    if (this.jobId) {
      this.loadJobRatings();
    }
  }

  filterReviews(sortBy: string): void {
    this.selectedFilter = sortBy;
    if (this.jobId) {
      this.loadJobRatings();
    }
  }
}
