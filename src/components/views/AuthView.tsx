import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AcademicDegree } from '../../types';
import { 
  GraduationCap, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  Mail, 
  User, 
  School, 
  BookOpen,
  FileText,
  Award,
  Layers,
  Sun,
  Moon
} from 'lucide-react';

const DEGREES: AcademicDegree[] = [
  'BS Computer Science',
  'BS Software Engineering',
  'BS Artificial Intelligence',
  'BS Data Science',
  'BS Cyber Security',
  'BS Information Technology'
];

export const AuthView: React.FC = () => {
  const { login, signup, enterDemoMode, isDarkMode, toggleDarkMode } = useApp();

  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'forgot'>('signin');

  // Sign In State
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Sign Up State
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpUniversity, setSignUpUniversity] = useState('');
  const [signUpDegree, setSignUpDegree] = useState<AcademicDegree>('BS Computer Science');
  const [signUpPassword, setSignUpPassword] = useState('');

  // Forgot password
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInEmail) return;
    login(signInEmail);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpName || !signUpEmail || !signUpUniversity) return;
    signup({
      name: signUpName,
      email: signUpEmail,
      university: signUpUniversity,
      degree: signUpDegree,
    });
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSent(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F6F0] dark:bg-[#171A18] text-[#292D2B] dark:text-[#F2F1ED] flex flex-col justify-between transition-colors">
      {/* Top Simple Bar */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-[#292D2B]/8 dark:border-white/8 bg-white/70 dark:bg-[#202422]/70 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#96BD9D] text-white flex items-center justify-center font-bold text-sm shadow-xs">
            F
          </div>
          <span className="text-lg font-bold tracking-tight text-[#292D2B] dark:text-white">
            FYP Mate
          </span>
          <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#FAF4E4] text-[#B88C22] dark:bg-[#332C1A] dark:text-[#E9C76A] border border-[#E9C76A]/40 font-medium ml-1">
            Student-First Capstone Platform
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleDarkMode}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 text-[#858982] hover:text-[#292D2B] dark:hover:text-white rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          <button
            onClick={enterDemoMode}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-[#EDF6FA] text-[#4A8DAF] dark:bg-[#1C2C35] dark:text-[#9FD0E6] hover:bg-[#8EC4DC]/30 border border-[#8EC4DC]/40 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8EC4DC]" />
            <span>Explore Demo Project</span>
          </button>
        </div>
      </header>

      {/* Main Center Card Split */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Product Value & Features */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EEF5EF] text-[#55825D] dark:bg-[#202E24] dark:text-[#A8C9AE] border border-[#96BD9D]/40">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Computer Science & Software Engineering</span>
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#292D2B] dark:text-white tracking-tight leading-tight text-balance">
                Your Final Year Project, simplified.
              </h1>
              <p className="text-sm md:text-base text-[#858982] dark:text-[#9DA39B] leading-relaxed">
                A unified, open-source academic companion designed to guide university students from project ideation and IEEE documentation to software development and viva defense.
              </p>
            </div>

            {/* Feature Highlights with Pastel Color Accents */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 space-y-1 shadow-xs">
                <div className="w-7 h-7 rounded-lg bg-[#EEF5EF] dark:bg-[#202E24] text-[#55825D] dark:text-[#A8C9AE] flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-[#292D2B] dark:text-white">
                  FYP Academy
                </h4>
                <p className="text-[11px] text-[#858982] dark:text-[#9DA39B] leading-relaxed">
                  12 structured chapters with quizzes covering proposals, SRS, and architecture.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 space-y-1 shadow-xs">
                <div className="w-7 h-7 rounded-lg bg-[#EDF6FA] dark:bg-[#1C2C35] text-[#4A8DAF] dark:text-[#9FD0E6] flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-[#292D2B] dark:text-white">
                  Documentation Studio
                </h4>
                <p className="text-[11px] text-[#858982] dark:text-[#9DA39B] leading-relaxed">
                  IEEE 830 compliant SRS, ERD tables, and test cases with export to PDF.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 space-y-1 shadow-xs">
                <div className="w-7 h-7 rounded-lg bg-[#FAF4E4] dark:bg-[#332C1A] text-[#B88C22] dark:text-[#E9C76A] flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-[#292D2B] dark:text-white">
                  Viva Voce Simulator
                </h4>
                <p className="text-[11px] text-[#858982] dark:text-[#9DA39B] leading-relaxed">
                  Practice questions with 4 AI examiner personas and rubric evaluations.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 space-y-1 shadow-xs">
                <div className="w-7 h-7 rounded-lg bg-[#F9EDF0] dark:bg-[#332226] text-[#BD6C7B] dark:text-[#EBC3CC] flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-[#292D2B] dark:text-white">
                  Sprint Workspace
                </h4>
                <p className="text-[11px] text-[#858982] dark:text-[#9DA39B] leading-relaxed">
                  Kanban task boards, milestones roadmap, and supervisor meeting notes.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Authentication Card */}
          <div className="lg:col-span-6">
            <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 shadow-md space-y-6">
              {/* Form Navigation Pills */}
              <div className="flex items-center p-1 rounded-2xl bg-[#F7F6F0] dark:bg-[#171A18] border border-[#292D2B]/5 dark:border-white/5">
                <button
                  type="button"
                  onClick={() => setAuthMode('signin')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                    authMode === 'signin'
                      ? 'bg-white dark:bg-[#202422] text-[#292D2B] dark:text-white shadow-xs'
                      : 'text-[#858982] dark:text-[#9DA39B] hover:text-[#292D2B]'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                    authMode === 'signup'
                      ? 'bg-white dark:bg-[#202422] text-[#292D2B] dark:text-white shadow-xs'
                      : 'text-[#858982] dark:text-[#9DA39B] hover:text-[#292D2B]'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* SIGN IN FORM */}
              {authMode === 'signin' && (
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#292D2B] dark:text-white">
                      Welcome back
                    </h3>
                    <p className="text-xs text-[#858982] dark:text-[#9DA39B]">
                      Enter your university email to access your project workspace.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#292D2B] dark:text-[#F2F1ED] mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3 top-3 text-[#858982]" />
                        <input
                          type="email"
                          required
                          value={signInEmail}
                          onChange={(e) => setSignInEmail(e.target.value)}
                          placeholder="student@university.edu"
                          className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-[#292D2B]/12 dark:border-white/12 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#96BD9D]"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-semibold text-[#292D2B] dark:text-[#F2F1ED]">
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={() => setAuthMode('forgot')}
                          className="text-[11px] text-[#55825D] dark:text-[#A8C9AE] hover:underline"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 absolute left-3 top-3 text-[#858982]" />
                        <input
                          type="password"
                          required
                          value={signInPassword}
                          onChange={(e) => setSignInPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-[#292D2B]/12 dark:border-white/12 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#96BD9D]"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#96BD9D] hover:bg-[#83AA8A] transition-colors shadow-xs flex items-center justify-center gap-2"
                  >
                    <span>Sign In to Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={enterDemoMode}
                      className="text-xs text-[#858982] hover:text-[#292D2B] dark:hover:text-white hover:underline"
                    >
                      Or explore sample project as guest →
                    </button>
                  </div>
                </form>
              )}

              {/* SIGN UP FORM */}
              {authMode === 'signup' && (
                <form onSubmit={handleSignUp} className="space-y-3.5">
                  <div>
                    <h3 className="text-lg font-bold text-[#292D2B] dark:text-white">
                      Create your FYP student account
                    </h3>
                    <p className="text-xs text-[#858982] dark:text-[#9DA39B]">
                      Personalize your capstone project management dashboard.
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    <div>
                      <label className="block text-xs font-semibold text-[#292D2B] dark:text-[#F2F1ED] mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3 top-3 text-[#858982]" />
                        <input
                          type="text"
                          required
                          value={signUpName}
                          onChange={(e) => setSignUpName(e.target.value)}
                          placeholder="e.g. Ayesha Khan"
                          className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-[#292D2B]/12 dark:border-white/12 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white focus:ring-2 focus:ring-[#96BD9D]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#292D2B] dark:text-[#F2F1ED] mb-1">
                        University or College
                      </label>
                      <div className="relative">
                        <School className="w-4 h-4 absolute left-3 top-3 text-[#858982]" />
                        <input
                          type="text"
                          required
                          value={signUpUniversity}
                          onChange={(e) => setSignUpUniversity(e.target.value)}
                          placeholder="e.g. FAST NUCES / NUST"
                          className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-[#292D2B]/12 dark:border-white/12 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white focus:ring-2 focus:ring-[#96BD9D]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-xs font-semibold text-[#292D2B] dark:text-[#F2F1ED] mb-1">
                          Degree Program
                        </label>
                        <select
                          value={signUpDegree}
                          onChange={(e) => setSignUpDegree(e.target.value as AcademicDegree)}
                          className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#292D2B]/12 dark:border-white/12 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white"
                        >
                          {DEGREES.map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#292D2B] dark:text-[#F2F1ED] mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={signUpEmail}
                          onChange={(e) => setSignUpEmail(e.target.value)}
                          placeholder="student@uni.edu"
                          className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#292D2B]/12 dark:border-white/12 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white focus:ring-2 focus:ring-[#96BD9D]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#292D2B] dark:text-[#F2F1ED] mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        required
                        value={signUpPassword}
                        onChange={(e) => setSignUpPassword(e.target.value)}
                        placeholder="Create a secure password"
                        className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#292D2B]/12 dark:border-white/12 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white focus:ring-2 focus:ring-[#96BD9D]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#96BD9D] hover:bg-[#83AA8A] transition-colors shadow-xs flex items-center justify-center gap-2"
                  >
                    <span>Create Student Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* FORGOT PASSWORD FORM */}
              {authMode === 'forgot' && (
                <form onSubmit={handleForgot} className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#292D2B] dark:text-white">
                      Reset Password
                    </h3>
                    <p className="text-xs text-[#858982] dark:text-[#9DA39B]">
                      Enter your university email address to receive password reset instructions.
                    </p>
                  </div>

                  {!forgotSent ? (
                    <>
                      <div>
                        <label className="block text-xs font-semibold text-[#292D2B] dark:text-[#F2F1ED] mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          placeholder="student@university.edu"
                          className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#292D2B]/12 dark:border-white/12 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#96BD9D] hover:bg-[#83AA8A] transition-colors shadow-xs"
                      >
                        Send Reset Instructions
                      </button>
                    </>
                  ) : (
                    <div className="p-4 rounded-2xl bg-[#EEF5EF] dark:bg-[#202E24] text-xs text-[#55825D] dark:text-[#A8C9AE] border border-[#96BD9D]/40 space-y-1">
                      <p className="font-bold">Check your inbox</p>
                      <p>We've dispatched password reset instructions to {forgotEmail}.</p>
                    </div>
                  )}

                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('signin');
                        setForgotSent(false);
                      }}
                      className="text-xs text-[#858982] hover:text-[#292D2B] dark:hover:text-white hover:underline"
                    >
                      ← Back to Sign In
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-[#292D2B]/8 dark:border-white/8 text-center text-xs text-[#858982] dark:text-[#9DA39B]">
        FYP Mate — Open-source educational platform for Computer Science & Software Engineering capstone students.
      </footer>
    </div>
  );
};
