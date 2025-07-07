import { TextField } from "@mui/material";
import { Controller, UseFormReturn } from "react-hook-form";
import { FC } from "react";

import { RegisterFormValues } from "../../../schemas/auth";
import { ImageUploade } from "../../../shared/components/ui/ImageUploader";
import { AuthForm } from "./AuthForm";

interface RegistrationFormProps {
  formMethods: UseFormReturn<RegisterFormValues>;
  onSubmit: (data: RegisterFormValues) => void;
  loading: boolean;
}

export const RegistrationForm: FC<RegistrationFormProps> = ({
  formMethods,
  onSubmit,
  loading,
}) => {
  const {
    register,
    control,
    formState: { errors },
  } = formMethods;

  return (
    <AuthForm
      title="Sign up"
      submitText="Sign up"
      formMethods={formMethods}
      onSubmit={onSubmit}
      loading={loading}
    >
      <Controller
        name="avatarUrl"
        control={control}
        render={({ field, fieldState }) => (
          <ImageUploade
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />

      <TextField
        label="Enter full name"
        {...register("fullname")}
        error={!!errors.fullname}
        helperText={errors.fullname?.message}
        fullWidth
        size="small"
      />
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
