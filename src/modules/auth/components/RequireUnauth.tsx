import { FC, PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

import { selectToken } from "../../../store/authSlice";

export const RequireUnauth: FC<PropsWithChildren> = ({ children }) => {
  const token = useSelector(selectToken);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
};
