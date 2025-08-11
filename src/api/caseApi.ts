import axios from "axios";
import {
  mapCaseDetailResponse,
  mapCaseListResponse,
  type CaseDetailResponse,
  type CaseDetailResponseRaw,
  type CaseListRequest,
  type CaseListResponse,
  type CaseListResponseRaw,
} from "../types/case";

const CASE_BASE_URL = "http://www.law.go.kr/DRF";

// axios 인스턴스
const caseAxios = axios.create({
  baseURL: CASE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    OC: import.meta.env.VITE_PUBLIC_OC,
    target: "prec",
    type: "JSON",
  },
  timeout: 15000,
});

// 판례 목록 조회 Raw
export const getCaseListRaw = async ({
  params = {} as CaseListRequest,
} = {}): Promise<CaseListResponseRaw> => {
  try {
    const res = await caseAxios.get<CaseListResponseRaw>("/lawSearch.do", {
      params,
    });

    return res.data;
  } catch (error) {
    console.error("getCaseListRaw API 호출 실패:", error);
    throw error;
  }
};

// 판례 목록 조회
export const getCaseList = async ({
  params = {} as CaseListRequest,
}): Promise<CaseListResponse> => {
  const raw = await getCaseListRaw({ params });
  return mapCaseListResponse(raw);
};

// 판례 상세 조회 Raw (ID 필수, LM 선택)
export const getCaseDetailRaw = async (
  ID: string,
  LM?: string
): Promise<CaseDetailResponseRaw> => {
  try {
    if (!ID?.trim()) throw new Error("ID는 필수 값입니다.");

    const params: Record<string, string> = {
      ID: ID.trim(),
      // type: "HTML",
      ...(LM?.trim() ? { LM: LM.trim() } : {}),
    };

    // const url = caseAxios.getUri({ url: "/lawService.do", params });
    // console.log("[getCaseDetail] GET:", url);

    const res = await caseAxios.get<CaseDetailResponseRaw>("/lawService.do", {
      params,
    });

    return res.data;
  } catch (error) {
    console.error("getCaseDetailRaw API 호출 실패:", error);
    throw error;
  }
};

// 판례 상세 조회
export const getCaseDetail = async (
  ID: string,
  LM?: string
): Promise<CaseDetailResponse> => {
  const raw = await getCaseDetailRaw(ID, LM);
  return mapCaseDetailResponse(raw);
};
