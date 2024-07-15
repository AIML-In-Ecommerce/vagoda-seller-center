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
import { BusinessPerformanceStats, Order, StatisticInterval } from '@/apis/statistic/StatisticAPI';

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

interface BPCategory {
    _id: string;
    title: string,
    value: number;
    suffix?: string;
    isPercentageValue?: boolean;
    percentChange?: number;
    tooltip: string;
    color: string;
}

interface BPChartProps {
    BECurrent: BusinessPerformanceStats | undefined,
    BEPrevious: BusinessPerformanceStats | undefined,
    timeUnit: string,
    dateRange: (Date | null)[],
    categories: BPCategory[]
}

const maxLabels = 31; // Maximum number of labels to display

// Function to generate labels based on the filter type
const generateChartLabels = (timeUnit: string, startDate: Date, endDate: Date): string[] => {
    const labels: string[] = [];
    const totalLabels = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)); // Calculate total number of days
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
    // console.log('generateChartLabels', totalLabels, step, labels);
    return labels;
};


export default function BPChart(props: BPChartProps) {

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
        // const fetchProducts = async () => {
        // }
        // fetchProducts();
        // console.log("BEStats", props.BECurrent)
        // console.log("BEStatsCompare", props.BEPrevious)
        // console.log("categories", categories)
    }, [categories])

    const categoryOneData = useMemo(() => {
        if (categories.length < 1 || !props.BECurrent) return [];

        const result: number[] = [];
        const categoryOne = categories[0]._id;
        const statisticData = props.BECurrent?.statisticData;
        statisticData?.forEach((interval: StatisticInterval) => {
            let intervalDataValue = interval[categoryOne as keyof StatisticInterval] as number ?? 0;
            intervalDataValue = categories[0].isPercentageValue ? intervalDataValue * 100 : intervalDataValue;
            result.push(intervalDataValue);
        })
        return result;
    }, [categories, props.BECurrent]);

    const categoryTwoData = useMemo(() => {
        if (categories.length < 2 || !props.BECurrent) return [];

        const result: number[] = [];
        const categoryTwo = categories[1]._id;
        const statisticData = props.BECurrent?.statisticData;
        statisticData?.forEach((interval: StatisticInterval) => {
            let intervalDataValue = interval[categoryTwo as keyof StatisticInterval] as number ?? 0;
            intervalDataValue = categories[0].isPercentageValue ? intervalDataValue * 100 : intervalDataValue;
            result.push(intervalDataValue);
        })
        return result;
    }, [categories, props.BECurrent]);

    const categoryOneCompareData = useMemo(() => {
        if (categories.length < 1|| !props.BEPrevious) return [];

        const result: number[] = [];
        const categoryOne = categories[0]._id;
        const statisticData = props.BEPrevious?.statisticData;
        statisticData?.forEach((interval: StatisticInterval) => {
            let intervalDataValue = interval[categoryOne as keyof StatisticInterval] as number ?? 0;
            intervalDataValue = categories[0].isPercentageValue ? intervalDataValue * 100 : intervalDataValue;
            result.push(intervalDataValue);
        })
        return result;
    },[categories, props.BEPrevious]);

    const categoryTwoCompareData = useMemo(() => {
        if (categories.length < 2 || !props.BEPrevious) return [];

        const result: number[] = [];
        const categoryTwo = categories[1]._id;
        const statisticData = props.BEPrevious?.statisticData;
        statisticData?.forEach((interval: StatisticInterval) => {
            let intervalDataValue = interval[categoryTwo as keyof StatisticInterval] as number ?? 0;
            intervalDataValue = categories[0].isPercentageValue ? intervalDataValue * 100 : intervalDataValue;
            result.push(intervalDataValue);
        })
        return result;
    },[categories, props.BEPrevious]);

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
                tension: 0.25
            },
            {
                type: 'line' as const,
                label: categories[0]?.title + ' (Chu kỳ trước)' ?? 'Danh mục 1',
                borderColor: categories[0]?.color ?? 'black',
                borderWidth: 2,
                borderDash: [6,6],
                fill: false,
                data: categoryOneCompareData,
                tension: 0.25
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
                    tension: 0.25
                },
                {
                    type: 'line' as const,
                    label: categories[0]?.title + ' (Chu kỳ trước)' ?? 'Danh mục 1',
                    borderColor: categories[0]?.color ?? 'black',
                    borderWidth: 2,
                    borderDash: [6,6],
                    fill: false,
                    data: categoryOneCompareData,
                    tension: 0.25
                },
                {
                    type: 'line' as const,
                    label: categories[1]?.title ?? 'Danh mục 2',
                    borderColor: categories[1]?.color ?? 'black',
                    borderWidth: 2,
                    fill: false,
                    data: categoryTwoData,
                    yAxisID: 'y1',
                    tension: 0.25
                },
                {
                    type: 'line' as const,
                    label: categories[1]?.title + ' (Chu kỳ trước)' ?? 'Danh mục 2',
                    borderColor: categories[1]?.color ?? 'black',
                    borderWidth: 2,
                    borderDash: [6,6],
                    fill: false,
                    data: categoryTwoCompareData,
                    tension: 0.25
                },
                
            ]
        }
    }

    const datasets = useMemo(() => {
        const resultDatasets = datasetsGenerator(categories);
        return resultDatasets;
    },[categories]);

    const data = useMemo(() => {
        const settings = {
            labels: labels,
            datasets: datasets!,
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
                display: categories.length > 0,
                position: 'left' as const,
                ticks: {
                    // callback: function (val: any, index: any) {
                    //     return index % 2 === 0 ? val : '';
                    // },
                }

            },
            'y1': {
                type: 'linear' as const,
                display: categories.length > 1,
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
            },
            

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
