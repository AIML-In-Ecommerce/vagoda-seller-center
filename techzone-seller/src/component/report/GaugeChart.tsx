import React from "react";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js'


import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface GaugeChartProps {

}


export default function GaugeChart(props: GaugeChartProps) {
    const data = {
        datasets: [{
            label: 'Poll',
            data: [97, 3],
            backgroundColor: ['green', 'red'],
            borderColor: ['green', 'red'],
            circumference: 180,
            rotation: 270,
            cutout: '85%'
        }]
    }

    const gaugeText = {
        id: 'gaugeText',
        beforeDatasetsDraw(chart: { getDatasetMeta?: any; ctx?: any; data?: any; chartArea?: any; }, args: any, pluginOptions: any) {
            const { ctx, data, chartArea: { top, bottom, left, right, width, height } } = chart;

            const xCenter = chart.getDatasetMeta(0).data[0].x;
            const yCenter = chart.getDatasetMeta(0).data[0].y;
            const score = data.datasets[0].data[0];

            ctx.save();

            ctx.font = 'bold 30px sans-serif';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillText(`${score === 0 ? '--' : `${score} %`}` , xCenter, yCenter - 40);

            ctx.font = '15px sans-serif';
            ctx.fillStyle = 'gray';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillText(`Không có dữ liệu` , xCenter, yCenter - 20);

            ctx.font = '15px sans-serif';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillText(`Chỉ tiêu <= 2%` , xCenter, yCenter);
        }
    }

    const gaugeNeedle = {
        id: 'gaugeNeedle',
        afterDatasetsDraw(chart: { getDatasetMeta?: any; ctx?: any; data?: any; chartArea?: any; }, args: any, pluginOptions: any) {
            const { ctx, data } = chart;

            ctx.save();
            const xCenter = chart.getDatasetMeta(0).data[0].x;
            const yCenter = chart.getDatasetMeta(0).data[0].y;
            const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius;
            const innerRadius = chart.getDatasetMeta(0).data[0].innerRadius;
            const widthSlice = (outerRadius - innerRadius) / 2;

            ctx.translate(xCenter, yCenter);

            ctx.beginPath()
            ctx.strokeStyle = 'grey';
            ctx.fillStyle = 'grey';
            ctx.lineWidth = '3px'
            ctx.moveTo(0 - 15, 0);
            ctx.lineTo(0, 0 - outerRadius - widthSlice);
            ctx.lineTo(0 + 15, 0);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
            ctx.restore();


        }
    }

    return (
        <React.Fragment>
            <Doughnut data={data} plugins={[gaugeText]} />
        </React.Fragment>
    )
}