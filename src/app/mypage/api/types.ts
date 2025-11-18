/**
 * 마이페이지 API 응답 타입 정의 (Swagger 기반)
 */

// 페이지네이션 공통 타입
export interface Pageable {
  pageNumber: number;
  unpaged: boolean;
  paged: boolean;
  pageSize: number;
  offset: number;
  sort: Sort;
}

export interface Sort {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}

export interface PagedResponse<T> {
  totalElements: number;
  totalPages: number;
  pageable: Pageable;
  numberOfElements: number;
  size: number;
  content: T[];
  number: number;
  sort: Sort;
  first: boolean;
  last: boolean;
  empty: boolean;
}

// 사용자 앨범 타입
export interface UserAlbum {
  userAlbumId: string;
  name: string;
  profile: string;
  artistName: string;
  recordFile: string;
  releaseDate: string; // ISO 8601 format
  releaseCountry: string;
  label: string;
  favorite: boolean;
}

// 사용자 장비 타입
export interface UserGear {
  id: string;
  name: string;
  modelName: string;
  brand: string;
  gearClass: 'TURNTABLE' | 'SPEAKER' | 'HEADPHONE';
  img: string;
  wikiId: string;
  favorite: boolean;
}

export interface UserGearData {
  userId: string;
  ownedSpeaker: UserGear;
  ownedHeadPhone: UserGear;
  ownedTurnTable: UserGear;
}

// 사용자 장비 응답 (GET /api/v1/user/gear)
export type UserGearResponse = UserGearData;

// 마이페이지 장비 응답 (GET /api/v1/user-album - gear 데이터 포함)
export interface MyPageGearResponse {
  data: UserGearData;
  blindedToOther: boolean;
}

// 장비 추가 요청
export interface AddGearRequest {
  gearId: string;
  gearClass: 'TURNTABLE' | 'SPEAKER' | 'HEADPHONE';
}

// 장비 검색 응답
export interface GearSearchResult {
  gearId: string;
  eqClass: 'TURNTABLE' | 'SPEAKER' | 'HEADPHONE';
  modelName: string;
  brand: string;
  name: string;
  img: string | null;
}

// 임시 장비 추가 요청
export interface TempGearRequest {
  modelName: string;
  gearClass: 'TURNTABLE' | 'SPEAKER' | 'HEADPHONE';
  brand: string;
  specJson: Record<string, unknown>;
}

// 임시 장비 추가 응답
export interface TempGearResponse {
  id: string;
}

// 분류별 장비 리스트 조회 응답
export interface GearListItem {
  id: string;
  name: string;
  modelName: string;
  brand: string;
  gearClass: 'TURNTABLE' | 'SPEAKER' | 'HEADPHONE';
  img: string;
  wikiId: string;
  favorite: boolean;
}

export type GearListResponse = GearListItem[];

// 다른 사용자 장비 조회 응답
export interface OtherUserGearResponse {
  data: UserGearData;
  blindedToOther: boolean;
}

// 장비 즐겨찾기 토글 요청
export interface GearFavoriteToggleRequest {
  favorite: boolean;
}

// 장비 즐겨찾기 토글 응답
export interface GearFavoriteToggleResponse {
  favorite: boolean;
}

// 앨범 즐겨찾기 토글 요청
export interface AlbumFavoriteToggleRequest {
  favorite: boolean;
}

// 앨범 레코드 정보
export interface AlbumRecord {
  userAlbumId: string;
  recordFile?: string;
}

// 사용자 앨범 목록 응답 (GET /api/v1/user-album)
export type UserAlbumsResponse = PagedResponse<UserAlbum>;

// 사용자 앨범 상세 응답 (GET /api/v1/user-album/{userAlbumId})
export type UserAlbumDetailResponse = UserAlbum;

// 즐겨찾기 앨범 목록 응답 (GET /api/v1/user-album/favorite)
export type FavoriteAlbumsResponse = UserAlbum[];

// 장르별 카운트 응답 (GET /api/v1/user-album/count)
export interface GenreCountResponse {
  [genre: string]: number;
}

// 마이페이지 특정 사용자 앨범 응답 (GET /api/v1/my-page/{oauthId}/user-album)
export interface MyPageUserAlbumResponse {
  data: PagedResponse<UserAlbum>;
  blindedToOther: boolean;
}

// 공통 API 응답 래퍼
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: number;
}

// 에러 응답
export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

// 페이지네이션 파라미터
export interface PaginationParams {
  page?: number;
  size?: number;
  sort?: string;
}