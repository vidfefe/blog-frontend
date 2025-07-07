import { api } from "./api";

export interface UploadResponse {
  url: string;
}

export const uploadApi = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation<UploadResponse, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append("image", file);
        return {
          url: "/upload",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const { useUploadImageMutation } = uploadApi;
