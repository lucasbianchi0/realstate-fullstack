/* eslint-disable react/prop-types */
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PropertySlider = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Slider {...settings}>
      {images.map((url, index) => (
        <div key={index} className="h-[400px] ">
          <img
            src={url}
            alt={`Propiedad ${index}`}
            className="w-full h-full "
          />
        </div>
      ))}
    </Slider>
  );
};

export default PropertySlider;
