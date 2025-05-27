import { promises as fs } from "fs";
import os from "os";
import path from "path";
import { nanoid } from "nanoid";

import getNumberOfPdfPages from "./getNumberOfPdfPages";
import pdfToImage from "./pdfToImage";
import imageToText from "./imageToText";

const extractPdf = async (fileBuffer: Buffer, originalname: string) => {
  const tempDir = os.tmpdir();
  const tempFilePath = path.join(tempDir, `${nanoid()}-${originalname}`);
  await fs.writeFile(tempFilePath, fileBuffer);

  const savePath = "./output-images";
  await fs.mkdir(savePath, { recursive: true });

  // 1. get number of pages from pdf
  const numPages = await getNumberOfPdfPages(tempFilePath);
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
      filePath: tempFilePath,
      pageNumber: i,
    });

    if (!imageFilePath) continue;

    // 3. convert image to text
    const text = await imageToText(imageFilePath);

    accText += text + "\n\n";

    await fs.unlink(imageFilePath);

    console.log("done page:", i);
  }

  await fs.unlink(tempFilePath);

  return accText;
};

export default extractPdf;
