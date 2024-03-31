import React from 'react';
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

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
);

interface BEChartProps {

}

const labels = ['January', 'February', 'March', 'April', 'May', 'June'];

export const data = {
    labels,
    datasets: [
        {
            type: 'line' as const,
            label: 'Đơn hàng',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            fill: false,
            data: labels.map(() => Math.round(Math.random() * 100) + 100),
            yAxisID: 'y',

        },
        {
            type: 'bar' as const,
            label: 'Doanh thu',
            backgroundColor: 'rgb(75, 192, 192)',
            data: labels.map(() => Math.round(Math.random() * 10000000) + 100000),
            borderColor: 'white',
            borderWidth: 2,
            yAxisID: 'y1',
        },
    ],
};

export const options = {
    interaction: {
        mode: 'index' as const,
        intersect: false,
    },
    layout: {

    },
    stacked: false,
    plugins: {
        title: {
            display: true,
        },
        legend: {
            display: true,
            align: 'center' as const,
            labels: {
                generateLabels: function (chart: ChartJS<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown>) {
                    const original = ChartJS.defaults.plugins.legend.labels.generateLabels;
                    const labels = original.call(this, chart);

                    const datasets = chart.data.datasets;

                    // Calculate total for each dataset
                    const totals = datasets.map((dataset: { data: any[]; }) => {
                        return dataset.data.reduce((sum: any, value: any) => sum + value, 0);
                    });

                    // Append total to each label and apply custom styles
                    labels.forEach((label, index) => {
                        label.text += ` (Tổng cộng: ${totals[index]})`;
                        label.borderRadius = 2;
                        label.textAlign = 'center';
                    });

                    return labels;
                }
            },
        }
    },
    scales: {
        y: {
            type: 'linear' as const,
            display: true,
            position: 'left' as const,
        },
        y1: {
            type: 'linear' as const,
            display: true,
            position: 'right' as const,
            grid: {
                drawOnChartArea: false,
            },
        },
    },
    // Make the chart responsive
    maintainAspectRatio: false,
    responsive: true,
};

export function BEChart(props: BEChartProps) {
    return (
        <div id="chart-container" className="w-[100%] h-[45vh]">
            <Chart type='bar' data={data} options={options} />
        </div>

    );
}
