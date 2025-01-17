import { AuthService } from './../../services/auth.service'
import { Component } from '@angular/core'
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome'
import { faBars, faCogs } from '@fortawesome/free-solid-svg-icons'
import { MenuDashboard } from '../../models/menuDashboard'
import { MenuService } from '../../services/menu.service'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-dashboard',
  imports: [FontAwesomeModule, CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  menus: MenuDashboard[] = []
  expandedMenu: string | null = null;
  faBars = faBars;
  faCogs = faCogs;



  constructor(private authService: AuthService, private library: FaIconLibrary, private menuService: MenuService) {
    this.library.addIcons(faBars, faCogs)
  }

  ngOnInit() {
    this.authService.getUserRoles().then((roles) => {
      this.menuService.getMenuItems(roles).then((menus) => {
        this.menus = menus
      })
    })
  }

  toggleMenu(label: string): void {
    this.expandedMenu = this.expandedMenu === label ? null : label;
  }

  async logout() {
    await this.authService.logout()
  }


}
