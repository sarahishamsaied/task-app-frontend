import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import Button from "@/components/Button/Button";
import moment from "moment";
import { TaskWithId } from "@/interfaces/Task";
import { Ionicons } from "@expo/vector-icons";
import { priorityColor } from "@/constants/Colors";

type Props = {
  selectedTask: TaskWithId | null;
  setEditBottomSheetVisible?: () => void;
  setDeletedTask?: (taskId: string) => void;
};

const TaskActions = ({
  selectedTask,
  setEditBottomSheetVisible,
  setDeletedTask,
}: Props) => {
  if (!selectedTask) return null;

  const formatTime = (date: Date) => moment(date).format("hh:mm A");

  return (
    <View style={styles.taskActions}>
      <Text style={styles.taskTitle}>{selectedTask.title}</Text>
      <Text style={styles.time}>
        {formatTime(selectedTask.startDate)} -{" "}
        {formatTime(selectedTask.endDate)}
      </Text>
      <Text
        style={[
          styles.priority,
          { color: priorityColor[selectedTask.priority] },
        ]}
      >
        {selectedTask.priority}
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          onPress={
            setEditBottomSheetVisible ? setEditBottomSheetVisible : () => {}
          }
          variant="tertiary"
          size="lg"
          style={styles.button}
        >
          <Feather name="edit-3" size={24} color="#fff" />
        </Button>
        <Button
          onPress={() => setDeletedTask && setDeletedTask(selectedTask.id)}
          variant="tertiary"
          size="lg"
          style={styles.button}
        >
          <AntDesign name="delete" size={24} color="#fff" />
        </Button>
      </View>
    </View>
  );
};

export default TaskActions;

const styles = StyleSheet.create({
  taskActions: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    gap: 10,
  },
  taskTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  time: {
    color: "#fff",
  },
  priority: {
    fontWeight: "bold",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
  },
  button: {
    width: 50,
    marginRight: 10,
  },
});
