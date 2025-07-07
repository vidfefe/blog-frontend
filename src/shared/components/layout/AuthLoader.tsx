import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { Loading } from "../ui/Loading";
import { useLazyFetchMeQuery } from "../../../api/authApi";
import { selectToken } from "../../../store/authSlice";

export const AuthLoader = () => {
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

  return <Outlet />;
};
