import React from "react";
import {
  GRID_DATA,
  GRID_CONFIG,
  getCurrentFormattedDate,
  getCurrentFormattedTime,
} from "../utils/helpers";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useSoilMoisture } from "../context/soilMoistureContext";

const Dashboard = () => {
  const { data, fetchingSoilMoisture } = useSoilMoisture();
  const [lightIntensity, setLightIntensity] = useState(0);
  const [online, setOnline] = useState(false);

  const statusRequest = async () => {
    try {
      const res = await checkStatus();

      return res;
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    }
  };
  useEffect(() => {
    const fetchStatus = async () => {
      const status = await statusRequest();
      setOnline(status?.online);
    };

    fetchStatus();
  }, []);
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-sm p-6 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Farm Grid Overview
          </h2>
          <p className="text-gray-600 mt-1">
            Real-time Agricultural Monitoring System
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center bg-gray-50 px-4 py-3 rounded-lg border border-gray-100 shadow-sm">
            <div className="mr-3 bg-green-100 p-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <span className="block text-xs text-gray-500 font-medium">
                LAST UPDATED
              </span>
              <div>
                <span className="text-gray-700 font-semibold">
                  {getCurrentFormattedDate()}
                </span>
                <span className="text-gray-700 font-semibold mx-1">•</span>
                <span className="text-gray-700 font-semibold">
                  {getCurrentFormattedTime()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center bg-gray-50 px-4 py-3 rounded-lg border border-gray-100 shadow-sm">
            <div className="mr-3 bg-blue-100 p-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                />
              </svg>
            </div>
            <div>
              <span className="block text-xs text-gray-500 font-medium">
                FARM GRID
              </span>
              <span className="text-gray-700 font-semibold">
                {GRID_CONFIG.rows} × {GRID_CONFIG.columns}
              </span>
            </div>
          </div>

          <div className="flex items-center bg-gray-50 px-4 py-3 rounded-lg border border-gray-100 shadow-sm">
            <div className="mr-3 bg-amber-100 p-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-amber-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <span className="block text-xs text-gray-500 font-medium">
                SYSTEM STATUS
              </span>
              {online ? (
                <span className="text-green-600 font-semibold">
                  Operational
                </span>
              ) : (
                <span className="text-red-500 font-semibold">Offline</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-8 mt-8 justify-center item-center">
        <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-center">
          {fetchingSoilMoisture ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <span className="block text-xs text-gray-500 uppercase font-medium">
                  Healthy Plants
                </span>
                <span className="text-xl font-bold text-gray-800">
                  {
                    GRID_DATA.filter((item) => item.plantStatus === "Healthy")
                      .length
                  }
                </span>
              </div>
            </>
          )}
        </div>

        <div className="bg-red-50 border border-red-100 rounded-lg p-4 flex items-center">
          {fetchingSoilMoisture ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <span className="block text-xs text-gray-500 uppercase font-medium">
                  Critical
                </span>
                <span className="text-xl font-bold text-gray-800">
                  {
                    GRID_DATA.filter((item) => item.plantStatus === "Critical")
                      .length
                  }
                </span>
              </div>
            </>
          )}
        </div>
        <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 flex items-center">
          {fetchingSoilMoisture ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <div className="bg-orange-100 p-3 rounded-full mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-orange-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <div>
                <span className="block text-xs text-gray-500 uppercase font-medium">
                  Needs Water
                </span>
                <span className="text-xl font-bold text-gray-800">
                  {
                    GRID_DATA.filter(
                      (item) => item.plantStatus === "Needs Water"
                    ).length
                  }
                </span>
              </div>
            </>
          )}
        </div>
        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 flex items-center">
          {fetchingSoilMoisture ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-yellow-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div>
                <span className="block text-xs text-gray-500 uppercase font-medium">
                  Empty Plots
                </span>
                <span className="text-xl font-bold text-gray-800">
                  {
                    GRID_DATA.filter((item) => item.plantStatus === "Moderate")
                      .length
                  }
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
