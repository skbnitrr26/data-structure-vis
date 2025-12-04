import React from 'react';
import { Database, Layers, List, ArrowRight, Network, BarChart3, ChevronDown, Moon, Sun } from 'lucide-react';

export function Header({ activeTab, onTabChange, isDarkMode, toggleTheme }) {
  
  const TabButton = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => onTabChange(id)}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap
        ${activeTab === id 
          ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' 
          : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'}
      `}
    >
      <Icon className="w-4 h-4"/>
      {label}
    </button>
  );

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex flex-col md:flex-row items-center justify-between shadow-sm sticky top-0 z-10 gap-4 md:gap-0 transition-colors duration-300">
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <Database className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-white">DataStruct Viz</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Interactive Learning Tool</p>
          </div>
        </div>
        
        {/* Mobile Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="md:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
      
      {/* Mobile Dropdown */}
      <div className="w-full md:hidden relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-600 dark:text-indigo-400 pointer-events-none">
          {activeTab === 'stack' && <Layers className="w-5 h-5" />}
          {activeTab === 'queue' && <List className="w-5 h-5" />}
          {activeTab === 'linked-list' && <ArrowRight className="w-5 h-5" />}
          {activeTab === 'bst' && <Network className="w-5 h-5" />}
          {activeTab === 'sorting' && <BarChart3 className="w-5 h-5" />}
        </div>
        <select 
          value={activeTab} 
          onChange={(e) => onTabChange(e.target.value)}
          className="w-full appearance-none bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-3 pl-10 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        >
          <option value="stack">Stack</option>
          <option value="queue">Queue</option>
          <option value="linked-list">Linked List</option>
          <option value="bst">Binary Search Tree</option>
          <option value="sorting">Sorting Algorithms</option>
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>

      {/* Desktop Tabs */}
      <div className="hidden md:flex items-center gap-4">
        <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-lg overflow-x-auto flex transition-colors duration-300">
          <TabButton id="stack" icon={Layers} label="Stack" />
          <TabButton id="queue" icon={List} label="Queue" />
          <TabButton id="linked-list" icon={ArrowRight} label="Linked List" />
          <TabButton id="bst" icon={Network} label="Binary Tree" />
          <TabButton id="sorting" icon={BarChart3} label="Sorting" />
        </div>
        
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          title="Toggle Theme"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
}