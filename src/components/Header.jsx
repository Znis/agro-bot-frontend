import { useState } from "react";
import { checkSoilMoisture } from "../services/api";
import { Loader2 } from "lucide-react";
import { useSoilMoisture } from "../context/soilMoistureContext";
import { toast } from "sonner";

const Header = ({ isConnected, onOpenConsole }) => {
  const { setData, setFetchingSoilMoisture, fetchingSoilMoisture } =
    useSoilMoisture();

  const getSoilMoisture = async () => {
    try {
      setFetchingSoilMoisture(true);
      const res = await checkSoilMoisture();

      setData(res?.readings);
      toast.success(res?.message || "Moisture data updated");
    } catch (err) {
      console.log(err?.message || "Something went wrong");
      toast.error(err?.message || "Someting went wrong");
    } finally {
      setFetchingSoilMoisture(false);
    }
  };

  return (
    <header className="flex jusitfy-center gap-4 bg-[#2E7D32] text-white px-6 py-2 shadow-md">
      <img
        className="h-24 w-24"
        src="assets/logo.png"
        alt="Agro Bot Farm Logo"
      />
      <div className="container flex flex-col justify-center mx-auto">
        <h1 className="text-3xl font-bold">AgroBot Farm Monitor</h1>
        <p className="mt-2">Real-time IoT-based farm monitoring system</p>
      </div>
      <button
        onClick={() => getSoilMoisture()}
        className="flex gap-2 items-center justify-center w-[20rem] py-3 px-4 my-auto rounded-lg transition-all bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-green-500/30 cursor-pointer"
      >
        {fetchingSoilMoisture && <Loader2 className="animate-spin" />}
        Read Moisture
      </button>
      <button
        className={`flex items-center justify-center w-[20rem] py-3 px-4 my-auto rounded-lg transition-all duration-200 ${
          isConnected
            ? "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-green-500/30 cursor-pointer"
            : "bg-gray-600 text-gray-200 cursor-not-allowed"
        }`}
        disabled={!isConnected}
        onClick={onOpenConsole}
      >
        <span
          className={`h-3 w-3 rounded-full mr-3 ${
            isConnected ? "bg-green-300 animate-pulse" : "bg-red-400"
          }`}
        ></span>
        <span className="font-medium">
          {isConnected ? "Open Console" : "Console Offline"}
        </span>
      </button>
    </header>
  );
};

export default Header;
