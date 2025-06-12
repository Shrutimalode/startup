import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import ServiceBookingForm from '../../Components/ServiceBookingForm/ServiceBookingForm';
import { isAuthenticated, setRedirectAfterLogin } from '../../Utils/AuthData';

const HomeInteriorsArchitecture = () => {
  const navigate = useNavigate();
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);

  const handleBookNow = () => {
    if (isAuthenticated()) {
      setIsBookingFormOpen(true);
    } else {
      setRedirectAfterLogin('/architecture-services');
      navigate('/login');
    }
  };

  return (
    <>
      <div className="flex flex-row items-start bg-gradient-to-b from-[#dbe9f6] to-[#f0f4f9] py-0 mb-0">
        <div className="flex-1 text-center mb-0 py-0 md:py-20">
          <div className="text-3xl md:text-6xl text-[#8B4513] font-serif leading-tight font-bold mt-5 md:mt-30 ">आर्किटेक्चरल & इंटीरियर डिज़ाइन</div>
          <p className="text-sm md:text-2xl text-[#8B4513] leading-tight font-serif ml-10 mr-10 mt-3">घर नव्हे, एक कलाकृती उभारूया</p>
          <div className="border-t-1 border-[#8B4513] md:w-44 w-24 mx-auto mt-1 mb-0"></div>
          <button 
            onClick={handleBookNow}
            className="bg-[#8B4505] hover:bg-yellow-600 text-white font-semibold px-6 py-2 sm:px-8 sm:py-3 rounded-full flex items-center gap-2 text-sm sm:text-base mt-3 ml-10 md:ml-75"
          >
            Book Now
          </button>
        </div>
        <div className="flex-1 flex justify-center items-center overflow-hidden ml-0 md:ml-5 mt-0">
          <img
            src="/images/home1.png"
            alt="Modern House"
            className="w-full h-auto block rounded-tl-[60px] rounded-tr-[60px] mt-7"
          />
        </div>
      </div>

      {/* About Me Section */}
      <div className="flex flex-col md:flex-row items-start bg-gradient-to-b from-[#f0f4f9] to-[#ffffff] py-0">
        {/* Mobile-specific content: image and heading */}
        <div className="w-full md:hidden">
          <div className="w-full flex justify-end">
            <img
              src="/images/home2.png"
              alt="About Me"
              className="w-48 h-auto rounded-bl-[60px] rounded-br-[60px]"
            />
          </div>
          <h2 className=" text-left text-3xl text-gray-800 font-bold leading-tight text-center">About Me</h2>
        </div>

        {/* Text Content */}
        <div className="flex-1 text-left md:text-center mb-0 md:mb-0 py-0 md:py-20 md:order-first">
          <p className="text-sm text-left font-semibold text-gray-500 uppercase tracking-wide ml-1 md:ml-10">WHO I AM</p>
          <div className="border-t-1 border-[#8B4513] w-15 ml-2 md:ml-11 mb-5 mb-1 md:mb-20 "></div>
          {/* Desktop-specific heading, hidden on mobile */}
          <h2 className="hidden md:block text-3xl md:text-5xl text-gray-800 font-bold leading-tight mt-0 mb-0 ml-5">About Me</h2>
          <p className="ml-3 mr-3 md:ml-10 md:mr-10 text-base md:text-xl text-gray-700 leading-relaxed mt-0 mb-0">
            मी एक आर्किटेक्ट आणि इंटिरियर डिझायनर आहे. घरांना केवळ आकारच नाही, तर आत्मा देण्याचा प्रयत्न करतो. आधुनिक तंत्रज्ञान आणि सौंदर्यशास्त्र यांचा समतोल राखून, तुमचं स्वप्न साकार करणं हेच माझं ध्येय आहे.
          </p>
        </div>

        {/* Desktop Image (shown only on desktop) */}
        <div className="flex-1 hidden md:flex justify-center items-center overflow-hidden ml-0 md:ml-5 mt-0 md:mt-0">
          <img
            src="/images/home2.png"
            alt="About Me"
            className="w-full h-auto rounded-bl-[60px] rounded-br-[60px]"
          />
        </div>
      </div>

      {/* Selected Works Section */}
      <div className="w-full bg-gradient-to-b from-[#f0f4f9] to-[#ffffff] py-10 px-5">
        <h2 className="text-3xl md:ml-10 md:text-3xl text-[#8B4513] font-bold mb-10">Selected Works</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {/* Work Item 1: Salon and Spa */}
          <div className="flex flex-col items-center text-center">
            <div className="overflow-hidden rounded-xl shadow-lg mb-4 h-48 w-full">
              <img src="/images/interior1.jpeg" alt="Salon and Spa" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold text-[#8B4513]">Salon and Spa</h3>
            <p className="text-md text-[#8B4513]">A 700-square-meter commercial space</p>
          </div>

          {/* Work Item 2: Vacation Home */}
          <div className="flex flex-col items-center text-center">
            <div className="overflow-hidden rounded-xl shadow-lg mb-4 h-48 w-full">
              <img src="/images/interior2.png" alt="Vacation Home" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold text-[#8B4513]">Vacation Home</h3>
            <p className="text-md text-[#8B4513]">A California-style three-bedroom home</p>
          </div>

          {/* Work Item 3: Condominium Unit */}
          <div className="flex flex-col items-center text-center">
            <div className="overflow-hidden rounded-xl shadow-lg mb-4 h-48 w-full">
              <img src="/images/interior3.jpeg" alt="Condominium Unit" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold text-[#8B4513]">Condominium Unit</h3>
            <p className="text-md text-[#8B4513]">A 2,000-square-meter condominium unit</p>
          </div>

          {/* Work Item 4: Dormitory */}
          <div className="flex flex-col items-center text-center">
            <div className="overflow-hidden rounded-xl shadow-lg mb-4 h-48 w-full">
              <img src="/images/interior4.jpeg" alt="Dormitory" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold text-[#8B4513]">Dormitory</h3>
            <p className="text-md text-[#8B4513]">A two-story dormitory inside a university</p>
          </div>

          {/* Work Item 5: Commercial-Residential Tower */}
          <div className="flex flex-col items-center text-center">
            <div className="overflow-hidden rounded-xl shadow-lg mb-4 h-48 w-full">
              <img src="/images/interior5.jpeg" alt="Commercial-Residential Tower" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold text-[#8B4513]">Commercial-Residential Tower</h3>
            <p className="text-md text-[#8B4513]">A 30-story high-rise building in the city</p>
          </div>

          {/* Work Item 6: Tropical Resort */}
          <div className="flex flex-col items-center text-center">
            <div className="overflow-hidden rounded-xl shadow-lg mb-4 h-48 w-full">
              <img src="/images/interior6.jpeg" alt="Tropical Resort" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold text-[#8B4513]">Tropical Resort</h3>
            <p className="text-md text-[#8B4513]">A beach resort offering villas and pools</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="w-full bg-gradient-to-b from-[#ffffff] to-[#f0f4f9] py-10 px-5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Testimonial 1 */}
          <div className="flex flex-row items-start bg-white p-6 rounded-lg shadow-md">
            <div className="flex-1 text-left mr-4">
              <p className="text-gray-700 text-base md:text-xl leading-relaxed mb-4">"Wanda is a wonderful agent. She has helped me and my family find the perfect home. She is always patient and kind with us. Her assistance made us feel truly valued and cared for."</p>
              <p className="text-[#E07B39] font-bold uppercase text-md">ELLEN DOWNING</p>
              <p className="text-gray-500 text-sm">Long-time client</p>
            </div>
            <div className="flex-shrink-0">
              <img src="/images/person1.jpg" alt="Ellen Downing" className="w-20 h-20 rounded-full object-cover shadow-lg" />
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="flex flex-row items-start bg-white p-6 rounded-lg shadow-md">
            <div className="flex-1 text-left mr-4">
              <p className="text-gray-700 text-base md:text-xl leading-relaxed mb-4">"Wanda is a highly respected real estate agent. It was a delight to have her help us in our house hunting. She listens intently and understands our needs and wants."</p>
              <p className="text-[#E07B39] font-bold uppercase text-md">KIAN GRAHAM</p>
              <p className="text-gray-500 text-sm">Recent client</p>
            </div>
            <div className="flex-shrink-0">
              <img src="/images/person2.jpg" alt="Kian Graham" className="w-20 h-20 rounded-full object-cover shadow-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Service Booking Form */}
      <ServiceBookingForm 
        isOpen={isBookingFormOpen}
        onClose={() => setIsBookingFormOpen(false)}
        options={["architecture", "interior designer"]}
      />
    </>
  );
};

export default HomeInteriorsArchitecture;