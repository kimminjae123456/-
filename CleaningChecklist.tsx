import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sun, Phone, FileText, Settings, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  const { siteConfig, activeTab, setActiveTab, setIsSurveyModalOpen, isAdminOpen, setIsAdminOpen, openAdminWithAuth } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: '홈' },
    { id: 'service', label: '서비스 소개' },
    { id: 'portfolio', label: '비포 & 애프터' },
    { id: 'estimate', label: '견적 문의' },
    { id: 'blog', label: '블로그·소식' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    if (isAdminOpen) {
      setIsAdminOpen(false);
    }
    // Smooth scroll to top when changing tab
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs transition-all">
      {/* Top Banner Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-medium text-white">{siteConfig.companyName}</span>
            <span className="hidden sm:inline text-slate-400">| {siteConfig.companyTagline}</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="hidden md:inline text-slate-400">{siteConfig.workingHours}</span>
            <a
              href={`tel:${siteConfig.phone.replace(/[^0-9]/g, '')}`}
              className="flex items-center gap-1 font-semibold text-sky-400 hover:text-sky-300 transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>{siteConfig.phone}</span>
            </a>
            {isAdminOpen && (
              <button
                onClick={() => {
                  openAdminWithAuth();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors bg-sky-500 text-white hover:bg-sky-600"
              >
                <Settings className="w-3 h-3" />
                <span>사용자 화면</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Sun className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                  {siteConfig.companyName.split(' ')[0]}
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 font-bold border border-sky-100">
                  태양광 전문
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">SOLAR PANEL CLEANING</p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = !isAdminOpen && activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all relative ${
                    isActive
                      ? 'text-sky-600 bg-sky-50/80 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-sky-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${siteConfig.phone.replace(/[^0-9]/g, '')}`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              <Phone className="w-4 h-4 text-sky-600" />
              <span>{siteConfig.phone}</span>
            </a>
            <button
              onClick={() => setIsSurveyModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md shadow-sky-600/20 hover:shadow-lg transition-all active:scale-95"
            >
              <FileText className="w-4 h-4" />
              <span>맞춤 견적 신청</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsSurveyModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-sky-600 text-white text-xs font-bold flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>견적</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fade-in">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = !isAdminOpen && activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-bold text-base transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-sky-50 text-sky-600 border border-sky-100'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-sky-600" />}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={`tel:${siteConfig.phone.replace(/[^0-9]/g, '')}`}
              className="w-full py-3 rounded-xl border border-slate-200 text-slate-800 font-bold text-center flex items-center justify-center gap-2 hover:bg-slate-50"
            >
              <Phone className="w-4 h-4 text-sky-600" />
              <span>전화 상담 ({siteConfig.phone})</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsSurveyModalOpen(true);
              }}
              className="w-full py-3 rounded-xl bg-sky-600 text-white font-bold text-center flex items-center justify-center gap-2 shadow-md shadow-sky-600/20"
            >
              <FileText className="w-4 h-4" />
              <span>1분 무료 맞춤 견적 신청</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
