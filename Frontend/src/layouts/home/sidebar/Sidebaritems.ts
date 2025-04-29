export interface ChildItem {
  id?: number | string;
  name?: string;
  icon?: any;
  children?: ChildItem[];
  item?: any;
  url?: any;
  color?: string;
}

export interface MenuItem {
  heading?: string;
  name?: string;
  icon?: any;
  id?: number;
  to?: string;
  items?: MenuItem[];
  children?: ChildItem[];
  url?: any;
}

import { uniqueId } from 'lodash';

const SidebarContent: MenuItem[] = [
  {
    heading: 'MENU',
    children: [
      {
        name: 'Courses',
        icon: 'solar:password-minimalistic-outline',
        id: uniqueId(),
        url: '/',
      },
      {
        name: 'Admin Dashboard',
        icon: 'solar:airbuds-case-charge-outline',
        id: uniqueId(),
        url: '/admin',
      },
    ],
  },
];

export default SidebarContent;
