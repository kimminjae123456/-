import React from 'react';
import { useApp } from '../context/AppContext';
import { Phone, FileText } from 'lucide-react';

export const FloatingBar: React.FC = () => {
  const { siteConfig, setIsSurveyModalOpen, isAdminOpen } = useApp();

  if (isAdminOpen) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 py-3 px-4 shadow-2xl md:bottom-6 md:right-6 md:left-auto md:bg-transparent md:border-none md:p-0 md:shadow-none pointer-events-none">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3 pointer-events-auto">
        
        {/* Phone Call Button */}
        <a
          href={`tel:${siteConfig.phone.replace(/[^0-9]/g, '')}`}
          className="flex-1 py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 border border-slate-700 shadow-lg transition-all whitespace-nowrap"
        >
          <Phone className="w-4 h-4 text-sky-400 shrink-0" />
          <span className="whitespace-nowrap">전화 연결 ({siteConfig.phone})</span>
        </a>

        {/* Instant Quote Form Launcher */}
        <button
          onClick={() => setIsSurveyModalOpen(true)}
          className="py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-sky-600/30 transition-all cursor-pointer whitespace-nowrap shrink-0"
        >
          <FileText className="w-4 h-4 shrink-0" />
          <span className="whitespace-nowrap">1분 견적</span>
        </button>

      </div>
    </div>
  );
};
