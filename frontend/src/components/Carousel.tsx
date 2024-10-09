import React, { useState, useEffect } from "react";
import "./Carousel.css"; // Crear un archivo CSS para el carrusel

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
    <div className="carousel">
      {slides.map((slide, index) => (
        <div
          key={index}
          className="carousel-slide"
          style={{ display: index === currentIndex ? "block" : "none" }}
        >
          <img src={slide.img} alt={slide.alt} />
        </div>
      ))}
      <a
        className="prev"
        onClick={() =>
          setCurrentIndex((currentIndex - 1 + slides.length) % slides.length)
        }
        role="button"
        tabIndex={0}
      >
        &#10094;
      </a>
      <a
        className="next"
        onClick={() => setCurrentIndex((currentIndex + 1) % slides.length)}
        role="button"
        tabIndex={0}
      >
        &#10095;
      </a>
    </div>
  );
};

export default Carousel;
