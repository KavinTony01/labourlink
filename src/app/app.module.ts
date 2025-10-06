import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ClientDashboardComponent } from './components/client-dashboard/client-dashboard.component';
import { WorkerDashboardComponent } from './components/worker-dashboard/worker-dashboard.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { JobCardComponent } from './components/job-card/job-card.component';
import { ToastComponent } from './components/toast/toast.component';
import { ReportComponent } from './components/report/report.component';

import { AuthService } from './services/auth.service';
import { JobService } from './services/job.service';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    ClientDashboardComponent,
    WorkerDashboardComponent,
    JobListComponent,
    JobCardComponent
    ,ToastComponent
    ,ReportComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'admin', component: ReportComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
      { path: 'client', component: ClientDashboardComponent, canActivate: [AuthGuard], data: { role: 'Client' } },
      { path: 'worker', component: WorkerDashboardComponent, canActivate: [AuthGuard], data: { role: 'Worker' } },
      { path: '**', redirectTo: 'login' }
    ])
  ],
  providers: [AuthService, JobService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
