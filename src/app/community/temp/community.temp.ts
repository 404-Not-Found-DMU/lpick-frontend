// 커뮤니티 임시 데이터 (API 스펙 기준)

export const FEATURED_POSTS = [
  {
    id: 1,
    articleId: 'article-001',
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
    oauthId: 'user-001',
    date: '2025-01-10',
    views: 1524,
    likes: 42,
    likeCount: 42,
    comments: 18,
    commentCount: 18,
    bookmarkCount: 15,
    liked: false,
    bookmarked: false,
    board: '음반' as const,
    tag: undefined,
    category: '추천',
    image: '/lplayer/temp/images/album1.png',
    tags: ['LP', '클래식', '재즈', '추천'],
  },
  {
    id: 2,
    articleId: 'article-002',
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
    oauthId: 'user-002',
    date: '2025-01-09',
    views: 856,
    likes: 23,
    likeCount: 23,
    comments: 31,
    commentCount: 31,
    bookmarkCount: 12,
    liked: false,
    bookmarked: true,
    board: '장비' as const,
    tag: '질문' as const,
    category: '질문',
    image: '/lplayer/temp/images/album2.png',
    tags: ['LP관리', '보관', '질문'],
  },
  {
    id: 3,
    articleId: 'article-003',
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
    oauthId: 'user-003',
    date: '2025-01-08',
    views: 2103,
    likes: 67,
    likeCount: 67,
    comments: 45,
    commentCount: 45,
    bookmarkCount: 23,
    liked: true,
    bookmarked: false,
    board: '장비' as const,
    tag: '질문' as const,
    category: '질문',
    image: '/lplayer/temp/images/album3.png',
    tags: ['초보', '추천', '턴테이블'],
  },
];

export const RECENT_POSTS = [
  {
    id: 4,
    articleId: 'article-004',
    title: '오늘은 내가 좋아하는 웹사이트',
    description: '웹개발에 유용한 참고 사이트들을 공유합니다.',
    author: '웹개발자',
    oauthId: 'user-004',
    date: '2025-01-13',
    views: 156,
    likes: 8,
    likeCount: 8,
    comments: 3,
    commentCount: 3,
    bookmarkCount: 5,
    liked: false,
    bookmarked: false,
    board: '자유게시판' as const,
    tag: undefined,
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
    articleId: 'article-005',
    title: 'LP 음원이 디지털보다 좋은 이유',
    description: 'LP의 아날로그 사운드가 디지털보다 우수한 이유를 설명합니다.',
    author: '아날로그러버',
    oauthId: 'user-005',
    date: '2025-01-12',
    views: 743,
    likes: 34,
    likeCount: 34,
    comments: 12,
    commentCount: 12,
    bookmarkCount: 18,
    liked: true,
    bookmarked: true,
    board: '자유게시판' as const,
    tag: undefined,
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
    description: '재즈 입문자와 중급자를 위한 필수 LP 앨범들을 소개합니다.',
    author: '재즈마니아',
    date: '2025-01-11',
    views: 421,
    likes: 19,
    comments: 7,
    board: '음반' as const,
    tag: undefined,
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
    articleId: 'article-007',
    title: '기타와 LP의 조합',
    author: '기타리스트',
    oauthId: 'user-007',
    date: '2025-01-10',
    views: 298,
    likes: 12,
    likeCount: 12,
    comments: 4,
    commentCount: 4,
    bookmarkCount: 8,
    liked: false,
    bookmarked: false,
    board: '아티스트' as const,
    tag: undefined,
    category: '추천',
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
    articleId: 'article-008',
    title: 'LP 재생기 수리점 추천',
    author: '수리전문가',
    oauthId: 'user-008',
    date: '2025-01-09',
    views: 887,
    likes: 41,
    likeCount: 41,
    comments: 23,
    commentCount: 23,
    bookmarkCount: 19,
    liked: false,
    bookmarked: true,
    board: '장비' as const,
    tag: '정보' as const,
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
    board: '음반' as const,
    tag: undefined,
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
    board: '장비' as const,
    tag: '정보' as const,
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
    board: '아티스트' as const,
    tag: undefined,
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
  {
    id: 13,
    title: '빈티지 LP 구매 시 주의사항',
    author: '빈티지헌터',
    date: '2025-01-04',
    views: 743,
    likes: 32,
    comments: 14,
    category: '정보',
    content: `빈티지 LP를 구매할 때 꼭 체크해야 할 사항들을 정리했습니다.`,
    image: '/lplayer/temp/images/album3.png',
    tags: ['빈티지', '구매팁', '정보'],
  },
  {
    id: 14,
    title: '록 음악 LP 추천 리스트',
    author: '록마니아',
    date: '2025-01-03',
    views: 1876,
    likes: 89,
    comments: 27,
    category: '추천',
    content: `명반 중의 명반들을 소개합니다. Led Zeppelin부터 Pink Floyd까지...`,
    image: '/lplayer/temp/images/album4.png',
    tags: ['록', '명반', '추천'],
  },
  {
    id: 15,
    title: 'LP 초보자가 저지르기 쉬운 실수들',
    author: 'LP멘토',
    date: '2025-01-02',
    views: 2134,
    likes: 76,
    comments: 43,
    category: '정보',
    content: `LP를 처음 시작하는 분들이 흔히 하는 실수들과 해결방법을 안내합니다.`,
    image: '/lplayer/temp/images/album5.png',
    tags: ['초보', '실수', '가이드'],
  },
  {
    id: 16,
    title: '오늘 구입한 LP 자랑',
    author: '쇼핑홀릭',
    date: '2025-01-01',
    views: 456,
    likes: 21,
    comments: 8,
    category: '자유',
    content: `오늘 레코드샵에서 발견한 보물들을 공유합니다!`,
    image: '/lplayer/temp/images/album1.png',
    tags: ['자랑', '신규구매', '보물'],
  },
  {
    id: 17,
    title: 'LP 음질 비교 리뷰',
    author: '음질덕후',
    date: '2024-12-31',
    views: 1543,
    likes: 67,
    comments: 23,
    category: '토론',
    content: `같은 곡의 다양한 LP 프레싱을 비교 분석했습니다.`,
    image: '/lplayer/temp/images/album2.png',
    tags: ['음질', '비교', '리뷰'],
  },
  {
    id: 18,
    title: '겨울에 듣기 좋은 따뜻한 LP',
    author: '계절음악가',
    date: '2024-12-30',
    views: 987,
    likes: 45,
    comments: 16,
    category: '추천',
    content: `추운 겨울, 마음을 따뜻하게 해주는 LP들을 추천합니다.`,
    image: '/lplayer/temp/images/album3.png',
    tags: ['겨울', '따뜻함', '계절'],
  },
  {
    id: 19,
    title: 'LP 카트리지 교체 후기',
    author: '기술자',
    date: '2024-12-29',
    views: 654,
    likes: 28,
    comments: 12,
    category: '정보',
    content: `오르토폰 카트리지로 교체하고 나서 달라진 점들을 리뷰합니다.`,
    image: '/lplayer/temp/images/album4.png',
    tags: ['카트리지', '교체', '후기'],
  },
  {
    id: 20,
    title: '소울 음악 LP 컬렉션 소개',
    author: '소울러버',
    date: '2024-12-28',
    views: 823,
    likes: 39,
    comments: 19,
    category: '자유',
    content: `제가 소장하고 있는 소울 음악 LP들을 소개합니다.`,
    image: '/lplayer/temp/images/album5.png',
    tags: ['소울', '컬렉션', '소개'],
  },
  {
    id: 21,
    title: 'LP 매장 탐방기 - 홍대편',
    author: '매장탐방러',
    date: '2024-12-27',
    views: 1234,
    likes: 56,
    comments: 22,
    category: '정보',
    content: `홍대 일대의 LP 매장들을 직접 방문하고 리뷰했습니다.`,
    image: '/lplayer/temp/images/album1.png',
    tags: ['매장', '홍대', '탐방'],
  },
  {
    id: 22,
    title: '라틴 재즈 LP 추천',
    author: '라틴재즈팬',
    date: '2024-12-26',
    views: 567,
    likes: 24,
    comments: 9,
    category: '추천',
    content: `열정적인 라틴 재즈 LP들을 추천드립니다.`,
    image: '/lplayer/temp/images/album2.png',
    tags: ['라틴재즈', '열정', '추천'],
  },
  {
    id: 23,
    title: 'LP 보관함 DIY 제작기',
    author: 'DIY마스터',
    date: '2024-12-25',
    views: 1876,
    likes: 98,
    comments: 34,
    category: '자유',
    content: `직접 만든 LP 보관함 제작 과정을 공유합니다.`,
    image: '/lplayer/temp/images/album3.png',
    tags: ['DIY', '보관함', '제작'],
  },
  {
    id: 24,
    title: 'LP 턴테이블 셋팅 가이드',
    author: '셋팅전문가',
    date: '2024-12-24',
    views: 2341,
    likes: 124,
    comments: 56,
    category: '정보',
    content: `턴테이블 최적 셋팅을 위한 상세 가이드입니다.`,
    image: '/lplayer/temp/images/album4.png',
    tags: ['턴테이블', '셋팅', '가이드'],
  },
  {
    id: 25,
    title: '크리스마스 LP 컬렉션',
    author: '크리스마스팬',
    date: '2024-12-23',
    views: 765,
    likes: 43,
    comments: 18,
    category: '추천',
    content: `크리스마스 시즌에 어울리는 LP들을 모아봤습니다.`,
    image: '/lplayer/temp/images/album5.png',
    tags: ['크리스마스', '시즌', '컬렉션'],
  },
  {
    id: 26,
    title: 'LP 음향 시스템 업그레이드',
    author: '오디오매니아',
    date: '2024-12-22',
    views: 1432,
    likes: 67,
    comments: 29,
    category: '토론',
    content: `LP 재생을 위한 음향 시스템 업그레이드 경험을 공유합니다.`,
    image: '/lplayer/temp/images/album1.png',
    tags: ['음향시스템', '업그레이드', '경험'],
  },
  {
    id: 27,
    title: '재즈 피아노 LP 베스트 10',
    author: '피아노재즈',
    date: '2024-12-21',
    views: 998,
    likes: 52,
    comments: 21,
    board: '아티스트' as const,
    tag: undefined,
    category: '추천',
    content: `재즈 피아노의 정수를 담은 LP 10선을 소개합니다.

<h3>전설적인 재즈 피아니스트들</h3>
<ul>
<li>Bill Evans - Waltz for Debby</li>
<li>Oscar Peterson - Night Train</li>
<li>Thelonious Monk - Monk's Dream</li>
<li>Ahmad Jamal - At the Pershing</li>
<li>Keith Jarrett - The Köln Concert</li>
</ul>

<h3>현대 재즈 피아노</h3>
<ul>
<li>Brad Mehldau - Art of the Trio</li>
<li>Esbjörn Svensson Trio - Strange Place for Snow</li>
<li>Robert Glasper - Black Radio</li>
<li>Hiromi Uehara - Brain</li>
<li>Chick Corea - Now He Sings, Now He Sobs</li>
</ul>

각 앨범마다 독특한 피아노 스타일과 해석을 들을 수 있어서 재즈 피아노 입문에 정말 좋습니다!`,
    image: '/lplayer/temp/images/album2.png',
    tags: ['재즈피아노', '베스트', '10선'],
  },
  {
    id: 28,
    title: 'LP 청소 도구 비교 리뷰',
    author: '청소전문가',
    date: '2024-12-20',
    views: 1654,
    likes: 78,
    comments: 31,
    category: '정보',
    content: `다양한 LP 청소 도구들의 성능을 비교 분석했습니다.`,
    image: '/lplayer/temp/images/album3.png',
    tags: ['청소도구', '비교', '리뷰'],
  },
  {
    id: 29,
    title: '일렉트로닉 음악도 LP로',
    author: '일렉트로닉팬',
    date: '2024-12-19',
    views: 543,
    likes: 26,
    comments: 11,
    board: '아티스트' as const,
    tag: undefined,
    category: '추천',
    content: `일렉트로닉 음악을 LP로 들으면 또 다른 매력이 있습니다.

<h3>추천 일렉트로닉 LP</h3>
<ul>
<li>Daft Punk - Random Access Memories</li>
<li>Aphex Twin - Selected Ambient Works</li>
<li>Kraftwerk - Trans-Europe Express</li>
<li>Four Tet - New Energy</li>
<li>Bonobo - Black Sands</li>
</ul>

<h3>LP로 듣는 일렉트로닉의 매력</h3>
- 따뜻한 아날로그 사운드
- 세심한 베이스 라인
- 공간감 있는 사운드스테이지
- 디지털과는 다른 질감

특히 앰비언트나 다운템포 장르는 LP의 특성과 정말 잘 어울립니다!`,
    image: '/lplayer/temp/images/album4.png',
    tags: ['일렉트로닉', 'LP', '매력'],
  },
  {
    id: 30,
    title: '한국 인디 뮤지션 LP 컬렉션',
    author: '인디음악러버',
    date: '2024-12-18',
    views: 432,
    likes: 19,
    comments: 7,
    board: '아티스트' as const,
    tag: undefined,
    category: '추천',
    content: `한국 인디 뮤지션들의 LP 앨범을 소개합니다.

<h3>추천 한국 인디 LP</h3>
<ul>
<li>잠비나이 - A Hermitage</li>
<li>혁오 - 20</li>
<li>검정치마 - 201</li>
<li>새소년 - 여름깃</li>
<li>전기뱀장어 - 엄마의 마음</li>
</ul>

<h3>LP로 듣는 한국 인디의 매력</h3>
- 세밀한 악기 편성
- 따뜻한 보컬 톤
- 섬세한 프로듀싱
- 독특한 한국적 정서

한국 인디 음악의 깊이와 감성을 LP로 느껴보세요!`,
    image: '/lplayer/temp/images/album5.png',
    tags: ['한국인디', 'K-인디', '추천'],
  },
];

// 전체 게시글 목록 (Featured + Recent)
export const SAMPLE_POSTS = [...FEATURED_POSTS, ...RECENT_POSTS];

// API 응답 형태로 변환하는 함수
export const createMockApiResponse = (posts: typeof SAMPLE_POSTS, page = 0, size = 6) => {
  const startIndex = page * size;
  const endIndex = startIndex + size;
  const pageContent = posts.slice(startIndex, endIndex);

  return {
    totalElements: posts.length,
    totalPages: Math.ceil(posts.length / size),
    numberOfElements: pageContent.length,
    size: size,
    content: pageContent.map((post) => ({
      articleId: post.articleId || `article-${post.id}`,
      title: post.title,
      likeCount: post.likeCount || post.likes || 0,
      commentCount: post.commentCount || post.comments || 0,
      bookmarkCount: post.bookmarkCount || 0,
      oauthId: post.oauthId || `user-${post.id}`,
    })),
    number: page,
    sort: {
      unsorted: false,
      empty: false,
      sorted: true,
    },
    pageable: {
      pageNumber: page,
      unpaged: false,
      offset: startIndex,
      sort: {
        unsorted: false,
        empty: false,
        sorted: true,
      },
      paged: true,
      pageSize: size,
    },
    first: page === 0,
    last: endIndex >= posts.length,
    empty: pageContent.length === 0,
  };
};

// 게시글 상세 조회를 위한 함수
export const getArticleDetail = (articleId: string) => {
  const post = SAMPLE_POSTS.find(
    (p) => p.articleId === articleId || `article-${p.id}` === articleId,
  );
  if (!post) return null;

  return {
    articleId: post.articleId || `article-${post.id}`,
    title: post.title,
    content: post.content,
    likeCount: post.likeCount || post.likes || 0,
    commentCount: post.commentCount || post.comments || 0,
    bookmarkCount: post.bookmarkCount || 0,
    oauthId: post.oauthId || `user-${post.id}`,
    liked: post.liked || false,
    bookmarked: post.bookmarked || false,
  };
};

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
