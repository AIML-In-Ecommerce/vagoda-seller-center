import { Card, Tooltip } from "antd";
import React from "react";
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
    return (
        <React.Fragment>
            <div className="relative">
                <div className={`absolute z-10 top-0 h-2 w-full border rounded-xl ${handleCardColor(props.item.type)}`}></div>
                <Card className="relative z-0 h-32 shadow-md" hoverable>
                    <div className="absolute wrap w-2/3 top-1/6 lg:top-3 text-lg">{props.item.title}</div>
                    <div className="absolute wrap bottom-3 text-2xl font-bold">{props.item.value}</div>
                    <div className="absolute wrap top-3 right-2 text-lg">
                        <Tooltip title={props.item.tooltip}>
                            <TbInfoCircle />
                        </Tooltip>
                    </div>
                </Card>
            </div>
        </React.Fragment>
    );
}

export default function TodoTasks(props: TodoTasksProps) {
    return (
        <React.Fragment>
            <div className="grid lg:grid-cols-4 gap-5">
                {
                    props.data.map((item, index) => {
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