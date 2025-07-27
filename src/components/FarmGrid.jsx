import React from "react";
import {
  GRID_CONFIG,
  GRID_DATA,
  getPlotColor,
  getPlantIcon,
  getStatusColor,
} from "../utils/helpers";
import { useSoilMoisture } from "../context/soilMoistureContext";
import { Loader2, Plane } from "lucide-react";

const FarmGrid = ({ onSelectGridItem }) => {
  const { data, fetchingSoilMoisture } = useSoilMoisture();

  return (
    <div className="farm-container max-w-4xl mx-auto">
      <div className="farm-grid-wrapper">
        {/* Column Labels */}
        <div className="farm-grid-col-labels">
          {Array.from({ length: GRID_CONFIG.columns }, (_, i) => (
            <div key={`col-${i + 1}`} className="grid-label">
              Col {i + 1}
            </div>
          ))}
        </div>

        <div className="farm-grid-with-row-labels">
          {/* Row Labels */}
          <div className="farm-grid-row-labels">
            {Array.from({ length: GRID_CONFIG.rows }, (_, i) => (
              <div key={`row-${i + 1}`} className="grid-label">
                Row {i + 1}
              </div>
            ))}
          </div>

          {/* Actual Grid */}
          <div className="farm-grid">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${GRID_CONFIG.columns}, 1fr)`,
                gridTemplateRows: `repeat(${GRID_CONFIG.rows}, 1fr)`,
                gap: "6px",
              }}
            >
              {data
                ? Object.entries(data).map(([key, value]) => (
                    <div
                      key={key}
                      className={`farm-grid-item flex flex-col cursor-pointer bg-green-600`}
                      // onClick={() => onSelectGridItem(gridItem)}
                    >
                      <div className="flex items-center justify-between p-2">
                        <div className="flex items-center">
                          <span className="text-xl bg-white/90 rounded-full w-8 h-8 flex items-center justify-center shadow-sm">
                            {/* {getPlantIcon(gridItem.plantType)} */}
                            <p>🥬</p>
                          </span>
                        </div>
                        <span
                          className={`rounded-full px-3 py-0.5 text-xs font-medium ${
                            value < 60 ? "bg-red-200" : "bg-green-200"
                          } }`}
                        >
                          {value < 60 ? "Needs Water" : "Good"}
                        </span>
                      </div>

                      <div className="mt-auto w-full px-2 pb-2">
                        <div className="bg-white rounded-md p-3 w-full shadow-sm">
                          <div className="text-base font-medium text-gray-700 mb-2">
                            Lettuce
                          </div>

                          <div className="flex justify-between items-end ">
                            <div>
                              <div className="flex items-center">
                                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-1.5"></span>
                                <span className="text-blue-600 text-2xl font-bold">
                                  {value}%
                                </span>
                              </div>
                              <span className="text-xs text-gray-500">
                                Moisture
                              </span>
                            </div>

                            <div>
                              <div className="flex items-center">
                                <span className="text-gray-700 text-lg font-bold flex justify-center w-full">
                                  {value < 60 ? (
                                    <img
                                      src="/healthy.png"
                                      alt="healthy plant"
                                      className="h-12 w-12"
                                    />
                                  ) : (
                                    <img
                                      src="/dead.jpg"
                                      alt="dead"
                                      className="h-12 w-12"
                                    />
                                  )}
                                </span>
                              </div>
                              <span className="text-xs text-gray-500">
                                Plant Status
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : Array.from({ length: 9 }).map((item, idx) => (
                    <div
                      className="farm-grid-item flex justify-center items-center bg-gray-100"
                      key={idx}
                    >
                      {fetchingSoilMoisture ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "N/A"
                      )}
                      {/* <Loader2
                        className={`w-8 h-8 rounded-full ${
                          fetchingSoilMoisture ? "animate-pulse" : ""
                        }`}
                      /> */}
                      {/* <img
                        src="/logo.jpg"
                        alt="logo"
                        className={`w-12 h-12 rounded-full ${
                          fetchingSoilMoisture ? "animate-pulse" : ""
                        }`}
                      /> */}
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmGrid;
