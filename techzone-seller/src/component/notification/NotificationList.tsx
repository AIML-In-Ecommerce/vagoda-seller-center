import { Card, Empty, Image } from "antd";
import React from "react";

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
                <Meta title={<a>{props.item.title}</a>}
                    description=
                    {
                        <div className="flex flex-col">
                            <a>{props.item.description}</a>
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
    return (
        <React.Fragment>
            <div className="flex flex-col">
                {
                    props.data.length > 0 ?
                        (
                            props.data.map(item => {
                                return <NotificationCard item={item} />
                            })
                        ) : <Empty description={"Không có thông báo mới!"} />
                }
            </div>
        </React.Fragment>
    )
}