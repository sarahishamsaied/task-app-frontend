import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Modal,
  Portal,
  Text,
  Button,
  Provider as PaperProvider,
} from "react-native-paper";

type Props = {
  visible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
};

const CustomModal = ({ visible, onDismiss, children }: Props) => {
  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      contentContainerStyle={styles.containerStyle}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "white",
    width: "80%",
    left: "10%",
    padding: 20,
    borderRadius: 10,
  },
});
