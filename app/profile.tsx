import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "@/features/slices/userSlice";
import { useRouter } from "expo-router";
import Button from "@/components/Button/Button";
import { useDeactivateMutation } from "@/api/services/user.service";

type Props = {};

const Profile = (props: Props) => {
  const user = useAppSelector((state) => state.user);
  const [deactivate, { isSuccess, isError, isLoading }] =
    useDeactivateMutation();
  const handleDeactivation = async () => {
    try {
      console.log("USERRRR", user);
      const res = await deactivate(user.info?.id).unwrap();
      console.log(res);
      dispatch(logout());
      console.log("DEACTIVATED");
      console.log(user.isLoggedIn);
      router.replace("/");
    } catch (error: any) {
      console.log(error);
    }
  };
  console.log("user", user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.title}>
          {user.info?.firstName} {user.info?.lastName}
        </Text>
        <Text style={styles.text}>{user.info?.email}</Text>
        <View style={styles.actions}>
          <Button
            size="md"
            variant="secondary"
            onPress={() => {
              dispatch(logout());
              router.replace("/");
            }}
          >
            Logout
          </Button>
          <Button size="md" variant="secondary" onPress={handleDeactivation}>
            Deactivate
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "#000",
    padding: 30,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  content: {
    flexDirection: "column",
  },
  text: {
    color: "#fff",
  },
  actions: {
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
