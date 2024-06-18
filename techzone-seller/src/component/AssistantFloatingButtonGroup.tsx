'use client'

import { FloatButton } from "antd";
import AIAssistantFloatButton from "./assistant/AIAssistantFloatButton";


interface AssistantFloatingButtonGroupProps
{

}

export default function AssistantFloatingButtonGroup({}: AssistantFloatingButtonGroupProps)
{


    return(
        <>
            <FloatButton.Group shape="square" type="primary">
                <AIAssistantFloatButton />
            </FloatButton.Group>
        </>
    )
}