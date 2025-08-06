import type { CategoryData, TextBlock } from '@/types/hierarchical.editor.types';

// LP 더미 데이터
export const dummyLPData = {
  categoryData: {
    type: 'lp' as const,
    data: {
      infobox: {
        title: 'The Dark Side of the Moon',
        artist: 'Pink Floyd',
        coverUrl: '/images/album1.png',
        releaseDate: '1973-03-01',
        genre: 'Progressive Rock',
        label: 'Harvest Records',
        lpInfos: [
          { label: 'Producer', value: 'Pink Floyd' },
          { label: 'Engineer', value: 'Alan Parsons' }
        ]
      },
      tracklist: {
        tracks: [
          { number: 1, title: 'Speak to Me', duration: '1:30' },
          { number: 2, title: 'Breathe (In the Air)', duration: '2:43' },
          { number: 3, title: 'On the Run', duration: '3:36' },
          { number: 4, title: 'Time', duration: '6:53' },
          { number: 5, title: 'The Great Gig in the Sky', duration: '4:36' },
          { number: 6, title: 'Money', duration: '6:23' },
          { number: 7, title: 'Us and Them', duration: '7:49' },
          { number: 8, title: 'Any Colour You Like', duration: '3:26' },
          { number: 9, title: 'Brain Damage', duration: '3:49' },
          { number: 10, title: 'Eclipse', duration: '2:03' }
        ]
      }
    }
  },
  textBlocks: [
    {
      id: '1',
      title: '앨범 개요',
      content: 'The Dark Side of the Moon은 Pink Floyd의 8번째 스튜디오 앨범으로, 1973년 3월 1일 발매되었습니다. 이 앨범은 현대 음악사에서 가장 중요한 작품 중 하나로 평가받고 있습니다.',
      depth: 1
    },
    {
      id: '2',
      title: '음악적 특징',
      content: '앨범은 실험적인 사운드와 깊이 있는 가사로 구성되어 있으며, 현대적인 녹음 기술을 활용하여 혁신적인 사운드를 만들어냈습니다.',
      depth: 1
    },
    {
      id: '3',
      title: '영향과 평가',
      content: '이 앨범은 전 세계적으로 4500만 장 이상 판매되었으며, 빌보드 차트에서 741주간 차트에 머물렀습니다.',
      depth: 1
    }
  ]
};

// 아티스트 더미 데이터
export const dummyArtistData = {
  categoryData: {
    type: 'artist' as const,
    data: {
      name: 'David Bowie',
      country: '영국',
      activePeriod: '1962-2016',
      roles: ['가수', '작곡가', '프로듀서', '배우'],
      imageUrl: '/images/artist1.jpg',
      discography: [
        { year: 1969, title: 'Space Oddity' },
        { year: 1972, title: 'The Rise and Fall of Ziggy Stardust' },
        { year: 1977, title: 'Heroes' },
        { year: 1983, title: 'Let\'s Dance' }
      ],
      activities: [
        { period: '1960s-1970s', description: '글램 록의 선구자로 활동' },
        { period: '1980s', description: '메인스트림 팝으로 성공' },
        { period: '1990s-2010s', description: '실험적 음악과 영화 활동' }
      ]
    }
  },
  textBlocks: [
    {
      id: '1',
      title: '생애와 경력',
      content: 'David Bowie는 1947년 1월 8일 영국 런던에서 태어났습니다. 1960년대부터 음악 활동을 시작하여 50년 이상 현대 음악계에 큰 영향을 미쳤습니다.',
      depth: 1
    },
    {
      id: '2',
      title: '음악적 스타일',
      content: 'Bowie는 글램 록, 얼터너티브 록, 일렉트로닉 등 다양한 장르를 넘나들며 혁신적인 음악을 만들어냈습니다.',
      depth: 1
    },
    {
      id: '3',
      title: '문화적 영향',
      content: '음악뿐만 아니라 패션, 예술, 영화 등 다양한 분야에서 문화적 아이콘으로 자리잡았습니다.',
      depth: 1
    }
  ]
};

// 장비 더미 데이터
export const dummyEquipmentData = {
  categoryData: {
    type: 'equipment' as const,
    data: {
      name: 'Fender Stratocaster',
      brand: 'Fender',
      releaseYear: '1954',
      description: '세계에서 가장 유명한 일렉트릭 기타 중 하나로, 다양한 음악 장르에서 사용됩니다.',
      equipmentType: 'guitar' as const,
      imageUrl: '/images/guitar1.jpg'
    }
  },
  textBlocks: [
    {
      id: '1',
      title: '개발 배경',
      content: 'Fender Stratocaster는 1954년 Leo Fender에 의해 개발되었으며, 당시 혁신적인 디자인과 사운드로 기타 역사에 새로운 장을 열었습니다.',
      depth: 1
    },
    {
      id: '2',
      title: '기술적 특징',
      content: '3개의 싱글 코일 픽업, 트레몰로 브릿지, 컨투어드 바디 등 혁신적인 기능들이 특징입니다.',
      depth: 1
    },
    {
      id: '3',
      title: '사용자들',
      content: 'Jimi Hendrix, Eric Clapton, David Gilmour 등 수많은 레전드 뮤지션들이 사용한 기타입니다.',
      depth: 1
    }
  ]
};

// 기타 더미 데이터
export const dummyOtherData = {
  categoryData: {
    type: 'other' as const,
    data: {
      title: '록 음악의 역사',
      content: '록 음악은 1950년대부터 시작되어 현대 음악의 중요한 장르로 발전했습니다.'
    }
  },
  textBlocks: [
    {
      id: '1',
      title: '초기 역사',
      content: '록 음악은 1950년대 미국에서 블루스와 컨트리 음악이 결합되어 탄생했습니다.',
      depth: 1
    },
    {
      id: '2',
      title: '황금기',
      content: '1960-1970년대는 록 음악의 황금기로, 다양한 하위 장르가 발전했습니다.',
      depth: 1
    },
    {
      id: '3',
      title: '현대적 발전',
      content: '1980년대 이후 록 음악은 다양한 방향으로 발전하며 현대 음악의 중요한 축을 담당하고 있습니다.',
      depth: 1
    }
  ]
};

// 카테고리별 더미 데이터 매핑
export const dummyDataMap = {
  lp: dummyLPData,
  artist: dummyArtistData,
  equipment: dummyEquipmentData,
  other: dummyOtherData
} as const;

// 타입 안전한 더미 데이터 가져오기 함수
export const getDummyData = (category: keyof typeof dummyDataMap) => {
  return dummyDataMap[category];
}; 