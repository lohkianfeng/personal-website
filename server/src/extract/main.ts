import { promises as fs } from "fs";
import { nanoid } from "nanoid";

import getNumberOfPdfPages from "./getNumberOfPdfPages";
import pdfToImage from "./pdfToImage";
import imageToText from "./imageToText";
import textExtract from "./textExtract";

const main = async () => {
  if (process.argv.length !== 3) {
    console.error("Usage: tsx extract.ts <path_to_your_scanned_pdf>");
    return;
  }

  const filePath: string = process.argv[2];

  const savePath = "./output-images";
  await fs.mkdir(savePath, { recursive: true });

  // 1. get number of pages from pdf
  const numPages = await getNumberOfPdfPages(filePath);
  console.log("pages:", numPages);

  const saveFilename = nanoid();
  let accText = "";

  const width = 1440;
  const density = 300;

  for (let i = 1; i <= numPages; i++) {
    // 2. convert pdf to image
    const imageFilePath = await pdfToImage({
      width,
      density,
      savePath,
      saveFilename,
      filePath,
      pageNumber: i,
    });
    if (!imageFilePath) return;

    // 3. convert image to text
    const text = await imageToText(imageFilePath);

    accText += text + "\n\n";

    await fs.unlink(imageFilePath);

    console.log("done page:", i);
  }

  // 4. extract text
  const { object, usage } = await textExtract(accText);

  console.log(object);
  console.log(usage);
};

main();
