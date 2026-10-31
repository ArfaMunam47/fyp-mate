import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Award, 
  Bot, 
  ListTodo, 
  Sparkles, 
  Calendar, 
  Layers, 
  ChevronRight,
  Scale
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { project, profile, completedChapters, setActiveTab, updateTask } = useApp();

  const totalMilestones = project.milestones.length;
  const completedMilestones = project.milestones.filter(m => m.completed).length;
  const milestoneProgress = Math.round((completedMilestones / totalMilestones) * 100) || 0;

  const totalTasks = project.tasks.length;
  const doneTasks = project.tasks.filter(t => t.status === 'done').length;
  const inProgressTasks = project.tasks.filter(t => t.status === 'in_progress').length;

  const nextMilestone = project.milestones.find(m => !m.completed) || project.milestones[project.milestones.length - 1];
  const readyDocs = project.documents.filter(d => d.isReadyForSupervisor).length;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Incomplete profile setup reminder banner */}
      {!profile.university && (
        <div className="p-4 rounded-2xl bg-[#EEF5EF] dark:bg-[#202E24] border border-[#8DBA98]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white dark:bg-[#272C29] text-[#527D5D] dark:text-[#8DBA98] flex items-center justify-center shrink-0 border border-[#8DBA98]/30">
              <GraduationCap className="w-4 h-4" strokeWidth={2.2} />
            </div>
            <div>
              <span className="font-bold text-[#292D2B] dark:text-white block">
                Complete your student academic profile
              </span>
              <span className="text-[#6B7269] dark:text-[#9DA39B]">
                Specify your university and degree to auto-fill IEEE document headers and viva panel evaluations.
              </span>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('workspace')}
            className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#527D5D] hover:bg-[#43674D] rounded-xl shrink-0 cursor-pointer"
          >
            Go to Workspace
          </button>
        </div>
      )}

      {/* Hero Welcome Banner (Clean pastel card) */}
      <div className="relative overflow-hidden rounded-3xl border border-[#292D2B]/8 dark:border-white/8 bg-white dark:bg-[#202422] shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="p-6 md:p-8 lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#527D5D] dark:text-[#8DBA98] mb-2">
                <span>{profile.name ? `Welcome back, ${profile.name}` : 'Welcome to FYP Mate'}</span>
                {profile.degree && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#6B7269] dark:text-[#9DA39B]">{profile.degree}</span>
                  </>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#292D2B] dark:text-white tracking-tight text-balance leading-tight">
                Your Final Year Project, Organized & Simplified.
              </h1>
              <p className="mt-2.5 text-xs md:text-sm text-[#6B7269] dark:text-[#9DA39B] leading-relaxed max-w-xl">
                Currently tracking <span className="font-semibold text-[#292D2B] dark:text-white">"{project.title}"</span> in phase <span className="font-semibold text-[#527D5D] dark:text-[#8DBA98]">{project.currentPhase}</span>. Maintain your IEEE documentation, sprint tasks, and defense readiness synchronized.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => setActiveTab('workspace')}
                className="px-4 py-2 text-xs font-bold text-white bg-[#527D5D] hover:bg-[#43674D] dark:bg-[#8DBA98] dark:text-[#171A18] dark:hover:bg-[#7ba886] rounded-xl shadow-xs transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer"
              >
                <span>Open Project Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.2} />
              </button>
              <button
                onClick={() => setActiveTab('documentation')}
                className="px-4 py-2 text-xs font-semibold text-[#292D2B] dark:text-white bg-[#FAF9F5] hover:bg-[#EEF5EF] dark:bg-[#272C29] dark:hover:bg-[#202E24] border border-[#292D2B]/8 dark:border-white/8 rounded-xl transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-[#3E7796] dark:text-[#A9D4E8]" strokeWidth={2} />
                <span>Resume Documentation</span>
              </button>
              <button
                onClick={() => setActiveTab('defense')}
                className="px-4 py-2 text-xs font-semibold text-[#292D2B] dark:text-white bg-[#FAF9F5] hover:bg-[#FAF4E4] dark:bg-[#272C29] dark:hover:bg-[#332C1A] border border-[#292D2B]/8 dark:border-white/8 rounded-xl transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer"
              >
                <Award className="w-3.5 h-3.5 text-[#946E1E] dark:text-[#E9C76A]" strokeWidth={2} />
                <span>Practice Viva Voce</span>
              </button>
            </div>
          </div>

          <div className="relative lg:col-span-5 h-52 lg:h-auto min-h-[220px] bg-[#FAF9F5] dark:bg-[#272C29]">
            <img 
              src="/src/assets/images/fyp_platform_hero_1793475035408.jpg" 
              alt="FYP Software Engineering Workspace"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#292D2B]/50 via-transparent to-transparent lg:hidden" />
          </div>
        </div>
      </div>

      {/* 4 Pastel Accent KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Card 1: Milestones (Sage Green) */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#858982] dark:text-[#9DA39B]">
            <span className="text-xs font-medium">Milestones</span>
            <div className="w-6 h-6 rounded-lg bg-[#EEF5EF] dark:bg-[#202E24] text-[#55825D] dark:text-[#A8C9AE] flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5 pt-1">
            <span className="text-2xl font-bold font-mono text-[#292D2B] dark:text-white">
              {milestoneProgress}%
            </span>
            <span className="text-[11px] text-[#858982]">
              ({completedMilestones}/{totalMilestones})
            </span>
          </div>
          <div className="w-full bg-black/5 dark:bg-white/10 rounded-full h-1.5 mt-2 overflow-hidden">
            <div className="bg-[#96BD9D] dark:bg-[#A8C9AE] h-1.5 rounded-full" style={{ width: `${milestoneProgress}%` }} />
          </div>
        </div>

        {/* Card 2: Tasks (Mustard Yellow) */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#858982] dark:text-[#9DA39B]">
            <span className="text-xs font-medium">Sprint Tasks</span>
            <div className="w-6 h-6 rounded-lg bg-[#FAF4E4] dark:bg-[#332C1A] text-[#B88C22] dark:text-[#E9C76A] flex items-center justify-center">
              <ListTodo className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5 pt-1">
            <span className="text-2xl font-bold font-mono text-[#292D2B] dark:text-white">
              {doneTasks}/{totalTasks}
            </span>
            <span className="text-[11px] text-[#B88C22] dark:text-[#E9C76A]">
              ({inProgressTasks} active)
            </span>
          </div>
          <p className="text-[11px] text-[#858982] dark:text-[#9DA39B] truncate pt-0.5">
            Sprint board up to date
          </p>
        </div>

        {/* Card 3: Docs (Soft Sky Blue) */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#858982] dark:text-[#9DA39B]">
            <span className="text-xs font-medium">Supervisor Docs</span>
            <div className="w-6 h-6 rounded-lg bg-[#EDF6FA] dark:bg-[#1C2C35] text-[#4A8DAF] dark:text-[#9FD0E6] flex items-center justify-center">
              <FileText className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5 pt-1">
            <span className="text-2xl font-bold font-mono text-[#292D2B] dark:text-white">
              {readyDocs}/{project.documents.length}
            </span>
            <span className="text-[11px] text-[#858982]">
              reviewed
            </span>
          </div>
          <p className="text-[11px] text-[#858982] dark:text-[#9DA39B] truncate pt-0.5">
            IEEE 830 compliant
          </p>
        </div>

        {/* Card 4: Academy (Soft Pastel Pink) */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#858982] dark:text-[#9DA39B]">
            <span className="text-xs font-medium">FYP Academy</span>
            <div className="w-6 h-6 rounded-lg bg-[#F9EDF0] dark:bg-[#332226] text-[#BD6C7B] dark:text-[#EBC3CC] flex items-center justify-center">
              <GraduationCap className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5 pt-1">
            <span className="text-2xl font-bold font-mono text-[#292D2B] dark:text-white">
              {completedChapters.length}/12
            </span>
            <span className="text-[11px] text-[#858982]">
              chapters
            </span>
          </div>
          <p className="text-[11px] text-[#858982] dark:text-[#9DA39B] truncate pt-0.5">
            Full process guide
          </p>
        </div>
      </div>

      {/* 2-Column Split: Next Milestone & Sprint Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Milestone Spotlight & Tasks */}
        <div className="lg:col-span-2 space-y-6">
          {/* Milestone Spotlight Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#55825D] dark:text-[#A8C9AE]">
                  Upcoming Academic Milestone
                </span>
                <span className="text-xs text-[#858982]/60">·</span>
                <span className="text-xs text-[#858982] dark:text-[#9DA39B]">{nextMilestone?.phase}</span>
              </div>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#FAF4E4] dark:bg-[#332C1A] text-[#B88C22] dark:text-[#E9C76A] border border-[#E9C76A]/40 font-semibold">
                Target: {nextMilestone?.targetDate}
              </span>
            </div>

            <h3 className="text-lg font-bold text-[#292D2B] dark:text-white">
              {nextMilestone?.title}
            </h3>
            <p className="text-xs text-[#858982] dark:text-[#9DA39B] leading-relaxed">
              Required Deliverable: <span className="font-semibold text-[#292D2B] dark:text-white">{nextMilestone?.deliverable}</span>
            </p>

            <div className="pt-3 border-t border-[#292D2B]/6 dark:border-white/6 flex items-center justify-between">
              <span className="text-[11px] text-[#858982]">
                Action required: Update SRS behavioral use cases and review ER diagram with supervisor.
              </span>
              <button
                onClick={() => setActiveTab('workspace')}
                className="text-xs font-bold text-[#55825D] dark:text-[#A8C9AE] hover:underline flex items-center gap-1 shrink-0"
              >
                <span>View Timeline</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Active Tasks Queue */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#292D2B] dark:text-white">
                  Sprint Tasks in Progress
                </h3>
                <p className="text-xs text-[#858982]">
                  Active engineering items assigned to team members
                </p>
              </div>
              <button
                onClick={() => setActiveTab('workspace')}
                className="text-xs font-bold text-[#55825D] dark:text-[#A8C9AE] hover:underline"
              >
                Open Kanban Board
              </button>
            </div>

            <div className="divide-y divide-[#292D2B]/6 dark:border-white/6">
              {project.tasks.slice(0, 4).map((task) => (
                <div key={task.id} className="py-3 flex items-start justify-between gap-3 group">
                  <div className="flex items-start gap-3 min-w-0">
                    <button
                      onClick={() =>
                        updateTask(task.id, {
                          status: task.status === 'done' ? 'todo' : 'done',
                        })
                      }
                      className="mt-0.5 text-[#858982] hover:text-[#55825D] transition-colors shrink-0"
                      title={task.status === 'done' ? 'Mark as incomplete' : 'Mark as done'}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 ${
                          task.status === 'done'
                            ? 'text-[#55825D] fill-[#EEF5EF] dark:fill-[#202E24]'
                            : ''
                        }`}
                      />
                    </button>
                    <div className="min-w-0">
                      <p
                        className={`text-xs font-semibold text-[#292D2B] dark:text-white truncate ${
                          task.status === 'done' ? 'line-through text-[#858982]' : ''
                        }`}
                      >
                        {task.title}
                      </p>
                      <div className="mt-0.5 flex items-center gap-2 text-[11px] text-[#858982]">
                        <span>{task.assignee}</span>
                        <span>·</span>
                        <span>Due {task.dueDate}</span>
                        <span>·</span>
                        <span className="capitalize">{task.priority} Priority</span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-md shrink-0 ${
                      task.status === 'done'
                        ? 'bg-[#EEF5EF] text-[#55825D] dark:bg-[#202E24] dark:text-[#A8C9AE]'
                        : task.status === 'in_progress'
                        ? 'bg-[#EDF6FA] text-[#4A8DAF] dark:bg-[#1C2C35] dark:text-[#9FD0E6]'
                        : task.status === 'review'
                        ? 'bg-[#FAF4E4] text-[#B88C22] dark:bg-[#332C1A] dark:text-[#E9C76A]'
                        : 'bg-black/5 text-[#858982] dark:bg-white/10 dark:text-[#9DA39B]'
                    }`}
                  >
                    {task.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Rail: Quick Launchpad & Supervisor Checklist */}
        <div className="space-y-6">
          {/* Quick Academic Toolkit Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#858982]">
              Academic Toolkit
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('mentor')}
                className="w-full p-2.5 text-left rounded-2xl border border-[#292D2B]/8 dark:border-white/8 hover:border-[#96BD9D] hover:bg-[#EEF5EF]/50 dark:hover:bg-[#202E24]/30 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-[#EEF5EF] dark:bg-[#202E24] text-[#55825D] dark:text-[#A8C9AE] flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#292D2B] dark:text-white group-hover:text-[#55825D] dark:group-hover:text-[#A8C9AE] transition-colors">
                      AI Project Mentor
                    </p>
                    <p className="text-[11px] text-[#858982]">
                      Context-aware guidance for your stack
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#858982] group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => setActiveTab('defense')}
                className="w-full p-2.5 text-left rounded-2xl border border-[#292D2B]/8 dark:border-white/8 hover:border-[#E0AEB8] hover:bg-[#F9EDF0]/50 dark:hover:bg-[#332226]/30 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-[#F9EDF0] dark:bg-[#332226] text-[#BD6C7B] dark:text-[#EBC3CC] flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#292D2B] dark:text-white group-hover:text-[#BD6C7B] dark:group-hover:text-[#EBC3CC] transition-colors">
                      Viva Voce Simulator
                    </p>
                    <p className="text-[11px] text-[#858982]">
                      Mock defense against AI examiners
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#858982] group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => setActiveTab('feasibility')}
                className="w-full p-2.5 text-left rounded-2xl border border-[#292D2B]/8 dark:border-white/8 hover:border-[#E2BC57] hover:bg-[#FAF4E4]/50 dark:hover:bg-[#332C1A]/30 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-[#FAF4E4] dark:bg-[#332C1A] text-[#B88C22] dark:text-[#E9C76A] flex items-center justify-center">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#292D2B] dark:text-white group-hover:text-[#B88C22] dark:group-hover:text-[#E9C76A] transition-colors">
                      Feasibility Doctor
                    </p>
                    <p className="text-[11px] text-[#858982]">
                      Scope sanity check & risk report
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#858982] group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => setActiveTab('presentation')}
                className="w-full p-2.5 text-left rounded-2xl border border-[#292D2B]/8 dark:border-white/8 hover:border-[#8EC4DC] hover:bg-[#EDF6FA]/50 dark:hover:bg-[#1C2C35]/30 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-[#EDF6FA] dark:bg-[#1C2C35] text-[#4A8DAF] dark:text-[#9FD0E6] flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#292D2B] dark:text-white group-hover:text-[#4A8DAF] dark:group-hover:text-[#9FD0E6] transition-colors">
                      Defense Slide Deck
                    </p>
                    <p className="text-[11px] text-[#858982]">
                      12-slide standard defense template
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#858982] group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Supervisor Checklist Card */}
          <div className="p-6 rounded-3xl bg-[#FAF9F5] dark:bg-[#272C29] border border-[#292D2B]/8 dark:border-white/8 space-y-3">
            <div className="flex items-center gap-2 text-[#292D2B] dark:text-white font-bold text-xs uppercase tracking-wider">
              <Calendar className="w-4 h-4 text-[#55825D] dark:text-[#A8C9AE]" />
              <span>Supervisor Meeting Checklist</span>
            </div>
            <ul className="text-xs text-[#858982] dark:text-[#9DA39B] space-y-2 list-disc list-inside">
              <li>Finalize Chapter 3 (SRS) with testable functional requirements.</li>
              <li>Present Crow's Foot ERD with primary/foreign keys.</li>
              <li>Demonstrate localized offline FHIR token retrieval.</li>
            </ul>
            <div className="pt-2">
              <button
                onClick={() => setActiveTab('academy')}
                className="w-full py-2 text-xs font-semibold text-center rounded-xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 text-[#292D2B] dark:text-white hover:bg-[#EEF5EF] dark:hover:bg-[#202E24] transition-colors"
              >
                Review SRS Chapter in Academy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
