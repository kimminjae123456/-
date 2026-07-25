import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SiteConfig, Inquiry, PortfolioItem, BlogPost, ToastMessage, InquiryStatus } from '../types';
import { initialSiteConfig, initialPortfolios, initialBlogPosts, initialInquiries } from '../data/initialData';

interface AppContextType {
  siteConfig: SiteConfig;
  portfolios: PortfolioItem[];
  blogPosts: BlogPost[];
  inquiries: Inquiry[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: (auth: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  openAdminWithAuth: () => void;
  logoutAdmin: () => void;
  isSurveyModalOpen: boolean;
  setIsSurveyModalOpen: (open: boolean) => void;
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  
  // Actions
  updateSiteConfig: (newConfig: Partial<SiteConfig>) => void;
  addInquiry: (inquiryData: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => Inquiry;
  updateInquiryStatus: (id: string, status: InquiryStatus) => void;
  updateInquiryMemo: (id: string, adminMemo: string) => void;
  deleteInquiry: (id: string) => void;
  
  addPortfolio: (item: Omit<PortfolioItem, 'id'>) => void;
  updatePortfolio: (id: string, item: Partial<PortfolioItem>) => void;
  deletePortfolio: (id: string) => void;
  
  addBlogPost: (post: Omit<BlogPost, 'id' | 'views'>) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  
  resetToDefaultData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_CONFIG = 'solar_clear_site_config_v7';
const LOCAL_STORAGE_KEY_PORTFOLIO = 'solar_clear_portfolios_v5';
const LOCAL_STORAGE_KEY_BLOG = 'solar_clear_blog_posts_v8';
const LOCAL_STORAGE_KEY_INQUIRIES = 'solar_clear_inquiries_v1';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_CONFIG);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.email === 'contact@solarclear.co.kr') {
          parsed.email = initialSiteConfig.email;
        }
        return parsed;
      }
      return initialSiteConfig;
    } catch {
      return initialSiteConfig;
    }
  });

  const [portfolios, setPortfolios] = useState<PortfolioItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PORTFOLIO);
      return saved ? JSON.parse(saved) : initialPortfolios;
    } catch {
      return initialPortfolios;
    }
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_BLOG);
      if (saved) {
        const parsed: BlogPost[] = JSON.parse(saved);
        // Merge initial default posts with any user-added posts
        const defaultIds = new Set(initialBlogPosts.map(p => p.id));
        const customPosts = parsed.filter(p => !defaultIds.has(p.id));
        return [...initialBlogPosts, ...customPosts];
      }
      return initialBlogPosts;
    } catch {
      return initialBlogPosts;
    }
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_INQUIRIES);
      return saved ? JSON.parse(saved) : initialInquiries;
    } catch {
      return initialInquiries;
    }
  });

  const [activeTab, setActiveTab] = useState<string>('home');
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const openAdminWithAuth = () => {
    if (isAdminOpen) {
      setIsAdminOpen(false);
      return;
    }
    if (isAdminAuthenticated) {
      setIsAdminOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    setIsAdminOpen(false);
    showToast('관리자 세션이 종료되었습니다.');
  };

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_CONFIG, JSON.stringify(siteConfig));
    } catch (e) {
      console.error(e);
    }
  }, [siteConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_PORTFOLIO, JSON.stringify(portfolios));
    } catch (e) {
      console.error(e);
    }
  }, [portfolios]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_BLOG, JSON.stringify(blogPosts));
    } catch (e) {
      console.error(e);
    }
  }, [blogPosts]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {
      console.error(e);
    }
  }, [inquiries]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateSiteConfig = (newConfig: Partial<SiteConfig>) => {
    setSiteConfig((prev) => ({ ...prev, ...newConfig }));
    showToast('사이트 설정이 저장되었습니다.');
  };

  const addInquiry = (inquiryData: Omit<Inquiry, 'id' | 'createdAt' | 'status'>): Inquiry => {
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const newInquiry: Inquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      status: '신규 접수',
      createdAt: dateStr
    };

    setInquiries((prev) => [newInquiry, ...prev]);
    showToast('견적 신청이 정상적으로 접수되었습니다!');
    return newInquiry;
  };

  const updateInquiryStatus = (id: string, status: InquiryStatus) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
    showToast(`견적 상태가 '${status}'(으)로 변경되었습니다.`);
  };

  const updateInquiryMemo = (id: string, adminMemo: string) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, adminMemo } : item))
    );
    showToast('관리자 메모가 저장되었습니다.');
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((item) => item.id !== id));
    showToast('견적 문의 내역이 삭제되었습니다.');
  };

  const addPortfolio = (item: Omit<PortfolioItem, 'id'>) => {
    const newPort: PortfolioItem = {
      ...item,
      id: `port-${Date.now()}`
    };
    setPortfolios((prev) => [newPort, ...prev]);
    showToast('새 작업 사례가 등록되었습니다.');
  };

  const updatePortfolio = (id: string, item: Partial<PortfolioItem>) => {
    setPortfolios((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...item } : p))
    );
    showToast('작업 사례가 수정되었습니다.');
  };

  const deletePortfolio = (id: string) => {
    setPortfolios((prev) => prev.filter((p) => p.id !== id));
    showToast('작업 사례가 삭제되었습니다.');
  };

  const addBlogPost = (post: Omit<BlogPost, 'id' | 'views'>) => {
    const newPost: BlogPost = {
      ...post,
      id: `blog-${Date.now()}`,
      views: 0
    };
    setBlogPosts((prev) => [newPost, ...prev]);
    showToast('새 블로그 게시글이 작성되었습니다.');
  };

  const updateBlogPost = (id: string, post: Partial<BlogPost>) => {
    setBlogPosts((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...post } : b))
    );
    showToast('게시글이 수정되었습니다.');
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts((prev) => prev.filter((b) => b.id !== id));
    showToast('게시글이 삭제되었습니다.');
  };

  const resetToDefaultData = () => {
    setSiteConfig(initialSiteConfig);
    setPortfolios(initialPortfolios);
    setBlogPosts(initialBlogPosts);
    setInquiries(initialInquiries);
    localStorage.removeItem(LOCAL_STORAGE_KEY_CONFIG);
    localStorage.removeItem(LOCAL_STORAGE_KEY_PORTFOLIO);
    localStorage.removeItem(LOCAL_STORAGE_KEY_BLOG);
    localStorage.removeItem(LOCAL_STORAGE_KEY_INQUIRIES);
    showToast('모든 데이터가 초깃값으로 초기화되었습니다.');
  };

  return (
    <AppContext.Provider
      value={{
        siteConfig,
        portfolios,
        blogPosts,
        inquiries,
        activeTab,
        setActiveTab,
        isAdminOpen,
        setIsAdminOpen,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        isAuthModalOpen,
        setIsAuthModalOpen,
        openAdminWithAuth,
        logoutAdmin,
        isSurveyModalOpen,
        setIsSurveyModalOpen,
        toasts,
        showToast,
        removeToast,
        updateSiteConfig,
        addInquiry,
        updateInquiryStatus,
        updateInquiryMemo,
        deleteInquiry,
        addPortfolio,
        updatePortfolio,
        deletePortfolio,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        resetToDefaultData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
