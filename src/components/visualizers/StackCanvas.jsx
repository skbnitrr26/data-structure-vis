import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function StackCanvas({ data, highlightIndex }) {
  return (
    <div className="flex flex-col items-center justify-end w-48 h-full pb-8 bg-slate-200/50 dark:bg-slate-900/50 rounded-b-xl border-b-4 border-slate-300 dark:border-slate-600 relative transition-colors duration-300">
      {/* Container Visual (Glass effect) */}
      <div className="absolute inset-0 border-l-4 border-r-4 border-slate-300 dark:border-slate-600 rounded-b-xl pointer-events-none opacity-50"></div>
      
      <AnimatePresence mode='popLayout'>
        {data.map((item, index) => (
          <motion.div
            layout
            key={item.id}
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1, 
              // We remove backgroundColor here to let Tailwind classes handle it
            }}
            exit={{ opacity: 0, scale: 0.5, x: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`
              w-40 h-14 mb-1 rounded-lg shadow-sm border flex items-center justify-center font-bold z-10 text-sm transition-colors duration-300
              ${highlightIndex === index 
                ? 'bg-amber-400 border-amber-500 text-white' // Highlight overrides everything
                : index === 0 
                  ? 'bg-indigo-50 dark:bg-indigo-900/40 border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300' // Top Item
                  : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200' // Standard Item
              }
            `}
          >
            {item.value}
            {index === 0 && <span className="absolute right-2 text-[10px] text-indigo-400 dark:text-indigo-300 font-mono uppercase">Top</span>}
          </motion.div>
        ))}
      </AnimatePresence>
      
      {data.length === 0 && <div className="absolute bottom-4 text-slate-400 dark:text-slate-500 text-sm">Empty Stack</div>}
    </div>
  );
}