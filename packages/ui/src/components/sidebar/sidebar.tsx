'use client';

import * as React from 'react';

// import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '../../sidebar';
import { ScanLine } from 'lucide-react';
import { SidebarSearchForm } from './search-form';
import { useSelectedLayoutSegments } from 'next/navigation';
import { navigationItems } from '../navigation';
import { NavigationItem, NavigationParentItem } from '../navigation';

const data = {
  teams: [
    {
      name: 'InnovaCraft',
      logo: 'https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp1/logo-01_kp2j8x.png',
    },
    {
      name: 'Acme Corp.',
      logo: 'https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp1/logo-01_kp2j8x.png',
    },
    {
      name: 'Evil Corp.',
      logo: 'https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp1/logo-01_kp2j8x.png',
    },
  ],
  navMain: [
    {
      title: 'Sections',
      url: '#',
      items: [
        {
          title: 'Dashboard',
          url: '#',
          icon: ScanLine,
          active: true,
        },
      ],
    },
    {
      title: 'Other',
      url: '#',
      items: [
        {
          title: 'Settings',
          url: '#',
          icon: ScanLine,
        },
        {
          title: 'Help Center',
          url: '#',
          icon: ScanLine,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const layoutSegment = useSelectedLayoutSegments();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        {/*<TeamSwitcher teams={data.teams} />
        <hr className="border-t border-border mx-2 -mt-px" />
*/}
        <SidebarSearchForm className="mt-3" />
      </SidebarHeader>
      <SidebarContent>
        {navigationItems.map((item: NavigationParentItem) => (
          <SidebarGroup key={item.name}>
            <SidebarGroupLabel className="uppercase text-muted-foreground/60">
              {item.name}
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-2">
              <SidebarMenu>
                {item.children?.map((item: NavigationItem) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className="group/menu-button font-medium gap-3 h-9 rounded-md hover:bg-transparent hover:from-sidebar-accent hover:to-sidebar-accent/40 data-[active=true]:from-primary/20 data-[active=true]:to-primary/5 [&>svg]:size-auto"
                      isActive={item.href === `/${layoutSegment.join('/')}`}
                    >
                      <a href={item.href}>
                        {item.icon && (
                          <item.icon
                            className="text-muted-foreground/60 group-data-[active=true]/menu-button:text-primary"
                            size={22}
                            aria-hidden="true"
                          />
                        )}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <hr className="border-t border-border mx-2 -mt-px" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="font-medium gap-3 h-9 rounded-md bg-gradient-to-r hover:bg-transparent hover:from-sidebar-accent hover:to-sidebar-accent/40 data-[active=true]:from-primary/20 data-[active=true]:to-primary/5 [&>svg]:size-auto">
              {/* <RiLogoutBoxLine
                className="text-muted-foreground/60 group-data-[active=true]/menu-button:text-primary"
                size={22}
                aria-hidden="true"
              /> */}
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
