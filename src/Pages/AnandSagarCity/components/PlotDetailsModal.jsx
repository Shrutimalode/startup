import React from 'react';
import { plotData } from '../data/plotDetails';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, setRedirectAfterLogin } from '../../../Utils/AuthData';

const getStatusColor = (status) => {
  switch (status) {
    case 'available':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'booked':
      return 'bg-red-100 text-red-800';
    case 'open_space':
      return 'bg-green-100 text-green-800';
    case 'amenity':
      return 'bg-pink-100 text-pink-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const PlotDetailsModal = ({ plotId, onClose }) => {
  const navigate = useNavigate();
  if (!plotId || !plotData[plotId]) return null;
  
  const plot = plotData[plotId];

  const handleBookNowClick = () => {
    if (isAuthenticated()) {
      // Handle booking logic here
      onClose();
    } else {
      setRedirectAfterLogin('/anand-sagar-city-services');
      navigate('/login');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Plot {plot.plotNumber}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-gray-200/50">
            <span className="text-gray-600">Status</span>
            <span className={`px-3 py-1 rounded-full ${getStatusColor(plot.status)}`}>
              {plot.status.charAt(0).toUpperCase() + plot.status.slice(1)}
            </span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-200/50">
            <span className="text-gray-600">Size</span>
            <span className="font-medium text-gray-800">{plot.area}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-200/50">
            <span className="text-gray-600">Dimensions</span>
            <span className="font-medium text-gray-800">{plot.dimensions}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-200/50">
            <span className="text-gray-600">Facing</span>
            <span className="font-medium text-gray-800">{plot.facing}</span>
          </div>

          {plot.price && (
            <div className="flex justify-between items-center py-2 border-b border-gray-200/50">
              <span className="text-gray-600">Price</span>
              <span className="font-medium text-gray-800">₹{plot.price}</span>
            </div>
          )}
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Features</h3>
          <ul className="space-y-2">
            {plot.features.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-600">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex justify-end">
          {plot.status === 'available' ? (
            <button 
              onClick={handleBookNowClick}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Book Now
            </button>
          ) : plot.status === 'pending' ? (
            <button 
              onClick={handleBookNowClick}
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Join Waitlist
            </button>
          ) : (
            <button className="bg-gray-300 text-gray-500 px-6 py-2 rounded-lg cursor-not-allowed">
              Already Booked
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlotDetailsModal; 