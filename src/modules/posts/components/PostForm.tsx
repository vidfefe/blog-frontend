import { FC, useMemo } from "react";
import { Link } from "react-router";
import { Paper, Stack, TextField, Button, Typography } from "@mui/material";
import SimpleMdeReact from "react-simplemde-editor";

import { ImageUploade } from "../../../shared/components/ui/ImageUploader";
import { PostFormValues } from "../../../schemas/post";
import { Controller, UseFormReturn } from "react-hook-form";

interface PostFormProps {
  formMethods: UseFormReturn<PostFormValues>;
  isEditing: boolean;
  onSubmit: (values: PostFormValues) => void;
  isSubmitting: boolean;
}

export const PostForm: FC<PostFormProps> = ({
  formMethods,
  onSubmit,
  isEditing,
  isSubmitting,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = formMethods;

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Enter text...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
        uniqueId: "post_content",
      },

      toolbarTips: true,
      sideBySideFullscreen: false,
    }),
    []
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper variant="outlined" sx={{ borderRadius: 2, my: 2, p: 2 }}>
        <Typography variant="h5" mb={2}>
          {isEditing ? "Edit Post" : "New Post"}
        </Typography>
        <Stack>
          <Controller
            name="imageUrl"
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                <ImageUploade
                  value={value || undefined}
                  onChange={onChange}
                  size={200}
                  error={errors.imageUrl?.message}
                  variant="image"
                />
              </>
            )}
          />
        </Stack>
        <TextField
          variant="standard"
          placeholder="Enter title..."
          fullWidth
          {...register("title")}
          error={!!errors.title}
          helperText={errors.title?.message}
          sx={{
            "& .MuiInput-underline:before, & .MuiInput-underline:after": {
              borderBottom: "none",
            },
            "& input": {
              fontSize: "30px",
            },
            "& .MuiInput-underline:hover:before, & .MuiInput-underline:hover:after":
              {
                display: "none",
              },
          }}
        />
        <TextField
          variant="standard"
          placeholder="Tags"
          {...register("tags")}
          error={!!errors.tags}
          helperText={errors.tags?.message}
          fullWidth
          sx={{
            "& input": {
              fontSize: "20px",
            },
          }}
        />
        <Controller
          name="text"
          control={control}
          render={({ field }) => (
            <>
              <SimpleMdeReact
                id="editor"
                {...field}
                options={options}
                style={{
                  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                  fontWeight: 600,
                }}
              />
              {errors.text && (
                <Typography color="error" variant="body2">
                  {errors.text.message}
                </Typography>
              )}
            </>
          )}
        />
        <Stack>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isEditing ? "Save" : "Publish"}
          </Button>
          <Link to="/">
            <Button>Cancel</Button>
          </Link>
        </Stack>
      </Paper>
    </form>
  );
};
