"use client";
import React, { useEffect, useMemo, useState } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  BubbleDataPoint,
  ChartTypeRegistry,
  Point,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
);

interface ItemData {
  _id: string,
  title: string,
  value: number,
  count: number
}

interface HorizontalBarChartProps {
  items: any[]
}


export default function HorizontalBarChart(props: HorizontalBarChartProps) {
  const items = useMemo<ItemData[]>(() => {
      const items = props.items;
      return items;
  },[props.items])

  const options = {
    indexAxis: 'y' as const,
    layout: {
      padding: {
        right: 85
      }
    },
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        color: "black",
        formatter: (value: number) => value.toLocaleString(),
        anchor: 'end' as const,
        align: 'end' as const,
      },

    },
    scales: {
      x: {
        ticks: {
          // callback: function (val: any, index: any) {
          //   return index % 2 === 0 ? val.toLocaleString() : '';
          // },
          maxTicksLimit: 6
        }
      }
    },
    // Make the chart responsive
    maintainAspectRatio: false,
    responsive: true,
  };

  const data = {
    labels: items.map(item => item.title),
    datasets: [
      {
        data: items.map(item => item.value),
        backgroundColor: '#75c799',
        borderColor: '#75c799',
      }
    ],
  };

  return (
    <div className="w-[100%] h-[320px]">
      <Chart type="bar" options={options} data={data} plugins={[ChartDataLabels]} />
    </div>
  )
}
