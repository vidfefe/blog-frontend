import { Button, Paper, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { fetchRegister } from "../store/slices/authSlice";
import { useForm } from "react-hook-form";
import { showToast } from "../store/slices/toastSlice";
import { useNavigate } from "react-router";

export type RegisterData = {
  fullName: string;
  email: string;
  password: string;
  avatarUrl?: string;
};

const Registration = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterData) => {
    const userData = await dispatch(fetchRegister(data));

    if (!userData.payload) {
      dispatch(
        showToast({
          message: "Registration failed. Please try again",
          severity: "error",
        })
      );

      return;
    }

    dispatch(
      showToast({
        message: "Registration successful! Please sign in",
        severity: "success",
      })
    );

    navigate("/login");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper
          variant="outlined"
          sx={{
            width: "400px",
            my: "50px",
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            py: 3,
            px: 2,
          }}
        >
          <Typography>Sign up</Typography>
          <TextField
            label="Avatar URL"
            {...register("avatarUrl", {
              pattern: {
                value:
                  /^(https?:\/\/(?:www\.|(?!www))[^\s.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/,
                message: "Inappropriate link to the avatar",
              },
            })}
            error={!!errors.avatarUrl}
            helperText={errors.avatarUrl?.message}
            fullWidth
            size="small"
          />
          <TextField
            label="Enter full name"
            {...register("fullName", {
              required: "Enter full name",
              minLength: {
                value: 3,
                message: "Full name must be at least 3 characters",
              },
            })}
            error={!!errors.fullName?.message}
            helperText={errors.fullName?.message}
            fullWidth
            size="small"
          ></TextField>
          <TextField
            label="Enter email"
            type="email"
            {...register("email", { required: "Enter email" })}
            error={!!errors.email?.message}
            helperText={errors.email?.message}
            fullWidth
            size="small"
          ></TextField>
          <TextField
            label="Enter password"
            type="password"
            {...register("password", {
              required: "Enter password",
              minLength: {
                value: 3,
                message: "Full name must be at least 3 characters",
              },
            })}
            error={!!errors.password?.message}
            helperText={errors.password?.message}
            fullWidth
            size="small"
          ></TextField>
          <Button type="submit" variant="contained">
            Sign up
          </Button>
        </Paper>
      </form>
    </>
  );
};

export default Registration;
