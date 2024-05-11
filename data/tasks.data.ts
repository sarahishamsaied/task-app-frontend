import moment from "moment";
export const tasks = [
  {
    title: "Task 1",
    content:
      "loreum ipsum  dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    startDate: moment(new Date()),
    endDate: moment(new Date()).add(1, "hour"),
    status: "Completed",
    priority: "High",
  },
  {
    title: "Task 2",
    content: `loreum  ipsum  dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    startDate: moment(new Date()).add(1, "day"),
    endDate: moment(new Date()).add(1, "hour"),
    status: "Pending",
    priority: "Low",
  },
  {
    title: "Task 3",
    content: `loreum  ipsum  dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    startDate: moment(new Date()).add(2, "day"),
    endDate: moment(new Date()).add(1, "hour"),
    status: "Pending",
    priority: "Medium",
  },
  {
    title: "Task 4",
    content: `loreum  ipsum  dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    startDate: moment(new Date()).add(3, "day"),
    endDate: moment(new Date()).add(1, "hour"),
    status: "Pending",
    priority: "High",
  },
  {
    title: "Task 5",
    content: `loreum  ipsum  dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    startDate: moment(new Date()).add(4, "day"),
    endDate: moment(new Date()).add(1, "hour"),
    status: "Pending",
    priority: "Low",
  },
  {
    title: "Task 6",
    content: `loreum  ipsum  dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    startDate: moment(new Date()).add(5, "day"),
    endDate: moment(new Date()).add(1, "hour"),
    status: "Pending",
    priority: "Medium",
  },
];
