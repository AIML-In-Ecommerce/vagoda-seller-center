import { Card, Empty, Image, Spin } from "antd";
import React, { useEffect, useState } from "react";

interface NotificationListProps {
    data: NotificationType[]
    loading?: boolean
}

interface NotificationCardProps {
    item: NotificationType
}

export type NotificationType = {
    // Type: 'info' | 'warning' | 'error' | 'success';
    // Severity: 'low' | 'medium' | 'high';
    // Action: 'created' | 'updated' | 'deleted' | 'error' | 'completed';
    // Source: 'system' | 'user' | 'server';
    // Status: 'pending' | 'in-progress' | 'resolved' | 'closed';
    // Category: 'account' | 'payment' | 'security' | 'inventory';
    // Event: 'login' | 'purchase' | 'subscription';
    // Priority: 'low' | 'medium' | 'high' | 'urgent';
    // Target: 'user' | 'customer' | 'admin' | 'group';
    _id: string;
    image?: string;
    title: string;
    description: string;
    timestamp: Date;
};

const { Meta } = Card

export function NotificationCard(props: NotificationCardProps) {
    return (
        <React.Fragment>
            <Card size="small">
                <Meta title={<div className="cursor-pointer hover:text-blue-500">{props.item.title}</div>}
                    description=
                    {
                        <div className="flex flex-col">
                            <div className="cursor-pointer hover:text-blue-500">{props.item.description}</div>
                            <div className="capitalize text-xs mt-2">
                                {props.item.timestamp.toLocaleDateString('vi-VN', {
                                    weekday: 'short',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    second: 'numeric'
                                })}</div>
                        </div>
                    }
                    avatar={<Image src={props.item.image} width={60} preview={false} />} />
            </Card>
        </React.Fragment>
    )
}

export default function NotificationList(props: NotificationListProps) {

    const onLoadingDisplay = 
            new Array(2).fill(null).map((value, index) =>
                <div key={index} className="w-full flex justify-center items-center">
                    <Spin size="default" />
                </div>
            )

    const [mainDisplay, setMainDisplay] = useState<JSX.Element | JSX.Element[]>(onLoadingDisplay)

    useEffect(() =>
    {
        if(props)
        {
            const newDisplay = props.data.length > 0 ?
            (
                props.data.map((item, key) => {
                    return (
                    <div key={key}>
                        <NotificationCard item={item} />
                    </div>)
                })
            ) : <Empty description={"Không có thông báo mới!"} />

            setMainDisplay(newDisplay)
        }

    }, [props])

    return (
        <React.Fragment>
            <div className="flex flex-col">
                {
                    mainDisplay
                }
            </div>
        </React.Fragment>
    )
}