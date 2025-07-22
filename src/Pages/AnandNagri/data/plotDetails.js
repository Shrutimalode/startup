export const plotData = {};

const statuses = ['available', 'booked', 'pending'];
let plotCounter = 1;

for (let i = 1; i <= 105; i++) {
  const pPlotId = `P${i}`;
  if (['P1', 'P2', 'P3', 'P4', 'P5'].includes(pPlotId)) {
    plotData[pPlotId] = { plotNumber: pPlotId, status: "road" };
  } else if (pPlotId === 'P64') {
    plotData[pPlotId] = { plotNumber: "Open Space", status: "open_space" };
  } else if (['P65', 'P66'].includes(pPlotId)) {
    plotData[pPlotId] = { plotNumber: "Aminity", status: "amenity" };
  } else {
    const currentStatus = statuses[(plotCounter - 1) % statuses.length];
    plotData[pPlotId] = { 
      plotNumber: ` ${plotCounter}`, 
      area: 1000, // Dummy data
      dimensions: "XX", // Dummy data
      facing: "Unknown", // Dummy data
      status: currentStatus, 
      price: "N/A" // Dummy data
    };
    plotCounter++;
  }
}
