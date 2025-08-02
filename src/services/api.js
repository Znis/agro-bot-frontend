import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export async function checkSoilMoisture() {
  console.log(BASE_URL);
  const res = await axios.post(`${BASE_URL}/sequences/check-all-soil-moisture`);

  return res?.data;
}

export async function waterPlantsRequest() {
  const res = await axios.post(`${BASE_URL}/sequences/water-dry-slots`, {
    threshold: 60,
  });

  return res?.data;
}

export async function fullMaintenanceCycleRequest() {
  const res = await axios.post(`${BASE_URL}/sequences/full-maintenance-cycle`, {
    watering_threshold: 60,
  });

  return res?.data;
}

export async function checkStatus() {
  const res = await axios.get(`${BASE_URL}/status`);

  return res?.data;
}
