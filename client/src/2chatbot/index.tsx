import { Routes, Route, Navigate } from "react-router";

import Chat from "./chat";
import KnowledgeBase from "./knowledgebase";

const ChatbotRoutes = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="chat" />} />
      <Route path="chat" element={<Chat />} />
      <Route path="knowledgebase" element={<KnowledgeBase />} />
    </Routes>
  );
};

export default ChatbotRoutes;
