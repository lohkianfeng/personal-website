import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import { useIsMobile } from "@/hooks/use-mobile";
import Sidebar from "@/components/sidebar";
import { useSidebar, SidebarTrigger } from "@/components/ui/sidebar";
import Breadcrumb from "@/components/breadcrumb";
import AboutMeRoutes from "@/1aboutme";
import ChatbotRoutes from "@/2chatbot";
import HubspotRoutes from "@/3hubspot";

function App() {
  const isMobile = useIsMobile();
  const { open } = useSidebar();

  return (
    <BrowserRouter>
      <Sidebar />
      <div
        style={{
          height: "calc(100vh)",
          width: "calc(100vw)",
        }}
      >
        <div className="flex h-12 items-center gap-4 border-b px-4">
          <SidebarTrigger />
          <Breadcrumb />
        </div>

        <div
          style={{
            height: "calc(100vh - 3rem)",
            width: `calc(100vw -  ${
              !isMobile && open //
                ? "16rem"
                : "0rem"
            })`,
          }}
          className="grow overflow-auto"
        >
          <Routes>
            <Route index element={<Navigate to="personal" />} />

            <Route path="personal">
              <Route index element={<Navigate to="aboutme" />} />
              <Route path="aboutme/*" element={<AboutMeRoutes />} />
            </Route>

            <Route path="projects">
              <Route index element={<Navigate to="chatbot" />} />
              <Route path="chatbot/*" element={<ChatbotRoutes />} />
              <Route path="hubspot/*" element={<HubspotRoutes />} />
            </Route>

            <Route path="hubspot">
              <Route
                path="callback/*"
                element={
                  <>
                    <h1>here</h1>
                  </>
                }
              />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
