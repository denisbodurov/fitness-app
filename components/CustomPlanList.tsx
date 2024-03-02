import { StyleSheet, View } from "react-native";
import React from "react";
import CustomPlan from "./CustomPlan";
import { CustomPlanListProps } from "@/types/components/CustomPlan";


export default function CustomPlanList({data, theme} : CustomPlanListProps) {

  const customPlans = data.map((plan) => {
    return (
      <CustomPlan
        key={plan.id}
        id={plan.id}
        title={plan.title}
        information={plan.information}
        difficulty={plan.difficulty}
        theme={theme}
      />
    );
  });

  return <View style={style.workoutsContainer}>{customPlans}</View>;
}

const style = StyleSheet.create({
    workoutsContainer: {
        flexDirection: "column",
        gap: 20
    }
});
