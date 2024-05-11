import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import Input from "@/components/Input/Input";
import { useForm, Controller } from "react-hook-form";
import Button from "@/components/Button/Button";
import { Link, useRouter } from "expo-router";
import { useSignInMutation } from "../api/services/user.service";
import JWT from "expo-jwt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks";
import { setCredentials } from "@/features/slices/userSlice";

type Props = {};

const Login = (props: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [signIn, { isLoading, isError, data, isSuccess }] = useSignInMutation();
  const [error, setError] = React.useState<string>("");
  const dispatch = useAppDispatch();

  const onSubmit = async (formData: any) => {
    try {
      setError("");
      const result = await signIn(formData).unwrap();
      // if (result?.user.isDeleted) return router.push("/deactivated");
      console.log("1", result?.user);
      console.log("2", result);
      if (result && result.user && !result.user.isDeleted) {
        {
          dispatch(
            setCredentials({
              token: result.token,
              user: result.user,
              isLoggedIn: true,
            })
          );
          router.replace("/home");
        }
      } else {
        if (result && result.user && result.user.isDeleted) {
          console.log("DEACTIVATED");
          router.replace("/deactivated");
        }
      }
    } catch (error: any) {
      console.log("err is", error);
      setError(
        error.data ? error.data.message : "An error occurred during login."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChange={(value) => onChange(value)}
            value={value}
            placeholder="Email"
            type="email"
            size="lg"
            label="Email"
          />
        )}
        name="email"
        rules={{ required: "Email is required" }}
        defaultValue=""
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChange={(value) => onChange(value)}
            value={value}
            placeholder="Password"
            type="password"
            size="lg"
            label="Password"
          />
        )}
        name="password"
        rules={{ required: "Password is required" }}
        defaultValue=""
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button
        loading={isLoading}
        style={{
          marginTop: 20,
        }}
        onPress={handleSubmit(onSubmit)}
        variant="secondary"
      >
        <Text>Login</Text>
      </Button>
      <Link href={"/signup"}>
        <Text style={styles.link}>Don't have an account?</Text>
      </Link>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#000",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    paddingHorizontal: 10,
    gap: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
  error: {
    color: "#ff3939",
    fontSize: 12,
    marginTop: 10,
  },
  link: { color: "#fff", marginTop: 20 },
});
