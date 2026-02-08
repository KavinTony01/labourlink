export interface Rating {
  id: string;
  fromUserId: string;
  toUserId: string;
  jobId?: string;
  rating: number; // 1-5 stars
  title: string;
  review: string;
  category?: 'communication' | 'professionalism' | 'quality' | 'timeliness' | 'overall';
  createdAt: Date;
  updatedAt: Date;
  helpful?: number; // Count of people who found review helpful
  verified?: boolean; // Whether the job was completed
}

export interface RatingStats {
  averageRating: number;
  totalRatings: number;
  ratingBreakdown: {
    fiveStar: number;
    fourStar: number;
    threeStar: number;
    twoStar: number;
    oneStar: number;
  };
  topReviews: Rating[];
}

export interface ReviewFilter {
  userId?: string;
  minRating?: number;
  maxRating?: number;
  sortBy?: 'recent' | 'highest' | 'lowest' | 'helpful';
  limit?: number;
  offset?: number;
}
