import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingView } from './components/views/LandingView';
import { AuthView } from './components/views/AuthView';
import { DashboardView } from './components/views/DashboardView';
import { AcademyView } from './components/views/AcademyView';
import { IdeaDiscoveryView } from './components/views/IdeaDiscoveryView';
import { FeasibilityView } from './components/views/FeasibilityView';
import { WorkspaceView } from './components/views/WorkspaceView';
import { DocStudioView } from './components/views/DocStudioView';
import { MentorView } from './components/views/MentorView';
import { PresentationView } from './components/views/PresentationView';
import { DefenseSimulatorView } from './components/views/DefenseSimulatorView';
import { ProfileModal } from './components/ProfileModal';
import { 
  LayoutDashboard, 
  GraduationCap, 
  KanbanSquare, 
  FileEdit, 
  Bot, 
  Award
} from 'lucide-react';
import { ActiveNavTab } from './types';

const MainLayout: React.FC = () => {
  const { activeTab, setActiveTab, isAuthenticated } = useApp();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup' | null>(null);

  // If user is not authenticated, show the public landing page as the default experience
  if (!isAuthenticated) {
    return (
      <>
        <LandingView
          onOpenSignIn={() => setAuthModalMode('signin')}
          onOpenSignUp={() => setAuthModalMode('signup')}
        />
        {authModalMode && (
          <AuthView
            initialMode={authModalMode}
            onClose={() => setAuthModalMode(null)}
          />
        )}
      </>
    );
  }

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'academy':
        return <AcademyView />;
      case 'ideas':
        return <IdeaDiscoveryView />;
      case 'feasibility':
        return <FeasibilityView />;
      case 'workspace':
        return <WorkspaceView />;
      case 'documentation':
        return <DocStudioView />;
      case 'mentor':
        return <MentorView />;
      case 'presentation':
        return <PresentationView />;
      case 'defense':
        return <DefenseSimulatorView />;
      default:
        return <DashboardView />;
    }
  };

  const mobileNavItems: { id: ActiveNavTab; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'academy', label: 'Academy', icon: GraduationCap },
    { id: 'workspace', label: 'Work', icon: KanbanSquare },
    { id: 'documentation', label: 'Docs', icon: FileEdit },
    { id: 'mentor', label: 'Mentor', icon: Bot },
    { id: 'defense', label: 'Viva', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-[#F7F6F0] dark:bg-[#171A18] text-[#292D2B] dark:text-[#F2F1ED] flex flex-col font-sans transition-colors">
      {/* Top Navbar */}
      <Navbar onOpenProfile={() => setIsProfileModalOpen(true)} />

      {/* Main Layout Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
          {renderActiveView()}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#202422]/95 backdrop-blur-md border-t border-[#292D2B]/8 dark:border-white/8 flex items-center justify-around py-2 px-1">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
                isActive
                  ? 'text-[#527D5D] dark:text-[#8DBA98] font-bold'
                  : 'text-[#6B7269] hover:text-[#292D2B] dark:hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Student Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
