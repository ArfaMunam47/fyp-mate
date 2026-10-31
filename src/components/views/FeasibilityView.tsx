import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FeasibilityResult } from '../../types';
import { 
  Scale, 
  Sparkles, 
  Loader2, 
  ShieldAlert,
  Clock,
  Cpu,
  Scissors,
  PlusCircle
} from 'lucide-react';

export const FeasibilityView: React.FC = () => {
  const { project, profile } = useApp();

  const [customTitle, setCustomTitle] = useState(project.title);
  const [customDescription, setCustomDescription] = useState(project.problemStatement);
  const [customStack, setCustomStack] = useState(project.techStack.join(', '));
  const [customTeamSize, setCustomTeamSize] = useState('2–3 Students');
  const [customDuration, setCustomDuration] = useState('2 Semesters (8 Months)');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<FeasibilityResult | null>({
    overallScore: 84,
    status: 'Well-Scoped',
    summaryAssessment: 'MedFlow demonstrates strong academic feasibility with clean boundary separation between emergency triage handoff and whole-hospital billing. The tech stack is industry standard and realistically achievable within an 8-month undergraduate timeframe.',
    technicalFeasibility: {
      score: 88,
      verdict: 'High Feasibility. RESTful HL7 FHIR schemas and ESI algorithms have documented open-source specifications.',
      risks: [
        'Real hospital EHR integrations require simulated test sandboxes due to patient privacy laws.',
        'High-concurrency WebSocket socket synchronization under simulated ambulance network drops.'
      ]
    },
    timeAndScope: {
      score: 82,
      verdict: 'Well-paced for 2 semesters if sprint milestones are strictly enforced.',
      featuresToTrim: [
        'Biometric fingerprint scanner hardware integration (leave as future work).',
        'Direct hospital billing and insurance claim settlement.'
      ],
      featuresToAdd: [
        'Cryptographic audit log verification script to demonstrate HIPAA compliance.',
        'Simulated offline paramedic QR handoff in ambulance scenario.'
      ]
    },
    resourceRequirements: [
      'Standard local development machines with Docker support.',
      'Publicly available synthetic clinical datasets (MIMIC-III or Synthea FHIR generator).',
      'Zero paid cloud dependencies required for local defense demo.'
    ],
    supervisorDefenseQuestions: [
      'How does your ESI algorithm prevent race conditions when two emergency patients arrive simultaneously with Level 1 vitals?',
      'Why did you choose a modular layered architecture instead of independent microservices for an emergency system?',
      'How do you verify data integrity when a paramedic syncs cached vitals after an offline connection?'
    ],
    actionableRecommendations: [
      'Lock in the FHIR JSON schema by the end of Semester 1 before writing application code.',
      'Prepare automated boundary test cases for pediatric vs geriatric physiological thresholds.',
      'Have an offline local Docker instance ready during final defense to eliminate Wi-Fi dependency.'
    ]
  });

  const handleRunDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/gemini/feasibility-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: customTitle,
          description: customDescription,
          techStack: customStack,
          teamSize: customTeamSize,
          duration: customDuration,
          studentSkills: profile.skills.join(', '),
          plannedScope: project.coreFeatures.join('; ')
        })
      });

      if (!res.ok) {
        throw new Error('Failed to evaluate feasibility with Gemini.');
      }

      const data = await res.json();
      if (data.evaluation) {
        setResult(data.evaluation);
      }
    } catch (err: any) {
      setError(err.message || 'Error running feasibility doctor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#55825D] dark:text-[#A8C9AE] mb-1">
            <Scale className="w-4 h-4" />
            <span>Project Feasibility Doctor</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#858982] dark:text-[#9DA39B]">Academic Scope & Risk Auditing</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#292D2B] dark:text-white tracking-tight">
            Will Your Project Pass the Approval Board?
          </h1>
          <p className="mt-1 text-xs text-[#858982] dark:text-[#9DA39B] max-w-2xl">
            Evaluate whether your proposal has sufficient technical depth without becoming an impossible 8-month trap. Identify feature scope bloat, data bottlenecks, and anticipate tough supervisor defense questions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Input Form */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 shadow-xs space-y-4">
          <div className="border-b border-[#292D2B]/6 dark:border-white/6 pb-3">
            <h3 className="text-sm font-bold text-[#292D2B] dark:text-white">
              Project Parameters to Audit
            </h3>
            <p className="text-xs text-[#858982]">
              Synced with your current active project details
            </p>
          </div>

          <form onSubmit={handleRunDoctor} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-[#292D2B] dark:text-white mb-1">
                Project Title
              </label>
              <input
                type="text"
                required
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#292D2B]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white focus:ring-2 focus:ring-[#96BD9D]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#292D2B] dark:text-white mb-1">
                Core Problem & Planned Solution
              </label>
              <textarea
                rows={3}
                required
                value={customDescription}
                onChange={(e) => setCustomDescription(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#292D2B]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white focus:ring-2 focus:ring-[#96BD9D]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#292D2B] dark:text-white mb-1">
                Target Technologies
              </label>
              <input
                type="text"
                required
                value={customStack}
                onChange={(e) => setCustomStack(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#292D2B]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white font-mono focus:ring-2 focus:ring-[#96BD9D]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#292D2B] dark:text-white mb-1">
                  Team Size
                </label>
                <select
                  value={customTeamSize}
                  onChange={(e) => setCustomTeamSize(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#292D2B]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white"
                >
                  <option value="Solo (1 Student)">Solo (1 Student)</option>
                  <option value="2–3 Students">2–3 Students</option>
                  <option value="4 Students">4 Students</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#292D2B] dark:text-white mb-1">
                  Project Duration
                </label>
                <select
                  value={customDuration}
                  onChange={(e) => setCustomDuration(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#292D2B]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white"
                >
                  <option value="1 Semester (4 Months)">1 Semester (4 Months)</option>
                  <option value="2 Semesters (8 Months)">2 Semesters (8 Months)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-2.5 px-4 text-xs font-bold text-white dark:text-[#171A18] bg-[#96BD9D] hover:bg-[#83AA8A] dark:bg-[#A8C9AE] rounded-xl shadow-xs flex items-center justify-center gap-2 disabled:opacity-50 transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Evaluating Scope with Gemini...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run Feasibility Doctor</span>
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="p-3 rounded-2xl bg-[#F9EDF0] text-xs text-[#BD6C7B] border border-[#E0AEB8]/40">
              {error}
            </div>
          )}
        </div>

        {/* Right Column: Feasibility Diagnostic Report */}
        <div className="lg:col-span-7 space-y-6">
          {result && (
            <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 shadow-xs space-y-5">
              {/* Score Header */}
              <div className="flex items-center justify-between gap-4 border-b border-[#292D2B]/6 dark:border-white/6 pb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#858982]">
                      Overall Feasibility Verdict
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-[#EEF5EF] text-[#55825D] dark:bg-[#202E24] dark:text-[#A8C9AE] border border-[#96BD9D]/40">
                      {result.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#292D2B] dark:text-white">
                    Diagnostic Analysis Complete
                  </h3>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-3xl font-extrabold font-mono text-[#55825D] dark:text-[#A8C9AE]">
                    {result.overallScore}
                  </span>
                  <span className="text-xs text-[#858982]">/100</span>
                </div>
              </div>

              {/* Summary Assessment */}
              <p className="text-xs text-[#292D2B] dark:text-white leading-relaxed bg-[#FAF9F5] dark:bg-[#272C29] p-4 rounded-2xl border border-[#292D2B]/6 dark:border-white/6">
                {result.summaryAssessment}
              </p>

              {/* Sub-Dimension Scores */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Tech Feasibility */}
                <div className="p-4 rounded-2xl border border-[#292D2B]/8 dark:border-white/8 bg-[#FAF9F5] dark:bg-[#272C29] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#292D2B] dark:text-white">
                      <Cpu className="w-4 h-4 text-[#55825D] dark:text-[#A8C9AE]" />
                      <span>Technical Architecture</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#55825D] dark:text-[#A8C9AE]">
                      {result.technicalFeasibility.score}/100
                    </span>
                  </div>
                  <p className="text-[11px] text-[#858982] dark:text-[#9DA39B] leading-relaxed">
                    {result.technicalFeasibility.verdict}
                  </p>
                  <div className="pt-2 text-[11px] text-[#BD6C7B] dark:text-[#EBC3CC] space-y-1">
                    <span className="font-semibold block text-[#292D2B] dark:text-white">Technical Risks:</span>
                    <ul className="list-disc list-inside space-y-0.5">
                      {result.technicalFeasibility.risks.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Scope & Time */}
                <div className="p-4 rounded-2xl border border-[#292D2B]/8 dark:border-white/8 bg-[#FAF9F5] dark:bg-[#272C29] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#292D2B] dark:text-white">
                      <Clock className="w-4 h-4 text-[#4A8DAF] dark:text-[#9FD0E6]" />
                      <span>Timeline & Scope</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#4A8DAF] dark:text-[#9FD0E6]">
                      {result.timeAndScope.score}/100
                    </span>
                  </div>
                  <p className="text-[11px] text-[#858982] dark:text-[#9DA39B] leading-relaxed">
                    {result.timeAndScope.verdict}
                  </p>
                </div>
              </div>

              {/* Scope Trimming & Adding Recommendations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-2xl bg-[#F9EDF0] dark:bg-[#332226] border border-[#E0AEB8]/40 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#BD6C7B] dark:text-[#EBC3CC]">
                    <Scissors className="w-4 h-4" />
                    <span>Features to Trim (Scope Bloat)</span>
                  </div>
                  <ul className="text-xs text-[#292D2B] dark:text-white space-y-1 list-disc list-inside">
                    {result.timeAndScope.featuresToTrim.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#EEF5EF] dark:bg-[#202E24] border border-[#96BD9D]/40 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#55825D] dark:text-[#A8C9AE]">
                    <PlusCircle className="w-4 h-4" />
                    <span>Features to Add (For Honors)</span>
                  </div>
                  <ul className="text-xs text-[#292D2B] dark:text-white space-y-1 list-disc list-inside">
                    {result.timeAndScope.featuresToAdd.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tough Supervisor Defense Questions in Muted Mustard */}
              <div className="p-4 rounded-2xl bg-[#FAF4E4] dark:bg-[#332C1A] border border-[#E9C76A]/40 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#B88C22] dark:text-[#E9C76A]">
                  <ShieldAlert className="w-4 h-4" />
                  <span>3 Tough Questions Supervisors Will Ask in Proposal Defense</span>
                </div>
                <div className="space-y-1.5 pt-1">
                  {result.supervisorDefenseQuestions.map((q, i) => (
                    <div key={i} className="text-xs text-[#292D2B] dark:text-white flex items-start gap-2">
                      <span className="font-bold text-[#B88C22] dark:text-[#E9C76A] shrink-0">{i + 1}.</span>
                      <span>"{q}"</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
