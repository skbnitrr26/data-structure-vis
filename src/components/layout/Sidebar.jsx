import React from 'react';
import { Plus, Trash2, Search, RotateCcw, ArrowLeft, PlayCircle, Shuffle, BarChart3, Zap } from 'lucide-react';
import { Button } from '../ui/Button';

// --- 1. Operations Panel ---
export function OperationsPanel({
  activeTab,
  inputValue,
  setInputValue,
  dataLength,
  onPush,
  onPop,
  onRemoveTail,
  onPeek,
  onClear,
  onTraversal,
  onRandom,
  onSort,
  isAnimating,
  speed,
  setSpeed
}) {
  const currentLabels = {
    stack: { add: 'Push', remove: 'Pop', peek: 'Peek' },
    queue: { add: 'Enqueue', remove: 'Dequeue', peek: 'Front' },
    'linked-list': { add: 'Append', remove: 'Delete Head', peek: 'Get Head' },
    'bst': { add: 'Insert', remove: 'Delete Node', peek: 'Search' },
    'sorting': { add: '', remove: '', peek: '' }
  }[activeTab] || { add: 'Add', remove: 'Remove', peek: 'Peek' };

  const isRemoveDisabled = isAnimating || dataLength === 0;
  const isPeekDisabled = isAnimating || (activeTab === 'bst' ? !inputValue && dataLength === 0 : dataLength === 0);
  const isGeneralDisabled = isAnimating;

  // Render Logic Helper
  const renderInputSection = () => {
    // Hide manual input for Sorting (use Randomize instead)
    if (activeTab === 'sorting') return null;

    return (
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={activeTab === 'bst' ? "Enter value..." : "Enter value..."}
          className="flex-1 px-4 py-2 border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all disabled:opacity-50"
          onKeyDown={(e) => e.key === 'Enter' && onPush()}
          disabled={isGeneralDisabled}
        />
        {/* Random button for BST to quickly fill tree */}
        {activeTab === 'bst' && (
           <button
             onClick={onRandom}
             disabled={isGeneralDisabled || dataLength >= 15}
             className="p-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 transition-colors"
             title="Add Random Node"
           >
             <Shuffle className="w-5 h-5" />
           </button>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 transition-colors duration-300">
      <h2 className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">Operations</h2>
      
      {renderInputSection()}

      {/* Grid Layouts: Use 3 cols for BST AND Sorting now */}
      <div className={`grid gap-3 ${(activeTab === 'bst' || activeTab === 'sorting') ? 'grid-cols-3' : 'grid-cols-2'}`}>
        
        {/* --- STANDARD LAYOUT (Stack, Queue, LL) --- */}
        {activeTab !== 'bst' && activeTab !== 'sorting' && (
          <>
            <Button onClick={onPush} disabled={!inputValue || isGeneralDisabled} variant="primary" icon={<Plus className="w-4 h-4" />} label={currentLabels.add} />
            <Button onClick={onPop} disabled={isRemoveDisabled} variant="destructive" icon={<Trash2 className="w-4 h-4" />} label={currentLabels.remove} />
            <Button onClick={onPeek} disabled={isPeekDisabled} icon={<Search className="w-4 h-4" />} label={currentLabels.peek} />

            {activeTab === 'linked-list' ? (
              <Button onClick={onRemoveTail} disabled={dataLength === 0 || isGeneralDisabled} variant="destructive" className="bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-900/50" icon={<ArrowLeft className="w-4 h-4" />} label="Delete Tail" />
            ) : (
              <Button onClick={onClear} disabled={dataLength === 0 || isGeneralDisabled} icon={<RotateCcw className="w-4 h-4" />} label="Reset" />
            )}

            {activeTab === 'linked-list' && (
              <Button onClick={onClear} disabled={dataLength === 0 || isGeneralDisabled} icon={<RotateCcw className="w-4 h-4" />} label="Reset" className="col-span-2 mt-2" />
            )}
          </>
        )}

        {/* --- BST TAB LAYOUT --- */}
        {activeTab === 'bst' && (
          <>
            <Button onClick={onPush} disabled={!inputValue || isGeneralDisabled} variant="primary" icon={<Plus className="w-4 h-4" />} label="Insert" />
            <Button onClick={onPop} disabled={isRemoveDisabled} variant="destructive" icon={<Trash2 className="w-4 h-4" />} label="Delete Node" />
            <Button onClick={onPeek} disabled={isPeekDisabled} icon={<Search className="w-4 h-4" />} label="Search" />
            
            <Button onClick={() => onTraversal('inorder')} disabled={dataLength === 0 || isGeneralDisabled} icon={<PlayCircle className="w-4 h-4" />} label="Inorder" />
            <Button onClick={() => onTraversal('preorder')} disabled={dataLength === 0 || isGeneralDisabled} icon={<PlayCircle className="w-4 h-4" />} label="Preorder" />
            <Button onClick={() => onTraversal('postorder')} disabled={dataLength === 0 || isGeneralDisabled} icon={<PlayCircle className="w-4 h-4" />} label="Postorder" />
            
            <Button onClick={onClear} disabled={dataLength === 0 || isGeneralDisabled} icon={<RotateCcw className="w-4 h-4" />} label="Reset" className="col-span-3 mt-2" />
          </>
        )}

        {/* --- SORTING TAB LAYOUT --- */}
        {activeTab === 'sorting' && (
          <>
            {/* Row 1: Randomize (Full Width) */}
            <Button 
              onClick={onRandom} 
              disabled={isGeneralDisabled} 
              variant="primary" 
              icon={<Shuffle className="w-4 h-4" />} 
              label="Randomize Array" 
              className="col-span-3"
            />
            
            <div className="col-span-3 border-t border-slate-100 dark:border-slate-700 my-1"></div>

            {/* Row 2: Sort Algorithms (3 Cols) */}
            <Button onClick={() => onSort('bubble')} disabled={dataLength <= 1 || isGeneralDisabled} icon={<BarChart3 className="w-4 h-4" />} label="Bubble" />
            <Button onClick={() => onSort('selection')} disabled={dataLength <= 1 || isGeneralDisabled} icon={<BarChart3 className="w-4 h-4" />} label="Selection" />
            <Button onClick={() => onSort('insertion')} disabled={dataLength <= 1 || isGeneralDisabled} icon={<BarChart3 className="w-4 h-4" />} label="Insertion" />
            
            {/* Row 3: Reset (Full Width) */}
            <Button onClick={onClear} disabled={dataLength === 0 || isGeneralDisabled} icon={<RotateCcw className="w-4 h-4" />} label="Reset" className="col-span-3 mt-2" />
          </>
        )}
      </div>

      {/* Animation Speed Slider (Visible only for Sorting & BST) */}
      {(activeTab === 'sorting' || activeTab === 'bst') && setSpeed && (
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
            <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> Animation Speed</span>
            <span>{speed}ms</span>
          </div>
          <input
            type="range"
            min="50"
            max="1000"
            step="50"
            value={speed || 500} 
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={isAnimating}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 mt-1">
            <span>Fast</span>
            <span>Slow</span>
          </div>
        </div>
      )}
    </div>
  );
}

// --- 2. Algorithm Panel ---
export function AlgorithmPanel({ activeTab }) {
  return (
    <div className="bg-indigo-900 dark:bg-indigo-950 text-indigo-50 rounded-xl shadow-lg p-5 transition-colors duration-300">
      <h2 className="text-sm font-bold text-indigo-300 uppercase tracking-wider mb-2">Algorithm Logic</h2>
      <div className="text-sm leading-relaxed space-y-2 text-indigo-100/90">
        {activeTab === 'stack' && <p><strong>LIFO:</strong> Last In, First Out. Add/Remove from top.</p>}
        {activeTab === 'queue' && <p><strong>FIFO:</strong> First In, First Out. Add rear, remove front.</p>}
        {activeTab === 'linked-list' && <p><strong>Linked List:</strong> Linear nodes. Append O(n), Delete Head O(1).</p>}
        {activeTab === 'bst' && (
          <>
            <p><strong>Binary Search Tree:</strong></p>
            <ul className="list-disc pl-4 opacity-80 space-y-1">
              <li><strong>Insert:</strong> Recursive (Left &lt; Root &lt; Right).</li>
              <li><strong>Delete:</strong> Replaces node with Inorder Successor.</li>
            </ul>
          </>
        )}
        {activeTab === 'sorting' && (
          <>
            <p><strong>Sorting Algorithms:</strong></p>
            <ul className="list-disc pl-4 opacity-80 space-y-1">
              <li><strong>Bubble Sort:</strong> O(n²). Swaps adjacent elements.</li>
              <li><strong>Selection Sort:</strong> O(n²). Finds min element and places at start.</li>
              <li><strong>Insertion Sort:</strong> O(n²). Builds sorted array one item at a time.</li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

// --- 3. Logs Panel ---
export function LogsPanel({ logs }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 h-64 flex flex-col transition-colors duration-300">
      <h2 className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Execution Log</h2>
      <div className="flex-1 overflow-y-auto font-mono text-xs space-y-1 text-slate-600 dark:text-slate-300 custom-scrollbar">
        {logs.length === 0 && <span className="text-slate-300 dark:text-slate-600 italic">No operations yet...</span>}
        {logs.map((log, idx) => (
          <div key={idx} className="border-b border-slate-50 dark:border-slate-700 pb-1 last:border-0">{log}</div>
        ))}
      </div>
    </div>
  );
}