import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileText, 
  Sparkles, 
  Download, 
  Printer, 
  CheckCircle2, 
  Copy, 
  Check, 
  Loader2
} from 'lucide-react';

export const DocStudioView: React.FC = () => {
  const { project, updateDocument } = useApp();

  const [selectedDocId, setSelectedDocId] = useState<string>(project.documents[2]?.id || project.documents[0].id); // default to SRS
  const [activeMode, setActiveMode] = useState<'split' | 'edit' | 'preview'>('split');
  const [copied, setCopied] = useState(false);

  // AI Assistant state
  const [isAiDrafting, setIsAiDrafting] = useState(false);
  const [aiInstructionType, setAiInstructionType] = useState<'draft' | 'polish' | 'review'>('draft');
  const [aiSectionPrompt, setAiSectionPrompt] = useState('Functional Requirements (IEEE 830 format)');
  const [aiError, setAiError] = useState<string | null>(null);

  const currentDoc = project.documents.find(d => d.id === selectedDocId) || project.documents[0];

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateDocument(currentDoc.id, e.target.value);
  };

  const handleToggleReady = () => {
    updateDocument(currentDoc.id, currentDoc.content, !currentDoc.isReadyForSupervisor);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentDoc.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMd = () => {
    const blob = new Blob([currentDoc.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${currentDoc.type}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>${currentDoc.title} - ${project.title}</title>
          <style>
            body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.6; padding: 40px; color: #111; }
            h1 { font-size: 20pt; text-align: center; margin-bottom: 24px; }
            h2 { font-size: 16pt; border-bottom: 1px solid #333; padding-bottom: 4px; margin-top: 24px; }
            h3 { font-size: 14pt; margin-top: 18px; }
            table { width: 100%; border-collapse: collapse; margin: 16px 0; }
            th, td { border: 1px solid #333; padding: 8px; text-align: left; font-size: 10pt; }
            th { background: #eee; }
            pre { background: #f4f4f4; padding: 12px; font-family: monospace; font-size: 10pt; overflow-x: auto; }
          </style>
        </head>
        <body>
          <div style="text-align: center; margin-bottom: 30px;">
            <h3>FINAL YEAR PROJECT THESIS DOCUMENTATION</h3>
            <h2>${project.title}</h2>
            <p><strong>Document:</strong> ${currentDoc.title} | <strong>Last Updated:</strong> ${currentDoc.lastUpdated}</p>
          </div>
          <hr />
          <pre style="white-space: pre-wrap; font-family: inherit; background: transparent; border: none; padding: 0;">${currentDoc.content}</pre>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  const handleRunAiAssist = async () => {
    setIsAiDrafting(true);
    setAiError(null);

    try {
      const res = await fetch('/api/gemini/doc-assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          docType: currentDoc.title,
          sectionKey: currentDoc.type,
          sectionTitle: aiSectionPrompt,
          existingContent: currentDoc.content,
          projectContext: {
            title: project.title,
            category: project.category,
            problemStatement: project.problemStatement,
            proposedSolution: project.proposedSolution,
            techStack: project.techStack
          },
          instructionType: aiInstructionType
        })
      });

      if (!res.ok) {
        throw new Error('Failed to generate document assistance.');
      }

      const data = await res.json();
      if (data.content) {
        if (aiInstructionType === 'draft') {
          const updated = currentDoc.content + `\n\n### ${aiSectionPrompt}\n` + data.content;
          updateDocument(currentDoc.id, updated);
        } else {
          updateDocument(currentDoc.id, data.content);
        }
      }
    } catch (err: any) {
      setAiError(err.message || 'Error running AI document assistant.');
    } finally {
      setIsAiDrafting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#4A8DAF] dark:text-[#9FD0E6] mb-1">
            <FileText className="w-4 h-4" />
            <span>Academic Documentation Studio</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#858982]">IEEE 830 & ABET Compliant Standards</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#292D2B] dark:text-white tracking-tight">
            Author & Export Your Thesis Documents
          </h1>
          <p className="mt-1 text-xs text-[#858982] dark:text-[#9DA39B] max-w-2xl">
            Author your Proposal, SRS, Architecture, Database Dictionary, and Final Thesis chapters with formal academic standards, live Markdown preview, and AI-assisted drafting.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-2 text-xs font-semibold rounded-xl border border-[#292D2B]/8 dark:border-white/8 hover:bg-[#FAF9F5] text-[#292D2B] dark:text-white transition-colors flex items-center gap-1.5"
            title="Copy document to clipboard"
          >
            {copied ? <Check className="w-4 h-4 text-[#55825D]" /> : <Copy className="w-4 h-4" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <button
            onClick={handleDownloadMd}
            className="p-2 text-xs font-semibold rounded-xl border border-[#292D2B]/8 dark:border-white/8 hover:bg-[#FAF9F5] text-[#292D2B] dark:text-white transition-colors flex items-center gap-1.5"
            title="Download as Markdown"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export .MD</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 text-xs font-bold text-white dark:text-[#171A18] bg-[#96BD9D] hover:bg-[#83AA8A] dark:bg-[#A8C9AE] rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            title="Print or Save as PDF"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Document Selector Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto p-1.5 bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 rounded-3xl scrollbar-none shadow-xs">
        {project.documents.map((doc) => {
          const isSelected = doc.id === currentDoc.id;
          return (
            <button
              key={doc.id}
              onClick={() => setSelectedDocId(doc.id)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                isSelected
                  ? 'bg-[#292D2B] dark:bg-white text-white dark:text-[#292D2B] font-bold shadow-xs'
                  : 'text-[#858982] hover:text-[#292D2B] dark:hover:text-white hover:bg-[#FAF9F5] dark:hover:bg-[#272C29]'
              }`}
            >
              <span>{doc.title.split(' ')[0]}</span>
              {doc.isReadyForSupervisor && (
                <CheckCircle2 className={`w-3.5 h-3.5 ${isSelected ? 'text-[#A8C9AE] dark:text-[#55825D]' : 'text-[#55825D]'}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* AI Drafting Toolbar (Soft Sky Blue pastel) */}
      <div className="p-4 rounded-3xl bg-[#EDF6FA] dark:bg-[#1C2C35] border border-[#8EC4DC]/40 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#4A8DAF] dark:text-[#9FD0E6]" />
          <span className="text-xs font-bold text-[#292D2B] dark:text-white">
            AI Academic Drafting Assistant:
          </span>
          <select
            value={aiInstructionType}
            onChange={(e) => setAiInstructionType(e.target.value as any)}
            className="text-xs bg-white dark:bg-[#202422] border border-[#8EC4DC]/40 rounded-xl px-2.5 py-1 text-[#292D2B] dark:text-white"
          >
            <option value="draft">Draft New Section</option>
            <option value="polish">Polish Academic Tone</option>
            <option value="review">Review IEEE Compliance</option>
          </select>
        </div>

        <div className="flex items-center gap-2 flex-1 max-w-md">
          <input
            type="text"
            value={aiSectionPrompt}
            onChange={(e) => setAiSectionPrompt(e.target.value)}
            placeholder="Section (e.g. Non-Functional Requirements, Use Case 01)..."
            className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-[#8EC4DC]/40 bg-white dark:bg-[#202422] text-[#292D2B] dark:text-white"
          />
          <button
            onClick={handleRunAiAssist}
            disabled={isAiDrafting}
            className="px-3.5 py-1.5 text-xs font-bold text-white dark:text-[#171A18] bg-[#96BD9D] hover:bg-[#83AA8A] dark:bg-[#A8C9AE] rounded-xl flex items-center gap-1.5 shrink-0 disabled:opacity-50 shadow-xs"
          >
            {isAiDrafting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            <span>Generate</span>
          </button>
        </div>
      </div>

      {aiError && (
        <div className="p-3 rounded-2xl bg-[#F9EDF0] text-xs text-[#BD6C7B] border border-[#E0AEB8]/40">
          {aiError}
        </div>
      )}

      {/* Editor & Preview Area */}
      <div className="rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 shadow-xs overflow-hidden">
        {/* Editor Sub-Header */}
        <div className="p-4 border-b border-[#292D2B]/6 dark:border-white/6 flex flex-wrap items-center justify-between gap-3 bg-[#FAF9F5] dark:bg-[#272C29]">
          <div>
            <h2 className="text-sm font-bold text-[#292D2B] dark:text-white">
              {currentDoc.title}
            </h2>
            <p className="text-[11px] text-[#858982]">
              {currentDoc.description} · Last saved: {currentDoc.lastUpdated}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleReady}
              className={`px-3 py-1 text-xs font-semibold rounded-xl border transition-colors flex items-center gap-1.5 ${
                currentDoc.isReadyForSupervisor
                  ? 'bg-[#EEF5EF] dark:bg-[#202E24] text-[#55825D] dark:text-[#A8C9AE] border-[#96BD9D]/40'
                  : 'bg-white dark:bg-[#202422] text-[#858982] border-[#292D2B]/8 dark:border-white/8 hover:bg-[#FAF9F5]'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{currentDoc.isReadyForSupervisor ? 'Ready for Supervisor' : 'Draft In Progress'}</span>
            </button>

            {/* Mode Switcher */}
            <div className="flex items-center gap-1 p-0.5 bg-black/5 dark:bg-white/10 rounded-xl">
              <button
                onClick={() => setActiveMode('edit')}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                  activeMode === 'edit'
                    ? 'bg-white dark:bg-[#202422] text-[#292D2B] dark:text-white font-bold shadow-2xs'
                    : 'text-[#858982]'
                }`}
              >
                Editor
              </button>
              <button
                onClick={() => setActiveMode('split')}
                className={`hidden md:inline px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                  activeMode === 'split'
                    ? 'bg-white dark:bg-[#202422] text-[#292D2B] dark:text-white font-bold shadow-2xs'
                    : 'text-[#858982]'
                }`}
              >
                Split
              </button>
              <button
                onClick={() => setActiveMode('preview')}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                  activeMode === 'preview'
                    ? 'bg-white dark:bg-[#202422] text-[#292D2B] dark:text-white font-bold shadow-2xs'
                    : 'text-[#858982]'
                }`}
              >
                Preview
              </button>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#292D2B]/8 dark:divide-white/8 min-h-[580px]">
          {/* Markdown Textarea */}
          {(activeMode === 'edit' || activeMode === 'split') && (
            <div className={`${activeMode === 'edit' ? 'col-span-2' : ''} p-4 flex flex-col`}>
              <textarea
                value={currentDoc.content}
                onChange={handleContentChange}
                placeholder="Write your document content using standard Markdown..."
                className="w-full flex-1 p-3 text-xs font-mono leading-relaxed bg-transparent text-[#292D2B] dark:text-[#F2F1ED] border-none focus:outline-hidden resize-none min-h-[520px]"
              />
            </div>
          )}

          {/* Rendered Preview */}
          {(activeMode === 'preview' || activeMode === 'split') && (
            <div className={`${activeMode === 'preview' ? 'col-span-2' : ''} p-6 overflow-y-auto max-h-[640px] bg-[#FAF9F5] dark:bg-[#171A18]/60`}>
              <div className="text-xs leading-relaxed space-y-3 font-sans text-[#292D2B] dark:text-[#F2F1ED] whitespace-pre-wrap">
                {currentDoc.content}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
