import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="admin-layout">
      <h2>Administração</h2>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
})
export class AdminLayoutComponent {}
