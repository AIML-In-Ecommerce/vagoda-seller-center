import { Card, Checkbox, CheckboxProps, ConfigProvider, Tooltip } from "antd";
import React, { useState } from "react";
import { TbInfoCircle } from "react-icons/tb";

interface CheckableCardProps {
    item: any;
    checkboxVisibility?: boolean;
    borderVisibility?: boolean;
}

export default function CheckableCard(props: CheckableCardProps) {
    const [isVisible, setIsVisible] = useState<boolean>(props.borderVisibility || false);
    const onChange: CheckboxProps['onChange'] = (e) => {
        setIsVisible(e.target.checked);
    }
    return (
        <React.Fragment>
            <div className="relative w-[95%]">
                <div className={`absolute z-10 top-0 h-2 w-full border rounded-t-xl ${!isVisible ? 'hidden' : ''} 
                bg-[${props.item.backgroundColor}]
                `} />
                <div className={`relative p-5 bg-white border-2 ${!isVisible ? 'border-gray-300' : `border-[${props.item.backgroundColor}]`} shadow-lg rounded-lg`}>
                    <div className="flex flex-col select-none">
                        {
                            props.checkboxVisibility === true ? (
                                <ConfigProvider theme={{ token: { colorPrimary: `${props.item.backgroundColor}` } }}>
                                    <Checkbox onChange={onChange}>
                                        <div className="truncate">{props.item.title}</div>
                                    </Checkbox>
                                </ConfigProvider>
                            ) : <div className="lg:ml-6 ml-0 truncate">{props.item.title}</div>
                        }
                        <div className="mt-4 lg:ml-6 ml-0 font-semibold">{props.item.value}</div>
                        <div className="mt-3 lg:ml-6 ml-0 font-semibold">{props.item.description}</div>
                        <div className="absolute wrap top-3 right-2 text-lg">
                            <Tooltip title={props.item.tooltip}>
                                <TbInfoCircle />
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}