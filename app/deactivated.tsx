import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "@/components/Button/Button";
import { useReactivateMutation } from "@/api/services/user.service";
import { useAppSelector } from "@/hooks/redux.hooks";
import { useRouter } from "expo-router";

type Props = {};

const Deactivated = (props: Props) => {
  const [reactivate, { data, isLoading, isError, isSuccess }] =
    useReactivateMutation();
  const router = useRouter();
  const user = useAppSelector((state) => state.user);
  const handleReactivation = async () => {
    try {
      const res = await reactivate(user.info?.id).unwrap();
      console.log(res);
      console.log("REACTIVATED");
      setTimeout(() => {
        router.replace("/home");
      }, 1500);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>You're not active anymore!</Text>
      <Text style={styles.text}>
        It seems your account has been deactivated. Click below to retrieve your
        account.
      </Text>
      <Button
        onPress={handleReactivation}
        size="md"
        variant="secondary"
        loading={isLoading}
      >
        Reactivate
      </Button>
      {isSuccess && (
        <Text style={styles.success}>Your account has been reactivated!</Text>
      )}
    </View>
  );
};

export default Deactivated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#000000",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
  },
  success: {
    fontSize: 18,
    color: "#29c758",
    marginBottom: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
});
