import { Container } from "@mui/material";
import { useEffect } from "react";

import Header from "./Header";
import Toast from "../ui/Toast";
import { Loading } from "../ui/Loading";
import { useLazyFetchMeQuery } from "../../../api/authApi";
import { useSelector } from "react-redux";
import { selectToken } from "../../../store/authSlice";
import { Outlet } from "react-router";

export const AppLayout = () => {
  const token = useSelector(selectToken);
  const [triggerFetchMe, { isUninitialized, isLoading }] =
    useLazyFetchMeQuery();

  useEffect(() => {
    if (token) {
      triggerFetchMe();
    }
  }, [token, triggerFetchMe]);

  if (token && (isUninitialized || isLoading)) {
    return <Loading />;
  }
  return (
    <Container
      maxWidth="xl"
      sx={{
        mb: 2,
      }}
    >
      <Header />
      <Outlet />
      <Toast />
    </Container>
  );
};
