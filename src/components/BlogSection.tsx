import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BlogPost } from '../types';
import { BookOpen, Search, Clock, Eye, Calendar, User, ArrowRight, X, Share2, Sparkles, Check } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const { blogPosts, showToast, setIsSurveyModalOpen } = useApp();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const filteredPosts = blogPosts.filter((post) => {
    return (
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('글 링크가 클립보드에 복사되었습니다.');
  };

  return (
    <section id="blog" className="py-20 bg-slate-50 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase mb-3">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>SOLAR KNOWLEDGE & TIPS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              태양광 <span className="text-sky-600">유지관리 노하우 & 뉴스</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              전문가들이 제공하는 발전 효율 유지 가이드라인과 오염 청소 상식을 확인해 보세요.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="제목, 키워드 검색..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-sky-600 shadow-2xs"
            />
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setActivePost(post)}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer group"
            >
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img
                  src={post.coverImageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-sky-600/90 backdrop-blur-md text-white text-xs font-bold rounded-full">
                  {post.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-600">
                  <span>작성자: {post.author}</span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    읽기 <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Reader Modal */}
      {activePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-10 space-y-6 relative border border-slate-100">
            <button
              onClick={() => setActivePost(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-3">
              <span className="px-3 py-1 bg-sky-100 text-sky-800 text-xs font-bold rounded-full">
                {activePost.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                {activePost.title}
              </h3>
              <div className="flex items-center gap-4 text-xs text-slate-500 border-b border-slate-100 pb-4">
                <span>작성자: {activePost.author}</span>
                <span>•</span>
                <span>날짜: {activePost.date}</span>
                <span>•</span>
                <span>읽기 시간: {activePost.readTime}</span>
              </div>
            </div>

            <img
              src={activePost.coverImageUrl}
              alt={activePost.title}
              className="w-full h-64 object-cover rounded-2xl border border-slate-200"
              referrerPolicy="no-referrer"
            />

            <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {activePost.content}
            </div>

            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={handleShare}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-50"
              >
                <Share2 className="w-4 h-4 text-sky-600" />
                <span>아티클 공유하기</span>
              </button>

              <button
                onClick={() => {
                  setActivePost(null);
                  setIsSurveyModalOpen(true);
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-sky-600 text-white font-bold text-xs hover:bg-sky-700 shadow-md"
              >
                우리 발전소 청소 견적받기
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
