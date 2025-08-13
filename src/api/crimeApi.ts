import axios from "axios";
import type {
  CrimeAnalysisParams,
  CrimeStatisticsParams,
} from "../types/crime";

const CRIME_BASE_URL = "https://apis.data.go.kr/B554626";

// axios 인스턴스 생성
const crimeAxios = axios.create({
  baseURL: CRIME_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

const rawKey = (import.meta.env.VITE_CRIME_AUTH_KEY || "").trim();

const normalizedServiceKey = /%[0-9A-Fa-f]{2}/.test(rawKey)
  ? decodeURIComponent(rawKey)
  : rawKey;

crimeAxios.interceptors.request.use((config) => {
  const baseParams = {
    serviceKey: normalizedServiceKey,
    type: "JSON" as const,
  };
  config.params = { ...baseParams, ...(config.params || {}) };
  return config;
});

// 범죄 통계
export const getCrimeStats = async (params: CrimeStatisticsParams) => {
  try {
    const res = await crimeAxios.get("/CrimeStatistics/getCrimeStatistics", {
      params,
    });
    return res.data;
  } catch (error) {
    console.error("getCrimeStats API 호출 실패:", error);
    throw error;
  }
};

// 범죄 분석
export const getCrimeAnalysis = async (params: CrimeAnalysisParams) => {
  try {
    const res = await crimeAxios.get("/CrimeAnalysis/getCrimeAnalysis", {
      params,
    });
    return res.data;
  } catch (error) {
    console.error("getCrimeAnalysis API 호출 실패:", error);
    throw error;
  }
};
