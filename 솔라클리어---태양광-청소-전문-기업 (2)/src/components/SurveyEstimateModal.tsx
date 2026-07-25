import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FacilityType } from '../types';
import { X, CheckCircle2, ArrowRight, ArrowLeft, Building, Factory, Sun, Calculator, Check, AlertTriangle, Waves, Trees } from 'lucide-react';

export const SurveyEstimateModal: React.FC = () => {
  const { isSurveyModalOpen, setIsSurveyModalOpen, addInquiry } = useApp();

  const [step, setStep] = useState<number>(1);
  const [facilityType, setFacilityType] = useState<FacilityType>('공장 및 상업용 루프탑');
  const [capacityText, setCapacityText] = useState<string>('100kW');
  const [waterSupply, setWaterSupply] = useState<'예' | '아니요'>('예');
  const [pollutionLevel, setPollutionLevel] = useState<string>('보통 (황사/가루)');
  const [location, setLocation] = useState<string>('');
  const [preferredDate, setPreferredDate] = useState<string>('2026-08-10');
  const [customerName, setCustomerName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [agreeTerms, setAgreeTerms] = useState<boolean>(true);

  const [submittedInquiryId, setSubmittedInquiryId] = useState<string | null>(null);

  if (!isSurveyModalOpen) return null;

  // Helper to parse numeric capacity in kW from user free-text string (e.g. "100kW", "1.2MW", "500")
  const parseCapacityToKw = (text: string): number => {
    if (!text) return 100;
    const lower = text.toLowerCase().replace(/,/g, '');
    const match = lower.match(/([\d.]+)/);
    if (!match) return 100;
    let val = parseFloat(match[1]);
    if (isNaN(val) || val <= 0) return 100;
    if (lower.includes('mw') || lower.includes('메가')) {
      val = val * 1000;
    }
    return val;
  };

  const parsedKw = parseCapacityToKw(capacityText);

  // Price estimation formula based on capacity brackets:
  let minRatePerKw = 7000;
  let maxRatePerKw = 10000;

  if (parsedKw <= 300) {
    minRatePerKw = 7000;
    maxRatePerKw = 10000;
  } else if (parsedKw < 1000) {
    minRatePerKw = 6000;
    maxRatePerKw = 9000;
  } else if (parsedKw <= 2000) {
    minRatePerKw = 5000;
    maxRatePerKw = 7500;
  } else {
    minRatePerKw = 4500;
    maxRatePerKw = 7000;
  }

  let pollutionMultiplier = 1.0;
  if (pollutionLevel.includes('심함')) pollutionMultiplier = 1.2;
  else if (pollutionLevel.includes('경미')) pollutionMultiplier = 0.95;

  let estimatedMin = Math.round((parsedKw * minRatePerKw * pollutionMultiplier) / 10000) * 10000;
  let estimatedMax = Math.round((parsedKw * maxRatePerKw * pollutionMultiplier) / 10000) * 10000;

  const handleNext = () => {
    if (step === 3) {
      if (!location.trim()) {
        alert('발전소 주소(위치)를 입력해 주세요.');
        return;
      }
    }

    if (step === 4) {
      if (!customerName.trim() || !phone.trim()) {
        alert('신청인 이름과 연락처를 작성해 주세요.');
        return;
      }
      if (!agreeTerms) {
        alert('개인정보 수집 및 이용 동의에 체크해 주세요.');
        return;
      }
      
      // Submit inquiry
      const newInq = addInquiry({
        customerName,
        phone,
        facilityType,
        capacityKw: parsedKw,
        capacityInput: capacityText,
        waterSupply,
        location,
        pollutionLevel,
        preferredDate,
        notes,
        estimatedPriceMin: estimatedMin,
        estimatedPriceMax: estimatedMax
      });

      setSubmittedInquiryId(newInq.id);
      setStep(5); // Success step
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setStep(1);
    setSubmittedInquiryId(null);
    setCustomerName('');
    setPhone('');
    setLocation('');
    setNotes('');
    setIsSurveyModalOpen(false);
  };

  const facilityOptions: { type: FacilityType; icon: any; title: string; desc: string }[] = [
    { type: '공장 및 상업용 루프탑', icon: Factory, title: '1. 공장 및 상업용 루프탑', desc: '공장, 상가, 물류창고 지붕 설치 태양광' },
    { type: '축사 및 농가 지붕', icon: Sun, title: '2. 축사 및 농가 지붕', desc: '축사, 양계장, 양돈장, 버섯농장 지붕형 태양광' },
    { type: '임야', icon: Trees, title: '3. 임야', desc: '임야, 산지 등' },
    { type: '그 외 발전소', icon: Waves, title: '4. 그 외 발전소', desc: '주차장, 수상, 기타 태양광 발전소' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-sky-400">맞춤 견적 산출 시스템</span>
              <h3 className="text-lg font-bold text-white">솔라클리어 1분 맞춤 견적 신청</h3>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="text-slate-400 hover:text-white p-2 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        {step <= 4 && (
          <div className="bg-slate-100 px-6 py-3 flex items-center justify-between border-b border-slate-200">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all ${
                    step === s
                      ? 'bg-sky-600 text-white shadow-md'
                      : step > s
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {step > s ? <Check className="w-4 h-4" /> : s}
                </div>
              ))}
            </div>
            <span className="text-xs font-bold text-slate-600">
              {step === 1 && 'Step 1: 시설 유형'}
              {step === 2 && 'Step 2: 설치 용량 & 물 공급'}
              {step === 3 && 'Step 3: 주소 및 희망일'}
              {step === 4 && 'Step 4: 신청인 정보'}
            </span>
          </div>
        )}

        {/* Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          
          {/* STEP 1: Facility Type */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-xl font-bold text-slate-900">태양광 설치 시설 유형을 선택해 주세요.</h4>
                <p className="text-xs text-slate-500 mt-1">현장 구조에 맞춰 최적의 장비와 전문 인력이 배정됩니다.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {facilityOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = facilityType === opt.type;
                  return (
                    <div
                      key={opt.type}
                      onClick={() => setFacilityType(opt.type)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between h-full min-h-[110px] ${
                        isSelected
                          ? 'border-sky-600 bg-sky-50/70 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-sky-600 bg-sky-600 text-white' : 'border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="font-bold text-slate-900 text-sm">{opt.title}</p>
                        <p className="text-xs text-slate-500 mt-1 leading-snug">{opt.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Capacity & Water Supply & Pollution */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-bold text-slate-900">설치 용량 및 현장 여건을 입력해 주세요.</h4>
                <p className="text-xs text-slate-500 mt-1">태양광 발전소의 설치 용량과 물 공급 여부를 선택해 주세요.</p>
              </div>

              {/* 1. Free text Capacity Input */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-800">
                  총 태양광 설치 용량 (숫자 및 단위) *
                </label>
                <input
                  type="text"
                  value={capacityText}
                  onChange={(e) => setCapacityText(e.target.value)}
                  placeholder="예: 100kW, 1.2MW, 500킬로와트 등"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-sky-600 font-bold"
                />
                <p className="text-[11px] text-slate-500">
                  ※ 숫자와 단위를 함께 자유롭게 작성해 주세요. (예: 100kW, 1.2MW 등)
                </p>
              </div>

              {/* 2. Water Supply Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-800">
                  현장 물 공급 여부 (수도/용수) *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setWaterSupply('예')}
                    className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                      waterSupply === '예'
                        ? 'border-sky-600 bg-sky-600 text-white shadow-sm'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>예 (수도 이용 가능)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setWaterSupply('아니요')}
                    className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                      waterSupply === '아니요'
                        ? 'border-amber-600 bg-amber-600 text-white shadow-sm'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>아니요 (물 공급 불가)</span>
                  </button>
                </div>
                {waterSupply === '아니요' && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 font-semibold flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>아니요 선택 시 물차 비용이 추가될 수 있습니다.</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: Location (Address) & Preferred Date */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h4 className="text-xl font-bold text-slate-900">발전소 주소 및 희망 일정을 입력하세요.</h4>
                <p className="text-xs text-slate-500 mt-1">전국 어디든 최단 거리 지사의 전문 청소 팀이 출동합니다.</p>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-800">발전소 주소 *</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="예: 경기도 화성시 양감면 초록로 123-45 (상세 주소 작성)"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-sky-600 font-medium"
                />
                <p className="text-[11px] text-slate-500">
                  ※ 주소를 정확히 작성해 주시면 진입 도로 조건 및 출장 동선을 빠르게 검토해 드립니다.
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-800">희망 청소 일자</label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-sky-600"
                />
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
                <p className="font-bold text-slate-800">💡 출장 방문 안내</p>
                <p>작업 일정은 기상 조건(강우/강풍/태풍)에 따라 담당 매니저 상의 후 최종 조율됩니다.</p>
              </div>
            </div>
          )}

          {/* STEP 4: Customer Details & Notes */}
          {step === 4 && (
            <div className="space-y-5">
              <div>
                <h4 className="text-xl font-bold text-slate-900">견적서를 전달받을 연락처를 적어주세요.</h4>
                <p className="text-xs text-slate-500 mt-1">신청 즉시 담당 전문 매니저가 유선 및 문자 안내해 드립니다.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">신청인 성함 / 기업명 *</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="홍길동 (또는 주식회사 태양)"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-sky-600"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">연락처 *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010-0000-0000"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-sky-600"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">추가 현장 전달사항 (선택)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="예 : 층고가 높음, 현장사진있음, 주말 작업 원함 등"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-sky-600 resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="agree"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 text-sky-600 rounded cursor-pointer accent-sky-600"
                />
                <label htmlFor="agree" className="text-xs text-slate-600 cursor-pointer">
                  [필수] 개인정보 수집 및 상담 목적 이용에 동의합니다.
                </label>
              </div>
            </div>
          )}

          {/* STEP 5: Success Card */}
          {step === 5 && (
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              
              <div className="space-y-2">
                <h4 className="text-2xl font-black text-slate-900">맞춤 견적 신청이 완료되었습니다!</h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  접수 번호: <strong className="text-sky-600 font-mono">{submittedInquiryId}</strong>
                  <br />
                  전문 매니저가 현장 검토 후 빠른 시간 내 개별 연락 및 상세 견적서를 전달해 드립니다.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left max-w-md mx-auto text-xs space-y-2">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">신청인:</span>
                  <span className="font-bold text-slate-900">{customerName} ({phone})</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">시설 / 용량:</span>
                  <span className="font-bold text-slate-900">{facilityType} ({capacityText})</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">물 공급 여부:</span>
                  <span className="font-bold text-slate-900">{waterSupply} {waterSupply === '아니요' && '(물차 필요)'}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">발전소 위치:</span>
                  <span className="font-bold text-slate-900 truncate max-w-[200px]">{location}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500">예상 산출 금액:</span>
                  <span className="font-bold text-sky-600 text-sm">
                    {estimatedMin.toLocaleString()} ~ {estimatedMax.toLocaleString()} 원
                  </span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="px-8 py-3.5 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-md cursor-pointer"
              >
                확인 및 창 닫기
              </button>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        {step <= 4 && (
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={() => setStep((prev) => Math.max(1, prev - 1))}
              disabled={step === 1}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors ${
                step === 1
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>이전</span>
            </button>

            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <span>{step === 4 ? '견적 신청 제출' : '다음 단계'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
