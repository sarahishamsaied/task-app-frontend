import { store } from "@/store";
import { api } from "../api.config";
import JWT from "expo-jwt";
import { setCredentials } from "@/features/slices/userSlice";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (user) => ({
        url: "user/auth/register",
        method: "POST",
        body: user,
      }),
    }),
    signIn: builder.mutation({
      query: (credentials) => ({
        url: "user/auth/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: { token: string }) => {
        try {
          const decoded = JWT.decode(response.token, "access_token", {
            timeSkew: 30,
          });
          store.dispatch(
            setCredentials({
              token: response.token,
              user: decoded,
              isLoggedIn: true,
            })
          );
          return { token: response.token, user: decoded };
        } catch (error) {
          console.error("Failed to decode token:", error);
          store.dispatch(
            setCredentials({
              token: "",
              user: null,
              isLoggedIn: false,
            })
          );
        }
      },
    }),

    deactivate: builder.mutation({
      query: (id) => ({
        url: `user/auth/deactivate/${id}`,
        method: "PATCH",
      }),
    }),

    reactivate: builder.mutation({
      query: (id) => ({
        url: `user/auth/reactivate/${id}`,
        method: "PATCH",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useDeactivateMutation,
  useReactivateMutation,
} = userApi;
