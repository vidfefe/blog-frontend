import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { RegisterFormValues, registerSchema } from "../../../schemas/auth";
import { RegistrationForm } from "../components/RegistrationForm";
import { useRegisterMutation } from "../../../api/authApi";

const Registration = () => {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const formMethods = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterFormValues) => {
    const result = await register(data);
    if ("data" in result) {
      navigate("/", { replace: true });
    }
  };

  return (
    <RegistrationForm
      formMethods={formMethods}
      loading={isLoading}
      onSubmit={onSubmit}
    />
  );
};

export default Registration;
