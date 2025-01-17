import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  imports: [],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.scss'
})
export class UnauthorizedComponent {
  counter = 5;
  intervalId: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.counter--;
      if (this.counter === 0) {
        this.redirectNow();
      }
    }, 1000);
  }

  redirectNow(): void {
    clearInterval(this.intervalId);
    this.router.navigate(['/dashboard']);
  }
}
