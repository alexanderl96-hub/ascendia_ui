import React from "react";
import { Chart } from "react-google-charts";

export function PortfolioChart() {
  const data = [
    ["Task", "Hours per Day"],
    ["Work", 9],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];

  const options = {
    legend: "none",
  };
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"200px"}
      packages={["corechart"]}
    />
  );
}