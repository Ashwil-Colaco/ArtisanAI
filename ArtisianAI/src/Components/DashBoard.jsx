import React, { useEffect, useState, useRef } from "react";
import Chart from "react-apexcharts";
import "./DashBoard.css";
import Header from "./Header";
import video from "../assets/videoplayback.mp4";

const Dashboard = () => {
  const artisanData = [
    {
      artisanName: "Armaan",
      productName: "Pottery",
      productValue: 1000,
      sales: [30, 45, 60, 50, 40, 70],
      revenueYearp: 125000,
      revenueYeart: 150000, 
    },
    {
      artisanName: "Carl",
      productName: "Architecture",
      productValue: 2000,
      sales: [60, 50, 45, 80, 90, 100],
      revenueYearp: 85000,
      revenueYeart: 100000, 
    },
    {
      artisanName: "Ashwil",
      productName: "Weaving",
      productValue: 1500,
      sales: [40, 60, 55, 40, 45, 65],
      revenueYearp: 15000,
      revenueYeart: 30000, 
    },
    {
      artisanName: "Yashwanth",
      productName: "Jute Products",
      productValue: 1800,
      sales: [50, 55, 70, 65, 80, 75],
      revenueYearp: 90000,
      revenueYeart: 110000, 
    },
    {
      artisanName: "Bhuvan",
      productName: "Wooden Items",
      productValue: 2200,
      sales: [80, 60, 90, 100, 95, 85],
      revenueYearp: 88000,
      revenueYeart: 100000, 
    },
    {
      artisanName: "Ramesh",
      productName: "Eatables",
      productValue: 1700,
      sales: [30, 40, 60, 75, 70, 85],
      revenueYearp: 85000,
      revenueYeart: 102000, 
    },
    {
      artisanName: "Yashwanth",
      productName: "Beverages",
      productValue: 2000,
      sales: [40, 60, 70, 50, 60, 85],
      revenueYearp: 124000,
      revenueYeart: 150000, 
    },
    {
      artisanName: "Suresh",
      productName: "Clothes",
      productValue: 2500,
      sales: [90, 100, 120, 110, 105, 95],
      revenueYearp: 125000,
      revenueYeart: 150000, 
    },
    {
      artisanName: "Ram",
      productName: "Ethnic Paintings",
      productValue: 1600,
      sales: [50, 60, 80, 70, 75, 85],
      revenueYearp: 108000,
      revenueYeart: 122600, 
    },
    {
      artisanName: "Shyam",
      productName: "Mosaic Art",
      productValue: 2100,
      sales: [80, 90, 85, 100, 95, 110],
      revenueYearp: 125000,
      revenueYeart: 150000, 
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
    chart: { id: "Sales Chart" },
    xaxis: {
      categories: ["2020", "2021", "2022", "2023", "2024", "2025"],
      title: { text: "Sales over the years" },
    },
    yaxis: { title: { text: "Units Sold over the years" } },
    fill:{
      type:"gradient",
      gradient:{
        shade:"light",
        type:"vertical",
        shadeIntensity: 0.5,         
      gradientToColors: ["limegreen"], // end color of gradient
      inverseColors: false,
      opacityFrom: 0.9,
      opacityTo: 0.3,
      stops: [0, 90, 100], 
      },
    },
    colors: ["yellow"], // optional: blue bars
  };

  const chartData = {
    series: [{ name: currentData.artisanName, data: currentData.sales }],
  };

  const productNames = artisanData.map((item) => item.productName);
  const productValues = artisanData.map((item) => item.productValue);

  const revOptions = {
    chart: { id: "Revenue Chart" },
    responsive:[{
       breakpoint: 480,
      options: {
        chart: { width: "80%" },
        legend: { position: "bottom" },
    },}],
    xaxis: {
      categories: productNames,
      title: { text: "Products" },
      labels: { rotate: -45,
        style:{
          colors:'#ffffff',
          fontWeight: 600,
        }
       }, // tilt labels for better readability
    },
    yaxis: {
      title: { text: "Product Value ($)" },
      labels:{
        style:{
          colors:'#ffffff'
        }
      }
    },
    plotOptions: {
      bar: { borderRadius: 4, horizontal: false }, // rounded bars
    },
    fill:{
      type:"gradient",
      gradient:{
        shade:"light",
        type:"vertical",
        shadeIntensity: 0.5,         
      gradientToColors: ["#33ffcc"], // end color of gradient
      inverseColors: false,
      opacityFrom: 0.9,
      opacityTo: 0.3,
      stops: [0, 90, 100], 
      },
    },
    colors: ["#008ffb"], // optional: blue bars
  };

  const revSeries = [
    {
      name: "Product Value",
      data: productValues,
    },
  ];

  const [index, setIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [widIndex,setWidIndex] = useState(0);

  const width = [
    "w-1/2",
    "w-2/3",
    "w-6/10",
    "w-7/10",
    "w-6/9",
    "w-4/5",
    "w-6/7",
    "w-5/8",
    "w-6/8",
    "w-5/9",
  ];
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-orange-500",
    "bg-white",
    "bg-slate-200",
  ];

  useEffect(()=>{
    const interval = setInterval(()=> {
      setIndex((prev)=>(prev+1)% artisanData.length);
      setColorIndex((prev)=>(prev+1)% colors.length);
      setWidIndex((prev)=>(prev+1)% width.length);},10000);
    return () => clearInterval(interval);
  },[artisanData.length, colors.length, width.length]);

  const artisan = artisanData[index];

  // Video Upload State and Logic
  const [videoFile, setVideoFile] = useState(null);
  const fileInputRef = useRef(null);
  
  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setVideoFile(videoUrl);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const videoRef = useRef(null);
  const handleVideoEnd = () => {
    videoRef.current.currentTime = 0; 
    videoRef.current.play();
  }

  return (
    
    <div>
      
      <video
        ref={videoRef}
        src={video}
        autoPlay
        loop={false}
        muted
        controlslist="nodownload nofullscreen noremoteplayback"
        disablepictureinpictures
        onEnded={handleVideoEnd}
        className="absolute top-15 left-0 w-full h-5/4 max-sm:h-9/4 max-sm:w-5/4 object-cover transition-opacity duration-1000 ease-in-out"
      />
      <Header/>
      <div className="text-white">
        <div className="flex flex-row mt-0 -ml-20 max-sm:flex-col">
          <div className="bg-slate-800 w-2/9 ml-60 h-20 rounded-2xl drop-shadow-2xl hover:scale-105 hover:transition-all hover:linear hover:duration-700 b a flex items-center justify-center">
            <span className="text-gray-300 font-semibold">No data to be displayed</span>
          </div>
          <div className="bg-slate-800 w-2/9 ml-5 h-20 rounded-2xl drop-shadow-2xl hover:scale-105 hover:transition-all hover:ease-in-out hover:duration-700 a flex items-center justify-center">
            <span className="text-gray-300 font-semibold">No data to be displayed</span>
          </div>
          <div className="bg-slate-800 w-2/9 ml-5 h-20 rounded-2xl drop-shadow-2xl hover:scale-105 hover:transition-all hover:ease-in-out hover:duration-700 a flex items-center justify-center">
            <span className="text-gray-300 font-semibold">No data to be displayed</span>
          </div>
        </div>
        <div className="flex flex-row mt-5 -ml-20 max-sm:flex-col">
          <div className="bg-slate-800 w-3/11 rounded-2xl py-2 drop-shadow-xl/20 ml-60 hover:scale-105 hover:transition-all hover:ease-in-out hover:duration-700 b c flex items-center justify-center h-60">
            <span className="text-gray-300 font-semibold">No data to be displayed</span>
          </div>
          <div className="bg-slate-800 w-6/13 rounded-2xl drop-shadow-xl/20 ml-5 hover:scale-105 hover:transition-all hover:ease-in-out hover:duration-700 d flex items-center justify-center h-60">
           <span className="text-gray-300 font-semibold">No data to be displayed</span>
          </div>
        </div>
        
        {/* New section for video upload and display */}
        <div className="flex flex-row mt-5">
          <div className="bg-slate-800 w-4/9 rounded-2xl py-2 drop-shadow-xl/20 ml-40 hover:scale-102 hover:transition-all hover:ease-in-out hover:duration-700 b e">
          {!videoFile && (
            <>
            <h3 className="px-5 font-extrabold">Upload and Display a Video</h3>
            <div className="px-5 py-3">
              {/* The hidden file input */}
              <input 
                type="file" 
                accept="video/*" 
                onChange={handleVideoUpload}
                ref={fileInputRef}
                style={{ display: 'none' }}
              />
              {/* The styled button that triggers the input */}
              <button
                onClick={handleButtonClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Upload Video
              </button>
              <div className="bg-slate-700 text-gray-200 font-medium py-2 px-4 rounded-lg mt-2">
                &#x231b; Nothing to show for these dates
              </div>
            </div>
            </>
            )}
            {/* Conditionally render the video player if a file is uploaded */}
            {videoFile && (
              <div className="px-5 py-3">
                <video 
                  src={videoFile} 
                  controls 
                  width="100%" 
                  height="auto"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
