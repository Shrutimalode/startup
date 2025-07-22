import React, { useState } from 'react';
import { Phone, ZoomIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import ServiceBookingForm from '../../Components/ServiceBookingForm/ServiceBookingForm';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { PlotOverlay } from './components/PlotOverlay';
import PlotDetailsModal from './components/PlotDetailsModal';
import ZoomedPlotLayout from './components/ZoomedPlotLayout';
import { isAuthenticated, setRedirectAfterLogin } from '../../Utils/AuthData';

const AnandSagarCityServices = () => {
  const navigate = useNavigate();
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const handlePlotClick = (plotId) => {
    setSelectedPlot(plotId);
  };

  const handleBookNowClick = () => {
    if (isAuthenticated()) {
      setIsBookingFormOpen(true);
    } else {
      setRedirectAfterLogin('/anand-sagar-city-services');
      navigate('/login');
    }
  };

  const features = [
    "सर्व सुविधांनी परिपूर्ण टाउनशिप",
    "100% कायदेशीर दस्तऐवज",
    "क्वालिफाइड रस्ते, वीज, पाणी उपलब्ध",
    "बँक लोनची सुविधा उपलब्ध",
    "स्वच्छ परिसर आणि सुरक्षित वातावरण"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[300px] sm:min-h-[350px] lg:min-h-[400px]">
        <div className="absolute inset-0">
          <img 
            src="/images/width_800.webp" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 relative z-10">
          <div className="flex flex-row h-full items-center justify-between gap-4 sm:gap-8">
            {/* Left Content */}
            <div className="w-1/2 flex flex-col justify-center space-y-2 sm:space-y-4 text-left">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4">
                आनंद सागर सिटी
              </h1>
              <div className="space-y-1 sm:space-y-2">
                <p className="text-sm sm:text-lg lg:text-xl text-white">
                  सुरुवात ₹8 लाखांपासून – आपल्या
                </p>
                <p className="text-sm sm:text-lg lg:text-xl text-white">
                  हक्काचं प्लॉट आता सहज शक्य!
                </p>
                <p className="text-sm sm:text-lg lg:text-xl text-white">
                  पत्ता: अग्रग्रामी कॉन्व्हेंट स्कुल समोर, मसाळा, वर्धा
                </p>
              </div>
              <div className="flex justify-start mt-4 sm:mt-6">
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
            </div>

            {/* Right Images */}
            <div className="w-1/2 flex flex-col items-end justify-center gap-2 sm:gap-4">
              <div className="rounded-full overflow-hidden w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 border-2 sm:border-4 border-white transform hover:scale-105 transition-transform duration-200">
                <img
                  src="/images/im.jpeg"
                  alt="Happy Family"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-full overflow-hidden w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 border-2 sm:border-4 border-white transform hover:scale-105 transition-transform duration-200">
                <img
                  src="/images/width_200.jpeg"
                  alt="Township Road"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plot Layout Section */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="relative bg-gray-100 rounded-lg shadow-lg aspect-[976/1227] scale-75 sm:scale-90 lg:scale-100 transform-gpu transition-transform duration-300">
              <PlotOverlay onPlotClick={handlePlotClick} />
              <button
                onClick={() => setIsZoomed(true)}
                className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10 transform hover:scale-110"
                title="Zoom Plot Layout"
              >
                <ZoomIn className="w-6 h-6 text-gray-800" />
              </button>
            </div>
            {/* Plot Status Legend */}
            <div className="mb-8 bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">Plot Status</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-500 rounded"></div>
                  <span className="text-sm sm:text-base text-gray-700">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-red-500 rounded"></div>
                  <span className="text-sm sm:text-base text-gray-700">Sold</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-orange-500 rounded"></div>
                  <span className="text-sm sm:text-base text-gray-700">Reserved</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-500 rounded"></div>
                  <span className="text-sm sm:text-base text-gray-700">Open Space</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-yellow-500 rounded"></div>
                  <span className="text-sm sm:text-base text-gray-700">Aminity</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-black rounded"></div>
                  <span className="text-sm sm:text-base text-gray-700">Road</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <span className="text-[#FFA500] text-2xl flex-shrink-0">👍</span>
                  <p className="text-base sm:text-lg text-gray-800">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <img
              src="/images/r2.png"
              alt="Interior View"
              className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200"
            />
            <img
              src="/images/r3.png"
              alt="Interior View"
              className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200"
            />
          </div>
        </div>
      </section>

      {/* Book Now Button */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <button
            onClick={handleBookNowClick}
            className="bg-[#FFA500] hover:bg-[#FF8C00] text-black font-semibold px-8 sm:px-12 py-3 sm:py-4 rounded-full text-lg sm:text-xl inline-flex items-center gap-2 transform hover:scale-105 transition-transform duration-200"
          >
            BOOK NOW
            <span className="bg-white rounded-full p-1">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
          </button>
        </div>
      </section>

      {/* Modals */}
      {isZoomed && (
        <ZoomedPlotLayout onClose={() => setIsZoomed(false)} />
      )}

      {selectedPlot && (
        <PlotDetailsModal
          plotId={selectedPlot}
          onClose={() => setSelectedPlot(null)}
        />
      )}

      {isBookingFormOpen && (
        <ServiceBookingForm onClose={() => setIsBookingFormOpen(false)} />
      )}

      <Footer />
    </div>
  );
};

export default AnandSagarCityServices; 