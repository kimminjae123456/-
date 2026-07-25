import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SiteConfig, Inquiry, InquiryStatus, PortfolioItem, BlogPost } from '../types';
import { Settings, FileText, FolderPlus, BookOpen, Save, RefreshCw, Trash2, Edit3, Plus, Download, CheckCircle, Search, Filter, Shield, Phone, Mail, MapPin, X, Eye } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    siteConfig,
    updateSiteConfig,
    inquiries,
    updateInquiryStatus,
    updateInquiryMemo,
    deleteInquiry,
    portfolios,
    addPortfolio,
    updatePortfolio,
    deletePortfolio,
    blogPosts,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    resetToDefaultData,
    setIsAdminOpen,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'settings' | 'inquiries' | 'portfolio' | 'blog'>('inquiries');

  // Site Config Edit Form State
  const [configForm, setConfigForm] = useState<SiteConfig>({ ...siteConfig });

  // Inquiry Filter & Search
  const [inquirySearch, setInquirySearch] = useState<string>('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<string>('전체');

  // Portfolio Modal State
  const [isPortModalOpen, setIsPortModalOpen] = useState<boolean>(false);
  const [editingPortId, setEditingPortId] = useState<string | null>(null);
  const [portForm, setPortForm] = useState<Omit<PortfolioItem, 'id'>>({
    title: '',
    category: '상업용',
    location: '',
    capacity: '100 kW',
    efficiencyGain: '+20.0%',
    beforeImageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=800',
    afterImageUrl: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800',
    description: '',
    cleaningMethod: '초순수 청소 + 정밀 로봇 스크러빙',
    date: new Date().toISOString().split('T')[0]
  });

  // Blog Modal State
  const [isBlogModalOpen, setIsBlogModalOpen] = useState<boolean>(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogForm, setBlogForm] = useState<Omit<BlogPost, 'id' | 'views'>>({
    title: '',
    category: '유지보수 노하우',
    author: '솔라클리어 팀',
    date: new Date().toISOString().split('T')[0],
    readTime: '3분',
    coverImageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=800',
    excerpt: '',
    content: ''
  });

  // Save Site Config Handler
  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteConfig(configForm);
  };

  // Export Inquiries to CSV
  const handleExportInquiriesCSV = () => {
    if (inquiries.length === 0) {
      showToast('내보낼 견적 내역이 없습니다.', 'info');
      return;
    }
    const headers = ['접수번호', '신청인', '연락처', '이메일', '설비유형', '용량(kW)', '지역', '오염도', '희망일자', '예상최저가', '예상최고가', '상태', '접수일시'];
    const rows = inquiries.map((i) => [
      i.id,
      `"${i.customerName}"`,
      `"${i.phone}"`,
      `"${i.email || ''}"`,
      `"${i.facilityType}"`,
      i.capacityKw,
      `"${i.location}"`,
      `"${i.pollutionLevel}"`,
      `"${i.preferredDate}"`,
      i.estimatedPriceMin,
      i.estimatedPriceMax,
      `"${i.status}"`,
      `"${i.createdAt}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `solar_clear_inquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('견적 내역 CSV 파일이 다운로드되었습니다.');
  };

  // Save Portfolio Item
  const handleSavePortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!portForm.title || !portForm.location) {
      alert('제목과 위치를 입력해 주세요.');
      return;
    }

    if (editingPortId) {
      updatePortfolio(editingPortId, portForm);
    } else {
      addPortfolio(portForm);
    }

    setIsPortModalOpen(false);
    setEditingPortId(null);
  };

  const handleEditPortfolioClick = (item: PortfolioItem) => {
    setEditingPortId(item.id);
    setPortForm({
      title: item.title,
      category: item.category,
      location: item.location,
      capacity: item.capacity,
      efficiencyGain: item.efficiencyGain,
      beforeImageUrl: item.beforeImageUrl,
      afterImageUrl: item.afterImageUrl,
      description: item.description,
      cleaningMethod: item.cleaningMethod,
      date: item.date,
      featured: item.featured
    });
    setIsPortModalOpen(true);
  };

  // Save Blog Post
  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.content) {
      alert('제목과 본문을 입력해 주세요.');
      return;
    }

    if (editingBlogId) {
      updateBlogPost(editingBlogId, blogForm);
    } else {
      addBlogPost(blogForm);
    }

    setIsBlogModalOpen(false);
    setEditingBlogId(null);
  };

  const handleEditBlogClick = (post: BlogPost) => {
    setEditingBlogId(post.id);
    setBlogForm({
      title: post.title,
      category: post.category,
      author: post.author,
      date: post.date,
      readTime: post.readTime,
      coverImageUrl: post.coverImageUrl,
      excerpt: post.excerpt,
      content: post.content
    });
    setIsBlogModalOpen(true);
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = inquiryStatusFilter === '전체' || inq.status === inquiryStatusFilter;
    const matchesQuery =
      inq.customerName.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.phone.includes(inquirySearch) ||
      inq.location.toLowerCase().includes(inquirySearch.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  const statuses: InquiryStatus[] = ['신규 접수', '상담 진행중', '견적 발송', '작업 확정', '작업 완료', '취소'];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-sky-500/20 text-sky-400 text-xs font-bold border border-sky-500/30">
                ADMIN PANEL
              </span>
              <h1 className="text-2xl font-black text-white">솔라클리어 관리자 대시보드</h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              실시간 사이트 설정 커스터마이징, 견적 문의 내역 관리, 작업 사례 및 블로그 CMS
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetToDefaultData}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-colors"
              title="데이터를 초깃값으로 가셋"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              <span>샘플 데이터 초기화</span>
            </button>

            <button
              onClick={() => setIsAdminOpen(false)}
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
            >
              <Eye className="w-4 h-4" />
              <span>사용자 화면 보기</span>
            </button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'inquiries'
                ? 'bg-sky-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>견적 문의 내역</span>
            <span className="ml-1 px-2 py-0.5 rounded-full bg-slate-900 text-sky-300 text-xs">
              {inquiries.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'settings'
                ? 'bg-sky-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>사이트 텍스트 & 테마 설정</span>
          </button>

          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'portfolio'
                ? 'bg-sky-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <FolderPlus className="w-4 h-4" />
            <span>작업 사례 CMS</span>
            <span className="ml-1 px-2 py-0.5 rounded-full bg-slate-900 text-sky-300 text-xs">
              {portfolios.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('blog')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'blog'
                ? 'bg-sky-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>블로그 CMS</span>
            <span className="ml-1 px-2 py-0.5 rounded-full bg-slate-900 text-sky-300 text-xs">
              {blogPosts.length}
            </span>
          </button>
        </div>

        {/* TAB 1: INQUIRIES MANAGEMENT */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-400 font-bold">상태 필터:</span>
                {['전체', ...statuses].map((st) => (
                  <button
                    key={st}
                    onClick={() => setInquiryStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      inquiryStatusFilter === st
                        ? 'bg-sky-500 text-white'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    placeholder="이름, 연락처, 지역 검색..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
                <button
                  onClick={handleExportInquiriesCSV}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>CSV 다운로드</span>
                </button>
              </div>
            </div>

            {/* Inquiries Table */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-400 border-b border-slate-700 font-bold uppercase">
                    <tr>
                      <th className="p-4">접수번호 / 일시</th>
                      <th className="p-4">신청인 / 연락처</th>
                      <th className="p-4">설비 / 용량</th>
                      <th className="p-4">위치 / 오염도</th>
                      <th className="p-4">산출 예상가</th>
                      <th className="p-4">진행 상태</th>
                      <th className="p-4">관리자 메모</th>
                      <th className="p-4 text-right">작업</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60 text-slate-300">
                    {filteredInquiries.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-slate-500">
                          접수된 견적 문의 내역이 없습니다.
                        </td>
                      </tr>
                    ) : (
                      filteredInquiries.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-700/30 transition-colors">
                          <td className="p-4 font-mono font-bold text-sky-400">
                            {item.id}
                            <p className="text-[11px] text-slate-500 font-normal">{item.createdAt}</p>
                          </td>
                          <td className="p-4">
                            <p className="font-bold text-white">{item.customerName}</p>
                            <a
                              href={`tel:${item.phone}`}
                              className="text-slate-400 hover:text-sky-400"
                            >
                              {item.phone}
                            </a>
                          </td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 rounded bg-slate-700 text-slate-200 font-semibold text-[11px]">
                              {item.facilityType}
                            </span>
                            <p className="font-bold text-amber-400 mt-1">{item.capacityKw} kW</p>
                          </td>
                          <td className="p-4">
                            <p className="font-medium text-slate-200">{item.location}</p>
                            <p className="text-[11px] text-slate-400">{item.pollutionLevel}</p>
                          </td>
                          <td className="p-4 font-bold text-emerald-400 whitespace-nowrap">
                            {item.estimatedPriceMin.toLocaleString()} ~ {item.estimatedPriceMax.toLocaleString()} 원
                          </td>
                          <td className="p-4">
                            <select
                              value={item.status}
                              onChange={(e) => updateInquiryStatus(item.id, e.target.value as InquiryStatus)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold border focus:outline-none ${
                                item.status === '신규 접수'
                                  ? 'bg-red-900/60 text-red-300 border-red-700'
                                  : item.status === '상담 진행중'
                                  ? 'bg-amber-900/60 text-amber-300 border-amber-700'
                                  : item.status === '작업 완료'
                                  ? 'bg-emerald-900/60 text-emerald-300 border-emerald-700'
                                  : 'bg-slate-700 text-slate-200 border-slate-600'
                              }`}
                            >
                              {statuses.map((st) => (
                                <option key={st} value={st} className="bg-slate-900 text-white">
                                  {st}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="p-4">
                            <input
                              type="text"
                              defaultValue={item.adminMemo || ''}
                              onBlur={(e) => updateInquiryMemo(item.id, e.target.value)}
                              placeholder="메모 입력 후 클릭 아웃..."
                              className="w-40 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-[11px] text-slate-300 focus:border-sky-500"
                            />
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => deleteInquiry(item.id)}
                              className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                              title="삭제"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SITE CONFIG & THEME CUSTOMIZATION */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveConfig} className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-700 pb-4 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-white">사이트 문구 및 커스터마이징</h3>
                <p className="text-xs text-slate-400">변경 즉시 전체 웹사이트의 텍스트 및 연락처가 수정됩니다.</p>
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-2 shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>설정 저장하기</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300">상호명 (Company Name)</label>
                <input
                  type="text"
                  value={configForm.companyName}
                  onChange={(e) => setConfigForm({ ...configForm, companyName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:border-sky-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300">대표 전화번호</label>
                <input
                  type="text"
                  value={configForm.phone}
                  onChange={(e) => setConfigForm({ ...configForm, phone: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:border-sky-500"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-xs font-bold text-slate-300">메인 히어로 타이틀 (줄바꿈 가능)</label>
                <textarea
                  rows={2}
                  value={configForm.heroTitle}
                  onChange={(e) => setConfigForm({ ...configForm, heroTitle: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:border-sky-500"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-xs font-bold text-slate-300">메인 히어로 설명 문구</label>
                <textarea
                  rows={2}
                  value={configForm.heroSubtitle}
                  onChange={(e) => setConfigForm({ ...configForm, heroSubtitle: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:border-sky-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300">대표 이메일</label>
                <input
                  type="text"
                  value={configForm.email}
                  onChange={(e) => setConfigForm({ ...configForm, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:border-sky-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300">사업자 등록번호</label>
                <input
                  type="text"
                  value={configForm.businessNumber}
                  onChange={(e) => setConfigForm({ ...configForm, businessNumber: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:border-sky-500"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-xs font-bold text-slate-300">본사 및 지사 주소</label>
                <input
                  type="text"
                  value={configForm.address}
                  onChange={(e) => setConfigForm({ ...configForm, address: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:border-sky-500"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-xs font-bold text-slate-300">메인 히어로 이미지 URL</label>
                <input
                  type="text"
                  value={configForm.heroImageUrl}
                  onChange={(e) => setConfigForm({ ...configForm, heroImageUrl: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:border-sky-500"
                />
              </div>
            </div>
          </form>
        )}

        {/* TAB 3: PORTFOLIO CMS */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-white">작업 사례 관리 (Portfolio CMS)</h3>
                <p className="text-xs text-slate-400">현장 시공 사례 및 발전 효율 회복 데이터를 관리합니다.</p>
              </div>
              <button
                onClick={() => {
                  setEditingPortId(null);
                  setPortForm({
                    title: '',
                    category: '상업용',
                    location: '',
                    capacity: '100 kW',
                    efficiencyGain: '+20.0%',
                    beforeImageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=800',
                    afterImageUrl: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800',
                    description: '',
                    cleaningMethod: '초순수 청소 + 정밀 로봇 스크러빙',
                    date: new Date().toISOString().split('T')[0]
                  });
                  setIsPortModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>새 작업 사례 추가</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolios.map((item) => (
                <div key={item.id} className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl flex gap-4 items-center">
                  <img
                    src={item.beforeImageUrl}
                    alt={item.title}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 text-[11px] font-bold">
                        {item.category}
                      </span>
                      <span className="text-emerald-400 text-[11px] font-bold">
                        효율 {item.efficiencyGain}
                      </span>
                    </div>
                    <h4 className="font-bold text-white text-sm line-clamp-1">{item.title}</h4>
                    <p className="text-xs text-slate-400">📍 {item.location} ({item.capacity})</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleEditPortfolioClick(item)}
                      className="p-2 bg-slate-700 text-slate-200 hover:text-white rounded-lg transition-colors"
                      title="수정"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deletePortfolio(item.id)}
                      className="p-2 bg-slate-700 text-slate-400 hover:text-red-400 rounded-lg transition-colors"
                      title="삭제"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: BLOG CMS */}
        {activeTab === 'blog' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-white">블로그 게시글 관리 (Blog CMS)</h3>
                <p className="text-xs text-slate-400">태양광 관리 노하우 및 업계 지식을 게시합니다.</p>
              </div>
              <button
                onClick={() => {
                  setEditingBlogId(null);
                  setBlogForm({
                    title: '',
                    category: '유지보수 노하우',
                    author: '솔라클리어 팀',
                    date: new Date().toISOString().split('T')[0],
                    readTime: '3분',
                    coverImageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=800',
                    excerpt: '',
                    content: ''
                  });
                  setIsBlogModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>새 아티클 작성</span>
              </button>
            </div>

            <div className="space-y-3">
              {blogPosts.map((post) => (
                <div key={post.id} className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={post.coverImageUrl}
                      alt={post.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 text-[11px] font-bold">
                        {post.category}
                      </span>
                      <h4 className="font-bold text-white text-sm mt-1">{post.title}</h4>
                      <p className="text-xs text-slate-400">작성자: {post.author} • {post.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditBlogClick(post)}
                      className="p-2 bg-slate-700 text-slate-200 hover:text-white rounded-lg"
                      title="수정"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteBlogPost(post.id)}
                      className="p-2 bg-slate-700 text-slate-400 hover:text-red-400 rounded-lg"
                      title="삭제"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* PORTFOLIO MODAL */}
      {isPortModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <form onSubmit={handleSavePortfolio} className="bg-slate-800 border border-slate-700 text-white rounded-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold">작업 사례 등록/수정</h3>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">사례 제목</label>
              <input
                type="text"
                value={portForm.title}
                onChange={(e) => setPortForm({ ...portForm, title: e.target.value })}
                placeholder="예: 전남 해남 3.5MW 육상 태양광"
                className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">카테고리</label>
                <select
                  value={portForm.category}
                  onChange={(e) => setPortForm({ ...portForm, category: e.target.value as any })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                >
                  <option value="메가와트">메가와트</option>
                  <option value="상업용">상업용</option>
                  <option value="축사/농가">축사/농가</option>
                  <option value="주택용">주택용</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">설비 용량</label>
                <input
                  type="text"
                  value={portForm.capacity}
                  onChange={(e) => setPortForm({ ...portForm, capacity: e.target.value })}
                  placeholder="예: 500 kW"
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">지역</label>
                <input
                  type="text"
                  value={portForm.location}
                  onChange={(e) => setPortForm({ ...portForm, location: e.target.value })}
                  placeholder="예: 경기도 화성시"
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">발전 효율 증가율</label>
                <input
                  type="text"
                  value={portForm.efficiencyGain}
                  onChange={(e) => setPortForm({ ...portForm, efficiencyGain: e.target.value })}
                  placeholder="예: +21.5%"
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">청소 설명 및 결과</label>
              <textarea
                rows={3}
                value={portForm.description}
                onChange={(e) => setPortForm({ ...portForm, description: e.target.value })}
                className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsPortModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-700 text-xs font-bold"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-sky-600 text-xs font-bold text-white"
              >
                저장
              </button>
            </div>
          </form>
        </div>
      )}

      {/* BLOG MODAL */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <form onSubmit={handleSaveBlog} className="bg-slate-800 border border-slate-700 text-white rounded-2xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold">블로그 아티클 등록/수정</h3>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">아티클 제목</label>
              <input
                type="text"
                value={blogForm.title}
                onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">카테고리</label>
                <select
                  value={blogForm.category}
                  onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value as any })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                >
                  <option value="유지보수 노하우">유지보수 노하우</option>
                  <option value="발전효율 분석">발전효율 분석</option>
                  <option value="청소 공법">청소 공법</option>
                  <option value="업계 뉴스">업계 뉴스</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">작성자</label>
                <input
                  type="text"
                  value={blogForm.author}
                  onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">요약 (Excerpt)</label>
              <input
                type="text"
                value={blogForm.excerpt}
                onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">본문 내용</label>
              <textarea
                rows={6}
                value={blogForm.content}
                onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsBlogModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-700 text-xs font-bold"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-sky-600 text-xs font-bold text-white"
              >
                저장
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
