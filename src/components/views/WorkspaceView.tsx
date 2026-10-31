import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Task, TaskStatus, TaskPriority, ProjectNote } from '../../types';
import { 
  Plus, 
  CheckCircle2, 
  Circle, 
  Trash2, 
  Users, 
  X
} from 'lucide-react';

const COLUMNS: { id: TaskStatus; label: string; dotColor: string; bgTone: string }[] = [
  { id: 'backlog', label: 'Backlog', dotColor: 'bg-[#858982]', bgTone: 'bg-[#FAF9F5] dark:bg-[#272C29]' },
  { id: 'todo', label: 'To Do', dotColor: 'bg-[#8EC4DC]', bgTone: 'bg-[#EDF6FA]/70 dark:bg-[#1C2C35]/50' },
  { id: 'in_progress', label: 'In Dev', dotColor: 'bg-[#E2BC57]', bgTone: 'bg-[#FAF4E4]/70 dark:bg-[#332C1A]/50' },
  { id: 'review', label: 'Review', dotColor: 'bg-[#E0AEB8]', bgTone: 'bg-[#F9EDF0]/70 dark:bg-[#332226]/50' },
  { id: 'done', label: 'Done', dotColor: 'bg-[#96BD9D]', bgTone: 'bg-[#EEF5EF]/70 dark:bg-[#202E24]/50' },
];

export const WorkspaceView: React.FC = () => {
  const { 
    project, 
    addTask, 
    updateTask, 
    deleteTask, 
    toggleMilestone, 
    addNote, 
    deleteNote 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'board' | 'milestones' | 'notes'>('board');
  const [filterAssignee, setFilterAssignee] = useState<string>('All');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  // New Task State
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState(project.teamMembers[0]?.name || 'Me');
  const [newTaskPriority, setNewTaskPriority] = useState<TaskPriority>('medium');
  const [newTaskStatus, setNewTaskStatus] = useState<TaskStatus>('todo');
  const [newTaskDueDate, setNewTaskDueDate] = useState('2026-11-30');
  const [newTaskModule, setNewTaskModule] = useState('Core Architecture');

  // New Note State
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteCategory, setNewNoteCategory] = useState<ProjectNote['category']>('Supervisor Meeting');
  const [newNoteContent, setNewNoteContent] = useState('');

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    addTask({
      title: newTaskTitle,
      description: newTaskDesc,
      assignee: newTaskAssignee,
      priority: newTaskPriority,
      status: newTaskStatus,
      dueDate: newTaskDueDate,
      tags: [newTaskModule, newTaskPriority],
      moduleName: newTaskModule,
    });

    setNewTaskTitle('');
    setNewTaskDesc('');
    setIsTaskModalOpen(false);
  };

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim()) return;

    addNote({
      title: newNoteTitle,
      category: newNoteCategory,
      content: newNoteContent,
    });

    setNewNoteTitle('');
    setNewNoteContent('');
    setIsNoteModalOpen(false);
  };

  const assignees = ['All', ...Array.from(new Set(project.teamMembers.map(m => m.name)))];

  const filteredTasks = filterAssignee === 'All' 
    ? project.tasks 
    : project.tasks.filter(t => t.assignee === filterAssignee);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Workspace Header & Project Summary Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#55825D] dark:text-[#A8C9AE] mb-1">
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <span>{project.difficulty} Level</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-[#858982]">{project.currentPhase}</span>
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-[#292D2B] dark:text-white tracking-tight">
              {project.title}
            </h1>
            <p className="mt-1 text-xs text-[#858982] dark:text-[#9DA39B] max-w-3xl leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Team Members List */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex -space-x-2">
              {project.teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-[#202422] bg-[#EEF5EF] dark:bg-[#202E24] text-[#55825D] dark:text-[#A8C9AE] text-xs font-bold flex items-center justify-center shadow-xs"
                  title={`${member.name} (${member.role})`}
                >
                  {member.name.charAt(0)}
                </div>
              ))}
            </div>
            <div className="text-left text-xs">
              <span className="font-bold block text-[#292D2B] dark:text-white">
                {project.teamMembers.length} Team Members
              </span>
              <span className="text-[11px] text-[#858982]">Collaborative Workspace</span>
            </div>
          </div>
        </div>

        {/* Tech Stack Pills & Navigation Tabs */}
        <div className="pt-3 border-t border-[#292D2B]/6 dark:border-white/6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 text-[11px] font-mono rounded-lg bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white border border-[#292D2B]/6 dark:border-white/6"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1 p-1 bg-[#FAF9F5] dark:bg-[#272C29] rounded-2xl border border-[#292D2B]/5 dark:border-white/5">
            <button
              onClick={() => setActiveTab('board')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'board'
                  ? 'bg-white dark:bg-[#202422] text-[#292D2B] dark:text-white shadow-xs'
                  : 'text-[#858982] dark:text-[#9DA39B] hover:text-[#292D2B]'
              }`}
            >
              Sprint Board ({project.tasks.length})
            </button>
            <button
              onClick={() => setActiveTab('milestones')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'milestones'
                  ? 'bg-white dark:bg-[#202422] text-[#292D2B] dark:text-white shadow-xs'
                  : 'text-[#858982] dark:text-[#9DA39B] hover:text-[#292D2B]'
              }`}
            >
              Milestones ({project.milestones.filter(m => m.completed).length}/{project.milestones.length})
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'notes'
                  ? 'bg-white dark:bg-[#202422] text-[#292D2B] dark:text-white shadow-xs'
                  : 'text-[#858982] dark:text-[#9DA39B] hover:text-[#292D2B]'
              }`}
            >
              Meeting Notes ({project.notes.length})
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: SPRINT KANBAN BOARD */}
      {activeTab === 'board' && (
        <div className="space-y-4">
          {/* Board Controls */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#858982]">Filter Assignee:</span>
              <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
                {assignees.map((a) => (
                  <button
                    key={a}
                    onClick={() => setFilterAssignee(a)}
                    className={`px-2.5 py-1 text-xs rounded-xl font-medium transition-colors ${
                      filterAssignee === a
                        ? 'bg-[#292D2B] dark:bg-white text-white dark:text-[#292D2B] font-bold shadow-xs'
                        : 'bg-[#FAF9F5] dark:bg-[#272C29] text-[#858982] hover:text-[#292D2B]'
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsTaskModalOpen(true)}
              className="px-3.5 py-1.5 text-xs font-bold text-white dark:text-[#171A18] bg-[#96BD9D] hover:bg-[#83AA8A] dark:bg-[#A8C9AE] rounded-xl flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Task</span>
            </button>
          </div>

          {/* Kanban Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 items-start">
            {COLUMNS.map((col) => {
              const tasksInCol = filteredTasks.filter((t) => t.status === col.id);

              return (
                <div
                  key={col.id}
                  className={`rounded-3xl border border-[#292D2B]/8 dark:border-white/8 p-3 min-h-[480px] flex flex-col ${col.bgTone}`}
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between mb-3 px-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${col.dotColor}`} />
                      <span className="text-xs font-bold text-[#292D2B] dark:text-white">
                        {col.label}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-[#858982] px-1.5 py-0.2 bg-white dark:bg-[#202422] rounded-md shadow-2xs">
                      {tasksInCol.length}
                    </span>
                  </div>

                  {/* Tasks List in Column */}
                  <div className="space-y-2.5 flex-1">
                    {tasksInCol.map((task) => (
                      <div
                        key={task.id}
                        className="p-3.5 rounded-2xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 shadow-xs hover:border-[#96BD9D]/60 transition-all space-y-2 group"
                      >
                        <div className="flex items-start justify-between gap-1">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md capitalize ${
                            task.priority === 'critical'
                              ? 'bg-[#F9EDF0] text-[#BD6C7B] dark:bg-[#332226] dark:text-[#EBC3CC]'
                              : task.priority === 'high'
                              ? 'bg-[#FAF4E4] text-[#B88C22] dark:bg-[#332C1A] dark:text-[#E9C76A]'
                              : 'bg-black/5 text-[#858982] dark:bg-white/10 dark:text-[#9DA39B]'
                          }`}>
                            {task.priority}
                          </span>

                          <button
                            onClick={() => deleteTask(task.id)}
                            className="opacity-0 group-hover:opacity-100 text-[#858982] hover:text-rose-600 p-0.5 transition-opacity"
                            title="Delete task"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <h4 className="text-xs font-bold text-[#292D2B] dark:text-white leading-snug">
                          {task.title}
                        </h4>

                        {task.description && (
                          <p className="text-[11px] text-[#858982] dark:text-[#9DA39B] line-clamp-2 leading-relaxed">
                            {task.description}
                          </p>
                        )}

                        <div className="pt-2 border-t border-[#292D2B]/6 dark:border-white/6 flex items-center justify-between text-[10px] text-[#858982]">
                          <span className="font-semibold text-[#292D2B] dark:text-white truncate max-w-[90px]">
                            {task.assignee}
                          </span>

                          {/* Quick Move Selector */}
                          <select
                            value={task.status}
                            onChange={(e) => updateTask(task.id, { status: e.target.value as TaskStatus })}
                            className="text-[10px] bg-[#FAF9F5] dark:bg-[#272C29] border border-[#292D2B]/10 dark:border-white/10 rounded-lg px-1.5 py-0.5 text-[#292D2B] dark:text-white focus:outline-hidden"
                          >
                            <option value="backlog">Backlog</option>
                            <option value="todo">To Do</option>
                            <option value="in_progress">In Dev</option>
                            <option value="review">Review</option>
                            <option value="done">Done</option>
                          </select>
                        </div>
                      </div>
                    ))}

                    {tasksInCol.length === 0 && (
                      <div className="h-24 border border-dashed border-[#292D2B]/10 dark:border-white/10 rounded-2xl flex items-center justify-center text-[11px] text-[#858982]">
                        No tasks
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: MILESTONES ROADMAP */}
      {activeTab === 'milestones' && (
        <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 shadow-xs space-y-4">
          <div className="border-b border-[#292D2B]/6 dark:border-white/6 pb-3">
            <h3 className="text-sm font-bold text-[#292D2B] dark:text-white">
              Two-Semester Graduation Milestones
            </h3>
            <p className="text-xs text-[#858982]">
              Deliverables required by your university evaluation board
            </p>
          </div>

          <div className="space-y-3">
            {project.milestones.map((ms, index) => (
              <div
                key={ms.id}
                onClick={() => toggleMilestone(ms.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                  ms.completed
                    ? 'bg-[#EEF5EF] dark:bg-[#202E24] border-[#96BD9D]/40'
                    : 'bg-[#FAF9F5] dark:bg-[#272C29] border-[#292D2B]/8 dark:border-white/8 hover:border-[#96BD9D]/40'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {ms.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-[#55825D] fill-[#EEF5EF] dark:fill-[#202E24]" />
                  ) : (
                    <Circle className="w-5 h-5 text-[#858982]/40" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-xs text-[#858982] mb-1">
                    <span className="font-bold text-[#55825D] dark:text-[#A8C9AE]">{ms.phase}</span>
                    <span className="font-mono">Deadline: {ms.targetDate}</span>
                  </div>
                  <h4 className={`text-sm font-bold ${
                    ms.completed 
                      ? 'text-[#858982] line-through' 
                      : 'text-[#292D2B] dark:text-white'
                  }`}>
                    {index + 1}. {ms.title}
                  </h4>
                  <p className="mt-1 text-xs text-[#858982] dark:text-[#9DA39B]">
                    Mandatory Deliverable: <span className="font-semibold text-[#292D2B] dark:text-white">{ms.deliverable}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: NOTES */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#292D2B] dark:text-white">
                Supervisor Meetings & Research Notes
              </h3>
              <p className="text-xs text-[#858982]">
                Record weekly supervisor advice, key citations, and architectural decisions
              </p>
            </div>
            <button
              onClick={() => setIsNoteModalOpen(true)}
              className="px-3.5 py-1.5 text-xs font-bold text-white dark:text-[#171A18] bg-[#96BD9D] hover:bg-[#83AA8A] dark:bg-[#A8C9AE] rounded-xl flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Note</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.notes.map((note) => (
              <div
                key={note.id}
                className="p-5 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 shadow-xs space-y-3 relative group"
              >
                <div className="flex items-center justify-between text-xs text-[#858982]">
                  <span className="font-bold text-[#55825D] dark:text-[#A8C9AE]">
                    {note.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span>{note.updatedAt}</span>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="opacity-0 group-hover:opacity-100 text-[#858982] hover:text-rose-600 transition-opacity"
                      title="Delete note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h4 className="text-sm font-bold text-[#292D2B] dark:text-white">
                  {note.title}
                </h4>

                <p className="text-xs text-[#292D2B] dark:text-white leading-relaxed whitespace-pre-line bg-[#FAF9F5] dark:bg-[#272C29] p-3.5 rounded-2xl border border-[#292D2B]/6 dark:border-white/6">
                  {note.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Task Creation Modal */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#292D2B]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#202422] rounded-3xl border border-[#292D2B]/8 dark:border-white/8 shadow-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#292D2B] dark:text-white">
                Create New Engineering Task
              </h3>
              <button onClick={() => setIsTaskModalOpen(false)}>
                <X className="w-4 h-4 text-[#858982]" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#292D2B] dark:text-white mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Implement JWT refresh token rotation"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#292D2B]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white focus:ring-2 focus:ring-[#96BD9D]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#292D2B] dark:text-white mb-1">
                  Description & Criteria
                </label>
                <textarea
                  rows={2}
                  placeholder="What must be verified?"
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#292D2B]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white focus:ring-2 focus:ring-[#96BD9D]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#292D2B] dark:text-white mb-1">
                    Assignee
                  </label>
                  <select
                    value={newTaskAssignee}
                    onChange={(e) => setNewTaskAssignee(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#292D2B]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white"
                  >
                    {project.teamMembers.map((m) => (
                      <option key={m.id} value={m.name}>{m.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#292D2B] dark:text-white mb-1">
                    Priority
                  </label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value as TaskPriority)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#292D2B]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#292D2B] dark:text-white mb-1">
                    Initial Status
                  </label>
                  <select
                    value={newTaskStatus}
                    onChange={(e) => setNewTaskStatus(e.target.value as TaskStatus)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#292D2B]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white"
                  >
                    <option value="backlog">Backlog</option>
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#292D2B] dark:text-white mb-1">
                    Target Due Date
                  </label>
                  <input
                    type="date"
                    value={newTaskDueDate}
                    onChange={(e) => setNewTaskDueDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#292D2B]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[#292D2B]/6 dark:border-white/6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsTaskModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-[#858982] hover:text-[#292D2B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white dark:text-[#171A18] bg-[#96BD9D] hover:bg-[#83AA8A] dark:bg-[#A8C9AE] rounded-xl shadow-xs"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Note Creation Modal */}
      {isNoteModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#292D2B]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#202422] rounded-3xl border border-[#292D2B]/8 dark:border-white/8 shadow-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#292D2B] dark:text-white">
                Add Project or Supervisor Note
              </h3>
              <button onClick={() => setIsNoteModalOpen(false)}>
                <X className="w-4 h-4 text-[#858982]" />
              </button>
            </div>

            <form onSubmit={handleCreateNote} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#292D2B] dark:text-white mb-1">
                  Note Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Supervisor Meeting - Chapter 4 Feedback"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#292D2B]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white focus:ring-2 focus:ring-[#96BD9D]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#292D2B] dark:text-white mb-1">
                  Category
                </label>
                <select
                  value={newNoteCategory}
                  onChange={(e) => setNewNoteCategory(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#292D2B]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white"
                >
                  <option value="Supervisor Meeting">Supervisor Meeting</option>
                  <option value="Literature Review">Literature Review</option>
                  <option value="Architecture Decision">Architecture Decision</option>
                  <option value="Viva Notes">Viva Notes</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#292D2B] dark:text-white mb-1">
                  Note Content
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Key takeaways, action items, or literature quotes..."
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#292D2B]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white focus:ring-2 focus:ring-[#96BD9D]"
                />
              </div>

              <div className="pt-3 border-t border-[#292D2B]/6 dark:border-white/6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNoteModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-[#858982] hover:text-[#292D2B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white dark:text-[#171A18] bg-[#96BD9D] hover:bg-[#83AA8A] dark:bg-[#A8C9AE] rounded-xl shadow-xs"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
