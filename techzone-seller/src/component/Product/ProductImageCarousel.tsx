import Slider from "react-slick";
interface ProductImageCarouselProps {
  images: string[];
  setMainImage: (image: string) => void;
}
const ProductImageCarousel = (props: ProductImageCarouselProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {props.images.map((image: string, index: number) => (
        <div key={index} onClick={() => props.setMainImage(image)}>
          <img src={image} alt={`Image ${index + 1}`} />
        </div>
      ))}
    </Slider>
  );
};

export default ProductImageCarousel;
