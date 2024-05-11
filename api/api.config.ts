import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Platform } from "react-native";

const baseUrl =
  Platform.OS === "web" || Platform.OS === "ios"
    ? "http://localhost:3000/api/v1/"
    : "http://10.0.2.2:3000/api/v1/";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["Tasks", "User"],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers) => {
      const token = await AsyncStorage.getItem("token");
      const user = await AsyncStorage.getItem("user");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});
