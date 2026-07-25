export interface SiteConfig {
  companyName: string;
  companyTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  phone: string;
  email: string;
  address: string;
  kakaoChatUrl: string;
  primaryColor: 'blue' | 'sky' | 'indigo' | 'slate';
  heroImageUrl: string;
  businessNumber: string;
  ceoName: string;
  workingHours: string;
}

export type FacilityType = '공장 및 상업용 루프탑' | '축사 및 농가 지붕' | '임야' | string;

export type InquiryStatus = '신규 접수' | '상담 진행중' | '견적 발송' | '작업 확정' | '작업 완료' | '취소';

export interface Inquiry {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  facilityType: FacilityType;
  capacityKw: number | string;
  capacityInput?: string;
  waterSupply?: '예' | '아니요';
  location: string;
  pollutionLevel: string;
  preferredDate: string;
  notes?: string;
  estimatedPriceMin: number;
  estimatedPriceMax: number;
  status: InquiryStatus;
  createdAt: string;
  adminMemo?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: '메가와트' | '상업용' | '주택용' | '축사/농가';
  location: string;
  capacity: string;
  efficiencyGain: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  description: string;
  cleaningMethod: string;
  date: string;
  featured?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  coverImageUrl: string;
  excerpt: string;
  content: string;
  views: number;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}
