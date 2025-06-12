import React, { useEffect } from 'react';
import './App.css'
import { Routes, Route, useLocation } from 'react-router';
import HomePage from './Pages/HomePage/HomePage';
import Properties from './Pages/Properties/Properties';
import PropertyDetails from './Pages/PropertyDetails/PropertyDetails';
import SevicesForm from './Pages/ServicesFrom/SevicesFrom';
import ContactInfo from '../contact/contact';
import JanmashtamiPackages from './Pages/JanmashtamiPackages/JanmashtamiPackages';
import ElectricianServices from './Pages/ElectricianServices/ElectricianServices';
import PlumberServices from './Pages/PlumberServices/PlumberServices';
import HomeLoanServices from './Pages/HomeLoanServices/HomeLoanServices';
import ContracterServices from './Pages/ContracterServices/ContracterServices';
import CleaningServices from './Pages/CleaningServices/CleaningServices';
import ManoramNagriServices from './Pages/ManoramNagri/ManoramNagriServices';
import Navbar from './Components/Navbar/Navbar';
import LoginPage from './Pages/LoginPage/LoginPage';
import HomeInteriorsArchitecture from './Pages/Home_Interiors_Architecture/Home_Interiors_Architecture';

function App() {
  const location = useLocation();
  const mainContentRef = React.useRef(null);

  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  return (
    <div className="h-[100dvh] w-screen overflow-y-auto">
      <Navbar />
      <div ref={mainContentRef} className="h-[90dvh] overflow-auto scroll-smooth">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/contact" element={<ContactInfo />} />
          <Route path="/propertyDetails" element={<PropertyDetails />} />
          <Route path="/services" element={<SevicesForm />} />
          <Route path="/janmashtami-packages" element={<JanmashtamiPackages />} />
          <Route path="/electrician-services" element={<ElectricianServices />} />
          <Route path="/plumber-services" element={<PlumberServices />} />
          <Route path="/loan-services" element={<HomeLoanServices />} />
          <Route path="/contracter-services" element={<ContracterServices />} />
          <Route path="/cleaning-services" element={<CleaningServices />} />
          <Route path="/manoram-nagri-services" element={<ManoramNagriServices />} />
          <Route path="/architecture-services" element={<HomeInteriorsArchitecture />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
