import React from 'react';

interface SectionCardProps {
  title: string;
  icon: React.ElementType;
  colorClass: string;
  children: React.ReactNode;
}

export const SectionCard: React.FC<SectionCardProps> = ({ title, icon: Icon, colorClass, children }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${colorClass} bg-opacity-10`}>
          <Icon size={24} className={colorClass.replace('bg-', 'text-')} />
        </div>
        <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
      </div>
      <div className="text-slate-600 leading-relaxed">
        {children}
      </div>
    </div>
  );
};