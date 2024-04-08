import { CSSProperties } from 'react'
// import Stylesheet from 'our custom code'

const arrowSize = 30
const arrowOffset = 0
const arrow: CSSProperties = {
  color: '#808080',
  fontSize: arrowSize,
  height: arrowSize,
  width: arrowSize,
  zIndex: 1,

}

// Arrow.jsx
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

interface AntdArrowProps {
  currentSlide?: number
  slideCount?: number
}

interface ArrowProps {
  direction: 'left' | 'right'
}


const StyleSheet = {
  leftArrow: {
    ...arrow,
    left: arrowOffset
  },
  rightArrow: {
    ...arrow,
    right: arrowOffset
  }
}


// Antd is doing some interesting things here. Using LeftOutlined and RightOutlined
// directly without wrapping them in this component doesn't work. Additionally, if
// we don't add currentSlide and slideCount to the pops, we get console errors.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const CarouselArrow = ({ currentSlide, direction, slideCount, ...carouselProps }: ArrowProps & AntdArrowProps) =>
  direction === 'left' ? (
    <div >
        <LeftOutlined {...carouselProps} style={StyleSheet.leftArrow} />
    </div>
    ) : (
        <div>
            <RightOutlined {...carouselProps} style={StyleSheet.rightArrow} />
        </div>
  )
