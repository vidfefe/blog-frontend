import { LoginFormValues, RegisterFormValues } from "../schemas/auth";
import { AuthCredentials, User } from "../modules/auth/types";
import { api } from "./api";
import { RootState } from "../app/store";
import { showToast } from "../store/toastSlice";
import { setCredentials } from "../store/authSlice";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthCredentials, LoginFormValues>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then(({ data }) => {
            dispatch(setCredentials({ token: data.token, user: data.user }));
            dispatch(
              showToast({
                message: "Authorization successful!",
                severity: "success",
              })
            );
            dispatch(authApi.util.invalidateTags(["User"]));
          })
          .catch(() => {});
      },
    }),

    register: build.mutation<AuthCredentials, RegisterFormValues>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        queryFulfilled.then(({ data }) => {
          dispatch(setCredentials({ token: data.token, user: data.user }));
          dispatch(
            showToast({
              message: "Registration successful!",
              severity: "success",
            })
          );
          dispatch(authApi.util.invalidateTags(["User"]));
        });
      },
    }),
    fetchMe: build.query<User, void>({
      query: () => "/auth/me",
      providesTags: ["User"],
      onQueryStarted(_arg, { dispatch, queryFulfilled, getState }) {
        queryFulfilled
          .then(({ data: user }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
              dispatch(setCredentials({ token, user }));
            }
          })
          .catch(() => {});
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useFetchMeQuery,
  useLazyFetchMeQuery,
} = authApi;
