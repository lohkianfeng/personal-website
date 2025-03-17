import config from "@/config";
const BASE_URL = config.backend.url;

import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { AssistantRuntimeProvider } from "@assistant-ui/react";

import { AssistantModal } from "@/components/assistant-ui/assistant-modal";

const ChatModal = () => {
  const runtime = useChatRuntime({
    api: `${BASE_URL}api/chat`,
    maxSteps: 3,
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <AssistantModal />
    </AssistantRuntimeProvider>
  );
};

export default ChatModal;
