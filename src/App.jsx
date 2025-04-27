import { useState } from 'react'
import './App.css'

// Grid configuration - can be adjusted as needed
const GRID_CONFIG = {
  rows: 3,
  columns: 3
};

// Generate sample grid data based on configuration
const generateGridData = (rows, columns) => {
  const plants = ['Tomato', 'Cucumber', 'Lettuce', 'Carrot', 'Spinach', 'Onion', 'Eggplant', 'Cabbage'];
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
const GRID_DATA = generateGridData(GRID_CONFIG.rows, GRID_CONFIG.columns);

function getStatusColor(status) {
  switch (status) {
    case 'Healthy': return 'text-green-600 bg-green-100';
    case 'Moderate': return 'text-yellow-600 bg-yellow-100';
    case 'Needs Water': return 'text-orange-600 bg-orange-100';
    case 'Critical': return 'text-red-600 bg-red-100';
    default: return 'text-gray-700 bg-gray-100';
  }
}

function getPlantIcon(plantType) {
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
function getPlotColor(gridItem) {
  // Simple alternating pattern
  const isOdd = ((gridItem.gridRow % 2) + (gridItem.gridCol % 2)) % 2 === 0;
  return isOdd ? 'bg-[#5d873f]' : 'bg-[#6c9a49]';
}

function App() {
  const [selectedGridItem, setSelectedGridItem] = useState(null);
  const [isConnected, setIsConnected] = useState(true);

  const handleConnectConsole = () => {
    console.log("Connecting to console...");
    // Your logic to open console
  };


  return (
    <div className="min-h-screen bg-gray-50 bg-[url('assets/bg.jpg')] bg-no-repeat bg-cover bg-center">
      <header className="flex jusitfy-center gap-4 bg-[#2E7D32] text-white p-6 shadow-md">
        <img className="h-24 w-24" src="assets/logo.png" alt="Agro Bot Farm Logo" />
        <div className="container flex flex-col justify-center mx-auto">
          <h1 className="text-3xl font-bold">AgroBot Farm Monitor</h1>
          <p className="mt-2">Real-time IoT-based farm monitoring system</p>
        </div>
        <button
          className={`flex items-center justify-center h-[4rem] w-[16rem] my-auto rounded-full border ${isConnected ? 'border-green-400' : 'border-red-400'
            } ${isConnected ? 'hover:bg-green-600 cursor-pointer' : 'text-gray-100 cursor-not-allowed'}`}
          disabled={!isConnected}
          onClick={handleConnectConsole}
        >
          <span
            className={`h-3 w-3 rounded-full mr-2 ${isConnected ? 'bg-green-400' : 'bg-red-400'
              }`}
          ></span>
          Connect Console
        </button>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Farm Grid Overview</h2>
            <p className="text-gray-600">Agricultural Monitoring System</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="text-sm text-gray-600 bg-white px-4 py-2 rounded-md shadow">
              <span className="block font-medium">Last Updated</span>
              {new Date().toLocaleTimeString()}
            </div>

            <div className="text-sm text-gray-600 bg-white px-4 py-2 rounded-md shadow">
              <span className="block font-medium">Grid Size</span>
              {GRID_CONFIG.rows} × {GRID_CONFIG.columns}
            </div>
          </div>
        </div>

        <div className="farm-container max-w-4xl mx-auto">
          <div className="farm-grid-wrapper">
            {/* Column Labels */}
            <div className="farm-grid-col-labels">
              {Array.from({ length: GRID_CONFIG.columns }, (_, i) => (
                <div key={`col-${i + 1}`} className="grid-label">Col {i + 1}</div>
              ))}
            </div>

            <div className="farm-grid-with-row-labels">
              {/* Row Labels */}
              <div className="farm-grid-row-labels">
                {Array.from({ length: GRID_CONFIG.rows }, (_, i) => (
                  <div key={`row-${i + 1}`} className="grid-label">Row {i + 1}</div>
                ))}
              </div>

              {/* Actual Grid */}
              <div className="farm-grid">
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${GRID_CONFIG.columns}, 1fr)`,
                    gridTemplateRows: `repeat(${GRID_CONFIG.rows}, 1fr)`,
                    gap: '6px'
                  }}

                >
                  {GRID_DATA.map((gridItem) => (
                    <div
                      key={gridItem.id}
                      className={`farm-grid-item ${getPlotColor(gridItem)} flex flex-col cursor-pointer`}
                      onClick={() => setSelectedGridItem(gridItem)}
                    >
                      <div className="flex items-center justify-between p-2">
                        <div className="flex items-center">
                          <span className="text-xl bg-white/90 rounded-full w-8 h-8 flex items-center justify-center shadow-sm">
                            {getPlantIcon(gridItem.plantType)}
                          </span>
                        </div>
                        <span className={`rounded-full px-3 py-0.5 text-xs font-medium ${getStatusColor(gridItem.plantStatus)}`}>
                          {gridItem.plantStatus}
                        </span>
                      </div>

                      <div className="mt-auto w-full px-2 pb-2">
                        <div className="bg-white rounded-md p-3 w-full shadow-sm">
                          <div className="text-base font-medium text-gray-700 mb-2">
                            {gridItem.plantType}
                          </div>

                          <div className="flex justify-between items-center">
                            <div>
                              <div className="flex items-center">
                                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-1.5"></span>
                                <span className="text-blue-600 text-lg font-bold">
                                  {gridItem.moisture}%
                                </span>
                              </div>
                              <span className="text-xs text-gray-500">Moisture</span>
                            </div>

                            <div>
                              <div className="flex items-center">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-300 mr-1.5"></span>
                                <span className="text-gray-700 text-lg font-bold">
                                  {gridItem.temperature}°C
                                </span>
                              </div>
                              <span className="text-xs text-gray-500">Temperature</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 px-2">
            <div className="flex gap-3 flex-wrap">
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-xs text-white">Healthy</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="text-xs text-white">Moderate</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                <span className="text-xs text-white">Needs Water</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="text-xs text-white">Critical</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {selectedGridItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4" onClick={() => setSelectedGridItem(null)}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4 z-10000">
              <h3 className="text-xl font-bold">Farm Plot {selectedGridItem.id}</h3>
              <button className="text-gray-500 hover:text-gray-700" onClick={() => setSelectedGridItem(null)}>
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className={`p-4 rounded-lg border ${getPlotColor(selectedGridItem)}`}>
                <div className="flex items-center">
                  <span className="text-4xl bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-sm mr-4 border border-gray-200">
                    {getPlantIcon(selectedGridItem.plantType)}
                  </span>
                  <div>
                    <p className="text-xl font-semibold text-white">{selectedGridItem.plantType}</p>
                    <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedGridItem.plantStatus)}`}>
                      {selectedGridItem.plantStatus}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex items-center mb-1">
                    <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                    <span className="text-gray-600 font-medium">Soil Moisture</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">
                    {selectedGridItem.moisture}%
                  </p>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex items-center mb-1">
                    <span className="w-3 h-3 rounded-full bg-red-400 mr-2"></span>
                    <span className="text-gray-600 font-medium">Temperature</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-700">
                    {selectedGridItem.temperature}°C
                  </p>
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg">
                <span className="text-gray-600 font-medium">Grid Position</span>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-gray-700 mt-1">
                    Row {selectedGridItem.gridRow}, Column {selectedGridItem.gridCol}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-agro-green hover:bg-green-700 text-white py-2 rounded-lg transition-colors font-medium">
                  View History
                </button>
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors font-medium">
                  Control Water
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>AgroBot Farm Monitor System &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
}

export default App
