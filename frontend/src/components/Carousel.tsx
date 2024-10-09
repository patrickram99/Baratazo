import React, { useState, useEffect } from "react";

interface Slide {
  img: string;
  alt: string;
}

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const slides: Slide[] = [
    { img: "/img/msi-banner1.jpg", alt: "MSI" },
    { img: "/img/msi-banner2.jpg", alt: "Promoción 2" },
    { img: "/img/msi-banner3.jpg", alt: "Promoción 3" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative max-w-full mx-auto my-5 px-5 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`relative w-full h-[300px] ${
            index === currentIndex ? "block" : "hidden"
          }`}
        >
          <img
            src={slide.img}
            alt={slide.alt}
            className="w-full h-full object-cover mx-auto"
          />
        </div>
      ))}
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 cursor-pointer px-4 py-2 text-white font-bold text-lg transition-all duration-600 rounded-r-md hover:bg-black hover:bg-opacity-80"
        onClick={() =>
          setCurrentIndex((currentIndex - 1 + slides.length) % slides.length)
        }
      >
        &#10094;
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 cursor-pointer px-4 py-2 text-white font-bold text-lg transition-all duration-600 rounded-l-md hover:bg-black hover:bg-opacity-80"
        onClick={() => setCurrentIndex((currentIndex + 1) % slides.length)}
      >
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
