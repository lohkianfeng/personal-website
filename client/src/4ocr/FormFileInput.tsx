import { useState } from "react";

import { FileInput, FileUploader, FileUploaderContent } from "@/components/ui3rdParty/file-uploader";
import { Progress } from "@/components/ui/progress";
import { CloudUpload } from "lucide-react";
import useQueryOcr from "./mutation";

type Props = {
  location: string;
  maxFiles?: number;
  maxSize?: number;
  accept?: Record<string, string[]>;
};

const FormFileInput = ({ location, maxFiles = 10, maxSize = 10, accept }: Props) => {
  const [uploadProgress, setUploadProgress] = useState(0);

  const { uploadFile } = useQueryOcr();

  const upload = async (files: File[] | null) => {
    if (!files || files.length === 0) return;

    const formData = new FormData();

    formData.append("location", location);
    files.forEach((file) => formData.append("files", file));

    try {
      await uploadFile.mutateAsync({ formData, setUploadProgress });
    } catch (err) {
      console.log("FormFileInput - upload", err);
    } finally {
      setUploadProgress(0);
    }
  };

  return (
    <FileUploader
      value={[]}
      onValueChange={upload}
      dropzoneOptions={{
        maxFiles: maxFiles, // 10 files
        maxSize: 1024 * 1024 * maxSize, // 10 MB
        multiple: true,
        accept: accept,
      }}
      className="p-2"
    >
      {uploadProgress === 0 && (
        <FileInput className="outline-1 outline-slate-500 outline-dashed">
          <div className="flex flex-col items-center p-8">
            <CloudUpload className="h-10 w-10 text-gray-500" />
            <p className="mb-1 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              Upload up to {maxFiles} {maxFiles === 1 ? "file" : "files"}.
            </p>
            <p className="text-xs text-gray-500">Maximum file size: {maxSize} MB</p>
          </div>
        </FileInput>
      )}
      <FileUploaderContent>
        {uploadProgress > 0 && (
          <div className="flex flex-col gap-2">
            <Progress value={uploadProgress} />
            <p className="text-sm text-gray-500">{uploadProgress}% uploaded</p>
          </div>
        )}
      </FileUploaderContent>
    </FileUploader>
  );
};

export default FormFileInput;
