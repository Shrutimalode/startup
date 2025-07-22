import React from 'react';
import { useState } from 'react';
import { PlotOverlay } from './PlotOverlay';
import PlotDetailsModal from './PlotDetailsModal';
import { plotDetails } from '../data/plotDetails';

const plotStatus = {
  // Section A
  'A-1': 'available',
  
  // Section B
  'B-1': 'available',
  
  // Section C
  'C-1': 'available',
  
  // Section D (Left Column)
  'D-1': 'available', 'D-2': 'pending', 'D-3': 'booked', 'D-4': 'available',
  'D-5': 'pending', 'D-6': 'available', 'D-7': 'booked', 'D-8': 'available',
  'D-9': 'pending', 'D-10': 'available', 'D-11': 'booked', 'D-12': 'available',
  
  // Section E (Middle Column)
  'E-1': 'pending', 'E-2': 'available', 'E-3': 'booked', 'E-4': 'available',
  'E-5': 'pending', 'E-6': 'available', 'E-7': 'booked', 'E-8': 'available',
  'E-9': 'pending', 'E-10': 'available', 'E-11': 'booked', 'E-12': 'available',
  'E-13': 'pending', 'E-14': 'available',
  
  // Section F (Right Column)
  'F-1': 'available', 'F-2': 'booked', 'F-3': 'available', 'F-4': 'pending',
  'F-5': 'available', 'F-6': 'booked'
};

const PlotLayout = ({ image, onClose, isOpen }) => {
  const [selectedPlot, setSelectedPlot] = useState(null);

  if (!isOpen) return null;

  const handlePlotClick = (plotNumber) => {
    setSelectedPlot(plotNumber);
  };

  const handleCloseModal = () => {
    setSelectedPlot(null);
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 overflow-hidden flex items-center justify-center">
      <div className="absolute top-4 right-4 z-50">
        <button 
          onClick={onClose}
          className="bg-white/10 p-2 rounded-full text-white hover:bg-white/20 text-2xl transition-all"
        >
          ×
        </button>
      </div>

      {/* Fixed Position Elements */}
      <div className="fixed top-4 right-20 z-50">
        <div className="bg-white/10 p-4 rounded-lg">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="white" />
              </marker>
            </defs>
            <line
              x1="10"
              y1="90"
              x2="10"
              y2="10"
              stroke="white"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
            <line
              x1="10"
              y1="90"
              x2="90"
              y2="90"
              stroke="white"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
            <text x="95" y="95" fontSize="12" fill="white">E</text>
            <text x="5" y="5" fontSize="12" fill="white">N</text>
          </svg>
        </div>
      </div>

      {/* Scrollable Container */}
      <div className="relative w-full h-full overflow-auto p-4">
        <div className="min-h-min w-full flex items-center justify-center p-4">
          <div className="relative max-w-[90%] mx-auto">
            <img 
              src={image} 
              alt="Plot Layout"
              className="w-full h-auto object-contain rounded-lg"
            />
            
            {/* SVG Overlay */}
            <PlotOverlay 
              onPlotClick={handlePlotClick}
              plotStatus={plotStatus}
            />
          </div>
        </div>
      </div>

      {/* Plot Details Modal */}
      {selectedPlot && (
        <PlotDetailsModal
          plotId={selectedPlot}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default PlotLayout; 