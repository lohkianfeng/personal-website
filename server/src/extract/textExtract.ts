import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";

import schemaBuild, { type SchemaFieldT } from "./schemaBuilder";

const textExtract = async (
  //
  model = "gpt-4.1-nano",
  prompt: string,
  fields: SchemaFieldT[],
  text: string
) => {
  const schema = schemaBuild(fields);

  const result = await generateObject({
    model: openai(model, {
      structuredOutputs: true,
    }),
    schema: schema,
    prompt: `${prompt}\n\n${text}`,
  });

  const { object, usage } = result;

  return { object, usage };
};

export default textExtract;
