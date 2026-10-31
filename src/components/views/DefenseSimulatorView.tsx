import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DefenseQuestion, DefenseEvaluation } from '../../types';
import { 
  Award, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Loader2, 
  RotateCcw,
  BookOpen,
  ArrowRight,
  UserCheck,
  Check
} from 'lucide-react';

const PERSONAS = [
  {
    id: 'Strict Technical Architect',
    name: 'Dr. Arthur Chen',
    title: 'Professor of Distributed Systems & Technical Evaluator',
    description: 'Probes concurrency, database locks, API latency, architectural trade-offs, and scaling bottlenecks.'
  },
  {
    id: 'Academic Research Professor',
    name: 'Dr. Elena Rostova',
    title: 'Department Chair & Thesis Methodology Reviewer',
    description: 'Scrutinizes literature review gaps, evaluation metrics, statistical significance, and theoretical algorithms.'
  },
  {
    id: 'Industry Practical Evaluator',
    name: 'Marcus Vance',
    title: 'Principal Software Engineer & External Industry Panelist',
    description: 'Probes production maintainability, security vulnerabilities, deployment pipelines, and failure recovery.'
  },
  {
    id: 'Friendly Generalist',
    name: 'Dr. Tariq Mahmood',
    title: 'Senior Faculty Member & Internal Committee Member',
    description: 'Tests foundational understanding of problem motivation, user personas, and end-to-end workflow.'
  }
];

const QUESTION_CATEGORIES = [
  'System Architecture & Scalability',
  'Database Normalization & Query Speed',
  'Security, Encryption & Auth',
  'Software Testing & Boundary Analysis',
  'Project Scope & Technical Limitations',
  'Viva Voce Trap Questions'
];

export const DefenseSimulatorView: React.FC = () => {
  const { project } = useApp();

  const [selectedPersona, setSelectedPersona] = useState(PERSONAS[0]);
  const [selectedCategory, setSelectedCategory] = useState(QUESTION_CATEGORIES[0]);
  const [studentAnswer, setStudentAnswer] = useState('');

  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [currentQuestion, setCurrentQuestion] = useState<DefenseQuestion>({
    question: `Your system architecture relies on PostgreSQL for patient vitals and Redis for active triage queues. How do you prevent data desynchronization if the Redis cache crashes during a high-concurrency emergency trauma intake, and what database transaction isolation level did you configure in PostgreSQL to prevent phantom reads?`,
    category: 'System Architecture & Scalability',
    examinerPersona: 'Strict Technical Architect',
    intent: 'Testing whether the student understands cache-aside consistency vs write-through patterns, and understands ACID transaction isolation.',
    whatToWatchFor: 'Students who claim Redis never crashes, or students who do not know the difference between Read Committed and Serializable isolation levels.',
    sampleOpeningHint: 'In our architecture, PostgreSQL acts as the single source of truth with write-through consistency, while Redis functions strictly as an ephemeral priority buffer...'
  });

  const [evaluation, setEvaluation] = useState<DefenseEvaluation | null>(null);

  const handleGenerateQuestion = async () => {
    setIsGeneratingQuestion(true);
    setError(null);
    setEvaluation(null);
    setStudentAnswer('');

    try {
      const res = await fetch('/api/gemini/defense-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          examinerPersona: selectedPersona.id,
          category: selectedCategory,
          projectContext: {
            title: project.title,
            techStack: project.techStack,
            description: project.problemStatement
          }
        })
      });

      if (!res.ok) {
        throw new Error('Failed to generate viva question.');
      }

      const data = await res.json();
      if (data.question) {
        setCurrentQuestion(data.question);
      }
    } catch (err: any) {
      setError(err.message || 'Error generating defense question.');
    } finally {
      setIsGeneratingQuestion(false);
    }
  };

  const handleEvaluateAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentAnswer.trim() || isEvaluating) return;

    setIsEvaluating(true);
    setError(null);

    try {
      const res = await fetch('/api/gemini/evaluate-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQuestion.question,
          studentAnswer,
          examinerPersona: selectedPersona.id,
          projectContext: {
            title: project.title,
            techStack: project.techStack
          }
        })
      });

      if (!res.ok) {
        throw new Error('Failed to evaluate viva answer.');
      }

      const data = await res.json();
      if (data.evaluation) {
        setEvaluation(data.evaluation);
      }
    } catch (err: any) {
      setError(err.message || 'Error evaluating student answer.');
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#55825D] dark:text-[#A8C9AE] mb-1">
            <Award className="w-4 h-4 text-[#E2BC57]" />
            <span>Oral Examination Defense Simulator</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#858982]">Rigorous Viva Rehearsal</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#292D2B] dark:text-white tracking-tight">
            Practice Your Viva Before the Committee
          </h1>
          <p className="mt-1 text-xs text-[#858982] max-w-2xl leading-relaxed">
            Rehearse defense questioning under realistic faculty pressure. Receive detailed grading on technical precision, academic depth, and learn model answers to common committee trap questions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Examiner Persona & Question Selector */}
        <div className="lg:col-span-4 space-y-5">
          <div className="p-5 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EEF5EF] dark:bg-[#202E24] text-[#55825D] dark:text-[#A8C9AE] flex items-center justify-center font-bold text-base border border-[#96BD9D]/30 shrink-0">
                {selectedPersona.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#292D2B] dark:text-white">
                  {selectedPersona.name}
                </h3>
                <p className="text-[11px] text-[#858982]">
                  {selectedPersona.title}
                </p>
              </div>
            </div>

            <p className="text-xs text-[#292D2B] dark:text-white/90 leading-relaxed bg-[#FAF9F5] dark:bg-[#272C29] p-3 rounded-2xl border border-[#292D2B]/6 dark:border-white/6 italic">
              "{selectedPersona.description}"
            </p>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#292D2B] dark:text-white">
                Select Committee Evaluator:
              </label>
              <div className="space-y-1">
                {PERSONAS.map((p) => {
                  const isSelected = selectedPersona.id === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPersona(p)}
                      className={`w-full text-left px-3 py-2 text-xs rounded-xl transition-colors flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#EEF5EF] dark:bg-[#202E24] text-[#292D2B] dark:text-white font-bold border border-[#96BD9D]/40'
                          : 'text-[#858982] hover:bg-[#FAF9F5] dark:hover:bg-[#272C29]'
                      }`}
                    >
                      <span>{p.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#55825D] dark:text-[#A8C9AE]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 border-t border-[#292D2B]/6 dark:border-white/6 space-y-2">
              <label className="block text-xs font-semibold text-[#292D2B] dark:text-white">
                Viva Question Topic:
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#292D2B]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white focus:outline-hidden"
              >
                {QUESTION_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleGenerateQuestion}
              disabled={isGeneratingQuestion}
              className="w-full py-2.5 text-xs font-bold text-white bg-[#527D5D] hover:bg-[#43674D] dark:bg-[#8DBA98] dark:text-[#171A18] dark:hover:bg-[#7ba886] rounded-xl shadow-xs flex items-center justify-center gap-2 disabled:opacity-50 transition-colors cursor-pointer"
            >
              {isGeneratingQuestion ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Drafting Tough Viva Question...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-white dark:text-[#171A18]" />
                  <span>Get New Question</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Question Display, Answer Box & AI Evaluation */}
        <div className="lg:col-span-8 space-y-5">
          {/* Question Box */}
          <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 shadow-xs space-y-4">
            <div className="flex items-center justify-between text-xs text-[#858982]">
              <span className="font-semibold text-[#55825D] dark:text-[#A8C9AE]">
                {currentQuestion.category}
              </span>
              <span>Examiner: {selectedPersona.name}</span>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#858982]">
                Committee Question
              </span>
              <h3 className="text-base md:text-lg font-bold text-[#292D2B] dark:text-white leading-relaxed">
                "{currentQuestion.question}"
              </h3>
            </div>

            {/* Hint & Trap card */}
            <div className="p-4 rounded-2xl bg-[#FAF9F5] dark:bg-[#272C29] border border-[#292D2B]/6 dark:border-white/6 space-y-2 text-xs">
              <div className="text-[#292D2B] dark:text-[#F2F1ED]">
                <strong className="text-[#292D2B] dark:text-white">What the Examiner is Testing: </strong>
                {currentQuestion.intent}
              </div>
              <div className="text-[#9E4B60] dark:text-[#EBC3CC]">
                <strong>Common Student Trap: </strong>
                {currentQuestion.whatToWatchFor}
              </div>
              <div className="text-[#3E7796] dark:text-[#A9D4E8] italic">
                <span className="not-italic font-bold">Recommended Opening: </span>
                "{currentQuestion.sampleOpeningHint}"
              </div>
            </div>

            {/* Answer Form */}
            <form onSubmit={handleEvaluateAnswer} className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-[#292D2B] dark:text-white mb-1.5">
                  Your Defense Answer:
                </label>
                <textarea
                  rows={4}
                  required
                  value={studentAnswer}
                  onChange={(e) => setStudentAnswer(e.target.value)}
                  placeholder="Structure your answer: 1) Acknowledge the core engineering trade-off, 2) Explain how your project implements it, 3) Mention failure recovery and limits..."
                  className="w-full px-3.5 py-3 text-xs rounded-2xl border border-[#292D2B]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#96BD9D]"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-[11px] text-[#858982]">
                  Tip: Speak calmly, justify architectural choices, and cite known limitations without guessing.
                </span>

                <button
                  type="submit"
                  disabled={!studentAnswer.trim() || isEvaluating}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#527D5D] hover:bg-[#43674D] dark:bg-[#8DBA98] dark:text-[#171A18] dark:hover:bg-[#7ba886] rounded-xl shadow-xs flex items-center justify-center gap-2 disabled:opacity-50 transition-colors shrink-0 cursor-pointer"
                >
                  {isEvaluating ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Grading Response...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit for Evaluation</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* AI Committee Evaluation Report */}
          {evaluation && (
            <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 shadow-xs space-y-5 animate-in fade-in duration-300">
              <div className="flex items-center justify-between gap-4 border-b border-[#292D2B]/6 dark:border-white/6 pb-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#858982]">
                    Committee Verdict
                  </span>
                  <h3 className="text-lg font-bold text-[#292D2B] dark:text-white">
                    {evaluation.overallVerdict}
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-3xl font-extrabold font-mono text-[#55825D] dark:text-[#A8C9AE]">
                    {evaluation.totalPercentage}%
                  </span>
                  <span className="text-[11px] text-[#858982] block">Viva Score</span>
                </div>
              </div>

              {/* Rubric Breakdown */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3.5 rounded-2xl bg-[#EEF5EF] dark:bg-[#202E24] border border-[#96BD9D]/20">
                  <span className="text-[11px] text-[#55825D] dark:text-[#A8C9AE] font-semibold block">Technical Accuracy</span>
                  <span className="text-lg font-bold font-mono text-[#292D2B] dark:text-white">
                    {evaluation.accuracyScore}/5
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#EBF5FA] dark:bg-[#1D2A30] border border-[#A9D4E8]/30">
                  <span className="text-[11px] text-[#3E7796] dark:text-[#A9D4E8] font-semibold block">Academic Clarity</span>
                  <span className="text-lg font-bold font-mono text-[#292D2B] dark:text-white">
                    {evaluation.clarityScore}/5
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#FBF6E8] dark:bg-[#2D2A1C] border border-[#E9C76A]/30">
                  <span className="text-[11px] text-[#946E1E] dark:text-[#E9C76A] font-semibold block">Depth & Rigor</span>
                  <span className="text-lg font-bold font-mono text-[#292D2B] dark:text-white">
                    {evaluation.depthScore}/5
                  </span>
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#EEF5EF] dark:bg-[#202E24] border border-[#96BD9D]/30 space-y-1.5">
                  <span className="text-xs font-bold text-[#55825D] dark:text-[#A8C9AE] block">
                    What You Answered Well:
                  </span>
                  <ul className="text-xs text-[#292D2B] dark:text-[#E8F0EA] space-y-1 list-disc list-inside">
                    {evaluation.strengths.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAECEF] dark:bg-[#2E1E23] border border-[#EBC3CC]/40 space-y-1.5">
                  <span className="text-xs font-bold text-[#9E4B60] dark:text-[#EBC3CC] block">
                    Vulnerabilities & Missing Details:
                  </span>
                  <ul className="text-xs text-[#292D2B] dark:text-[#F6E6E9] space-y-1 list-disc list-inside">
                    {evaluation.weaknesses.map((w, i) => (
                      <li key={i}>{w}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Model Answer from Professor */}
              <div className="p-5 rounded-2xl bg-[#EBF5FA] dark:bg-[#1D2A30] border border-[#A9D4E8]/40 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#3E7796] dark:text-[#A9D4E8] block">
                  Exemplary 5/5 Model Defense Answer:
                </span>
                <p className="text-xs text-[#292D2B] dark:text-white/90 leading-relaxed font-sans italic bg-white dark:bg-[#202422] p-4 rounded-xl border border-[#A9D4E8]/30">
                  "{evaluation.modelAnswer}"
                </p>
              </div>

              {/* Next Follow-up Question */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#858982]">
                <span>Examiner Follow-up: <strong className="text-[#292D2B] dark:text-white">"{evaluation.nextFollowUpQuestion}"</strong></span>
                <button
                  onClick={() => {
                    setCurrentQuestion(prev => ({
                      ...prev,
                      question: evaluation.nextFollowUpQuestion
                    }));
                    setStudentAnswer('');
                    setEvaluation(null);
                  }}
                  className="text-xs font-bold text-[#55825D] dark:text-[#A8C9AE] hover:underline flex items-center gap-1 shrink-0"
                >
                  <span>Answer Follow-Up</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

