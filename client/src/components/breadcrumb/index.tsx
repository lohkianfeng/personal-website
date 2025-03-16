import { useLocation } from "react-router";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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

const MyBreadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const firstSegment = pathnames[0];
  const personalMatch = personal.find((item) => item.url === firstSegment);
  const projectMatch = projects.find((item) => item.url === firstSegment);

  const category = personalMatch ? "Personal" : projectMatch ? "Projects" : null;
  const matchedItem = personalMatch || projectMatch;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <span>{category}</span>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{matchedItem?.title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default MyBreadcrumb;
