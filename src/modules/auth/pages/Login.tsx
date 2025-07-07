import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

import { LoginFormValues, loginSchema } from "../../../schemas/auth";
import { LoginForm } from "../components/LoginForm";
import { useLoginMutation } from "../../../api/authApi";

const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const formMethods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormValues) => {
    const result = await login(data);
    if ("data" in result) {
      navigate("/", { replace: true });
    }
  };

  return (
    <LoginForm
      formMethods={formMethods}
      onSubmit={onSubmit}
      loading={isLoading}
    />
  );
};

export default Login;
