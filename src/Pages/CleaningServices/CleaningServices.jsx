import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, setRedirectAfterLogin } from '../../Utils/AuthData';
import { Phone } from 'lucide-react';
import Footer from '../../Components/Footer/Footer';
import ServiceBookingForm from '../../Components/ServiceBookingForm/ServiceBookingForm';

const CleaningServices = () => {
  const navigate = useNavigate();
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBookNowClick = () => {
    if (isAuthenticated()) {
      setIsBookingFormOpen(true);
    } else {
      setRedirectAfterLogin('/cleaning-services');
      navigate('/login');
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen flex flex-col">
    {/* Hero Section */}
    <section className="flex flex-row items-center justify-between px-2 sm:px-4 md:px-10 lg:px-16 py-4 md:py-0 bg-gradient-to-r from-blue-100 to-blue-50">
      <div className="flex-1 flex flex-col justify-center items-center text-center space-y-2 sm:space-y-3 md:space-y-2 lg:space-y-2 ml-0 md:ml-5">
        <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-900 leading-snug sm:leading-snug md:leading-snug lg:leading-relaxed w-full">
          <span className="block text-center w-full">कार, घर आणि सोलरपॅनेल</span>
          <span className="block text-center w-full"> स्वच्छतेचं समाधान <span className="whitespace-nowrap">फक्त RealtorXpert मध्ये!</span></span>
        </h1>
        <p className="text-xs xs:text-sm sm:text-base md:text-base lg:text-lg font-bold text-black mt-1">
          १ तासात सेवा, तुमच्या दारात !
        </p>
        <button 
          onClick={handleBookNowClick}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-1 sm:px-8 sm:py-3 rounded-full flex items-center gap-2 text-xs xs:text-sm sm:text-base mt-3"
        >
          BOOK NOW
        </button>
      </div>
      <div className="flex-1 flex justify-center items-center mb-4 md:mb-0 md:mt-1 relative min-h-[100px] sm:min-h-[130px] md:min-h-[170px] lg:min-h-[200px]">
        {/* Solar image behind, half visible above */}
        <img
          src="/images/solar.png"
          alt="Solar background"
          className="absolute left-1/2 -translate-x-1/2 top-2 sm:top-6 md:top-10 lg:top-14 w-24 sm:w-32 md:w-40 lg:w-48 opacity-80 z-0 pointer-events-none select-none"
          style={{zIndex: 0}}
        />
        {/* Cleaning image in front */}
        <img
          src="/images/cleaning.png"
          alt="Home image"
          className="relative h-32 xs:h-40 sm:h-52 md:h-64 lg:h-72 xl:h-80 object-contain z-10"
          style={{zIndex: 1}}
        />
      </div>
    </section>





      

      {/* Services Sections */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Solar Panel Service */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Content */}
              <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
                  सोलर पॅनेल क्लिनिंग सेवा
                </h2>
                <div className="space-y-4 mb-8">
                  <p className="text-lg text-gray-600">साफ पॅनेल, जास्त वीज, जास्त बचत!</p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-600">
                      <span className="mr-2">•</span>
                      आमच्याकडे अनुभवी कर्मचारी व आधुनिक उपकरणे आहेत.
                    </li>
                    <li className="flex items-center text-gray-600">
                      <span className="mr-2">•</span>
                      वेळेवर, सुरक्षित व दर्जेदार सेवा हमखास!
                    </li>
                  </ul>
                </div>
                <div className="text-center lg:text-left">
                  <div className="mb-6">
                    <span className="text-3xl sm:text-4xl font-bold text-gray-800">₹50</span>
                    <span className="text-gray-600 ml-2">प्रति पॅनेल</span>
                  </div>
                  <button
                    onClick={handleBookNowClick}
                    className="bg-[#FFA500] hover:bg-[#FF8C00] text-black font-semibold px-6 py-3 rounded-full inline-flex items-center gap-2"
                  >
                    Book Now
                    <Phone className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {/* Images */}
              <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4 p-6 bg-gray-50">
                <img 
                  src="/images/t.webp" 
                  alt="Solar Panel Cleaning" 
                  className="w-full h-48 object-cover rounded-lg"
                />
                <img 
                  src="/images/thumbnail.jpg" 
                  alt="Solar Panel Maintenance" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Water Tank Service */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Content */}
              <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
                  वॉटर टँक क्लिनिंग सेवा
                </h2>
                <div className="space-y-4 mb-8">
                  <p className="text-lg text-gray-600">घरगुती, कॉमर्शियल आणि संस्थात्मक टाक्यांची सफाई</p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-600">
                      <span className="mr-2">•</span>
                      तज्ज्ञ कर्मचारी
                    </li>
                    <li className="flex items-center text-gray-600">
                      <span className="mr-2">•</span>
                      मशिनद्वारे हायजेनिक क्लिनिंग
                    </li>
                    <li className="flex items-center text-gray-600">
                      <span className="mr-2">•</span>
                      स्वस्त दरात दर्जेदार सेवा!
                    </li>
                  </ul>
                </div>
                <div className="text-center lg:text-left">
                  <div className="mb-6">
                    <span className="text-3xl sm:text-4xl font-bold text-gray-800">₹600</span>
                    <span className="text-gray-600 ml-2">(१००० ली. टॅंक साठी)</span>
                  </div>
                  <button
                    onClick={handleBookNowClick}
                    className="bg-[#FFA500] hover:bg-[#FF8C00] text-black font-semibold px-6 py-3 rounded-full inline-flex items-center gap-2"
                  >
                    Book Now
                    <Phone className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {/* Images */}
              <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4 p-6 bg-gray-50">
                <img 
                  src="/images/tank.webp" 
                  alt="Water Tank Cleaning" 
                  className="w-full h-48 object-cover rounded-lg"
                />
                <img 
                  src="/images/tank.jpg" 
                  alt="Water Tank Maintenance" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Partner Section */}
        <section className="bg-gray-50 rounded-lg p-6 sm:p-8 lg:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-8">
            Partner with us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Mailing Address</h3>
              <p className="text-gray-600">123 Anywhere St., Any City, State, Country 12345</p>
            </div>
            <div className="text-center p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Email Address</h3>
              <p className="text-gray-600">hello@reallygreatsite.com</p>
            </div>
            <div className="text-center p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Phone Number</h3>
              <p className="text-gray-600">(123) 456 7890</p>
            </div>
          </div>
        </section>
      </div>

      {/* Service Booking Form Modal */}
      {isBookingFormOpen && (
        <ServiceBookingForm
          isOpen={isBookingFormOpen}
          onClose={() => setIsBookingFormOpen(false)}
          service="cleaning"
        />
      )}

      <Footer />
    </div>
  );
};

export default CleaningServices;