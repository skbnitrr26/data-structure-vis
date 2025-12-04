import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SortingCanvas({ data }) {
  // data = [{ id, value, state: 'default' | 'compare' | 'swap' | 'sorted' }]
  
  // Calculate max value to normalize height percentages
  const maxValue = Math.max(...data.map(d => d.value), 100);

  const getColor = (state) => {
    switch(state) {
      case 'compare': return 'bg-amber-400 border-amber-500'; // Yellow
      case 'swap': return 'bg-rose-500 border-rose-600'; // Red
      case 'sorted': return 'bg-emerald-500 border-emerald-600'; // Green
      default: return 'bg-indigo-500 border-indigo-600 dark:bg-indigo-600 dark:border-indigo-500'; // Default Blue
    }
  };

  return (
    <div className="w-full h-full flex items-end justify-center gap-1 px-4 pb-4">
      <AnimatePresence>
        {data.map((item) => (
          <motion.div
            layout
            key={item.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: 1, 
              height: `${(item.value / maxValue) * 80}%`, // Height relative to max
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`
              flex-1 rounded-t-md border-x border-t shadow-sm transition-colors duration-200
              ${getColor(item.state)}
              min-w-[10px] max-w-[40px]
              relative group
            `}
          >
            {/* Tooltip for Value */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
              {item.value}
            </div>
            
            {/* Value label inside bar if tall enough */}
            {(item.value / maxValue) > 0.15 && (
               <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-white/90 font-mono hidden sm:block">
                 {item.value}
               </span>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
      
      {data.length === 0 && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 text-slate-400 dark:text-slate-500 text-sm italic">Generate an Array to Sort</div>}
    </div>
  );
}