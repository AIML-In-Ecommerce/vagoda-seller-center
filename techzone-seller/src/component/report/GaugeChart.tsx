import React from "react";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js'


import { Chart } from "react-chartjs-2";
import { Empty, Tag } from "antd";

ChartJS.register(ArcElement, Tooltip, Legend);

interface GaugeChartProps {
    label: string;
    labels: string[];
    datasets: number[] | undefined;
    isBelow: boolean; //is below the threshold value
    thresholdValue: number; //threshold value (in percentage)
    pointerColor?: string;
}


export default function GaugeChart(props: GaugeChartProps) {
    const data = {
        labels: props.labels,
        datasets: [{
            label: props.label,
            data: props.datasets,
            backgroundColor: props.isBelow ? ['red', 'green'] : ['green', 'red'],
            borderColor: props.isBelow ? ['red', 'green'] : ['green', 'red'],
            circumference: 180,
            rotation: 270,
            cutout: '85%'
        }]
    }

    const gaugeText = {
        id: 'gaugeText',
        beforeDatasetsDraw(chart: { getDatasetMeta?: any; ctx?: any; data?: any; chartArea?: any; }, args: any, pluginOptions: any) {
            const { ctx, data, chartArea: { top, bottom, left, right, width, height } } = chart;

            // const xCenter = chart.getDatasetMeta(0).data[0].x;
            // const yCenter = chart.getDatasetMeta(0).data[0].y;
            // const score1 = data.datasets[0].data[0];
            // const score2 = data.datasets[0].data[1];
            // const scoreRatio = (score1 / (score1 + score2) * 100).toFixed(2);

            ctx.save();

            // ctx.font = 'bold 30px sans-serif';
            // ctx.fillStyle = 'black';
            // ctx.textAlign = 'center';
            // ctx.textBaseline = 'bottom';
            // ctx.fillText(`${score1 === 0 && score2 === 0 ? '--' : `${scoreRatio}%`}`, xCenter, yCenter - 40);

            // ctx.font = '15px sans-serif';
            // ctx.fillStyle = 'gray';
            // ctx.textAlign = 'center';
            // ctx.textBaseline = 'bottom';
            // ctx.fillText(`Không có dữ liệu`, xCenter, yCenter - 20);

            // ctx.font = '15px sans-serif';
            // ctx.fillStyle = 'black';
            // ctx.textAlign = 'center';
            // ctx.textBaseline = 'bottom';
            // ctx.fillText(`Chỉ tiêu ${props.isBelow ? '<=' : '>='} ${props.thresholdValue}%`, xCenter, yCenter);
        }
    }

    const doughnutPointer = {
        id: 'doughnutPointer',
        afterDatasetsDraw(chart: { getDatasetMeta?: any; ctx?: any; data?: any; chartArea?: any; }, args: any, plugins: any) {
            const { ctx, data } = chart;
            ctx.save();

            const xCenter = chart.getDatasetMeta(0).data[0].x;
            const yCenter = chart.getDatasetMeta(0).data[0].y;
            const innerRadius = chart.getDatasetMeta(0).data[0].innerRadius;
            const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius;
            const doughnutThickness = outerRadius - innerRadius;
            const angle = Math.PI / 180;
            const pointerColor = props.pointerColor || 'black';
            const pointerValue = props.thresholdValue || 1;
            const targetPointerRation = (pointerValue / 100 * 180) - 90;
            const numTicks = 10;

            // Calculate the angle between each tick
            const angleIncrement = Math.PI / numTicks;

            ctx.translate(xCenter, yCenter);
            ctx.rotate(-Math.PI);

            // Draw labels
            for (let i = 0; i <= numTicks; i++) {
                if (![0, numTicks].includes(i) && i % 2 === 1) continue;

                const tickAngle = angleIncrement * i;
                const label = (i * 10).toString();

                ctx.save(); // Save the current canvas state
                ctx.translate((innerRadius - 20) * Math.cos(tickAngle), (innerRadius - 20) * Math.sin(tickAngle));
                ctx.rotate(-Math.PI); // Rotate the label

                ctx.font = '10px sans-serif';
                ctx.fillStyle = 'black';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(label, 0, 0);

                ctx.restore(); // Restore the canvas state to its original
            }
            ctx.restore();

            // pointer
            ctx.translate(xCenter, yCenter);
            ctx.rotate(angle * targetPointerRation);

            ctx.beginPath();
            ctx.strokeStyle = pointerColor; // Set stroke style
            ctx.lineWidth = 2; // Set line width

            // Set the line dash pattern (5px dash followed by 5px gap)
            ctx.setLineDash([2, 2]);

            // Draw the line
            ctx.moveTo(0, -outerRadius - 10); // Move to starting point
            ctx.lineTo(0, -outerRadius + doughnutThickness + 10); // Draw to ending point
            ctx.stroke(); // Stroke the path

            ctx.restore();
        }
    }

    const config = {
        data: data,
        options: {
            // Make the chart responsive
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
            },
            layout: {
                padding: 10,
            },

        },
        plugins: [gaugeText, doughnutPointer]

    }

    const score1 = data.datasets[0].data?.at(0);
    const score2 = data.datasets[0].data?.at(1);
    const scoreRatio = (score1 && score2) ? (score1 / (score1 + score2) * 100).toFixed(2) : 0;
    const checkThreshold = (value: number, threshold: number, isAboveThreshold: boolean) => {
        return isAboveThreshold ? value >= threshold : value <= threshold;
    }
    return (
        <React.Fragment>
            {
                (props.datasets) ? (
                    <div className="chart-container w-full relative" style={{ height: '260px', objectFit: 'cover' }}>
                        <Chart type="doughnut" {...config} />
                        <div className="absolute bottom-5 lg:bottom-0 inset-x-0 flex flex-col justify-center items-center">
                            <div className="font-bold text-3xl">{score1 === 0 && score2 === 0 ? '--' : `${scoreRatio}`}%</div>
                            <div>
                                {
                                    checkThreshold(Number(scoreRatio), props.thresholdValue, !props.isBelow) ? (
                                        <Tag color="#87d068" className="font-semibold">Tốt</Tag>
                                    ) : <Tag color="#f50" className="font-semibold">Xấu</Tag>
                                }
                            </div>
                            {/* <div className="text-slate-500 italic">Không có dữ liệu</div> */}
                            <div>Chỉ tiêu {props.isBelow ? '<=' : '>='} {props.thresholdValue}%</div>
                        </div>
                    </div>
                ) : <Empty description="Không có dữ liệu, vui lòng chọn khoảng thời gian khác"/>
            }
        </React.Fragment>
    )
}