import { FC, PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

import { selectToken } from "../../../store/authSlice";

export const RequireAuth: FC<PropsWithChildren> = ({ children }) => {
  const token = useSelector(selectToken);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
