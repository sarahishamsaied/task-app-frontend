import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "@expo/vector-icons/FontAwesome5";
import { Checkbox, Paragraph } from "react-native-paper";
import { Moment } from "moment";
import { useUpdateTaskStatusMutation } from "@/api/services/task.service";
import { formatDay, getTimeDiff, hour12Format } from "@/utils/Time/TimeUtils";
import { priorityColor } from "@/constants/Colors";
type Props = {
  id: string;
  title: string;
  content: string;
  startDate: Moment;
  endDate: Moment;
  status: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  onPress: (task: string) => void;
};

const Task = ({
  id,
  title,
  startDate,
  endDate,
  status,
  priority,
  onPress,
}: Props) => {
  const [checked, setChecked] = React.useState(
    status === "COMPLETED" ? true : false
  );

  const [updateStatus, { error, isLoading }] = useUpdateTaskStatusMutation();

  const handleUpdateStatus = async () => {
    try {
      setChecked(!checked);
      const result = await updateStatus({
        id,
        status: checked ? "PENDING" : "COMPLETED",
      }).unwrap();
      console.log(result);
    } catch (error: any) {
      console.log(error);
    }
  };

  const colorTaskBasedOnPriority = (priority: "LOW" | "MEDIUM" | "HIGH") => {
    return priorityColor[priority];
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderLeftColor: colorTaskBasedOnPriority(priority),
          borderLeftWidth: 2,
        },
      ]}
      onPress={() => onPress(id)}
    >
      <View style={styles.taskContent}>
        <View style={styles.taskLabel}>
          <Icon name="tasks" size={16} color="#fff" style={styles.icon} />

          <Text style={[styles.text, styles.title]}>{title}</Text>
        </View>
        <Checkbox
          onPress={handleUpdateStatus}
          status={checked ? "checked" : "unchecked"}
          color={isLoading ? "#414141" : "#fff"}
          uncheckedColor="#d6d6d6"
          disabled={isLoading}
        />
      </View>

      <Paragraph style={styles.date}>
        {formatDay(startDate)} {hour12Format(startDate)}
      </Paragraph>
      <Paragraph style={styles.date}>
        {formatDay(endDate)} {hour12Format(endDate)} - (
        {getTimeDiff(startDate, endDate)})
      </Paragraph>
      <Paragraph style={{ color: colorTaskBasedOnPriority(priority) }}>
        {priority}
      </Paragraph>
    </TouchableOpacity>
  );
};

export default Task;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "flex-start",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
    backgroundColor: "#181818",
    padding: 15,
    borderRadius: 4,
    marginBottom: 10,
    borderWidth: 1,
    // borderColor: "#353535",
  },
  taskLabel: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  taskContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    color: "#fff",
  },
  text: {
    color: "#bbbbbb",
  },
  icon: {
    padding: 10,
    backgroundColor: "#252525",
    borderRadius: 50,
  },
  date: {
    color: "#fff",
    flex: 1,
    fontSize: 12,
  },
});
