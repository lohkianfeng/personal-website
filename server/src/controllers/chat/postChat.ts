import { openai } from "@ai-sdk/openai";
import { streamText, tool } from "ai";
import { z } from "zod";

export const maxDuration = 30;

import { Request, Response } from "express";

import path from "path";
import fs from "fs";
const filePath = path.join(process.cwd(), "data", "restaurant.json");
const restaurant = JSON.parse(fs.readFileSync(filePath, "utf-8"));

const postChat = async (req: Request, res: Response): Promise<any> => {
  const { messages } = req.body;

  const result = streamText({
    model: openai.responses("gpt-4o-mini"),
    messages,
    system: `
      You are a helpful assistant. Check your knowledge base before answering any questions.
      Only respond to questions using information from tool calls.
      If no relevant information is found in the tool calls, respond "Sorry, I don't know.".
    `,
    tools: {
      getRestaurants: tool({
        description: "Fetch a list of all restaurants from the knowledge base.",
        parameters: z.object({}), // No parameters needed
        execute: async () => restaurant,
      }),
    },
  });

  result.pipeDataStreamToResponse(res);
};

export default postChat;
