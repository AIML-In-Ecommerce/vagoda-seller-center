import { Divider, Modal, Tabs, TabsProps } from 'antd';
import React from 'react'
import SelectManualTab from './tab/SelectManualTab';
import UploadProductListTab from './tab/UploadProductListTab';

interface ProductListModalProps {
    targetProducts: any[];
    setTargetProducts: (products: any[]) => void;
    open: boolean;
    onCancel: () => void;
}

export default function ProductListModal(props: ProductListModalProps) {
    const tab_items: TabsProps['items'] = [
        {
            key: 'select_manual',
            label: "Chọn",
            children: <SelectManualTab 
                targetProducts={props.targetProducts}
                setTargetProducts={props.setTargetProducts}/>
        },
        {
            key: 'select_from_file',
            label: "Tải lên danh sách sản phẩm",
            children: <UploadProductListTab/>
        },
    ]
    
    return (
        <React.Fragment>
            <Modal
                style={{ top: 10 }}
                centered
                open={props.open}
                width={1280}
                onCancel={() => {
                    props.onCancel();
                }}
                footer={null}>
                <div className="flex flex-col">
                    <div className="font-semibold text-lg">Chọn sản phẩm</div>
                    <Divider></Divider>
                    <Tabs defaultActiveKey="select_manual" items={tab_items}/>
                </div>
            </Modal>
        </React.Fragment >
    )
}
