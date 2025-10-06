import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html'
})
export class ReportComponent {
  users = this.auth.getAllUsers();
  jobs = this.jobService.jobs$;
  constructor(private auth: AuthService, private jobService: JobService) {}
}
