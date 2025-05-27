import { fromPath } from "pdf2pic";
import { type Options } from "pdf2pic/dist/types/options";

const pdfToImage = async ({
  width = 1440,
  density = 300,
  savePath,
  saveFilename,
  filePath,
  pageNumber,
}: {
  width: number;
  density: number;
  savePath: string;
  saveFilename: string;
  filePath: string;
  pageNumber: number;
}) => {
  const options: Options = {
    format: "png",
    preserveAspectRatio: true,
    width: width,
    density: density,
    savePath: savePath,
    saveFilename: saveFilename,
  };

  const convert = fromPath(filePath, options);
  const { path } = await convert(pageNumber);

  return path;
};

export default pdfToImage;
