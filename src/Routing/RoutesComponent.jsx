import React from 'react';
import { Routes, Route } from 'react-router';
import HomePage from '../Pages/HomePage/HomePage';
import Navbar from '../Components/Navbar/Navbar';
import Properties from '../Pages/Properties/Properties';
import PropertyDetails from '../Pages/PropertyDetails/PropertyDetails';
import SevicesForm from '../Pages/ServicesFrom/SevicesFrom';
import ContactInfo from '../../contact/contact';
import JanmashtamiPackages from '../Pages/JanmashtamiPackages/JanmashtamiPackages';
import ElectricianServices from '../Pages/ElectricianServices/ElectricianServices';
import PlumberServices from '../Pages/PlumberServices/plumberservices';
import HomeLoanServices from '../Pages/HomeLoanServices/HomeLoanServices';
import ContracterServices from '../Pages/ContracterServices/ContracterServices';
const RoutesComponent = () => {
    return (
        <div className="h-[100dvh] w-screen overflow-y-auto">
           <Navbar/> 
           <div className="h-[90dvh] overflow-auto">
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/properties" element={<Properties/>} />
                <Route path="/contact" element={<ContactInfo/>} />
                <Route path="/propertyDetails" element={<PropertyDetails/>} />
                <Route path="/services" element={<SevicesForm/>} />
                <Route path="/janmashtami-packages" element={<JanmashtamiPackages/>} />
                <Route path="/electrician-services" element={<ElectricianServices />} />
                <Route path="/plumber-services" element={<PlumberServices />} />
                <Route path="/loan-services" element={<HomeLoanServices />} />
                <Route path="/contracter-services" element={<ContracterServices />} />
                <Route path="*" element={<>Not Found</>} />
            </Routes>
           </div>
        </div>
    );
};

export default RoutesComponent;