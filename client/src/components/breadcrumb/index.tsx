import * as React from "react";
import { useLocation } from "react-router";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { User, House, Bot } from "lucide-react";

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

const findBreadcrumbs = (paths, menu) => {
  let breadcrumbs = [];
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
