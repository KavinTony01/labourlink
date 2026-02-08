import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
  <div class="app-bg">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" *ngIf="showNavbar">
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
    <div [ngClass]="{'container py-4': showNavbar}">
      <router-outlet></router-outlet>
    </div>
    <app-toast></app-toast>
  </div>
  `
})
export class AppComponent implements OnInit {
  currentUser = this.auth.getCurrentUser();
  showNavbar = false;

  constructor(private auth: AuthService, private router: Router) {
    this.auth.currentUser$.subscribe(u => this.currentUser = u);
  }

  ngOnInit(): void {
    // Listen to route changes to show/hide navbar
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Hide navbar on welcome page, login page, and root, show on all other pages
      this.showNavbar = !event.url.includes('welcome') && event.url !== '/' && !event.url.includes('/login');
    });

    // Check initial route
    const user = this.auth.getCurrentUser();
    if (!user && this.router.url !== '/' && this.router.url !== '/welcome' && !this.router.url.includes('/login')) {
      this.router.navigate(['/'], { replaceUrl: true });
    }
  }

  logout() {
    this.auth.logout();
    // navigate to login and replace history so back button won't return to protected pages
    this.router.navigate(['/login'], { replaceUrl: true }).then(() => setTimeout(() => location.reload(), 50));
  }
}
