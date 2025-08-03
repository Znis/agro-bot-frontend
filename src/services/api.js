import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const mock_val_CSM = {
  "readings": {
    "(0,0)": 82,
    "(0,1)": 13,
    "(0,2)": 67,
    "(1,0)": 45,
    "(1,1)": 99,
    "(1,2)": 29,
    "(2,0)": 6,
    "(2,1)": 73,
    "(2,2)": 57
  }
}

const mock_val_WP = {
  "readings": {
    "(0,0)": 82,
    "(0,1)": 13,
    "(0,2)": 67,
    "(1,0)": 45,
    "(1,1)": 99,
    "(1,2)": 29,
    "(2,0)": 6,
    "(2,1)": 73,
    "(2,2)": 57
  }
}

const mock_val_FMC = {
  "readings": {
    "(0,0)": {
      "moisture": 82,
      "health_status": "healthy",
      "filename": "plant_001.jpg",
      "confidence_score": 0.93
    },
    "(0,1)": {
      "moisture": 13,
      "health_status": "unhealthy",
      "filename": "plant_002.jpg",
      "confidence_score": 0.88
    },
    "(0,2)": {
      "moisture": 67,
      "health_status": "healthy",
      "filename": "plant_003.jpg",
      "confidence_score": 0.97
    },
    "(1,0)": {
      "moisture": 41,
      "health_status": "no any plant",
      "filename": "empty_001.jpg",
      "confidence_score": 0.45
    },
    "(1,1)": {
      "moisture": 99,
      "health_status": "healthy",
      "filename": "plant_004.jpg",
      "confidence_score": 0.96
    },
    "(1,2)": {
      "moisture": 29,
      "health_status": "unhealthy",
      "filename": "plant_005.jpg",
      "confidence_score": 0.79
    },
    "(2,0)": {
      "moisture": 6,
      "health_status": "unhealthy",
      "filename": "plant_006.jpg",
      "confidence_score": 0.69
    },
    "(2,1)": {
      "moisture": 73,
      "health_status": "healthy",
      "filename": "plant_007.jpg",
      "confidence_score": 0.91
    },
    "(2,2)": {
      "moisture": 57,
      "health_status": "no any plant",
      "filename": "empty_002.jpg",
      "confidence_score": 0.52
    }
  }
}

const mock_val_CS = { "online": true };


export async function checkSoilMoisture() {
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

export async function getImage(filename) {
  const res = await axios.get(`${BASE_URL}/image`, {
    params: { filename },
    responseType: 'blob',  // ensure you get the image data as binary
  });

  return res.data;  // this will be a Blob
}

export async function getImageBase64(filename) {
  const blob = await getImage(filename);

  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

