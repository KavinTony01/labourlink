export interface Job {
  id: string;
  type: string;
  description: string;
  location: string;
  date: string; // yyyy-mm-dd
  time: string; // HH:mm
  pay: number;
  status: 'open' | 'booked' | 'completed' | 'cancelled';
  worker?: {
    id: string;
    username: string;
    displayName: string;
    mobile?: string;
  } | null;
  postedBy: {
    id: string;
    username: string;
    displayName: string;
    mobile?: string;
  };
  completedDate?: Date; // When job was marked as completed
  rating?: number; // Rating out of 5
  review?: string; // Worker review
}
