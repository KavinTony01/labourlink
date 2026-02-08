# LabourLink - Platform Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [User Roles](#user-roles)
3. [Features & Functionalities](#features--functionalities)
4. [Pages & Components](#pages--components)
5. [Data Models](#data-models)
6. [Services](#services)
7. [Key Workflows](#key-workflows)

---

## Project Overview

**LabourLink** is a comprehensive worker management platform that connects clients with workers for job postings and management. The platform facilitates job booking, completion tracking, ratings, and administrative controls.

### Technology Stack
- **Frontend:** Angular 17
- **Styling:** CSS3 with Responsive Design
- **State Management:** BehaviorSubject (RxJS)
- **Storage:** LocalStorage
- **Forms:** Reactive Forms

---

## User Roles

### 1. **Client**
Clients are individuals or businesses who post jobs and hire workers to complete tasks.

#### Capabilities:
- ✅ Post new jobs
- ✅ View all posted jobs
- ✅ Edit jobs (only when status is "open")
- ✅ Cancel jobs (only when status is "open")
- ✅ Reopen completed jobs
- ✅ View job details
- ✅ Rate and review workers (after job completion)
- ✅ Track job status and earnings spent
- ✅ View their profile

#### Dashboard Features:
- Statistics cards: Total jobs posted, Active jobs, Completed jobs, Total spent
- Filter jobs by status: All, Open, Booked, Completed, Cancelled
- Job management table with actions
- Job detail modal with worker information and reviews

---

### 2. **Worker**
Workers are service providers who browse available jobs, book them, and complete assigned tasks.

#### Capabilities:
- ✅ Browse available jobs
- ✅ Filter jobs by type, location, and search keywords
- ✅ Book jobs
- ✅ View booked jobs
- ✅ Contact clients
- ✅ Mark jobs as complete
- ✅ View completed jobs
- ✅ Receive ratings and reviews from clients
- ✅ View their profile
- ✅ Track monthly earnings

#### Dashboard Features:
- Statistics cards: Available jobs, Booked jobs, Completed jobs, Monthly earnings
- Job search with filters (Job Type, Location, Search)
- Available jobs grid with booking option
- Booked jobs table with status tracking
- Monthly earnings calculation

---

### 3. **Admin**
Administrators have full control over the platform, including user management, job oversight, and system configuration.

#### Capabilities:
- ✅ View platform statistics and metrics
- ✅ Create new users (Client, Worker, Admin)
- ✅ Manage existing users (View, Enable, Disable)
- ✅ View all jobs in the system
- ✅ Filter jobs by status
- ✅ Monitor ratings and reviews
- ✅ View system settings
- ✅ Filter users by role

#### Dashboard Tabs:

##### **Statistics Tab**
- Key Metrics:
  - 👥 Total Users
  - 💼 Total Clients
  - 🔨 Total Workers
  - 📋 Total Jobs
  - 🔓 Jobs Open
  - 📌 Jobs Booked
  - ✅ Jobs Completed
  - ⭐ Average Rating
  - 💬 Rated Jobs Count
  - 💰 Total Revenue

- Recent Jobs Table: Display last 10 jobs with details

##### **Users Tab**
- Search users by name or username
- Filter users by role (All, Client, Worker, Admin)
- View user details
- Create new users (+ Create User button)
- Enable/Disable users (toggle with visual feedback)
- User list with columns: User ID, Username, Display Name, Role, Mobile

##### **Jobs Tab**
- Full job management interface
- Search jobs by type, description, location
- Filter jobs by status
- View all platform jobs
- Ratings column showing average ratings for completed jobs

##### **Settings Tab**
- System configuration options
- Platform settings management

---

## Features & Functionalities

### 1. **Authentication & Authorization**
- Login page with username/password
- Demo credentials: `username=admin, password=admin`
- Role-based access control (RBAC)
- Auth guard to protect routes
- Current user tracking
- Logout functionality with history clearing

### 2. **Job Management**

#### Job Creation (Client)
- Post new job with:
  - Job type selection
  - Description (min 10 characters)
  - Location
  - Date
  - Time
  - Pay amount (₹100 - ₹50,000)
  - Price guidance based on job type
- Form validation with error messages
- Success notification on posting

#### Job Browsing (Worker)
- Filter jobs by:
  - Job type
  - Location
  - Search text
- Display available jobs in grid
- Show job details: Type, Description, Location, Date, Time, Pay, Posted by

#### Job Booking (Worker)
- One-click job booking
- Status updates from "open" to "booked"
- Worker assignment tracking

#### Job Completion (Worker)
- Mark jobs as complete
- Update job status to "completed"
- Clear booked status

#### Job Reopening (Client)
- Reopen completed jobs
- Clear worker assignment
- Remove ratings/reviews
- Reset to "open" status

#### Job Status Lifecycle
```
open → booked → completed → (optionally) open (reopen)
        ↓
      cancelled
```

### 3. **Ratings & Reviews**

#### Ratings Features
- Rate completed jobs (1-5 stars)
- Write reviews after completion
- View average ratings in dashboard
- Display ratings in jobs grid
- Track number of rated jobs

#### Rating Display
- ⭐ Shows rating with visual indicator
- Only displays for completed jobs
- "-" shown for non-completed or unrated jobs

### 4. **User Management (Admin)**

#### Create User
- Form with fields:
  - Username (required)
  - Display Name (required)
  - Email (required, with validation)
  - Mobile (optional)
  - Password (required, min 6 characters)
  - Role (required: Client, Worker, Admin)
- Modal dialog interface
- Form validation with error messages
- Unique ID generation

#### User Status Management
- Enable/Disable toggle
- Visual button state change (Red=Disable, Green=Enable)
- User suspension capability
- Status persistence in data

### 5. **UI/UX Features**

#### Login Page
- Modern modal design
- Gradient purple background
- White card popup
- Clickable "LabourLink" heading → Navigate to welcome page
- Demo credentials display
- Smooth animations
- Responsive design

#### Dashboard Layouts
- Tab-based navigation
- Statistics cards with icons
- Table views with filters
- Grid layouts for jobs
- Modal dialogs for details and forms
- Loading states
- Empty states with helpful messages

#### Responsive Design
- Mobile-optimized views
- Flexible grid layouts
- Touch-friendly buttons
- Adaptive table displays

---

## Pages & Components

### Core Pages

#### 1. **Welcome Page** (`/welcome`)
- Entry point for unauthenticated users
- Platform overview
- Call-to-action buttons
- Navigation options

#### 2. **Login Page** (`/login`)
- Authentication interface
- Error handling
- Credential input
- Link to welcome page (title click)

#### 3. **Client Dashboard** (`/client`)
- Client job management
- Job posting form (modal)
- Job list with filtering
- Job detail view
- Statistics overview
- Worker information and ratings
- Responsive job table

#### 4. **Worker Dashboard** (`/worker`)
- Job search interface
- Available jobs grid
- Booked jobs table
- Job filtering and search
- Statistics overview
- Monthly earnings display
- Job booking interface

#### 5. **Admin Dashboard** (`/admin`)
- Statistics overview
- User management interface
- Job management interface
- System settings
- Tab-based navigation

#### 6. **Profile Page** (`/profile`)
- User profile information
- Account details
- User preferences

### Reusable Components

#### **Stat Card** (`stat-card`)
- Display statistics with icons
- Shows label and value
- Responsive sizing
- Used in all dashboards

#### **Toast Notification** (`toast`)
- Display messages to users
- Success, error, info types
- Auto-dismiss functionality
- Non-blocking UI

#### **Job Card** (`job-card`)
- Display job preview
- Shows key job details
- Action buttons

#### **Job List** (`job-list`)
- List of jobs
- Filtering options
- Search functionality

#### **Job Detail Modal** (`job-detail-modal`)
- Full job details view
- Worker information
- Ratings and reviews
- Modal overlay design

#### **Post Job Form** (`post-job-form`)
- Reactive form for job creation
- Job type selection component
- Price guidance display
- Validation feedback
- Character count
- Form submission handling

#### **Job Type Selection** (`job-type-selection`)
- Browse available job types
- Visual job type cards
- Price guidance display
- Selection tracking

#### **Ratings Review** (`ratings-review`)
- Display ratings and reviews
- Star rating visual
- Review text
- User information

#### **Users Management** (`users-management`)
- User table display
- Search and filter
- Create user button
- Disable/Enable toggle
- Create User Modal

#### **Jobs Management** (`jobs-management`)
- Admin job oversight
- Search and filter jobs
- Ratings column display
- Job actions (View, Edit, Delete)
- Table wrapper for responsiveness

#### **System Settings** (`system-settings`)
- Platform configuration
- Admin preferences

#### **Avatar Upload** (`avatar-upload`)
- User avatar/profile picture upload
- Image preview

#### **Job List** (`job-list`)
- Worker view of available jobs

#### **Loading State** (`loading-state`)
- Loading indicator display

#### **Empty State** (`empty-state`)
- Display when no data available

#### **Error State** (`error-state`)
- Display error messages

#### **Welcome** (`welcome`)
- Welcome/home page

---

## Data Models

### 1. **User Model**
```typescript
interface User {
  id: string;                          // Unique identifier
  username: string;                    // Login username
  password?: string;                   // Hashed password
  role: 'Client' | 'Worker' | 'Admin'; // User role
  displayName: string;                 // Display name
  mobile?: string;                     // Phone number (10 digits)
  email?: string;                      // Email address
  location?: string;                   // User location
  bio?: string;                        // User bio
  avatar?: string;                     // Avatar URL
  
  // Worker-specific fields
  yearsOfExperience?: string;
  specializations?: string;
  languages?: string;
  certifications?: string;
  hourlyRate?: number;
  availabilityStatus?: 'available' | 'busy' | 'on_leave';
  
  // Client-specific fields
  companyName?: string;
  industry?: string;
  businessType?: 'individual' | 'small_business' | 'company' | 'enterprise';
  businessAddress?: string;
  website?: string;
  
  // Statistics
  jobsCompleted?: number;
  successRate?: number;
  avgRating?: number;
  totalEarnings?: number;
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
```

### 2. **Job Model**
```typescript
interface Job {
  id: string;                    // Unique job ID
  type: string;                  // Job type/category
  description: string;           // Detailed job description
  location: string;              // Job location
  date: string;                  // Job date (yyyy-mm-dd)
  time: string;                  // Job time (HH:mm)
  pay: number;                   // Payment amount in ₹
  status: 'open' | 'booked' | 'completed' | 'cancelled'; // Current status
  
  worker?: {                     // Assigned worker details
    id: string;
    username: string;
    displayName: string;
    mobile?: string;
  } | null;
  
  postedBy: {                    // Client who posted job
    id: string;
    username: string;
    displayName: string;
    mobile?: string;
  };
  
  completedDate?: Date;          // When job was completed
  rating?: number;               // Rating (0-5)
  review?: string;               // Review text
}
```

### 3. **Job Type Model**
```typescript
interface JobTypeConfig {
  id: string;
  name: string;
  category: string;
  description?: string;
  priceGuidance: {
    min: number;
    max: number;
    unit: string;  // e.g., "per hour", "one-time"
  };
  requiredSkills?: string[];
  icon?: string;
}
```

### 4. **Rating Model**
```typescript
interface Rating {
  id: string;
  jobId: string;
  rater: {
    id: string;
    role: 'Client' | 'Worker';
    displayName: string;
  };
  ratee: {
    id: string;
    role: 'Client' | 'Worker';
    displayName: string;
  };
  rating: number;        // 1-5
  review: string;
  date: Date;
  category?: string;     // e.g., "quality", "communication"
}
```

---

## Services

### 1. **AuthService**
- User authentication management
- Login/Logout functionality
- Current user tracking
- User role management
- Get all users
- User creation

#### Key Methods:
```typescript
login(username: string, password: string): boolean
logout(): void
getCurrentUser(): User | null
getAllUsers(): User[]
createUser(user: User): void
updateUser(user: User): void
```

### 2. **JobService**
- Job CRUD operations
- Job state management
- Job filtering and search
- Job status updates

#### Key Methods:
```typescript
postJob(job: Omit<Job, 'id' | 'status'>): Observable<Job>
getJobs(): Job[]
getOpenJobs(): Job[]
bookJob(jobId: string, worker: Worker): boolean
completeJob(jobId: string): boolean
getJobsForClient(clientId: string): Job[]
getJobsForWorker(): Job[]
```

### 3. **ToastService**
- Display notification messages
- Message queue management
- Auto-dismiss functionality

#### Key Methods:
```typescript
show(message: string, type?: 'success' | 'error' | 'info'): void
success(message: string): void
error(message: string): void
```

### 4. **JobTypeService**
- Manage job types
- Price guidance
- Job type definitions

#### Key Methods:
```typescript
getJobTypes(): JobTypeConfig[]
getJobType(id: string): JobTypeConfig | undefined
getPriceGuidance(jobTypeId: string): PriceGuidance
```

### 5. **RatingService**
- Rating and review management
- Calculate average ratings
- Store and retrieve ratings

#### Key Methods:
```typescript
submitRating(rating: Rating): void
getRatingsForUser(userId: string): Rating[]
getAverageRating(userId: string): number
```

---

## Key Workflows

### Workflow 1: Client Posts a Job

```
1. Client logs in
2. Navigate to Client Dashboard
3. Click "+ Post New Job"
4. Select job type → See price guidance
5. Fill job details:
   - Description
   - Location
   - Date & Time
   - Pay amount (within guidance)
6. Click "Post Job"
7. Form validates
8. Job added to system
9. Success notification shown
10. Job appears in "My Jobs" list
11. Available for workers to book
```

### Workflow 2: Worker Books a Job

```
1. Worker logs in
2. Navigate to Worker Dashboard
3. See available jobs in grid
4. Filter/search for specific jobs
5. Click "Book Now" on desired job
6. Job status changes: open → booked
7. Worker name assigned to job
8. Job appears in "My Booked Jobs" table
9. Client can see worker information
```

### Workflow 3: Job Completion and Rating

```
1. Worker completes job
2. Worker marks job as "complete"
3. Job status: booked → completed
4. Client receives notification
5. Client opens job detail modal
6. Client sees worker information
7. Client rates worker (1-5 stars)
8. Client writes review
9. Rating saved to system
10. Rating appears in dashboard
11. Workers can see their average rating
```

### Workflow 4: Client Reopens a Job

```
1. Job is completed and rated
2. Client views completed job
3. Client clicks "Reopen" button
4. Confirmation dialog appears
5. Client confirms reopening
6. Job status: completed → open
7. Worker assignment cleared
8. Ratings/reviews cleared
9. Job returns to "Available" status
10. New workers can book it
```

### Workflow 5: Admin Manages Users

```
1. Admin logs in
2. Navigate to Admin Dashboard
3. Click Users Tab
4. Search/filter users
5. Actions available:
   - View: See user details
   - Disable: Remove user access (button turns green "Enable")
   - Enable: Restore user access
   - Create: Add new user
6. Fill user creation form
7. Submit form
8. New user added to system
9. User can now log in
```

---

## Status Codes & Indicators

### Job Status Colors
- 🔓 **open** - Light Blue Badge: Available for booking
- 📌 **booked** - Light Orange Badge: Worker assigned
- ✅ **completed** - Light Green Badge: Job finished
- ❌ **cancelled** - Light Red Badge: Job cancelled

### User Role Colors
- 💼 **Client** - Blue
- 🔨 **Worker** - Orange
- ⚙️ **Admin** - Gray/Purple

### Button States
- **Primary (Blue)** - Main actions
- **Success (Green)** - Enable, Reopen
- **Warning (Orange)** - Edit
- **Danger (Red)** - Delete, Cancel, Disable
- **Info (Light Blue)** - View, Details

---

## Key Features Summary

| Feature | Client | Worker | Admin |
|---------|--------|--------|-------|
| Post Jobs | ✅ | ❌ | ❌ |
| Browse Jobs | ❌ | ✅ | ❌ |
| Book Jobs | ❌ | ✅ | ❌ |
| Rate Jobs/Workers | ✅ | ❌ | ❌ |
| Reopen Jobs | ✅ | ❌ | ❌ |
| Create Users | ❌ | ❌ | ✅ |
| Manage Users | ❌ | ❌ | ✅ |
| View Analytics | ✅ (own) | ✅ (own) | ✅ (all) |
| System Settings | ❌ | ❌ | ✅ |
| Disable Users | ❌ | ❌ | ✅ |

---

## Demo Credentials

### Testing Accounts
- **Admin**: username=`admin`, password=`admin`
- **Test Client**: username=`client1`, password=`password`
- **Test Worker**: username=`worker1`, password=`password`

---

## Contact & Support

For issues, feature requests, or documentation updates, please refer to the GitHub repository:
https://github.com/KavinTony01/labourlink

---

**Last Updated**: February 8, 2026
**Version**: 1.0.0
**Branch**: feature/latest-updates
