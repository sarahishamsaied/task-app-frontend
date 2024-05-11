import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1b1b1b",
    padding: 25,
    paddingBottom: 0,
    flex: 1,
    borderWidth: 1,
    borderColor: "#3f3e3e",
  },

  today: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  label: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 20,
  },
  pickATime: {
    color: "#d8d8d8",
    fontSize: 16,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#d8d8d8",
    width: "auto",
    marginVertical: 10,
    paddingBottom: 5,
  },
  time: { color: "#fff", fontWeight: "bold" },
  row: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 20,
  },
  startContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 20,
  },
  scrollView: {
    flex: 1,
  },
  error: {
    color: "#ff3939",
    fontSize: 18,
    marginTop: 10,
  },
  success: {
    color: "#62ff89",
    fontSize: 18,
    marginTop: 10,
  },
});

export default styles;
