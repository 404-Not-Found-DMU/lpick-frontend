// 커뮤니티 임시 데이터

export const FEATURED_POSTS = [
  {
    id: 1,
    title: '새로 추가된 LP 음원 추천 목록',
    description:
      '최근 업데이트된 LP 음원들 중에서 특별히 추천하는 목록입니다. 클래식부터 재즈까지 다양한 장르의 명반들을 소개합니다.',
    content: `최근 업데이트된 LP 음원들 중에서 특별히 추천하는 목록입니다. 클래식부터 재즈까지 다양한 장르의 명반들을 소개합니다.

<h3>클래식 추천</h3>
<ul>
<li>베토벤 교향곡 9번 - 카라얀 지휘</li>
<li>모차르트 피아노 협주곡 - 호로비츠 연주</li>
</ul>

<h3>재즈 추천</h3>
<ul>
<li>Miles Davis - Kind of Blue</li>
<li>John Coltrane - A Love Supreme</li>
</ul>

음질과 연주 모두 최고 수준이니 꼭 들어보시길 추천드립니다!`,
    author: '음악애호가',
    date: '2025-01-10',
    views: 1524,
    likes: 42,
    comments: 18,
    category: '추천',
    image: '/lplayer/temp/images/album1.png',
    tags: ['LP', '클래식', '재즈', '추천'],
  },
  {
    id: 2,
    title: '오래된 LP 관리 방법이 궁금합니다',
    description:
      '오래된 LP 레코드를 어떻게 관리하고 보관해야 하는지 궁금합니다. 특히 습도나 온도 관리에 대해 조언 부탁드립니다.',
    content: `오래된 LP 레코드를 어떻게 관리하고 보관해야 하는지 궁금합니다. 특히 습도나 온도 관리에 대해 조언 부탁드립니다.

제가 소장하고 있는 LP 중에는 1960년대 초반 것들도 있는데, 관리를 잘못하면 상태가 나빠질까 걱정됩니다.

<h3>현재 보관 상태</h3>
- 직사광선이 들지 않는 서재
- 세로로 세워서 보관
- 습도계는 따로 없음

혹시 LP 관리에 경험이 많으신 분들의 조언 부탁드립니다!`,
    author: '레코드초보',
    date: '2025-01-09',
    views: 856,
    likes: 23,
    comments: 31,
    category: '질문',
    image: '/lplayer/temp/images/album2.png',
    tags: ['LP관리', '보관', '질문'],
  },
  {
    id: 3,
    title: 'LP 재생기 추천해주세요 [초보]',
    description:
      'LP를 처음 시작하려고 합니다. 초보자에게 적합한 턴테이블과 재생기를 추천해주시면 감사하겠습니다. 예산은 50만원 내외입니다.',
    content: `LP를 처음 시작하려고 합니다. 초보자에게 적합한 턴테이블과 재생기를 추천해주시면 감사하겠습니다.

<h3>제 상황</h3>
- 예산: 50만원 내외
- 완전 초보자
- 원룸에서 사용 예정
- 주로 재즈, 록 음악 감상

<h3>고려사항</h3>
- 사용하기 쉬울 것
- A/S가 용이할 것
- 소음이 적을 것

많은 조언 부탁드립니다!`,
    author: '신규유저',
    date: '2025-01-08',
    views: 2103,
    likes: 67,
    comments: 45,
    category: '질문',
    image: '/lplayer/temp/images/album3.png',
    tags: ['초보', '추천', '턴테이블'],
  },
];

export const RECENT_POSTS = [
  {
    id: 4,
    title: '오늘은 내가 좋아하는 웹사이트',
    author: '웹개발자',
    date: '2025-01-13',
    views: 156,
    likes: 8,
    comments: 3,
    category: '자유',
    content: `웹개발을 하다보면 좋은 레퍼런스 사이트들을 많이 찾게 되는데, 오늘은 제가 자주 사용하는 사이트들을 공유해볼까 합니다.

<h3>디자인 참고 사이트</h3>
<ul>
<li>Dribbble - 창의적인 디자인 아이디어</li>
<li>Behance - 포트폴리오와 작업물 참고</li>
<li>Pinterest - 다양한 UI/UX 컨셉</li>
</ul>

<h3>개발 도구</h3>
<ul>
<li>GitHub - 코드 저장소 및 협업</li>
<li>Stack Overflow - 개발 문제 해결</li>
<li>CodePen - 프론트엔드 실험</li>
</ul>

여러분도 자주 사용하는 유용한 사이트가 있다면 공유해주세요!`,
    image: '/lplayer/temp/images/album4.png',
    tags: ['웹개발', '참고사이트', '도구'],
  },
  {
    id: 5,
    title: 'LP 음원이 디지털보다 좋은 이유',
    author: '아날로그러버',
    date: '2025-01-12',
    views: 743,
    likes: 34,
    comments: 12,
    category: '토론',
    content: `LP의 아날로그 사운드는 디지털에서는 느낄 수 없는 따뜻함과 깊이가 있습니다. 이에 대해 자세히 설명드리겠습니다.

<h3>아날로그 사운드의 특징</h3>
<ul>
<li>연속적인 음파 표현</li>
<li>자연스러운 하모닉스</li>
<li>따뜻한 음색</li>
<li>미세한 뉘앙스 표현</li>
</ul>

<h3>디지털과의 차이점</h3>
디지털은 샘플링을 통해 음원을 저장하지만, LP는 실제 음파의 형태를 그대로 기록합니다. 이로 인해 더 풍부하고 자연스러운 소리를 재생할 수 있습니다.

물론 편의성이나 휴대성 면에서는 디지털이 우수하지만, 음악 감상의 깊이와 감동 면에서는 LP가 압도적입니다.

여러분의 생각은 어떠신가요?`,
    image: '/lplayer/temp/images/album5.png',
    tags: ['아날로그', '음질', '토론'],
  },
  {
    id: 6,
    title: '추천 재즈 LP 모음집',
    author: '재즈마니아',
    date: '2025-01-11',
    views: 421,
    likes: 19,
    comments: 7,
    category: '추천',
    content: `재즈를 사랑하는 모든 분들에게 추천하는 명반들을 소개합니다. 마일즈 데이비스부터 존 콜트레인까지...

<h3>재즈 입문자를 위한 필수 앨범</h3>
<ul>
<li>Miles Davis - Kind of Blue (1959)</li>
<li>Dave Brubeck - Time Out (1959)</li>
<li>Bill Evans - Waltz for Debby (1961)</li>
<li>Charlie Parker - Bird and Diz (1950)</li>
</ul>

<h3>중급자를 위한 추천 앨범</h3>
<ul>
<li>John Coltrane - A Love Supreme (1965)</li>
<li>Thelonious Monk - Monk's Dream (1963)</li>
<li>Art Blakey - Moanin' (1958)</li>
<li>Clifford Brown - Study in Brown (1955)</li>
</ul>

각 앨범마다 독특한 매력이 있으니 천천히 감상해보시기 바랍니다. 재즈의 세계는 정말 무궁무진합니다!`,
    image: '/lplayer/temp/images/album1.png',
    tags: ['재즈', '명반', '추천'],
  },
  {
    id: 7,
    title: '기타와 LP의 조합',
    author: '기타리스트',
    date: '2025-01-10',
    views: 298,
    likes: 12,
    comments: 4,
    category: '자유',
    content: `기타를 연주하면서 좋은 LP를 틀어놓으면 정말 환상적인 조합이 나옵니다.

<h3>연습할 때 좋은 LP</h3>
<ul>
<li>Wes Montgomery - The Incredible Jazz Guitar</li>
<li>Jim Hall - Concierto</li>
<li>Pat Metheny - Bright Size Life</li>
</ul>

<h3>휴식할 때 듣는 LP</h3>
<ul>
<li>Norah Jones - Come Away with Me</li>
<li>Diana Krall - The Look of Love</li>
<li>Kings of Convenience - Riot on an Empty Street</li>
</ul>

음악을 연주하는 입장에서 LP의 따뜻한 소리는 정말 큰 영감을 줍니다. 디지털로는 절대 느낄 수 없는 그 특별함이 있어요.`,
    image: '/lplayer/temp/images/album2.png',
    tags: ['기타', '연주', '감상'],
  },
  {
    id: 8,
    title: 'LP 재생기 수리점 추천',
    author: '수리전문가',
    date: '2025-01-09',
    views: 887,
    likes: 41,
    comments: 23,
    category: '정보',
    content: `오래된 LP 재생기가 고장났을 때 믿을 만한 수리점들을 추천드립니다.

<h3>서울 지역</h3>
<ul>
<li>종로구 - 올드 사운드 (전문 수리점)</li>
<li>강남구 - 아날로그 메카닉</li>
<li>마포구 - LP 닥터</li>
</ul>

<h3>경기 지역</h3>
<ul>
<li>수원 - 빈티지 오디오</li>
<li>고양 - 레트로 사운드</li>
</ul>

<h3>수리 시 주의사항</h3>
1. 사전에 견적을 꼭 받아보세요
2. 부품 교체 시 정품 여부 확인
3. 수리 후 보증 기간 확인
4. 가능하면 직접 방문해서 상담

좋은 수리점을 찾는 것도 LP 생활의 중요한 부분이니까요!`,
    image: '/lplayer/temp/images/album3.png',
    tags: ['수리', '정보', '추천'],
  },
  {
    id: 9,
    title: '노래추천 모아바둔거',
    author: '음악큐레이터',
    date: '2025-01-08',
    views: 654,
    likes: 28,
    comments: 9,
    category: '추천',
    content: `오랜 시간에 걸쳐 모아둔 좋은 노래들을 여러분과 공유하고 싶습니다.

<h3>잔잔한 분위기</h3>
<ul>
<li>Billie Holiday - Strange Fruit</li>
<li>Eva Cassidy - Fields of Gold</li>
<li>Nick Drake - River Man</li>
<li>Mazzy Star - Fade Into You</li>
</ul>

<h3>신나는 분위기</h3>
<ul>
<li>Stevie Wonder - Superstition</li>
<li>James Brown - Get Up (I Feel Like Being a) Sex Machine</li>
<li>Earth, Wind & Fire - September</li>
<li>Parliament - Flash Light</li>
</ul>

<h3>감성적인 분위기</h3>
<ul>
<li>The Smiths - There Is a Light That Never Goes Out</li>
<li>Radiohead - Fake Plastic Trees</li>
<li>Jeff Buckley - Hallelujah</li>
<li>Bon Iver - Holocene</li>
</ul>

각자 취향이 다르겠지만, 한 번씩은 들어볼 만한 곡들이라고 생각합니다!`,
    image: '/lplayer/temp/images/album4.png',
    tags: ['플레이리스트', '추천', '큐레이션'],
  },
  {
    id: 10,
    title: '오디오파일을 위한 LP 케어 가이드',
    author: 'Hi-Fi마스터',
    date: '2025-01-07',
    views: 1205,
    likes: 56,
    comments: 18,
    category: '정보',
    content: `진정한 오디오파일이라면 LP 관리에 특별한 신경을 써야 합니다. 제가 20년간 쌓은 노하우를 공유합니다.

<h3>청소 도구</h3>
<ul>
<li>카본 파이버 브러시 - 일상적인 먼지 제거</li>
<li>벨벳 브러시 - 깊은 청소용</li>
<li>레코드 클리닝 솔루션 - 전문 세정제</li>
<li>마이크로파이버 천 - 마무리용</li>
</ul>

<h3>보관 방법</h3>
1. 온도 18-24도, 습도 45-50% 유지
2. 직사광선과 열원 차단
3. 수직으로 세워서 보관 (기울어지지 않게)
4. 너무 빽빽하게 보관하지 말 것

<h3>재생 전 체크리스트</h3>
- 바늘 상태 확인
- LP 표면 청소
- 턴테이블 벨트 점검
- 카트리지 정렬 확인

이 정도만 지켜도 LP를 최상의 상태로 유지할 수 있습니다!`,
    image: '/lplayer/temp/images/album5.png',
    tags: ['케어', '관리', '오디오파일'],
  },
  {
    id: 11,
    title: '클래식 LP 입문자를 위한 추천 목록',
    author: '클래식애호가',
    date: '2025-01-06',
    views: 892,
    likes: 47,
    comments: 15,
    category: '추천',
    content: `클래식 음악을 LP로 처음 접하는 분들을 위한 입문용 추천 목록입니다.

<h3>교향곡 입문</h3>
<ul>
<li>베토벤 교향곡 5번 "운명" - 카라얀/베를린 필하모닉</li>
<li>모차르트 교향곡 40번 - 발터/컬럼비아 심포니</li>
<li>드보르자크 교향곡 9번 "신세계로부터" - 셀/클리블랜드</li>
</ul>

<h3>협주곡 입문</h3>
<ul>
<li>차이콥스키 피아노 협주곡 1번 - 클라이번/콘드라신</li>
<li>모차르트 피아노 협주곡 23번 - 페라이어/잘츠부르크</li>
<li>비발디 사계 - 무터/카라얀</li>
</ul>

<h3>실내악 입문</h3>
<ul>
<li>슈베르트 피아노 5중주 "송어" - 쿠르타크 앙상블</li>
<li>바흐 골드베르크 변주곡 - 굴드 (1955년 녹음)</li>
</ul>

이 앨범들은 모두 LP의 아날로그 특성을 잘 살려주는 명반들입니다. 클래식의 깊이를 느껴보세요!`,
    image: '/lplayer/temp/images/album1.png',
    tags: ['클래식', '입문', '교향곡'],
  },
  {
    id: 12,
    title: 'LP 수집가의 하루 루틴',
    author: '컬렉터김씨',
    date: '2025-01-05',
    views: 567,
    likes: 23,
    comments: 11,
    category: '자유',
    content: `LP 수집을 시작한 지 15년이 되어가는 저의 일상을 공유해봅니다.

<h3>오전 (7:00 - 12:00)</h3>
- 기상 후 첫 LP: 재즈나 클래식으로 하루 시작
- 컬렉션 정리 및 상태 체크 (주 2회)
- 온라인 LP 쇼핑몰 체크 (신상품 확인)

<h3>오후 (12:00 - 18:00)</h3>
- 점심 식사와 함께 보사노바나 라운지 음악
- LP 매장 순례 (주말에는 필수 코스)
- 새로 구입한 LP 청취 및 평가

<h3>저녁 (18:00 - 24:00)</h3>
- 저녁 식사와 함께 소울/펑크 음악
- LP 청소 및 관리 작업
- 잠들기 전 잔잔한 포크나 어쿠스틱

<h3>주말 특별 활동</h3>
- LP 박람회나 벼룩시장 방문
- 다른 컬렉터들과의 교환/거래
- 새로운 아티스트 발굴

LP가 있는 삶은 정말 풍요롭습니다. 여러분의 루틴도 궁금하네요!`,
    image: '/lplayer/temp/images/album2.png',
    tags: ['수집', '일상', '루틴'],
  },
];

// 전체 게시글 목록 (Featured + Recent)
export const SAMPLE_POSTS = [...FEATURED_POSTS, ...RECENT_POSTS];

export const CATEGORIES = [
  { id: 'all', name: '전체', count: 315 },
  { id: 'recommend', name: '추천', count: 78 },
  { id: 'question', name: '질문', count: 95 },
  { id: 'discussion', name: '토론', count: 45 },
  { id: 'info', name: '정보', count: 67 },
  { id: 'free', name: '자유', count: 103 },
];

export const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    추천: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    질문: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    토론: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    정보: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    자유: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  };
  return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
};
