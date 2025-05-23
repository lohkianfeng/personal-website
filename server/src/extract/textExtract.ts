import { z } from "zod";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";

import "dotenv/config";

const policyScheduleSchema = z.object({
  policyholderName: z.string().nullable(),
  policyNumber: z.string().nullable(),
  policyStartDate: z
    .string()
    .datetime()
    .nullable()
    .transform((val) => (val ? val.split("T")[0] : null)),
  policyEndDate: z
    .string()
    .datetime()
    .nullable()
    .transform((val) => (val ? val.split("T")[0] : null)),
  sumAssured: z.string().nullable(),
  premiumAmount: z.string().nullable(),
  paymentFrequency: z.string().nullable(),
  nomineeName: z.string().nullable(),
  planName: z.string().nullable(),
});

const textExtract = async (model = "gpt-4.1-nano", prompt: string, text: string) => {
  const result = await generateObject({
    model: openai(model, {
      structuredOutputs: true,
    }),
    schema: policyScheduleSchema,
    prompt: `${prompt}\n\n${text}`,
  });

  const { object, usage } = result;

  return { object, usage };
};

export default textExtract;
