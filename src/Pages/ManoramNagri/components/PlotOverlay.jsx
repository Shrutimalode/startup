import React, { useState } from 'react';
import { plotDetails } from '../data/plotDetails';

// Helper function to calculate the centroid of a path
const calculateCentroid = (pathD) => {
  const coordinates = pathD.split(/[MLZ]/).filter(Boolean).map(coord => 
    coord.trim().split(/[,\s]+/).map(Number)
  );
  
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

// Plot path data with their coordinates and actual plot numbers
const plotPaths = {
  // Row 1 (Top)
  '1': "M347.5 104L402 102L411 104L417.5 107.5L425 112.5L429.5 117.5L434 125L436.5 133V148.5L395 269L302 237L347.5 104Z",
  '2': "M300.5 237.5L394.5 269.5L369 346L275.5 312.5L300.5 237.5Z",
  '25': "M523.826 174L652.75 220.915L630.677 287L500.75 239.58L523.826 174Z",
  '28': "M656.076 223L785 269.915L762.927 336L633 288.58L656.076 223Z",
  '33': "M540.076 567L669 613.915L646.927 680L517 632.58L540.076 567Z",
  '34': "M517.076 636L646 682.915L623.927 749L494 701.58L517.076 636Z",
  '17': "M339.076 724L468 770.915L445.927 837L316 789.58L339.076 724Z",
  '16': "M314.076 793L443 839.915L420.927 906L291 858.58L314.076 793Z",
  '39': "M398.5 982L528 1029.5L504.927 1098L374 1050L398.5 982Z",
  '41': "M697.5 1061.5L685.5 1193L618.5 1186L610 1183.5L603.5 1178.5L597 1170.5L591 1160.5L590 1148.5V1138L618.5 1051.5L697.5 1061.5Z",
  '40': "M373.5 1052L504.5 1102L488.5 1148.5L484.5 1154.5L479.5 1160L472.5 1164.5L464 1166L339.5 1151L373.5 1052Z",
  '38': "M423.076 911L552 959.161L529.927 1027L400 978.321L423.076 911Z",
  '42': "M772 1071L760 1203L687.5 1195L699 1062.5L772 1071Z",
  '44': "M956 1094.5L960 1223.5L956 1226.5L838 1213.97L849.5 1081.5L956 1094.5Z",
  '43': "M847.5 1080.5L835.5 1212.5L763 1204.5L774.5 1072L847.5 1080.5Z",
  '45': "M931 425L945.5 795.5L713.5 768.5L935 109.5L935.5 106L939.5 101L947.5 94L956 88.5L962 86H968L931 425Z",
  '46': "M946 798L956.5 1091.5L618 1049.5L712 770.5L946 798Z",
  '37': "M447.076 843L576 889.915L553.927 956L424 908.58L447.076 843Z",
  '36': "M471.076 774L600 820.915L577.927 887L448 839.58L471.076 774Z",
  '14': "M263.531 933L395 980.746L372.492 1048L240 999.741L263.531 933Z",
  '13': "M240.5 1002L371 1052.5L337.5 1149.5L236 1137.5L230 1134.5L223 1130L218 1124L214.5 1118.5L211.5 1111L210 1103V1095V1087L240.5 1002Z",
  '15': "M290.076 863L419 911.576L396.927 980L267 930.902L290.076 863Z",
  '35': "M494.076 705L623 751.915L600.927 818L471 770.58L494.076 705Z",
  '32': "M563.076 498L692 544.915L669.927 611L540 563.58L563.076 498Z",
  '31': "M587.076 429L716 475.915L693.927 542L564 494.58L587.076 429Z",
  '30': "M610.076 360L739 406.915L716.927 473L587 425.58L610.076 360Z",
  '29': "M633.076 292L762 338.915L739.927 405L610 357.58L633.076 292Z",
  '24': "M501.076 243L630 289.915L607.927 356L478 308.58L501.076 243Z",
  '18': "M362.076 656L491 702.915L468.927 769L339 721.58L362.076 656Z",
  '19': "M385.076 587L514 633.915L491.927 700L362 652.58L385.076 587Z",
  '20': "M408.076 520L537 566.915L514.927 633L385 585.58L408.076 520Z",
  '21': "M432.076 450L561 496.915L538.927 563L409 515.58L432.076 450Z",
  '22': "M455.076 380L584 426.915L561.927 493L432 445.58L455.076 380Z",
  '23': "M477.076 313L606 359.915L583.927 426L454 378.58L477.076 313Z",
  '4': "M249 390L342 422L317.5 497.5L223 464.5L249 390Z",
  '8': "M144 694L237.5 728.5L211 803.5L118.5 768.5L144 694Z",
  '9': "M117.5 771L211 805.5L184.5 880.5L92 845.5L117.5 771Z",
  '11': "M63.5 926L157 960.5L130.5 1035.5L38 1000.5L63.5 926Z",
  '12': "M36.5 1003L130 1037.5L101.5 1121.5L0 1108.5L36.5 1003Z",
  '10': "M90.5 847.5L184 882.788L157.5 959.5L65 923.701L90.5 847.5Z",
  '3': "M275 313L368 347L343 422L249.5 389.5L275 313Z",
  '5': "M223 466L316.5 499L292 574.5L198.5 540L223 466Z",
  '7': "M170.5 617.5L264 652.5L239 726.5L145.5 692.5L170.5 617.5Z",
  '6': "M197 541L291.5 575.973L266 652L171.5 617.027L197 541Z",
  '26': "M540 123.5L545 112L552.5 104L561 99L571 96L697.5 92.5L653.5 219.5L522.5 172.5L540 123.5Z",
  '27': "M699 92L798 90H803.5L809 93L816 98L821.5 105L826 113L829 121L830 130L828 140L785.5 267.5L654.5 220L699 92Z"
};

// Background paths that provide context
const backgroundPaths = [
  "M374 8.5L975.5 0L966 82L347.5 103.5L374 8.5Z",
  "M450.5 96L547 94L475 300L326.5 743L240.5 985.5L190 1132.5L99 1120L450.5 96Z",
  "M845 83.5L941.5 82.5L868 292L718.5 739L640 978.5L576 1181L477 1170L845 83.5Z",
  "M450.5 97C448 104 429.315 159 427.315 164C426.5 158 446.185 117.5 397 99.4999C394.5 95.9999 421 98.9999 428.5 96.9999C434.5 97.9999 444 96.4999 450.5 97Z",
  "M844.666 85.6052C842.166 92.6052 823.481 147.605 821.481 152.605C820.666 146.605 840.351 106.105 791.166 88.1052C788.666 84.6052 815.166 87.6052 822.666 85.6052C828.666 86.6052 838.166 85.1051 844.666 85.6052Z",
  "M966.5 82C960 84.5 956.5 83.4997 948 90.5C938.5 93.5001 933 111.575 933 105.5C939 90.5 938.5 89.0001 941.5 82.5001C951.5 82.0001 958.5 82.0001 966.5 82Z",
  "M573 93.5053C568.172 96.5 562.828 95.5053 553.828 101.005C545 104.5 541 116 538.828 116.747C544.739 101.589 544.246 100.074 547.201 93.5053C557.052 93.0001 565.119 93.5053 573 93.5053Z",
  "M665.501 1192.5C665.501 1194.16 577.382 1181.5 576.001 1181.5C576.501 1179 581.001 1166.16 581.001 1164.5C582.501 1162.5 586.501 1146 587.501 1145C592.501 1184.5 611.001 1186.5 665.501 1192.5Z",
  "M280 1144C280 1145.66 191.381 1134 190 1134C190.5 1131.5 195.5 1117.66 195.5 1116C197 1114 205.5 1086 206.5 1085C202.5 1131 225.5 1138 280 1144Z",
  "M478.275 1167C478.275 1170.31 470.917 1167.5 466.775 1167.5C462.633 1167.5 404.275 1162.31 404.275 1159C424.275 1157 475.775 1176 485.775 1140C488.775 1140 478.275 1163.69 478.275 1167Z"
];

export function PlotOverlay({ onPlotClick }) {
  const [hoveredPlot, setHoveredPlot] = useState(null);

  const handlePlotClick = (plotId) => {
    // Don't handle clicks for plots 16 and 17
    if (plotId === '45' || plotId === '46') return;
    
    const plotDetail = plotDetails[plotId];
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

  return (
    <div className="relative w-full h-full">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 976 1227"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', top: 0, left: 0 }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Add shadow filter */}
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
          {/* Add text shadow filter */}
          <filter id="textShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="black" floodOpacity="0.5"/>
          </filter>
        </defs>

        {/* Background Paths */}
        {backgroundPaths.map((pathD, index) => (
          <g key={`bg-${index}`}>
            <path
              d={pathD}
              className="fill-gray-700"
              style={{ pointerEvents: 'none' }}
            />
            {/* Add road text labels for diagonal roads */}
            {(index === 1 || index === 2) && (
              <text
                x={index === 1 ? "300" : "700"}
                y={index === 1 ? "600" : "600"}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-white font-bold pointer-events-none"
                style={{ 
                  fontSize: '16px',
                  filter: 'url(#textShadow)',
                  fill: 'white',
                  stroke: 'black',
                  strokeWidth: '0.5px',
                  transformOrigin: `${index === 1 ? '300px' : '700px'} 600px`,
                  transform: `rotate(-75deg)`
                }}
              >
                9mm Wide Road
              </text>
            )}
            {/* Add road text label for top horizontal road */}
            {index === 0 && (
              <text
                x="650"
                y="45"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-white font-bold pointer-events-none"
                style={{ 
                  fontSize: '16px',
                  filter: 'url(#textShadow)',
                  fill: 'white',
                  stroke: 'black',
                  strokeWidth: '0.5px'
                }}
              >
                9mm Wide Road
              </text>
            )}
          </g>
        ))}

        {/* Plot Areas */}
        {Object.entries(plotPaths).map(([plotNumber, pathD]) => {
          const isHovered = hoveredPlot === plotNumber;
          const plotDetail = plotDetails[plotNumber];
          const status = plotDetail?.status || 'available';
          const centroid = calculateCentroid(pathD);

          // Special handling for plots 16 and 17
          if (plotNumber === '45') {
            const adjustedY = centroid.y + 200; // Adjust Y position to center of the plot
            const adjustedX = centroid.x - 60; // Move text 60 units to the left (adjusted from 100)
            return (
              <g key={plotNumber}>
                <path
                  d={pathD}
                  className="fill-green-500"
                  stroke="#4CAF50"
                  strokeWidth="1.5"
                />
                <text
                  x={adjustedX}
                  y={adjustedY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-white font-bold pointer-events-none"
                  style={{ 
                    fontSize: '16px',
                    filter: 'url(#textShadow)',
                    fill: 'white',
                    stroke: 'black',
                    strokeWidth: '0.5px'
                  }}
                >
                  OPEN
                  SPACE
                </text>
              </g>
            );
          }

          if (plotNumber === '46') {
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
                  className="text-white font-bold pointer-events-none"
                  style={{ 
                    fontSize: '20px',
                    filter: 'url(#textShadow)',
                    fill: 'white',
                    stroke: 'black',
                    strokeWidth: '0.5px'
                  }}
                >
                  AMINITY
                </text>
              </g>
            );
          }

          const getColors = (status) => {
            switch (status) {
              case 'sold':
                return {
                  fill: isHovered ? "url(#soldFill)" : "rgba(239, 68, 68, 0.7)",
                  stroke: "#dc2626",
                  text: "#dc2626"
                };
              case 'reserved':
                return {
                  fill: isHovered ? "url(#reservedFill)" : "rgba(249, 115, 22, 0.7)",
                  stroke: "#ea580c",
                  text: "#ea580c"
                };
              default: // available
                return {
                  fill: isHovered ? "url(#availableFill)" : "rgba(59, 130, 246, 0.7)",
                  stroke: "#2563eb",
                  text: "#2563eb"
                };
            }
          };

          const colors = getColors(status);
          
          // Add special hover classes for plots 16 and 17
          let hoverClass = '';
          if (plotNumber === '16') {
            hoverClass = 'hover:fill-green-500';
          } else if (plotNumber === '17') {
            hoverClass = 'hover:fill-yellow-500';
          }

          return (
            <g key={plotNumber}>
              <path
                d={pathD}
                fill={colors.fill}
                fillOpacity={isHovered ? 0.3 : 0.15}
                stroke={colors.stroke}
                strokeWidth={isHovered ? "2" : "1.5"}
                className={`cursor-pointer transition-all duration-200 ${hoverClass}`}
                style={{
                  filter: isHovered ? 'url(#shadow)' : 'none',
                  transition: 'all 0.3s ease-in-out'
                }}
                onClick={() => handlePlotClick(plotNumber)}
                onMouseEnter={() => handlePlotHover(plotNumber)}
                onMouseLeave={handlePlotLeave}
              />
              <text
                x={centroid.x}
                y={centroid.y}
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  fill: colors.text,
                  fontSize: isHovered ? '16px' : '14px',
                  fontWeight: isHovered ? '600' : '500',
                  pointerEvents: 'none',
                  transition: 'all 0.3s ease-in-out',
                  filter: isHovered ? 'url(#shadow)' : 'none'
                }}
              >
                {plotNumber}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
} 