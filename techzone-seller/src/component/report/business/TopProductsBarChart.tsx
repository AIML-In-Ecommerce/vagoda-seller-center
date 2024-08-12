"use client";
import React, { useMemo } from 'react';
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
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { formatCurrencyFromValue } from '@/component/util/CurrencyDisplay';

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

interface TopProductsBarChartProps {
  items: any[]
}


export default function TopProductsBarChart(props: TopProductsBarChartProps) {
  const items = useMemo<ItemData[]>(() => {
    const items = props.items;
    const sortByValue = items.sort((a,b) => a.value > b.value ? -1 : 1);
    return sortByValue.slice(0,10);
  }, [props.items])

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
        formatter: (value: number) => formatCurrencyFromValue({ value: value }),
        anchor: 'end' as const,
        align: 'end' as const,
      },

    },
    scales: {
      x: {
        ticks: {
          callback: function (val: any, index: any) {
            return formatCurrencyFromValue({ value: val });
          },
          maxTicksLimit: 6
        }
      }
    },
    // Make the chart responsive
    maintainAspectRatio: false,
    responsive: true,
  };

  const shortenText = (text: string, wordLimit = 5) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  }

  const data = {
    labels: items.map(item => shortenText(item.title)),
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
