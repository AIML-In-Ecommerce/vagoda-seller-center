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
import { getProvince } from '@/apis/statistic/AddressAPI';
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
  idProvince: string,
  revenue: string,
  profit: number,
  count: number,
  statisticsData: any,
}

interface TopCitiesBarChartProps {
  items: ItemData[]
}


export default function TopCitiesBarChart(props: TopCitiesBarChartProps) {
  const provincesData = getProvince();

  const items = useMemo<ItemData[]>(() => {
      const items = props.items;
      return items.sort((a,b) => a.revenue > b.revenue ? -1 : 1);
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
        formatter: (value: number) => formatCurrencyFromValue({value: value}),
        anchor: 'end' as const,
        align: 'end' as const,
      },

    },
    scales: {
      x: {
        ticks: {
          callback: function (val: any, index: any) {
            return formatCurrencyFromValue({value: val});
          },
          maxTicksLimit: 6
        }
      }
    },
    // Make the chart responsive
    maintainAspectRatio: false,
    responsive: true,
  };

  const data = {
    labels: items.map(current => {
        const provinceItem = provincesData.find(province => province.idProvince === current.idProvince);
        return provinceItem?.name;
  }),
    datasets: [
      {
        data: items.map(item => item.revenue),
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
