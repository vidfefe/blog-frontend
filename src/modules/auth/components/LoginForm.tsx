import { TextField } from "@mui/material";
import { UseFormReturn } from "react-hook-form";
import { FC } from "react";

import { LoginFormValues } from "../../../schemas/auth";
import { AuthForm } from "./AuthForm";

interface LoginFormProps {
  formMethods: UseFormReturn<LoginFormValues>;
  onSubmit: (data: LoginFormValues) => void;
  loading: boolean;
}

export const LoginForm: FC<LoginFormProps> = ({
  formMethods,
  onSubmit,
  loading,
}) => {
  const {
    register,
    formState: { errors },
  } = formMethods;

  return (
    <AuthForm
      title="Sign in"
      submitText="Sign in"
      formMethods={formMethods}
      onSubmit={onSubmit}
      loading={loading}
    >
      <TextField
        label="Enter email"
        type="email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
        size="small"
      />
      <TextField
        label="Enter password"
        type="password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
        size="small"
      />
    </AuthForm>
  );
};
