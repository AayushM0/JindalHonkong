import React, { useState } from 'react';

const THEME_CLASSES = {
  blue: {
    collapsedIcon: 'bg-blue-50 text-primary',
    expandedIcon: 'bg-primary text-white shadow-primary/20',
    expandedBorder: 'border-blue-300/60 shadow-blue-500/5'
  },
  emerald: {
    collapsedIcon: 'bg-emerald-50 text-emerald-600',
    expandedIcon: 'bg-emerald-600 text-white shadow-emerald-500/20',
    expandedBorder: 'border-emerald-300/60 shadow-emerald-500/5'
  }
};

const ExpandOnHover = ({ services }) => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  return (
    <div className="w-full py-4">
      {/* Container: Column on mobile, row on desktop */}
      <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-center gap-4 w-full px-2 select-none">
        {services.map((service, idx) => {
          const Icon = service.icon;
          const isExpanded = idx === expandedIndex;
          const theme = THEME_CLASSES[service.themeKey || 'blue'];

          return (
            <div
              key={idx}
              className={`relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 ease-in-out group w-full lg:h-[15rem] border ${
                isExpanded 
                  ? `bg-white h-[11rem] lg:w-96 shadow-lg border-slate-300/80 ${theme.expandedBorder}` 
                  : 'bg-[#f8fafc] h-[4.5rem] lg:w-20 border-slate-200 hover:bg-white hover:border-slate-300'
              }`}
              onMouseEnter={() => setExpandedIndex(idx)}
            >
              {/* Content area */}
              <div className="absolute inset-0 z-10 w-full h-full p-4 lg:p-5">
                {/* Collapsed state content */}
                {!isExpanded && (
                  <div className="absolute inset-0 p-4 flex lg:flex-col items-center justify-between lg:justify-between h-full w-full animate-fade-in">
                    {/* Centered Icon */}
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${theme.collapsedIcon}`}>
                      <Icon size={20} />
                    </div>
                    {/* Title for mobile (horizontal) */}
                    <h3 className="lg:hidden text-slate-700 font-bold text-sm ml-4 flex-grow text-left">
                      {service.title}
                    </h3>
                    {/* Title for desktop (vertical rotated) */}
                    <h3 
                      className="hidden lg:block text-slate-600 font-bold text-xs tracking-wider uppercase whitespace-nowrap origin-center"
                      style={{
                        writingMode: 'vertical-lr',
                        transform: 'rotate(180deg)'
                      }}
                    >
                      {service.title}
                    </h3>
                  </div>
                )}

                {/* Expanded state content */}
                {isExpanded && (
                  <div className="absolute inset-0 p-5 flex flex-col justify-end h-full w-full animate-fade-in">
                    {/* Icon Header Box */}
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 shrink-0 shadow-md ${theme.expandedIcon}`}>
                      <Icon size={20} />
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-extrabold mb-1.5 text-slate-900">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-500 text-xs leading-relaxed max-w-sm animate-blur-fade">
                      {service.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpandOnHover;
