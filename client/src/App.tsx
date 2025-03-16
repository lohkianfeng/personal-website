import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { AssistantRuntimeProvider } from "@assistant-ui/react";

import { ThreadList } from "@/components/assistant-ui/thread-list";
import { Thread } from "@/components/assistant-ui/thread";

import { AssistantModal } from "@/components/assistant-ui/assistant-modal";

import { MyRuntimeProvider } from "./MyRuntimeProvider";

function App() {
  const runtime = useChatRuntime({
    api: "http://localhost:5000/api/chat",
  });

  return (
    <MyRuntimeProvider>
      <AssistantRuntimeProvider runtime={runtime}>
        <div className="grid h-dvh grid-cols-[200px_1fr] gap-x-2 px-4 py-4">
          <ThreadList />
          <Thread />
        </div>
      </AssistantRuntimeProvider>

      <AssistantRuntimeProvider runtime={runtime}>
        <AssistantModal />
      </AssistantRuntimeProvider>
    </MyRuntimeProvider>
  );
}

export default App;
