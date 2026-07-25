import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CheckSquare, Square, TrendingDown, CalendarX, Wind, Compass, Sparkles, ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const CleaningChecklist: React.FC = () => {
  const { setIsSurveyModalOpen } = useApp();
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter((i) => i !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };

  const checklistItems = [
    {
      id: 1,
      title: '1. 최근 발전량이 예전보다 감소했다면',
      subtitle: '일사량이 좋은 맑은 날에도 계절별·전년 대비 발전 효율이 떨어지고 발전 수익이 지속 감소하는 경우',
      detail: '동일 지역 일사량 및 전년 동월 대비 발전량이 10~15% 이상 저하되거나, 국소 오염막이 셀 전체 회로 출력을 떨어뜨리는 상태입니다.',
      icon: TrendingDown,
      color: 'from-amber-500 to-red-500',
      badge: '발전 효율 저하'
    },
    {
      id: 2,
      title: '2. 설치 후 또는 이전 청소 후 1~2년 이상 경과한 경우',
      subtitle: '자연 우수(빗물)에만 의존하여 정기적인 청소 관리 없이 1~2년 이상 방치된 상태',
      detail: '빗물만으로는 매연, 유분, 초목 포자 등 찌든 때 오염막이 씻기지 않으며, 방치할수록 투과율 손실과 청소 난이도가 커집니다.',
      icon: CalendarX,
      color: 'from-sky-500 to-indigo-500',
      badge: '장기 누적 오염'
    },
    {
      id: 3,
      title: '3. 주변 환경에 특수 오염원이 있는 경우',
      subtitle: '축사(메탄가스·유기물 오염), 양계장(깃털·가축 먼지), 공장 단지(매연·분진), 노지(배설물, 꽃가루), 도로변 황사 등 오염원에 노출된 경우',
      detail: '유기성 오염물과 깃털·분진은 패널 표면에 단단히 고착되어 빛 투과율을 급격히 떨어뜨리고 핫스팟(국소 과열) 손상을 유발합니다.',
      icon: Wind,
      color: 'from-emerald-500 to-teal-500',
      badge: '특수 오염 노출'
    },
    {
      id: 4,
      title: '4. 경사가 완만한 패널(약 20° 이하)',
      subtitle: '빗물 배수가 원활하지 않고 경사각이 약 20° 이하로 낮아 먼지와 오염물질이 자국으로 남기 쉬운 경우',
      detail: '경사각 20° 이하 패널은 자연 청소(Self-cleaning) 효과가 거의 없어 배수선 하단부에 토사와 찌꺼기가 자국을 이루며 고이게 됩니다.',
      icon: Compass,
      color: 'from-purple-500 to-violet-500',
      badge: '자연 청소 불가'
    }
  ];

  const selectedCount = checkedItems.length;

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-wider border border-sky-500/30">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>SOLAR PANEL DIAGNOSIS CHECKLIST</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            우리 발전소, <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">언제 청소가 필요할까요?</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            아래 4가지 항목 중 <strong className="text-sky-300 underline underline-offset-4 font-bold">단 1개라도 해당된다면</strong>,
            오염으로 인한 발전량 손실을 막기 위해 <strong className="text-amber-400">지금 즉시 패널 청소가 필요합니다!</strong>
          </p>
        </div>

        {/* Checklist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {checklistItems.map((item) => {
            const isChecked = checkedItems.includes(item.id);
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between relative group ${
                  isChecked
                    ? 'bg-slate-800/90 border-sky-500 shadow-xl shadow-sky-500/10 ring-2 ring-sky-500/50'
                    : 'bg-slate-800/40 border-slate-700/80 hover:border-slate-600 hover:bg-slate-800/70'
                }`}
              >
                <div>
                  {/* Card Header: Icon, Badge, Checkbox */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-md`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-slate-700/80 text-slate-300 border border-slate-600">
                        {item.badge}
                      </span>
                    </div>

                    <div className="text-slate-400 group-hover:text-sky-400 transition-colors">
                      {isChecked ? (
                        <CheckSquare className="w-7 h-7 text-sky-400" />
                      ) : (
                        <Square className="w-7 h-7" />
                      )}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    {item.title}
                  </h3>

                  <p className="text-slate-300 text-sm font-semibold mb-3 leading-snug">
                    {item.subtitle}
                  </p>

                  <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-700/50 text-xs text-slate-400 leading-relaxed">
                    💡 <strong className="text-slate-200">점검 포인트:</strong> {item.detail}
                  </div>
                </div>

                {/* Bottom Toggle Prompt */}
                <div className="mt-4 pt-3 border-t border-slate-700/40 flex items-center justify-between text-xs">
                  <span className={isChecked ? 'text-sky-400 font-bold' : 'text-slate-400'}>
                    {isChecked ? '✓ 체크 완료 (해당됨)' : '클릭하여 해당 여부 체크'}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {isChecked ? '청소 추천' : '상태 확인'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Action Banner / Call to Action */}
        <div className="bg-gradient-to-r from-slate-800 via-slate-800/90 to-slate-800 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left w-full md:w-auto">
            <div className={`p-4 rounded-2xl shrink-0 ${
              selectedCount > 0 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
            }`}>
              {selectedCount > 0 ? (
                <AlertTriangle className="w-8 h-8" />
              ) : (
                <CheckCircle2 className="w-8 h-8" />
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-700 text-slate-300">
                  진단 결과
                </span>
                <span className="text-sm font-bold text-sky-400">
                  총 {selectedCount}개 항목 선택됨
                </span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white">
                {selectedCount > 0
                  ? '해당 항목이 있다면 지금 바로 전문 청소를 진행하세요!'
                  : '위 항목 중 해당하는 내용이 있으신가요?'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                {selectedCount > 0
                  ? '방치 시 방열 장애 및 과열(Hotspot)로 모듈 수명이 영구 단축될 수 있습니다.'
                  : '오염된 패널을 방치하면 매년 수백만 원 상당의 발전 수익이 손실됩니다.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSurveyModalOpen(true)}
            className="w-full md:w-auto shrink-0 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <span>1분 맞춤 견적 확인하기</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};
