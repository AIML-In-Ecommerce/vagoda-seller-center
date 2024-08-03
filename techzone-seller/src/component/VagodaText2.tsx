'use client'

interface VagodaText2Props
{
    width?: number | undefined,
    height?: number | undefined,
    color?: string | undefined,
    colorOfInnerD?: string | undefined,
    colorOfInnerA?: string | undefined,
    squareColor?: string | undefined
}

function VagodaText2(props: VagodaText2Props)
{
    const selectedWidth = props.width ? props.width : 1280
    const selectedHeight = props.height ? props.height : 1280
    
    const selectedColor = props.color ? props.color : "#060606"
    const selectedColorOfInnerD = props.colorOfInnerD ? props.colorOfInnerD : "#FDFDFD"
    const selectedColorOfInnerA = props.colorOfInnerA ? props.colorOfInnerA : "#FDFDFD"
    const selectedSquareColor = props.squareColor ? props.squareColor : "#040404"

    return(
        <svg version="1.1" viewBox="0 0 2048 676" width={`${selectedWidth}`} height={`${selectedHeight}`} xmlns="http://www.w3.org/2000/svg">
            <path transform="translate(1371,9)" d="m0 0h502l14 2 13 5 13 7 12 11 9 10 8 15 4 13 1 5v515l-4 15-8 16-7 9-5 6-13 10-17 8-12 3-7 1h-505l-18-4-12-5-11-7-12-11-8-11-7-14-4-15-1-6v-505l3-15 5-13 6-10 8-10 11-10 16-9 17-5z" fill={`${selectedSquareColor}`}/>
            <path transform="translate(1559,139)" d="m0 0h14l19 2 6 7 2 99v92l-1 32-3 17-5 17-8 16-9 14-12 14-10 9-11 8-14 8-13 6-15 5-20 4-9 1h-21l-21-3-17-5-14-6-16-10-13-11-11-11-9-12-8-13-7-15-6-20-3-17-1-21 3-25 5-18 8-18 10-15 9-11 13-13 15-11 18-10 15-6 25-6 11-1h15l21 3 16 5 7 5 3 6v52l-10-3-22-8-12-3-7-1h-15l-16 4-16 8-11 8-12 12-9 14-5 11-3 9-2 13v10l3 16 6 15 7 12 9 10 7 7 11 7 10 5 13 4 18 2 15-1 15-4 12-5 13-9 11-11 9-14 5-14 3-16 1-32v-167l2-13 4-7z" fill={`${selectedColorOfInnerD}`}/>
            <path transform="translate(488,213)" d="m0 0h24l18 3 16 5 16 7 15 9 14 11 12 12 10 13 10 18 7 19 3 15 2 23 1 100v27l-4 8-6 3-27 1-9-2-5-5-2-5v-68l-2-50-2-20-4-16-8-16-8-11-7-7-13-9-15-7-12-3-7-1h-13l-18 4-15 6-12 8-10 9-7 8-8 14-5 13-2 9-1 18 2 15 5 16 7 13 8 10 9 8 14 8 15 5 14 2h14l19-3 20-6 9-3 1 4 1 16v13l-2 15-3 8-5 6-8 4-8 2h-46l-18-3-21-7-17-9-14-10-12-11-9-10-7-10-9-16-6-14-5-18-2-12v-34l4-21 6-18 10-19 8-11 9-11 12-11 14-10 19-10 21-7 16-3z" fill={`${selectedColor}`}/>
            <path transform="translate(1770,213)" d="m0 0h26l18 3 17 5 21 10 12 8 14 12 9 9 10 13 9 16 6 14 4 14 2 11 1 15 1 32v99l-3 7-5 4-4 1-24 1-10-2-5-5-2-5v-100l-1-25-3-16-5-15-8-15-9-11-8-8-14-9-15-6-10-2h-20l-17 4-12 5-12 7-11 9-8 9-8 14-5 13-2 9v27l5 19 6 12 9 12 7 7 10 7 15 7 13 4 7 1h21l19-4 21-9h2l1 3 1 13v28l-3 11-6 7-8 4-9 2-10 1h-19l-25-2-17-4-16-6-15-8-14-10-14-13-9-11-10-15-8-17-6-20-2-11-1-11v-19l2-18 6-22 8-18 6-10 9-12 9-10 8-8 15-11 19-10 20-7 15-3z" fill={`${selectedColorOfInnerA}`}/>
            <path transform="translate(1127,213)" d="m0 0h22l20 3 20 6 16 8 12 7 14 11 13 13 11 15 8 14 8 19 4 16 2 13v27l-3 18-4 14-6 15-9 16-10 13-9 10-8 7-14 10-14 8-15 6-18 5-13 2h-33l-21-4-17-6-16-8-11-7-11-9-14-14-9-12-9-15-8-20-5-20-1-9v-26l2-14 4-15 6-16 7-13 12-17 14-15 14-11 16-10 16-7 21-6zm4 53-15 3-13 5-12 7-10 8-7 7-9 13-7 15-4 16v24l4 16 8 16 8 11 10 10 14 9 11 5 15 4 10 1h9l15-2 12-4 14-7 15-12 10-13 8-16 4-13 1-6v-23l-4-16-5-12-8-12-11-12-12-9-16-8-15-4-7-1z" fill={`${selectedColor}`}/>
            <path transform="translate(805,213)" d="m0 0h26l19 3 21 7 16 8 11 7 10 8 10 9 9 10 9 13 7 12 8 20 4 15 2 14v27l-4 22-7 20-8 15-10 14-9 10-10 10-17 12-15 8-19 7-18 4-8 1h-30l-13-2-19-5-17-7-15-9-14-11-12-12-10-14-9-16-5-12-5-16-3-17v-35l4-20 7-19 8-15 10-14 12-13 11-10 18-12 17-8 15-5 14-3zm6 53-15 3-13 5-14 8-13 12-9 12-8 16-4 14-1 6v19l4 18 7 16 8 11 7 8 12 9 16 8 14 4 9 1h13l17-3 15-6 11-7 11-9 8-9 8-13 6-14 3-16v-15l-3-15-5-12-6-11-8-10-11-11-14-9-13-6-18-4z" fill={`${selectedColor}`}/>
            <path transform="translate(87,216)" d="m0 0h16l11 3 10 6 5 4 7 10 7 14 10 27 14 33 16 35 19 41 8 18 6-12 15-33 18-39 16-36 7-15 12-26 8-15 7-8 8-4 10-2h18l18 1 3 1-2 6-7 16-7 15-17 37-9 20-19 42-16 35-11 24-16 35-8 18-6 11-8 6-12 4h-17l-10-3-8-6-8-16-18-39-13-29-30-67-8-19-7-15-13-29-12-28-7-15v-2l12-3z" fill="#060606"/>
            <path transform="translate(707,493)" d="m0 0h9l11 6 23 12 22 8 21 5 8 1h35l25-5 22-8 16-8 7-3 9-1 9 2 15 8 10 7 4 7-1 9-7 8-16 10-25 12-20 7-18 5-22 4-23 2-21-1-27-4-20-5-20-7-23-11-19-12-9-7-2-3 1-5 7-8 6-9 6-10z" fill={`${selectedColor}`}/>
            <path transform="translate(930,171)" d="m0 0h12l11 4 8 6 6 8 3 11v10l-4 13-8 9-10 5-4 1h-17l-10-4-8-7-4-8-2-9v-13l4-11 4-5 11-7z" fill={`${selectedColor}`}/>
        </svg>
    )
}

export default VagodaText2