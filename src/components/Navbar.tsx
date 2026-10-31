import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sun, 
  Moon, 
  Download, 
  Upload, 
  Bot, 
  LogOut,
  User,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenProfile }) => {
  const { 
    activeTab, 
    setActiveTab, 
    isDarkMode, 
    toggleDarkMode, 
    project, 
    profile, 
    logout,
    exportWorkspace,
    importWorkspace 
  } = useApp();

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          const ok = importWorkspace(text);
          if (ok) {
            alert('Workspace loaded successfully!');
          } else {
            alert('Invalid backup file format.');
          }
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-8 px-6 py-3.5 border-b border-[#292D2B]/8 dark:border-white/8 bg-white/85 dark:bg-[#202422]/85 backdrop-blur-md transition-colors">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <button 
          onClick={() => setActiveTab('dashboard')} 
          className="flex items-center gap-2.5 text-left group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-[#527D5D] dark:bg-[#8DBA98] flex items-center justify-center text-white dark:text-[#171A18] font-bold text-sm shadow-xs transition-transform group-hover:scale-105">
            F
          </div>
          <span className="text-lg font-bold tracking-tight text-[#292D2B] dark:text-[#F2F1ED] whitespace-nowrap">
            FYP Mate
          </span>
        </button>

        <span className="hidden lg:inline text-xs text-[#6B7269]/60">·</span>

        <span className="hidden lg:inline text-xs font-medium text-[#6B7269] dark:text-[#9DA39B] max-w-[240px] truncate" title={project.title}>
          {project.title}
        </span>
      </div>

      {/* Zone 2: 4-5 concise single-line text links with pastel underline hover */}
      <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-[#6B7269] dark:text-[#9DA39B]">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`hover:text-[#292D2B] dark:hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
            activeTab === 'dashboard' ? 'text-[#292D2B] dark:text-white border-b-2 border-[#527D5D] dark:border-[#8DBA98] font-bold' : ''
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('academy')}
          className={`hover:text-[#292D2B] dark:hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
            activeTab === 'academy' ? 'text-[#292D2B] dark:text-white border-b-2 border-[#3E7796] dark:border-[#A9D4E8] font-bold' : ''
          }`}
        >
          Academy
        </button>
        <button
          onClick={() => setActiveTab('ideas')}
          className={`hover:text-[#292D2B] dark:hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
            activeTab === 'ideas' ? 'text-[#292D2B] dark:text-white border-b-2 border-[#946E1E] dark:border-[#E9C76A] font-bold' : ''
          }`}
        >
          Ideas
        </button>
        <button
          onClick={() => setActiveTab('workspace')}
          className={`hover:text-[#292D2B] dark:hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
            activeTab === 'workspace' ? 'text-[#292D2B] dark:text-white border-b-2 border-[#527D5D] dark:border-[#8DBA98] font-bold' : ''
          }`}
        >
          Workspace
        </button>
        <button
          onClick={() => setActiveTab('documentation')}
          className={`hover:text-[#292D2B] dark:hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
            activeTab === 'documentation' ? 'text-[#292D2B] dark:text-white border-b-2 border-[#3E7796] dark:border-[#A9D4E8] font-bold' : ''
          }`}
        >
          Docs Studio
        </button>
        <button
          onClick={() => setActiveTab('defense')}
          className={`hover:text-[#292D2B] dark:hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
            activeTab === 'defense' ? 'text-[#292D2B] dark:text-white border-b-2 border-[#9E4B60] dark:border-[#EBC3CC] font-bold' : ''
          }`}
        >
          Viva Voce
        </button>
      </nav>

      {/* Zone 3: 1 Primary Action + Quick Utilities */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Workspace Backup Quick Icons */}
        <div className="hidden xl:flex items-center gap-1 border-r border-[#292D2B]/8 dark:border-white/8 pr-2.5">
          <button
            onClick={exportWorkspace}
            title="Export Workspace JSON"
            className="p-1.5 text-[#6B7269] hover:text-[#292D2B] dark:hover:text-white rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
          </button>
          <label 
            title="Import Workspace JSON"
            className="p-1.5 text-[#6B7269] hover:text-[#292D2B] dark:hover:text-white rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
          </label>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="p-1.5 text-[#6B7269] hover:text-[#292D2B] dark:hover:text-white rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Primary Action Button (Deep Sage with high contrast) */}
        <button
          onClick={() => setActiveTab('mentor')}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white dark:text-[#171A18] bg-[#527D5D] hover:bg-[#43674D] dark:bg-[#8DBA98] dark:hover:bg-[#7ba886] rounded-xl shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Bot className="w-3.5 h-3.5" strokeWidth={2.2} />
          <span>Ask Mentor</span>
        </button>

        {/* Profile trigger */}
        <button
          onClick={onOpenProfile}
          className="flex items-center gap-2 p-1 rounded-full border border-[#292D2B]/10 dark:border-white/10 hover:ring-2 hover:ring-[#527D5D] dark:hover:ring-[#8DBA98] transition-all shrink-0 cursor-pointer"
          title={`Profile: ${profile.name || 'Setup Profile'}`}
        >
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={profile.name || 'Student'}
              referrerPolicy="no-referrer"
              className="w-7 h-7 rounded-full object-cover"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-[#EEF5EF] dark:bg-[#202E24] text-[#527D5D] dark:text-[#8DBA98] flex items-center justify-center text-xs font-bold border border-[#8DBA98]/30">
              {profile.name ? profile.name.charAt(0).toUpperCase() : <User className="w-3.5 h-3.5" strokeWidth={2} />}
            </div>
          )}
        </button>

        {/* Logout */}
        <button
          onClick={logout}
          title="Sign Out"
          className="p-1.5 text-[#6B7269] hover:text-rose-600 dark:hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>
    </header>
  );
};
