import { openai } from "@ai-sdk/openai";
import { jsonSchema, streamText } from "ai";

export const maxDuration = 30;

import { Request, Response } from "express";

const postChat = async (req: Request, res: Response): Promise<any> => {
  const { messages, system, tools } = req.body;

  console.log(req.body);

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages,
    system,
    tools: Object.fromEntries(
      Object.keys(tools).map((name) => [name, { ...tools[name], parameters: jsonSchema(tools[name].parameters) }])
    ),
  });

  result.pipeDataStreamToResponse(res);
};

export default postChat;
