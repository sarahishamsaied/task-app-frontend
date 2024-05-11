import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import useIsAuthorized from "@/hooks/useAuth";

type Props = {};

const Header = (props: Props) => {
  const router = useRouter();
  const isAuthorized = useIsAuthorized();
  const handlePress = () => {
    router.push("/profile");
  };

  const handleHomePress = () => {
    router.push("/home");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={
          isAuthorized
            ? handleHomePress
            : () => {
                router.push("/");
              }
        }
      >
        <Image
          style={styles.logo}
          source={require("../../assets/images/logo-white.png")}
        />
        <Text style={styles.title}>taskspace.</Text>
      </TouchableOpacity>
      {isAuthorized && (
        <TouchableOpacity onPress={handlePress}>
          <FontAwesome5 name="user" size={24} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
  container: {
    backgroundColor: "#000",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
});
