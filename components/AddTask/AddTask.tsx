import { Text, ScrollView, View } from "react-native";
import React from "react";
import Input from "@/components/Input/Input";
import { TouchableOpacity } from "react-native-gesture-handler";
import Tabs from "@/components/Tabs/Tabs";
import moment from "moment";
import { Controller, useForm, useWatch } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../Button/Button";
import styles from "./styles";
import {
  useCreateTaskMutation,
  useEditTaskMutation,
} from "@/api/services/task.service";
import DateTimeSelector from "../TimePicker/TimePicker";
import TaskStatusMessage from "./TaskStatusMessage";

type Props = {
  type: "add" | "edit";
  taskId?: string;
  refetch?: () => void;
};

const AddTask = (props: Props) => {
  const [createTask, { isLoading, isError, isSuccess }] =
    useCreateTaskMutation();

  const [
    editTask,
    {
      isLoading: isEditTaskLoading,
      isError: isEditError,
      isSuccess: isEditSuccess,
    },
  ] = useEditTaskMutation();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      startDate: Date,
      endDate: Date,
      priority: "medium",
    },
  });
  const getTaskData = async (formData: any) => {
    const { title, startDate, endDate, priority } = formData;

    console.log("DATA IS", formData.startDate, formData.endDate);

    return {
      title,
      startDate,
      endDate,
      priority: priority.toUpperCase(),
      status: "PENDING",
      id: props.type === "edit" ? props.taskId : undefined,
    };
  };

  const onAddTask = async (formData: any) => {
    const task = await getTaskData(formData);
    console.log("task is", task);
    if (!task) return;
    try {
      await createTask(task).unwrap();
      props.refetch && props.refetch();
    } catch (error: any) {
      console.log("error is", error);
    }
  };

  const onEditTask = async (formData: any) => {
    const task = await getTaskData(formData);
    console.log("task is", task);
    if (!task) return;

    try {
      await editTask(task).unwrap();
      props.refetch && props.refetch();
    } catch (error: any) {
      console.log("error is", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
          <Text style={styles.today}>
            {props.type === "add" ? "Add Task" : "Edit Task"}
          </Text>
          <Controller
            name="title"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                bold={true}
                onChange={onChange}
                placeholder="Task Title"
                size="lg"
              />
            )}
          />
          <View style={styles.startContainer}>
            <Controller
              control={control}
              name="startDate"
              render={({ field: { onChange, value } }) => (
                <DateTimeSelector
                  label="Select Date and Time"
                  initialDateTime={new Date()}
                  onChange={(newDateTime) => {
                    onChange(newDateTime.toDate());
                  }}
                />
              )}
            />
          </View>
          <View style={styles.startContainer}>
            <Controller
              control={control}
              name="endDate"
              render={({ field: { onChange, value } }) => (
                <DateTimeSelector
                  label="Select Date and Time"
                  initialDateTime={new Date()}
                  onChange={(newDateTime) => {
                    onChange(newDateTime.toDate());
                  }}
                />
              )}
            />
          </View>

          <View
            style={{
              height: 100,
            }}
          >
            <Text style={styles.label}>Priority</Text>
            <Controller
              name="priority"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Tabs
                  activeTab={value}
                  onSelected={(selected) => {
                    onChange(selected);
                  }}
                  data={[
                    { label: "High", value: "high" },
                    { label: "Medium", value: "medium" },
                    { label: "Low", value: "low" },
                  ]}
                />
              )}
            />
          </View>

          <View style={{ height: 100 }}>
            <Button
              loading={isLoading || isEditTaskLoading}
              variant="secondary"
              onPress={
                props.type === "add"
                  ? handleSubmit(onAddTask)
                  : handleSubmit(onEditTask)
              }
              style={{ marginTop: 20 }}
            >
              <Text> {props.type === "add" ? "Add Task" : "Edit Task"}</Text>
            </Button>
          </View>
          <TaskStatusMessage
            isError={isError}
            isEditError={isEditError}
            isSuccess={isSuccess}
            isEditSuccess={isEditSuccess}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddTask;
