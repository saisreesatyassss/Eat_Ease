import React from "react";
import Slider from "react-slick";
import LocationComponent from "../components/location";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Image1 from "../assets/main/main1.png";
import Image2 from "../assets/main/main2.png";
import Image3 from "../assets/main/main3.png";
import Image4 from "../assets/main/main4.png";
// Import more images as needed

const Main = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Adjust the time between slides
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section relative h-screen">
        <Slider {...settings}>
          <div>
            <img
              src={Image1}
              alt="Hero 1"
              className="object-cover object-center w-screen h-screen"
            />
          </div>
          <div>
            <img
              src={Image2}
              alt="Hero 2"
              className="object-cover object-center w-screen h-screen"
            />
          </div>
          <div>
            <img
              src={Image3}
              alt="Hero 3"
              className="object-cover object-center w-screen h-screen"
            />
          </div>
          <div>
            <img
              src={Image4}
              alt="Hero 4"
              className="object-cover object-center w-screen h-screen"
            />
          </div>
          {/* Add more slides with additional images */}
        </Slider>

        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to Eat Ease
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Explore a world of delicious cuisines, delivered to your doorstep.
          </p>
          <LocationComponent />
        </div>
      </section>
    </div>
  );
};

export default Main;
