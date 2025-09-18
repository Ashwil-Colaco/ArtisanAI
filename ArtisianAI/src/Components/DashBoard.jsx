import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const Dashboard = () => {
    const artisanData = [
        { artisanName: "Armaan", productName: "Product A1", productValue: 1000, sales: [30, 45, 60, 50, 40, 70] },
        { artisanName: "Carl", productName: "Product B1", productValue: 2000, sales: [60, 50, 45, 80, 90, 100] },
        { artisanName: "Ashwil", productName: "Product C1", productValue: 1500, sales: [40, 60, 55, 40, 45, 65] },
        { artisanName: "Yashwanth", productName: "Product D1", productValue: 1800, sales: [50, 55, 70, 65, 80, 75] },
        { artisanName: "Bhuvan", productName: "Product E1", productValue: 2200, sales: [80, 60, 90, 100, 95, 85] },
        { artisanName: "Ramesh", productName: "Product F1", productValue: 1700, sales: [30, 40, 60, 75, 70, 85] },
        { artisanName: "Yashwanth", productName: "Product G1", productValue: 2000, sales: [40, 60, 70, 50, 60, 85] },
        { artisanName: "Suresh", productName: "Product H1", productValue: 2500, sales: [90, 100, 120, 110, 105, 95] },
        { artisanName: "Ram", productName: "Product I1", productValue: 1600, sales: [50, 60, 80, 70, 75, 85] },
        { artisanName: "Shyam", productName: "Product J1", productValue: 2100, sales: [80, 90, 85, 100, 95, 110] },
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
        chart: { id: "Sales Chart" },
        xaxis: { categories: ["2020", "2021", "2022", "2023", "2024", "2025"] },
        yaxis: { title: { text: "Units Sold over the years" } },
    };

    const chartData = {
        series: [{ name: currentData.artisanName, data: currentData.sales }],
    };

    return (
        <div style={{ backgroundColor: "rgb(15,23,42)", minHeight: "100vh", color: "white", padding: "0px",width:"1600px" }}>
            <header>DASHBOARD</header>
            <div style={{display:"flex",flexDirection:"row",marginTop:"200px"}}>
                <div style={{fontFamily:"sans-serif",backgroundColor:"rgb(71 85 105)" ,width:"300px", borderRadius:"20px",marginLeft:"10px",filter:"drop-shadow(2px 2px 2px white)"}}>
            
                <h3 style={{paddingTop:"1px",paddingLeft:"5px"}}>{currentData.artisanName}</h3>
                <h4 style={{paddingLeft:"5px"}}>{currentData.productName} - ${currentData.productValue}</h4>
                <div className="chart-container" style={{backgroundColor:"rgb(148 163 184)" ,width:"300px"}}>
                <h3>Sales Over Time</h3>
                <Chart options={chartOptions} series={chartData.series} type="line" height={200} width={300} />
                </div>
                </div>
                <div>

                </div>
            </div>
            
        </div>
    );
};

export default Dashboard;