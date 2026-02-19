import React, { useEffect, useState } from "react";
import image1 from "../assets/aquaman.jpg";
import image2 from "../assets/Batman.jpg";
import image3 from "../assets/BlackAdam.jpg";
import image4 from "../assets/Superman.jpg";

const images = [image1, image2, image3, image4]; // Array of images

const Ban = () => {
  const [currentSlide, setCurrentSlide] = useState(0); // Track current slide index

  useEffect(() => {
    // Auto-slide logic
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length); // Increment slide index cyclically
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="py-6 w-11/12 mx-auto lg:mb-10">
      <div className="min-h-screen w-full relative">
        {images.map((image, index) => (
          <div
            key={index}
            className={` absolute w-full transition-opacity duration-1000 ease-in-out  ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-auto"
            />
          </div>
        ))}

        {/* Manual Navigation (Optional) */}
      </div>
    </div>
  );
};

export default Ban;
