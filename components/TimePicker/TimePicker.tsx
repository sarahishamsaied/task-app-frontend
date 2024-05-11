import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment, { Moment } from "moment";
import styles from "../AddTask/styles";

type Props = {
  label: string;
  initialDateTime: Date;
  onChange: (dateTime: moment.Moment) => void;
};

const DateTimeSelector = ({ label, initialDateTime, onChange }: Props) => {
  const [dateTime, setDateTime] = useState(moment(initialDateTime));
  const [pickerVisible, setPickerVisible] = useState<string | null>(null);

  const handleDateOrTimeChange = (newDateTime: Moment) => {
    setDateTime(newDateTime);
    console.log(dateTime);
    onChange(newDateTime);
    setPickerVisible(null);
  };

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.startContainer}>
        <TouchableOpacity onPress={() => setPickerVisible("time")}>
          <Text style={styles.pickATime}>{dateTime.format("hh:mm A")}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPickerVisible("date")}>
          <Text style={styles.pickATime}>
            {dateTime.format("MMMM Do YYYY")}
          </Text>
        </TouchableOpacity>
      </View>
      {pickerVisible === "time" && (
        <DateTimePicker
          value={dateTime.toDate()}
          mode="time"
          display="spinner"
          onChange={(event, selectedDate) => {
            if (selectedDate) {
              const newDateTime = moment(dateTime).set({
                hour: moment(selectedDate).hour(),
                minute: moment(selectedDate).minute(),
              });
              handleDateOrTimeChange(newDateTime);
            }
          }}
        />
      )}
      {pickerVisible === "date" && (
        <DateTimePicker
          value={dateTime.toDate()}
          mode="date"
          display="spinner"
          onChange={(event, selectedDate) => {
            if (selectedDate) {
              const newDateTime = moment(dateTime).set({
                year: moment(selectedDate).year(),
                month: moment(selectedDate).month(),
                date: moment(selectedDate).date(),
              });
              handleDateOrTimeChange(newDateTime);
            }
          }}
        />
      )}
    </View>
  );
};

export default DateTimeSelector;
