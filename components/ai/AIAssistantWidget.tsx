'use client';

import React, { useState } from 'react';
import { Bot, Send, X, Sparkles, User, Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  suggestions?: string[];
}

export function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: 'Hello! I am your RailPulse AI Assistant. Ask me anything about train positions, delay reasons, connections, or best routes.',
      suggestions: ['Where is 12002?', 'Why is 12951 delayed?', 'Best train from Delhi to Lucknow?'],
    },
  ]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = { sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });
      const json = await res.json();

      if (json.success && json.data) {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: json.data.reply,
            suggestions: json.data.suggestions,
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'Sorry, I could not process your query right now. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 shadow-2xl shadow-cyan-500/30 hover:scale-105 transition-all"
        title="RailPulse AI Assistant"
      >
        <Bot className="h-7 w-7" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400 text-[9px] font-bold font-mono text-slate-950">
          AI
        </span>
      </button>

      {/* Chat Drawer */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-3xl glass-panel border-slate-800 shadow-2xl p-4 flex flex-col h-[520px] font-sans">
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm font-mono">RailPulse AI Assistant</h3>
                <p className="text-[10px] text-emerald-400 font-mono">Gemini Transit Engine Active</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto py-3 space-y-3 font-sans text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={cn('flex flex-col space-y-1', m.sender === 'user' ? 'items-end' : 'items-start')}
              >
                <div
                  className={cn(
                    'rounded-2xl p-3 max-w-[85%] whitespace-pre-wrap leading-relaxed',
                    m.sender === 'user'
                      ? 'bg-cyan-500 text-slate-950 font-semibold'
                      : 'bg-slate-900 border border-slate-800 text-slate-200'
                  )}
                >
                  {m.text}
                </div>

                {/* Quick Suggestion Chips */}
                {m.suggestions && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {m.suggestions.map((s, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleSend(s)}
                        className="rounded-lg bg-slate-800/80 px-2 py-1 text-[10px] font-mono text-cyan-400 hover:bg-cyan-500/20 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 py-2">
                <Loader2 className="h-4 w-4 text-cyan-400 animate-spin" />
                <span>Analyzing transit mesh...</span>
              </div>
            )}
          </div>

          {/* Input Footer */}
          <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about trains or delays..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-500"
            />
            <button
              onClick={() => handleSend()}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors flex-shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
