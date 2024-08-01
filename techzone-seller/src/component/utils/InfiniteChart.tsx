import React, { useEffect, useRef } from "react";
import embed, { VisualizationSpec } from "vega-embed";

const InfiniteChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spec: VisualizationSpec = {
      // $schema: "https://vega.github.io/schema/vega-lite/v5.json",
      description: "A simple bar chart with embedded data.",
      width: 400,
      height: 300,
      data: {
        values: [
          { a: "A", b: 28 },
          { a: "B", b: 55 },
          { a: "C", b: 43 },
          { a: "D", b: 91 },
          { a: "E", b: 81 },
          { a: "F", b: 53 },
          { a: "G", b: 19 },
          { a: "H", b: 87 },
          { a: "I", b: 52 },
        ],
      },
      mark: "bar",
      encoding: {
        x: { field: "a", type: "ordinal" },
        y: { field: "b", type: "quantitative" },
      },
    };

    if (chartRef.current) {
      embed(chartRef.current, spec).catch((error) =>
        console.error("Error embedding Vega chart:", error),
      );
    }
  }, []);

  return <div ref={chartRef} />;
};

export default InfiniteChart;

// components/VegaChart.js
// import React from "react";
// import { VegaLite, VisualizationSpec } from "react-vega";

// const InfiniteChart = () => {
//   const spec: VisualizationSpec = {
//     width: 400,
//     height: 200,
//     mark: "bar" as const, // Ensure 'bar' is treated as a specific value
//     encoding: {
//       x: { field: "a", type: "ordinal" },
//       y: { field: "b", type: "quantitative" },
//     },
//     data: { name: "table" }, // Note: name should be 'table'
//   };

//   const data = {
//     table: [
//       { a: "A", b: 28 },
//       { a: "B", b: 55 },
//       { a: "C", b: 43 },
//       { a: "D", b: 91 },
//       { a: "E", b: 81 },
//       { a: "F", b: 53 },
//       { a: "G", b: 19 },
//       { a: "H", b: 87 },
//       { a: "I", b: 52 },
//     ],
//   };

//   return <VegaLite spec={spec} data={data} />;
// };

// export default InfiniteChart;
