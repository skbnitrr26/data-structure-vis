import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LinkedListCanvas({ data, highlightIndex }) {
  return (
    <div className="flex flex-wrap items-center justify-start gap-0 w-full px-10">
      <div className="mr-4 text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase">Head</div>
      
      <AnimatePresence mode='popLayout'>
        {data.map((item, index) => (
          <motion.div
            layout
            key={item.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
            }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="flex items-center group"
          >
            {/* Node Box */}
            <div className={`
              w-24 h-16 border-2 rounded-lg flex overflow-hidden shadow-lg relative z-10 transition-colors duration-300
              ${highlightIndex === index 
                ? 'bg-amber-400 border-amber-500 text-white' 
                : 'bg-white dark:bg-slate-800 border-indigo-600 dark:border-indigo-500'
              }
            `}>
              {/* Value Section */}
              <div className={`
                w-2/3 flex items-center justify-center text-sm font-bold border-r transition-colors duration-300
                ${highlightIndex === index 
                  ? 'border-amber-300 text-white'
                  : 'text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                }
              `}>
                {item.value}
              </div>
              
              {/* Pointer Section */}
              <div className={`
                w-1/3 flex items-center justify-center transition-colors duration-300
                ${highlightIndex === index ? 'bg-amber-500' : 'bg-indigo-50 dark:bg-indigo-900/50'}
              `}>
                <div className={`
                  w-2 h-2 rounded-full 
                  ${highlightIndex === index ? 'bg-white' : 'bg-indigo-400 dark:bg-indigo-500'}
                `}></div>
              </div>
            </div>
            
            {/* Arrow Connection */}
            {index !== data.length - 1 ? (
              <div className="w-12 h-1 bg-indigo-300 dark:bg-indigo-600 mx-1 relative">
                  <div className="absolute -right-1 -top-1 border-t-4 border-b-4 border-l-8 border-t-transparent border-b-transparent border-l-indigo-300 dark:border-l-indigo-600"></div>
              </div>
            ) : (
              <div className="ml-2 flex flex-col items-center">
                  <div className="text-2xl text-slate-300 dark:text-slate-600">×</div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-600">NULL</span>
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
      
      {data.length === 0 && <div className="text-slate-400 dark:text-slate-500 text-sm italic ml-4">Null (List Empty)</div>}
    </div>
  );
}