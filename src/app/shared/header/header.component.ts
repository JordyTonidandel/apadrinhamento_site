import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { faCoffee, faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(public authService: AuthService, private router: Router) {}

  faCoffee = faCoffee;
  faMusic = faMusic;
  user = localStorage.getItem('user');

  logout() {
    this.authService.logout();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  navigateOnClick(): void {
    if (this.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/home']);
    }
  }
}
