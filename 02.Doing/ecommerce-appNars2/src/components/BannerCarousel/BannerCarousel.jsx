import React, { useState, useEffect } from "react";
import "./BannerCarousel.css";
import Button from "../common/Button";

export default function BannerCarousel({ banners }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? banners.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === banners.length - 1 ? 0 : currentIndex + 1);
  };

  if (banners.length === 0) {
    return <div className="banner-carousel">No hay banners disponibles</div>;
  }

  const currentBanner = banners[currentIndex];

  return (
    <div className="banner-carousel">
      <div className="carousel-container">
        <div
          className="banner-slide"
          style={{
            backgroundImage: `url(${currentBanner.image})`,
            backgroundColor: currentBanner.backgroundColor,
          }}
        >
          <div className="banner-content">
            <h1>{currentBanner.title}</h1>
            <p>{currentBanner.subtitle}</p>
            <Button
              variant="primary"
              onClick={() => console.log("click banner button")}
            >
              {currentBanner.buttonText}
            </Button>
          </div>
        </div>
      </div>
      {/* Controles de navegación  */}
      <button
        className="carousel-btn carousel-btn-prev"
        onClick={goToPrevious}
        aria-label="Anterior"
      >
        &#8249;
      </button>
      <button
        className="carousel-btn carousel-btn-next"
        onClick={goToNext}
        aria-label="Siguiente"
      >
        &#8250;
      </button>
      {/* Indicadores */}
      <div className="carousel-indicators">
        {banners.map((banner, index) => {
          <button
            key={index}
            className={`indicator ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir al banner ${index + 1}`}
          />;
        })}
      </div>
      {/* banners.map((banner, index) => {
        return (
          <div key={index} className="banner">
            <img src={banner.image} alt={banner.title} />
            <h2>{banner.title}</h2>
            <p>{banner.description}</p>
          </div>
        );
      })*/}
    </div>
  );
}
