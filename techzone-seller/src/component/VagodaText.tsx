'use client'

interface VagodaTextProps
{
    width?: number | undefined,
    height?: number | undefined,
    color?: string | undefined
}

function VagodaText(props: VagodaTextProps)
{
    const selectedWidth = props.width ? props.width : 1280
    const selectedHeight = props.height ? props.height : 1280
    
    const selectedColor = props.color ? props.color : "#100F0F"

    return(
        <svg version="1.1" viewBox="0 0 2048 603" width={`${selectedWidth}`} height={`${selectedHeight}`} xmlns="http://www.w3.org/2000/svg">
            <path transform="translate(1588,76)" d="m0 0h54l1 1v223l-2 17-5 19-7 16-7 13-10 14-11 12-13 11-14 9-16 8-17 6-19 4-8 1h-22l-19-3-17-5-18-8-14-8-13-11-15-15-10-14-9-16-8-22-4-18-1-10v-18l2-18 4-15 6-16 9-17 8-11 9-11 11-11 15-11 16-9 15-6 20-5 18-2h14l17 2 17 4 14 6v63l-7-3-16-8-11-4-8-2-9-1h-11l-17 3-13 5-11 7-11 9-8 9-9 15-6 18-1 6v22l4 17 8 16 8 11 4 5 13 10 14 7 17 5 7 1h16l18-4 16-7 13-10 10-10 9-14 6-16 2-10 1-13z" fill={`${selectedColor}`}/>
            <path transform="translate(535,150)" d="m0 0h16l17 2 19 5 21 9 16 10 13 11 13 13 11 15 11 21 6 18 3 17 1 12 1 141-1 1h-55l-1-6-1-139-2-12-6-15-6-10-8-10-7-7-14-9-14-6-12-3-10-1h-12l-16 3-12 5-10 6-10 8-7 7-9 14-7 15-3 13v25l5 17 8 16 8 10 10 10 11 7 14 6 11 3 7 1h16l19-4 14-6 12-8h2l1 2v62l-15 5-22 5-9 1h-21l-19-3-20-6-15-7-14-8-13-11-16-16-11-16-9-17-7-21-4-19v-28l3-19 5-17 7-16 9-15 11-14 15-15 14-10 14-8 20-8 23-5z" fill={`${selectedColor}`}/>
            <path transform="translate(1818,150)" d="m0 0h13l18 2 17 4 19 8 15 8 13 10 10 9 7 7 13 18 11 21 6 19 2 10 1 12 1 146-1 1h-54l-1-1-1-141-3-16-5-13-6-11-11-13-13-10-14-7-13-4-20-2-17 2-13 4-15 8-14 12-9 12-8 16-4 15-1 8v14l3 15 6 15 6 10 11 13 13 10 12 6 18 5 7 1h15l15-3 15-6 10-6 4-3h3l1 27v37l-23 7-14 3-10 1h-20l-19-3-18-5-23-11-12-8-11-9-11-11-10-13-10-17-8-20-5-18-2-17v-13l2-19 5-19 8-20 8-14 10-13 14-14 10-9 18-11 17-8 18-5 12-2z" fill={`${selectedColor}`}/>
            <path transform="translate(1177,150)" d="m0 0h13l18 2 17 4 20 8 14 8 13 10 10 9 9 9 12 17 8 15 6 17 4 16 2 14v22l-4 23-5 17-8 17-12 18-11 12-10 10-14 10-16 9-22 8-19 4-8 1h-24l-18-3-17-5-23-11-13-9-14-12-7-7-12-16-8-14-8-20-5-21-1-7v-30l4-21 5-15 9-19 8-12 8-10 8-9 11-9 12-9 14-8 15-6 21-5zm1 56-14 2-15 5-13 7-13 12-8 9-8 14-5 12-2 9-1 19 2 14 5 15 8 14 11 13 10 8 14 8 15 5 12 2h16l17-4 12-5 12-7 12-11 7-8 9-16 4-13 2-12v-13l-3-19-5-13-9-14-10-11-12-9-16-8-17-4z" fill={`${selectedColor}`}/>
            <path transform="translate(855,150)" d="m0 0h17l21 3 20 6 21 10 17 12 12 11 9 10 11 16 9 17 6 18 3 15 1 9v28l-4 22-7 20-7 14-8 12-11 13-9 9-17 13-19 10-24 8-15 3-9 1h-21l-19-3-17-5-18-8-12-7-14-11-14-14-12-16-11-21-7-22-4-19v-27l4-20 7-21 8-16 7-11 7-9 9-10 8-8 14-10 16-9 15-6 15-4 11-2zm2 56-14 2-15 5-12 7-10 9-10 10-8 13-6 14-3 16v17l3 15 5 13 9 14 9 10 8 7 11 7 19 7 11 2h16l16-3 15-6 14-9 10-9 10-13 8-17 3-13 1-8v-13l-3-16-7-17-8-12-13-13-14-9-11-5-15-4-8-1z" fill={`${selectedColor}`}/>
            <path transform="translate(114,155)" d="m0 0h56l3 4 9 21 14 31 14 32 14 31 17 39 12 27 3 2 13-27 15-33 18-40 16-35 14-32 8-18 2-2h60l-1 5-16 36-16 35-15 33-12 27-17 37-27 60-13 29-4 8h-51l-8-16-16-36-18-40-14-31-13-30-17-37-18-41-16-35v-3z" fill={`${selectedColor}`}/>
            <path transform="translate(756,426)" d="m0 0 4 2 14 10 19 10 17 7 24 6 15 2h31l18-3 26-8 19-9 14-9 10-8h3l9 12 14 17 10 13-2 4-14 10-18 11-16 8-15 6-19 6-19 4-29 3h-20l-21-2-20-4-20-6-20-8-21-11-24-16-2-2 1-4 11-14 12-15z" fill={`${selectedColor}`}/>
            <path transform="translate(977,108)" d="m0 0h8l13 4 9 7 6 9 3 10v12l-5 12-6 7-9 6-9 3h-13l-11-4-10-9-5-9-2-9v-8l3-10 6-9 8-7 9-4z" fill={`${selectedColor}`}/>
        </svg>
    )
}

export default VagodaText