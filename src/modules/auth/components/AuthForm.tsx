import { ReactNode } from "react";
import { Paper, Typography, Button, CircularProgress } from "@mui/material";
import { FieldValues, UseFormReturn } from "react-hook-form";

interface AuthFormProps<T extends FieldValues> {
  title: string;
  submitText: string;
  formMethods: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  loading: boolean;
  children: ReactNode;
}

export const AuthForm = <T extends FieldValues>({
  title,
  submitText,
  formMethods,
  onSubmit,
  loading,
  children,
}: AuthFormProps<T>) => {
  const { handleSubmit } = formMethods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper
        variant="outlined"
        sx={{
          width: 400,
          my: 6,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 3,
        }}
      >
        <Typography textAlign="center" variant="h5">
          {title}
        </Typography>

        {children}

        <Button type="submit" variant="contained" disabled={loading} fullWidth>
          {loading ? <CircularProgress size={20} /> : submitText}
        </Button>
      </Paper>
    </form>
  );
};
