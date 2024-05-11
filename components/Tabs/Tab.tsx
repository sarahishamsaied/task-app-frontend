import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

type TabProps = {
  label: string;
  value: string | number;
  isSelected: boolean;
  onSelected: (tab: string | number) => void;
};

const Tab = ({ label, value, isSelected, onSelected }: TabProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onSelected(value);
      }}
    >
      <Text style={[styles.text, { color: isSelected ? "#fff" : "#494949" }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    padding: 5,
    borderRadius: 10,
    fontWeight: "bold",
    width: 70,

    textAlign: "center",
  },
});

export default Tab;
