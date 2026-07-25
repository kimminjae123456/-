import { SiteConfig, Inquiry, PortfolioItem, BlogPost } from '../types';

export const initialSiteConfig: SiteConfig = {
  companyName: '솔라클리어 (Solar Clear)',
  companyTagline: '태양광 발전 효율 향상! 현장 맞춤 특수 정밀 청소',
  heroTitle: '태양광 발전 효율,\n청소 하나로 향상시키세요',
  heroSubtitle: '태양광 전용 청소 로봇과 전문 장비로 발전 효율 향상과 패널 보호를 동시에 제공합니다.',
  phone: '010-5548-7100',
  email: 'solarclear88@gmail.com',
  address: '대전광역시 서구 월평중로 14번길 11, 402호',
  kakaoChatUrl: 'https://pf.kakao.com',
  primaryColor: 'blue',
  heroImageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=1600',
  businessNumber: '442-14-02849',
  ceoName: '김민재',
  workingHours: '평일 08:30 ~ 18:00 (주말/공휴일 긴급 견적 접수 가능)'
};

export const initialPortfolios: PortfolioItem[] = [
  {
    id: 'port-1',
    title: '전남 나주 3.5MW 임야 태양광 발전소',
    category: '메가와트',
    location: '전라남도 나주시',
    capacity: '3.5 MW',
    efficiencyGain: '+21.8%',
    beforeImageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=800',
    afterImageUrl: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800',
    description: '임야 경사지 태양광 발전소 오염 청소. 황사와 토사 분진, 조류 분변 고착물 완전 제거 후 발전 효율 +21.8% 회복.',
    cleaningMethod: '자율주행 청소 로봇 + 초순수(DI Water) 청소 + 열화상 점검',
    date: '',
    featured: true
  },
  {
    id: 'port-2',
    title: '충북 제천 농가 축사 지붕 800kW 태양광',
    category: '축사/농가',
    location: '충청북도 제천시',
    capacity: '800 kW',
    efficiencyGain: '+18.4%',
    beforeImageUrl: 'https://images.unsplash.com/photo-1545208942-e1c9c916524b?auto=format&fit=crop&q=80&w=800',
    afterImageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
    description: '축사 지붕 유해가스 및 분진으로 고착된 오염물 청소. 패널 표면 손상 없이 전용 로봇 및 분해제로 깨끗하게 청소.',
    cleaningMethod: '축사 전용 청소 세제 + 로봇 브러시 스크러빙',
    date: '',
    featured: true
  },
  {
    id: 'port-3',
    title: '경북 영천 공장 지붕 500kW 태양광',
    category: '상업용',
    location: '경상북도 영천시',
    capacity: '500 kW',
    efficiencyGain: '+24.5%',
    beforeImageUrl: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=800',
    afterImageUrl: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800',
    description: '공장 지붕 산업 분진 및 미세먼지로 찌든 때 정밀 청소. 친환경 유기 청소 세제와 로봇 청소로 오염 완전 제거.',
    cleaningMethod: '공장 루프탑 전용 경량화 로봇 청소 + 친수 코팅',
    date: '',
    featured: true
  }
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: '봄철 황사와 송홧가루, 태양광 발전량에 얼마나 영향을 줄까요?',
    category: '유지관리 가이드',
    author: '솔라클리어',
    date: '2026.07.01',
    readTime: '4분',
    coverImageUrl: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800',
    excerpt: '봄철에는 황사와 미세먼지뿐 아니라 송홧가루까지 더해져 태양광 패널 표면에 오염이 빠르게 쌓입니다.',
    content: `봄철에는 황사와 미세먼지뿐 아니라 송홧가루까지 더해져 태양광 패널 표면에 오염이 빠르게 쌓입니다. 이러한 오염은 태양광이 패널에 도달하는 양을 줄여 발전 효율 저하의 원인이 될 수 있으며, 특히 축사·공장·산업단지처럼 분진이 많은 환경에서는 더욱 주의가 필요합니다.

1. 송홧가루는 왜 잘 지워지지 않을까요?
송홧가루는 미세한 입자와 함께 수분, 먼지 등이 결합하면서 패널 표면에 달라붙기 쉽습니다. 시간이 지나면 일반적인 비만으로는 쉽게 제거되지 않는 오염층이 형성될 수 있습니다.

2. 오염을 오래 방치하면 어떤 문제가 생길까요?
오염이 지속되면 패널 표면으로 들어오는 빛이 감소하여 발전량 저하로 이어질 수 있습니다. 특히 황사, 미세먼지, 새 배설물 등이 함께 쌓이면 청소 효과도 떨어질 수 있어 주기적인 관리가 중요합니다.

3. 왜 초순수(DI Water)를 사용할까요?
초순수(DI Water)는 물속 이온 성분을 제거한 물로, 청소 후 일반 수돗물보다 물자국이나 잔여물이 남을 가능성을 줄이는 데 도움이 됩니다. 솔라클리어는 현장 오염 상태에 맞는 청소 방식과 초순수를 활용해 패널을 깨끗하게 관리합니다.`,
    views: 1420
  },
  {
    id: 'blog-2',
    title: '태양광 패널 청소, 왜 전문업체에 맡겨야 할까요?',
    category: '유지관리 가이드',
    author: '솔라클리어',
    date: '2026.06.18',
    readTime: '약 3분',
    coverImageUrl: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=800',
    excerpt: '태양광 패널 청소는 단순히 물을 뿌리는 작업이 아닙니다. 패널 표면을 안전하게 관리하면서 오염을 효과적으로 제거해야 발전 효율 유지와 장기적인 설비 관리에 도움이 됩니다.',
    content: `태양광 패널 청소는 단순히 물을 뿌리는 작업이 아닙니다. 패널 표면을 안전하게 관리하면서 오염을 효과적으로 제거해야 발전 효율 유지와 장기적인 설비 관리에 도움이 됩니다.

전문 장비와 적절한 청소 방법을 사용하는 이유를 알아보겠습니다.

1. 패널에 맞는 장비를 사용해야 합니다.
태양광 패널은 강화유리와 프레임으로 구성되어 있어 부적절한 장비나 과도한 청소 방식은 패널에 불필요한 부담을 줄 수 있습니다.
전문업체는 태양광 전용 청소 로봇과 회전 브러시 등 전용 장비를 활용하여 균일한 압력으로 청소를 진행하며, 패널에 무리가 가지 않도록 작업합니다.

2. 오염 상태에 맞는 청소 방법이 중요합니다.
황사, 미세먼지, 분진, 새 배설물, 송홧가루 등은 설치 환경에 따라 오염 정도가 크게 다릅니다.
일반적으로는 초순수(DI Water)를 사용해 물자국과 잔여물을 줄이며 청소하고, 오염이 심한 경우에는 현장 상황에 맞는 청소 방법을 적용하여 보다 효과적으로 오염을 제거합니다.

3. 작업 결과를 확인할 수 있어야 합니다.
청소가 완료된 후에는 작업 전·후 사진과 작업 내용을 함께 확인하는 것이 좋습니다.
이를 통해 청소 상태를 직접 확인할 수 있으며, 향후 유지관리 계획을 세우는 데에도 도움이 됩니다.


■ 전문업체를 선택할 때 확인해야 할 사항
태양광 패널 청소 업체를 선택할 때에는 다음 사항을 확인해 보시기 바랍니다.

• 태양광 전용 청소 장비 보유 여부
• 작업 경험 및 안전관리 체계
• 영업배상책임보험 가입 여부
• 작업 전·후 사진 및 보고서 제공 여부
• 발전소 환경에 맞는 청소 방식 적용 여부


■ 솔라클리어는 이렇게 작업합니다.
솔라클리어는 태양광 전용 청소 로봇과 전문 장비를 활용하여 현장 환경에 맞는 청소 서비스를 제공합니다.

• 태양광 전용 청소 로봇 운용
• 초순수(DI Water) 청소
• 자체 고소작업차 운용
• 작업 전·후 사진 및 보고서 제공
• 영업배상책임보험 가입

발전소의 오염 상태와 설치 환경을 고려한 안전하고 체계적인 청소 서비스를 제공하기 위해 노력하고 있습니다.`,
    views: 980
  },
  {
    id: 'blog-3',
    title: '태양광 패널 청소, 언제 하면 경제적일까요?',
    category: '유지관리 가이드',
    author: '솔라클리어',
    date: '2026.05.12',
    readTime: '약 5분',
    coverImageUrl: 'https://images.unsplash.com/photo-1545208942-e1c9c916524b?auto=format&fit=crop&q=80&w=800',
    excerpt: '적정 청소 주기와 ROI(투자 대비 효과) 알아보기',
    content: `태양광 패널 청소는 단순한 유지관리 비용이 아니라 발전 효율을 유지하기 위한 관리 항목입니다.
다만 모든 발전소가 동일한 주기로 청소해야 하는 것은 아닙니다. 설치 환경과 오염 정도에 따라 적절한 청소 주기가 달라질 수 있습니다.


■ 어떤 발전소가 더 자주 청소가 필요할까요?
다음과 같은 환경에서는 오염이 빠르게 쌓일 가능성이 있습니다.

• 축사 및 농가 주변
• 공장·산업단지 인근
• 도로변 및 비산먼지가 많은 지역
• 황사와 송홧가루의 영향을 많이 받는 지역
• 새 배설물이나 낙엽이 자주 쌓이는 장소

이러한 환경에서는 일반적인 환경보다 청소 주기를 짧게 가져가는 것이 도움이 될 수 있습니다.


■ 일반적인 청소 주기
• 일반 상업용 건물: 1~2년에 1회
• 축사·공장: 6~12개월
• 분진이 많은 산업단지: 6개월 내외
• 오염이 심한 지역: 현장 점검 후 결정

※ 실제 주기는 설치 환경과 오염 상태에 따라 달라질 수 있습니다.


■ ROI는 어떻게 계산할까요?
태양광 청소의 경제성은 청소 비용과 청소로 유지하거나 회복한 발전량의 가치를 함께 고려해 판단하는 것이 좋습니다.

예를 들어,
• 발전소 용량
• 최근 발전량 변화
• 오염 정도
• 예상 청소 비용

등을 종합적으로 비교하면 청소가 경제적인 시점을 판단하는 데 도움이 됩니다.


■ 솔라클리어는 이렇게 도와드립니다.
솔라클리어는 현장의 오염 상태를 확인한 후 발전소 환경에 적합한 청소 방식을 제안합니다.

• 태양광 전용 청소 로봇 운용
• 초순수(DI Water) 청소
• 자체 고소작업차 운용
• 작업 전·후 사진 및 작업 보고서 제공
• 영업배상책임보험 가입

현장별 특성을 고려한 청소 서비스를 통해 발전소의 안정적인 운영을 지원합니다.`,
    views: 2150
  }
];

export const initialInquiries: Inquiry[] = [
  {
    id: 'inq-101',
    customerName: '김민수',
    phone: '010-3849-1029',
    email: 'minsu.kim@example.com',
    facilityType: '상업용 루프탑',
    capacityKw: 350,
    location: '경기도 화성시 양감면',
    pollutionLevel: '심함 (조류분변/석회)',
    preferredDate: '2026-07-28',
    notes: '공장 지붕이라 층고가 높고 황사 먼지가 심합니다. 열화상 카메라 점검도 함께 부탁드립니다.',
    estimatedPriceMin: 1200000,
    estimatedPriceMax: 1500000,
    status: '신규 접수',
    createdAt: '2026-07-21 14:32',
    adminMemo: '7/22 오전 10시 현장 사전 가이드 유선 안내 예정'
  },
  {
    id: 'inq-102',
    customerName: '이성호 (해솔발전소)',
    phone: '010-9120-4411',
    email: 'haesol_solar@naver.com',
    facilityType: '메가와트 발전소',
    capacityKw: 1200,
    location: '충청남도 태안군',
    pollutionLevel: '보통 (황사/가루)',
    preferredDate: '2026-08-05',
    notes: '1.2MW 육상 태양광입니다. 정기 계약 할인 조건 안내해주세요.',
    estimatedPriceMin: 3200000,
    estimatedPriceMax: 3800000,
    status: '상담 진행중',
    createdAt: '2026-07-20 09:15',
    adminMemo: '메가와트 전용 로봇 2대 투입 예정. 견적서 메일 발송 완료.'
  },
  {
    id: 'inq-103',
    customerName: '박영희',
    phone: '010-5512-8822',
    facilityType: '주택용 지붕',
    capacityKw: 6,
    location: '서울특별시 은평구',
    pollutionLevel: '경미',
    preferredDate: '2026-07-25',
    notes: '단독주택 2층 지붕에 6kW 설치되어 있습니다.',
    estimatedPriceMin: 250000,
    estimatedPriceMax: 300000,
    status: '작업 확정',
    createdAt: '2026-07-19 16:45',
    adminMemo: '7/25 오전 10시 방문 확정'
  }
];
