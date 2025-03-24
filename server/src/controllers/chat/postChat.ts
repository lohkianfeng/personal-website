import { openai } from "@ai-sdk/openai";
import { streamText, tool } from "ai";
import { z } from "zod";

// import createResource from "../../lib/actions/resources";
// import { findRelevantContent } from "../../lib/ai/embedding";

export const maxDuration = 30;

import { Request, Response } from "express";

import path from "path";
import fs from "fs";
const filePath = path.join(process.cwd(), "data", "restaurant.json");
const restaurant = JSON.parse(fs.readFileSync(filePath, "utf-8"));
// const filePath2 = path.join(process.cwd(), "data", "financial.json");
// const financial = JSON.parse(fs.readFileSync(filePath2, "utf-8"));

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
      // getFinancials: tool({
      //   description: "Fetch user's financials from the knowledge base.",
      //   parameters: z.object({}),
      //   execute: async () => financial,
      // }),
      // addResource: tool({
      //   description: `add a resource to your knowledge base.
      //       If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation.`,
      //   parameters: z.object({
      //     content: z.string().describe("the content or resource to add to the knowledge base"),
      //   }),
      //   execute: async ({ content }) => createResource({ content }),
      // }),
      // getInformation: tool({
      //   description: `get information from your knowledge base to answer questions.`,
      //   parameters: z.object({
      //     question: z.string().describe("the users question"),
      //   }),
      //   execute: async ({ question }) => findRelevantContent(question),
      // }),
    },
  });

  result.pipeDataStreamToResponse(res);
};

export default postChat;
