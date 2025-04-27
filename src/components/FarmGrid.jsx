import React from 'react';
import { GRID_CONFIG, GRID_DATA, getPlotColor, getPlantIcon, getStatusColor } from '../utils/helpers';

const FarmGrid = ({ onSelectGridItem }) => {
  return (
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
                  onClick={() => onSelectGridItem(gridItem)}
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
  );
};

export default FarmGrid; 