import config from "@/config";
const BASE_URL = config.backend.url;

import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { AssistantRuntimeProvider } from "@assistant-ui/react";

// import { ThreadList } from "@/components/assistant-ui/thread-list";
import { Thread } from "@/components/assistant-ui/thread";

const ChatThread = () => {
  const runtime = useChatRuntime({
    api: `${BASE_URL}api/chat`,
    maxSteps: 3,
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="flex h-full">
        {/* <div className="w-60">
            <ThreadList />
          </div> */}
        <div className="grow">
          <Thread />
        </div>
      </div>
    </AssistantRuntimeProvider>
  );
};

export default ChatThread;
