import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
  <div class="app-bg">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" routerLink="/">labourlink</a>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item" *ngIf="!currentUser"><a class="nav-link" routerLink="/login">Login</a></li>

            <!-- When logged in show links relevant to the user -->
            <ng-container *ngIf="currentUser">
              <li class="nav-item"><a class="nav-link" [routerLink]="currentUser.role === 'Client' ? '/client' : '/worker'">Dashboard</a></li>
              <li class="nav-item"><a class="nav-link" routerLink="/profile">Profile</a></li>
              <li class="nav-item d-flex align-items-center">
                <button class="btn btn-sm btn-outline-light me-2" (click)="logout()">Logout</button>
                <div class="nav-avatar">{{currentUser.displayName.charAt(0)}}</div>
                <span class="mx-2 text-white">{{currentUser.displayName}}</span>
              </li>
            </ng-container>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container py-4">
      <router-outlet></router-outlet>
    </div>
    <app-toast></app-toast>
  </div>
  `
})
export class AppComponent implements OnInit {
  currentUser = this.auth.getCurrentUser();
  private firstInit = true;
  constructor(private auth: AuthService, private router: Router) {
    this.auth.currentUser$.subscribe(u => this.currentUser = u);
  }

  ngOnInit(): void {
    // On application launch always clear any existing session so each launch starts a fresh login
    // This ensures previous sessions can't remain active across app launches.
    if (this.firstInit) {
      this.firstInit = false;
      this.auth.logout();
      // ensure router is at login
      this.router.navigate(['/login'], { replaceUrl: true });
    }
  }

  logout() {
    this.auth.logout();
    // navigate to login and replace history so back button won't return to protected pages
    this.router.navigate(['/login'], { replaceUrl: true }).then(() => setTimeout(() => location.reload(), 50));
  }
}
