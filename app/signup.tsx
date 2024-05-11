import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { useSignUpMutation } from "@/api/services/user.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useAppDispatch } from "@/hooks/redux.hooks";
import { setCredentials } from "@/features/slices/userSlice";

type Props = {};

const SignUp = (props: Props) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [signUp, { isLoading, isError, data, isSuccess }] = useSignUpMutation();
  const [error, setError] = React.useState<string>("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onSubmit = async (formData: any) => {
    try {
      const { email, firstName, lastName, password } = formData;
      setError("");
      const result = await signUp({
        email,
        firstName,
        lastName,
        password,
      }).unwrap();
      console.log(result);
      console.log("SIGN UP SUCCESSFUL");
      dispatch(
        setCredentials({
          token: "",
          user: result.user,
          isLoggedIn: true,
        })
      );
      setTimeout(() => {
        router.replace("/");
      }, 1000);
    } catch (error: any) {
      console.log(error);
      setError(
        error.data ? error.data.message : "An error occurred during login."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChange={(value) => onChange(value)}
            value={value}
            placeholder="FirstName"
            type="text"
            size="lg"
            label="First Name"
          />
        )}
        name="firstName"
        rules={{ required: "First Name is required" }}
        defaultValue=""
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChange={(value) => onChange(value)}
            value={value}
            placeholder="Last Name"
            type="text"
            size="lg"
            label="LastName"
          />
        )}
        name="lastName"
        rules={{ required: "Last Name is required" }}
        defaultValue=""
      />

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
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChange={(value) => onChange(value)}
            value={value}
            placeholder="Confirm Password"
            type="password"
            size="lg"
            label="Confirm Password"
          />
        )}
        name="confirmPassword"
        rules={{
          required: "Confirm Password is required",
          validate: (value) =>
            value === getValues("password") || "Passwords do not match",
        }}
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
        <Text>Sign Up</Text>
      </Button>
      {
        <Text style={styles.link} onPress={() => router.replace("/login")}>
          Already have an account?
        </Text>
      }

      {isSuccess && (
        <Text style={styles.success}>Your account has been created!</Text>
      )}
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#000",
    padding: 20,
    gap: 10,
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
  success: {
    fontSize: 18,
    color: "#29c758",
    marginBottom: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
});
