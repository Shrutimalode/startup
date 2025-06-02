import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const AdsCarousel = () => {
  const navigate = useNavigate();
  const ads = [
    {
      id: 1,
      title: "जन्माष्टमी स्पेशल पॅकेज",
      subtitle: "तयारी आम्ही करू, उत्सव तुम्ही साजरा करा!",
      image: "/images/krishna.jpg",
      background: "bg-gradient-to-r from-orange-200 via-yellow-100 to-blue-100",
      isSpecialOffer: true,
      link: '/janmashtami-packages'
    },
    {
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
    }
  ];

  const handleBookNow = (link) => {
    if (link) {
      navigate(link);
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
                // Special Janmashtami offer layout
                <div className="flex w-full items-center justify-between px-6 sm:px-12">
                  <div className="text-left">
                    <div className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 text-orange-700 drop-shadow">
                      जय श्री कृष्णा
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 text-red-800 drop-shadow">
                      {ad.title}
                    </h2>
                    <p className="text-sm sm:text-xl md:text-2xl font-semibold text-orange-800 drop-shadow">
                      {ad.subtitle}
                    </p>

                    <div className="flex justify-center">
                      <button
                        onClick={() => handleBookNow(ad.link)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 sm:px-8 sm:py-3 rounded-full flex items-center gap-2 text-sm sm:text-base mt-3"
                      >
                        BOOK NOW
                      </button>
                    </div>
                  </div>
                  <div className="w-1/3 flex justify-end">
                    <img
                      src={ad.image}
                      alt={ad.title}
                      className="h-40 sm:h-44 md:h-56 lg:h-60 object-contain drop-shadow-xl"
                    />
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