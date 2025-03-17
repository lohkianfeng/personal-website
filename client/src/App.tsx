import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import { useIsMobile } from "@/hooks/use-mobile";
import Sidebar from "@/components/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Breadcrumb from "@/components/breadcrumb";
import AboutMeRoutes from "@/1aboutme";
import ChatbotRoutes from "@/2chatbot";

function App() {
  const isMobile = useIsMobile();

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
            height: "calc(100vh - 4rem)",
            width: `calc(100vw - ${isMobile ? "0rem" : "18rem"})`,
          }}
          className="grow overflow-auto p-4"
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
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
