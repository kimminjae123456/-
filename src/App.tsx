import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServiceIntro } from './components/ServiceIntro';
import { CleaningChecklist } from './components/CleaningChecklist';
import { Portfolio } from './components/Portfolio';
import { BlogSection } from './components/BlogSection';
import { SurveyEstimateModal } from './components/SurveyEstimateModal';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminAuthModal } from './components/AdminAuthModal';
import { FloatingBar } from './components/FloatingBar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';

const MainContent: React.FC = () => {
  const { isAdminOpen, activeTab } = useApp();

  if (isAdminOpen) {
    return <AdminDashboard />;
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Tab-based or full smooth-scroll landing */}
      {(activeTab === 'home' || activeTab === 'service') && <Hero />}
      {(activeTab === 'home' || activeTab === 'service') && <ServiceIntro />}
      {(activeTab === 'home' || activeTab === 'service') && <CleaningChecklist />}
      {(activeTab === 'home' || activeTab === 'portfolio') && <Portfolio />}
      {(activeTab === 'home' || activeTab === 'blog') && <BlogSection />}
      {activeTab === 'estimate' && (
        <div className="py-20 bg-slate-50 min-h-[70vh]">
          <Hero />
        </div>
      )}
      <Footer />
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen font-sans bg-white text-slate-900 antialiased selection:bg-sky-500 selection:text-white">
        <Header />
        <MainContent />
        <SurveyEstimateModal />
        <AdminAuthModal />
        <FloatingBar />
        <ToastContainer />
      </div>
    </AppProvider>
  );
}
