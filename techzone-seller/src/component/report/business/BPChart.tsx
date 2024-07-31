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
import { ConversionRateInterval, ConversionRateStatistic, Order, OrderStatusInterval, OrderStatusStatistic, ReturningRateInterval, ReturningRateStatistic, SalesInterval, SalesStatistic } from '@/apis/statistic/StatisticAPI';
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

export interface BPChartStats {
    sales: SalesStatistic,
    cancelledOrders: OrderStatusStatistic,
    conversionRate: ConversionRateStatistic,
    returningRate: ReturningRateStatistic
}

const roundTo2DecimalPlaces = (value: number) => {
    return Math.round((value + Number.EPSILON) * 100) / 100;
}

const getSpecifiedCategoryListData = (data: BPChartStats, category: BPCategory, labels: string[]) => {
    let categoryId = category._id;
    let result: number[] = [];
    switch (categoryId) {
        case "revenue": case "orders": case "profit":
            {
                const statisticsData = data.sales.statisticsData;
                statisticsData?.forEach((interval: SalesInterval) => {
                    if (categoryId === "orders") {
                        let intervalDataValue = interval["count" as keyof SalesInterval] as number ?? 0;
                        result.push(intervalDataValue);
                    }
                    else {
                        let intervalDataValue = interval[categoryId as keyof SalesInterval] as number ?? 0;
                        result.push(intervalDataValue);
                    }
                })
                break;
            }
        case "avgRevenuePerOrder":
            {
                const statisticsData = data.sales.statisticsData;
                statisticsData?.forEach((interval: SalesInterval) => {
                    let intervalRevenueValue = interval["revenue" as keyof SalesInterval] as number ?? 0;
                    let intervalOrdersValue = interval["count" as keyof SalesInterval] as number ?? 0;
                    if (intervalOrdersValue === 0) {
                        result.push(intervalOrdersValue);
                    }
                    else {
                        let intervalDataValue = roundTo2DecimalPlaces(intervalRevenueValue / intervalOrdersValue)
                        result.push(intervalDataValue);
                    }
                })
                break;
            }
        case "conversionRate":
            {
                const statisticsData = data.conversionRate.statisticsData;
                statisticsData?.forEach((interval: ConversionRateInterval) => {
                    let intervalDataValue = interval[categoryId as keyof ConversionRateInterval] as number ?? 0;
                    result.push(intervalDataValue);
                })
                break;
            }
        case "cancelledOrders":
            {
                const statisticsData = data.cancelledOrders.statisticsData;
                statisticsData?.forEach((interval: OrderStatusInterval) => {
                    let intervalDataValue = interval["totalOrders" as keyof OrderStatusInterval] as number ?? 0;
                    result.push(intervalDataValue);
                })
                break;
            }
        case "returningCustomers":
            {
                const statisticsData = data.returningRate.statisticsData;
                console.log("returningCustomers", statisticsData);
                statisticsData?.forEach((interval: ReturningRateInterval) => {
                    let intervalDataValue = interval["totalReturningUsers" as keyof ReturningRateInterval] as number ?? 0;
                    result.push(intervalDataValue);
                })
                break;
            }

    }

    const formattedResult = result.map((data, index) => {
        return {
            key: labels[index],
            value: data
        }
    })
    return formattedResult;
}

const displayYLabelChart = (displayCategoryType: any, value: any) => {
    switch (displayCategoryType) {
        case "currency":
            return formatCurrencyFromValue({ value: value });
        case "percentage":
            return `${value * 100}%`;
        default:
            return Number(value).toLocaleString("vi-VN", {
                minimumFractionDigits: 0,
            });
    }
}

interface BPChartProps {
    currentPeriod: BPChartStats | undefined,
    previousPeriod: BPChartStats | undefined,
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

function getCompareDate(dateString: string, timeUnit: string) {
    let days = timeUnit === 'today' ? 0 :
        timeUnit === 'yesterday' ? 1 : timeUnit === 'week' ? 7 : 30;

    const [day, month, year] = dateString.split('/').map(Number);
    const date = new Date(year, month - 1, day);

    date.setDate(date.getDate() - days);

    const prevDay = String(date.getDate()).padStart(2, '0');
    const prevMonth = String(date.getMonth() + 1).padStart(2, '0');
    const prevYear = date.getFullYear();

    return `${prevDay}/${prevMonth}/${prevYear}`;
}

export default function BPChart(props: BPChartProps) {

    const [defaultStartDate, defaultEndDate] = getPreviousWeekDateRange_2();


    const dateFrom = useMemo(() => {
        return props.dateRange.length > 0 ? props.dateRange[0] ?? defaultStartDate : defaultStartDate;
    }, [props.dateRange]);

    const dateTo = useMemo(() => {
        return props.dateRange.length > 0 ? props.dateRange[1] ?? defaultEndDate : defaultEndDate;
    }, [props.dateRange]);

    // const dateFromCompare = useMemo(() => {
    //     return props.compareDateRange.length > 0 ? props.compareDateRange[0] ?? defaultStartDate : defaultStartDate;
    // }, [props.compareDateRange]);

    // const dateToCompare = useMemo(() => {
    //     return props.compareDateRange.length > 0 ? props.compareDateRange[1] ?? defaultEndDate : defaultEndDate;
    // }, [props.compareDateRange]);

    const timeUnit = useMemo(() => {
        return props.timeUnit ? props.timeUnit : 'today'
    }, [props.timeUnit]);

    const labels = useMemo(() => {
        const labelsResult = generateChartLabels(timeUnit, dateFrom, dateTo);
        return labelsResult;
    }, [props.timeUnit, props.dateRange])

    const categories = useMemo(() => {
        return props.categories ?? [];
    }, [props.categories])

    const displayCategoryOneType = useMemo(() => {
        if (categories[0]) {
            let categoryType = categories[0]._id;
            switch (categoryType) {
                case "revenue": case "profit": case "avgRevenuePerOrder":
                    return "currency";
                case "conversionRate":
                    return "percentage";
            }
        }
    }, [categories])

    const displayCategoryTwoType = useMemo(() => {
        if (categories[1]) {
            let categoryType = categories[1]._id;
            switch (categoryType) {
                case "revenue": case "profit": case "avgRevenuePerOrder":
                    return "currency";
                case "conversionRate":
                    return "percentage";
            }
        }
    }, [categories])

    const categoryOneData = useMemo(() => {
        if (categories.length < 1 || !props.currentPeriod) return [];
        const result = getSpecifiedCategoryListData(props.currentPeriod, categories[0], labels)
        // console.log('category 1 result', categories[0], result);
        return result;
    }, [categories, props.currentPeriod, labels]);

    const categoryTwoData = useMemo(() => {
        if (categories.length < 2 || !props.currentPeriod) return [];

        const result = getSpecifiedCategoryListData(props.currentPeriod, categories[1], labels)
        return result;
    }, [categories, props.currentPeriod, labels]);

    const categoryOneCompareData = useMemo(() => {
        if (categories.length < 1 || !props.previousPeriod) return [];
        const result = getSpecifiedCategoryListData(props.previousPeriod, categories[0], labels)
        // console.log('category 1 compare result', categories[1], result);
        return result;
    }, [categories, props.previousPeriod, labels]);

    const categoryTwoCompareData = useMemo(() => {
        if (categories.length < 2 || !props.previousPeriod) return [];
        const result = getSpecifiedCategoryListData(props.previousPeriod, categories[1], labels)
        return result;
    }, [categories, props.previousPeriod, labels]);

    // const datasetsGenerator = (categories: any) => {
    //     if (categories.length === 0) return [];
    //     else if (categories.length === 1) return [
    //         {
    //             type: 'line' as const,
    //             label: categories[0]?.title ?? 'Danh mục 1',
    //             borderColor: categories[0]?.color ?? 'black',
    //             borderWidth: 2,
    //             fill: false,
    //             data: categoryOneData,
    //             yAxisID: 'y',
    //             tension: 0.25,
    //         },
    //         {
    //             type: 'line' as const,
    //             label: categories[0]?.title + ' (Chu kỳ trước)' ?? 'Danh mục 1',
    //             borderColor: categories[0]?.color ?? 'black',
    //             borderWidth: 2,
    //             borderDash: [6, 6],
    //             fill: false,
    //             data: categoryOneCompareData,
    //             tension: 0.25
    //         },
    //     ];
    //     else if (categories.length === 2) {
    //         return [
    //             {
    //                 type: 'line' as const,
    //                 label: categories[0]?.title ?? 'Danh mục 1',
    //                 borderColor: categories[0]?.color ?? 'black',
    //                 borderWidth: 2,
    //                 fill: false,
    //                 data: categoryOneData,
    //                 yAxisID: 'y',
    //                 tension: 0.25
    //             },
    //             {
    //                 type: 'line' as const,
    //                 label: categories[0]?.title + ' (Chu kỳ trước)' ?? 'Danh mục 1',
    //                 borderColor: categories[0]?.color ?? 'black',
    //                 borderWidth: 2,
    //                 borderDash: [6, 6],
    //                 fill: false,
    //                 data: categoryOneCompareData,
    //                 tension: 0.25
    //             },
    //             {
    //                 type: 'line' as const,
    //                 label: categories[1]?.title ?? 'Danh mục 2',
    //                 borderColor: categories[1]?.color ?? 'black',
    //                 borderWidth: 2,
    //                 fill: false,
    //                 data: categoryTwoData,
    //                 yAxisID: 'y1',
    //                 tension: 0.25
    //             },
    //             {
    //                 type: 'line' as const,
    //                 label: categories[1]?.title + ' (Chu kỳ trước)' ?? 'Danh mục 2',
    //                 borderColor: categories[1]?.color ?? 'black',
    //                 borderWidth: 2,
    //                 borderDash: [6, 6],
    //                 fill: false,
    //                 data: categoryTwoCompareData,
    //                 tension: 0.25
    //             },

    //         ]
    //     }
    // }
    const datasetsGenerator = (categories: BPCategory[]) => {
        const generateDataset = (category: { title: string; color: string; }, data: { key: string; value: number; }[], compareData: { key: string; value: number; }[], yAxisID: string) => {
            const title = category?.title ?? 'Danh mục';
            const color = category?.color ?? 'black';

            return [
                {
                    type: 'line' as const,
                    label: title,
                    borderColor: color,
                    borderWidth: 2,
                    fill: false,
                    data: data,
                    yAxisID: yAxisID,
                    tension: 0.25,
                    tooltip: {
                        callbacks: {
                            label: function (context: { label: any; parsed: { y: any; }; }) {
                                switch (yAxisID) {
                                    case 'y':
                                        return `${title}: ${displayYLabelChart(displayCategoryOneType, context.parsed.y)}`;
                                    case 'y1':
                                        return `${title}: ${displayYLabelChart(displayCategoryTwoType, context.parsed.y)}`;
                                }

                            }
                        }
                    }
                },
                {
                    type: 'line' as const,
                    label: `${title} (Chu kỳ trước)`,
                    borderColor: color,
                    borderWidth: 2,
                    borderDash: [6, 6],
                    fill: false,
                    data: compareData,
                    yAxisID: `${yAxisID}`,
                    tension: 0.25,
                    tooltip: {
                        callbacks: {
                            label: function (context: { label: any; parsed: { y: any; }; }) {
                                switch (yAxisID) {
                                    case 'y':
                                        return `${title} (${getCompareDate(context.label, timeUnit)}): ${displayYLabelChart(displayCategoryOneType, context.parsed.y)}`;
                                    case 'y1':
                                        return `${title} (${getCompareDate(context.label, timeUnit)}): ${displayYLabelChart(displayCategoryTwoType, context.parsed.y)}`;
                                }
                            }
                        }
                    }
                }
            ];
        };

        if (categories.length === 0) {
            return [];
        } else if (categories.length === 1) {
            return generateDataset(categories[0], categoryOneData, categoryOneCompareData, 'y');
        } else if (categories.length === 2) {
            return [
                ...generateDataset(categories[0], categoryOneData, categoryOneCompareData, 'y'),
                ...generateDataset(categories[1], categoryTwoData, categoryTwoCompareData, 'y1')
            ];
        }
    };

    const datasets = useMemo(() => {
        const resultDatasets = datasetsGenerator(categories);
        return resultDatasets;
    }, [categories, categoryOneData, categoryTwoData, labels]);

    const data = useMemo(() => {
        const settings = {
            labels: labels,
            datasets: datasets ?? [],

        };
        return settings;
    }, [labels, datasets]);


    const options = useMemo(() => {
        return {
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
                        callback: function (val: any, index: any) {
                            // switch (displayCategoryOneType) {
                            //     case "currency":
                            //         return index % 2 === 0 ? formatCurrencyFromValue({value: val}) : '';
                            //     case "percentage":
                            //         return index % 2 === 0 ? `${val * 100}%` : '';
                            // }
                            if (!displayCategoryOneType) return Number.isInteger(val) ? val : '';
                            return index % 2 === 0 ? displayYLabelChart(displayCategoryOneType, val) : '';
                        },
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
                        callback: function (val: any, index: any) {
                            // switch (displayCategoryTwoType) {
                            //     case "currency":
                            //         return index % 2 === 0 ? formatCurrencyFromValue({value: val}) : '';
                            //     case "percentage":
                            //         return index % 2 === 0 ? `${val * 100}%` : '';
                            // }
                            if (!displayCategoryTwoType) return Number.isInteger(val) ? val : '';
                            return index % 2 === 0 ? displayYLabelChart(displayCategoryTwoType, val) : '';
                        },
                    }

                },
                x: {
                    grid: {
                        offset: true
                    },

                },


            },
            parsing: {
                xAxisKey: 'key',
                yAxisKey: 'value'
            },

            // Make the chart responsive
            maintainAspectRatio: false,
            responsive: true,
        };
    }, [categories, displayCategoryOneType, displayCategoryTwoType])

    useEffect(() => {
        console.log("update", labels, data, options);
    },[data])


    return (
        <div className="w-[100%] h-[320px]">
            <Chart type='bar' data={data} options={options} />
        </div>
    )
}
