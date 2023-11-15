"use client"
import React, { useEffect } from 'react'

const AnimatedCounter = ({ targetNumber }: { targetNumber: number}) => {
    useEffect(() => {
        const startCounter = () => {
            const counter = document.querySelector(".animate-counter");
            if (counter) {
                counter.setAttribute("data-num", targetNumber.toString());
                counter.animate([{ "--num": 0 }, { "--num": targetNumber }], {
                    duration: 1000,
                    easing: "ease-out",
                    fill: "forwards",
                });
            }
        };

        startCounter();
    }, [targetNumber]);


    return (
        <div className="p-4 bg-gray-100 dark:bg-gray-900 flex flex-col justify-center items-center overflow-hidden">
            <span className="flex tabular-nums text-slate-900 dark:text-white text-5xl font-extrabold mb-2 animate-counter">
                <span className="">500</span>+
            </span>
        </div>
    );
};

export default AnimatedCounter