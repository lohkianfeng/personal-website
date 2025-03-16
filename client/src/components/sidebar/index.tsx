import { Link } from "react-router";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { User, House, Bot } from "lucide-react";

const personal = [
  {
    title: "About Me",
    url: "aboutme",
    icon: User,
    newTab: false,
  },
];

const projects = [
  {
    title: "Simplyfi Hub",
    url: "https://hub.simplyfi.co",
    icon: House,
    newTab: true,
  },
  {
    title: "Chatbot",
    url: "chatbot",
    icon: Bot,
    newTab: false,
  },
];

const MySidebar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Personal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {personal.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} target={item.newTab ? "_blank" : undefined}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} target={item.newTab ? "_blank" : undefined}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default MySidebar;
