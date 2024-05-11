import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "@/components/Button/Button";
import { useDeleteTaskMutation } from "@/api/services/task.service";

type Props = {
  taskId: string;
  refetch: () => void;
};

const DeleteTaskConfirmation = ({ taskId, refetch }: Props) => {
  const [deleteTask, { data, isLoading, isSuccess }] = useDeleteTaskMutation();

  const handleDeleteTask = async () => {
    try {
      const result = await deleteTask(taskId).unwrap();
      refetch();
      console.log(result);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>Are you sure you want to delete this task?</Text>
      <Button onPress={handleDeleteTask} loading={isLoading}>
        <Text>Yes</Text>
      </Button>
      {isSuccess && (
        <Text style={styles.success}>Task deleted successfully</Text>
      )}
    </View>
  );
};

export default DeleteTaskConfirmation;

const styles = StyleSheet.create({
  success: {
    color: "#01411b",
  },
});
