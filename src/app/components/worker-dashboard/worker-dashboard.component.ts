import { Component } from '@angular/core';
import { JobService } from '../../services/job.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-worker-dashboard',
  templateUrl: './worker-dashboard.component.html'
})
export class WorkerDashboardComponent {
  filter: string = '';
  constructor(public jobService: JobService, private auth: AuthService, private toast: ToastService) {}

  book(jobId: string) {
    const user = this.auth.getCurrentUser();
    if (!user) return;
    const ok = confirm('Confirm booking this job?');
    if (!ok) return;
  const success = this.jobService.bookJob(jobId, { id: user.id, username: user.username, displayName: user.displayName, mobile: user.mobile });
    if (success) this.toast.show('Job booked successfully');
    else this.toast.show('Could not book job (already booked)');
  }

}
