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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[300px] sm:min-h-[350px] lg:min-h-[400px] bg-gradient-to-r from-[#0396FF] to-[#ABDCFF] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_70%)]"></div>
        <div className="container mx-auto h-full px-2 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="flex flex-row items-center justify-between gap-4 sm:gap-8 h-full">
            {/* Text Content - Always left aligned */}
            <div className="w-1/2 text-white text-left z-10">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-6">
                कार, घर आणि सोलरपॅनेल स्वच्छतेचं समाधान
              </h1>
              <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-8">
                <p className="text-sm sm:text-lg lg:text-xl">फक्त RealtorXpert मध्ये!</p>
                <p className="text-sm sm:text-lg lg:text-xl">१ तासात सेवा, तुमच्या दारात!</p>
              </div>
              <button
                onClick={handleBookNowClick}
                className="bg-[#FFA500] hover:bg-[#FF8C00] text-black font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base lg:text-lg inline-flex items-center gap-2 transform hover:scale-105 transition-transform duration-200"
              >
                BOOK NOW
                <span className="bg-white rounded-full p-1">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                </span>
              </button>
            </div>

            {/* Image - Right aligned on all screens */}
            <div className="w-1/2 flex justify-end items-center">
              <img 
                src="/images/copy.png" 
                alt="Cleaning Services" 
                className="w-full max-w-[180px] sm:max-w-[280px] lg:max-w-[350px] object-contain"
              />
            </div>
          </div>
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