'use client';

import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';

interface VoiceSearchProps {
  onTranscript: (text: string) => void;
}

export function VoiceSearch({ onTranscript }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false);

  const startVoiceSearch = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser environment.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-IN';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (transcript) {
        onTranscript(transcript);
      }
    };

    recognition.start();
  };

  return (
    <button
      type="button"
      onClick={startVoiceSearch}
      className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all border ${
        isListening
          ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse'
          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-cyan-400 hover:border-cyan-500/30'
      }`}
      title={isListening ? 'Listening...' : 'Voice Search'}
    >
      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
    </button>
  );
}
