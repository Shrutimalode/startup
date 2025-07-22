import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { isAuthenticated, setRedirectAfterLogin } from '../../Utils/AuthData';

const AdsCarousel = () => {
  const navigate = useNavigate();
  const ads = [
    {
      id: 1,
      title: "शंकर नगर",
      subtitle: "हक्काचं प्लॉट आता सहज शक्य!",
      image: "/images/width_800.webp",
      background: "bg-gradient-to-r from-green-200 via-green-100 to-yellow-100",
      isSpecialOffer: true,
      link: '/manoram-nagri-services'
    },
    {
      id: 2,
      title: "आनंद नगर",
      subtitle: "आपल्या स्वप्नातील घराचा प्लॉट आता सहज शक्य!",
      image: "/images/width_800.webp",
      background: "bg-gradient-to-r from-blue-200 via-blue-100 to-green-100",
      isSpecialOffer: true,
      link: '/anand-nagri-services'
    },
    {
      id: 3,
      title: "आनंद सागर सिटी",
      subtitle: "आपल्या कुटुंबासाठी सर्वोत्तम निवास स्थान!",
      image: "/images/width_800.webp",
      background: "bg-gradient-to-r from-purple-200 via-purple-100 to-pink-100",
      isSpecialOffer: true,
      link: '/anand-sagar-city-services'
    }
  ];

  const handleAdClick = (link) => {
    if (isAuthenticated()) {
      navigate(link);
    } else {
      setRedirectAfterLogin(link);
      navigate('/login');
    }
  };

  const renderArrowPrev = (clickHandler, hasPrev) => {
    return (
      <button
        onClick={clickHandler}
        disabled={!hasPrev}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/30 hover:bg-black/50 rounded-r-lg transition-all ${
          !hasPrev && 'opacity-50 cursor-not-allowed'
        }`}
        style={{ left: 0 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="white"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
    );
  };

  const renderArrowNext = (clickHandler, hasNext) => {
    return (
      <button
        onClick={clickHandler}
        disabled={!hasNext}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/30 hover:bg-black/50 rounded-l-lg transition-all ${
          !hasNext && 'opacity-50 cursor-not-allowed'
        }`}
        style={{ right: 0 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="white"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    );
  };

  return (
    <div className="w-full max-w-xl sm:max-w-2xl mx-auto px-4 sm:px-8 my-3 sm:my-6">
      <Carousel
        showArrows={true}
        showStatus={false}
        showThumbs={false}
        showIndicators={true}
        infiniteLoop={true}
        autoPlay={true}
        interval={3000}
        className="rounded-lg overflow-hidden"
        renderArrowPrev={renderArrowPrev}
        renderArrowNext={renderArrowNext}
      >
        {ads.map((ad) => (
          <div
            key={ad.id}
            onClick={() => handleAdClick(ad.link)}
            className={`relative h-45 sm:h-72 md:h-80 rounded-xl shadow-xl border border-blue-200 overflow-hidden ${ad.background} cursor-pointer transform transition-transform duration-300 hover:scale-[1.01]`}
          >
            {/* Overlay for text contrast */}
            <div className="absolute inset-0 bg-black/20 z-0"></div>
            <div className="flex items-center h-full relative z-10">
              {ad.isSpecialOffer ? (
                // Special offer layout
                <div className="relative w-full h-full">
                  <div 
                    className="absolute inset-0 z-0"
                    style={{
                      backgroundImage: `url(${ad.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      opacity: '0.85'
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-black/40 z-1"></div>
                  <div className="relative z-10 flex w-full h-full items-center px-6 sm:px-12">
                    <div className="text-left">
                      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 text-white drop-shadow-lg">
                        {ad.title}
                      </h2>
                      <p className="text-sm sm:text-xl md:text-2xl font-semibold text-white drop-shadow-lg">
                        {ad.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                // Coming soon layout
                <div className="flex items-center justify-center h-full w-full px-4">
                  <div className="text-center">
                    <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-2 sm:mb-4 drop-shadow">
                      {ad.title}
                    </h2>
                    <div className="animate-pulse">
                      <div className="h-1 sm:h-2 w-16 sm:w-24 bg-blue-400 rounded mx-auto"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default AdsCarousel; 