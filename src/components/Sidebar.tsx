import React from 'react';
import { useApp } from '../context/AppContext';
import { ActiveNavTab } from '../types';
import { 
  LayoutDashboard, 
  GraduationCap, 
  Lightbulb, 
  Scale, 
  KanbanSquare, 
  FileEdit, 
  Bot, 
  Presentation, 
  Award,
  ChevronRight,
  ShieldCheck,
  FolderOpen
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, project, completedChapters } = useApp();

  const navItems: { 
    id: ActiveNavTab; 
    label: string; 
    icon: React.ElementType; 
    badge?: string;
    accentColor: string;
    activeBg: string;
  }[] = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: LayoutDashboard,
      accentColor: 'text-[#527D5D] dark:text-[#8DBA98]',
      activeBg: 'bg-[#EEF5EF] dark:bg-[#202E24] text-[#292D2B] dark:text-white font-bold'
    },
    { 
      id: 'academy', 
      label: 'FYP Academy', 
      icon: GraduationCap, 
      badge: `${completedChapters.length}/12`,
      accentColor: 'text-[#3E7796] dark:text-[#A9D4E8]',
      activeBg: 'bg-[#EDF6FA] dark:bg-[#1C2C35] text-[#292D2B] dark:text-white font-bold'
    },
    { 
      id: 'ideas', 
      label: 'Idea Discovery', 
      icon: Lightbulb,
      accentColor: 'text-[#946E1E] dark:text-[#E9C76A]',
      activeBg: 'bg-[#FAF4E4] dark:bg-[#332C1A] text-[#292D2B] dark:text-white font-bold'
    },
    { 
      id: 'feasibility', 
      label: 'Feasibility Doctor', 
      icon: Scale,
      accentColor: 'text-[#527D5D] dark:text-[#8DBA98]',
      activeBg: 'bg-[#EEF5EF] dark:bg-[#202E24] text-[#292D2B] dark:text-white font-bold'
    },
    { 
      id: 'workspace', 
      label: 'Project Workspace', 
      icon: KanbanSquare,
      badge: `${project.tasks.filter(t => t.status === 'done').length}/${project.tasks.length}`,
      accentColor: 'text-[#527D5D] dark:text-[#8DBA98]',
      activeBg: 'bg-[#EEF5EF] dark:bg-[#202E24] text-[#292D2B] dark:text-white font-bold'
    },
    { 
      id: 'documentation', 
      label: 'Documentation Studio', 
      icon: FileEdit,
      accentColor: 'text-[#3E7796] dark:text-[#A9D4E8]',
      activeBg: 'bg-[#EDF6FA] dark:bg-[#1C2C35] text-[#292D2B] dark:text-white font-bold'
    },
    { 
      id: 'mentor', 
      label: 'AI Project Mentor', 
      icon: Bot,
      accentColor: 'text-[#527D5D] dark:text-[#8DBA98]',
      activeBg: 'bg-[#EEF5EF] dark:bg-[#202E24] text-[#292D2B] dark:text-white font-bold'
    },
    { 
      id: 'presentation', 
      label: 'Presentation Deck', 
      icon: Presentation,
      accentColor: 'text-[#9E4B60] dark:text-[#EBC3CC]',
      activeBg: 'bg-[#F9EDF0] dark:bg-[#332226] text-[#292D2B] dark:text-white font-bold'
    },
    { 
      id: 'defense', 
      label: 'Viva Voce Simulator', 
      icon: Award,
      accentColor: 'text-[#9E4B60] dark:text-[#EBC3CC]',
      activeBg: 'bg-[#F9EDF0] dark:bg-[#332226] text-[#292D2B] dark:text-white font-bold'
    },
  ];

  const completedCount = project.milestones.filter(m => m.completed).length;
  const progressPct = Math.round((completedCount / project.milestones.length) * 100) || 0;

  return (
    <aside className="w-64 shrink-0 border-r border-[#292D2B]/8 dark:border-white/8 bg-white/70 dark:bg-[#202422]/70 backdrop-blur-xs flex flex-col justify-between hidden md:flex transition-colors">
      <div className="p-4 space-y-5">
        {/* Active Project Card (Pastel container) */}
        <div className="p-3.5 rounded-2xl bg-[#FAF9F5] dark:bg-[#272C29] border border-[#292D2B]/6 dark:border-white/6">
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#55825D] dark:text-[#A8C9AE] flex items-center gap-1">
              <FolderOpen className="w-3 h-3" />
              <span>Active Project</span>
            </span>
            <span className="text-[10px] text-[#858982] dark:text-[#9DA39B] font-mono">
              {progressPct}%
            </span>
          </div>

          <h2 className="text-xs font-bold text-[#292D2B] dark:text-white line-clamp-1 mb-1.5" title={project.title}>
            {project.title}
          </h2>

          {/* Progress bar in Sage Green */}
          <div className="w-full bg-black/5 dark:bg-white/10 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-[#96BD9D] dark:bg-[#A8C9AE] h-1.5 rounded-full transition-all duration-500" 
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <div className="mt-2 flex items-center justify-between text-[11px] text-[#858982] dark:text-[#9DA39B]">
            <span className="truncate max-w-[130px]">{project.currentPhase.split('.')[1] || project.currentPhase}</span>
            <button 
              onClick={() => setActiveTab('workspace')}
              className="text-[#55825D] dark:text-[#A8C9AE] hover:underline inline-flex items-center text-[10px] font-semibold"
            >
              Open <ChevronRight className="w-3 h-3 ml-0.5" />
            </button>
          </div>
        </div>

        {/* Modules navigation */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#858982] dark:text-[#9DA39B]/70 mb-2">
            Modules
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
                  isActive
                    ? `${item.activeBg} shadow-xs`
                    : 'text-[#858982] dark:text-[#9DA39B] hover:text-[#292D2B] dark:hover:text-white hover:bg-black/4 dark:hover:bg-white/4'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? item.accentColor : 'text-[#858982]'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-black/5 dark:bg-white/10 text-[#858982] dark:text-[#9DA39B] shrink-0">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom info banner */}
      <div className="p-4 border-t border-[#292D2B]/8 dark:border-white/8 text-[11px] text-[#858982] dark:text-[#9DA39B] space-y-1.5">
        <div className="flex items-center gap-1.5 text-[#292D2B] dark:text-white font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-[#55825D] dark:text-[#A8C9AE]" />
          <span>IEEE Standards Aligned</span>
        </div>
        <p className="text-[10px] leading-relaxed">
          Open-source academic companion for Computer Science & Software Engineering capstone students.
        </p>
      </div>
    </aside>
  );
};
