import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  form: FormGroup;
  error: string | null = null;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({ username: ['', Validators.required], password: ['', Validators.required] });
  }

  get seededUsers() { return this.auth.getAllUsers(); }

  get isLoggedIn() { return !!this.auth.getCurrentUser(); }

  submit() {
    this.error = null;
    const { username, password } = this.form.value;
    const ok = this.auth.login(username, password);
    if (!ok) { this.error = 'Invalid credentials'; return; }
    const user = this.auth.getCurrentUser();
    if (user?.role === 'Client') this.router.navigate(['/client']);
    else if (user?.role === 'Worker') this.router.navigate(['/worker']);
    else if (user?.role === 'Admin') this.router.navigate(['/admin']);
    else this.router.navigate(['/login']);
  }
}
