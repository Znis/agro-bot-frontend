import React from 'react';
import { getPlotColor, getImageURL } from '../utils/helpers';

const PlotDetailModal = ({ gridItem, onClose }) => {
  if (!gridItem) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-20" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Farm Plot {gridItem.pos}</h3>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div className={`p-4 flex items-center justify-center rounded-lg border ${gridItem.health_status == "no any plant" ? "bg-yellow-100" : gridItem.health_status == "healthy" ? "bg-[#6c9a49]" : "bg-red-100"}`}>
            <img src={`${getImageURL(gridItem.filename)}`} height={250} width={250}></img>
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
                <span className="w-3 h-3 rounded-full bg-green-400 mr-2"></span>
                <span className="text-gray-600 font-medium">Confidence</span>
              </div>
              <p className="text-2xl font-bold text-gray-700">
                {gridItem.prediction_confidence}
              </p>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <span className="text-gray-600 font-medium">Health Status</span>
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-gray-700 mt-1">
                {gridItem.health_status}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlotDetailModal; 