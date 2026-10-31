import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PROJECT_IDEAS_CATALOG } from '../../data/projectIdeasCatalog';
import { ProjectIdea, ProjectCategory, ProjectDifficulty } from '../../types';
import { 
  Lightbulb, 
  Search, 
  Sparkles, 
  Bookmark, 
  BookmarkCheck, 
  ArrowRight, 
  Users, 
  X, 
  ShieldAlert, 
  Loader2
} from 'lucide-react';

const CATEGORIES: ('All' | ProjectCategory)[] = [
  'All',
  'AI & Machine Learning',
  'Full-Stack Web Systems',
  'Systems, Cloud & DevOps',
  'Cyber Security & Cryptography',
  'Data Engineering & Big Data'
];

export const IdeaDiscoveryView: React.FC = () => {
  const { savedIdeas, toggleSaveIdea, applyIdeaAsActiveProject, profile } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProjectCategory>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [activeIdeaModal, setActiveIdeaModal] = useState<ProjectIdea | null>(null);

  // AI Idea Generator Modal State
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiInterest, setAiInterest] = useState(profile.bio || 'Healthcare, FinTech, Education');
  const [aiSkills, setAiSkills] = useState(profile.skills.length > 0 ? profile.skills.join(', ') : 'TypeScript, Python, React');
  const [aiTeamSize, setAiTeamSize] = useState('2–3 Students');
  const [aiDuration, setAiDuration] = useState('8 Months (2 Semesters)');
  const [aiDifficulty, setAiDifficulty] = useState<ProjectDifficulty>('Intermediate');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIdeas, setGeneratedIdeas] = useState<ProjectIdea[]>([]);
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Filter ideas
  const allIdeas = [...generatedIdeas, ...PROJECT_IDEAS_CATALOG];
  const filteredIdeas = allIdeas.filter((idea) => {
    const matchesSearch = 
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.problemStatement.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.recommendedTechStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || idea.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || idea.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleGenerateIdeas = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setGenerationError(null);

    try {
      const res = await fetch('/api/gemini/generate-ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: selectedCategory === 'All' ? 'Computer Science / Software Engineering' : selectedCategory,
          technicalSkills: aiSkills,
          interests: aiInterest,
          teamSize: aiTeamSize,
          targetDuration: aiDuration,
          difficulty: aiDifficulty
        })
      });

      if (!res.ok) {
        throw new Error('Failed to generate project ideas. Please try again.');
      }

      const data = await res.json();
      if (Array.isArray(data.ideas)) {
        const formatted: ProjectIdea[] = data.ideas.map((item: any, i: number) => ({
          id: `ai-gen-${Date.now()}-${i}`,
          title: item.title,
          category: (item.category as ProjectCategory) || 'Full-Stack Web Systems',
          difficulty: (item.difficulty as ProjectDifficulty) || 'Intermediate',
          recommendedTeamSize: aiTeamSize,
          problemStatement: item.problemStatement,
          proposedSolution: item.proposedSolution,
          objectives: item.objectives || [],
          suggestedFeatures: item.coreFeatures || [],
          recommendedTechStack: item.recommendedStack || [],
          possibleModules: ['Core Logic', 'API Service', 'Persistence', 'Client UI'],
          complexityAnalysis: item.complexityAnalysis || 'Balanced academic engineering scope.',
          learningRequirements: item.learningPrerequisites || [],
          potentialLimitations: item.potentialLimitations || [],
          supervisorDefenseTips: 'Articulate the exact system boundary and demonstrate test cases for core requirements.'
        }));

        setGeneratedIdeas(prev => [...formatted, ...prev]);
        setIsAiModalOpen(false);
        if (formatted.length > 0) {
          setActiveIdeaModal(formatted[0]);
        }
      }
    } catch (err: any) {
      setGenerationError(err.message || 'Error occurred while generating ideas.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#B88C22] dark:text-[#E9C76A] mb-1">
            <Lightbulb className="w-4 h-4" />
            <span>Project Idea Discovery</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#858982] dark:text-[#9DA39B]">{filteredIdeas.length} Vetted Projects Available</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#292D2B] dark:text-white tracking-tight">
            Discover Your Capstone Project
          </h1>
          <p className="mt-1 text-xs text-[#858982] dark:text-[#9DA39B] max-w-2xl">
            Explore curated, high-scoring Software Engineering and Computer Science projects with concrete problem statements, architectures, and supervisor defense tips. Or let AI design a tailored project around your strengths.
          </p>
        </div>

        <button
          onClick={() => setIsAiModalOpen(true)}
          className="px-4 py-2.5 text-xs font-bold text-white dark:text-[#171A18] bg-[#96BD9D] hover:bg-[#83AA8A] dark:bg-[#A8C9AE] dark:hover:bg-[#97BCA0] rounded-xl shadow-xs transition-colors whitespace-nowrap flex items-center gap-2 shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>AI Idea Generator</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 shadow-xs space-y-3.5">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#858982]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by keyword, domain (e.g. Healthcare, Cryptography), or tech (e.g. React, Python)..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-[#292D2B]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#96BD9D]"
            />
          </div>

          {/* Difficulty Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs text-[#858982] shrink-0">Difficulty:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-[#292D2B]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#96BD9D]"
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#292D2B] dark:bg-white text-white dark:text-[#292D2B] shadow-xs'
                  : 'bg-[#FAF9F5] dark:bg-[#272C29] text-[#858982] dark:text-[#9DA39B] hover:text-[#292D2B] dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredIdeas.map((idea) => {
          const isSaved = savedIdeas.some((i) => i.id === idea.id);

          return (
            <div
              key={idea.id}
              className="p-5 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 hover:border-[#96BD9D]/60 dark:hover:border-[#A8C9AE]/60 flex flex-col justify-between transition-all group shadow-xs"
            >
              <div>
                {/* Meta info */}
                <div className="flex items-center justify-between gap-2 text-xs text-[#858982] mb-2">
                  <span className="font-bold text-[#55825D] dark:text-[#A8C9AE] truncate">{idea.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="shrink-0">{idea.difficulty}</span>
                  <button
                    onClick={() => toggleSaveIdea(idea)}
                    className="ml-auto text-[#858982] hover:text-[#B88C22] transition-colors p-1"
                    title={isSaved ? 'Remove from saved' : 'Save idea'}
                  >
                    {isSaved ? (
                      <BookmarkCheck className="w-4 h-4 text-[#B88C22] fill-[#FAF4E4] dark:fill-[#332C1A]" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <h3 className="text-sm font-bold text-[#292D2B] dark:text-white line-clamp-2 group-hover:text-[#55825D] dark:group-hover:text-[#A8C9AE] transition-colors mb-2">
                  {idea.title}
                </h3>

                <p className="text-xs text-[#858982] dark:text-[#9DA39B] line-clamp-3 leading-relaxed mb-4">
                  {idea.problemStatement}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {idea.recommendedTechStack.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white border border-[#292D2B]/6 dark:border-white/6"
                    >
                      {tech}
                    </span>
                  ))}
                  {idea.recommendedTechStack.length > 4 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 text-[#858982]">
                      +{idea.recommendedTechStack.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-[#292D2B]/6 dark:border-white/6 flex items-center justify-between">
                <span className="text-[11px] text-[#858982] flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>{idea.recommendedTeamSize}</span>
                </span>

                <button
                  onClick={() => setActiveIdeaModal(idea)}
                  className="text-xs font-bold text-[#55825D] dark:text-[#A8C9AE] hover:underline flex items-center gap-1"
                >
                  <span>Explore Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredIdeas.length === 0 && (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 space-y-3">
          <Lightbulb className="w-8 h-8 text-[#858982] mx-auto" />
          <h3 className="text-sm font-bold text-[#292D2B] dark:text-white">
            No projects match your filter criteria
          </h3>
          <p className="text-xs text-[#858982] max-w-sm mx-auto">
            Try adjusting your search query, selecting "All Levels", or use the AI Idea Generator to tailor a project to your specific interests.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedDifficulty('All');
            }}
            className="px-3.5 py-1.5 text-xs font-bold text-[#55825D] dark:text-[#A8C9AE] hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Idea Detail Modal */}
      {activeIdeaModal && (
        <div className="fixed inset-0 z-50 bg-[#292D2B]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-3xl bg-white dark:bg-[#202422] rounded-3xl border border-[#292D2B]/8 dark:border-white/8 shadow-xl overflow-hidden my-8">
            <div className="p-6 border-b border-[#292D2B]/6 dark:border-white/6 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#858982] mb-1">
                  <span className="font-bold text-[#55825D] dark:text-[#A8C9AE]">{activeIdeaModal.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeIdeaModal.difficulty}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeIdeaModal.recommendedTeamSize}</span>
                </div>
                <h2 className="text-xl font-bold text-[#292D2B] dark:text-white">
                  {activeIdeaModal.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveIdeaModal(null)}
                className="p-1.5 rounded-xl text-[#858982] hover:text-[#292D2B] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              {/* Problem Statement */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#858982] mb-1.5">
                  1. Real-World Problem Statement
                </h4>
                <p className="text-xs text-[#292D2B] dark:text-white leading-relaxed bg-[#FAF9F5] dark:bg-[#272C29] p-4 rounded-2xl border border-[#292D2B]/6 dark:border-white/6">
                  {activeIdeaModal.problemStatement}
                </p>
              </div>

              {/* Proposed Solution */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#858982] mb-1.5">
                  2. Proposed Engineering Solution
                </h4>
                <p className="text-xs text-[#292D2B] dark:text-white leading-relaxed bg-[#EEF5EF] dark:bg-[#202E24] p-4 rounded-2xl border border-[#96BD9D]/30">
                  {activeIdeaModal.proposedSolution}
                </p>
              </div>

              {/* Objectives & Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#FAF9F5] dark:bg-[#272C29] border border-[#292D2B]/6 dark:border-white/6 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#858982]">
                    Measurable Objectives
                  </h4>
                  <ul className="text-xs text-[#292D2B] dark:text-white space-y-1.5 list-disc list-inside">
                    {activeIdeaModal.objectives.map((obj, i) => (
                      <li key={i}>{obj}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9F5] dark:bg-[#272C29] border border-[#292D2B]/6 dark:border-white/6 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#858982]">
                    Suggested Core Features
                  </h4>
                  <ul className="text-xs text-[#292D2B] dark:text-white space-y-1.5 list-disc list-inside">
                    {activeIdeaModal.suggestedFeatures.map((feat, i) => (
                      <li key={i}>{feat}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="space-y-2 pt-2 border-t border-[#292D2B]/6 dark:border-white/6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#858982]">
                  Recommended Technology Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeIdeaModal.recommendedTechStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white text-xs font-mono border border-[#292D2B]/6 dark:border-white/6"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Supervisor Defense Tips in Muted Mustard */}
              <div className="p-4 rounded-2xl bg-[#FAF4E4] dark:bg-[#332C1A] border border-[#E9C76A]/40 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#B88C22] dark:text-[#E9C76A]">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Supervisor Defense & Viva Advice</span>
                </div>
                <p className="text-xs text-[#292D2B] dark:text-white leading-relaxed">
                  {activeIdeaModal.supervisorDefenseTips}
                </p>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="p-4 border-t border-[#292D2B]/6 dark:border-white/6 bg-[#FAF9F5] dark:bg-[#272C29] flex items-center justify-between gap-3">
              <button
                onClick={() => toggleSaveIdea(activeIdeaModal)}
                className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-[#292D2B]/10 dark:border-white/10 text-[#292D2B] dark:text-white hover:bg-black/4 flex items-center gap-2"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Save to Favorites</span>
              </button>

              <button
                onClick={() => {
                  if (confirm(`Do you want to set "${activeIdeaModal.title}" as your active FYP workspace project?`)) {
                    applyIdeaAsActiveProject(activeIdeaModal);
                    setActiveIdeaModal(null);
                  }
                }}
                className="px-4 py-2 text-xs font-bold text-white dark:text-[#171A18] bg-[#96BD9D] hover:bg-[#83AA8A] dark:bg-[#A8C9AE] dark:hover:bg-[#97BCA0] rounded-xl shadow-xs flex items-center gap-2"
              >
                <span>Adopt as Active Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Idea Generator Form Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#292D2B]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-white dark:bg-[#202422] rounded-3xl border border-[#292D2B]/8 dark:border-white/8 shadow-xl overflow-hidden my-8">
            <div className="p-6 border-b border-[#292D2B]/6 dark:border-white/6 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#55825D] dark:text-[#A8C9AE] mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>AI Capstone Architect</span>
                </div>
                <h3 className="text-lg font-bold text-[#292D2B] dark:text-white">
                  Generate Custom FYP Ideas
                </h3>
              </div>
              <button
                onClick={() => setIsAiModalOpen(false)}
                className="p-1 rounded-xl text-[#858982] hover:text-[#292D2B] dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleGenerateIdeas} className="p-6 space-y-4">
              {generationError && (
                <div className="p-3 rounded-xl bg-[#F9EDF0] text-xs text-[#BD6C7B] border border-[#E0AEB8]/40">
                  {generationError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#292D2B] dark:text-white mb-1">
                  Areas of Academic or Industry Interest
                </label>
                <input
                  type="text"
                  required
                  value={aiInterest}
                  onChange={(e) => setAiInterest(e.target.value)}
                  placeholder="e.g. Healthcare triage, FinTech fraud detection, Smart Agriculture"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#292D2B]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white focus:ring-2 focus:ring-[#96BD9D]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#292D2B] dark:text-white mb-1">
                  Your Team's Technical Strengths
                </label>
                <input
                  type="text"
                  required
                  value={aiSkills}
                  onChange={(e) => setAiSkills(e.target.value)}
                  placeholder="e.g. Python, React, PostgreSQL, Docker, PyTorch"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#292D2B]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white focus:ring-2 focus:ring-[#96BD9D]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#292D2B] dark:text-white mb-1">
                    Team Size
                  </label>
                  <select
                    value={aiTeamSize}
                    onChange={(e) => setAiTeamSize(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#292D2B]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white"
                  >
                    <option value="Solo (1 Student)">Solo (1 Student)</option>
                    <option value="2 Students">2 Students</option>
                    <option value="3 Students">3 Students</option>
                    <option value="4 Students">4 Students</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#292D2B] dark:text-white mb-1">
                    Difficulty Level
                  </label>
                  <select
                    value={aiDifficulty}
                    onChange={(e) => setAiDifficulty(e.target.value as ProjectDifficulty)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#292D2B]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white"
                  >
                    <option value="Beginner">Beginner (Feasible & Safe)</option>
                    <option value="Intermediate">Intermediate (Recommended)</option>
                    <option value="Advanced">Advanced (High-Rigor / Novelty)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-[#292D2B]/6 dark:border-white/6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAiModalOpen(false)}
                  className="px-3.5 py-2 text-xs font-medium text-[#858982] hover:text-[#292D2B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="px-4 py-2 text-xs font-bold text-white dark:text-[#171A18] bg-[#96BD9D] hover:bg-[#83AA8A] dark:bg-[#A8C9AE] rounded-xl flex items-center gap-2 disabled:opacity-50 shadow-xs"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Generating with Gemini...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Generate 3 Project Ideas</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
