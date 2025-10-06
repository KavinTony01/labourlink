import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.auth.getCurrentUser();
    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }
    const requiredRole = route.data['role'] as string | undefined;
    if (requiredRole && user.role !== requiredRole) {
      // redirect to correct dashboard
      if (user.role === 'Client') this.router.navigate(['/client']);
      else if (user.role === 'Worker') this.router.navigate(['/worker']);
      else this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
