import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function BinaryTreeCanvas({ data, highlightIndex }) {
  return (
    <div className="w-full h-full relative flex justify-center pt-8">
       {/* Edges (Lines) */}
       <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
         {data.map((node) => {
           if (!node.parentX) return null;
           return (
             <motion.line
               key={`line-${node.id}`}
               initial={{ pathLength: 0, opacity: 0 }}
               animate={{ pathLength: 1, opacity: 1 }}
               x1={`${node.parentX}%`}
               y1={node.parentY}
               x2={`${node.x}%`}
               y2={node.y}
               strokeWidth="2"
               className="stroke-slate-300 dark:stroke-slate-600 transition-colors duration-300"
             />
           );
         })}
       </svg>

       {/* Nodes (Circles) */}
       <AnimatePresence>
         {data.map((node, index) => (
           <motion.div
             key={node.id}
             initial={{ scale: 0, opacity: 0 }}
             animate={{ 
               scale: 1, 
               opacity: 1,
               left: `${node.x}%`,
               top: node.y,
             }}
             exit={{ scale: 0, opacity: 0 }}
             transition={{ type: "spring", stiffness: 200, damping: 20 }}
             style={{ position: 'absolute', x: '-50%' }}
             className={`
               w-10 h-10 rounded-full border-2 flex items-center justify-center 
               font-bold text-xs shadow-md z-10 transition-colors duration-300
               ${highlightIndex === index 
                 ? 'bg-amber-400 border-amber-500 text-white' 
                 : 'bg-white dark:bg-slate-800 border-indigo-200 dark:border-indigo-600 text-slate-700 dark:text-slate-200'
               }
             `}
           >
             {node.value}
           </motion.div>
         ))}
       </AnimatePresence>

       {data.length === 0 && <div className="text-slate-400 dark:text-slate-500 text-sm mt-32 italic">Empty Tree</div>}
    </div>
  );
}