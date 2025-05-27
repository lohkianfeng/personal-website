import { promises as fs } from "fs";
import pdfParse, { type Options } from "pdf-parse";

const getNumberOfPdfPages = async (path: string, options?: Options) => {
  const dataBuffer = await fs.readFile(path);
  const { numpages } = await pdfParse(dataBuffer, options);

  return numpages;
};

export default getNumberOfPdfPages;
