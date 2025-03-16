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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { User, House, Bot, ChevronDown } from "lucide-react";

const items = [
  {
    title: "Personal",
    url: "personal",
    children: [
      {
        title: "About Me",
        icon: User,
        url: "aboutme",
      },
    ],
  },
  {
    title: "Projects",
    url: "projects",
    children: [
      {
        title: "Simplyfi Hub",
        icon: House,
        url: "https://hub.simplyfi.co",
        external: true,
      },
      {
        title: "Chatbot",
        icon: Bot,
        url: "chatbot",
        children: [
          {
            title: "Chat",
            url: "chat",
          },
          {
            title: "Knowledge Base",
            url: "knowledgebase",
          },
        ],
      },
    ],
  },
];

const MySidebar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        {items.map((level1, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupLabel>{level1.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {level1.children.map((level2, index) => (
                  <SidebarMenuItem key={index}>
                    {!level2.children ? (
                      <SidebarMenuButton asChild>
                        <Link
                          to={
                            level2.external //
                              ? level2.url
                              : `${level1.url}/${level2.url}`
                          }
                          target={level2.external ? "_blank" : undefined}
                        >
                          <level2.icon />
                          <span>{level2.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    ) : (
                      <Collapsible defaultOpen className="group/collapsible">
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton>
                            <level2.icon />
                            {level2.title}
                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {level2.children?.map((level3, index) => (
                              <SidebarMenuSubItem key={index}>
                                <SidebarMenuSubButton asChild>
                                  <Link
                                    to={
                                      level3.external //
                                        ? level3.url
                                        : `${level1.url}/${level2.url}/${level3.url}`
                                    }
                                    target={level3.external ? "_blank" : undefined}
                                  >
                                    <span>{level3.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};

export default MySidebar;
