export interface User {
  id: string; // e.g. client-101 or worker-201
  username: string;
  password?: string;
  role: 'Client' | 'Worker' | 'Admin';
  displayName: string;
  mobile?: string; // 10 digit mobile number
  email?: string;
  location?: string;
  bio?: string;
  avatar?: string;
  
  // Professional (Worker) fields
  yearsOfExperience?: string;
  specializations?: string;
  languages?: string;
  certifications?: string;
  hourlyRate?: number;
  availabilityStatus?: 'available' | 'busy' | 'on_leave';
  
  // Business (Client) fields
  companyName?: string;
  industry?: string;
  businessType?: 'individual' | 'small_business' | 'company' | 'enterprise';
  businessAddress?: string;
  website?: string;
  
  // Statistics - Worker
  jobsCompleted?: number;
  successRate?: number;
  avgRating?: number;
  totalEarnings?: number;
  
  // Statistics - Client
  jobsPosted?: number;
  totalSpent?: number;
  workerSatisfaction?: number;
  repeatBooking?: number;
  memberSince?: string;
  
  // Admin controls
  disabled?: boolean;
  
  // Preferences
  preferences?: {
    emailNotifications?: boolean;
    smsAlerts?: boolean;
    privacyMode?: boolean;
    jobAlerts?: boolean;
    messageNotifications?: boolean;
  };
}
