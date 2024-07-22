"use client";
import React, { useContext, useEffect, useMemo, useState } from 'react';
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
import { AuthContext } from '@/context/AuthContext';
import { Order, OrderStatusType } from '@/apis/statistic/StatisticAPI';

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
    filterBy: string,
    dateRange: (Date | null)[],
    orders: Order[],
    setTotalOrderQuantity: (total: number) => void,
    setTotalRevenue: (total: number) => void,
}

// Function to generate labels based on the filter type
const generateChartLabels = (filterBy: string, startDate: Date, endDate: Date): string[] => {
    const labels: string[] = [];
    const totalLabels = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)); // Calculate total number of days
    const maxLabels = 12; // Maximum number of labels to display
    const step = Math.ceil(totalLabels / maxLabels); // Calculate step size (date)

    let currentDate = new Date(startDate);
    let labelCount = 0;

    while (currentDate <= endDate) {
        switch (filterBy) {
            case 'date':
                labels.push(currentDate.toLocaleDateString('vi-VN')); // Add date label
                currentDate.setDate(currentDate.getDate() + step); // Move to the next date based on step size
                break;
            case 'month':
                labels.push(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`); // Add month label
                currentDate.setMonth(currentDate.getMonth() + Math.ceil(step / 29)); // Move to the next month based on step size
                break;
            case 'quarter':
                const quarter = Math.floor((currentDate.getMonth() + 3) / 3); // Calculate quarter
                labels.push(`${currentDate.getFullYear()} Q${quarter}`); // Add quarter label
                currentDate.setMonth(currentDate.getMonth() + Math.ceil(step / 29) * 3); // Move to the next quarter based on step size
                break;
            case 'year':
                labels.push(`${currentDate.getFullYear()}`); // Add year label
                currentDate.setFullYear(currentDate.getFullYear() + Math.ceil(Math.ceil(step / 29) / 12)); // Move to the next year based on step size
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

//Legacy
{
    // // Function to generate a random date within a specified range
    // const randomDate = (start: Date, end: Date): Date => {
    //     return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    // };

    // const generateUniqueId = (): string => {
    //     // Generate a random alphanumeric string
    //     const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     let id = '';
    //     for (let i = 0; i < 24; i++) {
    //         id += alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length));
    //     }
    //     return id;
    // };

    // // Function to generate a random product
    // const generateRandomProduct = (): Product => {
    //     const productName = `Product ${Math.floor(Math.random() * 1000)}`;
    //     const price = Math.round(Math.random() * 30000000) + 100000;

    //     const quantity = Math.round(Math.random() * 15) + 10;
    //     const startDate = new Date('2020-01-01');
    //     const endDate = new Date(); // Current date
    //     endDate.setUTCHours(0, 0, 0, 0);
    //     const purchaseDate = randomDate(startDate, endDate);
    //     const _id = generateUniqueId();

    //     return {
    //         _id,
    //         name: productName,
    //         price,
    //         purchaseDate,
    //         quantity
    //     };
    // };

    // Function to generate an array of random products
    // const generateProductData = async (numProducts: number) => {
    //     const products: Product[] = [];

    //     for (let i = 0; i < numProducts; i++) {
    //         products.push(generateRandomProduct());
    //     }
    //     return products;
    // };

}

// Function to calculate total quantity of products purchased from a specific date until present
const getTotalQuantityFromSpecificDate = (orders: Order[], specificDate: Date): number => {
    if (!orders) return 0;
    //Set dateAfter
    let dateAfter = new Date(specificDate);
    specificDate.setHours(0, 0, 0, 0);
    dateAfter.setDate(dateAfter.getDate());
    dateAfter.setHours(23, 59, 59, 59);

    const filterSpecificDateOrders = orders.filter((order) => {
        const orderStatusInfo = order.confirmedStatus;
        const purchasedTime = new Date(orderStatusInfo.time);
        return (purchasedTime >= specificDate) && (purchasedTime < dateAfter);
    })
    let totalQuantity = filterSpecificDateOrders.length;
    return totalQuantity;
};

const getDateAfterStep = (currentDate: Date, step: number, unitStep: string) => {
    let dateAfterStep = new Date(currentDate);

    unitStep === 'date' ?
        dateAfterStep.setDate(dateAfterStep.getDate() + step) : unitStep === 'month' ?
            dateAfterStep.setMonth(dateAfterStep.getMonth() + Math.ceil(step / 29)) : unitStep === 'quarter' ?
                dateAfterStep.setMonth(dateAfterStep.getMonth() + step) :
                dateAfterStep.setFullYear(dateAfterStep.getFullYear() + Math.ceil(Math.ceil(step / 29) / 12));
    // dateAfterStep.setHours(23, 59, 59, 59);

    return dateAfterStep;
}

// Function to generate an array of total quantities for each date within a range
const getTotalQuantitiesInRange = (orders: Order[], startDate: Date, endDate: Date, filterBy: string): number[] => {
    const totalQuantities: number[] = [];
    startDate.setHours(0, 0, 0, 0);
    const totalDates = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)); // Calculate total number of days
    const maxItems = 12; // Maximum number of labels to display
    let step = Math.ceil(totalDates / maxItems); // Calculate step size (date)
    // console.log('step size', step);
    step = filterBy === 'date' ?
        step : filterBy === 'month' ?
            Math.ceil(step / 29) : filterBy === 'quarter' ?
                Math.ceil(step / 29) * 3 : Math.ceil(Math.ceil(step / 29) / 12);
    // console.log(`step ${filterBy}`, step);
    let currentDate = new Date(startDate);  
    let dateAfterStep = getDateAfterStep(currentDate, step, filterBy);
    // console.log('current vs after', currentDate, dateAfterStep);
    while (currentDate <= endDate) {
        let totalQuantityPerStep = 0;
        //Interval between steps
        console.log()
        while (currentDate < dateAfterStep) {
            totalQuantityPerStep += getTotalQuantityFromSpecificDate(orders, currentDate);
            currentDate.setDate(currentDate.getDate() + 1) // Move to the next date
        }
        totalQuantities.push(totalQuantityPerStep);
        currentDate = new Date(dateAfterStep);
        dateAfterStep = getDateAfterStep(dateAfterStep, step, filterBy); // Get the date after step
    }
    // console.log("Total Quantities:", totalQuantities);
    return totalQuantities;
};

// Function to calculate total price of products purchased from a specific date until present
const getTotalPriceFromSpecificDate = (orders: Order[], specificDate: Date): number => {
    if (!orders) return 0;

    let initialPrice = 0;
    let dateAfter = new Date(specificDate);
    specificDate.setHours(0, 0, 0, 0);
    dateAfter.setDate(dateAfter.getDate());
    dateAfter.setHours(23, 59, 59, 59);

    const filterSpecificDateOrders = orders.filter((order) => {
        const orderStatusInfo = order.confirmedStatus;
        const purchasedTime = new Date(orderStatusInfo.time);
        return (purchasedTime >= specificDate) && (purchasedTime < dateAfter);
    })

    const totalPrices = filterSpecificDateOrders.reduce(
        (accumulator, currentOrder) => accumulator + currentOrder.totalPrice
    , initialPrice);

    return totalPrices;
};

// Function to generate an array of total prices for each date within a range
const getTotalPricesInRange = (orders: Order[], startDate: Date, endDate: Date, filterBy: string): number[] => {
    const totalPrices: number[] = [];
    startDate.setHours(0, 0, 0, 0);
    const totalDates = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)); // Calculate total number of days
    const maxItems = 12; // Maximum number of labels to display
    let step = Math.ceil(totalDates / maxItems); // Calculate step size (date)
    step = filterBy === 'date' ?
        step : filterBy === 'month' ?
            Math.ceil(step / 29) : filterBy === 'quarter' ?
                Math.ceil(step / 29) * 3 : Math.ceil(Math.ceil(step / 29) / 12);

    let currentDate = new Date(startDate);
    let dateAfterStep = getDateAfterStep(currentDate, step, filterBy);
    while (currentDate <= endDate) {
        let totalPricePerStep = 0;
        // console.log(`Current date: ${currentDate}`);
        // console.log(`dateAfterStep: ${dateAfterStep}`);
        //Interval between steps
        while (currentDate < dateAfterStep) {
            totalPricePerStep += getTotalPriceFromSpecificDate(orders, currentDate);
            currentDate.setDate(currentDate.getDate() + 1); // Move to the next date
        }
        totalPrices.push(totalPricePerStep);
        currentDate = new Date(dateAfterStep);
        dateAfterStep = getDateAfterStep(dateAfterStep, step, filterBy); // Get the date after step
    }
    
    return totalPrices;
};

function calculateTotals(array: number[]) {
    return array.reduce((total, current) => total + current, 0);
}


export function BEChart(props: BEChartProps) {
    // const context = useContext(AuthContext);
    // Generate 1000 random products
    // const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>(props.orders);
    const [defaultStartDate, defaultEndDate] = getPreviousWeekDateRange_2();
    

    const dateFrom = useMemo(() => {
        return props.dateRange.length > 0 ? props.dateRange[0] ?? defaultStartDate : defaultStartDate;
    }, [props.dateRange]);
    
    const dateTo = useMemo(() => {
        return props.dateRange.length > 0 ? props.dateRange[1] ?? defaultEndDate : defaultEndDate;
    }, [props.dateRange]);

    const filterBy = useMemo(() => {
        return props.filterBy ? props.filterBy : 'date'
    }, [props.filterBy]);

    const labels = useMemo(() => {
        return generateChartLabels(filterBy, dateFrom, dateTo);
    }, [props.filterBy, props.dateRange])

    const quantityData = useMemo(() => {
        const result = getTotalQuantitiesInRange(orders, dateFrom, dateTo, filterBy);
        props.setTotalOrderQuantity(calculateTotals(result));
        return result;
    }, [orders, dateFrom, dateTo, filterBy]);

    const revenueData = useMemo(() => {
        const result = getTotalPricesInRange(orders, dateFrom, dateTo, filterBy);
        props.setTotalRevenue(calculateTotals(result));
        return result;
    }, [orders, dateFrom, dateTo, filterBy]);

    const data = useMemo(() => {
        // console.log('data', labels, quantityData, revenueData);
        const props = {
            labels: labels,
            datasets: [
                {
                    type: 'line' as const,
                    label: 'Đơn hàng',
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 2,
                    fill: false,
                    data: quantityData,
                    yAxisID: 'y',

                },
                {
                    type: 'bar' as const,
                    label: 'Doanh thu',
                    backgroundColor: 'rgb(75, 192, 192)',
                    data: revenueData,
                    borderColor: 'white',
                    borderWidth: 2,
                    yAxisID: 'y1',
                },
            ],
        };
        return props;
    }, [labels, quantityData, revenueData]);

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
                    callback: function (val: any, index: any) {
                        return val.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                            minimumFractionDigits: 0
                        });
                    },
                }

            },

        },

        // Make the chart responsive
        maintainAspectRatio: false,
        responsive: true,
    };

    useEffect(() => {
        if (props.orders) {
            setOrders(props.orders);
        }
    }, [props.orders])

    return (
        <div id="chart-container" className="w-[100%] h-[100%]">
            <Chart type='bar' data={data} options={options} />
        </div>
    );
}
