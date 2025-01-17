import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/footer/footer.component";
import { HeaderComponent } from "./shared/header/header.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'encanto_apadrinhamento';

  hideHeaderFooter: boolean = false;
  private routesToHideHeaderFooter = ['/login', '/registro'];

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.hideHeaderFooter = this.routesToHideHeaderFooter.includes(this.router.url);
    });
  }
}
