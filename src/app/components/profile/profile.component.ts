import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: User | null = null;
  activeTab: 'basic' | 'professional' | 'business' | 'security' | 'preferences' = 'basic';

  basicForm!: FormGroup;
  professionalForm!: FormGroup;
  businessForm!: FormGroup;
  securityForm!: FormGroup;
  preferencesForm!: FormGroup;

  isEditingBasic = false;
  isEditingProfessional = false;
  isEditingBusiness = false;
  isEditingPreferences = false;
  isSavingPassword = false;

  // Dropdown options
  experienceOptions = [
    { label: 'Less than 1 year', value: '0-1' },
    { label: '1-2 years', value: '1-2' },
    { label: '3-5 years', value: '3-5' },
    { label: '5-10 years', value: '5-10' },
    { label: '10+ years', value: '10+' }
  ];

  availabilityOptions = [
    { label: 'Available', value: 'available' },
    { label: 'Busy', value: 'busy' },
    { label: 'On Leave', value: 'on_leave' }
  ];

  businessTypeOptions = [
    { label: 'Individual', value: 'individual' },
    { label: 'Small Business', value: 'small_business' },
    { label: 'Company', value: 'company' },
    { label: 'Enterprise', value: 'enterprise' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.currentUser = user;
      this.initializeForms();
    } else {
      this.router.navigate(['/login']);
    }
  }

  private initializeForms() {
    // Basic Information Form
    this.basicForm = this.formBuilder.group({
      displayName: [this.currentUser?.displayName || '', [Validators.required, Validators.minLength(2)]],
      email: [this.currentUser?.email || '', [Validators.required, Validators.email]],
      mobile: [this.currentUser?.mobile || '', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      location: [this.currentUser?.location || '', Validators.required],
      bio: [this.currentUser?.bio || '', [Validators.maxLength(200)]]
    });

    // Professional Form (Workers only)
    this.professionalForm = this.formBuilder.group({
      yearsOfExperience: [this.currentUser?.yearsOfExperience || '0-1', Validators.required],
      specializations: [this.currentUser?.specializations || '', Validators.required],
      languages: [this.currentUser?.languages || '', Validators.required],
      certifications: [this.currentUser?.certifications || ''],
      hourlyRate: [this.currentUser?.hourlyRate || '', [Validators.min(0), Validators.max(99999)]],
      availabilityStatus: [this.currentUser?.availabilityStatus || 'available', Validators.required]
    });

    // Business Form (Clients only)
    this.businessForm = this.formBuilder.group({
      companyName: [this.currentUser?.companyName || '', Validators.required],
      industry: [this.currentUser?.industry || '', Validators.required],
      businessType: [this.currentUser?.businessType || 'individual', Validators.required],
      businessAddress: [this.currentUser?.businessAddress || '', Validators.required],
      website: [this.currentUser?.website || '', [Validators.pattern(/^(https?:\/\/)?.+\..+/i)]]
    });

    // Security Form
    this.securityForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });

    // Preferences Form
    this.preferencesForm = this.formBuilder.group({
      emailNotifications: [true],
      smsAlerts: [false],
      privacyMode: [false],
      jobAlerts: [true],
      messageNotifications: [true]
    });
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: any } | null {
    const password = group.get('newPassword')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  onAvatarChange(newAvatar: string) {
    if (this.currentUser) {
      this.currentUser.avatar = newAvatar;
      // Save to localStorage
      const user = this.authService.getCurrentUser();
      if (user) {
        user.avatar = newAvatar;
        localStorage.setItem('labourlink_current_user', JSON.stringify(user));
        this.toastService.show('Avatar updated successfully!');
      }
    }
  }

  saveBasicInfo() {
    if (this.basicForm.valid) {
      const user = this.authService.getCurrentUser();
      if (user) {
        user.displayName = this.basicForm.value.displayName;
        user.email = this.basicForm.value.email;
        user.mobile = this.basicForm.value.mobile;
        user.location = this.basicForm.value.location;
        user.bio = this.basicForm.value.bio;

        localStorage.setItem('labourlink_current_user', JSON.stringify(user));
        this.currentUser = user;
        this.isEditingBasic = false;
        this.toastService.show('Basic information updated successfully!');
      }
    }
  }

  saveProfessionalInfo() {
    if (this.professionalForm.valid && this.currentUser?.role === 'Worker') {
      const user = this.authService.getCurrentUser();
      if (user) {
        user.yearsOfExperience = this.professionalForm.value.yearsOfExperience;
        user.specializations = this.professionalForm.value.specializations;
        user.languages = this.professionalForm.value.languages;
        user.certifications = this.professionalForm.value.certifications;
        user.hourlyRate = this.professionalForm.value.hourlyRate;
        user.availabilityStatus = this.professionalForm.value.availabilityStatus;

        localStorage.setItem('labourlink_current_user', JSON.stringify(user));
        this.currentUser = user;
        this.isEditingProfessional = false;
        this.toastService.show('Professional information updated successfully!');
      }
    }
  }

  saveBusinessInfo() {
    if (this.businessForm.valid && this.currentUser?.role === 'Client') {
      const user = this.authService.getCurrentUser();
      if (user) {
        user.companyName = this.businessForm.value.companyName;
        user.industry = this.businessForm.value.industry;
        user.businessType = this.businessForm.value.businessType;
        user.businessAddress = this.businessForm.value.businessAddress;
        user.website = this.businessForm.value.website;

        localStorage.setItem('labourlink_current_user', JSON.stringify(user));
        this.currentUser = user;
        this.isEditingBusiness = false;
        this.toastService.show('Business information updated successfully!');
      }
    }
  }

  changePassword() {
    if (this.securityForm.valid) {
      this.isSavingPassword = true;

      // Simulate password change
      setTimeout(() => {
        this.isSavingPassword = false;
        this.securityForm.reset();
        this.toastService.show('Password changed successfully!');
      }, 1000);
    }
  }

  savePreferences() {
    if (this.preferencesForm.valid) {
      const user = this.authService.getCurrentUser();
      if (user) {
        user.preferences = this.preferencesForm.value;
        localStorage.setItem('labourlink_current_user', JSON.stringify(user));
        this.currentUser = user;
        this.toastService.show('Preferences updated successfully!');
      }
    }
  }

  logout() {
    if (confirm('Are you sure you want to logout?')) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }

  getStatLabel(stat: string): string {
    const labels: { [key: string]: string } = {
      jobsCompleted: 'Jobs Completed',
      successRate: 'Success Rate',
      avgRating: 'Avg Rating',
      totalEarnings: 'Total Earnings',
      jobsPosted: 'Jobs Posted',
      totalSpent: 'Total Spent',
      workerSatisfaction: 'Worker Satisfaction',
      repeatBooking: 'Repeat Booking Rate',
      memberSince: 'Member Since'
    };
    return labels[stat] || stat;
  }

  getStatValue(stat: string): string {
    const stats: { [key: string]: string } = {
      jobsCompleted: this.currentUser?.jobsCompleted?.toString() || '0',
      successRate: (this.currentUser?.successRate || 0) + '%',
      avgRating: (this.currentUser?.avgRating || 0).toFixed(1),
      totalEarnings: '₹' + (this.currentUser?.totalEarnings || 0).toLocaleString(),
      jobsPosted: this.currentUser?.jobsPosted?.toString() || '0',
      totalSpent: '₹' + (this.currentUser?.totalSpent || 0).toLocaleString(),
      workerSatisfaction: (this.currentUser?.workerSatisfaction || 0) + '%',
      repeatBooking: (this.currentUser?.repeatBooking || 0) + '%',
      memberSince: this.currentUser?.memberSince || 'N/A'
    };
    return stats[stat] || '';
  }
}
