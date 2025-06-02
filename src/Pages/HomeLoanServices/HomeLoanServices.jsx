import React, { useState } from 'react';
import { Phone, CheckCircle, Wrench, Zap } from 'lucide-react';
import Footer from '../../Components/Footer/Footer';
import ServiceBookingForm from '../../Components/ServiceBookingForm/ServiceBookingForm';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HomeLoanServices = () => {
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-row items-center justify-between pl-0 pr-0 sm:pl-0 sm:pr-0 md:pl-0 md:pr-0 py-2 sm:py-1 md:py-0 bg-gradient-to-r from-blue-100 to-blue-50">
        <div className="flex-1 flex flex-col justify-center items-center text-center space-y-1 sm:space-y-2 md:space-y-1 ml-5">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-blue-900 leading-tight">
            तुमचं HOME LOANचं <br />
            स्वप्न - आमच्यासोबत <br />
            खरं करा!
          </h1>
          <p className="text-sm sm:text-base md:text-xl opacity-90 text-blue-700">घरकर्जाची खात्रीशीर आणि सोपी वाट Realtor Xpert बरोबर !</p>
          <p className="text-xs sm:text-sm md:text-base font-bold text-black mt-1">१ तासात सेवा, तुमच्या दारात !</p>
          <button 
            onClick={() => setIsBookingFormOpen(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-3 py-1 sm:px-6 sm:py-2 rounded-full flex items-center gap-2 text-sm sm:text-base mt-2"
          >
            BOOK NOW
          </button>
        </div>
        <div className="flex-1 flex justify-end items-center p-0 m-0">
          <img
            src="/images/lloan1.png"
            alt="Home image"
            className="w-full md:w-64 h-auto m-0 p-0"
          />
        </div>
      </section>

      {/* Process Section */}
      <section className="ml-5 mr-5 py-6 sm:py-10 bg-gradient-to-b from-blue-50 to-white text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900 mb-2">
          कर्ज प्रक्रिया 4 सोप्या टप्प्यात
        </h2>
        <p className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-black">आमची प्रक्रिया (Our Process)</p>
        <div className="grid grid-cols-2 sm:flex sm:flex-row justify-center gap-4 sm:gap-4 max-w-7xl mx-auto">
          {/* Card 1 */}
          <div className="flex flex-col items-center bg-gray-100 rounded-xl shadow p-2 sm:p-3 w-full sm:w-1/5 min-h-[120px] sm:min-h-[160px] mx-auto">
            <img src="/images/loan2.png" alt="Contact" className="w-20 h-16 sm:w-28 sm:h-20 mb-1 sm:mb-2" />
            <span className="font-bold text-black text-xs sm:text-base mb-1">संपर्क साधा</span>
            <span className="text-lg sm:text-xl mt-auto text-black">▼</span>
          </div>
          {/* Card 2 */}
          <div className="flex flex-col items-center bg-gray-100 rounded-xl shadow p-2 sm:p-3 w-full sm:w-1/5 min-h-[120px] sm:min-h-[160px] mx-auto">
            <img src="/images/loan3.png" alt="Documents" className="w-20 h-16 sm:w-28 sm:h-20 mb-1 sm:mb-2" />
            <span className="font-bold text-black text-xs sm:text-base mb-1">कागदपत्रांची तात्काळ तपासणी</span>
            <span className="text-lg sm:text-xl mt-auto text-black">▼</span>
          </div>
          {/* Card 3 */}
          <div className="flex flex-col items-center bg-gray-100 rounded-xl shadow p-2 sm:p-3 w-full sm:w-1/5 min-h-[120px] sm:min-h-[160px] mx-auto">
            <img src="/images/loan4.png" alt="Meeting" className="w-20 h-16 sm:w-28 sm:h-20 mb-1 sm:mb-2" />
            <span className="font-bold text-black text-xs sm:text-base mb-1">घरपोच भेट आणि अर्ज प्रक्रिया</span>
            <span className="text-lg sm:text-xl mt-auto text-black">▼</span>
          </div>
          {/* Card 4 */}
          <div className="flex flex-col items-center bg-gray-100 rounded-xl shadow p-2 sm:p-3 w-full sm:w-1/5 min-h-[120px] sm:min-h-[160px] mx-auto">
            <img src="/images/loan5.png" alt="Approval" className="w-20 h-16 sm:w-28 sm:h-20 mb-1 sm:mb-2" />
            <span className="font-bold text-black text-xs sm:text-base mb-1">मंजुरी आणि वितरण</span>
            <span className="text-lg sm:text-xl mt-auto text-black">▼</span>
          </div>
        </div>
        <p className="mt-6 sm:mt-8 text-1.5xl sm:text-3xl font-extrabold text-black">फक्त 1 तासात सुरुवात करा!</p>
      </section>

      {/* About Us Section */}
      <section className="flex flex-row gap-4 md:gap-52 py-8 px-2 md:px-80 bg-white flex-nowrap">
        <div className="flex-shrink-0 flex justify-center mb-0">
          <img src="/images/loan6.png" alt="About Us" className="w-32 md:w-90 md:max-w-md rounded shadow md:ml-20" />
        </div>
        <div className="flex-1 max-w-xl">
          <h3 className="text-lg md:text-4xl font-bold text-blue-800 mb-4 md:mb-10">आमच्याबद्दल (About Us)</h3>
          <p className="text-base md:text-2xl text-gray-700 mb-2 md:mb-4">आम्ही कोण आहोत?</p>
          <p className="text-sm md:text-xl text-gray-700">RealtorXpert मध्ये आम्ही काम करतो एजंट म्हणून, आणि तुमचं घरकर्जाचं स्वप्न पूर्ण करण्यासाठी आहोत. कमी कागदपत्रात, सोपी प्रक्रिया, आणि पूर्ण पारदर्शकतेसह आम्ही तुमच्यासोबत आहोत सुरुवातीपासून शेवटपर्यंत.</p>
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
            className="bg-bg-gray-50 p-1 max-w-100 w-full rounded-lg shadow-lg"
          >
            {/* Testimonial 1 */}
            <div className="p-4 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                <img src="/images/shop.png" alt="Client 1" className="w-full h-full object-cover" />
              </div>
              <h4 className="font-bold text-black dark:text-black">The Online Food Hub</h4>
              <p className="text-sm text-black dark:text-black text-center">"Testimonials are short quotes from people. who love your brand. It's a great way to convince customers to try your services. "</p>
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
              <h4 className="font-bold text-black dark:text-black">Food Pyramid Co. </h4>
              <p className="text-sm text-black dark:text-black text-center">"Testimonials are short quotes from people who love your brand. It's a great way to convince customers to try your services. "</p>
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
              <h4 className="font-bold text-black dark:text-black">Jul & Sons Co.</h4>
              <p className="text-sm text-black dark:text-black text-center">"Testimonials are short quotes from people who love your brand. It's a great way to convince customers to try your services."</p>
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
        serviceType="loan consultant"
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomeLoanServices;