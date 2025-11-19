import React from 'react';
import { Terminal } from 'lucide-react';

interface TerminalBlockProps {
  title: string;
  children: React.ReactNode;
}

export const TerminalBlock: React.FC<TerminalBlockProps> = ({ title, children }) => {
  return (
    <div className="rounded-lg overflow-hidden border border-slate-700 shadow-lg my-4 bg-[#1e1e1e]">
      <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-black/20">
        <Terminal size={16} className="text-slate-400" />
        <span className="text-xs text-slate-400 font-mono font-bold uppercase tracking-wider">{title}</span>
        <div className="flex gap-1.5 ml-auto">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
      </div>
      <div className="p-4 font-mono text-sm text-gray-100 leading-relaxed overflow-x-auto">
        {children}
      </div>
    </div>
  );
};