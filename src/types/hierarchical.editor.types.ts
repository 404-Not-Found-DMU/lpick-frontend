export interface TextBlock {
    id: string
    title: string
    content: string
    depth: 1 | 2 | 3
  }
  
  export interface LPInfo {
    id: string
    alias: string // 별칭 (예: 일본판, 독일판)
    material: string
    rpm: string
    diameter: string
    weight: string
    pressingCountry: string
    pressingInfo: string
    isColored: boolean
    labelType: string
    format: string
    specialNotes: string
  }

  export interface InfoboxData {
    title: string
    artist: string
    coverUrl: string
    releaseDate: string
    genre: string
    label: string
    lpInfos: LPInfo[] // 여러 LP 정보를 배열로 관리
  }
  
  export interface Track {
    id: string
    number: string
    title: string
    length: string
  }
  
  export interface TracklistData {
    tracks: Track[]
  }

  // 카테고리별 타입 정의
  export type WikiCategory = 'lp' | 'equipment' | 'artist' | 'other';

  // 장비 분류 타입
  export type EquipmentType = 'turntable' | 'speaker' | 'amp' | 'headphone' | 'other';

  // 장비 공통 정보
  export interface EquipmentBaseInfo {
    id?: string // 백엔드에서 생성하므로 옵셔널
    name: string
    brand: string
    releaseYear: string
    description: string
    equipmentType: EquipmentType
    imageUrl: string
  }

  // 턴테이블 추가 정보
  export interface TurntableInfo {
    rotationSpeed: string // "33 1/3", "45", "78" 등
    driveType: string // "벨트 구동", "직접 구동", "아이들러 구동" 등
    tonearmType: string // "S형", "직선형", "J형" 등
  }

  // 스피커 추가 정보
  export interface SpeakerInfo {
    type: string // "동적형", "정전형", "평면형" 등
    enclosureType: string // "밀폐형", "베이스 리플렉스", "호른 로드" 등
    output: string // "100W", "200W" 등
  }

  // 앰프 추가 정보
  export interface AmpInfo {
    output: string // "50W", "100W" 등
    inputTerminals: string // "XLR", "RCA", "6.35mm" 등
    hasVacuumTubes: boolean
  }

  // 헤드폰 추가 정보
  export interface HeadphoneInfo {
    type: string // "오픈형", "클로즈형", "세미오픈형" 등
    impedance: string // "32Ω", "250Ω" 등
  }

  // 장비 정보 (공통 + 분류별 추가 정보)
  export interface EquipmentInfo extends EquipmentBaseInfo {
    turntableInfo?: TurntableInfo
    speakerInfo?: SpeakerInfo
    ampInfo?: AmpInfo
    headphoneInfo?: HeadphoneInfo
  }

  // 아티스트 분류 타입
  export type ArtistRole = 'composer' | 'singer' | 'group' | 'producer' | 'arranger' | 'instrumentalist' | 'other';

  // 디스코그래피 항목
  export interface DiscographyItem {
    id: string // 프론트엔드에서 nanoid로 생성
    title: string
    releaseDate: string
    type: string // "앨범", "싱글", "EP", "컴필레이션" 등
    role: string // "작곡", "작사", "프로듀싱" 등
  }

  // 활동 이력 항목
  export interface ActivityItem {
    id: string // 프론트엔드에서 nanoid로 생성
    year: string
    title: string
    description: string
    type: string // "데뷔", "수상", "콘서트", "앨범 발매" 등
  }

  // 아티스트 정보
  export interface ArtistInfo {
    id?: string // 백엔드에서 생성하므로 옵셔널
    name: string
    country: string
    activePeriod: string
    roles: ArtistRole[]
    imageUrl: string
    discography: DiscographyItem[]
    activities: ActivityItem[]
  }

  // 기타 정보 (마크다운 에디터만 사용)
  export interface OtherInfo {
    id?: string // 백엔드에서 생성하므로 옵셔널
    title: string
    content: string // 마크다운
  }

  // 카테고리별 데이터 타입
  export type CategoryData = 
    | { type: 'lp'; data: { infobox: InfoboxData; tracklist: TracklistData } }
    | { type: 'equipment'; data: EquipmentInfo }
    | { type: 'artist'; data: ArtistInfo }
    | { type: 'other'; data: OtherInfo };

  // 재사용 가능한 에디터 props 타입
  export interface WikiEditorProps {
    category: WikiCategory;
    categoryData: CategoryData;
    textBlocks: TextBlock[];
    onCategoryDataChange: (data: CategoryData) => void;
    onTextBlocksChange: (blocks: TextBlock[]) => void;
  }

  // 카테고리별 폼 컴포넌트 props 타입
  export interface CategoryFormProps<T> {
    data: T;
    onUpdate: (data: T) => void;
  }
  