import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Day","Low","Open", "Close", "High",],
  ["Mon", 238.61, 240.75, 243.10, 246.30],
  ["Tue", 242.30, 245.15, 244.90, 246.81],
  ["Wed", 241.6550, 246.64, 245.69, 246.64],
  ["Thu", 244.58, 245.66, 245.35, 248.50],
  ["Fri", 245.61, 249.64, 250.43, 250.44],
  ["Mon", 243.82, 244.96, 245.76, 246.00],
  ["Tue", 239.15, 244.15, 244.62, 244.76],
  ["Wed", 236.89, 241.41, 241.53, 244.09],
];


// export const options = {
//   legend: "none",
//   bar: { groupWidth: "50%" }, // Remove space between bars.
//   candlestick: {
//     fallingColor: { strokeWidth: 0, fill: "#a52714" }, // red
//     risingColor: { strokeWidth: 0, fill: "#0f9d58" }, // green
//   },
// };

const options = {
  legend: "none",

  // Overall background
  backgroundColor: { fill: "transparent", fillOpacity: 0.77 },

  // Plot area background
  chartArea: {
    backgroundColor: "#140849c5",
    left: 63,
    top: 35,
    bottom: 45,
    width: "90%",
    height: "90%",
    borderRadius: '10px'
  },

  // Axes & grid colors
  hAxis: {
    textStyle: { color: "#e2e8f0" },
    gridlines: { color: "#1f2a44" },
    baselineColor: "#1f2a44",
  },
  vAxis: {
    textStyle: { color: "#e2e8f0" },
    gridlines: { color: "#1f2a44" },
    baselineColor: "#1f2a44",
  },

  // Candle colors (“picks”)
  candlestick: {
    risingColor: { stroke: "#34d399", fill: "#34d399" },    // green-ish
    fallingColor: { stroke: "#f87171", fill: "#f87171" },   // red-ish
  },

  // Optional: thinner sticks
  bar: { groupWidth: "40%"},
};

export function NewChart() {
  return (
    <Chart
      chartType="CandlestickChart"
      width="100%"
      height="100%"
      data={data}
      options={options}
       loader={<div>Loading Chart...</div>}
      packages={["corechart"]}
    />
  );
}