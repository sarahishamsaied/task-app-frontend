import React, { useMemo } from "react";
import { ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";
import moment, { Moment } from "moment";

type Props = {
  onPress: (day: Moment) => void;
  style?: { [key: string]: string | number };
  activeDay: Moment;
};

const DayTabs = ({ onPress, style, activeDay }: Props) => {
  const days = useMemo(() => {
    const today = moment().get("day");
    return Array.from({ length: 7 }, (_, i) => {
      return moment().day(today + i);
    });
  }, []);

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={[styles.container, { ...style }]}
      contentContainerStyle={styles.contentContainer}
    >
      {days.map((day, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.dayContainer,
            {
              backgroundColor: day.isSame(moment(), "day")
                ? "#000000"
                : day.isSame(activeDay, "day")
                ? "#000000"
                : "#424242",
              borderWidth: day.isSame(moment(), "day")
                ? 2
                : day.isSame(activeDay, "day")
                ? 1
                : 0,
              borderColor: day.isSame(moment(), "day")
                ? "#b3b3b3"
                : day.isSame(activeDay, "day")
                ? "#a5a5a5"
                : "#000",
            },
          ]}
          onPress={() => onPress(day)}
        >
          <Text style={styles.dayText}>{day.format("ddd")}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    alignItems: "center",
  },
  dayContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    height: 40,
    width: 70,
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default DayTabs;
