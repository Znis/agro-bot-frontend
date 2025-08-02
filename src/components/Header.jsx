import { useEffect, useState } from "react";
import {
  checkSoilMoisture,
  checkStatus,
  fullMaintenanceCycleRequest,
  waterPlantsRequest,
} from "../services/api";
import { BookAIcon, GlassWater, HammerIcon, Loader2 } from "lucide-react";
import { useSoilMoisture } from "../context/soilMoistureContext";
import { toast } from "sonner";

const Header = ({ isConnected, onOpenConsole }) => {
  const { setData, setFetchingSoilMoisture, fetchingSoilMoisture } =
    useSoilMoisture();

  const [online, setOnline] = useState(false);

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

  const waterPlants = async () => {
    try {
      setFetchingSoilMoisture(true);
      const res = await waterPlantsRequest();

      setData(res?.readings);
      toast.success(res?.message || "Moisture data updated");
    } catch (err) {
      console.log(err?.message || "Something went wrong");
      toast.error(err?.message || "Someting went wrong");
    } finally {
      setFetchingSoilMoisture(false);
    }
  };

  const fullMaintenanceCycle = async () => {
    try {
      setFetchingSoilMoisture(true);
      const res = await fullMaintenanceCycleRequest();

      setData(res?.readings);
      toast.success(res?.message || "Moisture data updated");
    } catch (err) {
      console.log(err?.message || "Something went wrong");
      toast.error(err?.message || "Someting went wrong");
    } finally {
      setFetchingSoilMoisture(false);
    }
  };

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
        className="flex rounded-full gap-2 items-center justify-center p-2 my-auto transition-all duration-300 bg-green-600 hover:bg-green-900 text-white shadow-lg hover:shadow-green-500/30 cursor-pointer disabled:pointer-events-none disabled:pointer-none disabled:bg-gray-600"
        // disabled={fetchingSoilMoisture || !online}
      >
        {fetchingSoilMoisture ? (
          <Loader2 className="animate-spin" />
        ) : (
          <BookAIcon />
        )}
      </button>
      <button
        onClick={() => waterPlants()}
        className="flex rounded-full gap-2 items-center justify-center p-2 my-auto transition-all duration-300 bg-green-600 hover:bg-green-900 text-white shadow-lg hover:shadow-green-500/30 cursor-pointer disabled:pointer-events-none disabled:pointer-none disabled:bg-gray-600"
        disabled={fetchingSoilMoisture || !online}
      >
        {fetchingSoilMoisture ? (
          <Loader2 className="animate-spin" />
        ) : (
          <GlassWater />
        )}
      </button>
      <button
        onClick={() => fullMaintenanceCycle()}
        className="flex rounded-full gap-2 items-center justify-center p-2 my-auto transition-all duration-300 bg-green-600 hover:bg-green-900 text-white shadow-lg hover:shadow-green-500/30 cursor-pointer disabled:pointer-events-none disabled:pointer-none disabled:bg-gray-600"
        disabled={fetchingSoilMoisture || !online}
      >
        {fetchingSoilMoisture ? (
          <Loader2 className="animate-spin" />
        ) : (
          <HammerIcon />
        )}
      </button>
      <button
        className={`flex items-center justify-center w-[20rem] py-3 px-4 my-auto rounded-lg transition-all duration-200 ${
          online
            ? "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-green-500/30 cursor-pointer"
            : "bg-gray-600 text-gray-200 cursor-not-allowed"
        }`}
        disabled={!online}
        onClick={onOpenConsole}
      >
        <span
          className={`h-3 w-3 rounded-full mr-3 ${
            online ? "bg-green-300 animate-pulse" : "bg-red-400"
          }`}
        ></span>
        <span className="font-medium">
          {online ? "Open Console" : "CNC Offline"}
        </span>
      </button>
    </header>
  );
};

export default Header;
