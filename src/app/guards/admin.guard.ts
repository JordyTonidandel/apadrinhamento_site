import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  async canActivate(): Promise<boolean> {
    if (this.authService.isTokenValid() && await this.authService.hasRole('Administrator')) {
      return true;
    }
    this.router.navigate(['/unauthorized']);
    return false;
  }

}
