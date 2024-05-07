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
import { getPreviousWeekDateRange_2 } from '@/utils/DateFormatter';

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

interface BPChartProps {
    timeUnit: string,
    dateRange: (Date | null)[],
    categories: any[]
}

// Function to generate labels based on the filter type
const generateChartLabels = (timeUnit: string, startDate: Date, endDate: Date): string[] => {
    const labels: string[] = [];
    const totalLabels = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)); // Calculate total number of days
    const maxLabels = 7; // Maximum number of labels to display
    const step = Math.ceil(totalLabels / maxLabels) === 0 ? 1 : Math.ceil(totalLabels / maxLabels); // Calculate step size (date)


    let currentDate = new Date(startDate);
    let labelCount = 0;

    while (currentDate <= endDate) {
        switch (timeUnit) {
            case 'today': case 'yesterday': case 'week': case 'month':
                labels.push(currentDate.toLocaleDateString('vi-VN')); // Add date label
                currentDate.setDate(currentDate.getDate() + step); // Move to the next date based on step size
                break;
            default:
                labels.push('Label'); // Default label
                break;
        }
        labelCount++;
        if (labelCount > maxLabels) break; // Break the loop if maximum number of labels reached
    }
    return labels;
};


export default function BPChart(props: BPChartProps) {

    const [products, setProducts] = useState([]);
    const [defaultStartDate, defaultEndDate] = getPreviousWeekDateRange_2();

    const dateFrom = useMemo(() => {
        return props.dateRange.length > 0 ? props.dateRange[0] ?? defaultStartDate : defaultStartDate;
    }, [props.dateRange]);

    const dateTo = useMemo(() => {
        return props.dateRange.length > 0 ? props.dateRange[1] ?? defaultEndDate : defaultEndDate;
    }, [props.dateRange]);

    const timeUnit = useMemo(() => {
        return props.timeUnit ? props.timeUnit : 'today'
    }, [props.timeUnit]);

    const labels = useMemo(() => {
        return generateChartLabels(timeUnit, dateFrom, dateTo);
    }, [props.timeUnit, props.dateRange])

    const categories = useMemo(() => {
        return props.categories ?? [];
    }, [props.categories])

    useEffect(() => {
        const fetchProducts = async () => {

        }
        fetchProducts();
    }, [])

    const categoryOneData = useMemo(() => {
        // const result = getTotalQuantitiesInRange(products, dateFrom, dateTo, timeUnit);
        // props.setTotalOrderQuantity(calculateTotals(result));
        // return result;
        return [123, 434, 232, 424, 252];
    }, [products, dateFrom, dateTo, timeUnit]);

    const categoryTwoData = useMemo(() => {
        // const result = getTotalPricesInRange(products, dateFrom, dateTo, timeUnit);
        // props.setTotalRevenue(calculateTotals(result));
        // return result;
        return [34234, 5353, 2312, 35351, 23211];
    }, [products, dateFrom, dateTo, timeUnit]);

    const datasetsGenerator = (categories: any) => {
        if (categories.length === 0) return [];
        else if (categories.length === 1) return [
            {
                type: 'line' as const,
                label: categories[0]?.title ?? 'Danh mục 1',
                borderColor: categories[0]?.color ?? 'black',
                borderWidth: 2,
                fill: false,
                data: categoryOneData,
                yAxisID: 'y',
            },
        ];
        else if (categories.length === 2) {
            return [
                {
                    type: 'line' as const,
                    label: categories[0]?.title ?? 'Danh mục 1',
                    borderColor: categories[0]?.color ?? 'black',
                    borderWidth: 2,
                    fill: false,
                    data: categoryOneData,
                    yAxisID: 'y',
                },
                {
                    type: 'line' as const,
                    label: categories[1]?.title ?? 'Danh mục 2',
                    borderColor: categories[1]?.color ?? 'black',
                    borderWidth: 2,
                    fill: false,
                    data: categoryTwoData,
                    yAxisID: 'y1',
                },
            ]
        }
    }

    const data = useMemo(() => {
        const settings = {
            labels: labels,
            datasets: datasetsGenerator(categories)!,
        };
        return settings;
    }, [labels, categoryOneData, categoryTwoData]);


    const options = {
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
            },
        },
        scales: {
            'y': {
                type: 'linear' as const,
                display: true,
                position: 'left' as const,
                ticks: {
                    // callback: function (val: any, index: any) {
                    //     return index % 2 === 0 ? val : '';
                    // },
                }

            },
            'y1': {
                type: 'linear' as const,
                display: true,
                position: 'right' as const,
                grid: {
                    drawOnChartArea: false,
                },
                ticks: {
                    // callback: function (val: any, index: any) {
                    //     return val.toLocaleString("vi-VN", {
                    //         style: "currency",
                    //         currency: "VND",
                    //         minimumFractionDigits: 0
                    //     });
                    // },
                }

            },
            x: {
                grid: {
                    offset: true
                }
            }

        },
        // Make the chart responsive
        maintainAspectRatio: false,
        responsive: true,
    };

    return (
        <div className="w-[100%] h-[320px]">
            <Chart type='bar' data={data} options={options} />
        </div>
    )
}
