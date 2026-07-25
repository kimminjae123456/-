import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, CheckCircle2, AlertCircle, ArrowRight, Sun, ShieldCheck, Upload, RotateCcw } from 'lucide-react';
import { SolarPanelBeforeImage, SolarPanelAfterImage } from './SolarPanelImages';

const LOCAL_KEY_BEFORE = 'solar_clear_custom_before_img_v1';
const LOCAL_KEY_AFTER = 'solar_clear_custom_after_img_v1';

const DEFAULT_BEFORE = "https://i.imgur.com/7LL84OD.jpg";
const DEFAULT_AFTER = "https://i.imgur.com/P0W33FQ.jpeg";

export const Portfolio: React.FC = () => {
  const { setIsSurveyModalOpen } = useApp();

  const [beforeImage, setBeforeImage] = useState<string | null>(() => {
    return localStorage.getItem(LOCAL_KEY_BEFORE) || DEFAULT_BEFORE;
  });

  const [afterImage, setAfterImage] = useState<string | null>(() => {
    return localStorage.getItem(LOCAL_KEY_AFTER) || DEFAULT_AFTER;
  });

  const handleBeforeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setBeforeImage(result);
          localStorage.setItem(LOCAL_KEY_BEFORE, result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAfterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setAfterImage(result);
          localStorage.setItem(LOCAL_KEY_AFTER, result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetBefore = () => {
    setBeforeImage(DEFAULT_BEFORE);
    localStorage.removeItem(LOCAL_KEY_BEFORE);
  };

  const handleResetAfter = () => {
    setAfterImage(DEFAULT_AFTER);
    localStorage.removeItem(LOCAL_KEY_AFTER);
  };

  return (
    <section id="portfolio" className="py-20 bg-slate-50 text-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Main Slogan */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wide border border-sky-200">
            <Sparkles className="w-4 h-4 text-sky-600" />
            <span>SOLAR PANEL BEFORE & AFTER</span>
          </div>

          {/* Slogan Requested by User */}
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            <span className="text-sky-600 underline decoration-sky-300 underline-offset-8">깨끗한 패널</span>이 더 많이 발전합니다.
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-2">
            미세먼지, 황사, 조류 분변으로 가려진 태양광 모듈!
            <br className="hidden sm:inline" />
            전문 정밀 청소 후 <strong>투과율 99% 회복</strong> 및 <strong>발전량 상승 효과</strong>를 비포 & 애프터 사진으로 직접 확인하세요.
          </p>
        </div>

        {/* User Submitted Before & After Photo Hero Showcase */}
        <div className="mb-16 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                  실제 청소 효과 비교
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  태양광 청소 전후 현장 비교
                </span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mt-2">
                태양광 패널 청소 전 (Before) vs 청소 후 (After)
              </h3>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-all border border-amber-200 shadow-sm active:scale-95">
                <Upload className="w-3.5 h-3.5 text-amber-600" />
                <span>{beforeImage ? 'Before 사진 등록됨 (클릭 시 변경)' : '📷 Before 사진 직접 첨부'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBeforeUpload}
                  className="hidden"
                />
              </label>

              {beforeImage && (
                <button
                  onClick={handleResetBefore}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-all border border-slate-300"
                  title="초기화"
                >
                  <RotateCcw className="w-3 h-3 text-slate-500" />
                  <span>초기화</span>
                </button>
              )}

              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold transition-all border border-emerald-200 shadow-sm active:scale-95">
                <Upload className="w-3.5 h-3.5 text-emerald-600" />
                <span>{afterImage ? 'After 사진 등록됨 (클릭 시 변경)' : '📷 After 사진 직접 첨부'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAfterUpload}
                  className="hidden"
                />
              </label>

              {afterImage && (
                <button
                  onClick={handleResetAfter}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-all border border-slate-300"
                  title="초기화"
                >
                  <RotateCcw className="w-3 h-3 text-slate-500" />
                  <span>초기화</span>
                </button>
              )}
            </div>
          </div>

          {/* Solar Panel Split Photo Card */}
          <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-900 bg-slate-950 aspect-[16/10] sm:aspect-[16/9] max-h-[560px]">
            <div className="relative w-full h-full flex">
              
              {/* BEFORE Half (Left Side: Heavy Soil, Dust & Bird Droppings on Solar Panels) */}
              <div className="relative w-1/2 h-full bg-slate-900 overflow-hidden border-r-4 border-slate-900 flex items-center justify-center group">
                {beforeImage ? (
                  <img
                    src={beforeImage}
                    alt="태양광 패널 청소 전 실제 현장 원본 사진"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <SolarPanelBeforeImage className="absolute inset-0 w-full h-full object-cover" />
                )}

                {/* "Before" Text Overlay */}
                <div className="relative z-10 text-center select-none pointer-events-none">
                  <span className="text-white text-3xl sm:text-5xl font-black tracking-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
                    Before
                  </span>
                  <p className="text-amber-300 text-xs sm:text-sm font-bold mt-1 bg-black/70 px-3 py-1 rounded-full backdrop-blur-sm border border-amber-500/40">
                    청소 전 (오염 상태)
                  </p>
                </div>
              </div>

              {/* AFTER Half (Right Side: Clean Solar Panel Grid) */}
              <div className="relative w-1/2 h-full bg-blue-950 overflow-hidden flex items-center justify-center">
                {afterImage ? (
                  <img
                    src={afterImage}
                    alt="태양광 패널 청소 후 원본 사진"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <SolarPanelAfterImage className="absolute inset-0 w-full h-full object-cover" />
                )}

                {/* "After" Text Overlay */}
                <div className="relative z-10 text-center select-none pointer-events-none">
                  <span className="text-white text-3xl sm:text-5xl font-black tracking-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
                    After
                  </span>
                  <p className="text-emerald-300 text-xs sm:text-sm font-bold mt-1 bg-black/70 px-3 py-1 rounded-full backdrop-blur-sm border border-emerald-500/40">
                    청소 후 (효율 회복)
                  </p>
                </div>
              </div>

              {/* Central Separator Line */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-3 bg-gradient-to-r from-slate-700 via-slate-400 to-slate-800 border-x border-slate-900 shadow-2xl z-20 pointer-events-none" />
            </div>
          </div>

          {/* Key Takeaway bar below image */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-amber-900">청소 전 (Before)</p>
                <p className="text-xs text-amber-800 mt-1 font-medium leading-relaxed">
                  황사, 먼지, 분진으로 패널 표면이 오염된 상태
                </p>
                <p className="text-xs text-amber-700/90 mt-0.5 leading-relaxed">
                  빛 가림으로 발전효율 저하가 발생됩니다. (발전효율 10%~20% 손실)
                </p>
              </div>
            </div>

            <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-sky-900">전용장비 사용</p>
                <p className="text-xs text-sky-800 mt-1 font-medium leading-relaxed">
                  태양광 전용 청소 로봇과 회전 브러시를 사용하여 패널에 무리를 최소화하며 오염물을 효과적으로 제거합니다.
                </p>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-emerald-900">청소 후 (After)</p>
                <p className="text-xs text-emerald-800 mt-1 font-medium leading-relaxed">
                  깨끗한 패널 표면 회복
                </p>
                <p className="text-xs text-emerald-700/90 mt-0.5 leading-relaxed">
                  빛 투과를 방해하는 오염물을 제거하여 발전 효율 유지에 도움
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-3 text-center md:text-left relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-400 text-xs font-bold border border-sky-500/30">
              <Sun className="w-3.5 h-3.5" />
              <span>태양광 청소 전문 매니저 1:1 진단</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              우리 발전소도 깨끗하게 청소하고 발전 수익을 회복하세요!
            </h3>
          </div>

          <button
            onClick={() => setIsSurveyModalOpen(true)}
            className="shrink-0 px-8 py-4 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-sky-600/30 hover:shadow-sky-500/50 flex items-center gap-2 transition-all active:scale-95 cursor-pointer relative z-10"
          >
            <span>무료 견적 신청하기</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};


