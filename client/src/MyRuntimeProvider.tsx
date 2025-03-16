import type { ReactNode } from "react";
import { AssistantRuntimeProvider, useLocalRuntime, type ChatModelAdapter } from "@assistant-ui/react";

const MyModelAdapter: ChatModelAdapter = {
  async run({ messages, abortSignal }) {
    const result = await fetch("http://localhost:8000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages,
      }),
      signal: abortSignal,
    });

    const data = await result.json();
    console.log(data);
    return {
      content: [
        {
          type: "text",
          text: data.text,
        },
      ],
    };
  },
};

export function MyRuntimeProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const runtime = useLocalRuntime(MyModelAdapter);

  return <AssistantRuntimeProvider runtime={runtime}>{children}</AssistantRuntimeProvider>;
}
