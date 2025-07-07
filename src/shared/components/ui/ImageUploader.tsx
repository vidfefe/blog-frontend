import { ChangeEvent, useState, useCallback, FC, useEffect } from "react";
import {
  Avatar,
  Typography,
  Button,
  Stack,
  Skeleton,
  Box,
} from "@mui/material";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../../app/store.ts";
import { showToast } from "../../../store/toastSlice.ts";
import { useUploadImageMutation } from "../../../api/uploadApi.ts";

export interface ImageUploadeProps {
  value?: string;
  onChange: (url: string) => void;
  error?: string;
  size?: number;
  variant?: "avatar" | "image";
}

export const ImageUploade: FC<ImageUploadeProps> = ({
  value,
  onChange,
  error,
  size = 80,
  variant = "avatar",
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [preview, setPreview] = useState<string | null>(value || null);

  const [uploadMut, { isLoading }] = useUploadImageMutation();

  useEffect(() => {
    setPreview(value ?? null);
  }, [value]);

  const handleFileSelect = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);

      uploadMut(file)
        .unwrap()
        .then(({ url }) => {
          setPreview(url);
          onChange(url);
          dispatch(
            showToast({
              message: "Image uploaded successfully!",
              severity: "success",
            })
          );
        })
        .catch(() => {});
    },
    [uploadMut, onChange, dispatch]
  );

  if (variant === "image") {
    return (
      <Stack direction="column" alignItems="flex-start" spacing={1}>
        <input
          accept="image/*"
          type="file"
          hidden
          id="image-upload-input"
          onChange={handleFileSelect}
        />
        <label htmlFor="image-upload-input">
          <Button
            size="large"
            variant="outlined"
            component="span"
            disabled={isLoading}
          >
            {preview ? "Change image" : "Add image"}
          </Button>
        </label>

        {isLoading ? (
          <Skeleton
            variant="rectangular"
            width="100%"
            height={size}
            animation="wave"
          />
        ) : preview ? (
          <Box
            component="img"
            src={preview}
            sx={{
              width: "100%",
              height: {
                xs: "auto",
                md: size,
              },
              maxHeight: {
                xs: "none",
                md: size,
              },
              objectFit: "contain",
              borderRadius: 1,
            }}
          />
        ) : null}

        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
      </Stack>
    );
  }

  return (
    <Stack alignItems="center" spacing={1} marginInline="auto">
      <input
        accept="image/*"
        type="file"
        hidden
        id="avatar-upload-input"
        onChange={handleFileSelect}
      />
      <label htmlFor="avatar-upload-input">
        <Button
          component="span"
          disabled={isLoading}
          sx={{
            p: 0,
            width: size,
            height: size,
            position: "relative",
            overflow: "hidden",
            borderRadius: "50%",
          }}
        >
          {isLoading ? (
            <Skeleton variant="circular" width={size} height={size} />
          ) : (
            <Avatar
              src={preview ?? undefined}
              sx={{ width: size, height: size }}
            />
          )}
        </Button>
      </label>
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
    </Stack>
  );
};
