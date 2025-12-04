import React from 'react';
import { twMerge } from 'tailwind-merge';

export function Button({ 
  onClick, 
  disabled, 
  icon, 
  label, 
  variant = 'default', // default, primary, destructive
  className 
}) {
  
  const baseStyles = "flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    default: "bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 hover:border-indigo-200 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400",
    
    primary: "bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 hover:shadow-indigo-200 border border-transparent",
    
    destructive: "bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:border-rose-300"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled} 
      className={twMerge(baseStyles, variants[variant], className)}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}