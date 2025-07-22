import React, { useState } from 'react';
import { plotData } from '../data/plotDetails';
import { allSvgPaths } from '../data/allSvgPaths';


// Helper function to calculate the centroid of a path
const calculateCentroid = (pathD) => {
  const coordinates = pathD.split(/[MLZHVCSQTAZ]/i).filter(Boolean).map(coord => 
    coord.trim().split(/[,\\s]+/).map(Number)
  ).flat(); // Flatten to get a single array of all numbers

  let sumX = 0;
  let sumY = 0;
  let count = 0;
  
  coordinates.forEach(coord => {
    for (let i = 0; i < coord.length; i += 2) {
      if (!isNaN(coord[i]) && !isNaN(coord[i + 1])) {
        sumX += coord[i];
        sumY += coord[i + 1];
        count++;
      }
    }
  });
  
  return {
    x: sumX / count,
    y: sumY / count
  };
};


const specialPlots = ['P1', 'P2', 'P3', 'P4', 'P5'];
const amenityPlots = ['P65', 'P66'];
const greenPlots = ['P64'];

export const PlotOverlay = ({ onPlotClick }) => {
  const [hoveredPlot, setHoveredPlot] = useState(null);

  const handlePlotClick = (plotId) => {
    // Don't handle clicks for open spaces and amenities
    const plotDetail = plotData[plotId];
    if (plotDetail && (plotDetail.status === 'open_space' || plotDetail.status === 'amenity' || plotDetail.status === 'road')) return;
    
    if (plotDetail && plotDetail.status !== 'booked') {
      onPlotClick(plotId);
    }
  };

  const handlePlotHover = (plotId) => {
    setHoveredPlot(plotId);
  };

  const handlePlotLeave = () => {
    setHoveredPlot(null);
  };

  const getPlotFill = (plotId) => {
    if (specialPlots.includes(plotId)) {
      return '#000000'; // More black (full opacity)
    }
    if (greenPlots.includes(plotId)) {
      return '#16a34a'; // Darker green (green-600 equivalent)
    }

    const plot = plotData[plotId];
    return plot?.status || 'available'; // Return status, or 'available' if no plotData
  };

  return (
    <div className="relative w-full h-full">
      <svg
        viewBox="0 0 486 652"
        className="w-full h-full"
      >
        {/* Add filters and gradients */}
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3" />
          </filter>
          <linearGradient id="availableFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="soldFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="reservedFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0.7" />
          </linearGradient>
          <filter id="textShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="black" floodOpacity="0.5"/>
          </filter>
        </defs>

        {/* Plot Areas */}
        {Object.entries(allSvgPaths).map(([plotNumber, pathD]) => {
          const isHovered = hoveredPlot === plotNumber;
          const centroid = calculateCentroid(pathD);

          const plotFillColor = getPlotFill(plotNumber); // This now returns a direct color or a status string

          if (amenityPlots.includes(plotNumber)) {
            return (
              <g key={plotNumber}>
                <path
                  d={pathD}
                  className="fill-yellow-500"
                  stroke="#D97706"
                  strokeWidth="1.5"
                />
                <text
                  x={centroid.x}
                  y={centroid.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontWeight="bold"
                  style={{ 
                    fontSize: '12px', /* Reduced font size */
                    filter: 'url(#textShadow)',
                    fill: 'white',
                    stroke: 'black',
                    strokeWidth: '0.5px',
                    pointerEvents: 'none'
                  }}
                >
                  AMINITY
                </text>
              </g>
            );
          }

          // Determine colors based on plotFillColor (which can be a direct color or a status string)
          let fill, stroke, textFill;
          let cursorStyle = 'pointer';
          let filterStyle = 'none';
          let transitionStyle = 'all 0.3s ease-in-out';
          let fontSize = '10px'; /* Reduced base font size */
          let fontWeight = 'bold';
          let textX = centroid.x;
          let textY = centroid.y;

          // Get bounding box dimensions for more precise text positioning
          const coordinates = pathD.split(/[MLZHVCSQTAZ]/i).filter(Boolean).map(coord => 
            coord.trim().split(/[,\\s]+/).map(Number)
          ).flat();
          let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
          for (let i = 0; i < coordinates.length; i += 2) {
            const x = coordinates[i];
            const y = coordinates[i + 1];
            if (!isNaN(x) && !isNaN(y)) {
              minX = Math.min(minX, x);
              minY = Math.min(minY, y);
              maxX = Math.max(maxX, x);
              maxY = Math.max(maxY, y);
            }
          }
          const plotWidth = maxX - minX;
          const plotHeight = maxY - minY;


          if (plotFillColor.startsWith('rgba(') || plotFillColor.startsWith('#')) {
            // It's a direct color (from specialPlots or greenPlots)
            fill = plotFillColor;
            stroke = isHovered ? '#1e3a8a' : '#1e40af'; // Default stroke for these
            textFill = 'white'; // Default text color for these
            fontSize = '12px'; // Consistent font size
          } else {
            // It's a status string (e.g., 'available', 'booked', 'pending', 'open_space')
            const status = plotFillColor;
            switch (status) {
              case 'booked':
                fill = isHovered ? "url(#soldFill)" : "rgba(239, 68, 68, 0.7)";
                stroke = "#dc2626";
                textFill = "#dc2626";
                cursorStyle = 'not-allowed';
                break;
              case 'pending':
                fill = isHovered ? "url(#reservedFill)" : "rgba(249, 115, 22, 0.7)";
                stroke = "#ea580c";
                textFill = "#ea580c";
                break;
              case 'open_space':
                fill = "#22c55e"; // green-500
                stroke = "#16a34a"; // green-600
                textFill = "#16a34a";
                // For Open Space, adjust text position if needed, similar to Manoram Nagri's plot 45
                // Assuming P64 is the Open Space plot
                if (plotNumber === 'P64') {
                    textY = centroid.y + 20; // Example adjustment
                    textX = centroid.x - 10; // Example adjustment
                }
                break;
              default: // available
                fill = isHovered ? "url(#availableFill)" : "rgba(59, 130, 246, 0.7)";
                stroke = "#2563eb";
                textFill = "#2563eb";
                break;
            }
            fontSize = isHovered ? '12px' : '10px'; // Adjusted font size for regular plots
            fontWeight = isHovered ? '600' : '500';
          }

          // Apply small offsets based on plot dimensions if text is likely to spill
          if (plotWidth < 30) { // If plot is very thin horizontally
            textX = centroid.x + (plotWidth / 4); // Push text slightly right
          }
          if (plotHeight < 30) { // If plot is very thin vertically
            textY = centroid.y + (plotHeight / 4); // Push text slightly down
          }

          if (isHovered) {
            filterStyle = 'url(#shadow)';
          }

          return (
            <g key={plotNumber}>
              <path
                d={pathD}
                fill={fill}
                /* Removed fillOpacity as color already has transparency */
                stroke={stroke}
                strokeWidth={isHovered ? "2" : "1.5"}
                className={`cursor-pointer transition-all duration-200`}
                style={{
                  cursor: cursorStyle,
                  filter: filterStyle,
                  transition: transitionStyle
                }}
                onClick={() => handlePlotClick(plotNumber)}
                onMouseEnter={() => handlePlotHover(plotNumber)}
                onMouseLeave={handlePlotLeave}
              />
              <text
                x={textX}
                y={textY + 10} /* Increased vertical offset */
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  fill: textFill,
                  fontSize: fontSize,
                  fontWeight: fontWeight,
                  pointerEvents: 'none',
                  transition: 'all 0.3s ease-in-out',
                  filter: filterStyle
                }}
              >
                {plotData[plotNumber]?.plotNumber || plotNumber}
              </text>
            </g>
          );
        })}

        {/* Roads (now empty) */}
        <g>
        </g>
      </svg>
    </div>
  );
};
