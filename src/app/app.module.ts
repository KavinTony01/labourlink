import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ClientDashboardComponent } from './components/client-dashboard/client-dashboard.component';
import { WorkerDashboardComponent } from './components/worker-dashboard/worker-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { JobCardComponent } from './components/job-card/job-card.component';
import { ToastComponent } from './components/toast/toast.component';
import { ReportComponent } from './components/report/report.component';
import { StatCardComponent } from './components/stat-card/stat-card.component';
import { UsersManagementComponent } from './components/users-management/users-management.component';
import { JobsManagementComponent } from './components/jobs-management/jobs-management.component';
import { SystemSettingsComponent } from './components/system-settings/system-settings.component';
import { PostJobFormComponent } from './components/post-job-form/post-job-form.component';
import { JobTypeSelectionComponent } from './components/job-type-selection/job-type-selection.component';
import { JobDetailModalComponent } from './components/job-detail-modal/job-detail-modal.component';
import { AvatarUploadComponent } from './components/avatar-upload/avatar-upload.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { LoadingStateComponent } from './components/loading-state/loading-state.component';
import { ErrorStateComponent } from './components/error-state/error-state.component';
import { RatingsReviewComponent } from './components/ratings-review/ratings-review.component';

import { AuthService } from './services/auth.service';
import { JobService } from './services/job.service';
import { ToastService } from './services/toast.service';
import { JobTypeService } from './services/job-type.service';
import { RatingService } from './services/rating.service';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    ProfileComponent,
    ClientDashboardComponent,
    WorkerDashboardComponent,
    AdminDashboardComponent,
    JobListComponent,
    JobCardComponent,
    ToastComponent,
    ReportComponent,
    StatCardComponent,
    UsersManagementComponent,
    JobsManagementComponent,
    SystemSettingsComponent,
    PostJobFormComponent,
    JobTypeSelectionComponent,
    JobDetailModalComponent,
    AvatarUploadComponent,
    EmptyStateComponent,
    LoadingStateComponent,
    ErrorStateComponent,
    RatingsReviewComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: WelcomeComponent },
      { path: 'welcome', component: WelcomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
      { path: 'report', component: ReportComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
      { path: 'client', component: ClientDashboardComponent, canActivate: [AuthGuard], data: { role: 'Client' } },
      { path: 'worker', component: WorkerDashboardComponent, canActivate: [AuthGuard], data: { role: 'Worker' } },
      { path: '**', redirectTo: 'welcome' }
    ])
  ],
  providers: [AuthService, JobService, ToastService, JobTypeService, RatingService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
