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
    /*{
      id: 2,
      title: "More offers soon to be launch",
      comingSoon: true,
      background: "bg-gradient-to-r from-blue-400 via-blue-200 to-blue-100"
    },
    {
      id: 3,
      title: "More offers soon to be launch",
      comingSoon: true,
      background: "bg-gradient-to-r from-blue-400 via-blue-200 to-blue-100"
    }*/
  ];

  const handleBookNow = (link) => {
    if (isAuthenticated()) {
      navigate(link);
    } else {
      setRedirectAfterLogin(link);
      navigate('/login');
    }
  };

  return (
    <div className="w-full max-w-xl sm:max-w-2xl mx-auto px-4 sm:px-8 my-3 sm:my-6">
      <Carousel
        showArrows={false}
        showStatus={true}
        showThumbs={false}
        showIndicators={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={4000}
        className="rounded-lg overflow-hidden"
      >
        {ads.map((ad) => (
          <div
            key={ad.id}
            className={`relative h-45 sm:h-72 md:h-80 rounded-xl shadow-xl border border-blue-200 overflow-hidden ${ad.background}`}
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
                      <div className="flex justify-start mt-4">
                        <button
                          onClick={() => handleBookNow(ad.link)}
                          className="bg-[#FFA500] hover:bg-[#FF8C00] text-white font-semibold px-6 py-2 sm:px-8 sm:py-3 rounded-full flex items-center gap-2 text-sm sm:text-base"
                        >
                          BOOK NOW
                        </button>
                      </div>
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