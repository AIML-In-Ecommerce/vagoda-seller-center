"use client";
import { Card, Statistic, Tooltip } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { TbInfoCircle } from "react-icons/tb";


export enum TaskType {
    INFO,
    WARNING,
    DANGER,
}

export type Task = {
    title: string,
    tooltip: string,
    value: number,
    warning_text?: string,
    type: TaskType
    urlRedirect: string
}

interface TaskCardProps {
    item: Task;
}

interface TodoTasksProps {
    data: Task[]
}

const handleCardColor = (type: TaskType) => {
    return (type === TaskType.INFO ? "bg-blue-500" :
        type === TaskType.WARNING ? "bg-amber-500" : "bg-red-500");

}

export function TaskCard(props: TaskCardProps) {
    const router = useRouter();
    return (
        <React.Fragment>
            <div className="relative">
                <Link href={props.item.urlRedirect}>
                    <div className={`absolute z-10 top-0 h-2 w-full border rounded-xl ${handleCardColor(props.item.type)}`}></div>
                    <Statistic className="relative z-0 h-32 shadow-md p-2"
                        title={<div className="text-base w-2/3 text-ellipsis overflow-hidden">{props.item.title}</div>}
                        value={props.item.value}
                        valueStyle={{fontSize: "30px"}}>
                    </Statistic>
                    <div className="absolute top-3 right-2 text-lg">
                        <Tooltip title={props.item.tooltip}>
                            <TbInfoCircle />
                        </Tooltip>
                    </div>
                </Link>
            </div>
        </React.Fragment>
    );
}

export default function TodoTasks(props: TodoTasksProps) {
    const [data, setData] = useState<Task[]>(props.data);
    
    useEffect(() => {
        setData(props.data);
    }, [props.data])

    return (
        <React.Fragment>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
                {
                    data?.map((item, index) => {
                        return (
                            <div key={index} className="col-span-1">
                                <TaskCard item={item} />
                            </div>
                        );
                    })
                }
            </div>
        </React.Fragment>
    );
}