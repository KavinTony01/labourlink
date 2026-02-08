import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Rating, RatingStats, ReviewFilter } from '../models/rating.model';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private ratings: Rating[] = this.loadRatings();
  private ratingsSubject = new BehaviorSubject<Rating[]>(this.ratings);
  public ratings$ = this.ratingsSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private errorSubject = new BehaviorSubject<string | null>(null);
  public error$ = this.errorSubject.asObservable();

  constructor() {}

  private loadRatings(): Rating[] {
    const stored = localStorage.getItem('labourlink_ratings');
    return stored ? JSON.parse(stored) : this.seedInitialRatings();
  }

  private saveRatings(): void {
    localStorage.setItem('labourlink_ratings', JSON.stringify(this.ratings));
    this.ratingsSubject.next([...this.ratings]);
  }

  private seedInitialRatings(): Rating[] {
    const seed: Rating[] = [
      {
        id: 'rating-1',
        fromUserId: 'user-1',
        toUserId: 'user-2',
        jobId: 'job-1',
        rating: 5,
        title: 'Excellent work!',
        review: 'Very professional and completed the job ahead of schedule.',
        category: 'quality',
        createdAt: new Date('2026-02-01'),
        updatedAt: new Date('2026-02-01'),
        helpful: 12,
        verified: true
      },
      {
        id: 'rating-2',
        fromUserId: 'user-2',
        toUserId: 'user-1',
        jobId: 'job-1',
        rating: 4,
        title: 'Good client to work with',
        review: 'Clear requirements and fair payment. Would work with again.',
        category: 'communication',
        createdAt: new Date('2026-02-02'),
        updatedAt: new Date('2026-02-02'),
        helpful: 5,
        verified: true
      },
      {
        id: 'rating-3',
        fromUserId: 'user-3',
        toUserId: 'user-2',
        jobId: 'job-2',
        rating: 5,
        title: 'Perfect service',
        review: 'Amazing attention to detail. Highly recommended!',
        category: 'quality',
        createdAt: new Date('2026-02-03'),
        updatedAt: new Date('2026-02-03'),
        helpful: 8,
        verified: true
      }
    ];
    this.ratings = seed;
    this.saveRatings();
    return seed;
  }

  // Get all ratings for a user
  getUserRatings(userId: string): Observable<Rating[]> {
    this.loadingSubject.next(true);
    return new Observable(observer => {
      setTimeout(() => {
        const userRatings = this.ratings.filter(r => r.toUserId === userId);
        observer.next(userRatings);
        observer.complete();
        this.loadingSubject.next(false);
      }, 300);
    });
  }

  // Get rating statistics for a user
  getUserRatingStats(userId: string): RatingStats {
    const userRatings = this.ratings.filter(r => r.toUserId === userId);
    
    if (userRatings.length === 0) {
      return {
        averageRating: 0,
        totalRatings: 0,
        ratingBreakdown: { fiveStar: 0, fourStar: 0, threeStar: 0, twoStar: 0, oneStar: 0 },
        topReviews: []
      };
    }

    const average = userRatings.reduce((sum, r) => sum + r.rating, 0) / userRatings.length;
    
    const breakdown = {
      fiveStar: userRatings.filter(r => r.rating === 5).length,
      fourStar: userRatings.filter(r => r.rating === 4).length,
      threeStar: userRatings.filter(r => r.rating === 3).length,
      twoStar: userRatings.filter(r => r.rating === 2).length,
      oneStar: userRatings.filter(r => r.rating === 1).length
    };

    const topReviews = [...userRatings]
      .sort((a, b) => (b.helpful || 0) - (a.helpful || 0))
      .slice(0, 3);

    return {
      averageRating: Math.round(average * 10) / 10,
      totalRatings: userRatings.length,
      ratingBreakdown: breakdown,
      topReviews
    };
  }

  // Get ratings for a job
  getJobRatings(jobId: string, filter?: ReviewFilter): Observable<Rating[]> {
    this.loadingSubject.next(true);
    return new Observable(observer => {
      setTimeout(() => {
        let jobRatings = this.ratings.filter(r => r.jobId === jobId);

        if (filter?.minRating) {
          jobRatings = jobRatings.filter(r => r.rating >= filter.minRating!);
        }
        if (filter?.maxRating) {
          jobRatings = jobRatings.filter(r => r.rating <= filter.maxRating!);
        }

        // Sort
        if (filter?.sortBy === 'highest') {
          jobRatings.sort((a, b) => b.rating - a.rating);
        } else if (filter?.sortBy === 'lowest') {
          jobRatings.sort((a, b) => a.rating - b.rating);
        } else if (filter?.sortBy === 'helpful') {
          jobRatings.sort((a, b) => (b.helpful || 0) - (a.helpful || 0));
        } else {
          // Default: recent first
          jobRatings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }

        // Pagination
        const start = filter?.offset || 0;
        const limit = filter?.limit || 10;
        jobRatings = jobRatings.slice(start, start + limit);

        observer.next(jobRatings);
        observer.complete();
        this.loadingSubject.next(false);
      }, 300);
    });
  }

  // Validate that a client can rate a worker on a completed job
  canRateWorker(raterRole: string, rateeRole: string, jobId?: string): { allowed: boolean; reason?: string } {
    // Only clients can rate workers
    if (raterRole !== 'Client') {
      return { allowed: false, reason: 'Only clients can leave ratings for workers' };
    }
    
    if (rateeRole !== 'Worker') {
      return { allowed: false, reason: 'Ratings are only for workers' };
    }
    
    if (!jobId) {
      return { allowed: false, reason: 'Rating must be associated with a completed job' };
    }
    
    return { allowed: true };
  }

  // Add a new rating
  addRating(rating: Omit<Rating, 'id' | 'createdAt' | 'updatedAt'>): Observable<Rating> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);
    
    return new Observable(observer => {
      setTimeout(() => {
        try {
          const newRating: Rating = {
            ...rating,
            id: `rating-${Date.now()}`,
            createdAt: new Date(),
            updatedAt: new Date(),
            helpful: 0,
            verified: true
          };

          this.ratings.push(newRating);
          this.saveRatings();

          observer.next(newRating);
          observer.complete();
          this.loadingSubject.next(false);
        } catch (error) {
          const errorMsg = 'Failed to add rating';
          this.errorSubject.next(errorMsg);
          observer.error(errorMsg);
          this.loadingSubject.next(false);
        }
      }, 300);
    });
  }

  // Update a rating
  updateRating(id: string, updates: Partial<Rating>): Observable<Rating> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return new Observable(observer => {
      setTimeout(() => {
        try {
          const rating = this.ratings.find(r => r.id === id);
          if (!rating) {
            throw new Error('Rating not found');
          }

          const updated: Rating = {
            ...rating,
            ...updates,
            id: rating.id,
            updatedAt: new Date()
          };

          const index = this.ratings.findIndex(r => r.id === id);
          this.ratings[index] = updated;
          this.saveRatings();

          observer.next(updated);
          observer.complete();
          this.loadingSubject.next(false);
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : 'Failed to update rating';
          this.errorSubject.next(errorMsg);
          observer.error(errorMsg);
          this.loadingSubject.next(false);
        }
      }, 300);
    });
  }

  // Delete a rating
  deleteRating(id: string): Observable<void> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return new Observable(observer => {
      setTimeout(() => {
        try {
          const index = this.ratings.findIndex(r => r.id === id);
          if (index === -1) {
            throw new Error('Rating not found');
          }

          this.ratings.splice(index, 1);
          this.saveRatings();

          observer.next();
          observer.complete();
          this.loadingSubject.next(false);
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : 'Failed to delete rating';
          this.errorSubject.next(errorMsg);
          observer.error(errorMsg);
          this.loadingSubject.next(false);
        }
      }, 300);
    });
  }

  // Mark review as helpful
  markHelpful(ratingId: string): void {
    const rating = this.ratings.find(r => r.id === ratingId);
    if (rating) {
      rating.helpful = (rating.helpful || 0) + 1;
      this.saveRatings();
    }
  }

  // Get all ratings
  getAllRatings(): Rating[] {
    return [...this.ratings];
  }

  // Clear error
  clearError(): void {
    this.errorSubject.next(null);
  }
}
