import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Droplets, Camera, Bot, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, Zap, RefreshCw, FileCheck } from 'lucide-react';

export const ServiceIntro: React.FC = () => {
  const { siteConfig, setIsSurveyModalOpen } = useApp();
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      num: 1,
      title: '패널 오염 상태 확인',
      icon: Camera,
      badge: 'Step 1: 상태 확인',
      desc: '청소 전 패널의 오염 상태와 오염 원인을 꼼꼼히 확인하여 현장에 적합한 청소 방법을 적용합니다.',
      benefits: ['패널 오염도 정밀 진단', '과열 핫스팟 사전 점검', '맞춤형 청소 계획 수립'],
      image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800'
    },
    {
      num: 2,
      title: '전용 청소 세제 & 초순수(DI Water) 사용',
      icon: Droplets,
      badge: 'Step 2: 청소 세제 & 초순수',
      desc: '필요 시 현장 오염 상태에 맞는 태양광 전용 청소 세제를 사용하며, 이온성분이 제거된 초순수(DI Water)를 활용해 패널 표면에 잔여물 없이 깨끗하게 청소합니다.',
      benefits: ['태양광 전용 친환경 청소 세제', '0ppm 초순수(DI Water) 사용', '유기·무기 오염 완벽 청소'],
      image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=800'
    },
    {
      num: 3,
      title: '전용 장비 투입 (청소 로봇 & 회전 브러시)',
      icon: Bot,
      badge: 'Step 3: 전용장비 투입',
      desc: '태양광 패널 전용 청소 로봇과 패널 전용 회전 브러시를 사용하여 패널에 무리를 최소화하고, 균일한 압력으로 오염물을 안전하고 깨끗하게 제거합니다.',
      benefits: ['패널 전용 청소 로봇 투입', '무스크래치 회전 브러시', '균일한 청소 압력 유지'],
      image: 'https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&q=80&w=800'
    },
    {
      num: 4,
      title: '청소 완료 확인 및 작업 보고서 제공',
      icon: FileCheck,
      badge: 'Step 4: 확인 & 보고서',
      desc: '청소 완료 후 작업 상태를 최종 확인하고, 작업 전·후 사진과 작업 내용이 포함된 보고서를 고객님께 제공합니다.',
      benefits: ['청소 품질 최종 검증', '작업 전/후 명확한 비교', '상세 검증 보고서 제공'],
      image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <section id="service" className="py-20 bg-slate-50 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-sky-600" />
            <span>SOLAR CLEAR SPECIAL PROCESS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            솔라클리어만의 <span className="text-sky-600">4단계 정밀 청소 공법</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            체계적인 4단계 맞춤 청소 프로세스와 패널 전용 장비로 소중한 발전소의 오염을 안전하게 제거하고 최상의 효율을 회복합니다.
          </p>
        </div>

        {/* 4 Step Process Interactive Navigator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-100">
          
          {/* Step Selector Buttons */}
          <div className="lg:col-span-5 space-y-3">
            {steps.map((s) => {
              const Icon = s.icon;
              const isSelected = activeStep === s.num;
              return (
                <div
                  key={s.num}
                  onClick={() => setActiveStep(s.num)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border flex items-center justify-between ${
                    isSelected
                      ? 'bg-sky-600 text-white border-sky-600 shadow-lg shadow-sky-600/20'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-white text-sky-600 shadow-xs'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className={`text-xs font-bold ${isSelected ? 'text-sky-200' : 'text-slate-400'}`}>
                        {s.badge}
                      </p>
                      <h4 className="font-bold text-base">{s.title}</h4>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-5 h-5 transition-transform ${
                      isSelected ? 'translate-x-1 text-white' : 'text-slate-400'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Active Step Showcase Detail */}
          <div className="lg:col-span-7 bg-gradient-to-br from-sky-50 via-white to-blue-50/80 border border-sky-100 rounded-3xl text-slate-900 p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-lg shadow-sky-900/5">
            {/* Active Step Content */}
            {(() => {
              const current = steps.find((s) => s.num === activeStep) || steps[0];
              const Icon = current.icon;
              return (
                <>
                  <div className="flex items-center justify-between border-b border-sky-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold shadow-md shadow-sky-600/20">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-sky-600 uppercase tracking-wide">{current.badge}</span>
                        <h3 className="text-xl font-bold text-slate-900">{current.title}</h3>
                      </div>
                    </div>
                    <span className="text-3xl font-black text-sky-200">0{current.num}</span>
                  </div>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {current.desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {current.benefits.map((b, idx) => (
                      <div key={idx} className="bg-white rounded-xl p-3 border border-sky-100 shadow-2xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mb-1" />
                        <span className="text-xs font-bold text-slate-800">{b}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex justify-between items-center">
                    <span className="text-xs text-slate-500">
                      * 전국 출장 가능
                    </span>
                    <button
                      onClick={() => setIsSurveyModalOpen(true)}
                      className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-sky-600/20 cursor-pointer"
                    >
                      <span>청소 신청하기</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </>
              );
            })()}
          </div>

        </div>

        {/* Robot Cleaning vs Manual / High-Pressure Cleaning Comparison */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-slate-900">
              <span className="text-sky-600">로봇 청소</span> vs 인력/고압수 청소 비교
            </h3>
            <p className="text-slate-600 text-sm mt-2">
              인력 수동 작업과 청소 전용 로봇 작업의 안전성 및 작업 효율성을 비교해 보세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Manual / High Pressure Danger Box */}
            <div className="bg-red-50/60 rounded-3xl p-6 sm:p-8 border border-red-200 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-red-600 uppercase">위험 및 한계</span>
                  <h4 className="text-lg font-bold text-slate-900">인력 / 고압수 청소</h4>
                </div>
              </div>

              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                  <span><strong>패널 스크래치 위험:</strong> 불균일한 압력 및 작업 도구 마찰로 모듈 손상 위험</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                  <span><strong>접근 어려운 구간 한계:</strong> 경사지·루프탑·수상 등 안전사고 위험 및 사각지대 발생</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                  <span><strong>인건비 변동:</strong> 인력 수급에 따른 비용 부담 상승 및 청소 품질 불균일</span>
                </li>
              </ul>
            </div>

            {/* Robot Cleaning Advantage Box */}
            <div className="bg-sky-50/80 rounded-3xl p-6 sm:p-8 border border-sky-200 space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold shadow-md shadow-sky-600/20 shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-sky-600 uppercase">솔라클리어 솔루션</span>
                  <h4 className="text-lg font-bold text-slate-900">태양광 전용 로봇 청소</h4>
                </div>
              </div>

              <ul className="space-y-3 text-sm text-slate-800">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <span><strong>균일한 압력:</strong> 모듈 표면 코팅을 보호하며 정밀하고 일관된 청소력 유지</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <span><strong>파손 위험 최소화:</strong> 모듈 하중 분산 설계로 패널 파손 및 스크래치 위험 제로</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <span><strong>대규모 처리 가능:</strong> 메가급 대형 발전소도 신속하고 안전하게 일괄 청소 가능</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
