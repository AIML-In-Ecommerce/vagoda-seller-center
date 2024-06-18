"use client";
import React from "react";
import { FaCaretDown } from "react-icons/fa";

interface RatingChartProps {
    score: number;
}

export default function RatingChart(props: RatingChartProps) {

    const handleCheckpointColor = (score: number) => {
        let textColor = "";
        switch (score) {
            case 0:
                textColor = 'text-slate-500';
                break;
            case 1:
                textColor = 'text-red-500';
                break;
            case 2:
                textColor = 'text-orange-500';
                break;
            case 3:
                textColor = 'text-amber-500';
                break;
            case 4:
                textColor = 'text-yellow-500';
                break;
            case 5:
                textColor = 'text-green-500';
                break;
        }
        return textColor;
    }

    const pointerRender = (score: number) => {
        const scoreCheckpoint = Math.floor(score);
        switch (scoreCheckpoint) {
            case 0:
                return (
                    <div className={`col-start-1 col-span-1 justify-self-center mb-1`}>
                        <div className="text-slate-500 animate-bounce"><FaCaretDown /></div>
                    </div>
                )
            case 1:
                return (
                    <div className={`col-start-2 col-span-1 justify-self-center mb-1`}>
                        <div className="text-red-500 animate-bounce"><FaCaretDown /></div>
                    </div>
                )
            case 2:
                return (
                    <div className={`col-start-3 col-span-1 justify-self-center mb-1`}>
                        <div className="text-orange-500 animate-bounce"><FaCaretDown /></div>
                    </div>
                )

            case 3:
                return (
                    <div className={`col-start-4 col-span-1 justify-self-center mb-1`}>
                        <div className="text-amber-500 animate-bounce"><FaCaretDown /></div>
                    </div>
                )

            case 4:
                return (
                    <div className={`col-start-5 col-span-1 justify-self-center mb-1`}>
                        <div className="text-yellow-500 animate-bounce"><FaCaretDown /></div>
                    </div>
                )
            case 5:
                return (
                    <div className={`col-start-6 col-span-1 justify-self-center mb-1`}>
                        <div className="text-green-500 animate-bounce"><FaCaretDown /></div>
                    </div>
                )
            default:
                return <></>;
        }
    }

    const checkpointRender = (score: number) => {
        const scoreCheckpoint = Math.floor(score);
        const items = [];

        for (let i = 0; i <= 5; i++) {
            items.push(
                <div key={i} className={`col-start-${i + 1} col-span-1 text-center 
                    ${i === scoreCheckpoint ? handleCheckpointColor(scoreCheckpoint) : "text-slate-500"}
                    ${i === scoreCheckpoint ? "font-semibold text-xl" : ""}`}>
                    {i}
                </div>
            )
        }
        return (
            <div className="grid grid-cols-6 gap-1">
                {items}
            </div>
        )
    }

    return (
        <React.Fragment>
            <div className="flex flex-col">
                {/* score label */}
                <div className="font-semibold">
                    <span className={`font-bold text-2xl ${handleCheckpointColor(Math.floor(props.score))}`}>{props.score}</span><span className="text-lg text-slate-400"> / 5</span></div>
                {/* chart */}
                <div className="flex flex-col">
                    <div className="grid grid-cols-6 gap-1 justify-items-stretch">
                        {
                            pointerRender(props.score)
                        }
                    </div>
                    <div className="grid grid-cols-6 gap-1">
                        <div className="col-start-1 col-span-1  h-2 rounded-l-xl bg-slate-500"></div>
                        <div className="col-start-2 col-span-1  h-2 bg-red-500"></div>
                        <div className="col-start-3 col-span-1  h-2 bg-orange-500"></div>
                        <div className="col-start-4 col-span-1  h-2 bg-amber-500"></div>
                        <div className="col-start-5 col-span-1  h-2 bg-yellow-500"></div>
                        <div className="col-start-6 col-span-1  h-2 rounded-r-xl bg-green-500"></div>
                    </div>
                    {
                        checkpointRender(props.score)
                    }

                    {/* slider for testing purposes */}
                    {/* <Slider value={score} step={0.1} onChange={(e) => setScore(e)} min={0} max={5}></Slider> */}
                </div>


            </div>
        </React.Fragment>
    )
}