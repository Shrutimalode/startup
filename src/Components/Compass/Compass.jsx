import React, { useState, useEffect } from 'react';

const Compass = ({ className = '' }) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    // Check if the device supports DeviceOrientationEvent
    if (window.DeviceOrientationEvent) {
      const handleOrientation = (event) => {
        // Alpha represents the compass direction (in degrees)
        if (event.alpha !== null) {
          setRotation(360 - event.alpha); // Convert to clockwise rotation
        }
      };

      window.addEventListener('deviceorientation', handleOrientation, true);

      return () => {
        window.removeEventListener('deviceorientation', handleOrientation, true);
      };
    }
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Outer circle */}
      <div className="w-24 h-24 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border-2 border-gray-200 flex items-center justify-center">
        {/* Inner circle with cardinal directions */}
        <div 
          className="w-20 h-20 rounded-full bg-white relative"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {/* Cardinal directions */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* North */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-600 font-bold">N</div>
            {/* South */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-gray-600 font-bold">S</div>
            {/* East */}
            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 text-gray-600 font-bold">E</div>
            {/* West */}
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-600 font-bold">W</div>
          </div>

          {/* Compass needle */}
          <div className="absolute inset-0">
            {/* North pointer (red) */}
            <div className="absolute top-1/2 left-1/2 w-1 h-8 bg-red-600 -translate-x-1/2 -translate-y-full origin-bottom" 
                 style={{ clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' }} />
            {/* South pointer (white) */}
            <div className="absolute top-1/2 left-1/2 w-1 h-8 bg-gray-400 -translate-x-1/2 origin-top" 
                 style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
          </div>

          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-gray-800 rounded-full -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Degree indicator */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full mt-2 text-sm font-medium text-gray-600">
        {Math.round(rotation)}°
      </div>
    </div>
  );
};

export default Compass; 