import { z } from "zod";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";

import "dotenv/config";

const policyScheduleSchema = z.object({
  policyholderName: z.string(),
  policyNumber: z.string(),
  policyStartDate: z.string(),
  policyEndDate: z.string(),
  sumAssured: z.string(),
  premiumAmount: z.string(),
  paymentFrequency: z.string(),
  nomineeName: z.string(),
  planName: z.string(),
});

const textExtract = async (text: string) => {
  const result = await generateObject({
    model: openai("gpt-4.1-nano", {
      structuredOutputs: true,
    }),
    schema: policyScheduleSchema,
    schemaName: "PolicySchedule",
    schemaDescription: "Extracted policy schedule details from a life insurance document.",
    prompt: `Extract life insurance policy schedule details from this document:\n\n${text}`,
  });

  const { object, usage } = result;

  return { object, usage };
};

export default textExtract;
