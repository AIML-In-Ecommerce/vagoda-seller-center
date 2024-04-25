'use client'

import { Button, Card, Flex, Image, Modal, Popover, Tag, Tooltip, Typography } from "antd"
import TextArea from "antd/es/input/TextArea"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { BiRefresh, BiSupport } from "react-icons/bi"
import { IoCloseOutline, IoExpandOutline, IoTrashBinOutline } from "react-icons/io5"
import { LuSendHorizonal, LuShrink } from "react-icons/lu"

import { BsChatDots } from "react-icons/bs"
import InfinitePromotionList, { InfinitePromotionListProps } from "../utils/InfinitePromotionList"
import InfiniteProductsList, { InfiniteScrollProductsProps } from "../utils/InfiniteProductsList"
import styled from "styled-components"
import '@/custom_css/AntdFullscreenModal.css'

interface AIAssistantFloatButtonProps {

}

const ExtendedAssistantModalStyle = styled(Modal)`
    .ant-modal .ant-modal-content {
        height: 100% !important;
    }
    .ant-modal-body {
        height: calc(100% - 40px) !important;
    }
`

enum AssistantMessageTypes {
    User,
    Assistant
}

interface AssistantMessageProps {
    type: AssistantMessageTypes,
    content: string,
    actionCode: string | null
}

const GreetingMessage: AssistantMessageProps =
{
    type: AssistantMessageTypes.Assistant,
    content: "Xin chào! Mình là trợ lý AI của TechZone.\nMình sẵn sàng giúp đỡ bạn những câu hỏi về tư vấn, tìm kiếm sản phẩm.\n Hôm nay bạn cần mình hỗ trợ gì hông? ^^",
    actionCode: null
}

const AIAssistantLocalStorageKeyword = "ai_assistant"

const AssistantMockData: AssistantMessageProps[] =
    [
        {
            type: AssistantMessageTypes.Assistant,
            content: "Xin chào! Tiki hiện có bán nhiều loại mặt hàng khác nhau. Dưới đây là một số sản phẩm mà Tiki đang cung cấp \nKhuyên tai chữ c mắt xích phong cách cổ điển Hàn Quốc - Giá: 25.500đ\nVòng tay phong thủy Mã Não trắng 10mm + Mắt Hổ + Charm roi - Giá: 770.000đ\nMóc Chìa Khóa Tỳ Hưu Tài Lộc Đá Mắt Hổ - Nâu - Giá: 126.000đ\nMóc Chìa Khóa Tỳ Hưu Tài Lộc, Đá Mắt Hổ - Nâu - Giá: 139.500đ Nếu bạn có nhu cầu tìm kiếm sản phẩm cụ thể, hãy cho tôi biết thêm thông tin để tôi có thể tư vấn tốt hơn.",
            actionCode: null
        },
        {
            type: AssistantMessageTypes.Assistant,
            content: "Mình sẵn sàng giúp bạn với câu hỏi về chính sách và tìm kiếm sản phẩm.",
            actionCode: null
        },
        {
            type: AssistantMessageTypes.Assistant,
            content: "Mình đã thêm sản phẩm vào giỏ hàng",
            actionCode: "action_ADD_TO_CART"
        }
    ]

function getRandomAnswer() {
    const time = Date.now()

    const index = time % AssistantMockData.length

    return AssistantMockData[index]
}

const AIAssistantImageLink = "https://cdn-icons-png.freepik.com/512/9732/9732800.png"

const InfiniteProductsListSetup: InfiniteScrollProductsProps =
{
    productsPerRow: 4,
    overFlowMaxHeight: "100dvh",
    productItemSize: "small"
}

const InfinitePromotionListSetup: InfinitePromotionListProps =
{
    overflowMaxHeight: "100dvh",
    promotionsPerRow: 2,
}

const testCaseNumber = 3


export default function AIAssistantFloatButton({ }: AIAssistantFloatButtonProps) {
    const [open, setOpen] = useState<boolean>(false)

    const [messages, setMessages] = useState<AssistantMessageProps[]>([GreetingMessage])
    const [isExpandedPopUp, setIsExpandedPopUp] = useState<boolean>(false)
    const [bigModalOpen, setBigModalOpen] = useState<boolean>(false)

    const [userInput, setUserInput] = useState<string | undefined>(undefined)

    const ref = useRef(null);
    useEffect(() => {
        require("@lottiefiles/lottie-player");
    });
    const greetingLottie =
        <lottie-player
            id="firstLottie"
            ref={ref}
            autoPlay
            loop
            mode="normal"
            src="https://lottie.host/d3a73d67-08a9-479a-8701-e520c58a41c2/e9YSew8NYj.json"
            style={{ height: "100%" }}
        ></lottie-player>

    const notFoundLottie =
        <lottie-player
            id="firstLottie"
            ref={ref}
            autoPlay
            loop
            mode="normal"
            src="https://lottie.host/4cc4d748-fec0-409d-b71a-5d2bf0823eb2/4jt7N8Ajrd.json"
            style={{ height: "60%" }}
        ></lottie-player>

    const greetingReactNode =
        <Flex className="w-full h-full bg-white" vertical justify="start" align="center">
            <div className="w-3/5 h-3/5">{greetingLottie}</div>
            <Typography className="text-blue-700 font-semibold">
                <Flex justify="center" align="center" gap={4}>
                    <BsChatDots className="text-lg" />
                    Mình đã sẵn sàng để hỗ trợ bạn ^^
                </Flex>
            </Typography>
        </Flex>

    const [extraSupportDisplay, setExtraSupportDisplay] = useState<JSX.Element>(greetingReactNode)

    //get cached messages of the previous conversation
    useEffect(() => {

        if (localStorage) {
            const jsonStringifiedMessages = localStorage.getItem(AIAssistantLocalStorageKeyword)

            if (jsonStringifiedMessages != null) {
                const initMessages = JSON.parse(jsonStringifiedMessages) as AssistantMessageProps[]
                setMessages(initMessages)
            }
            else {
                setMessages([GreetingMessage])
            }
        }
    },
        [])

    //the function used for testing
    function getRamdomDisplay() {
        const randomNumber = Math.round(Math.random() * 1000)
        if (randomNumber % testCaseNumber == 0) {
            return <InfiniteProductsList setup={InfiniteProductsListSetup} />
        }
        else if (randomNumber % testCaseNumber == 1) {
            return <InfinitePromotionList setup={InfinitePromotionListSetup} />
        }
        else if (randomNumber % testCaseNumber == 2) {
            return greetingReactNode
        }

        return greetingReactNode
    }

    function handleOpenAssistant() {
        if (isExpandedPopUp) {
            setBigModalOpen(true)
        }
        else {
            setOpen(!open)
        }
    }

    function handleCloseAssistant() {
        if (isExpandedPopUp) {
            setBigModalOpen(false)
        }
        else {
            setOpen(false)
        }
    }

    function handleDeleteMessages() {
        const newMessages = messages.slice(0, 1)
        setMessages(newMessages)
        if (localStorage) {
            const stringifiedMessages = JSON.stringify(newMessages)
            localStorage.setItem(AIAssistantLocalStorageKeyword, stringifiedMessages)
        }
    }

    ////////////////////////////////////////////////////////////////////////

    function getAIAssistantMessageDisplay(message: AssistantMessageProps, index: number) {
        return (
            <Flex vertical key={Date.now().toString() + index.toString()} className="w-full">
                <Flex className="w-full" justify="start" align="center" gap={8}>
                    <Flex className="h-full" justify="center" align="start">
                        <Image className="rounded-full" width={35} height={35} src={AIAssistantImageLink} preview={false} />
                    </Flex>
                    <Flex className="w-9/12" justify="start" align="center">
                        <Tag bordered={false} color={"cyan"}>
                            <Flex className="px-1 pt-2" vertical justify="center" align="start">
                                <Typography.Text className="text-blue-500 text-sm font-semibold mb-1">
                                    Trợ lý
                                </Typography.Text>
                                <Typography.Paragraph className="text-wrap text-sm">
                                    {message.content}
                                </Typography.Paragraph>
                            </Flex>
                        </Tag>
                    </Flex>
                </Flex>
                <div className="h-10 w-full invisible">hidden block</div>
            </Flex>
        )
    }

    function getUserMessageDisplay(message: AssistantMessageProps, index: number) {
        return (
            <Flex className="w-full" key={Date.now().toString() + index.toString()} justify="end" align="center">
                <Flex className="w-7/12" justify="end" align="center">
                    <Tag color={"blue-inverse"}>
                        <Typography.Paragraph className="text-wrap text-sm text-white">
                            {message.content}
                        </Typography.Paragraph>
                    </Tag>
                </Flex>
            </Flex>
        )
    }

    function getMessageDisplay(message: AssistantMessageProps, index: number) {
        if (message.type == AssistantMessageTypes.Assistant) {
            return getAIAssistantMessageDisplay(message, index)
        }
        else if (message.type == AssistantMessageTypes.User) {
            return getUserMessageDisplay(message, index)
        }
        else {
            return <></>
        }
    }

    function handleExpandButtonOnClick() {
        setIsExpandedPopUp(true)
        setBigModalOpen(true)
        setOpen(false)
    }

    function handleShrinkButtonOnClick() {
        setIsExpandedPopUp(false)
        setBigModalOpen(false)
        setOpen(true)
    }

    function handleRefreshMessages() {
        if (localStorage) {
            const stringifiedMessages = localStorage.getItem(AIAssistantLocalStorageKeyword)

            if (stringifiedMessages != null) {
                const newMessages = JSON.parse(stringifiedMessages) as AssistantMessageProps[]
                setMessages(newMessages)
            }
        }
    }


    function handleSendButtonOnClick() {
        if (userInput == undefined) {
            return
        }

        const message: AssistantMessageProps =
        {
            type: AssistantMessageTypes.User,
            content: userInput as string,
            actionCode: null
        }

        const newMessages = [...messages]
        newMessages.push(message)


        //for testing:
        const randomAnswer = getRandomAnswer()
        newMessages.push(randomAnswer)

        setMessages(newMessages)

        setUserInput(undefined)

        setExtraSupportDisplay(getRamdomDisplay())

        if (localStorage) {
            const stringifiedMessages = JSON.stringify(newMessages)
            localStorage.setItem(AIAssistantLocalStorageKeyword, stringifiedMessages)
        }
        //TODO: call API here

    }



    const ExpandOrShrinkButton = isExpandedPopUp == false ?
        <Tooltip placement="top" title="Mở rộng">
            <Button size="small" className="rounded-full border-transparent" onClick={handleExpandButtonOnClick}>
                <IoExpandOutline />
            </Button>
        </Tooltip> :
        <Tooltip placement="top" title="Thu nhỏ">
            <Button size="small" className="rounded-full border-transparent" onClick={handleShrinkButtonOnClick}>
                <LuShrink />
            </Button>
        </Tooltip>

    const extraAiAssistantPopoverContentButton =
        <Flex className="w-full h-full" justify="end" align="center" gap={6}>
            <Tooltip placement="top" title="Làm mới">
                <Button size="small" className="rounded-full border-transparent" onClick={handleRefreshMessages}>
                    <BiRefresh />
                </Button>
            </Tooltip>
            {ExpandOrShrinkButton}
            <Tooltip placement="top" title="Xoá đoạn chat">
                <Button size="small" className="rounded-full border-transparent" onClick={handleDeleteMessages}>
                    <IoTrashBinOutline />
                </Button>
            </Tooltip>
            <Tooltip placement="top" title="Đóng đoạn chat">
                <Button size="small" className="rounded-full border-transparent" onClick={handleCloseAssistant}>
                    <IoCloseOutline />
                </Button>
            </Tooltip>
        </Flex>

    const SendButtonStyle = userInput != undefined && userInput.length > 0 ? "bg-blue-600 text-white hover:bg-blue-600" : "disabled"
    const isSendButtonDisabled = userInput != undefined && userInput.length > 0 ? false : true
    const CardActions =
        [
            <div className="relative h-10">
                <Flex className="w-full absolute bottom-0 px-5" justify="end" align="center">
                    <TextArea className="w-full max-h-96 overflow-y-auto" autoSize={true} value={userInput}
                        placeholder="Nhập nội dung cần hỗ trợ"
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setUserInput(e.target.value)}
                    />,
                    {/* <Input className="w-full" multiple={true} value={userInput} onChange={(e: ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value)}/> */}
                    <Button disabled={isSendButtonDisabled} className={SendButtonStyle}
                        onClick={() => handleSendButtonOnClick()}
                        type="default"><LuSendHorizonal className="font-light" /></Button>
                </Flex>
            </div>
        ]

    const cardTitle =
        <Flex className="pb-3" justify="start" align="center" gap={8}>
            <Image preview={false} src={AIAssistantImageLink} width={30} height={30} />
            <Typography.Text className="text-lg">Trợ lý TechZone</Typography.Text>
        </Flex>

    const AIAssistantPopoverContent =
        <Card
            style={{ boxShadow: "none" }}
            title={cardTitle} bordered={false} extra={extraAiAssistantPopoverContentButton} actions={CardActions}>
            <Flex className="overflow-y-auto h-96 max-h-96 max-w-screen-md" vertical justify="start" align="center" gap={4}>
                {
                    messages.map((message: AssistantMessageProps, index: number) => {
                        return getMessageDisplay(message, index)
                    })
                }
            </Flex>
        </Card>


    ///////////////////////////////////////////////////////////////////////////////////////////////



    return (
        <>
            {/* <div className="relative w-1/4 bg-blue-500"></div> */}
            <Popover open={open} trigger={"click"} placement="leftBottom" content={AIAssistantPopoverContent}>
                <Flex vertical align="center" justify="end">
                    <Tooltip trigger={"hover"} title={""} placement="left">
                        <Button type="primary" className="w-16 min-w-16 h-20 min-h-16 rounded-md border-0 bg-blue-600 hover:bg-blue-400" onClick={handleOpenAssistant}>
                            <Flex vertical className="w-full h-full" justify="center" align="center">
                                <BiSupport className="text-2xl" />
                                <Typography.Text className="text-xs text-white font-medium">
                                    Trợ lý
                                </Typography.Text>
                            </Flex>
                        </Button>
                    </Tooltip>
                </Flex>
            </Popover>
                <Modal open={bigModalOpen}
                    className="fullscreen-modal"
                    style={{top: 0, left: 0, margin: 0}} width={"100%"}
                    closable={false} footer={[]}>
                    <Flex className="w-full h-full bg-gray-200"> 
                        <Card
                            className="w-2/5 h-full"
                            style={{ boxShadow: "none", borderRadius: "0 0 0 0" }}
                            title={cardTitle} bordered={false} extra={extraAiAssistantPopoverContentButton} actions={CardActions}>
                            <Flex style={{ maxHeight: "550px", height:"550px"}} className="overflow-y-auto" vertical justify="start" align="center" gap={4}>
                                {
                                    messages.map((message: AssistantMessageProps, index: number) => {
                                        return getMessageDisplay(message, index)
                                    })
                                }
                            </Flex>
                        </Card>
                        <div className="w-3/5">
                            {/* <InfiniteProductsList setup={InfinityProductsListSetup}/> */}
                            {extraSupportDisplay}
                        </div>
                    </Flex>
                </Modal>
            {/* <FloatButton className="w-full h-full" shape="square" icon={<BiSupport />} type="primary"/> */}
        </>
    )
}