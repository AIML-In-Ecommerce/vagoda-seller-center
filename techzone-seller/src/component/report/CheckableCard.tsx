import { Card, Checkbox, CheckboxProps, ConfigProvider, Tooltip } from "antd";
import React, { useState } from "react";
import { TbInfoCircle } from "react-icons/tb";

interface CheckableCardProps {
    id: React.Key;
    item: any;
    checkboxVisibility?: boolean;
}

export default function CheckableCard(props: CheckableCardProps) {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const onChange: CheckboxProps['onChange'] = (e) => {
        setIsVisible(e.target.checked);
    }
    return (
        <React.Fragment>
            <div className="relative w-[95%]">
                <div className={`absolute z-10 top-0 h-2 w-full border rounded-t-xl ${!isVisible ? 'hidden' : ''} 
                bg-[${props.item.backgroundColor}]
                `} />
                <div key={props.id} className="relative p-5 bg-white border border-3 border-gray-300 shadow-lg rounded-lg">
                    <div className="flex flex-col">
                        {
                            props.checkboxVisibility === true ? (
                                <ConfigProvider theme={{ token: { colorPrimary: `${props.item.backgroundColor}` } }}>
                                    <Checkbox onChange={onChange}>
                                        {props.item.title}
                                    </Checkbox>
                                </ConfigProvider>
                            ) : <div className="ml-6">{props.item.title}</div>
                        }
                        <div className="mt-4 ml-6 font-semibold">{props.item.value}</div>
                        <div className="mt-3 ml-6 font-semibold">{props.item.description}</div>
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