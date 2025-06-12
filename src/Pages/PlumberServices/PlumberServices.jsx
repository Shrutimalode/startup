import React, { useState } from 'react';
import { Phone, CheckCircle, Wrench, Zap, Home, Building, Shield, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import ServiceBookingForm from '../../Components/ServiceBookingForm/ServiceBookingForm';
import { Carousel } from "react-responsive-carousel";
import { isAuthenticated, setRedirectAfterLogin } from '../../Utils/AuthData';

const PlumberServices = () => {
  const navigate = useNavigate();
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const services = [
    {
      title: "लीक होणाऱ्या पाईप्स दुरुस्ती",
      description: "पाण्याच्या गळतीचे त्वरित निदान व दुरुस्ती. ",
      image: "/images/plumber2.jpeg",
      icon: <Wrench className="w-6 h-6" />
    },
    {
      title: "नवीन पाईपलाइन इंस्टॉलेशन ",
      description: "घरात किंवा ऑफिससाठी नवीन पाईप्स बसवणे",
      image: "/images/plumber3.jpeg",
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "बाथरूम व टॉयलेट फिटिंग्स ",
      description: "शॉवर, नळ, फ्लश इत्यादींची अचूक बसवणूक ",
      image: "/images/plumber4.jpeg",
      icon: <Home className="w-6 h-6" />
    },
    {
      title: "किचन सिंक व वॉटर फिल्टर इंस्टॉलेशन ",
      description: "स्वयंपाकघरात सिंक व फिल्टरची सुरक्षित बसवणूक. ",
      image: "/images/plumber5.jpeg",
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "वॉटर टँक क्लिनिंग आणि पाइप फ्लशिंग ",
      description: "पाण्याच्या टाकीची स्वच्छता आणि पाईपमध्ये जमा झालेला कचरा काढणे",
      image: "/images/plumber6.jpeg",
      icon: <Building className="w-6 h-6" />
    },
    {
      title: "जलमापन उपकरणे बसवणे (Water meters) ",
      description: "पाण्याच्या वापरासाठी अचूक मोजमाप करणारी उपकरणे लावणे.",
      image: "/images/plumber7.jpeg",
      icon: <Clock className="w-6 h-6" />
    }
  ];

  const handleBookNowClick = () => {
    if (isAuthenticated()) {
      setIsBookingFormOpen(true);
    } else {
      setRedirectAfterLogin('/plumber-services');
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-white text-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-transparent to-blue-100/30 "></div>
        <div className="relative container mx-auto px-2 py-4 flex flex-row items-center justify-between gap-2 md:gap-8 min-h-[220px] md:min-h-[350px]">
          <div className="flex-1 flex flex-col justify-center items-center text-center space-y-2 sm:space-y-4 ml-5">
            <h1 className="text-xl sm:text-3xl md:text-5xl font-bold leading-tight">
              विश्वासार्ह आणि तत्काळ 
              <span className="block mt-1 sm:mt-3"> प्लंबिंग सेवा</span>
            </h1>
            <p className="text-sm sm:text-lg md:text-2xl opacity-90 text-blue-900">तुमच्या घरासाठी, तुमच्याच शहरात !</p>
            <p className="text-xs sm:text-base md:text-lg font-bold text-black">१ तासात सेवा, तुमच्या दारात !</p>
            <button 
              onClick={handleBookNowClick}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 sm:px-8 sm:py-3 rounded-full flex items-center gap-2 text-sm sm:text-base"
            >
              BOOK NOW
            </button>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <img
              src="/images/plumber1.png"
              alt="Professional Electrician"
              className="w-40 h-auto sm:w-40 md:w-64 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto px-4 py-2">
        <div className="text-center mb-5">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mt-3">आमच्या सेवा (Our Services)</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-15 max-w-7xl mx-auto ">          {services.map((service, index) => (
            <div key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden rounded-lg">
              <div className="relative h-34 md:h-50 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <img 
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>
              <div className="p-2 ">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>






      
        {/* Text Column */}
      <section className="flex justify-center py-8 px-2 sm:px-4 md:px-8 lg:px-12 xl:px-20">
        <div className="flex flex-row items-center gap-4 lg:gap-8 max-w-4xl w-full bg-gradient-to-r from-blue-50 via-white to-blue-100 rounded-2xl shadow-lg border border-blue-100">
       
          <div className="flex-1 flex flex-col justify-center items-start text-left space-y-2 sm:space-y-4 p-4 md:p-8">
          <h1 className="text-xl sm:text-3xl md:text-xl font-bold text-blue-900 leading-relaxed">
      <span className="text-blue-600 text-2xl md:text-3xl font-bold">Realtor Xpert <span className="text-black font-bold text-2xl">प्लंबिंग सेवा</span></span>
    </h1>
    
    <span className="text-black ml-3 font-bold ">- विश्वासार्ह सेवा, तत्काळ समाधान</span>
    <button
      onClick={handleBookNowClick}
      className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 sm:px-8 mt-5 sm:py-3 rounded-full flex items-center gap-2 text-sm sm:text-base"
    >
      BOOK NOW
    </button> 
          </div>
          {/* Image Column */}
          <div className="flex-1 flex justify-center items-center p-4 md:p-8">
            <img
              src="/images/electrician_8.png"
              alt="Electrician Repairing"
              className="w-40 md:w-56 lg:w-64 h-60 md:h-72 lg:h-80 object-cover rounded-xl shadow-xl border border-blue-200 bg-white"
            />
          </div>
        </div>
      </section>


{/* Testimonials Section */}
<section className="py-12 bg-gradient-to-b from-white to-blue-50">
        <h3 className="text-xl md:text-4xl font-bold text-center text-blue-800 mb-8">आमच्या समाधानी ग्राहकांचे अनुभव</h3>
        <div className="flex flex-col items-center justify-center p-2 max-w-90  sm:max-w-lg mx-auto">
          <Carousel
            showArrows={false}
            showThumbs={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={5000}
            showIndicators={false}
            className="bg-white dark:bg-base-300 p-1 max-w-100 w-full rounded-lg shadow-lg"
          >
            {/* Testimonial 1 */}
            <div className="p-4 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                <img src="/images/shop.png" alt="Client 1" className="w-full h-full object-cover" />
              </div>
              <h4 className="font-bold text-black dark:text-white">The Online Food Hub</h4>
              <p className="text-sm text-black dark:text-white text-center">"Testimonials are short quotes from people. who love your brand. It's a great way to convince customers to try your services. "</p>
              <div className="flex mt-2">
                {Array(5).fill(0).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
            </div>
            {/* Testimonial 2 */}
            <div className="p-4 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                <img src="/images/r1.png" alt="Client 2" className="w-full h-full object-cover" />
              </div>
              <h4 className="font-bold text-black dark:text-white">Food Pyramid Co. </h4>
              <p className="text-sm text-black dark:text-white text-center">"Testimonials are short quotes from people who love your brand. It's a great way to convince customers to try your services. "</p>
              <div className="flex mt-2">
                {Array(5).fill(0).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
            </div>
            {/* Testimonial 3 */}
            <div className="p-4 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                <img src="/images/r2.png" alt="Client 3" className="w-full h-full object-cover" />
              </div>
              <h4 className="font-bold text-black dark:text-white">Jul & Sons Co.</h4>
              <p className="text-sm text-black dark:text-white text-center">"Testimonials are short quotes from people who love your brand. It's a great way to convince customers to try your services."</p>
              <div className="flex mt-2">
                {Array(5).fill(0).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
            </div>
          </Carousel>
        </div>
      </section>



     {/* Service Booking Form */}
     {isBookingFormOpen && (
       <ServiceBookingForm 
         isOpen={isBookingFormOpen}
         onClose={() => setIsBookingFormOpen(false)}
         serviceType="plumber"
       />
     )}
    <Footer />
    </div>
   

   
  );
};

export default PlumberServices;