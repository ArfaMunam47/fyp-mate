import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AcademicDegree } from '../../types';
import { 
  GraduationCap, 
  ArrowRight, 
  Lock, 
  Mail, 
  User, 
  School, 
  X,
  Sun,
  Moon,
  Check
} from 'lucide-react';

const DEGREES: AcademicDegree[] = [
  'BS Computer Science',
  'BS Software Engineering',
  'BS Artificial Intelligence',
  'BS Data Science',
  'BS Cyber Security',
  'BS Information Technology'
];

interface AuthViewProps {
  initialMode?: 'signin' | 'signup' | 'forgot';
  onClose?: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ 
  initialMode = 'signin',
  onClose 
}) => {
  const { login, signup, isDarkMode, toggleDarkMode } = useApp();

  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'forgot'>(initialMode);

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
    <div className="fixed inset-0 z-50 bg-[#292D2B]/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-md bg-white dark:bg-[#202422] rounded-3xl border border-[#292D2B]/10 dark:border-white/10 shadow-2xl overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="p-6 border-b border-[#292D2B]/6 dark:border-white/6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#527D5D] dark:bg-[#8DBA98] text-white dark:text-[#171A18] flex items-center justify-center font-bold text-sm shadow-xs">
              F
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-[#292D2B] dark:text-white block">
                FYP Mate
              </span>
              <span className="text-[11px] text-[#6B7269] dark:text-[#9DA39B]">
                Academic Project Workspace
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleDarkMode}
              className="p-1.5 text-[#6B7269] hover:text-[#292D2B] dark:hover:text-white rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-[#6B7269] hover:text-[#292D2B] dark:hover:text-white rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Tab Switcher */}
        {authMode !== 'forgot' && (
          <div className="px-6 pt-5">
            <div className="flex items-center p-1 rounded-2xl bg-[#FAF9F5] dark:bg-[#272C29] border border-[#292D2B]/6 dark:border-white/6">
              <button
                type="button"
                onClick={() => setAuthMode('signin')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  authMode === 'signin'
                    ? 'bg-white dark:bg-[#202422] text-[#292D2B] dark:text-white shadow-xs'
                    : 'text-[#6B7269] dark:text-[#9DA39B] hover:text-[#292D2B]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('signup')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  authMode === 'signup'
                    ? 'bg-white dark:bg-[#202422] text-[#292D2B] dark:text-white shadow-xs'
                    : 'text-[#6B7269] dark:text-[#9DA39B] hover:text-[#292D2B]'
                }`}
              >
                Create Account
              </button>
            </div>
          </div>
        )}

        <div className="p-6">
          {/* ─────────────────────────────────────────────────────────────
              SIGN IN FORM
              ───────────────────────────────────────────────────────────── */}
          {authMode === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-[#292D2B] dark:text-white">
                  Welcome to FYP Mate
                </h3>
                <p className="text-xs text-[#6B7269] dark:text-[#9DA39B]">
                  Enter your credentials to access your project workspace.
                </p>
              </div>

              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#292D2B] dark:text-[#F2F1ED] mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-[#6B7269]" strokeWidth={2} />
                    <input
                      type="email"
                      required
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      placeholder="student@university.edu"
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-[#292D2B]/12 dark:border-white/12 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#8DBA98]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-[#292D2B] dark:text-[#F2F1ED]">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setAuthMode('forgot')}
                      className="text-[11px] text-[#527D5D] dark:text-[#8DBA98] hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-[#6B7269]" strokeWidth={2} />
                    <input
                      type="password"
                      required
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-[#292D2B]/12 dark:border-white/12 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#8DBA98]"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#527D5D] hover:bg-[#43674D] dark:bg-[#8DBA98] dark:text-[#171A18] dark:hover:bg-[#7ba886] transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Sign In to Workspace</span>
                <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
              </button>

              <div className="pt-2 text-center text-xs text-[#6B7269] dark:text-[#9DA39B]">
                <span>New to FYP Mate? </span>
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className="font-bold text-[#527D5D] dark:text-[#8DBA98] hover:underline cursor-pointer"
                >
                  Create an account
                </button>
              </div>
            </form>
          )}

          {/* ─────────────────────────────────────────────────────────────
              SIGN UP FORM
              ───────────────────────────────────────────────────────────── */}
          {authMode === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-3.5">
              <div>
                <h3 className="text-lg font-bold text-[#292D2B] dark:text-white">
                  Create Student Account
                </h3>
                <p className="text-xs text-[#6B7269] dark:text-[#9DA39B]">
                  Register your degree and university to personalize your project.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#292D2B] dark:text-[#F2F1ED] mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-3 text-[#6B7269]" strokeWidth={2} />
                    <input
                      type="text"
                      required
                      value={signUpName}
                      onChange={(e) => setSignUpName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full pl-10 pr-3.5 py-2 text-xs rounded-xl border border-[#292D2B]/12 dark:border-white/12 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#8DBA98]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#292D2B] dark:text-[#F2F1ED] mb-1">
                    University / College Institution
                  </label>
                  <div className="relative">
                    <School className="w-4 h-4 absolute left-3.5 top-3 text-[#6B7269]" strokeWidth={2} />
                    <input
                      type="text"
                      required
                      value={signUpUniversity}
                      onChange={(e) => setSignUpUniversity(e.target.value)}
                      placeholder="e.g. University of Engineering & Technology"
                      className="w-full pl-10 pr-3.5 py-2 text-xs rounded-xl border border-[#292D2B]/12 dark:border-white/12 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#8DBA98]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#292D2B] dark:text-[#F2F1ED] mb-1">
                      Degree Program
                    </label>
                    <select
                      value={signUpDegree}
                      onChange={(e) => setSignUpDegree(e.target.value as AcademicDegree)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#292D2B]/12 dark:border-white/12 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white focus:outline-hidden"
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
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#292D2B]/12 dark:border-white/12 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#8DBA98]"
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
                    placeholder="Create a strong password"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#292D2B]/12 dark:border-white/12 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#8DBA98]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#527D5D] hover:bg-[#43674D] dark:bg-[#8DBA98] dark:text-[#171A18] dark:hover:bg-[#7ba886] transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Create Student Account</span>
                <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
              </button>

              <div className="pt-2 text-center text-xs text-[#6B7269] dark:text-[#9DA39B]">
                <span>Already have an account? </span>
                <button
                  type="button"
                  onClick={() => setAuthMode('signin')}
                  className="font-bold text-[#527D5D] dark:text-[#8DBA98] hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </div>
            </form>
          )}

          {/* ─────────────────────────────────────────────────────────────
              FORGOT PASSWORD FORM
              ───────────────────────────────────────────────────────────── */}
          {authMode === 'forgot' && (
            <form onSubmit={handleForgot} className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-[#292D2B] dark:text-white">
                  Reset Password
                </h3>
                <p className="text-xs text-[#6B7269] dark:text-[#9DA39B]">
                  Enter your university email address to receive password reset instructions.
                </p>
              </div>

              {!forgotSent ? (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-[#292D2B] dark:text-[#F2F1ED] mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="student@university.edu"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#292D2B]/12 dark:border-white/12 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#8DBA98]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#527D5D] hover:bg-[#43674D] dark:bg-[#8DBA98] dark:text-[#171A18] dark:hover:bg-[#7ba886] transition-colors shadow-xs cursor-pointer"
                  >
                    Send Reset Instructions
                  </button>
                </>
              ) : (
                <div className="p-4 rounded-2xl bg-[#EEF5EF] dark:bg-[#202E24] text-xs text-[#527D5D] dark:text-[#8DBA98] border border-[#8DBA98]/40 space-y-1">
                  <p className="font-bold">Check your inbox</p>
                  <p>Password reset instructions have been dispatched to {forgotEmail}.</p>
                </div>
              )}

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signin');
                    setForgotSent(false);
                  }}
                  className="text-xs text-[#6B7269] hover:text-[#292D2B] dark:hover:text-white hover:underline cursor-pointer"
                >
                  ← Back to Sign In
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
