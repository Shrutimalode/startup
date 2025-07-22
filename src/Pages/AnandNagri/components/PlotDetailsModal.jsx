import React from 'react';
import { plotData } from '../data/plotDetails';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, setRedirectAfterLogin } from '../../../Utils/AuthData';
import { X } from 'lucide-react';

const PlotDetailsModal = ({ plotId, onClose }) => {
  const navigate = useNavigate();
  const plot = plotData[plotId];

  if (!plot) return null;

  const handleBookNowClick = () => {
    if (isAuthenticated()) {
      // Handle booking logic here
      onClose();
    } else {
      setRedirectAfterLogin('/anand-nagri-services');
      navigate('/login');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Plot {plot.plotNumber}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Status</span>
            <span className={`px-3 py-1 rounded-full ${
              plot.status === 'available' ? 'bg-green-100 text-green-800' :
              plot.status === 'pending' ? 'bg-orange-100 text-orange-800' :
              'bg-red-100 text-red-800'
            }`}>
              {plot.status.charAt(0).toUpperCase() + plot.status.slice(1)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Size</span>
            <span className="font-medium text-gray-800">{plot.area} sq ft</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Dimensions</span>
            <span className="font-medium text-gray-800">{plot.dimensions}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Facing</span>
            <span className="font-medium text-gray-800">{plot.facing}</span>
          </div>

          {plot.status === 'available' && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Price</span>
              <span className="font-medium text-gray-800">₹{plot.price}</span>
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Features</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Road Width: 40 ft
              </li>
              <li className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Ready for Construction
              </li>
              <li className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                {plot.facing} Facing
              </li>
            </ul>
          </div>

          {plot.status === 'available' && (
            <button
              onClick={handleBookNowClick}
              className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Book Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlotDetailsModal; 