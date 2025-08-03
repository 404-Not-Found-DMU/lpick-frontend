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
    condition: string
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
    tableColor: string
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
  