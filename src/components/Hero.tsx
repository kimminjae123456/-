import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, ArrowRight, Zap, TrendingUp, Sparkles, Calculator, CheckCircle, PhoneCall, Award } from 'lucide-react';

export const Hero: React.FC = () => {
  const { siteConfig, setIsSurveyModalOpen, setActiveTab } = useApp();
  
  // Quick ROI Calculator State (100kW ~ 3,000kW / 3MW)
  const [kwCapacity, setKwCapacity] = useState<number>(100);
  const [dirtLevel, setDirtLevel] = useState<number>(15); // % loss

  // Calculation: 1kW ~ 200,000 KRW annual generation revenue (100kW -> 20,000,000 KRW)
  const estimatedAnnualRevenue = kwCapacity * 200000;
  const estimatedAnnualLoss = Math.round(estimatedAnnualRevenue * (dirtLevel / 100));

  // Pricing rates per kW by capacity bracket:
  // 100kW ~ 300kW: 7,000 ~ 10,000 KRW/kW
  // 300kW ~ 1,000kW (1MW 미만): 6,000 ~ 9,000 KRW/kW
  // 1,000kW (1MW) ~ 2,000kW (2MW): 5,000 ~ 7,500 KRW/kW
  // 2,000kW (2MW) 이상: 4,500 ~ 7,000 KRW/kW
  let minRatePerKw = 7000;
  let maxRatePerKw = 10000;
  if (kwCapacity <= 300) {
    minRatePerKw = 7000;
    maxRatePerKw = 10000;
  } else if (kwCapacity < 1000) {
    minRatePerKw = 6000;
    maxRatePerKw = 9000;
  } else if (kwCapacity <= 2000) {
    minRatePerKw = 5000;
    maxRatePerKw = 7500;
  } else {
    minRatePerKw = 4500;
    maxRatePerKw = 7000;
  }

  const minCleaningCost = kwCapacity * minRatePerKw;
  const maxCleaningCost = kwCapacity * maxRatePerKw;
  const avgCleaningCost = kwCapacity * Math.round((minRatePerKw + maxRatePerKw) / 2);
  const estimatedNetProfit = Math.max(0, estimatedAnnualLoss - avgCleaningCost);

  // Format display string for capacity
  const formattedCapacity = kwCapacity >= 1000 
    ? `${kwCapacity.toLocaleString()} kW (${(kwCapacity / 1000).toFixed(kwCapacity % 1000 === 0 ? 0 : 1)} MW)` 
    : `${kwCapacity} kW`;

  return (
    <section className="relative bg-gradient-to-b from-sky-50 via-white to-slate-50 text-slate-900 overflow-hidden py-16 lg:py-24 border-b border-slate-100">
      {/* Background Solar Pattern & Image overlay */}
      <div className="absolute inset-0 z-0 opacity-15 mix-blend-multiply pointer-events-none">
        <img
          src={siteConfig.heroImageUrl}
          alt="Solar Panel Field"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-sky-50/60" />
      </div>

      {/* Decorative Blur Orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-sky-200/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 border border-sky-200 text-sky-800 text-xs sm:text-sm font-semibold shadow-xs">
                <Sparkles className="w-4 h-4 text-sky-600 animate-pulse" />
                <span>태양광 맞춤 정밀 청소 시스템</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-bold shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>영업배상책임보험 가입업체</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight whitespace-pre-line">
              {siteConfig.heroTitle}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
              {siteConfig.heroSubtitle}
            </p>

            {/* Feature Highlights Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-slate-700 bg-sky-50/80 px-3 py-2 rounded-xl border border-sky-100 text-xs sm:text-sm font-semibold">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>패널청소 전용 로봇</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800 bg-emerald-50/90 px-3 py-2 rounded-xl border border-emerald-200 text-xs sm:text-sm font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>영업배상책임보험 가입</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 bg-sky-50/80 px-3 py-2 rounded-xl border border-sky-100 text-xs sm:text-sm font-semibold">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>합리적인 청소가격</span>
              </div>
            </div>

            {/* Insurance & Safety Guarantee Card */}
            <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 border border-emerald-200/90 rounded-2xl p-4 flex items-start gap-3.5 shadow-xs">
              <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/20 mt-0.5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-xs sm:text-sm space-y-1">
                <div className="flex flex-wrap items-center gap-2 font-black text-slate-900">
                  <span className="text-sm sm:text-base">영업배상책임보험 가입업체</span>
                  <span className="text-[11px] bg-emerald-600 text-white px-2.5 py-0.5 rounded-full font-bold">
                    안전한 작업, 더욱 믿을 수 있는 서비스
                  </span>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                  작업 중 발생할 수 있는 예기치 못한 상황에 대비해 영업배상책임보험에 가입되어 있어 더욱 안심하고 맡기실 수 있습니다.
                </p>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => setIsSurveyModalOpen(true)}
                className="px-7 py-4 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-base shadow-xl shadow-sky-600/25 transition-all flex items-center justify-center gap-3 group active:scale-95 cursor-pointer"
              >
                <span>1분 설문조사형 맞춤 견적 신청</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={`tel:${siteConfig.phone.replace(/[^0-9]/g, '')}`}
                className="px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-base border border-slate-300 shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-5 h-5 text-sky-600" />
                <span>전화 상담 ({siteConfig.phone})</span>
              </a>
            </div>

            {/* Proof Badges */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">모든현장</p>
                <p className="text-xs text-slate-500 font-medium">작업범위</p>
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-black text-emerald-600 tracking-tight">전국출장가능</p>
                <p className="text-xs text-slate-500 font-medium">전국 어디든 출장</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">99.8<span className="text-sky-600">%</span></p>
                <p className="text-xs text-slate-500 font-medium">고객 만족도</p>
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">고소작업차</p>
                <p className="text-xs text-slate-500 font-medium">자체 보유 및 운용</p>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Interactive ROI Calculator Widget */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-sky-900/10 relative">
              <div className="absolute -top-3 right-6 bg-sky-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                <Calculator className="w-3.5 h-3.5" />
                <span>실시간 발전 손실 계산기</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                <span>우리 발전소 청소 효과 계산하기</span>
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                오염으로 새어나가는 발전 수익을 직접 확인해보세요.
              </p>

              {/* Calculator Inputs */}
              <div className="space-y-5">
                {/* Capacity Input */}
                <div>
                  <div className="flex justify-between items-center text-xs font-medium text-slate-700 mb-2">
                    <span>태양광 설치 용량 (100 kW ~ 3 MW)</span>
                    <span className="text-sky-600 font-bold text-sm bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100">{formattedCapacity}</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="3000"
                    step="10"
                    value={kwCapacity}
                    onChange={(e) => setKwCapacity(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1.5 font-medium">
                    <span>100 kW</span>
                    <span>1,500 kW (1.5 MW)</span>
                    <span>3,000 kW (3 MW)</span>
                  </div>
                </div>

                {/* Estimated Dirt Loss */}
                <div>
                  <div className="flex justify-between items-center text-xs font-medium text-slate-700 mb-2">
                    <span>예상 오염 손실률 (%)</span>
                    <span className="text-amber-600 font-bold text-sm bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100">{dirtLevel}% 손실</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={dirtLevel}
                    onChange={(e) => setDirtLevel(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1.5 font-medium">
                    <span>가벼운 미세먼지 (5%)</span>
                    <span>황사/조류분변 (15%)</span>
                    <span>심각한 고착 (30%)</span>
                  </div>
                </div>

                {/* Output Box */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-3">
                  <div className="flex justify-between items-center text-xs text-slate-600">
                    <span>오염으로 누수되는 연간 손실액</span>
                    <span className="text-rose-600 font-bold">
                      약 -{estimatedAnnualLoss.toLocaleString()} 원
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-600">
                    <span>예상 정밀 청소 비용</span>
                    <span className="text-slate-800 font-bold">
                      약 {minCleaningCost.toLocaleString()} ~ {maxCleaningCost.toLocaleString()} 원
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      청소 후 기대 순수익 개선
                    </span>
                    <span className="text-lg font-black text-emerald-600">
                      +{estimatedNetProfit.toLocaleString()} 원/년
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 font-medium text-center">
                  ※ 위 금액은 예상 견적이므로 현장 여건에 따른 자세한 상담을 부탁드립니다.
                </p>

                <button
                  onClick={() => setIsSurveyModalOpen(true)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>이 조건으로 정확한 견적서 받아보기</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
