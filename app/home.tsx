import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import DayTabs from "@/components/DayTabs/DayTabs";
import Task from "@/components/Task/Task";
import Button from "@/components/Button/Button";
import { FontAwesome6 } from "@expo/vector-icons";
import Input from "@/components/Input/Input";
import "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import moment, { Moment } from "moment";
import AddTask from "@/components/AddTask/AddTask";
import { useGetTasksQuery } from "@/api/services/task.service";
import type { Task as TaskType, TaskWithId } from "@/Types/Task";
import TaskActions from "@/components/TaskActions/TaskActions";
import CustomModal from "@/components/Modal/Modal";
import DeleteTaskConfirmation from "@/components/DeleteTaskConfirmation/DeleteTaskConfirmation";
type Props = {};

const Home = (props: Props) => {
  let {
    data: tasks,
    isLoading,
    isError,
    refetch,
    error,
  } = useGetTasksQuery({});
  const [filteredTasks, setFilteredTasks] = React.useState<TaskWithId[]>([]);
  const selectedTaskBottomSheetRef = React.useRef<BottomSheetModal>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [deletedTask, setDeletedTask] = React.useState<string | null>(null);
  const [editBottomSheetVisible, setEditBottomSheetVisible] =
    React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState<TaskWithId | null>(
    null
  );
  console.log(error);
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
  const [dayPressed, setDayPressed] = React.useState(moment());
  const getTodaysDate = () => {
    const date = new Date();
    return date.toDateString();
  };

  useEffect(() => {
    if (tasks) filterTasks(dayPressed);
  }, [tasks, dayPressed]);

  useEffect(() => {
    if (searchQuery) searchTasks(searchQuery);
  }, [searchQuery]);

  const getTask = (id: string) => {
    const task = tasks.find((task: TaskWithId) => task.id === id);
    setSelectedTask(task);
    selectedTaskBottomSheetRef.current?.present();
  };

  const searchTasks = (query: string) => {
    const filtered = tasks.filter((task: TaskType) => {
      return (
        task.title.toLowerCase().includes(query.toLowerCase()) &&
        moment(task.startDate).isSame(dayPressed, "day")
      );
    });
    setFilteredTasks(filtered);
  };
  const handleEditBottomSheet = () => {
    setEditBottomSheetVisible(true);
    bottomSheetModalRef.current?.present();
  };
  const filterTasks = (day: Moment) => {
    const filtered = tasks.filter((task: TaskType) => {
      const taskDay = moment(task.startDate);
      return taskDay.isSame(day, "day");
    });
    setFilteredTasks(filtered);
  };

  const handlePresentModal = () => {
    bottomSheetModalRef.current?.present();
  };
  const today = getTodaysDate();

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        {!isLoading ? (
          isError ? (
            <View>
              <Text>Error</Text>
            </View>
          ) : (
            <View style={styles.containter}>
              <Text style={styles.today}>{today}</Text>
              <View style={{ height: "10%" }}>
                <DayTabs
                  activeDay={dayPressed}
                  onPress={(day) => {
                    setDayPressed(day);
                    filterTasks(day);
                  }}
                />
              </View>
              <Input
                value={searchQuery}
                placeholder="Search"
                type="search"
                size="sm"
                onChange={(text) => setSearchQuery(text)}
                onBlur={() => console.log("blur")}
              />

              <ScrollView style={styles.tasksContainer}>
                {filteredTasks.map((task: TaskWithId, index: number) => (
                  <Task
                    key={index}
                    {...task}
                    startDate={moment(task.startDate)}
                    endDate={moment(task.endDate)}
                    onPress={(id) => getTask(id)}
                  />
                ))}
              </ScrollView>
              <View style={styles.addTaskContainer}>
                <Button
                  variant="secondary"
                  rounded={true}
                  size="lg"
                  onPress={() => {
                    setEditBottomSheetVisible(false);
                    handlePresentModal();
                  }}
                >
                  <FontAwesome6 name="add" size={24} color="black" />
                </Button>
              </View>
              <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={["90%", "99%"]}
              >
                <AddTask
                  type={editBottomSheetVisible ? "edit" : "add"}
                  taskId={selectedTask ? selectedTask.id : undefined}
                  refetch={refetch}
                />
              </BottomSheetModal>
              {deletedTask && (
                <CustomModal
                  onDismiss={() => setDeletedTask("")}
                  visible={deletedTask ? true : false}
                >
                  <DeleteTaskConfirmation
                    refetch={refetch}
                    taskId={selectedTask ? selectedTask.id : ""}
                  />
                </CustomModal>
              )}
              <BottomSheetModal
                ref={selectedTaskBottomSheetRef}
                index={0}
                snapPoints={["30%", "35%"]}
                onDismiss={() => setSelectedTask(null)}
                backgroundComponent={({ style }) => (
                  <View style={[style, { backgroundColor: "#1b1b1b" }]} />
                )}
              >
                <TaskActions
                  selectedTask={selectedTask}
                  setEditBottomSheetVisible={handleEditBottomSheet}
                  setDeletedTask={setDeletedTask}
                />
              </BottomSheetModal>
            </View>
          )
        ) : (
          <View>
            <Text>Loading...</Text>
          </View>
        )}
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Home;

const styles = StyleSheet.create({
  containter: {
    backgroundColor: "#000000",
    padding: 25,
    paddingBottom: 0,
    height: "100%",
  },
  today: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  tasksContainer: {
    flex: 1,
    padding: 20,
    marginTop: 20,
    backgroundColor: "#000000",
    borderRadius: 9,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: "100%",
    height: "100%",
  },
  addTaskContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 10,
  },
});
