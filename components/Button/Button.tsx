import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "@expo/vector-icons/FontAwesome5";

type Props = {
  iconName?: string;
  onPress: () => void;
  style?: any;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "tertiary";
  children: React.ReactNode;
  rounded?: boolean;
  loading?: boolean;
};

const Button = (props: Props) => {
  const {
    iconName,
    onPress,
    style,
    size,
    variant,
    children,
    rounded,
    loading,
  } = props;

  const buttonStyle = [
    styles.button,
    variant ? variantStyles[variant] : null,
    size ? sizeStyles[size] : null,
    rounded ? styles.rounded : null,
    style,
  ];

  return (
    <View style={[styles.container, { ...style }]}>
      <TouchableOpacity
        style={[buttonStyle, loading ? styles.loading : null]}
        onPress={loading ? undefined : onPress}
        accessibilityRole="button"
        accessibilityLabel={`Button ${children}`}
      >
        {iconName && size && (
          <Icon name={iconName} size={iconSize[size]} color="#fff" />
        )}
        <Text style={styles.text}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 4,
  },
  text: {
    textAlign: "center",
  },
  rounded: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  loading: {
    backgroundColor: "rgb(117, 117, 117)",
  },
});

const variantStyles = StyleSheet.create({
  primary: {
    backgroundColor: "#000",
    color: "#fff",
  },
  secondary: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    color: "#000",
  },
  tertiary: {
    backgroundColor: "#181717",
    borderRadius: 10,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#ffffff44",
  },
});

const sizeStyles = StyleSheet.create({
  sm: {
    height: 30,
    fontSize: 12,
  },
  md: {
    height: 40,
    fontSize: 14,
  },
  lg: {
    height: 50,
    fontSize: 16,
  },
});

const iconSize = {
  sm: 10,
  md: 14,
  lg: 18,
};
