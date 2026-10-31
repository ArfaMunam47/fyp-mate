import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AcademicDegree } from '../types';
import { 
  User, 
  X, 
  GraduationCap, 
  RotateCcw, 
  Download, 
  Upload, 
  Check, 
  Save,
  BookOpen
} from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEGREES: AcademicDegree[] = [
  'BS Computer Science',
  'BS Software Engineering',
  'BS Artificial Intelligence',
  'BS Data Science',
  'BS Cyber Security',
  'BS Information Technology'
];

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { 
    profile, 
    updateProfile, 
    exportWorkspace, 
    importWorkspace, 
    resetWorkspace 
  } = useApp();

  const [name, setName] = useState(profile.name);
  const [university, setUniversity] = useState(profile.university);
  const [degree, setDegree] = useState<AcademicDegree>(profile.degree);
  const [batchOrYear, setBatchOrYear] = useState(profile.batchOrYear);
  const [skillsStr, setSkillsStr] = useState(profile.skills.join(', '));
  const [bio, setBio] = useState(profile.bio || '');

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      university,
      degree,
      batchOrYear,
      skills: skillsStr.split(',').map(s => s.trim()).filter(Boolean),
      bio
    });
    onClose();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          const success = importWorkspace(text);
          if (success) {
            alert('Workspace restored from backup!');
            onClose();
          } else {
            alert('Failed to parse backup JSON file.');
          }
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#292D2B]/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-lg bg-white dark:bg-[#202422] rounded-3xl border border-[#292D2B]/10 dark:border-white/10 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-[#292D2B]/6 dark:border-white/6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-[#EEF5EF] dark:bg-[#202E24] text-[#55825D] dark:text-[#A8C9AE] flex items-center justify-center font-bold text-xs border border-[#96BD9D]/30">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#292D2B] dark:text-white">
                Student Academic Profile
              </h2>
              <p className="text-[11px] text-[#858982]">
                Customizes your workspace, SRS headers, and viva committee prompts
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#858982] hover:text-[#292D2B] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#292D2B] dark:text-white mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#292D2B]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#96BD9D]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#292D2B] dark:text-white mb-1.5">
                Current Semester / Year
              </label>
              <input
                type="text"
                required
                value={batchOrYear}
                onChange={(e) => setBatchOrYear(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#292D2B]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#96BD9D]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#292D2B] dark:text-white mb-1.5">
              University / College Institution
            </label>
            <input
              type="text"
              required
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#292D2B]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#96BD9D]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#292D2B] dark:text-white mb-1.5">
              Academic Degree Program
            </label>
            <select
              value={degree}
              onChange={(e) => setDegree(e.target.value as AcademicDegree)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#292D2B]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white focus:outline-hidden"
            >
              {DEGREES.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#292D2B] dark:text-white mb-1.5">
              Technical Strengths (comma-separated)
            </label>
            <input
              type="text"
              value={skillsStr}
              onChange={(e) => setSkillsStr(e.target.value)}
              placeholder="e.g. TypeScript, React, Python, Docker, PostgreSQL"
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#292D2B]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white font-mono focus:outline-hidden focus:ring-2 focus:ring-[#96BD9D]"
            />
          </div>

          {/* Backup & Reset Options */}
          <div className="pt-3 border-t border-[#292D2B]/6 dark:border-white/6 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#858982] block">
              Workspace Backup & Reset
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={exportWorkspace}
                className="px-3 py-1.5 text-xs rounded-xl border border-[#292D2B]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white hover:bg-[#EEF5EF] dark:hover:bg-[#202E24] transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-[#55825D] dark:text-[#A8C9AE]" />
                <span>Export Backup</span>
              </button>

              <label className="px-3 py-1.5 text-xs rounded-xl border border-[#292D2B]/10 dark:border-white/10 bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white hover:bg-[#EEF5EF] dark:hover:bg-[#202E24] transition-colors flex items-center gap-1.5 cursor-pointer">
                <Upload className="w-3.5 h-3.5 text-[#3E7796] dark:text-[#A9D4E8]" />
                <span>Import Backup</span>
                <input type="file" accept=".json" onChange={handleImport} className="hidden" />
              </label>

              <button
                type="button"
                onClick={() => {
                  if (confirm('Are you sure you want to reset your workspace back to the initial sample project?')) {
                    resetWorkspace();
                    onClose();
                  }
                }}
                className="px-3 py-1.5 text-xs rounded-xl border border-[#EBC3CC]/60 bg-[#FAECEF] text-[#9E4B60] dark:bg-[#2E1E23] dark:text-[#EBC3CC] hover:bg-[#F6DEE3] dark:hover:bg-[#382229] ml-auto flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Data</span>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-[#292D2B]/6 dark:border-white/6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#858982] hover:text-[#292D2B] dark:hover:text-white rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-[#527D5D] hover:bg-[#43674D] dark:bg-[#8DBA98] dark:text-[#171A18] dark:hover:bg-[#7ba886] rounded-xl flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" strokeWidth={2.2} />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

