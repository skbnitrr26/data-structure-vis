import React, { useState, useRef } from 'react';
import { Header } from './components/layout/Header';
import { OperationsPanel, AlgorithmPanel, LogsPanel } from './components/layout/Sidebar';
import { StackCanvas } from './components/visualizers/StackCanvas';
import { QueueCanvas } from './components/visualizers/QueueCanvas';
import { LinkedListCanvas } from './components/visualizers/LinkedListCanvas';
import { BinaryTreeCanvas } from './components/visualizers/BinaryTreeCanvas';
import { SortingCanvas } from './components/visualizers/SortingCanvas';

// --- BST Logic Classes ---
class BSTNode {
  constructor(value) {
    this.id = crypto.randomUUID();
    this.value = value;
    this.left = null;
    this.right = null;
    this.x = 0;
    this.y = 0;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new BSTNode(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  remove(value) {
    this.root = this._removeNode(this.root, value);
  }

  _removeNode(node, value) {
    if (!node) return null;

    if (value < node.value) {
      node.left = this._removeNode(node.left, value);
      return node;
    } else if (value > node.value) {
      node.right = this._removeNode(node.right, value);
      return node;
    } else {
      if (!node.left && !node.right) return null;
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      let temp = this._findMin(node.right);
      node.value = temp.value;
      node.right = this._removeNode(node.right, temp.value);
      return node;
    }
  }

  _findMin(node) {
    while (node.left) node = node.left;
    return node;
  }

  getInorder() {
    const result = [];
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      result.push({ id: node.id, val: node.value });
      traverse(node.right);
    };
    traverse(this.root);
    return result;
  }

  getPreorder() {
    const result = [];
    const traverse = (node) => {
      if (!node) return;
      result.push({ id: node.id, val: node.value });
      traverse(node.left);
      traverse(node.right);
    };
    traverse(this.root);
    return result;
  }

  getPostorder() {
    const result = [];
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      traverse(node.right);
      result.push({ id: node.id, val: node.value });
    };
    traverse(this.root);
    return result;
  }

  getVisualData() {
    const visuals = [];
    if (!this.root) return visuals;

    const traverse = (node, x, y, level, parentX = null, parentY = null) => {
      if (!node) return;
      visuals.push({ id: node.id, value: node.value, x, y, parentX, parentY });
      const spread = 25 / Math.pow(2, level);
      traverse(node.left, x - spread, y + 60, level + 1, x, y);
      traverse(node.right, x + spread, y + 60, level + 1, x, y);
    };

    traverse(this.root, 50, 50, 0);
    return visuals;
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState('stack');
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [logs, setLogs] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [speed, setSpeed] = useState(500); // Animation speed in ms
  const bstRef = useRef(new BST());

  const addLog = (message) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${message}`, ...prev]);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleTabChange = (tab) => {
    if (isAnimating) return;
    setActiveTab(tab);
    setData([]);
    setLogs([]);
    setHighlightIndex(-1);
    if (tab === 'bst') bstRef.current = new BST();
    addLog(`Switched to ${tab.replace('-', ' ').toUpperCase()}`);
  };

  // --- Handlers ---

  const handleRandom = () => {
    if (isAnimating) return;
    
    if (activeTab === 'bst') {
      const val = Math.floor(Math.random() * 100) + 1;
      bstRef.current.insert(val);
      setData(bstRef.current.getVisualData());
      addLog(`Inserted random value ${val} into BST`);
    } else if (activeTab === 'sorting') {
      // Create random array of length 8 as requested
      const newArray = Array.from({ length: 8 }, () => ({
        id: crypto.randomUUID(),
        value: Math.floor(Math.random() * 90) + 10,
        state: 'default'
      }));
      setData(newArray);
      addLog("Generated random array");
    } else {
      // Linear structures
      if (data.length >= 10) return addLog("Full!");
      const val = Math.floor(Math.random() * 100) + 1;
      const newNode = { id: crypto.randomUUID(), value: val.toString() };
      
      if (activeTab === 'stack') setData(prev => [newNode, ...prev]);
      if (activeTab === 'queue' || activeTab === 'linked-list') setData(prev => [...prev, newNode]);
      addLog(`Added random value ${val}`);
    }
  };

  const handlePush = () => {
    if (isAnimating || !inputValue) return;
    if (activeTab !== 'bst' && activeTab !== 'sorting' && data.length >= 15) {
      addLog("Limit reached.");
      return;
    }

    const valInt = parseInt(inputValue);
    const newNode = { id: crypto.randomUUID(), value: inputValue };

    if (activeTab === 'stack') {
      addLog(`Pushing ${inputValue}...`);
      setData(prev => [newNode, ...prev]);
    } else if (activeTab === 'queue') {
      addLog(`Enqueuing ${inputValue}...`);
      setData(prev => [...prev, newNode]);
    } else if (activeTab === 'linked-list') {
      addLog(`Appending ${inputValue} to Tail...`);
      setData(prev => [...prev, newNode]);
    } else if (activeTab === 'bst') {
      if (isNaN(valInt)) return addLog("Invalid number");
      addLog(`Inserting ${valInt} into BST...`);
      bstRef.current.insert(valInt);
      setData(bstRef.current.getVisualData());
    } else if (activeTab === 'sorting') {
      if (isNaN(valInt)) return addLog("Invalid number");
      if (data.length >= 20) return addLog("Array full");
      setData(prev => [...prev, { id: crypto.randomUUID(), value: valInt, state: 'default' }]);
      addLog(`Added ${valInt} to array`);
    }
    
    setInputValue('');
  };

  const handlePop = () => {
    if (isAnimating) return;
    if (data.length === 0 && activeTab !== 'bst') return addLog("Error: Underflow");

    if (activeTab === 'stack') {
      addLog(`Popped ${data[0].value}`);
      setData(prev => prev.slice(1));
    } else if (activeTab === 'queue') {
      addLog(`Dequeued ${data[0].value}`);
      setData(prev => prev.slice(1));
    } else if (activeTab === 'linked-list') {
      addLog(`Deleted Head ${data[0].value}`);
      setData(prev => prev.slice(1));
    } else if (activeTab === 'bst') {
       if (!inputValue) return addLog("Error: Enter value to delete");
       const valInt = parseInt(inputValue);
       addLog(`Deleting node ${valInt}...`);
       bstRef.current.remove(valInt);
       setData(bstRef.current.getVisualData());
       setInputValue('');
    } else if (activeTab === 'sorting') {
      if (data.length === 0) return;
      setData(prev => {
        const newData = [...prev];
        const removed = newData.pop();
        addLog(`Removed ${removed.value}`);
        return newData;
      });
    }
  };

  const handleRemoveTail = () => {
    if (isAnimating) return;
    if (data.length === 0) return;
    const tailVal = data[data.length - 1].value;
    addLog(`Deleted Tail Node (${tailVal})`);
    setData(prev => prev.slice(0, -1));
  };

  const handlePeek = () => {
    if (isAnimating) return;
    if (data.length === 0) return;
    
    if (activeTab === 'bst' && inputValue) {
       const val = parseInt(inputValue);
       const found = data.findIndex(n => n.value === val);
       if (found !== -1) {
         setHighlightIndex(found);
         addLog(`Found ${val}!`);
         setTimeout(() => setHighlightIndex(-1), 1000);
       } else {
         addLog(`Value ${val} not found.`);
       }
       return;
    }

    setHighlightIndex(0);
    addLog(`Peeking: ${data[0].value}`);
    setTimeout(() => setHighlightIndex(-1), 1000);
  };

  const handleClear = () => {
    if (isAnimating) return;
    setData([]);
    if (activeTab === 'bst') bstRef.current = new BST();
    addLog("Cleared all data");
  };

  const handleTraversal = async (type) => {
    if (isAnimating || data.length === 0) return;
    setIsAnimating(true);
    addLog(`Starting ${type.toUpperCase()} Traversal...`);
    let sequence = [];
    if (type === 'inorder') sequence = bstRef.current.getInorder();
    if (type === 'preorder') sequence = bstRef.current.getPreorder();
    if (type === 'postorder') sequence = bstRef.current.getPostorder();

    for (let i = 0; i < sequence.length; i++) {
      const { id } = sequence[i];
      const visualIndex = data.findIndex(item => item.id === id);
      if (visualIndex !== -1) {
        setHighlightIndex(visualIndex);
        await new Promise(r => setTimeout(r, speed));
      }
    }
    setHighlightIndex(-1);
    addLog(`${type.toUpperCase()} Traversal Complete.`);
    setIsAnimating(false);
  };

  // --- Sorting Algorithms ---
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleSort = async (type) => {
    if (isAnimating || data.length <= 1) return;
    setIsAnimating(true);
    addLog(`Starting ${type.toUpperCase()} Sort...`);

    let arr = JSON.parse(JSON.stringify(data)); // Deep copy

    const updateState = async (newArr) => {
      setData(newArr);
      await sleep(speed);
    };

    if (type === 'bubble') {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
          arr[j].state = 'compare';
          arr[j+1].state = 'compare';
          await updateState([...arr]);

          if (arr[j].value > arr[j + 1].value) {
            arr[j].state = 'swap';
            arr[j+1].state = 'swap';
            await updateState([...arr]);
            
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            await updateState([...arr]);
          }

          arr[j].state = 'default';
          arr[j+1].state = 'default';
        }
        arr[arr.length - i - 1].state = 'sorted';
        await updateState([...arr]);
      }
    } 
    
    else if (type === 'selection') {
      for (let i = 0; i < arr.length; i++) {
        let minIdx = i;
        arr[i].state = 'compare';
        await updateState([...arr]);

        for (let j = i + 1; j < arr.length; j++) {
          arr[j].state = 'compare';
          await updateState([...arr]);

          if (arr[j].value < arr[minIdx].value) {
            if (minIdx !== i) arr[minIdx].state = 'default'; 
            minIdx = j;
            arr[minIdx].state = 'swap'; 
          } else {
            arr[j].state = 'default';
          }
          await updateState([...arr]);
        }

        if (minIdx !== i) {
          [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
          await updateState([...arr]);
        }
        arr[minIdx].state = 'default';
        arr[i].state = 'sorted';
        await updateState([...arr]);
      }
    }

    else if (type === 'insertion') {
      arr[0].state = 'sorted';
      for (let i = 1; i < arr.length; i++) {
        let j = i;
        arr[j].state = 'compare';
        await updateState([...arr]);

        while (j > 0 && arr[j - 1].value > arr[j].value) {
          arr[j].state = 'compare';
          arr[j-1].state = 'compare';
          await updateState([...arr]);

          [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
          
          arr[j].state = 'swap';
          arr[j-1].state = 'swap';
          await updateState([...arr]);
          
          arr[j].state = 'sorted'; 
          arr[j-1].state = 'compare'; 
          
          j--;
        }
        
        arr[j].state = 'sorted';
        for(let k=0; k<=i; k++) arr[k].state = 'sorted';
        await updateState([...arr]);
      }
    }

    // Finish
    arr.forEach(item => item.state = 'sorted');
    setData(arr);
    addLog(`Sorting Complete.`);
    setIsAnimating(false);
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900 transition-colors duration-300">
        <Header activeTab={activeTab} onTabChange={handleTabChange} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

        <main className="max-w-[95%] mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-min">
          
          <div className="lg:col-start-1 lg:row-start-1">
            <OperationsPanel 
              activeTab={activeTab}
              inputValue={inputValue}
              setInputValue={setInputValue}
              dataLength={data.length}
              isAnimating={isAnimating}
              onPush={handlePush}
              onPop={handlePop}
              onRemoveTail={handleRemoveTail} 
              onPeek={handlePeek}
              onClear={handleClear}
              onTraversal={handleTraversal}
              onRandom={handleRandom}
              onSort={handleSort}
              speed={speed}
              setSpeed={setSpeed}
            />
          </div>

          <div className="lg:col-start-2 lg:col-span-2 lg:row-start-1 lg:row-span-3 min-h-[500px] bg-slate-100 dark:bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 relative overflow-hidden flex items-center justify-center p-8 transition-colors duration-300">
             <div className="absolute top-4 right-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur px-3 py-1 rounded-full text-xs font-mono text-slate-500 dark:text-slate-400">
               Canvas: {activeTab}
             </div>

             {activeTab === 'stack' && <StackCanvas data={data} highlightIndex={highlightIndex} />}
             {activeTab === 'queue' && <QueueCanvas data={data} highlightIndex={highlightIndex} />}
             {activeTab === 'linked-list' && <LinkedListCanvas data={data} highlightIndex={highlightIndex} />}
             {activeTab === 'bst' && <BinaryTreeCanvas data={data} highlightIndex={highlightIndex} />}
             {activeTab === 'sorting' && <SortingCanvas data={data} />}
          </div>

          <div className="lg:col-start-1 lg:row-start-2">
            <AlgorithmPanel activeTab={activeTab} />
          </div>

          <div className="lg:col-start-1 lg:row-start-3">
            <LogsPanel logs={logs} />
          </div>

        </main>
      </div>
    </div>
  );
}