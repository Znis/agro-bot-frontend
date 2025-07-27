import { createContext, useContext, useState } from "react";

const SoilMoistureContext = createContext();

export const SoilMoistureProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const contextSetData = (newData) => {
    setData(newData);
  };

  return (
    <SoilMoistureContext.Provider
      value={{
        data,
        setData: contextSetData,
        fetchingSoilMoisture: loading,
        setFetchingSoilMoisture: setLoading,
      }}
    >
      {children}
    </SoilMoistureContext.Provider>
  );
};

export const useSoilMoisture = () => {
  const context = useContext(SoilMoistureContext);
  if (!context) {
    throw new Error(
      "useSoilMoisture must be used within a SoilMoistureProvider"
    );
  }
  return context;
};
