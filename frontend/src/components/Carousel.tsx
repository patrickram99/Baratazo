import React, { useState, useEffect } from 'react'

interface Slide {
  img: string
  alt: string
}

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const slides: Slide[] = [
    { img: '/img/msi-banner1.jpg', alt: 'MSI' },
    { img: '/img/msi-banner2.jpg', alt: 'Promoción 2' },
    { img: '/img/msi-banner3.jpg', alt: 'Promoción 3' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % slides.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <div className="relative mx-auto my-5 max-w-full overflow-hidden px-5">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`relative h-[300px] w-full ${index === currentIndex ? 'block' : 'hidden'}`}
        >
          <img src={slide.img} alt={slide.alt} className="mx-auto h-full w-full object-cover" />
        </div>
      ))}
      <button
        className="duration-600 absolute left-0 top-1/2 -translate-y-1/2 transform cursor-pointer rounded-r-md px-4 py-2 text-lg font-bold text-white transition-all hover:bg-black hover:bg-opacity-80"
        onClick={() => setCurrentIndex((currentIndex - 1 + slides.length) % slides.length)}
      >
        &#10094;
      </button>
      <button
        className="duration-600 absolute right-0 top-1/2 -translate-y-1/2 transform cursor-pointer rounded-l-md px-4 py-2 text-lg font-bold text-white transition-all hover:bg-black hover:bg-opacity-80"
        onClick={() => setCurrentIndex((currentIndex + 1) % slides.length)}
      >
        &#10095;
      </button>
    </div>
  )
}

export default Carousel
