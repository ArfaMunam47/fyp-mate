export type AcademicDegree = 
  | 'BS Computer Science'
  | 'BS Software Engineering'
  | 'BS Artificial Intelligence'
  | 'BS Data Science'
  | 'BS Cyber Security'
  | 'BS Information Technology';

export interface StudentProfile {
  name: string;
  university: string;
  degree: AcademicDegree;
  batchOrYear: string;
  skills: string[];
  bio?: string;
  avatarUrl?: string;
  isOnboarded: boolean;
}

export type ProjectCategory = 
  | 'AI & Machine Learning'
  | 'Full-Stack Web Systems'
  | 'Mobile & Ubiquitous Computing'
  | 'Systems, Cloud & DevOps'
  | 'Cyber Security & Cryptography'
  | 'Data Engineering & Big Data';

export type ProjectDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type ProjectPhase = 
  | '1. Problem Selection'
  | '2. Proposal & Defense'
  | '3. SRS & Architecture'
  | '4. Sprint 1 Implementation'
  | '5. Sprint 2 & QA Testing'
  | '6. Report & Final Viva';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar?: string;
}

export interface Milestone {
  id: string;
  title: string;
  phase: string;
  targetDate: string;
  completed: boolean;
  deliverable: string;
}

export type TaskStatus = 'backlog' | 'todo' | 'in_progress' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
  dueDate: string;
  tags: string[];
  moduleName?: string;
}

export interface ProjectNote {
  id: string;
  title: string;
  category: 'Supervisor Meeting' | 'Literature Review' | 'Architecture Decision' | 'Viva Notes' | 'General';
  content: string;
  updatedAt: string;
}

export type DocType = 
  | 'proposal'
  | 'abstract'
  | 'srs'
  | 'use_cases'
  | 'architecture'
  | 'database'
  | 'testing'
  | 'final_report';

export interface ProjectDoc {
  id: string;
  type: DocType;
  title: string;
  description: string;
  content: string;
  lastUpdated: string;
  isReadyForSupervisor: boolean;
}

export interface PresentationSlide {
  id: number;
  slideNumber: number;
  title: string;
  subtitle: string;
  durationMinutes: number;
  keyBullets: string[];
  visualRecommendation: string;
  speakerNotes: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  difficulty: ProjectDifficulty;
  currentPhase: ProjectPhase;
  problemStatement: string;
  proposedSolution: string;
  objectives: string[];
  coreFeatures: string[];
  stretchFeatures: string[];
  techStack: string[];
  teamMembers: TeamMember[];
  milestones: Milestone[];
  tasks: Task[];
  notes: ProjectNote[];
  documents: ProjectDoc[];
  presentationSlides: PresentationSlide[];
}

export interface ProjectIdea {
  id: string;
  title: string;
  category: ProjectCategory;
  difficulty: ProjectDifficulty;
  recommendedTeamSize: string;
  problemStatement: string;
  proposedSolution: string;
  objectives: string[];
  suggestedFeatures: string[];
  recommendedTechStack: string[];
  possibleModules: string[];
  complexityAnalysis: string;
  learningRequirements: string[];
  potentialLimitations: string[];
  supervisorDefenseTips: string;
  isSaved?: boolean;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface AcademyChapter {
  id: string;
  chapterNumber: number;
  title: string;
  readTime: string;
  category: string;
  summary: string;
  overview: string;
  coreConcepts: {
    title: string;
    description: string;
    example?: string;
  }[];
  doAndDont: {
    do: string[];
    dont: string[];
  };
  supervisorExpectations: string[];
  quiz: QuizQuestion[];
}

export interface FeasibilityResult {
  overallScore: number;
  status: string;
  summaryAssessment: string;
  technicalFeasibility: {
    score: number;
    verdict: string;
    risks: string[];
  };
  timeAndScope: {
    score: number;
    verdict: string;
    featuresToTrim: string[];
    featuresToAdd: string[];
  };
  resourceRequirements: string[];
  supervisorDefenseQuestions: string[];
  actionableRecommendations: string[];
}

export interface DefenseQuestion {
  question: string;
  category: string;
  examinerPersona: string;
  intent: string;
  whatToWatchFor: string;
  sampleOpeningHint: string;
}

export interface DefenseEvaluation {
  overallVerdict: string;
  accuracyScore: number;
  clarityScore: number;
  depthScore: number;
  totalPercentage: number;
  strengths: string[];
  weaknesses: string[];
  vivaTrapExposed: string;
  modelAnswer: string;
  nextFollowUpQuestion: string;
}

export type ActiveNavTab = 
  | 'dashboard'
  | 'academy'
  | 'ideas'
  | 'feasibility'
  | 'workspace'
  | 'documentation'
  | 'mentor'
  | 'presentation'
  | 'defense';
