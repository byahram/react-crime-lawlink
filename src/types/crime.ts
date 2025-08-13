/**
 * 범죄 통계 API 요청 파라미터
 * @see https://kicj.re.kr/api/select/CrimeStatistics/getCrimeStatistics
 */

export interface CrimeRequest {
  serviceKey: string; // 인증키
  type: "JSON" | "XML"; // 데이터 타입
  sht: string; // 표 코드
  statsYr: string; // 통계연도
  artcl?: string; // 항목 식별자
  clsf?: string; // 분류 식별자
}

export type CrimeParams = Omit<CrimeRequest, "serviceKey" | "type">;

export type CrimeStatisticsParams = CrimeParams;
export type CrimeAnalysisParams = CrimeParams;
