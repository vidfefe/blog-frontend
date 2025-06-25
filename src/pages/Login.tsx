import { Button, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { fetchAuth, selectIsAuth } from "../store/slices/authSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { showToast } from "../store/slices/toastSlice";

export type LoginData = {
  email: string;
  password: string;
};

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginData) => {
    const userData = await dispatch(fetchAuth(data));

    if (!userData.payload) {
      dispatch(
        showToast({
          message: "Authorization failed. Please try again",
          severity: "error",
        })
      );
      return;
    }

    if ("token" in userData.payload) {
      localStorage.setItem("token", userData.payload.token);
    }

    dispatch(
      showToast({
        message: "Authorization successful!",
        severity: "success",
      })
    );
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

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
          <Typography>Sign in</Typography>
          <TextField
            label="Your Email"
            type="email"
            {...register("email", { required: "Enter email" })}
            error={!!errors.email?.message}
            helperText={errors.email?.message}
            fullWidth
            size="small"
          ></TextField>
          <TextField
            label="Your Password"
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
            Sign in
          </Button>
        </Paper>
      </form>
    </>
  );
};

export default Login;
