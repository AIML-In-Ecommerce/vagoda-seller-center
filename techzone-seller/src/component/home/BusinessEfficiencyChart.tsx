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

interface BEChartProps {
    filterBy: string,
    dateRange: (Date | null)[],
    setTotalOrderQuantity: (total: number) => void,
    setTotalRevenue: (total: number) => void,
}

interface Product {
    _id: string;
    name: string;
    price: number;
    purchaseDate: Date;
    quantity: number;
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

// Function to generate a random date within a specified range
const randomDate = (start: Date, end: Date): Date => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateUniqueId = (): string => {
    // Generate a random alphanumeric string
    const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 24; i++) {
        id += alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length));
    }
    return id;
};

// Function to generate a random product
const generateRandomProduct = (): Product => {
    const productName = `Product ${Math.floor(Math.random() * 1000)}`;
    const price = Math.round(Math.random() * 30000000) + 100000;

    const quantity = Math.round(Math.random() * 15) + 10;
    const startDate = new Date('2020-01-01');
    const endDate = new Date(); // Current date
    endDate.setUTCHours(0, 0, 0, 0);
    const purchaseDate = randomDate(startDate, endDate);
    const _id = generateUniqueId();

    return {
        _id,
        name: productName,
        price,
        purchaseDate,
        quantity
    };
};

// Function to generate an array of random products
const generateProductData = async (numProducts: number) => {
    const products: Product[] = [];

    // const products: Product[] = [
    //     {
    //         _id: '1',
    //         name: 'Laptop',
    //         price: 999*24950,
    //         purchaseDate: new Date('2023-03-15'),
    //         quantity: 10
    //     },
    //     {
    //         _id: '2',
    //         name: 'Điện thoại thông minh',
    //         price: 699*24950,
    //         purchaseDate: new Date('2023-04-20'),
    //         quantity: 20
    //     },
    //     {
    //         _id: '3',
    //         name: 'Máy tính bảng',
    //         price: 399*24950,
    //         purchaseDate: new Date('2023-05-10'),
    //         quantity: 15
    //     },
    //     {
    //         _id: '4',
    //         name: 'Tai nghe',
    //         price: 149*24950,
    //         purchaseDate: new Date('2023-06-05'),
    //         quantity: 30
    //     },
    //     {
    //         _id: '5',
    //         name: 'Đồng hồ thông minh',
    //         price: 249*24950,
    //         purchaseDate: new Date('2023-07-12'),
    //         quantity: 25
    //     },
    //     {
    //         _id: '6',
    //         name: 'Loa Bluetooth',
    //         price: 129*24950,
    //         purchaseDate: new Date('2023-08-18'),
    //         quantity: 40
    //     },
    //     {
    //         _id: '7',
    //         name: 'Gaming Console',
    //         price: 499*24950,
    //         purchaseDate: new Date('2023-09-25'),
    //         quantity: 12
    //     },
    //     {
    //         _id: '8',
    //         name: 'Chuột không dây',
    //         price: 39*24950,
    //         purchaseDate: new Date('2023-10-30'),
    //         quantity: 50
    //     },
    //     {
    //         _id: '9',
    //         name: 'Đĩa cứng',
    //         price: 89*24950,
    //         purchaseDate: new Date('2023-11-08'),
    //         quantity: 18
    //     },
    //     {
    //         _id: '10',
    //         name: 'Card độ họa',
    //         price: 699*24950,
    //         purchaseDate: new Date('2023-12-14'),
    //         quantity: 8
    //     },
    //     {
    //         _id: '11',
    //         name: 'TV thông minh',
    //         price: 799*24950,
    //         purchaseDate: new Date('2024-01-20'),
    //         quantity: 15
    //     },
    //     {
    //         _id: '12',
    //         name: 'VR Headset',
    //         price: 299*24950,
    //         purchaseDate: new Date('2024-02-05'),
    //         quantity: 10
    //     },
    //     {
    //         _id: '13',
    //         name: 'Bàn phím không dây',
    //         price: 59*24950,
    //         purchaseDate: new Date('2024-03-08'),
    //         quantity: 20
    //     },
    //     {
    //         _id: '14',
    //         name: 'Drone',
    //         price: 399*24950,
    //         purchaseDate: new Date('2024-04-12'),
    //         quantity: 8
    //     },
    // ];

    for (let i = 0; i < numProducts; i++) {
        products.push(generateRandomProduct());
    }
    return products;
};

// Function to calculate total quantity of products purchased from a specific date until present
const getTotalQuantityFromSpecificDate = (products: Product[], specificDate: Date): number => {
    let totalQuantity = 0;

    //Set dateAfter
    let dateAfter = new Date(specificDate);
    specificDate.setHours(0, 0, 0, 0);
    dateAfter.setDate(dateAfter.getDate() + 1);
    dateAfter.setHours(0, 0, 0, 0);

    for (const product of products) {
        if (product.purchaseDate >= specificDate && product.purchaseDate < dateAfter) {
            totalQuantity += product.quantity;
        }
    }
    return totalQuantity;
};


const getDateAfterStep = (currentDate: Date, step: number, unitStep: string) => {
    let dateAfterStep = new Date(currentDate);

    unitStep === 'date' ?
        dateAfterStep.setDate(dateAfterStep.getDate() + 1) : unitStep === 'month' ?
            dateAfterStep.setMonth(dateAfterStep.getMonth() + Math.ceil(step / 29)) : unitStep === 'quarter' ?
                dateAfterStep.setMonth(dateAfterStep.getMonth() + Math.ceil(step / 29) * 3) :
                dateAfterStep.setFullYear(dateAfterStep.getFullYear() + Math.ceil(Math.ceil(step / 29) / 12));
    dateAfterStep.setHours(23, 59, 59, 59);

    return dateAfterStep;
}

// Function to generate an array of total quantities for each date within a range
const getTotalQuantitiesInRange = (products: Product[], startDate: Date, endDate: Date, filterBy: string): number[] => {
    const totalQuantities: number[] = [];
    startDate.setHours(0, 0, 0, 0);
    const totalDates = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)); // Calculate total number of days
    const maxItems = 12; // Maximum number of labels to display
    let step = Math.ceil(totalDates / maxItems); // Calculate step size (date)
    step = filterBy === 'date' ?
        step : filterBy === 'month' ?
            Math.ceil(step / 29) : filterBy === 'quarter' ?
                Math.ceil(step / 29) * 3 : Math.ceil(Math.ceil(step / 29) / 12);

    let currentDate = new Date(startDate);
    let logicEndDate = getDateAfterStep(endDate, step, filterBy);
    logicEndDate.setHours(0, 0, 0, 0);
    let dateAfterStep = getDateAfterStep(currentDate, step, filterBy);
    while (currentDate <= logicEndDate) {
        let totalQuantityPerStep = 0;
        //Interval between steps
        while (currentDate < dateAfterStep) {
            totalQuantityPerStep += getTotalQuantityFromSpecificDate(products, currentDate);
            currentDate.setDate(currentDate.getDate() + 1) // Move to the next date
        }
        totalQuantities.push(totalQuantityPerStep);
        currentDate = new Date(dateAfterStep);
        dateAfterStep = getDateAfterStep(dateAfterStep, step, filterBy); // Get the date after step
    }
    console.log("Total Quantities:", totalQuantities);
    return totalQuantities;
};

// Function to calculate total price of products purchased from a specific date until present
const getTotalPriceFromSpecificDate = (products: Product[], specificDate: Date): number => {
    let totalPrices = 0;
    specificDate.setHours(0, 0, 0, 0);
    let dateAfter = new Date(specificDate);
    dateAfter.setDate(dateAfter.getDate() + 1);
    dateAfter.setHours(0, 0, 0, 0);
    for (const product of products) {
        if (product.purchaseDate >= specificDate && product.purchaseDate < dateAfter) {
            totalPrices += product.price;
        }
    }
    return totalPrices;
};

// Function to generate an array of total prices for each date within a range
const getTotalPricesInRange = (products: Product[], startDate: Date, endDate: Date, filterBy: string): number[] => {
    const totalPrices: number[] = [];

    const totalDates = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)); // Calculate total number of days
    const maxItems = 12; // Maximum number of labels to display
    let step = Math.ceil(totalDates / maxItems); // Calculate step size (date)
    step = filterBy === 'date' ?
        step : filterBy === 'month' ?
            Math.ceil(step / 29) : filterBy === 'quarter' ?
                Math.ceil(step / 29) * 3 : Math.ceil(Math.ceil(step / 29) / 12);

    let currentDate = new Date(startDate);
    let logicEndDate = getDateAfterStep(endDate, step, filterBy);
    logicEndDate.setHours(0, 0, 0, 0);

    while (currentDate <= logicEndDate) {
        let totalPricePerStep = 0;
        let dateAfterStep = getDateAfterStep(currentDate, step, filterBy);

        //Interval between steps
        while (currentDate <= dateAfterStep) {
            totalPricePerStep += getTotalPriceFromSpecificDate(products, currentDate);
            currentDate.setDate(currentDate.getDate() + 1); // Move to the next date
        }
        totalPrices.push(totalPricePerStep);
        currentDate = new Date(dateAfterStep);
    }
    console.log("Total Prices:", totalPrices);
    return totalPrices;
};

function calculateTotals(array: number[]) {
    return array.reduce((total, current) => total + current, 0);
}


export function BEChart(props: BEChartProps) {
    // Generate 1000 random products
    const [products, setProducts] = useState<Product[]>([]);
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

    useEffect(() => {
        const fetchProducts = async () => {
            const productData = await generateProductData(1000);
            setProducts(productData);
        }
        fetchProducts();
    }, [])

    const quantityData = useMemo(() => {
        const result = getTotalQuantitiesInRange(products, dateFrom, dateTo, filterBy);
        props.setTotalOrderQuantity(calculateTotals(result));
        return result;
    }, [products, dateFrom, dateTo, filterBy]);
    const revenueData = useMemo(() => {
        const result = getTotalPricesInRange(products, dateFrom, dateTo, filterBy);
        props.setTotalRevenue(calculateTotals(result));
        return result;
    }, [products, dateFrom, dateTo, filterBy]);

    const data = useMemo(() => {
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
            },
            'y1': {
                type: 'linear' as const,
                display: true,
                position: 'right' as const,
                grid: {
                    drawOnChartArea: false,
                },
                tick:
                {
                    callback: function (value: string, index: any, values: any) {
                        return value + 'đ';
                    }
                },

            },

        },

        // Make the chart responsive
        maintainAspectRatio: false,
        responsive: true,
    };


    return (
        <div id="chart-container" className="w-[100%] h-[100%]">
            <Chart type='bar' data={data} options={options} />
        </div>
    );
}
