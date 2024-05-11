import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import Tab from "./Tab";

type Props = {
  data: { label: string; value: any }[];
  onSelected?: (tab: any) => void;
  activeTab: any;
};

const Tabs = ({ data, onSelected, activeTab }: Props) => {
  const { container, scrollView } = styles;
  return (
    <View style={container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        style={scrollView}
      >
        {data.map((element, index) => {
          return (
            <Tab
              key={index}
              label={element.label}
              value={element.value}
              isSelected={activeTab == element.value}
              onSelected={(tab) => {
                if (onSelected) {
                  console.log("STS", true);
                  onSelected(tab);
                }
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  scrollView: {
    flexGrow: 0,
  },
});
