// Grid configuration - can be adjusted as needed
export const GRID_CONFIG = {
  rows: 3,
  columns: 3
};

// Generate sample grid data based on configuration
export const generateGridData = (rows, columns) => {
  const plants = ['Tomato', 'Cucumber', 'Lettuce', 'Carrot', 'Spinach', 'Onion', 'Eggplant', 'Cabbage', "Bok-choi", "Money Plant"];
  const statuses = ['Healthy', 'Moderate', 'Needs Water', 'Critical'];

  return Array.from({ length: rows * columns }, (_, index) => ({
    id: index + 1,
    gridRow: Math.floor(index / columns) + 1,
    gridCol: (index % columns) + 1,
    moisture: Math.floor(Math.random() * 100),
    plantStatus: statuses[Math.floor(Math.random() * statuses.length)],
    temperature: Math.floor(Math.random() * 10) + 20, // 20-30°C
    plantType: plants[index % plants.length] // Ensure each plant is used
  }));
};

// Sample grid data using our configuration
export const GRID_DATA = generateGridData(GRID_CONFIG.rows, GRID_CONFIG.columns);

export function getStatusColor(status) {
  switch (status) {
    case 'Healthy': return 'text-green-600 bg-green-100';
    case 'Moderate': return 'text-yellow-600 bg-yellow-100';
    case 'Needs Water': return 'text-orange-600 bg-orange-100';
    case 'Critical': return 'text-red-600 bg-red-100';
    default: return 'text-gray-700 bg-gray-100';
  }
}

export function getPlantIcon(plantType) {
  // In a real application, you would use actual icons
  // This is a simple representation using emojis
  const icons = {
    'Tomato': '🍅',
    'Cucumber': '🥒',
    'Lettuce': '🥬',
    'Carrot': '🥕',
    'Spinach': '🌿',
    'Onion': '🧅',
    'Eggplant': '🍆',
    'Cabbage': '🥬',
    'Broccoli': '🥦',
    'Potato': '🥔',
    'Strawberry': '🍓',
  };

  return icons[plantType] || '🌱';
}

// Simple color mapping for plots
export function getPlotColor(gridItem) {
  // Simple alternating pattern
  const isOdd = ((gridItem.gridRow % 2) + (gridItem.gridCol % 2)) % 2 === 0;
  return isOdd ? 'bg-[#5d873f]' : 'bg-[#6c9a49]';
}

// Format current date for display
export function getCurrentFormattedDate() {
  return new Date().toLocaleDateString([], {month: 'short', day: 'numeric', year: 'numeric'});
}

// Format current time for display
export function getCurrentFormattedTime() {
  return new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true});
} 