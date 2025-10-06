import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../../services/job.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html'
})
export class ClientDashboardComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private jobService: JobService, private auth: AuthService) {
    this.form = this.fb.group({ type: ['', Validators.required], description: ['', Validators.required], location: ['', Validators.required], date: ['', Validators.required], time: ['', Validators.required], pay: [0, Validators.required] });
  }

  submit() {
    if (this.form.invalid) return;
    const user = this.auth.getCurrentUser();
    if (!user) return;
  const payload: any = { ...this.form.value, postedBy: { id: user.id, username: user.username, displayName: user.displayName, mobile: user.mobile } };
  this.jobService.postJob(payload);
    this.form.reset();
  }
}
