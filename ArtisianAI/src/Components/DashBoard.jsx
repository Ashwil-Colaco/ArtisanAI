import React from "react";
import Chart from "react-apexcharts";


const Dashboard = () => {
    // 10 sets of Artisan Data
    const artisanData = [
        {
            artisanName: "Armaan",
            productName: "Product A1",
            productValue: 1000,
            sales: [30, 45, 60, 50, 40, 70], // Sales for each month
        },
        {
            artisanName: "Artisan B",
            productName: "Product B1",
            productValue: 2000,
            sales: [60, 50, 45, 80, 90, 100],
        },
        {
            artisanName: "Artisan C",
            productName: "Product C1",
            productValue: 1500,
            sales: [40, 60, 55, 40, 45, 65],
        },
        {
            artisanName: "Artisan D",
            productName: "Product D1",
            productValue: 1800,
            sales: [50, 55, 70, 65, 80, 75],
        },
        // Add 6 more sets of data...
        {
            artisanName: "Artisan E",
            productName: "Product E1",
            productValue: 2200,
            sales: [80, 60, 90, 100, 95, 85],
        },
        {
            artisanName: "Artisan F",
            productName: "Product F1",
            productValue: 1700,
            sales: [30, 40, 60, 75, 70, 85],
        },
        {
            artisanName: "Artisan G",
            productName: "Product G1",
            productValue: 2000,
            sales: [40, 60, 70, 50, 60, 85],
        },
        {
            artisanName: "Artisan H",
            productName: "Product H1",
            productValue: 2500,
            sales: [90, 100, 120, 110, 105, 95],
        },
        {
            artisanName: "Artisan I",
            productName: "Product I1",
            productValue: 1600,
            sales: [50, 60, 80, 70, 75, 85],
        },
        {
            artisanName: "Artisan J",
            productName: "Product J1",
            productValue: 2100,
            sales: [80, 90, 85, 100, 95, 110],
        },
    ];

    const [currentDataIndex, setCurrentDataIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDataIndex((prevIndex) => (prevIndex + 1) % artisanData.length);
        }, 10000);
        return () => clearInterval(interval);
    }, []);
    const currentData = artisanData[currentDataIndex];

    const chartOptions = {
        chart: {
            id: "Sales Chart",
        },
        xaxis: {
            categories: ["2020", "2021", "2022", "2023", "2024", "2025"],
        },
        yaxis: {
            title: {
                text: "Units Sold over the years",
            },
        },
    };
    const chartData = {
        series: [
            {
                name: currentData.artisanName,
                data: currentData.sales,
            },
        ],
    };
    return (
        <>
            <div>
                <h2>Artisan Sales Board</h2>
                <h3>{currentData.artisanName}</h3>
                <h4>{currentData.productName} - ${currentData.productValue}</h4>
                <div className="chart-container">
                    <h3>Sales Over Time</h3>
                    <Chart options={chartOptions} series={chartData.series} type="line" height={350} />
                </div>
            </div>
        </>
    );
};
export default Dashboard;