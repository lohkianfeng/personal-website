import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "@/axios/axios";
import Loading from "@/components/errorPages/Loading";
import useQueryOcr from "./mutation";

import FormFileInput from "./FormFileInput";
import { type FileT } from "@/types/FileT";
import TokenCostTable, { type ModelT } from "./TokenCostTable";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Paperclip, Eye, Trash, Plus, ChevronRight } from "lucide-react";

export type FieldT = "string" | "number" | "date" | "boolean";
export type SchemaFieldT = { name: string; type: FieldT };

const Ocr = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [iframeUrl, setIframeUrl] = useState<string | undefined>(undefined);
  const [fileId, setFileId] = useState<number | undefined>(undefined);

  const [model, setModel] = useState<ModelT>("gpt-4.1-nano");
  const [prompt, setPrompt] = useState("Extract life insurance policy schedule details from this document");
  const [fields, setFields] = useState<SchemaFieldT[]>([
    { name: "planName", type: "string" },
    { name: "policyHolderName", type: "string" },
    { name: "policyNumber", type: "string" },
    { name: "policyStartDate", type: "date" },
    { name: "policyEndDate", type: "date" },
    { name: "currency", type: "string" },
    { name: "sumAssured", type: "number" },
    { name: "premiumAmount", type: "number" },
    { name: "paymentFrequency", type: "string" },
    { name: "expired", type: "boolean" },
  ]);

  const [extractedData, setExtractedData] = useState<any>(null);

  const { deleteFile, ocrExtract } = useQueryOcr();

  const getFiles = useQuery({
    queryKey: ["files"],
    queryFn: async () => {
      const response = await axiosPrivate.get(`/api/file`);
      return response.data;
    },
  });
  const { isPending, error, data } = getFiles;

  if (isPending) return <Loading />;
  if (error) return "An error has occurred: " + error.message;
  if (!data) return "No data";

  const { files } = data;

  const viewFile = async (id: number) => {
    const response = await axiosPrivate.get(`/api/file/view/${id}`);
    setIframeUrl(response.data.url);
    setIsOpen(true);
  };

  const selectFile = async (id: number) => {
    if (id !== fileId) {
      setFileId(id);
    } else {
      setFileId(undefined);
    }
  };

  const extractFile = async () => {
    if (fileId) {
      const data = await ocrExtract.mutateAsync({
        id: fileId,
        model: model,
        prompt: prompt,
        fields: fields,
      });
      setExtractedData(data);
    }
  };

  return (
    <div className="flex gap-4 p-4">
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="flex gap-2">Input</CardTitle>
          <CardDescription>Input a PDF file to extract content from.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Instruction text="1. Upload file" />
          <FormFileInput location="ocr" accept={{ "application/pdf": [".pdf"] }} />

          <Instruction text="2. Select file" />
          <div>
            {files.map((file: FileT, index: number) => (
              <div //
                key={index}
                className={`flex cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-gray-100 ${file.id === fileId && "bg-gray-200"}`}
                onClick={() => selectFile(file.id)}
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <Paperclip className="h-4 w-4 stroke-current" />
                    <span className="text-sm">{file.name}</span>
                  </div>
                  <span className="text-xs">Type: {file.mimetype}</span>
                  <span className="text-xs">Size: {(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                </div>
                <div className="flex gap-4">
                  <Button //
                    variant="outline"
                    onClick={() => viewFile(file.id)}
                  >
                    View
                    <Eye />
                  </Button>
                  <Button //
                    variant="outline"
                    onClick={() => deleteFile.mutate(file.id)}
                    disabled={deleteFile.isPending}
                  >
                    Delete
                    <Trash />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="flex h-full flex-col sm:max-w-6xl">
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              {iframeUrl ? (
                /\.(docx|xlsx|pptx)(\?|$)/i.test(iframeUrl) ? (
                  <iframe
                    src={`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(iframeUrl)}`}
                    className="h-full w-full"
                  />
                ) : (
                  <iframe src={iframeUrl} className="h-full w-full"></iframe>
                )
              ) : (
                <p>No file selected</p>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Instruction text="3. LLM Settings" />
          <div className="flex justify-between">
            <Label htmlFor="model">Model</Label>
            <Select value={model} onValueChange={(value: ModelT) => setModel(value)}>
              <SelectTrigger id="model">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="cursor-pointer" value="gpt-4.1-nano">
                  gpt-4.1-nano
                </SelectItem>
                <SelectItem className="cursor-pointer" value="gpt-4o-mini">
                  gpt-4o-mini
                </SelectItem>
                <SelectItem className="cursor-pointer" value="gpt-4.1-mini">
                  gpt-4.1-mini
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea id="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Fields</Label>
            {fields.map((field, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  id={`field-${index}`}
                  placeholder="Field name"
                  className="w-60"
                  value={field.name}
                  onChange={(e) => {
                    const updatedFields = [...fields];
                    updatedFields[index].name = e.target.value;
                    setFields(updatedFields);
                  }}
                />
                <Select
                  value={field.type}
                  onValueChange={(value: FieldT) => {
                    const updatedFields = [...fields];
                    updatedFields[index].type = value;
                    setFields(updatedFields);
                  }}
                >
                  <SelectTrigger className="w-30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="cursor-pointer" value="string">
                      String
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="number">
                      Number
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="date">
                      Date
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="boolean">
                      Boolean
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={() => {
                    setFields(fields.filter((_, idx) => idx !== index));
                  }}
                >
                  <Trash />
                </Button>
              </div>
            ))}
            <Button onClick={() => setFields([...fields, { name: "", type: "string" }])}>
              <Plus /> Add Field
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center">
        <Button //
          size="lg"
          onClick={extractFile}
          disabled={!fileId || ocrExtract.isPending}
        >
          {ocrExtract.isPending ? "Extracting" : "Extract"}
          {ocrExtract.isPending ? <Loading /> : <ChevronRight />}
        </Button>
      </div>

      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="flex gap-2">Output</CardTitle>
          <CardDescription>View the data extracted from the uploaded file.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Instruction text="Extracted data" />
          <pre className="min-h-32 rounded-lg bg-gray-50 p-4 text-sm">
            {JSON.stringify(extractedData?.object ?? null, null, 2)}
          </pre>

          <Instruction text="Pricing" />
          <TokenCostTable model={model} usage={extractedData?.usage} />
        </CardContent>
      </Card>
    </div>
  );
};

const Instruction = ({ text }: { text: string }) => {
  return <h1 className="rounded-lg bg-blue-50 p-2 text-sm font-medium">{text}</h1>;
};

export default Ocr;
