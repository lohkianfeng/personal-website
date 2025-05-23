import { useQueryClient, useMutation } from "@tanstack/react-query";
import { axiosPrivate } from "@/axios/axios";
import { type AxiosProgressEvent } from "axios";
import { toast } from "sonner";
import { type ModelT } from "./TokenCostTable";

const useQueryOcr = () => {
  const queryClient = useQueryClient();

  const uploadFile = useMutation({
    mutationFn: async ({
      formData,
      setUploadProgress,
    }: {
      formData: FormData;
      setUploadProgress: (progress: number) => void;
    }) => {
      await axiosPrivate.post(`/api/file/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          const progress = progressEvent.total //
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          setUploadProgress(progress);
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
      toast.success("Successfully uploaded file.");
    },
  });

  const deleteFile = useMutation({
    mutationFn: async (id: number) => {
      await axiosPrivate.get(`/api/file/delete/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
      toast.success("Successfully deleted file.");
    },
  });

  const ocrExtract = useMutation({
    mutationFn: async ({ id, model, prompt }: { id: number; model: ModelT; prompt: string }) => {
      const response = await axiosPrivate.post(`/api/ocr/extract/${id}`, { model, prompt });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Successfully extracted.");
    },
  });

  return {
    uploadFile,
    deleteFile,
    ocrExtract,
  };
};

export default useQueryOcr;
