import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ACADEMY_CHAPTERS } from '../../data/academyCurriculum';
import { 
  GraduationCap, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Check, 
  X, 
  ChevronRight, 
  ChevronLeft,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';

export const AcademyView: React.FC = () => {
  const { completedChapters, toggleChapterCompletion } = useApp();
  const [selectedChapterId, setSelectedChapterId] = useState<string>(ACADEMY_CHAPTERS[0].id);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [showQuizResults, setShowQuizResults] = useState<Record<string, boolean>>({});

  const currentChapter = ACADEMY_CHAPTERS.find(c => c.id === selectedChapterId) || ACADEMY_CHAPTERS[0];
  const currentIndex = ACADEMY_CHAPTERS.findIndex(c => c.id === selectedChapterId);
  const isCompleted = completedChapters.includes(currentChapter.id);

  const handleSelectOption = (questionIdx: number, optionIdx: number) => {
    const key = `${currentChapter.id}-q${questionIdx}`;
    setUserAnswers(prev => ({ ...prev, [key]: optionIdx }));
  };

  const handleCheckQuiz = (questionIdx: number) => {
    const key = `${currentChapter.id}-q${questionIdx}`;
    setShowQuizResults(prev => ({ ...prev, [key]: true }));
  };

  const handleNextChapter = () => {
    if (currentIndex < ACADEMY_CHAPTERS.length - 1) {
      setSelectedChapterId(ACADEMY_CHAPTERS[currentIndex + 1].id);
    }
  };

  const handlePrevChapter = () => {
    if (currentIndex > 0) {
      setSelectedChapterId(ACADEMY_CHAPTERS[currentIndex - 1].id);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Academy Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#4A8DAF] dark:text-[#9FD0E6] mb-1">
            <GraduationCap className="w-4 h-4" />
            <span>FYP Academy Curriculum</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#858982] dark:text-[#9DA39B]">{completedChapters.length} of 12 Chapters Mastered</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#292D2B] dark:text-white tracking-tight">
            The Complete Final Year Project Playbook
          </h1>
          <p className="mt-1 text-xs text-[#858982] dark:text-[#9DA39B] max-w-2xl">
            Step-by-step academic software engineering guides covering proposal creation, IEEE 830 SRS specifications, database normalization, system architecture, testing protocols, and oral viva defense.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <span className="text-xs text-[#858982]">Total Progress</span>
            <p className="text-xl font-bold font-mono text-[#55825D] dark:text-[#A8C9AE]">
              {Math.round((completedChapters.length / ACADEMY_CHAPTERS.length) * 100)}%
            </p>
          </div>
          <div className="w-13 h-13 rounded-2xl bg-[#EEF5EF] dark:bg-[#202E24] border border-[#96BD9D]/40 flex items-center justify-center font-mono font-bold text-xs text-[#55825D] dark:text-[#A8C9AE]">
            {completedChapters.length}/12
          </div>
        </div>
      </div>

      {/* Main Split: Chapters List + Current Chapter Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Chapters Navigation List */}
        <div className="lg:col-span-4 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 divide-y divide-[#292D2B]/6 dark:divide-white/6 overflow-hidden shadow-xs">
          <div className="p-4 bg-[#FAF9F5] dark:bg-[#272C29]">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#858982] dark:text-[#9DA39B]">
              Curriculum Chapters
            </h2>
          </div>

          <div className="max-h-[660px] overflow-y-auto divide-y divide-[#292D2B]/6 dark:divide-white/6">
            {ACADEMY_CHAPTERS.map((ch) => {
              const isSelected = ch.id === selectedChapterId;
              const isDone = completedChapters.includes(ch.id);
              return (
                <div
                  key={ch.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedChapterId(ch.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedChapterId(ch.id);
                    }
                  }}
                  className={`w-full p-3.5 text-left transition-colors flex items-start gap-3 group cursor-pointer ${
                    isSelected
                      ? 'bg-[#EEF5EF] dark:bg-[#202E24]'
                      : 'hover:bg-[#FAF9F5] dark:hover:bg-[#272C29]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleChapterCompletion(ch.id);
                    }}
                    className="mt-0.5 text-[#858982] hover:text-[#55825D] transition-colors shrink-0"
                    title={isDone ? 'Mark as unread' : 'Mark as completed'}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-[#55825D] fill-[#EEF5EF] dark:fill-[#202E24]" />
                    ) : (
                      <Circle className="w-4 h-4 text-[#858982]/40" />
                    )}
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between text-[11px] text-[#858982] mb-0.5">
                      <span>Chapter {ch.chapterNumber}</span>
                      <span>{ch.readTime}</span>
                    </div>
                    <h3 className={`text-xs font-semibold truncate ${
                      isSelected 
                        ? 'text-[#55825D] dark:text-[#A8C9AE] font-bold' 
                        : 'text-[#292D2B] dark:text-white group-hover:text-[#55825D] dark:group-hover:text-[#A8C9AE]'
                    }`}>
                      {ch.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Chapter Detail Content */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 shadow-xs space-y-6">
            {/* Header info */}
            <div className="border-b border-[#292D2B]/6 dark:border-white/6 pb-5">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 text-xs text-[#858982]">
                  <span className="font-bold text-[#55825D] dark:text-[#A8C9AE]">Chapter {currentChapter.chapterNumber}</span>
                  <span aria-hidden="true">·</span>
                  <span>{currentChapter.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {currentChapter.readTime}</span>
                </div>

                <button
                  type="button"
                  onClick={() => toggleChapterCompletion(currentChapter.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 ${
                    isCompleted
                      ? 'bg-[#EEF5EF] dark:bg-[#202E24] text-[#55825D] dark:text-[#A8C9AE] border border-[#96BD9D]/40'
                      : 'bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white hover:bg-[#EEF5EF]'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isCompleted ? 'Completed' : 'Mark Completed'}</span>
                </button>
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-[#292D2B] dark:text-white">
                {currentChapter.title}
              </h2>
              <p className="mt-2 text-xs md:text-sm text-[#858982] dark:text-[#9DA39B] leading-relaxed">
                {currentChapter.summary}
              </p>
            </div>

            {/* In-depth Overview */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#858982]">
                Foundational Overview
              </h3>
              <div className="text-xs md:text-sm text-[#292D2B] dark:text-white leading-relaxed space-y-3 whitespace-pre-line">
                {currentChapter.overview}
              </div>
            </div>

            {/* Core Concepts */}
            <div className="space-y-3.5 pt-4 border-t border-[#292D2B]/6 dark:border-white/6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#858982]">
                Key Engineering Concepts
              </h3>
              <div className="space-y-3">
                {currentChapter.coreConcepts.map((concept, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#FAF9F5] dark:bg-[#272C29] border border-[#292D2B]/6 dark:border-white/6 space-y-1.5">
                    <h4 className="text-xs font-bold text-[#55825D] dark:text-[#A8C9AE]">
                      {idx + 1}. {concept.title}
                    </h4>
                    <p className="text-xs text-[#292D2B] dark:text-white leading-relaxed">
                      {concept.description}
                    </p>
                    {concept.example && (
                      <div className="mt-2 p-3 rounded-xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 text-[11px] text-[#858982] dark:text-[#9DA39B]">
                        <span className="font-bold text-[#292D2B] dark:text-white">Practical Example: </span>
                        {concept.example}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Do's and Don'ts in Soft Pastel Pink & Sage Green */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#292D2B]/6 dark:border-white/6">
              <div className="p-4 rounded-2xl bg-[#EEF5EF] dark:bg-[#202E24] border border-[#96BD9D]/30 space-y-2">
                <div className="flex items-center gap-2 text-[#55825D] dark:text-[#A8C9AE] font-bold text-xs">
                  <Check className="w-4 h-4" />
                  <span>Engineering Best Practices (Do)</span>
                </div>
                <ul className="text-xs text-[#292D2B] dark:text-white space-y-1.5 list-disc list-inside">
                  {currentChapter.doAndDont.do.map((item, i) => (
                    <li key={i} className="leading-relaxed">{item}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-[#F9EDF0] dark:bg-[#332226] border border-[#E0AEB8]/30 space-y-2">
                <div className="flex items-center gap-2 text-[#BD6C7B] dark:text-[#EBC3CC] font-bold text-xs">
                  <X className="w-4 h-4" />
                  <span>Defense Red Flags (Don't)</span>
                </div>
                <ul className="text-xs text-[#292D2B] dark:text-white space-y-1.5 list-disc list-inside">
                  {currentChapter.doAndDont.dont.map((item, i) => (
                    <li key={i} className="leading-relaxed">{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Supervisor Expectations */}
            <div className="p-4 rounded-2xl bg-[#FAF9F5] dark:bg-[#272C29] border border-[#292D2B]/6 dark:border-white/6 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#292D2B] dark:text-white">
                <ShieldCheck className="w-4 h-4 text-[#55825D] dark:text-[#A8C9AE]" />
                <span>What Supervisors & Examiners Expect in This Stage</span>
              </div>
              <ul className="text-xs text-[#858982] dark:text-[#9DA39B] space-y-1 list-disc list-inside">
                {currentChapter.supervisorExpectations.map((exp, i) => (
                  <li key={i}>{exp}</li>
                ))}
              </ul>
            </div>

            {/* Interactive Knowledge Check Quiz */}
            <div className="pt-4 border-t border-[#292D2B]/6 dark:border-white/6 space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#4A8DAF] dark:text-[#9FD0E6]" />
                <h3 className="text-sm font-bold text-[#292D2B] dark:text-white">
                  Knowledge Check Quiz
                </h3>
              </div>

              {currentChapter.quiz.map((q, qIdx) => {
                const key = `${currentChapter.id}-q${qIdx}`;
                const selectedOpt = userAnswers[key];
                const isSubmitted = showQuizResults[key];
                const isCorrect = selectedOpt === q.correctIndex;

                return (
                  <div key={qIdx} className="p-4 rounded-2xl border border-[#292D2B]/8 dark:border-white/8 bg-[#FAF9F5] dark:bg-[#272C29] space-y-3">
                    <p className="text-xs font-semibold text-[#292D2B] dark:text-white">
                      Q{qIdx + 1}: {q.question}
                    </p>

                    <div className="space-y-1.5">
                      {q.options.map((opt, optIdx) => {
                        let btnStyle = 'border-[#292D2B]/8 dark:border-white/8 bg-white dark:bg-[#202422] text-[#292D2B] dark:text-white hover:bg-black/4';
                        if (selectedOpt === optIdx) {
                          btnStyle = 'border-[#96BD9D] bg-[#EEF5EF] dark:bg-[#202E24] text-[#292D2B] dark:text-white font-medium';
                        }
                        if (isSubmitted) {
                          if (optIdx === q.correctIndex) {
                            btnStyle = 'border-[#96BD9D] bg-[#EEF5EF] text-[#55825D] dark:bg-[#202E24] dark:text-[#A8C9AE] font-bold';
                          } else if (selectedOpt === optIdx) {
                            btnStyle = 'border-[#E0AEB8] bg-[#F9EDF0] text-[#BD6C7B] dark:bg-[#332226] dark:text-[#EBC3CC]';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            disabled={isSubmitted}
                            onClick={() => handleSelectOption(qIdx, optIdx)}
                            className={`w-full p-2.5 text-left text-xs rounded-xl border transition-colors flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {isSubmitted && optIdx === q.correctIndex && (
                              <Check className="w-3.5 h-3.5 text-[#55825D] shrink-0 ml-2" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {!isSubmitted ? (
                      <button
                        type="button"
                        onClick={() => handleCheckQuiz(qIdx)}
                        disabled={selectedOpt === undefined}
                        className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#96BD9D] hover:bg-[#83AA8A] disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-colors shadow-xs"
                      >
                        Verify Answer
                      </button>
                    ) : (
                      <div className={`p-3 rounded-xl text-xs ${
                        isCorrect 
                          ? 'bg-[#EEF5EF] text-[#55825D] dark:bg-[#202E24] dark:text-[#A8C9AE] border border-[#96BD9D]/40'
                          : 'bg-[#F9EDF0] text-[#BD6C7B] dark:bg-[#332226] dark:text-[#EBC3CC] border border-[#E0AEB8]/40'
                      }`}>
                        <p className="font-bold mb-1">
                          {isCorrect ? 'Correct!' : 'Incorrect'}
                        </p>
                        <p className="text-[11px] leading-relaxed">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Next / Prev Navigation */}
            <div className="pt-6 border-t border-[#292D2B]/6 dark:border-white/6 flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrevChapter}
                disabled={currentIndex === 0}
                className="px-3.5 py-2 text-xs font-medium rounded-xl border border-[#292D2B]/8 dark:border-white/8 text-[#292D2B] dark:text-white hover:bg-black/4 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous Chapter</span>
              </button>

              <button
                type="button"
                onClick={handleNextChapter}
                disabled={currentIndex === ACADEMY_CHAPTERS.length - 1}
                className="px-3.5 py-2 text-xs font-bold rounded-xl bg-[#96BD9D] hover:bg-[#83AA8A] text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-xs"
              >
                <span>Next Chapter</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
