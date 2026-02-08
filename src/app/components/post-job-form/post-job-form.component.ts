import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { JobService } from '../../services/job.service';
import { JobTypeService } from '../../services/job-type.service';
import { ToastService } from '../../services/toast.service';
import { User } from '../../models/user.model';
import { JobTypeConfig } from '../../models/job-type.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-job-form',
  templateUrl: './post-job-form.component.html',
  styleUrls: ['./post-job-form.component.css']
})
export class PostJobFormComponent implements OnInit {
  @Output() onSuccess = new EventEmitter<void>();
  
  jobForm!: FormGroup;
  currentUser: User | null = null;
  selectedJobType: JobTypeConfig | null = null;
  priceGuidance: any = null;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private jobService: JobService,
    private jobTypeService: JobTypeService,
    private toast: ToastService
  ) {}
  
  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.initForm();
  }
  
  private initForm() {
    this.jobForm = this.fb.group({
      typeId: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      location: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      pay: ['', [Validators.required, Validators.min(100), Validators.max(50000)]]
    });
  }
  
  onJobTypeSelected(jobType: JobTypeConfig) {
    this.selectedJobType = jobType;
    this.jobForm.patchValue({
      typeId: jobType.id
    });
    this.priceGuidance = jobType.priceGuidance;
    
    // Auto-fill price if empty
    if (!this.jobForm.get('pay')?.value) {
      this.jobForm.patchValue({
        pay: jobType.priceGuidance.min
      });
    }
  }
  
  submit() {
    if (!this.jobForm.valid || !this.currentUser || !this.selectedJobType) {
      this.toast.show('Please fill all required fields correctly');
      return;
    }
    
    const formValue = this.jobForm.value;
    
    this.jobService.postJob({
      type: this.selectedJobType.name,
      description: formValue.description,
      location: formValue.location,
      date: formValue.date,
      time: formValue.time,
      pay: Number(formValue.pay),
      postedBy: {
        id: this.currentUser.id,
        username: this.currentUser.username,
        displayName: this.currentUser.displayName,
        mobile: this.currentUser.mobile
      }
    }).subscribe(
      (newJob) => {
        this.toast.show('Job posted successfully!');
        this.jobForm.reset();
        this.selectedJobType = null;
        this.priceGuidance = null;
        this.onSuccess.emit();
      },
      (error) => {
        this.toast.show('Failed to post job: ' + error);
      }
    );
  }
  
  get description() { return this.jobForm.get('description'); }
  get location() { return this.jobForm.get('location'); }
  get date() { return this.jobForm.get('date'); }
  get time() { return this.jobForm.get('time'); }
  get pay() { return this.jobForm.get('pay'); }
}
