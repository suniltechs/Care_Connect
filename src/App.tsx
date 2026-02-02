import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { LandingPage } from '@/pages/LandingPage';
import { Dashboard } from '@/pages/Dashboard';
import { PatientProfile } from '@/pages/PatientProfile';
import { CarePlan } from '@/pages/CarePlan';
import { ResourceLibrary } from '@/pages/ResourceLibrary';
import { CommunityForum } from '@/pages/CommunityForum';
import { MentalHealth } from '@/pages/MentalHealth';
import { PrivacyAccessibility } from '@/pages/PrivacyAccessibility';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleGetStarted = () => {
    setCurrentPage('dashboard');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onGetStarted={handleGetStarted} />;
      case 'dashboard':
        return <Dashboard />;
      case 'profile':
        return <PatientProfile />;
      case 'careplan':
        return <CarePlan />;
      case 'resources':
        return <ResourceLibrary />;
      case 'community':
        return <CommunityForum />;
      case 'wellness':
        return <MentalHealth />;
      case 'privacy':
        return <PrivacyAccessibility />;
      default:
        return <LandingPage onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="min-h-screen bg-off-white">
      {currentPage !== 'landing' && (
        <Navigation 
          currentPage={currentPage} 
          onPageChange={setCurrentPage} 
        />
      )}
      <main className="animate-fade-in">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
