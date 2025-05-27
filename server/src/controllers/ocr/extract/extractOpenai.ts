import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";

import schemaBuild, { type SchemaFieldT } from "./schemaBuilder";

const extractOpenai = async (
  //
  model = "gpt-4.1-nano",
  prompt: string,
  fields: SchemaFieldT[],
  content: string
) => {
  const schema = schemaBuild(fields);

  const result = await generateObject({
    model: openai(model, {
      structuredOutputs: true,
    }),
    schema: schema,
    prompt: `${prompt}\n\n${content}`,
  });

  const { object, usage } = result;

  return { object, usage };
};

export default extractOpenai;
