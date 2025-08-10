import React from "react";
import herosection3 from "../assets/herosection3.png";
import { motion } from "framer-motion";

const image = [
  "https://tse1.mm.bing.net/th/id/OIP.V-iUPXL7-oSOAvR2dtdWiQHaHa?pid=Api&P=0&h=180",
  "https://tse3.mm.bing.net/th/id/OIP.fq_LK5hSwoQjXOyaIrScuQHaHa?pid=Api&P=0&h=180",
  "https://tse3.mm.bing.net/th/id/OIP.YDyoIafIwW1tILED3HgZRQHaHa?pid=Api&P=0&h=180",
  "https://tse2.mm.bing.net/th/id/OIP.6Z9IzwzFC4Xz0efJrZa7CgHaHa?pid=Api&P=0&h=180",
]

const Herosection = () => {


  return (
    <div className="relative lg:h-[calc(100vh-4rem)]  min-h-[calc(100vh-4rem)] overflow-hidden max-sm:px-5 px-16 py-10">
      {/* Background line (SVG) */}
      <svg
        className="absolute inset-0 z-10 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Desktop / tablet elbow path */}
        <path
          className=""
          d="M0,60 H55 L70,45 H100" // moved from 70→60 and 55→45
          fill="none"
          stroke="#E5E7EB" // solid Tailwind gray-200
          //  stroke="#D1D5DB" // solid Tailwind gray-300
          strokeWidth="20"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
        />
      </svg>

      {/* Hero image on the right */}
      <div className="absolute max-sm:hidden z-20 bottom-0 right-10 w-[350px] sm:w-[380px] md:w-[380px] lg:w-[520px]">
        <img src={herosection3} alt="" className="object-cover w-full h-full" />
      </div>

      <div className="absolute max-sm:hidden top-10 right-10 md:top-1/4 md:left-1/2 z-30 flex w-fit items-center gap-2 backdrop-blur-3xl p-3 rounded-lg border-[1px] border-gray-200">
        <span className="w-2 h-2  rounded-full bg-red-500"></span>
        <p className="font-inconsolata text-sm">Build JSON, share in seconds</p>
      </div>

      <div className="p-10 z-30 ml-6 mb-10 md:ml-16 relative ">
        <motion.div
          className="absolute top-16 -left-1 pointer-events-none text-lg rounded-full text-center nunito-600 pt-[2px] text-gray-400 w-8 h-8 bg-gray-100"
          animate={{ rotate: [0, 40, 0] }}
          transition={{
            repeat: Infinity,
            duration: 0.9,
            ease: "easeInOut",
            times: [0, 0.333, 0.666, 1],
          }}
        >
          19
        </motion.div>

        <p className="text-xs text-gray-400 mb-4 font-inconsolata font-medium tracking-wider uppercase">Futuristic</p>
        <p className="text-5xl nunito-400 mb-4 z-30 tracking-normal uppercase">Imagine. <span className="text-slate-800">Create.</span></p>
        <p className="text-5xl nunito-400 tracking-normal uppercase">Transcend</p>
        <div className="flex items-center mt-5 gap-5">
          <button onClick={() => { console.log("get started") }} className="bg-slate-800 text-white font-nunito text-sm px-3 py-2 cursor-pointer hover:bg-slate-600 rounded-md ">Get Started</button>
          <button onClick={() => { console.log("view documentation") }} className=" text-gray-600 font-nunito text-md hover:border-b-2 hover:border-gray-600 ml-4 pt-1 transition duration-200 cursor-pointer">Documentation</button>
        </div>
      </div>

          {/* this section i am talking about */}
      <section className="relative flex mt-24 p-10 z-30 ml-0 mb-10 md:ml-16 flex-col lg:flex-row-reverse justify-between w-4xl ">
        <div className=" flex gap-5 backdrop-blur-2xl w-fit max-lg:mb-5 items-start">
        {/* <div className="absolute z-30 top-3/4 right-10  md:right-1/3 flex gap-5 items-start"> */}
          <motion.div animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 2, // speed in seconds
              ease: "linear", // smooth continuous spin
            }} className="border-[3px] border-gray-300 w-14 h-14 rounded-full flex items-center justify-center">
            <i className="fi fi-sr-circle-nodes mt-1 text-gray-500"></i>
          </motion.div>
          <p className="text-sm w-72 lg:w-64 bg-blend-overlay text-slate-900  nunito-600 md:text-gray-400 mb-3 sm:nunito-400 ">In this AI-powered future, forget boring <span className="text-gray-500 nunito-600">JSON</span> spin up custom data and a shareable link in seconds. Fast, smart, effortless.</p>
        </div>

        {/* <section className="absolute z-30 top-3/4 left-32 -mt-5 md:right-1/3 flex flex-col"> */}
        <section className="flex flex-col ">
          <h1 className="nunito-600 text-sm text-gray-400 mb-4">Trusted by many users</h1>
          <div className="relative flex">
            {image?.map((img, index) => (
              <div
                key={index}
                className="w-16 h-16 rounded-full overflow-hidden border-4 border-gray-300 absolute"
                style={{ left: `${index * 2.5}rem` }} // Adjust 2.5rem for overlap spacing
              >
                <img
                  src={img}
                  alt={`Hero section ${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}

            <div className="absolute left-48 top-5 font-inconsolata">
              +{image.length + 4} more
            </div>
          </div>
        </section>
      </section>

    </div>
  );
};

export default Herosection;