import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Presentation, 
  Play, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Minimize2, 
  Volume2,
  Layers
} from 'lucide-react';

export const PresentationView: React.FC = () => {
  const { project } = useApp();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'slide' | 'grid'>('slide');
  const [isRehearsalMode, setIsRehearsalMode] = useState(false);
  const [rehearsalSeconds, setRehearsalSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    'check-1': true,
    'check-2': true,
    'check-3': false,
    'check-4': false,
    'check-5': true
  });

  const slides = project.presentationSlides;
  const currentSlide = slides[currentSlideIndex] || slides[0];

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setRehearsalSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  const toggleCheck = (id: string) => {
    setChecklist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const totalDefenseTime = slides.reduce((acc, s) => acc + s.durationMinutes, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#BD6C7B] dark:text-[#EBC3CC] mb-1">
            <Presentation className="w-4 h-4" />
            <span>Defense Presentation Builder</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#858982]">12-Slide Golden Structure (~{totalDefenseTime} Mins)</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#292D2B] dark:text-white tracking-tight">
            Defense Slide Deck & Speaker Notes
          </h1>
          <p className="mt-1 text-xs text-[#858982] dark:text-[#9DA39B] max-w-2xl">
            Paced for the standard 15-minute committee presentation. Every slide includes recommended diagram designs and complete word-for-word speaker notes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsRehearsalMode(true);
              setIsTimerRunning(true);
            }}
            className="px-4 py-2 text-xs font-bold text-white dark:text-[#171A18] bg-[#96BD9D] hover:bg-[#83AA8A] dark:bg-[#A8C9AE] rounded-xl shadow-xs flex items-center gap-2 transition-colors"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Start 15-Min Rehearsal</span>
          </button>
        </div>
      </div>

      {/* Slide Navigation Tabs */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#858982]">View:</span>
          <div className="p-1 bg-[#FAF9F5] dark:bg-[#272C29] rounded-2xl border border-[#292D2B]/5 dark:border-white/5 flex items-center">
            <button
              onClick={() => setViewMode('slide')}
              className={`px-3 py-1 text-xs font-semibold rounded-xl transition-all ${
                viewMode === 'slide' 
                  ? 'bg-white dark:bg-[#202422] text-[#292D2B] dark:text-white shadow-xs' 
                  : 'text-[#858982]'
              }`}
            >
              Single Slide View
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 text-xs font-semibold rounded-xl transition-all ${
                viewMode === 'grid' 
                  ? 'bg-white dark:bg-[#202422] text-[#292D2B] dark:text-white shadow-xs' 
                  : 'text-[#858982]'
              }`}
            >
              12-Slide Overview
            </button>
          </div>
        </div>

        <span className="text-xs text-[#858982]">
          Slide <strong className="text-[#292D2B] dark:text-white font-mono">{currentSlideIndex + 1}</strong> of {slides.length}
        </span>
      </div>

      {/* SINGLE SLIDE VIEW */}
      {viewMode === 'slide' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Slide Canvas */}
          <div className="lg:col-span-8 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 shadow-xs overflow-hidden flex flex-col justify-between min-h-[460px]">
            {/* Top Slide Meta */}
            <div className="p-6 border-b border-[#292D2B]/6 dark:border-white/6 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-[#858982]">
                <span className="font-bold text-[#55825D] dark:text-[#A8C9AE]">Slide {currentSlide.slideNumber}</span>
                <span aria-hidden="true">·</span>
                <span>Pacing: {currentSlide.durationMinutes} min</span>
              </div>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white border border-[#292D2B]/6 dark:border-white/6">
                Defense Deck
              </span>
            </div>

            {/* Slide Body */}
            <div className="p-8 md:p-10 space-y-6 flex-1 flex flex-col justify-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#292D2B] dark:text-white tracking-tight leading-tight">
                  {currentSlide.title}
                </h2>
                <p className="mt-1.5 text-xs md:text-sm font-semibold text-[#55825D] dark:text-[#A8C9AE]">
                  {currentSlide.subtitle}
                </p>
              </div>

              {/* Bullet points */}
              <div className="space-y-3 pt-2">
                {currentSlide.keyBullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#96BD9D] dark:bg-[#A8C9AE] mt-2 shrink-0" />
                    <p className="text-xs md:text-sm text-[#292D2B] dark:text-white leading-relaxed">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>

              {/* Visual Diagram Recommendation Box */}
              <div className="p-4 rounded-2xl bg-[#EDF6FA] dark:bg-[#1C2C35] border border-[#8EC4DC]/40 flex items-center gap-3 text-xs text-[#292D2B] dark:text-white">
                <Layers className="w-5 h-5 text-[#4A8DAF] dark:text-[#9FD0E6] shrink-0" />
                <div>
                  <span className="font-bold block text-[#292D2B] dark:text-white">Visual Diagram Suggestion:</span>
                  <span className="text-[#858982] dark:text-[#9DA39B]">{currentSlide.visualRecommendation}</span>
                </div>
              </div>
            </div>

            {/* Slide Navigation Bar */}
            <div className="p-4 border-t border-[#292D2B]/6 dark:border-white/6 bg-[#FAF9F5] dark:bg-[#272C29] flex items-center justify-between">
              <button
                onClick={handlePrevSlide}
                disabled={currentSlideIndex === 0}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-xl border border-[#292D2B]/10 dark:border-white/10 text-[#292D2B] dark:text-white hover:bg-black/4 disabled:opacity-30 flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Slide</span>
              </button>

              {/* Slide Dots in Sage Green */}
              <div className="flex items-center gap-1.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlideIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      i === currentSlideIndex 
                        ? 'bg-[#96BD9D] dark:bg-[#A8C9AE] w-6' 
                        : 'bg-[#858982]/30 hover:bg-[#858982]'
                    }`}
                    title={`Slide ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextSlide}
                disabled={currentSlideIndex === slides.length - 1}
                className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-[#96BD9D] hover:bg-[#83AA8A] dark:bg-[#A8C9AE] text-white dark:text-[#171A18] disabled:opacity-30 flex items-center gap-1.5 shadow-xs"
              >
                <span>Next Slide</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Rail: Speaker Notes & Delivery Tips */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-[#BD6C7B] dark:text-[#EBC3CC] font-bold text-xs uppercase tracking-wider">
                <Volume2 className="w-4 h-4" />
                <span>Word-for-Word Speaker Script</span>
              </div>
              <p className="text-xs text-[#858982]">
                Say this aloud during your slide transition:
              </p>
              <div className="p-4 rounded-2xl bg-[#F9EDF0] dark:bg-[#332226] border border-[#E0AEB8]/30 text-xs text-[#292D2B] dark:text-white leading-relaxed italic whitespace-pre-line">
                "{currentSlide.speakerNotes}"
              </div>
            </div>

            {/* Defense Day Readiness Checklist */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#858982]">
                Defense Day Readiness Checklist
              </h3>
              <div className="space-y-2 text-xs">
                {[
                  { id: 'check-1', label: 'Local offline Docker instance running (No Wi-Fi needed)' },
                  { id: 'check-2', label: 'Pre-recorded 1080p backup demonstration video ready' },
                  { id: 'check-3', label: 'HDMI / USB-C display adapter tested on university projector' },
                  { id: 'check-4', label: 'Printed hardbound thesis copy with tab bookmarks for examiners' },
                  { id: 'check-5', label: 'Synchronized team speaker transitions rehearsed 3 times' }
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className="flex items-start gap-2 cursor-pointer p-1.5 rounded-xl hover:bg-[#FAF9F5] dark:hover:bg-[#272C29]"
                  >
                    <input
                      type="checkbox"
                      checked={checklist[item.id] || false}
                      onChange={() => {}}
                      className="mt-0.5 text-[#96BD9D] rounded"
                    />
                    <span className={`leading-snug ${checklist[item.id] ? 'text-[#858982] line-through' : 'text-[#292D2B] dark:text-white'}`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GRID OVERVIEW */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {slides.map((s, idx) => (
            <div
              key={s.id}
              onClick={() => {
                setCurrentSlideIndex(idx);
                setViewMode('slide');
              }}
              className="p-5 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 hover:border-[#96BD9D] cursor-pointer transition-all flex flex-col justify-between space-y-3 group shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#858982] mb-1">
                  <span className="font-bold text-[#55825D] dark:text-[#A8C9AE]">Slide {s.slideNumber}</span>
                  <span>{s.durationMinutes} min</span>
                </div>
                <h4 className="text-xs font-bold text-[#292D2B] dark:text-white line-clamp-2 group-hover:text-[#55825D] transition-colors">
                  {s.title}
                </h4>
              </div>
              <p className="text-[11px] text-[#858982] line-clamp-2">
                {s.subtitle}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* FULL-SCREEN REHEARSAL MODAL */}
      {isRehearsalMode && (
        <div className="fixed inset-0 z-50 bg-[#171A18] text-white flex flex-col justify-between p-6 md:p-12 overflow-y-auto">
          {/* Top Timer Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-wider text-[#9DA39B]">
                Defense Rehearsal Mode
              </span>
              <span className="text-xs text-white/30">·</span>
              <span className="text-xs font-mono text-[#A8C9AE]">
                Slide {currentSlideIndex + 1} of {slides.length}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-[#202422] px-3.5 py-1.5 rounded-xl border border-white/10 font-mono text-sm">
                <Clock className="w-4 h-4 text-[#E9C76A]" />
                <span className={rehearsalSeconds > 900 ? 'text-[#E0AEB8] font-bold' : 'text-white'}>
                  {formatTimer(rehearsalSeconds)} / 15:00
                </span>
              </div>

              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="px-3.5 py-1 text-xs font-bold bg-white/10 hover:bg-white/20 rounded-xl"
              >
                {isTimerRunning ? 'Pause' : 'Resume'}
              </button>

              <button
                onClick={() => {
                  setIsRehearsalMode(false);
                  setIsTimerRunning(false);
                }}
                className="p-1.5 text-white/60 hover:text-white"
                title="Exit Rehearsal"
              >
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Center Slide Display */}
          <div className="my-auto max-w-4xl mx-auto w-full py-8 space-y-8 text-center">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#A8C9AE]">
                Slide {currentSlide.slideNumber} · {currentSlide.durationMinutes} Min Allotted
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                {currentSlide.title}
              </h2>
              <p className="text-base md:text-lg text-[#9DA39B]">
                {currentSlide.subtitle}
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-4 text-left pt-4">
              {currentSlide.keyBullets.map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#A8C9AE] mt-2 shrink-0" />
                  <p className="text-base md:text-lg text-white leading-relaxed">{b}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-[#202422] border border-white/10 text-left max-w-2xl mx-auto text-xs text-[#9DA39B] italic">
              <span className="font-bold text-[#A8C9AE] not-italic block mb-1">Speaker Notes:</span>
              "{currentSlide.speakerNotes}"
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <button
              onClick={handlePrevSlide}
              disabled={currentSlideIndex === 0}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30"
            >
              Previous Slide
            </button>
            <span className="text-xs text-white/50 font-mono">
              Press Next to transition to next team speaker
            </span>
            <button
              onClick={handleNextSlide}
              disabled={currentSlideIndex === slides.length - 1}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-[#A8C9AE] text-[#171A18] hover:bg-[#97BCA0] disabled:opacity-30"
            >
              Next Slide
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
