import React, { useState } from 'react';
import { Phone, CheckCircle, Wrench, Zap, Home, Building, Shield, Clock } from 'lucide-react';
import Footer from '../../Components/Footer/Footer';
import ServiceBookingForm from '../../Components/ServiceBookingForm/ServiceBookingForm';
import { Carousel } from "react-responsive-carousel";
const ElectricianServices = () => {
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const services = [
    {
      title: "वीजपुरवठा व तपासणी ",
      description: "वीजपुरवठा बंद पडल्यास तपासणी, ब्रेकर बॉक्स तपासणी, लोड मॅनेजमेंट ",
      image: "/images/electrician_1.jpeg",
      icon: <Wrench className="w-6 h-6" />
    },
    {
      title: "घरगुती वायरिंग आणि नवीन इन्स्टॉलेशन्स",
      description: "नवीन वायरिंग, लाइट्स/स्विच बोर्ड बसवणे, इंटिरिअर वायरिंग सोल्यूशन्स",
      image: "/images/electrician_2.jpeg",
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "फॅन, गिझर, मिक्सर, ग्राइंडर यांची दुरुस्ती ",
      description: "छोट्या उपकरणांची दुरुस्ती (Fan, Geyser, Mixer Grinder)",
      image: "/images/electrician_3.jpeg",
      icon: <Home className="w-6 h-6" />
    },
    {
      title: "फ्रीज व कूलिंग अप्लायन्सेस सेवा",
      description: "फ्रीज रिपेयर, डीफ्रॉस्ट समस्या, गॅस रिफिल",
      image: "/images/electrician_4.jpeg",
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "वॉशिंग मशीन व ड्रायर रिपेअर",
      description: "टॉप/फ्रंट लोड मशीन दुरुस्ती, ड्रेनेज, मोटर बदल ",
      image: "/images/electrician_5.jpeg",
      icon: <Building className="w-6 h-6" />
    },
    {
      title: "AC सर्व्हिसिंग व रिपेअर ",
      description: "सर्व्हिसिंग, गॅस रिफिल, इन्व्हर्टर AC रिपेअर, कूलिंग कमी होणे",
      image: "/images/electrician_6.jpeg",
      icon: <Clock className="w-6 h-6" />
    }
  ];

  const benefits = [
    "अनुभवसंपन्न तज्ञ",
    "वेगवान प्रतिसाद",
    "ऑनलाइन बुकिंग व कस्टमर सपोर्ट",
    "प्रामाणिक दर आणि खात्रीशीर सेवा",
    ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-white text-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-transparent to-blue-100/30"></div>
        <div className="relative container mx-auto px-2 py-4 flex flex-row items-center justify-between gap-2 md:gap-8 min-h-[220px] md:min-h-[350px]">
          <div className="flex-1 flex flex-col justify-center items-center text-center space-y-2 sm:space-y-4 ml-5">
            <h1 className="text-xl sm:text-3xl md:text-5xl font-bold leading-tight">
              इलेक्ट्रिकल व उपकरण
              <span className="block mt-1 sm:mt-3">दुरुस्ती</span>
            </h1>
            <p className="text-sm sm:text-lg md:text-2xl opacity-90 text-blue-900">घराबाहेर न पडता तज्ज्ञ सेवा तुमच्या दारात !</p>
            <p className="text-xs sm:text-base md:text-lg font-bold text-black">१ तासात सेवा, तुमच्या दारात !</p>
            <button 
              onClick={() => setIsBookingFormOpen(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 sm:px-8 sm:py-3 rounded-full flex items-center gap-2 text-sm sm:text-base"
            >
              BOOK NOW
            </button>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <img
              src="/images/electrician1.png"
              alt="Professional Electrician"
              className="w-40 h-auto sm:w-40 md:w-64 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto px-2 py-8">
        <div className="text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2 md:mb-5">आमच्या सेवा (Our Services)</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-15 max-w-7xl mx-auto ">
          {services.map((service, index) => (
            <div key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden rounded-lg">
              <div className="relative h-38 md:h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <img 
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>
              <div className="p-2 space-y-3">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
    
      {/* why choose us*/}
      <section className="flex justify-center py-8 px-2 sm:px-4 md:px-8 lg:px-12 xl:px-20">
        <div className="flex flex-row md:flex-row items-center gap-4 lg:gap-8 max-w-4xl w-full bg-gradient-to-r from-blue-50 via-white to-blue-100 rounded-2xl shadow-lg border border-blue-100">
          {/* Text Column */}
          <div className="flex-1 flex flex-col justify-center items-start text-left space-y-2 sm:space-y-4 p-4 md:p-8">
            <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-blue-900 leading-relaxed">
              <span>आमची वैशिष्ट्ये</span>
              <span className="block text-base text-blue-700 font-semibold">(Why Choose Us?)</span>
            </h1>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
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
        <div className="flex flex-col items-center justify-center p-2 max-w-90  sm:max-w-lg mx-auto">          <Carousel
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
      <ServiceBookingForm 
        isOpen={isBookingFormOpen}
        onClose={() => setIsBookingFormOpen(false)}
        serviceType="electrician"
      />

      <Footer />
    </div>
  );
};

export default ElectricianServices;