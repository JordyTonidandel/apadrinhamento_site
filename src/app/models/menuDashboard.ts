import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface MenuDashboard {
  label: string;
  icon: IconDefinition;
  route: string;
  roles: string[];
  children: SubMenuDashboard[];
}

export interface SubMenuDashboard {
  label: string;
  route: string;
  roles: string[];
}
