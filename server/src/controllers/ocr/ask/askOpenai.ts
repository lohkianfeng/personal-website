import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

const askOpenai = async (
  //
  model = "gpt-4.1-nano",
  object: any
) => {
  const prompt = `
    You are an insurance advisor who explains policies to everyday people.
    Read the following insurance policy details and provide a clear, practical summary focused on what matters most to the policyholder:

    - What happens if the policyholder passes away?
    - What medical conditions or disabilities are covered, and what benefits apply?
    - How and when are payments made, and what happens if they miss payments?
    - What are the key benefits they can expect in daily life?
    - Highlight anything important or limitations they should know in simple terms.

    Avoid technical jargon unless necessary, and use language that an average person would find helpful and reassuring.

    Policy details:
    ${JSON.stringify(object, null, 2)}
  `;

  const result = await generateText({
    model: openai.responses(model),
    prompt: prompt,
    tools: {
      web_search_preview: openai.tools.webSearchPreview(),
    },
    toolChoice: { type: "tool", toolName: "web_search_preview" },
  });

  return result;
};

export default askOpenai;
