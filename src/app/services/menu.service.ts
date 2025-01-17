import { Injectable } from '@angular/core';
import { MenuDashboard } from '../models/menuDashboard';
import { BehaviorSubject } from 'rxjs';
import { faBars, faCog, faUser } from '@fortawesome/free-solid-svg-icons';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuItems = new BehaviorSubject<MenuDashboard[]>([
    {
      label: 'Administração',
      icon: faCog,
      route: '/admin',
      roles: ['Administrator', 'Owner'],
      children: [
        { label: 'Configurações do Sistema', route: '/admin/configuracoes', roles: ['Administrator', 'Owner'] },
        { label: 'Cadastro de Empresas', route: '/admin/empresas', roles: ['Administrator', 'Owner'] },
        { label: 'Cadastro de Usuarios', route: '/admin/usuarios', roles: ['Owner'] },
      ],
    }
  ]);

  constructor() { }

  async getMenuItems(roles: string[]): Promise<MenuDashboard[]> {
    return this.menuItems.value
    .filter((menu) => menu.roles.some((role) => roles.includes(role)))
    .map((menu) => ({
      ...menu,
      children: menu.children?.filter((submenu) =>
        submenu.roles.some((role) => roles.includes(role))
      ),
    }));
  }
}
