import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import { PlotOverlay } from './PlotOverlay';
import PlotDetailsModal from './PlotDetailsModal';
import Compass from '../../../Components/Compass/Compass';

const ZoomedPlotLayout = ({ onClose }) => {
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handlePlotClick = (plotId) => {
    if (!isDragging) {
      setSelectedPlot(plotId);
    }
  };

  const adjustZoom = (increment) => {
    const newZoom = Math.max(0.3, Math.min(1.5, zoomLevel + increment));
    setZoomLevel(newZoom);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-hidden">
      {/* Controls */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
        <button 
          onClick={() => adjustZoom(0.1)}
          className="bg-gray-100 p-2 rounded-full text-gray-700 hover:bg-gray-200 transition-all"
          title="Zoom In"
        >
          <ZoomIn className="w-6 h-6" />
        </button>
        <button 
          onClick={() => adjustZoom(-0.1)}
          className="bg-gray-100 p-2 rounded-full text-gray-700 hover:bg-gray-200 transition-all"
          title="Zoom Out"
        >
          <ZoomOut className="w-6 h-6" />
        </button>
        <button 
          onClick={onClose}
          className="bg-gray-100 p-2 rounded-full text-gray-700 hover:bg-gray-200 transition-all"
          title="Close"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Compass */}
      <div className="fixed top-4 left-4 z-50">
        <Compass />
      </div>

      {/* Main Content Container with Scrolling */}
      <div 
        className="w-full h-screen overflow-auto cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Plot Layout Container */}
        <div 
          className="min-h-full min-w-full flex items-center justify-center p-4 sm:p-8"
          style={{
            height: `${Math.max(100, 100 * zoomLevel)}vh`,
            width: `${Math.max(100, 100 * zoomLevel)}vw`,
          }}
        >
          <div 
            className="relative w-[70vw] h-[55vh] mx-auto"
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`,
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
          >
            <PlotOverlay onPlotClick={handlePlotClick} />
          </div>
        </div>
      </div>

      {/* Plot Details Modal */}
      {selectedPlot && (
        <PlotDetailsModal
          plotId={selectedPlot}
          onClose={() => setSelectedPlot(null)}
        />
      )}
    </div>
  );
};

export default ZoomedPlotLayout; 