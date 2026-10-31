import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  StudentProfile, 
  Project, 
  ProjectIdea, 
  ActiveNavTab,
  Task,
  Milestone,
  ProjectDoc,
  ProjectNote,
  AcademicDegree
} from '../types';
import { INITIAL_PROJECT } from '../data/initialProject';
import { PROJECT_IDEAS_CATALOG } from '../data/projectIdeasCatalog';

interface AppContextType {
  // Authentication
  isAuthenticated: boolean;
  login: (email: string, name?: string) => void;
  signup: (data: { name: string; email: string; university: string; degree: AcademicDegree }) => void;
  logout: () => void;
  enterDemoMode: () => void;

  profile: StudentProfile;
  setProfile: (p: StudentProfile) => void;
  updateProfile: (p: Partial<StudentProfile>) => void;
  
  project: Project;
  setProject: (p: Project) => void;
  updateProject: (p: Partial<Project>) => void;
  
  // Tasks
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  
  // Milestones
  toggleMilestone: (milestoneId: string) => void;
  
  // Notes
  addNote: (note: Omit<ProjectNote, 'id' | 'updatedAt'>) => void;
  deleteNote: (noteId: string) => void;
  
  // Documents
  updateDocument: (docId: string, content: string, isReady?: boolean) => void;
  
  // Saved Ideas
  savedIdeas: ProjectIdea[];
  toggleSaveIdea: (idea: ProjectIdea) => void;
  applyIdeaAsActiveProject: (idea: ProjectIdea) => void;
  
  // Academy progress
  completedChapters: string[];
  toggleChapterCompletion: (chapterId: string) => void;
  
  // Navigation & Theme
  activeTab: ActiveNavTab;
  setActiveTab: (tab: ActiveNavTab) => void;
  
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  toggleDarkMode: () => void;
  
  // Reset & Backup
  exportWorkspace: () => void;
  importWorkspace: (jsonStr: string) => boolean;
  resetWorkspace: () => void;
}

const STORAGE_KEYS = {
  AUTH: 'fyp_mate_auth_status_v2',
  PROFILE: 'fyp_mate_profile_v2',
  PROJECT: 'fyp_mate_project_v2',
  SAVED_IDEAS: 'fyp_mate_saved_ideas_v2',
  ACADEMY_COMPLETED: 'fyp_mate_academy_completed_v2',
  THEME: 'fyp_mate_theme_v2',
};

const EMPTY_PROFILE: StudentProfile = {
  name: '',
  university: '',
  degree: 'BS Computer Science',
  batchOrYear: 'Final Year',
  skills: [],
  bio: '',
  isOnboarded: false,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Authentication State (defaults to false unless user logged in previously)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AUTH);
      return saved === 'true';
    } catch {
      return false;
    }
  });

  // Profile State
  const [profile, setProfileState] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return saved ? JSON.parse(saved) : EMPTY_PROFILE;
    } catch {
      return EMPTY_PROFILE;
    }
  });

  // Active Project State
  const [project, setProjectState] = useState<Project>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECT);
      return saved ? JSON.parse(saved) : INITIAL_PROJECT;
    } catch {
      return INITIAL_PROJECT;
    }
  });

  // Saved Ideas
  const [savedIdeas, setSavedIdeas] = useState<ProjectIdea[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED_IDEAS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Academy completion
  const [completedChapters, setCompletedChapters] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACADEMY_COMPLETED);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Navigation
  const [activeTab, setActiveTab] = useState<ActiveNavTab>('dashboard');

  // Dark Mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      return saved === 'dark';
    } catch {
      return false;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH, isAuthenticated ? 'true' : 'false');
    } catch (e) {
      console.warn('Failed to save auth state', e);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.warn('Failed to save profile to localStorage', e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECT, JSON.stringify(project));
    } catch (e) {
      console.warn('Failed to save project to localStorage', e);
    }
  }, [project]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED_IDEAS, JSON.stringify(savedIdeas));
    } catch (e) {
      console.warn('Failed to save ideas to localStorage', e);
    }
  }, [savedIdeas]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ACADEMY_COMPLETED, JSON.stringify(completedChapters));
    } catch (e) {
      console.warn('Failed to save completed chapters to localStorage', e);
    }
  }, [completedChapters]);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem(STORAGE_KEYS.THEME, 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem(STORAGE_KEYS.THEME, 'light');
    }
  }, [isDarkMode]);

  // Auth actions
  const login = (email: string, name?: string) => {
    setIsAuthenticated(true);
    setProfileState((prev) => ({
      ...prev,
      name: name || prev.name || email.split('@')[0],
      isOnboarded: true,
    }));
  };

  const signup = (data: { name: string; email: string; university: string; degree: AcademicDegree }) => {
    setIsAuthenticated(true);
    setProfileState({
      name: data.name,
      university: data.university,
      degree: data.degree,
      batchOrYear: 'Final Year',
      skills: ['TypeScript', 'Python'],
      bio: '',
      isOnboarded: true,
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const enterDemoMode = () => {
    setIsAuthenticated(true);
    setProfileState({
      name: 'Ayesha Khan',
      university: 'National University of Sciences & Technology (NUST)',
      degree: 'BS Software Engineering',
      batchOrYear: 'Final Year (Semester 7)',
      skills: ['TypeScript', 'React', 'Python', 'PostgreSQL', 'Docker'],
      bio: 'Undergraduate student building decentralized healthcare software.',
      avatarUrl: '/src/assets/images/avatar_student_lead_1793475035344.jpg',
      isOnboarded: true,
    });
    setProjectState(INITIAL_PROJECT);
    setCompletedChapters(['ch-1', 'ch-2']);
    setSavedIdeas([PROJECT_IDEAS_CATALOG[0], PROJECT_IDEAS_CATALOG[1]]);
  };

  // Profile actions
  const setProfile = (p: StudentProfile) => setProfileState(p);
  const updateProfile = (partial: Partial<StudentProfile>) => {
    setProfileState((prev) => ({ ...prev, ...partial }));
  };

  // Project actions
  const setProject = (p: Project) => setProjectState(p);
  const updateProject = (partial: Partial<Project>) => {
    setProjectState((prev) => ({ ...prev, ...partial }));
  };

  // Task actions
  const addTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    };
    setProjectState((prev) => ({
      ...prev,
      tasks: [newTask, ...prev.tasks],
    }));
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setProjectState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) => (t.id === taskId ? { ...t, ...updates } : t)),
    }));
  };

  const deleteTask = (taskId: string) => {
    setProjectState((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((t) => t.id !== taskId),
    }));
  };

  // Milestone actions
  const toggleMilestone = (milestoneId: string) => {
    setProjectState((prev) => ({
      ...prev,
      milestones: prev.milestones.map((m) =>
        m.id === milestoneId ? { ...m, completed: !m.completed } : m
      ),
    }));
  };

  // Note actions
  const addNote = (noteData: Omit<ProjectNote, 'id' | 'updatedAt'>) => {
    const newNote: ProjectNote = {
      ...noteData,
      id: `note-${Date.now()}`,
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setProjectState((prev) => ({
      ...prev,
      notes: [newNote, ...prev.notes],
    }));
  };

  const deleteNote = (noteId: string) => {
    setProjectState((prev) => ({
      ...prev,
      notes: prev.notes.filter((n) => n.id !== noteId),
    }));
  };

  // Document actions
  const updateDocument = (docId: string, content: string, isReady?: boolean) => {
    setProjectState((prev) => ({
      ...prev,
      documents: prev.documents.map((d) =>
        d.id === docId
          ? {
              ...d,
              content,
              isReadyForSupervisor: isReady !== undefined ? isReady : d.isReadyForSupervisor,
              lastUpdated: new Date().toISOString().split('T')[0],
            }
          : d
      ),
    }));
  };

  // Saved Ideas
  const toggleSaveIdea = (idea: ProjectIdea) => {
    setSavedIdeas((prev) => {
      const exists = prev.some((i) => i.id === idea.id);
      if (exists) {
        return prev.filter((i) => i.id !== idea.id);
      }
      return [idea, ...prev];
    });
  };

  const applyIdeaAsActiveProject = (idea: ProjectIdea) => {
    const newProject: Project = {
      ...INITIAL_PROJECT,
      id: `proj-${Date.now()}`,
      title: idea.title,
      tagline: idea.proposedSolution.substring(0, 120) + '...',
      category: idea.category,
      difficulty: idea.difficulty,
      problemStatement: idea.problemStatement,
      proposedSolution: idea.proposedSolution,
      objectives: idea.objectives,
      coreFeatures: idea.suggestedFeatures,
      techStack: idea.recommendedTechStack,
      currentPhase: '1. Problem Selection',
    };
    setProjectState(newProject);
    setActiveTab('workspace');
  };

  // Academy completion
  const toggleChapterCompletion = (chapterId: string) => {
    setCompletedChapters((prev) => {
      if (prev.includes(chapterId)) {
        return prev.filter((id) => id !== chapterId);
      }
      return [...prev, chapterId];
    });
  };

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // Export / Import / Reset
  const exportWorkspace = () => {
    const data = {
      profile,
      project,
      savedIdeas,
      completedChapters,
      version: '2.0',
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fyp-mate-workspace-${project.title.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 30)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importWorkspace = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.project && data.profile) {
        setProjectState(data.project);
        setProfileState(data.profile);
        if (Array.isArray(data.savedIdeas)) setSavedIdeas(data.savedIdeas);
        if (Array.isArray(data.completedChapters)) setCompletedChapters(data.completedChapters);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const resetWorkspace = () => {
    setProjectState(INITIAL_PROJECT);
    setCompletedChapters(['ch-1', 'ch-2']);
    setSavedIdeas([PROJECT_IDEAS_CATALOG[0], PROJECT_IDEAS_CATALOG[1]]);
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        login,
        signup,
        logout,
        enterDemoMode,
        profile,
        setProfile,
        updateProfile,
        project,
        setProject,
        updateProject,
        addTask,
        updateTask,
        deleteTask,
        toggleMilestone,
        addNote,
        deleteNote,
        updateDocument,
        savedIdeas,
        toggleSaveIdea,
        applyIdeaAsActiveProject,
        completedChapters,
        toggleChapterCompletion,
        activeTab,
        setActiveTab,
        isDarkMode,
        setIsDarkMode,
        toggleDarkMode,
        exportWorkspace,
        importWorkspace,
        resetWorkspace,
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
