'use client';

import { Home, Info } from 'lucide-react';

export type NavigationParentItem = {
  name: string;
  children?: NavigationItem[];
};

export type NavigationItem = {
  title: string;
  href?: string;
  onClick?: () => void;
  // TODO: assign proper type
  icon?: any;
};

type Navigation = NavigationParentItem;

export const navigationItems: Navigation[] = [
  {
    name: 'General',
    children: [
      {
        title: 'Dashboard',
        href: '/',
        icon: Home,
      },
    ],
  },
];
