import { Button, Input } from 'antd'
import React, { useState } from 'react'
import ProductTableTransfer from './ProductTableTransfer';

interface SelectManualTabProps {
    targetProducts: any[];
    setTargetProducts: (products: any[]) => void;
}

export default function SelectManualTab(props: SelectManualTabProps) {
    const [currentKeyword, setCurrentKeyword] = useState<string>("");

    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-2 gap-5 mb-5">
                <div className="flex flex-col gap-2">
                    <div>Sản phẩm</div>
                    <Input size="large"
                        onChange={(e) => setCurrentKeyword(e.target.value)}
                        placeholder="Điền tên sản phẩm hoặc SKU"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <div>&nbsp;</div>
                    <div className="flex flex-row gap-2">
                        <Button size="large" onClick={() => {}}>Tìm kiếm</Button>
                        <Button size="large" onClick={() => {}}>Làm mới</Button>
                    </div>
                </div>
            </div>
            <ProductTableTransfer currentKeyword={currentKeyword}
                targetProducts={props.targetProducts}
                setTargetProducts={props.setTargetProducts}/>

        </div>
    )
}
