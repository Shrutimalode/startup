import React from 'react';
import Footer from '../../Components/Footer/Footer';

const JanmashtamiPackages = () => {
  const packages = [
    {
      id: 1,
      title: "जन्माष्टमी होम डेकोरेशन",
      image: "/images/home_decor.jpg",
      features: [
        "लाइटिंग, फुलांची तोरणं, रांगोळी, पालखी, झुला सजावट",
        "पारंपरिक आणि आधुनिक थीम्स तुमच्या पसंतीनुसार"
      ]
    },
    {
      id: 2,
      title: "डिनर मील पैकेज",
      image: "/images/dinner.jpg",
      features: [
        "स्वादिष्ट शाकाहारी भोजन",
        "मेनू मध्ये श्रीखंड, पुरी, बासुंदी, पिठले-भाकरी व इतर पारंपरिक पदार्थ"
      ]
    },
    {
      id: 3,
      title: "WALL PAINTING / होम क्लिनिंग",
      images: ["/images/wallpainter.jpeg", "/images/house_cleaning.jpg"],
      features: [
        "सणानिमित्त घराची खोलीनुसार संपूर्ण स्वच्छता",
        "बाथरूम, किचन, फ्लोअर, खिडक्या - सर्व काही झळझळीत!",
        "प्रोफेशनल टूल्स आणि अनुभव असलेली टीम"
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen  flex flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-row items-center justify-between px-2 sm:px-4 md:px-16 py-4 sm:py-8 bg-gradient-to-r from-orange-100 to-orange-50">
        {/* Festoon */}
        <div className="absolute top-0 left-0 w-full md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/3 md:w-auto z-10">
          <img 
            src="/images/festoon.png" 
            alt="Festive Decoration"
            className="w-full h-auto md:h-42 md:w-auto md:object-contain object-cover"
          />
        </div>
        
        <div className="flex-1 flex flex-col justify-center items-start sm:space-y-2">
          <h1 className="text-3xl sm:text-3xl md:text-5xl md:mt-10 md:ml-30 font-bold text-orange-900 leading-tight text-center mt-10">
            जन्माष्टमी स्पेशल पॅकेज
          </h1>
          <p className="text-sm sm:text-lg md:text-2xl md:ml-30 opacity-90 text-orange-700 text-center">
            तयारी आम्ही करू, उत्सव तुम्ही साजरा करा!
          </p>
          <div className="flex justify-center">
            <button className="ml-10 md:ml-60 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-3 py-1 sm:px-8 sm:py-3 rounded-full flex items-center gap-2 text-sm sm:text-base mt-2">
              BOOK NOW
            </button>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <img
            src="/images/krishna.jpg"
            alt="Krishna"
            className="w-32 h-44 sm:w-40 sm:h-54 md:w-74 md:h-74 md:ml-20 md:mt-10 object-contain"
          />
        </div>
      </section>

      {/* Services Section */}
      <div className="container mx-auto px-4 py-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">आमच्या सेवा (Our Services)</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-20 mb-6">
          {packages.map((pkg) => (
            <div key={pkg.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden rounded-lg flex flex-col h-full">
              <div className="relative h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                {pkg.images ? (
                  <div className="flex w-full h-full">
                    {pkg.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={pkg.title}
                        className="w-1/2 h-full object-cover m-0 p-0"
                        style={{margin:0,padding:0}}
                      />
                    ))}
                  </div>
                ) : (
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>
              <div className="p-4 flex flex-col flex-grow justify-between">
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-gray-800 group-hover:text-orange-600 transition-colors">{pkg.title}</h3>
                  <ul className="space-y-1">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                        <span className="text-orange-500">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-center">
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-full w-40 mt-4">
                    BOOK NOW
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section className="flex justify-center py-8 px-2 sm:px-4 md:px-8 lg:px-12 xl:px-20">
        <div className="flex flex-row md:flex-row items-center gap-4 lg:gap-8 max-w-4xl w-full bg-white rounded-2xl shadow-lg border border-orange-100">
          <div className="flex-1 flex flex-col justify-center items-start text-left space-y-2 sm:space-y-4 p-4 md:p-8">
            <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-orange-900 leading-relaxed">
              <span>आमची वैशिष्ट्ये</span>
              <span className="block text-base text-orange-700 font-semibold">(Why Choose Us?)</span>
            </h1>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-orange-500">✓</span>
                <span className="text-gray-700 font-medium">अनुभवसंपन्न तज्ञ</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-orange-500">✓</span>
                <span className="text-gray-700 font-medium">वेगवान प्रतिसाद</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-orange-500">✓</span>
                <span className="text-gray-700 font-medium">ऑनलाइन बुकिंग व कस्टमर सपोर्ट</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-orange-500">✓</span>
                <span className="text-gray-700 font-medium">प्रामाणिक दर आणि खात्रीशीर सेवा</span>
              </div>
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center p-4 md:p-8">
            <img
              src="/images/bottomkrishna.png"
              alt="Krishna"
              className="w-50 h-50 md:w-56 lg:w-64 h-60 md:h-72 lg:h-80 object-contain "
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JanmashtamiPackages; 