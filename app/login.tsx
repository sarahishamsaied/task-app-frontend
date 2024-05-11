import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";

type Props = {};

const login = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image
          style={styles.logo}
          source={require("../assets/images/logo-white.png")}
        />
        <Text style={styles.title}>StackTask</Text>
      </View>
    </View>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    paddingHorizontal: 20,
  },
  logo: {
    width: 50,
    height: 50,
  },
});
