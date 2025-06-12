import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import { PlotOverlay } from './PlotOverlay';
import PlotDetailsModal from './PlotDetailsModal';

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
    <div className="fixed inset-0 bg-black/90 z-[10000]">
      {/* Header Controls */}
      <div className="fixed top-0 left-0 right-0 z-[10001] flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent">
        {/* Zoom Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => adjustZoom(-0.1)}
            className="bg-white/10 p-2 rounded-full text-white hover:bg-white/20 transition-all"
            title="Zoom Out"
          >
            <ZoomOut size={20} />
          </button>
          <span className="text-white/80 text-sm">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={() => adjustZoom(0.1)}
            className="bg-white/10 p-2 rounded-full text-white hover:bg-white/20 transition-all"
            title="Zoom In"
          >
            <ZoomIn size={20} />
          </button>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="bg-white/10 p-2 rounded-full text-white hover:bg-white/20 transition-all"
          title="Close"
        >
          <X size={24} />
        </button>
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
            {/* Compass - Positioned relative to plot layout */}
            <div className="absolute -top-2 -right-2 sm:top-4 sm:right-4 z-10 scale-50 sm:scale-75 lg:scale-100 origin-top-right">
              <div className="bg-white p-2 sm:p-4 rounded-lg shadow-lg">
                <svg width="80" height="80" viewBox="0 0 100 100">
                  <defs>
                    <marker
                      id="arrowhead-zoomed"
                      markerWidth="10"
                      markerHeight="7"
                      refX="9"
                      refY="3.5"
                      orient="auto"
                    >
                      <polygon points="0 0, 10 3.5, 0 7" fill="black" />
                    </marker>
                  </defs>
                  <line
                    x1="10"
                    y1="90"
                    x2="10"
                    y2="10"
                    stroke="black"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead-zoomed)"
                  />
                  <line
                    x1="10"
                    y1="90"
                    x2="90"
                    y2="90"
                    stroke="black"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead-zoomed)"
                  />
                  <text x="95" y="95" fontSize="12" fill="black">E</text>
                  <text x="5" y="5" fontSize="12" fill="black">N</text>
                </svg>
              </div>
            </div>

            {/* Plot Layout */}
            <div 
              className="relative bg-gray-100 rounded-lg shadow-lg transition-transform duration-200 h-full"
              style={{ 
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'center center'
              }}
            >
              <PlotOverlay onPlotClick={handlePlotClick} />
            </div>
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