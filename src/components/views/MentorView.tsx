import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Copy, 
  Check, 
  BookmarkPlus, 
  Loader2, 
  Trash2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

const PRESET_PROMPTS = [
  'How should I structure the database to avoid N+1 query bottlenecks?',
  'What are the toughest viva questions professors ask on this tech stack?',
  'Help me formulate 4 measurable functional requirements in IEEE 830 format',
  'Review my architecture: should I adopt microservices or stick to a modular monolith?',
  'How can we demonstrate offline resilience for our paramedic PWA during defense?'
];

export const MentorView: React.FC = () => {
  const { project, addNote } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      role: 'model',
      content: `Hello! I am your **FYP Academic Mentor**. 

I have loaded your active project context:
- **Title:** ${project.title}
- **Category:** ${project.category}
- **Current Phase:** ${project.currentPhase}
- **Tech Stack:** ${project.techStack.join(', ')}

Whether you need guidance designing database schemas, architecting RESTful contracts, structuring IEEE SRS documentation, or preparing for viva cross-examinations, I'm here to assist. What technical or architectural question are you exploring today?`,
      timestamp: '10:00 AM'
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const promptText = (textToSend || input).trim();
    if (!promptText || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/mentor-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
          projectContext: {
            title: project.title,
            category: project.category,
            techStack: project.techStack,
            currentPhase: project.currentPhase,
            problemStatement: project.problemStatement
          }
        })
      });

      if (!response.ok) {
        throw new Error('Mentor service failed to respond.');
      }

      const data = await response.json();
      const modelMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        content: data.reply || 'I analyzed your query. Let us examine the software architecture principles involved...',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, modelMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        content: `Error: Unable to connect to mentor backend. ${err.message || 'Please check your connection.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveToNotes = (id: string, text: string) => {
    addNote({
      title: `Mentor Advice: ${text.slice(0, 45)}...`,
      category: 'Architecture Decision',
      content: text
    });
    setSavedId(id);
    setTimeout(() => setSavedId(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4 flex flex-col h-[calc(100vh-140px)]">
      {/* Header Banner */}
      <div className="p-4 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 shadow-xs flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-[#EEF5EF] dark:bg-[#202E24] text-[#55825D] dark:text-[#A8C9AE] flex items-center justify-center font-bold">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-[#292D2B] dark:text-white">
                FYP Project Mentor
              </h2>
              <span className="text-[11px] font-mono text-[#55825D] dark:text-[#A8C9AE] font-semibold">
                Context-Aware · {project.title.slice(0, 30)}...
              </span>
            </div>
            <p className="text-[11px] text-[#858982]">
              Senior Software Architect & Thesis Committee Advisor powered by Gemini
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="p-1.5 text-xs text-[#858982] hover:text-[#292D2B] dark:hover:text-white rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center gap-1"
          title="Clear chat history"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Clear</span>
        </button>
      </div>

      {/* Preset Prompts Pill Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none shrink-0">
        <span className="text-[11px] font-bold text-[#858982] shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#E2BC57]" /> Prompts:
        </span>
        {PRESET_PROMPTS.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(prompt)}
            className="text-[11px] px-3 py-1 rounded-full bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-white hover:bg-[#EEF5EF] dark:hover:bg-[#202E24] border border-[#292D2B]/8 dark:border-white/8 transition-colors whitespace-nowrap shrink-0 font-medium"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-5 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 shadow-xs space-y-4">
        {messages.map((m) => {
          const isUser = m.role === 'user';

          return (
            <div
              key={m.id}
              className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                  isUser
                    ? 'bg-[#292D2B] text-white dark:bg-white dark:text-[#292D2B]'
                    : 'bg-[#EEF5EF] text-[#55825D] dark:bg-[#202E24] dark:text-[#A8C9AE]'
                }`}
              >
                {isUser ? 'U' : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`p-4 rounded-3xl text-xs leading-relaxed space-y-2 group relative ${
                  isUser
                    ? 'bg-[#96BD9D] dark:bg-[#A8C9AE] text-white dark:text-[#171A18] font-medium'
                    : 'bg-[#FAF9F5] dark:bg-[#272C29] text-[#292D2B] dark:text-[#F2F1ED] border border-[#292D2B]/6 dark:border-white/6'
                }`}
              >
                <div className="whitespace-pre-wrap font-sans">
                  {m.content}
                </div>

                <div className="flex items-center justify-between pt-1 text-[10px] opacity-75">
                  <span>{m.timestamp}</span>

                  {!isUser && (
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleCopy(m.id, m.content)}
                        className="hover:text-[#55825D] flex items-center gap-1"
                        title="Copy answer"
                      >
                        {copiedId === m.id ? <Check className="w-3 h-3 text-[#55825D]" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === m.id ? 'Copied' : 'Copy'}</span>
                      </button>
                      <button
                        onClick={() => handleSaveToNotes(m.id, m.content)}
                        className="hover:text-[#55825D] flex items-center gap-1"
                        title="Save to Project Notes"
                      >
                        {savedId === m.id ? <Check className="w-3 h-3 text-[#55825D]" /> : <BookmarkPlus className="w-3 h-3" />}
                        <span>{savedId === m.id ? 'Saved' : 'Save Note'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 max-w-xl">
            <div className="w-7 h-7 rounded-xl bg-[#EEF5EF] text-[#55825D] flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 rounded-2xl bg-[#FAF9F5] dark:bg-[#272C29] text-xs text-[#858982] flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#55825D]" />
              <span>Analyzing software engineering principles...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-2 rounded-3xl bg-white dark:bg-[#202422] border border-[#292D2B]/8 dark:border-white/8 shadow-xs flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about architectural trade-offs, database normalization, testing protocols, or viva questions..."
          className="flex-1 px-4 py-2 text-xs bg-transparent text-[#292D2B] dark:text-white focus:outline-hidden"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-2.5 text-xs font-bold text-white bg-[#527D5D] hover:bg-[#43674D] dark:bg-[#8DBA98] dark:text-[#171A18] dark:hover:bg-[#7ba886] disabled:opacity-40 rounded-2xl transition-colors shrink-0 shadow-xs cursor-pointer"
        >
          <Send className="w-4 h-4" strokeWidth={2.2} />
        </button>
      </form>
    </div>
  );
};
