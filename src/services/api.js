import axios from "axios";

const BASE_URL = "http://192.168.0.101:8000";

export async function checkSoilMoisture() {
  const res = await axios.post(`${BASE_URL}/sequences/check-all-soil-moisture`);

  return res?.data;
}
