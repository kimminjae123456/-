import React from 'react';
import { useApp } from '../context/AppContext';
import { Sun, Phone, Mail, MapPin, ShieldCheck, Share2, Settings } from 'lucide-react';

export const Footer: React.FC = () => {
  const { siteConfig, setActiveTab, isAdminOpen, setIsAdminOpen, showToast } = useApp();

  const handleShareSite = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('사이트 주소가 복사되었습니다. 소셜 미디어나 문자 메시지로 공유해 보세요!');
  };

  const seoKeywords = [
    '태양광 청소 전문', '태양광 패널 청소', '초순수 청소 공법', '열화상 핫스팟 진단',
    '태양광 발전 효율 20% 향상', '메가와트 발전소 청소', '상업용 루프탑 청소',
    '태양광 청소 로봇', '솔라클리어'
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 text-xs py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center text-white shadow-md">
                <Sun className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white">{siteConfig.companyName}</span>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              {siteConfig.companyTagline}. 최고의 정밀 청소 솔루션으로 태양광 발전소의 최대 수익을 보장합니다.
            </p>

            {/* Social & Share */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleShareSite}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 font-medium flex items-center gap-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-sky-400" />
                <span>웹사이트 공유하기</span>
              </button>

              <button
                onClick={() => setIsAdminOpen(!isAdminOpen)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 font-medium flex items-center gap-1.5 transition-colors"
              >
                <Settings className="w-3.5 h-3.5 text-amber-400" />
                <span>{isAdminOpen ? '사용자 모드로 전환' : '관리자 대시보드'}</span>
              </button>
            </div>
          </div>

          {/* Quick Nav Col */}
          <div className="md:col-span-3 space-y-3">
            <p className="font-bold text-white text-sm">사이트 맵 (Site Map)</p>
            <ul className="space-y-2 font-medium">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-sky-400 transition-colors">
                  홈 (Home)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('service')} className="hover:text-sky-400 transition-colors">
                  4단계 정밀 청소 공법
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('portfolio')} className="hover:text-sky-400 transition-colors">
                  작업 사례 & 발전 효율 회복 데이터
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('estimate')} className="hover:text-sky-400 transition-colors">
                  설문조사형 1분 견적 신청
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('blog')} className="hover:text-sky-400 transition-colors">
                  태양광 유지관리 노하우 블로그
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="md:col-span-4 space-y-3">
            <p className="font-bold text-white text-sm">고객센터 & 본사 정보</p>
            <div className="space-y-2 text-slate-400 font-medium">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>대표전화: <strong>{siteConfig.phone}</strong></span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>이메일: {siteConfig.email}</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                <span>{siteConfig.address}</span>
              </p>
            </div>
          </div>
        </div>

        {/* SEO Keywords Tag Cloud */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">SEO 검색 키워드:</span>
          <div className="flex flex-wrap gap-1.5">
            {seoKeywords.map((kw, i) => (
              <span key={i} className="px-2.5 py-1 rounded-md bg-slate-900/80 text-[11px] text-slate-500 border border-slate-900">
                #{kw}
              </span>
            ))}
          </div>
        </div>

        {/* Business Reg Info & Copyright */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <div>
            <span>상호명: {siteConfig.companyName}</span> | <span>대표자: {siteConfig.ceoName}</span> | <span>사업자등록번호: {siteConfig.businessNumber}</span>
            <p className="mt-0.5">© 2026 Solar Clear Corp. All Rights Reserved. 본 사이트의 무단 전재 및 복제를 금합니다.</p>
          </div>
          <div className="flex items-center gap-2 text-slate-400 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% 초순수 무상해 특수 청소 보증</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
