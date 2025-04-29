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
    heading: 'HOME',
    children: [
      {
        name: 'Courses',
        icon: 'solar:home-2-broken',
        id: uniqueId(),
        url: '/',
      },
    ],
  },
  {
    heading: 'ADMIN',
    children: [
      // {
      //   name: 'Dashboard',
      //   icon: 'solar:widget-add-line-duotone',
      //   id: uniqueId(),
      //   url: '/admin',
      // },
      {
        name: 'Course Manager',
        icon: 'solar:square-academic-cap-2-outline',
        id: uniqueId(),
        url: '/admin/courses',
      },
      {
        name: 'Purshases',
        icon: 'solar:chat-round-money-linear',
        id: uniqueId(),
        url: '/admin/purshases',
      },
    ],
  },
  {
    heading: 'AUTH',
    children: [
      {
        name: 'Logout',
        icon: 'solar:login-2-linear',
        id: uniqueId(),
        url: '/logout',
      },
    ],
  },
];

export default SidebarContent;
