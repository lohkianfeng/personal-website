import tesseract, { type Input, type Config } from "node-tesseract-ocr";

const imageToText = async (input: Input, config?: Config) => {
  const text = await tesseract.recognize(input, config);

  return text;
};

export default imageToText;
