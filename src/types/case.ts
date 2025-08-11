/** 공통 */
export type DRFOutputType = "HTML" | "XML" | "JSON";
export type CaseTarget = "prec";
export type CaseSearchScope = 1 | 2;
export type CaseSort = "lasc" | "ldes" | "dasc" | "ddes" | "nasc" | "ndes";
export type PopupYN = "Y" | "N";

/* ===================================================
   판례 목록 조회 (lawSearch.do)
   https://open.law.go.kr/LSO/openApi/guideResult.do
   =================================================== */

/** 목록 요청 파라미터 */
export interface CaseListRequest {
  search?: CaseSearchScope; // 1: 판례명(기본), 2: 본문
  query?: string;
  display?: number; // default 20, max 100
  page?: number; // default 1
  org?: string;
  curt?: string;
  JO?: string;
  gana?: string;
  sort?: CaseSort;
  date?: number;
  prncYd?: string;
  nb?: string;
  datSrcNm?: string;
  popYn?: PopupYN;
}

/** 목록 아이템 Raw */
export interface CaseListItemRaw {
  id: string | number;
  데이터출처명?: string;
  법원명: string;
  법원종류코드: string;
  사건명: string;
  사건번호: string;
  사건종류명: string;
  사건종류코드: string;
  선고: string;
  선고일자: string;
  판례일련번호: string;
  판례상세링크?: string;
  판결유형: string;
}

/** 목록 응답 Raw */
export interface CaseListResponseRaw {
  PrecSearch: {
    키워드?: string;
    page: string;
    target: CaseTarget | string;
    prec: CaseListItemRaw[];
    totalCnt: string | number;
    section?: "evtNm" | "EvtNm" | "bdyText";
  };
}

/** 목록 아이템 */
export interface CaseListItem {
  id: number;
  caseSerialId: number;
  caseName: string;
  caseNumber: string;
  decisionDate: string;
  courtName: string;
  courtTypeCode?: number;
  caseTypeName: string;
  caseTypeCode: number;
  judgmentType: string;
  sentence: string;
  dataSourceName?: string;
  detailUrl?: string;
}

/** 목록 응답 */
export interface CaseListResponse {
  keyword?: string;
  page: number;
  target: string;
  items: CaseListItem[];
  totalCount: number;
  section?: "evtNm" | "EvtNm" | "bdyText";
}

/** 원본 → 정규화 매퍼 */
export const mapCaseListResponse = (
  raw: CaseListResponseRaw
): CaseListResponse => {
  const env = raw?.PrecSearch ?? ({} as CaseListResponseRaw["PrecSearch"]);

  const items: CaseListItem[] = (env.prec ?? []).map((r) => ({
    id: Number(r.id),
    caseSerialId: Number(r.판례일련번호),
    caseName: r.사건명,
    caseNumber: r.사건번호,
    decisionDate: r.선고일자,
    courtName: r.법원명,
    courtTypeCode:
      r.법원종류코드 === "" || r.법원종류코드 === undefined
        ? undefined
        : Number(r.법원종류코드),
    caseTypeName: r.사건종류명,
    caseTypeCode: Number(r.사건종류코드),
    judgmentType: r.판결유형,
    sentence: r.선고,
    dataSourceName: r.데이터출처명,
    detailUrl: r.판례상세링크,
  }));

  return {
    keyword: env.키워드,
    target: String(env.target),
    page: Number(env.page),
    totalCount: Number(env.totalCnt),
    section: env.section,
    items,
  };
};

/* ===================================================
   판례 본문 조회 (lawService.do)
   https://open.law.go.kr/LSO/openApi/guideResult.do
   =================================================== */

/** 상세 요청 파라미터 */
export interface CaseDetailRequest {
  ID: string;
  LM?: string;
}

/** 상세 응답 Raw */
export interface CaseDetailResponseRaw {
  법원명: string;
  법원종류코드: string;
  사건명: string;
  사건번호: string;
  사건종류명: string;
  사건종류코드: string;
  선고: string;
  선고일자: string; // "20220819"
  참조조문: string;
  참조판례: string;
  판결요지: string;
  판결유형: string;
  판례내용: string;
  판례정보일련번호: string;
  판시사항: string;
}

/** 상세 응답 (정규화) */
export interface CaseDetailResponse {
  courtName: string;
  courtTypeCode: number;
  caseName: string;
  caseNumber: string;
  caseTypeName: string;
  caseTypeCode: number;
  sentence: string;
  decisionDate: number;
  referencedArticles: string;
  referencedCases: string;
  judgmentType: string;
  summary: string;
  body: string;
  caseInfoSerialId: number;
  issues: string;
}

/** 상세: Raw -> 정규화 매퍼 */
export const mapCaseDetailResponse = (
  raw: CaseDetailResponseRaw
): CaseDetailResponse => ({
  courtName: raw.법원명,
  courtTypeCode: Number(raw.법원종류코드),
  caseName: raw.사건명,
  caseNumber: raw.사건번호,
  caseTypeName: raw.사건종류명,
  caseTypeCode: Number(raw.사건종류코드),
  sentence: raw.선고,
  decisionDate: Number(raw.선고일자), // "20220819" -> 20220819
  referencedArticles: raw.참조조문,
  referencedCases: raw.참조판례,
  judgmentType: raw.판결유형,
  summary: raw.판결요지,
  body: raw.판례내용,
  caseInfoSerialId: Number(raw.판례정보일련번호),
  issues: raw.판시사항,
});
