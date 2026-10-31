import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  GraduationCap, 
  Lightbulb, 
  KanbanSquare, 
  FileText, 
  Bot, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  Clock, 
  BookOpen, 
  FileCheck2, 
  Code2, 
  Layers,
  HelpCircle,
  Presentation,
  Check
} from 'lucide-react';

interface LandingViewProps {
  onOpenSignIn: () => void;
  onOpenSignUp: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onOpenSignIn, onOpenSignUp }) => {
  const { isDarkMode, toggleDarkMode } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F6F0] dark:bg-[#171A18] text-[#292D2B] dark:text-[#F2F1ED] font-sans transition-colors selection:bg-[#8DBA98] selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          A. Navigation Bar
          ───────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#F7F6F0]/90 dark:bg-[#171A18]/90 backdrop-blur-md border-b border-[#292D2B]/8 dark:border-white/8 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
          {/* Logo & Brand Wordmark */}
          <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }} className="flex items-center gap-2.5 text-left group">
            <div className="w-8 h-8 rounded-xl bg-[#527D5D] dark:bg-[#8DBA98] flex items-center justify-center text-white dark:text-[#171A18] font-bold text-sm shadow-xs transition-transform group-hover:scale-105">
              F
            </div>
            <span className="text-lg font-bold tracking-tight text-[#292D2B] dark:text-white whitespace-nowrap">
              FYP Mate
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-[#6B7269] dark:text-[#9DA39B]">
            <button 
              onClick={() => scrollToSection('hero')} 
              className="hover:text-[#292D2B] dark:hover:text-white transition-colors cursor-pointer py-1"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="hover:text-[#292D2B] dark:hover:text-white transition-colors cursor-pointer py-1"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('features')} 
              className="hover:text-[#292D2B] dark:hover:text-white transition-colors cursor-pointer py-1"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')} 
              className="hover:text-[#292D2B] dark:hover:text-white transition-colors cursor-pointer py-1"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('audience')} 
              className="hover:text-[#292D2B] dark:hover:text-white transition-colors cursor-pointer py-1"
            >
              Who It's For
            </button>
          </nav>

          {/* Actions: Theme Toggle, Sign In, Get Started */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 text-[#6B7269] hover:text-[#292D2B] dark:hover:text-white rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4" strokeWidth={2.2} /> : <Moon className="w-4 h-4" strokeWidth={2.2} />}
            </button>

            <button
              onClick={onOpenSignIn}
              className="px-4 py-2 text-xs font-bold text-[#292D2B] dark:text-white hover:text-[#527D5D] dark:hover:text-[#8DBA98] rounded-xl transition-colors whitespace-nowrap"
            >
              Sign In
            </button>

            <button
              onClick={onOpenSignUp}
              className="px-4 py-2 text-xs font-bold text-white bg-[#527D5D] hover:bg-[#43674D] dark:bg-[#8DBA98] dark:text-[#171A18] dark:hover:bg-[#7ba886] rounded-xl shadow-xs transition-all transform active:scale-95 whitespace-nowrap"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-[#6B7269] hover:text-[#292D2B] dark:hover:text-white"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#292D2B] dark:text-white rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-b border-[#292D2B]/8 dark:border-white/8 bg-[#F7F6F0] dark:bg-[#171A18] px-4 py-4 space-y-3">
            <nav className="flex flex-col gap-2.5 text-xs font-semibold text-[#6B7269] dark:text-[#9DA39B]">
              <button 
                onClick={() => scrollToSection('hero')} 
                className="text-left py-1.5 hover:text-[#292D2B] dark:hover:text-white"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-left py-1.5 hover:text-[#292D2B] dark:hover:text-white"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('features')} 
                className="text-left py-1.5 hover:text-[#292D2B] dark:hover:text-white"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')} 
                className="text-left py-1.5 hover:text-[#292D2B] dark:hover:text-white"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection('audience')} 
                className="text-left py-1.5 hover:text-[#292D2B] dark:hover:text-white"
              >
                Who It's For
              </button>
            </nav>

            <div className="pt-3 border-t border-[#292D2B]/8 dark:border-white/8 flex flex-col gap-2">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenSignIn(); }}
                className="w-full py-2.5 text-xs font-bold text-[#292D2B] dark:text-white bg-white dark:bg-[#202422] border border-[#292D2B]/10 dark:border-white/10 rounded-xl"
              >
                Sign In
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenSignUp(); }}
                className="w-full py-2.5 text-xs font-bold text-white bg-[#527D5D] dark:bg-[#8DBA98] dark:text-[#171A18] rounded-xl shadow-xs"
              >
                Get Started Free
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ─────────────────────────────────────────────────────────────
          B. Hero Section
          ───────────────────────────────────────────────────────────── */}
      <section id="hero" className="relative pt-12 md:pt-20 pb-16 md:pb-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-5">
            {/* Context Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#EEF5EF] text-[#527D5D] dark:bg-[#202E24] dark:text-[#8DBA98] border border-[#8DBA98]/30">
              <GraduationCap className="w-3.5 h-3.5" strokeWidth={2.2} />
              <span>The Open-Source Final Year Project Companion</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#292D2B] dark:text-white tracking-tight leading-[1.15] text-balance">
              Your Final Year Project Journey, Made Easier.
            </h1>

            {/* Supporting Description */}
            <p className="text-sm sm:text-base md:text-lg text-[#6B7269] dark:text-[#9DA39B] leading-relaxed max-w-2xl mx-auto">
              From finding the right project idea to preparing your documentation and defending your work, FYP Mate brings the guidance, tools, and organization you need into one place.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onOpenSignUp}
                className="w-full sm:w-auto px-7 py-3 text-sm font-bold text-white bg-[#527D5D] hover:bg-[#43674D] dark:bg-[#8DBA98] dark:text-[#171A18] dark:hover:bg-[#7ba886] rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
              </button>

              <button
                onClick={() => scrollToSection('features')}
                className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-[#292D2B] dark:text-white bg-white dark:bg-[#202422] border border-[#292D2B]/10 dark:border-white/10 hover:bg-[#FAF9F5] dark:hover:bg-[#272C29] rounded-2xl transition-colors cursor-pointer"
              >
                Explore Features
              </button>
            </div>

            {/* Trust highlights */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[#6B7269] dark:text-[#9DA39B]">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#527D5D] dark:text-[#8DBA98]" strokeWidth={2.5} />
                <span>Zero fabricated demo data</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#527D5D] dark:text-[#8DBA98]" strokeWidth={2.5} />
                <span>IEEE 830 compliant templates</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#527D5D] dark:text-[#8DBA98]" strokeWidth={2.5} />
                <span>Viva committee simulator</span>
              </span>
            </div>
          </div>

          {/* Genuine FYP Mate UI Preview Composition (Authentic Product Snapshot) */}
          <div className="mt-12 md:mt-16 relative">
            <div className="rounded-3xl border border-[#292D2B]/10 dark:border-white/10 bg-white dark:bg-[#202422] p-4 sm:p-6 shadow-xl space-y-4">
              {/* Fake Workspace Browser Chrome */}
              <div className="flex items-center justify-between pb-3 border-b border-[#292D2B]/6 dark:border-white/6 text-xs text-[#6B7269] dark:text-[#9DA39B]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#EBC3CC]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#E9C76A]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#8DBA98]" />
                  </div>
                  <span className="ml-2 font-mono text-[11px] text-[#292D2B] dark:text-white font-medium">
                    app.fypmate.org / workspace
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-[11px]">
                  <span className="px-2 py-0.5 rounded-md bg-[#EEF5EF] text-[#527D5D] dark:bg-[#202E24] dark:text-[#8DBA98] font-bold">
                    BS CS & SE Capstone Mode
                  </span>
                </div>
              </div>

              {/* Grid of Genuine Component Modules */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
                {/* Module 1: Academy Progress Card */}
                <div className="md:col-span-4 p-4 rounded-2xl bg-[#FAF9F5] dark:bg-[#272C29] border border-[#292D2B]/6 dark:border-white/6 space-y-2.5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-[#527D5D] dark:text-[#8DBA98] uppercase tracking-wider flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" strokeWidth={2.2} />
                        <span>FYP Academy</span>
                      </span>
                      <span className="text-[11px] font-mono text-[#6B7269]">Ch. 3 of 12</span>
                    </div>
                    <h4 className="text-xs font-bold text-[#292D2B] dark:text-white">
                      IEEE 830 SRS Specification & Functional Boundaries
                    </h4>
                    <p className="text-[11px] text-[#6B7269] dark:text-[#9DA39B] mt-1 leading-relaxed">
                      Mastering non-functional constraints, MoSCoW prioritization, and supervisor approval protocols.
                    </p>
                  </div>
                  <div>
                    <div className="w-full bg-black/5 dark:bg-white/10 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-[#527D5D] dark:bg-[#8DBA98] h-1.5 rounded-full w-[75%]" />
                    </div>
                    <div className="flex justify-between text-[10px] text-[#6B7269] mt-1 font-mono">
                      <span>Curriculum Status</span>
                      <span>75% Completed</span>
                    </div>
                  </div>
                </div>

                {/* Module 2: Documentation Studio Preview */}
                <div className="md:col-span-5 p-4 rounded-2xl bg-[#FAF9F5] dark:bg-[#272C29] border border-[#292D2B]/6 dark:border-white/6 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#3E7796] dark:text-[#A9D4E8] uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" strokeWidth={2.2} />
                      <span>Documentation Studio</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#EDF6FA] text-[#3E7796] dark:bg-[#1C2C35] dark:text-[#A9D4E8] font-mono font-semibold">
                      IEEE 830 Template
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#202422] border border-[#292D2B]/6 dark:border-white/6 font-mono text-[11px] text-[#292D2B] dark:text-white/90 space-y-1">
                    <p className="text-[#527D5D] dark:text-[#8DBA98] font-bold">## 2.3 User Classes & Characteristics</p>
                    <p className="text-[#6B7269] dark:text-[#9DA39B] text-[10px]">
                      FR-01: System shall authenticate paramedic triage vitals in under 300ms...
                    </p>
                    <p className="text-[#946E1E] dark:text-[#E9C76A] text-[10px]">
                      NFR-02: Zero-knowledge cryptographic audit trail for HIPAA compliance...
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-[#6B7269]">
                    <span>Real-time Markdown Editor</span>
                    <span className="text-[#527D5D] dark:text-[#8DBA98] font-semibold">One-Click PDF Ready</span>
                  </div>
                </div>

                {/* Module 3: Viva Simulator Rehearsal */}
                <div className="md:col-span-3 p-4 rounded-2xl bg-[#FAF9F5] dark:bg-[#272C29] border border-[#292D2B]/6 dark:border-white/6 space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold text-[#9E4B60] dark:text-[#EBC3CC] uppercase tracking-wider flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" strokeWidth={2.2} />
                        <span>Viva Defense</span>
                      </span>
                      <span className="text-[10px] font-mono text-[#527D5D] font-bold">92% Pass</span>
                    </div>
                    <div className="text-xs font-bold text-[#292D2B] dark:text-white">
                      Dr. Arthur Chen (Architect)
                    </div>
                    <p className="text-[11px] text-[#6B7269] dark:text-[#9DA39B] italic mt-1 bg-white dark:bg-[#202422] p-2 rounded-lg border border-[#292D2B]/6">
                      "Explain your database lock isolation level when high concurrency occurs..."
                    </p>
                  </div>
                  <div className="text-[10px] text-[#527D5D] dark:text-[#8DBA98] font-semibold">
                    Rubric Evaluation · 4 Examiner Personas
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          C. Problem & Purpose Section
          ───────────────────────────────────────────────────────────── */}
      <section id="about" className="py-16 md:py-24 border-t border-[#292D2B]/8 dark:border-white/8 bg-white dark:bg-[#202422] transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-bold text-[#527D5D] dark:text-[#8DBA98] uppercase tracking-wider">
              The Problem We Are Solving
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#292D2B] dark:text-white tracking-tight">
              Why Final Year Projects Feel Overwhelming
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[#6B7269] dark:text-[#9DA39B] leading-relaxed">
              Every academic year, thousands of Computer Science and Software Engineering students face their capstone project without structured guidance, wasting precious months searching across scattered resources.
            </p>
          </div>

          {/* 6 Core Challenges */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {/* 1 */}
            <div className="p-6 rounded-3xl bg-[#FAF9F5] dark:bg-[#272C29] border border-[#292D2B]/6 dark:border-white/6 space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#EEF5EF] dark:bg-[#202E24] text-[#527D5D] dark:text-[#8DBA98] flex items-center justify-center font-bold">
                <HelpCircle className="w-5 h-5" strokeWidth={2.2} />
              </div>
              <h3 className="text-sm font-bold text-[#292D2B] dark:text-white">
                Not Knowing Where to Begin
              </h3>
              <p className="text-xs text-[#6B7269] dark:text-[#9DA39B] leading-relaxed">
                The leap from standard classroom assignments to an open-ended year-long capstone is daunting. Students often don't know the proper phases or deliverables.
              </p>
            </div>

            {/* 2 */}
            <div className="p-6 rounded-3xl bg-[#FAF9F5] dark:bg-[#272C29] border border-[#292D2B]/6 dark:border-white/6 space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#FAF4E4] dark:bg-[#332C1A] text-[#946E1E] dark:text-[#E9C76A] flex items-center justify-center font-bold">
                <Lightbulb className="w-5 h-5" strokeWidth={2.2} />
              </div>
              <h3 className="text-sm font-bold text-[#292D2B] dark:text-white">
                Selecting Unachievable Ideas
              </h3>
              <p className="text-xs text-[#6B7269] dark:text-[#9DA39B] leading-relaxed">
                Students frequently choose projects that are either too trivial for committee sign-off or impractically massive to complete within two academic terms.
              </p>
            </div>

            {/* 3 */}
            <div className="p-6 rounded-3xl bg-[#FAF9F5] dark:bg-[#272C29] border border-[#292D2B]/6 dark:border-white/6 space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#EDF6FA] dark:bg-[#1C2C35] text-[#3E7796] dark:text-[#A9D4E8] flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" strokeWidth={2.2} />
              </div>
              <h3 className="text-sm font-bold text-[#292D2B] dark:text-white">
                Confusion Around IEEE Documentation
              </h3>
              <p className="text-xs text-[#6B7269] dark:text-[#9DA39B] leading-relaxed">
                Writing 50+ pages of formal IEEE 830 SRS, software design documents, ERD schemas, and test cases is rarely taught with practical, real-world examples.
              </p>
            </div>

            {/* 4 */}
            <div className="p-6 rounded-3xl bg-[#FAF9F5] dark:bg-[#272C29] border border-[#292D2B]/6 dark:border-white/6 space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#F9EDF0] dark:bg-[#332226] text-[#9E4B60] dark:text-[#EBC3CC] flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" strokeWidth={2.2} />
              </div>
              <h3 className="text-sm font-bold text-[#292D2B] dark:text-white">
                Scattered Development & Deadlines
              </h3>
              <p className="text-xs text-[#6B7269] dark:text-[#9DA39B] leading-relaxed">
                Sprint tasks, supervisor meeting notes, and Git repository milestones end up scattered across group chats and disparate notes apps, causing missed deadlines.
              </p>
            </div>

            {/* 5 */}
            <div className="p-6 rounded-3xl bg-[#FAF9F5] dark:bg-[#272C29] border border-[#292D2B]/6 dark:border-white/6 space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#EEF5EF] dark:bg-[#202E24] text-[#527D5D] dark:text-[#8DBA98] flex items-center justify-center font-bold">
                <Users className="w-5 h-5" strokeWidth={2.2} />
              </div>
              <h3 className="text-sm font-bold text-[#292D2B] dark:text-white">
                Limited Supervisor Availability
              </h3>
              <p className="text-xs text-[#6B7269] dark:text-[#9DA39B] leading-relaxed">
                Faculty supervisors guide dozens of capstone batches simultaneously, leaving students with sparse office hours when facing critical architecture decisions.
              </p>
            </div>

            {/* 6 */}
            <div className="p-6 rounded-3xl bg-[#FAF9F5] dark:bg-[#272C29] border border-[#292D2B]/6 dark:border-white/6 space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#FAF4E4] dark:bg-[#332C1A] text-[#946E1E] dark:text-[#E9C76A] flex items-center justify-center font-bold">
                <Award className="w-5 h-5" strokeWidth={2.2} />
              </div>
              <h3 className="text-sm font-bold text-[#292D2B] dark:text-white">
                Defense & Viva Voce Anxiety
              </h3>
              <p className="text-xs text-[#6B7269] dark:text-[#9DA39B] leading-relaxed">
                Oral examination under strict evaluators causes immense stress. Students often get caught off-guard by classic viva trap questions on concurrency and edge cases.
              </p>
            </div>
          </div>

          {/* Solution Callout */}
          <div className="mt-10 p-6 md:p-8 rounded-3xl bg-[#EEF5EF] dark:bg-[#202E24] border border-[#8DBA98]/30 text-center max-w-3xl mx-auto space-y-2">
            <h3 className="text-base sm:text-lg font-bold text-[#292D2B] dark:text-white">
              FYP Mate brings every part of this journey together.
            </h3>
            <p className="text-xs sm:text-sm text-[#527D5D] dark:text-[#8DBA98] leading-relaxed">
              We provide structured education, project planning, IEEE documentation tooling, and viva rehearsal so any student can complete their project with rigor and confidence.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          D. Features Section
          ───────────────────────────────────────────────────────────── */}
      <section id="features" className="py-16 md:py-24 border-t border-[#292D2B]/8 dark:border-white/8 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-bold text-[#527D5D] dark:text-[#8DBA98] uppercase tracking-wider">
              Core Platform Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#292D2B] dark:text-white tracking-tight">
              Everything You Need from Proposal to Final Defense
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[#6B7269] dark:text-[#9DA39B] leading-relaxed">
              Six thoughtfully integrated modules designed specifically around university academic milestones.
            </p>
          </div>

          {/* 6 Detailed Feature Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {/* Feature 1 */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 space-y-3 shadow-xs hover:border-[#8DBA98]/40 transition-colors">
              <div className="w-11 h-11 rounded-2xl bg-[#EEF5EF] dark:bg-[#202E24] text-[#527D5D] dark:text-[#8DBA98] flex items-center justify-center font-bold">
                <GraduationCap className="w-6 h-6" strokeWidth={2.2} />
              </div>
              <h3 className="text-base font-bold text-[#292D2B] dark:text-white">
                1. FYP Academy
              </h3>
              <p className="text-xs text-[#6B7269] dark:text-[#9DA39B] leading-relaxed">
                12 comprehensive chapters with interactive checkpoint quizzes. Covers topic selection, literature reviews, methodology, IEEE documentation, testing, and defense strategy.
              </p>
              <div className="pt-2 text-xs font-bold text-[#527D5D] dark:text-[#8DBA98] flex items-center gap-1">
                <span>12 Structured Chapters</span>
                <span aria-hidden="true">·</span>
                <span>Self-Paced Quizzes</span>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 space-y-3 shadow-xs hover:border-[#E9C76A]/40 transition-colors">
              <div className="w-11 h-11 rounded-2xl bg-[#FAF4E4] dark:bg-[#332C1A] text-[#946E1E] dark:text-[#E9C76A] flex items-center justify-center font-bold">
                <Lightbulb className="w-6 h-6" strokeWidth={2.2} />
              </div>
              <h3 className="text-base font-bold text-[#292D2B] dark:text-white">
                2. Project Idea Discovery & Feasibility
              </h3>
              <p className="text-xs text-[#6B7269] dark:text-[#9DA39B] leading-relaxed">
                Browse curated, committee-approved project blueprints across Web Systems, Mobile, AI/ML, and Security. Run the Feasibility Doctor to identify scope creep and technical risks.
              </p>
              <div className="pt-2 text-xs font-bold text-[#946E1E] dark:text-[#E9C76A] flex items-center gap-1">
                <span>Feasibility Diagnostics</span>
                <span aria-hidden="true">·</span>
                <span>Curated Blueprints</span>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 space-y-3 shadow-xs hover:border-[#8DBA98]/40 transition-colors">
              <div className="w-11 h-11 rounded-2xl bg-[#EEF5EF] dark:bg-[#202E24] text-[#527D5D] dark:text-[#8DBA98] flex items-center justify-center font-bold">
                <KanbanSquare className="w-6 h-6" strokeWidth={2.2} />
              </div>
              <h3 className="text-base font-bold text-[#292D2B] dark:text-white">
                3. Personal FYP Workspace
              </h3>
              <p className="text-xs text-[#6B7269] dark:text-[#9DA39B] leading-relaxed">
                An academic sprint board configured specifically for university milestones (Concept Paper, Mid-term Evaluation, Pre-Defense). Track sprint tasks and log supervisor meeting feedback.
              </p>
              <div className="pt-2 text-xs font-bold text-[#527D5D] dark:text-[#8DBA98] flex items-center gap-1">
                <span>Sprint Kanban</span>
                <span aria-hidden="true">·</span>
                <span>Supervisor Notes</span>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 space-y-3 shadow-xs hover:border-[#A9D4E8]/40 transition-colors">
              <div className="w-11 h-11 rounded-2xl bg-[#EDF6FA] dark:bg-[#1C2C35] text-[#3E7796] dark:text-[#A9D4E8] flex items-center justify-center font-bold">
                <FileText className="w-6 h-6" strokeWidth={2.2} />
              </div>
              <h3 className="text-base font-bold text-[#292D2B] dark:text-white">
                4. Documentation Studio
              </h3>
              <p className="text-xs text-[#6B7269] dark:text-[#9DA39B] leading-relaxed">
                IEEE 830 (SRS) and IEEE 1016 (SDS) split markdown editor. Pre-loaded with required sections, non-functional requirement tables, test matrices, and one-click export to PDF.
              </p>
              <div className="pt-2 text-xs font-bold text-[#3E7796] dark:text-[#A9D4E8] flex items-center gap-1">
                <span>IEEE 830 Compliant</span>
                <span aria-hidden="true">·</span>
                <span>Export to PDF</span>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 space-y-3 shadow-xs hover:border-[#527D5D]/40 transition-colors">
              <div className="w-11 h-11 rounded-2xl bg-[#EEF5EF] dark:bg-[#202E24] text-[#527D5D] dark:text-[#8DBA98] flex items-center justify-center font-bold">
                <Bot className="w-6 h-6" strokeWidth={2.2} />
              </div>
              <h3 className="text-base font-bold text-[#292D2B] dark:text-white">
                5. AI Project Mentor
              </h3>
              <p className="text-xs text-[#6B7269] dark:text-[#9DA39B] leading-relaxed">
                Context-aware technical architect powered by Gemini. Ask deep questions about database normalization, API latency, architectural trade-offs, and save answers directly into project notes.
              </p>
              <div className="pt-2 text-xs font-bold text-[#527D5D] dark:text-[#8DBA98] flex items-center gap-1">
                <span>Context-Aware</span>
                <span aria-hidden="true">·</span>
                <span>Architectural Advice</span>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 space-y-3 shadow-xs hover:border-[#EBC3CC]/40 transition-colors">
              <div className="w-11 h-11 rounded-2xl bg-[#F9EDF0] dark:bg-[#332226] text-[#9E4B60] dark:text-[#EBC3CC] flex items-center justify-center font-bold">
                <Award className="w-6 h-6" strokeWidth={2.2} />
              </div>
              <h3 className="text-base font-bold text-[#292D2B] dark:text-white">
                6. Presentation & Defense Preparation
              </h3>
              <p className="text-xs text-[#6B7269] dark:text-[#9DA39B] leading-relaxed">
                Structured 12-slide defense deck with presenter notes and timer, plus an oral viva simulator featuring 4 evaluator personas (Technical Architect, Research Prof, Industry Panelist, Generalist).
              </p>
              <div className="pt-2 text-xs font-bold text-[#9E4B60] dark:text-[#EBC3CC] flex items-center gap-1">
                <span>12-Slide Deck</span>
                <span aria-hidden="true">·</span>
                <span>Viva Trap Questions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          E. How It Works Section
          ───────────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-16 md:py-24 border-t border-[#292D2B]/8 dark:border-white/8 bg-white dark:bg-[#202422] transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-bold text-[#527D5D] dark:text-[#8DBA98] uppercase tracking-wider">
              Step-by-Step Methodology
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#292D2B] dark:text-white tracking-tight">
              How Students Use FYP Mate
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[#6B7269] dark:text-[#9DA39B] leading-relaxed">
              A structured progression designed to guide you through each academic semester without panic.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Step 1 */}
            <div className="p-5 rounded-3xl bg-[#FAF9F5] dark:bg-[#272C29] border border-[#292D2B]/6 dark:border-white/6 space-y-2 relative">
              <div className="w-8 h-8 rounded-full bg-[#527D5D] text-white flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h4 className="text-xs font-bold text-[#292D2B] dark:text-white pt-1">
                Understand the FYP Journey
              </h4>
              <p className="text-[11px] text-[#6B7269] dark:text-[#9DA39B] leading-relaxed">
                Study the 12 Academy chapters to understand evaluation criteria, timelines, and grading rubrics.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-3xl bg-[#FAF9F5] dark:bg-[#272C29] border border-[#292D2B]/6 dark:border-white/6 space-y-2 relative">
              <div className="w-8 h-8 rounded-full bg-[#E9C76A] text-[#292D2B] flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h4 className="text-xs font-bold text-[#292D2B] dark:text-white pt-1">
                Discover & Select an Idea
              </h4>
              <p className="text-[11px] text-[#6B7269] dark:text-[#9DA39B] leading-relaxed">
                Filter ideas by domain and stack. Use the Feasibility Doctor to ensure the project meets supervisor expectations.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-3xl bg-[#FAF9F5] dark:bg-[#272C29] border border-[#292D2B]/6 dark:border-white/6 space-y-2 relative">
              <div className="w-8 h-8 rounded-full bg-[#527D5D] text-white flex items-center justify-center font-bold text-xs">
                3
              </div>
              <h4 className="text-xs font-bold text-[#292D2B] dark:text-white pt-1">
                Organize Your Milestones
              </h4>
              <p className="text-[11px] text-[#6B7269] dark:text-[#9DA39B] leading-relaxed">
                Break work into sprint tasks on the Kanban board and maintain an auditable log of supervisor meetings.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-5 rounded-3xl bg-[#FAF9F5] dark:bg-[#272C29] border border-[#292D2B]/6 dark:border-white/6 space-y-2 relative">
              <div className="w-8 h-8 rounded-full bg-[#A9D4E8] text-[#292D2B] flex items-center justify-center font-bold text-xs">
                4
              </div>
              <h4 className="text-xs font-bold text-[#292D2B] dark:text-white pt-1">
                Prepare IEEE Documentation
              </h4>
              <p className="text-[11px] text-[#6B7269] dark:text-[#9DA39B] leading-relaxed">
                Draft your IEEE 830 SRS and SDS with structured templates and export polished submissions to PDF.
              </p>
            </div>

            {/* Step 5 */}
            <div className="p-5 rounded-3xl bg-[#FAF9F5] dark:bg-[#272C29] border border-[#292D2B]/6 dark:border-white/6 space-y-2 relative">
              <div className="w-8 h-8 rounded-full bg-[#EBC3CC] text-[#292D2B] flex items-center justify-center font-bold text-xs">
                5
              </div>
              <h4 className="text-xs font-bold text-[#292D2B] dark:text-white pt-1">
                Rehearse & Defend Your Work
              </h4>
              <p className="text-[11px] text-[#6B7269] dark:text-[#9DA39B] leading-relaxed">
                Practice presentation slides with speaker notes and face realistic committee questioning before oral exams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          F. Who is FYP Mate For? Section
          ───────────────────────────────────────────────────────────── */}
      <section id="audience" className="py-16 md:py-24 border-t border-[#292D2B]/8 dark:border-white/8 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-bold text-[#527D5D] dark:text-[#8DBA98] uppercase tracking-wider">
              Target Audience
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#292D2B] dark:text-white tracking-tight">
              Built for Students, Ready for Universities
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[#6B7269] dark:text-[#9DA39B] leading-relaxed">
              Initially crafted for Computer Science and Software Engineering degree programs, with an architecture designed to expand.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-6 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 space-y-2">
              <span className="text-xs font-bold text-[#527D5D] dark:text-[#8DBA98]">
                Degree Programs
              </span>
              <h3 className="text-sm font-bold text-[#292D2B] dark:text-white">
                BS Computer Science & Software Engineering
              </h3>
              <p className="text-xs text-[#6B7269] dark:text-[#9DA39B] leading-relaxed">
                Tailored around software development life cycles, IEEE engineering standards, and technical oral defense committees.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 space-y-2">
              <span className="text-xs font-bold text-[#527D5D] dark:text-[#8DBA98]">
                Starting Phase
              </span>
              <h3 className="text-sm font-bold text-[#292D2B] dark:text-white">
                Students Starting Their FYP (FYP-I)
              </h3>
              <p className="text-xs text-[#6B7269] dark:text-[#9DA39B] leading-relaxed">
                Assisting with problem identification, supervisor pitch decks, concept paper approval, and initial literature review.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 space-y-2">
              <span className="text-xs font-bold text-[#527D5D] dark:text-[#8DBA98]">
                Final Defense Phase
              </span>
              <h3 className="text-sm font-bold text-[#292D2B] dark:text-white">
                Graduating Seniors (FYP-II Defense)
              </h3>
              <p className="text-xs text-[#6B7269] dark:text-[#9DA39B] leading-relaxed">
                Finalizing full IEEE thesis documentation, creating PowerPoint slide decks, and simulating tough committee questioning.
              </p>
            </div>
          </div>

          {/* Long term vision */}
          <div className="mt-6 p-4 rounded-2xl bg-[#FAF9F5] dark:bg-[#272C29] border border-[#292D2B]/6 text-center text-xs text-[#6B7269] dark:text-[#9DA39B] max-w-2xl mx-auto">
            <strong className="text-[#292D2B] dark:text-white">Future Scope: </strong>
            Expanding to support Data Science, Artificial Intelligence, Cyber Security, and Electrical Engineering capstones in subsequent versions.
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          G. Call to Action Section
          ───────────────────────────────────────────────────────────── */}
      <section id="cta" className="py-16 md:py-24 border-t border-[#292D2B]/8 dark:border-white/8 bg-[#EEF5EF] dark:bg-[#202E24] transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#292D2B] dark:text-white tracking-tight leading-tight">
            Your FYP Journey Starts Here.
          </h2>
          <p className="text-sm sm:text-base text-[#527D5D] dark:text-[#8DBA98] max-w-xl mx-auto leading-relaxed">
            Stop feeling lost in the process. Get the guidance, structure, and organization you need to move forward with complete confidence.
          </p>
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenSignUp}
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold text-white bg-[#527D5D] hover:bg-[#43674D] dark:bg-[#8DBA98] dark:text-[#171A18] dark:hover:bg-[#7ba886] rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Get Started with FYP Mate</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
            </button>

            <button
              onClick={onOpenSignIn}
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-[#292D2B] dark:text-white bg-white dark:bg-[#202422] border border-[#292D2B]/10 dark:border-white/10 hover:bg-[#FAF9F5] dark:hover:bg-[#272C29] rounded-2xl transition-colors cursor-pointer"
            >
              Sign In to Your Workspace
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          H. Footer
          ───────────────────────────────────────────────────────────── */}
      <footer className="py-12 border-t border-[#292D2B]/8 dark:border-white/8 bg-white dark:bg-[#202422] transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-[#292D2B]/6 dark:border-white/6">
            <div className="md:col-span-5 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#527D5D] text-white flex items-center justify-center font-bold text-xs">
                  F
                </div>
                <span className="text-base font-bold tracking-tight text-[#292D2B] dark:text-white">
                  FYP Mate
                </span>
              </div>
              <p className="text-xs text-[#6B7269] dark:text-[#9DA39B] max-w-sm leading-relaxed">
                Open-source academic companion designed to simplify the Final Year Project journey for university Computer Science and Software Engineering students.
              </p>
            </div>

            <div className="md:col-span-3 space-y-2 text-xs">
              <span className="font-bold text-[#292D2B] dark:text-white uppercase tracking-wider text-[11px] block">
                Platform Navigation
              </span>
              <ul className="space-y-1.5 text-[#6B7269] dark:text-[#9DA39B]">
                <li><button onClick={() => scrollToSection('hero')} className="hover:text-[#292D2B] dark:hover:text-white">Home</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-[#292D2B] dark:hover:text-white">About & Problem</button></li>
                <li><button onClick={() => scrollToSection('features')} className="hover:text-[#292D2B] dark:hover:text-white">Core Features</button></li>
                <li><button onClick={() => scrollToSection('how-it-works')} className="hover:text-[#292D2B] dark:hover:text-white">How It Works</button></li>
                <li><button onClick={() => scrollToSection('audience')} className="hover:text-[#292D2B] dark:hover:text-white">Who It's For</button></li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-2 text-xs">
              <span className="font-bold text-[#292D2B] dark:text-white uppercase tracking-wider text-[11px] block">
                Core Academic Modules
              </span>
              <ul className="space-y-1.5 text-[#6B7269] dark:text-[#9DA39B]">
                <li>FYP Academy (12 Chapters)</li>
                <li>Idea Discovery & Feasibility Doctor</li>
                <li>Sprint Kanban Workspace & Notes</li>
                <li>IEEE 830 Documentation Studio</li>
                <li>AI Project Mentor (Gemini-Powered)</li>
                <li>Defense Slide Deck & Viva Simulator</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7269] dark:text-[#9DA39B]">
            <p>© {new Date().getFullYear()} FYP Mate. Open-source educational project for university students.</p>
            <p className="text-[11px]">Empowering Computer Science & Software Engineering capstones.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
