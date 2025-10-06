import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder, public auth: AuthService) {
    const u = auth.getCurrentUser();
    this.form = this.fb.group({ displayName: [u?.displayName || '', Validators.required], mobile: [u?.mobile || '', [Validators.required, Validators.pattern(/^\d{10}$/)]] });
  }

  save() {
    if (this.form.invalid) return;
    this.auth.updateProfile(this.form.value);
    alert('Profile updated (in-memory)');
  }
}
