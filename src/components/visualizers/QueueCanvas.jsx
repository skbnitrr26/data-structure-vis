import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function QueueCanvas({ data, highlightIndex }) {
  return (
    <div className="flex flex-row items-center gap-2 w-full overflow-x-auto px-10 py-20 min-h-[200px]">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 dark:text-slate-500 rotate-90 origin-left">FRONT</div>
      
      <AnimatePresence mode='popLayout'>
        {data.map((item, index) => (
          <motion.div
            layout
            key={item.id}
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              scale: 1, 
            }}
            exit={{ opacity: 0, y: -50, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`
              min-w-[80px] h-20 rounded-xl shadow-md border-2 flex flex-col items-center justify-center relative transition-colors duration-300
              ${highlightIndex === index 
                ? 'bg-amber-400 border-amber-500 text-white' 
                : index === 0 
                  ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-400 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300' // Front Item
                  : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200' // Standard Item
              }
            `}
          >
            <span className="text-sm font-bold">{item.value}</span>
            <span className="text-[10px] opacity-60 absolute bottom-1 font-mono">{index}</span>
          </motion.div>
        ))}
      </AnimatePresence>

      {data.length === 0 && <div className="text-slate-400 dark:text-slate-500 text-sm w-full text-center">Empty Queue</div>}
      {data.length > 0 && <div className="absolute right-0 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 dark:text-slate-500 -rotate-90 origin-right">REAR</div>}
    </div>
  );
}