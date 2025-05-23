import { openai } from "@ai-sdk/openai";
import { streamText, tool, generateObject } from "ai";
import { z } from "zod";

import pool from "../../drizzle/pool";

export const maxDuration = 30;

import { Request, Response } from "express";

const postChat = async (req: Request, res: Response): Promise<any> => {
  const { messages } = req.body;

  const result = streamText({
    model: openai.responses("gpt-4o-mini"),
    messages,
    system: `
      You are a helpful assistant.
      Use the queryBuilder tool first to generate a SQL query, then use the queryDatabase tool to execute it.
      After retrieving data, explain the result in clear, human-readable English.
    `,
    tools: tools,
    maxSteps: 3,
  });

  result.pipeDataStreamToResponse(res);
};

export default postChat;

const tools = {
  queryBuilder: tool({
    description: "Generate SQL query",
    parameters: z.object({
      prompt: z.string().describe("prompt to generate SQL query"),
    }),
    execute: async ({ prompt }) => queryBuilder(prompt),
  }),
  queryDatabase: tool({
    description: "Query database",
    parameters: z.object({
      query: z.string().describe("SQL query"),
    }),
    execute: async ({ query }) => queryDatabase(query),
  }),
};

export const queryBuilder = async (prompt: string) => {
  console.log(prompt);

  const result = await generateObject({
    model: openai("gpt-4o"),
    schema: z.object({
      query: z.string(),
    }),
    system: `
    You are a SQL (postgres) expert. Your job is to help the user write a SQL query to retrieve the data they need. The table schema is as follows:

    "users" (
      "id" serial PRIMARY KEY NOT NULL,
      "sub" varchar(255) NOT NULL,
      "email" varchar(255) NOT NULL,
      "created_at" timestamp WITH time zone DEFAULT NOW() NOT NULL,
      CONSTRAINT "users_sub_unique" UNIQUE("sub"),
      CONSTRAINT "users_email_unique" UNIQUE("email")
    )

    "user_role" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar(255) NOT NULL,
      CONSTRAINT "user_role_name_unique" UNIQUE("name")
    );
    >> Admin, Internal, Partner, User, Partner (Distributor)

    "user_roles" (
      "id" serial PRIMARY KEY NOT NULL,
      "user_id" integer NOT NULL,
      "user_role_id" integer DEFAULT 2 NOT NULL,
      "updated_at" timestamp WITH time zone DEFAULT NOW() NOT NULL,
      CONSTRAINT "user_roles_user_id_unique" UNIQUE("user_id")
    );

    "company" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar(255) NOT NULL,
      "created_at" timestamp WITH time zone DEFAULT NOW() NOT NULL
    );

    "company_role" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar(255) NOT NULL,
      CONSTRAINT "company_role_name_unique" UNIQUE("name")
    );
    >> Distributor, Owner (Booster), Employee, Guest, CC (Forecast), Owner (Bootcamp), Sales Partner

    "company_roles" (
      "id" serial PRIMARY KEY NOT NULL,
      "user_id" integer NOT NULL,
      "company_id" integer NOT NULL,
      "company_role_id" integer NOT NULL,
      "created_at" timestamp WITH time zone DEFAULT NOW() NOT NULL,
      "updated_at" timestamp WITH time zone DEFAULT NOW() NOT NULL
    );

    Only retrieval queries are allowed.
    `,
    prompt: prompt,
  });

  return result.object.query;
};

export const queryDatabase = async (query: string) => {
  console.log(query);

  const client = await pool.connect();

  if (!query.trim().toLowerCase().startsWith("select")) {
    return "Only SELECT queries are allowed";
  }

  try {
    await client.query("BEGIN");

    const result = await client.query(query);

    await client.query("COMMIT");

    return result.rows;
  } catch (err) {
    console.log(err);
    return err;
  } finally {
    client.release();
  }
};
