import React from "react";
import { Text, StyleSheet } from "react-native";

type Props = {
  isError: boolean;
  isSuccess: boolean;
  isEditSuccess: boolean;
  isEditError: boolean;
};

const TaskStatusMessage = ({
  isError,
  isSuccess,
  isEditSuccess,
  isEditError,
}: Props) => {
  const getMessageAndStyle = () => {
    if (isError) {
      return { message: "Error adding task", style: styles.error };
    }
    if (isSuccess) {
      return { message: "Successfully created task!", style: styles.success };
    }
    if (isEditSuccess) {
      return { message: "Successfully updated task!", style: styles.success };
    }
    if (isEditError) {
      return { message: "Error updating task", style: styles.error };
    }
    return null;
  };

  const result = getMessageAndStyle();

  if (!result) return null;

  return <Text style={result.style}>{result.message}</Text>;
};

export default TaskStatusMessage;

const styles = StyleSheet.create({
  error: {
    color: "#ff3939",
    fontSize: 16,
    marginTop: 10,
  },
  success: {
    color: "#4CAF50",
    fontSize: 16,
    marginTop: 10,
  },
});
