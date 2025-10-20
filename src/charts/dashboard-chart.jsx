import React from "react";
import { Chart } from "react-google-charts";


const options = {
  legend: "none",

  // Overall background
  backgroundColor: "#0b1020",

  // Plot area background
  chartArea: {
    backgroundColor: "#140849c5",
    left: 48,
    top: 35,
    bottom: 45,
    width: "90%",
    height: "85%",
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
    // Typically "rising" = close > open (bull)
    risingColor: { stroke: "#34d399", fill: "#34d399" },    // green-ish
    // "falling" = close < open (bear)
    fallingColor: { stroke: "#f87171", fill: "#f87171" },   // red-ish
  },

  // Optional: thinner sticks
  bar: { groupWidth: "30%"},
};


export function DashboardChart({chartValueLength}) {
  return (
    <Chart
      chartType="CandlestickChart"
      width="100%"
      height="100%"
      data={chartValueLength} 
      // options={{ ...options, tooltip: { isHtml: false } }} 
      options={options}
      loader={<div>Loading Chart...</div>}
      packages={["corechart"]}
    />
  );
}

// export function DashboardChart() {
//   return (
//     <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: "red" }}>
//        ChartS
//         <Chart
//       chartType="CandlestickChart"
//       width="100%"
//       height="100%"
//       data={data}
//       options={options}
//       loader={<div>Loading Chart...</div>}
//       packages={["corechart"]}
//     />
//     </div>
   
//   );
// }