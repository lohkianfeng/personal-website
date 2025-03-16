import { Routes, Route } from "react-router";

import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { AssistantRuntimeProvider } from "@assistant-ui/react";

import { ThreadList } from "@/components/assistant-ui/thread-list";
import { Thread } from "@/components/assistant-ui/thread";

import { AssistantModal } from "@/components/assistant-ui/assistant-modal";

const ChatbotRoutes = () => {
  const runtime = useChatRuntime({
    api: "http://localhost:5000/api/chat",
  });

  return (
    <Routes>
      <Route
        index
        element={
          <>
            <AssistantRuntimeProvider runtime={runtime}>
              <div className="flex h-full">
                <div className="w-60">
                  <ThreadList />
                </div>
                <div className="grow">
                  <Thread />
                </div>
              </div>
            </AssistantRuntimeProvider>

            <AssistantRuntimeProvider runtime={runtime}>
              <AssistantModal />
            </AssistantRuntimeProvider>
          </>
        }
      />
    </Routes>
  );
};

export default ChatbotRoutes;
