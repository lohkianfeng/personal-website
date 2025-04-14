import { Routes, Route, Navigate } from "react-router";

import ChatThread from "./chat/ChatThread";
import ChatModal from "./chat/ChatModal";
import KnowledgeBase from "./knowledgebase";

const ChatbotRoutes = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="chatthread" />} />
      <Route path="chatthread" element={<ChatThread />} />
      <Route path="chatmodal" element={<ChatModal />} />
      <Route path="knowledgebase" element={<KnowledgeBase />} />
    </Routes>
  );
};

export default ChatbotRoutes;
