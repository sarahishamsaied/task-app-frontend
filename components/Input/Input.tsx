import { StyleSheet, Text, View, TextInput, Platform } from "react-native";
import React from "react";
import { Searchbar } from "react-native-paper";

type OnChangeSearch = (text: string) => void;

type Props = {
  onChange: (text: string) => void | (() => any);
  size?: "sm" | "md" | "lg";
  placeholder?: string;
  bold?: boolean;
  label?: string;
  error?: string;
  type?: "text" | "email" | "password" | "textarea" | "number" | "search";
  rows?: number;
  maxLength?: number;
  disabled?: boolean;
  required?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  accessibilityLabel?: string;
  value?: string;
};

const Input = (props: Props) => {
  return (
    <View
      style={{
        width: "100%",
      }}
    >
      <Text style={{ color: "#fff", fontSize: 16, marginBottom: 5 }}>
        {props.label}
      </Text>
      {props.type !== "search" ? (
        <TextInput
          placeholderTextColor={"#c7c7c7"}
          style={{
            borderBottomColor: "#3f3e3e",
            borderBottomWidth: 2,

            padding: props.size === "lg" ? 10 : props.size === "sm" ? 5 : 7,
            width: "100%",
            color: "#fff",
            fontWeight: props.bold ? "bold" : "normal",
            fontSize: props.size === "lg" ? 20 : props.size === "sm" ? 14 : 16,
          }}
          secureTextEntry={props.type === "password"}
          onChangeText={props.onChange}
          placeholder={props.placeholder}
          keyboardType={
            props.type === "email"
              ? "email-address"
              : props.type === "number"
              ? "numeric"
              : "default"
          }
          maxLength={props.type === "number" ? 2 : undefined}
        />
      ) : (
        <Searchbar
          value={props.value ?? ""}
          placeholder={props.placeholder}
          inputStyle={{ color: "#fff", fontSize: 16, margin: 0 }}
          placeholderTextColor={"#c7c7c7"}
          onChangeText={props.onChange ?? (() => {})}
          onBlur={props.onBlur ?? (() => {})}
          blurOnSubmit={true}
          style={{
            backgroundColor: "#0f0f0f",
            borderBottomColor: "#3f3e3e",
            borderBottomWidth: 2,
          }}
        />
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({});
