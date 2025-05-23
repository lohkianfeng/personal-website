import * as React from "react";
import { useLocation } from "react-router";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { User, House, Bot, PawPrint, Search, type LucideIcon } from "lucide-react";

export type MenuItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  external?: boolean;
  children?: MenuItem[];
};

export const items: MenuItem[] = [
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
    title: "Work",
    url: "work",
    children: [
      {
        title: "Simplyfi Hub",
        icon: House,
        url: "https://hub.simplyfi.co",
        external: true,
      },
    ],
  },
  {
    title: "Projects",
    url: "projects",
    children: [
      {
        title: "Chatbot",
        icon: Bot,
        url: "chatbot",
        children: [
          {
            title: "Chat Thread",
            url: "chatthread",
          },
          {
            title: "Chat Modal",
            url: "chatmodal",
          },
          {
            title: "Knowledge Base",
            url: "knowledgebase",
          },
        ],
      },
      {
        title: "Hubspot",
        icon: PawPrint,
        url: "hubspot",
        children: [
          {
            title: "Public App",
            url: "publicapp",
          },
          {
            title: "Private App",
            url: "privateapp",
          },
        ],
      },
      {
        title: "OCR",
        icon: Search,
        url: "ocr",
      },
    ],
  },
];

const findBreadcrumbs = (paths: string[], menu: MenuItem[]) => {
  const breadcrumbs: MenuItem[] = [];
  let currentMenu = menu;

  for (const path of paths) {
    const match = currentMenu.find((item) => item.url === path);
    if (!match) break;

    breadcrumbs.push(match);
    currentMenu = match.children || [];
  }

  return breadcrumbs;
};

const MyBreadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  if (!pathnames.length) return null;

  const breadcrumbs = findBreadcrumbs(pathnames, items);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {index !== breadcrumbs.length - 1 ? ( //
                <>{item.title}</>
              ) : (
                <BreadcrumbPage>{item.title}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default MyBreadcrumb;
