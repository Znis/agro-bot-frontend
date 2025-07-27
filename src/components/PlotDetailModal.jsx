import React from 'react';
import { getPlotColor, getPlantIcon, getStatusColor } from '../utils/helpers';

const PlotDetailModal = ({ gridItem, onClose }) => {
  if (!gridItem) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-20" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Farm Plot {gridItem.id}</h3>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div className={`p-4 rounded-lg border ${getPlotColor(gridItem)}`}>
            <div className="flex items-center">
              <span className="text-4xl bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-sm mr-4 border border-gray-200">
                {getPlantIcon(gridItem.plantType)}
              </span>
              <div>
                <p className="text-xl font-semibold text-white">{gridItem.plantType}</p>
                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(gridItem.plantStatus)}`}>
                  {gridItem.plantStatus}
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
                {gridItem.moisture}%
              </p>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex items-center mb-1">
                <span className="w-3 h-3 rounded-full bg-red-400 mr-2"></span>
                <span className="text-gray-600 font-medium">Temperature</span>
              </div>
              <p className="text-2xl font-bold text-gray-700">
                {gridItem.temperature}°C
              </p>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <span className="text-gray-600 font-medium">Grid Position</span>
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-gray-700 mt-1">
                Row {gridItem.gridRow}, Column {gridItem.gridCol}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            {/* <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors font-medium">
              View History
            </button> */}
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors font-medium">
              Control Water
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlotDetailModal; 