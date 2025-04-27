import React, { useRef, useEffect } from 'react';

const Console = ({ logs, command, onCommandChange, onCommandSubmit, onClose, onQuickCommand }) => {
  const logEndRef = useRef(null);

  // Auto-scroll to bottom of logs
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-30">
      <div 
        className="bg-gray-900 rounded-lg w-full max-w-3xl h-[600px] max-h-[80vh] shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center px-6 py-4 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center">
            <span className="h-3 w-3 rounded-full bg-green-400 animate-pulse mr-3"></span>
            <h3 className="text-xl font-mono font-bold text-gray-200">AgroBot Console</h3>
          </div>
          <button 
            className="text-gray-400 hover:text-white p-1 transition-colors"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        
        {/* Quick Command Buttons */}
        <div className="px-4 py-3 bg-gray-800 border-b border-gray-700 flex flex-wrap gap-2">
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-md font-medium transition-colors"
            onClick={() => onQuickCommand('status')}
          >
            System Status
          </button>
          <button 
            className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1.5 rounded-md font-medium transition-colors"
            onClick={() => onQuickCommand('read all')}
          >
            Read All Plots
          </button>
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1.5 rounded-md font-medium transition-colors"
            onClick={() => onQuickCommand('moisture')}
          >
            Moisture Levels
          </button>
          <button 
            className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded-md font-medium transition-colors"
            onClick={() => onQuickCommand('temperature')}
          >
            Temperature
          </button>
          <button 
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1.5 rounded-md font-medium transition-colors"
            onClick={() => onQuickCommand('water all')}
          >
            Water All Plots
          </button>
          <button 
            className="bg-yellow-600 hover:bg-yellow-700 text-white text-xs px-3 py-1.5 rounded-md font-medium transition-colors"
            onClick={() => onQuickCommand('help')}
          >
            Help
          </button>

          {/* lol */}
          <button 
            className="bg-cyan-600 hover:bg-cyan-700 text-white text-xs px-3 py-1.5 rounded-md font-medium transition-colors"
            onClick={() => onQuickCommand('clickHaku')}
          >
            CLICK HAKU
          </button>


        </div>
        
        <div className="flex-1 overflow-y-auto p-4 bg-gray-900 font-mono text-sm">
          <div className="space-y-2">
            {logs.map((log, index) => (
              <div key={index} className="flex">
                <span className="text-gray-500 mr-2 select-none">
                  [{log.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}]
                </span>
                <span className={
                  log.type === 'system' 
                    ? 'text-blue-400' 
                    : log.type === 'command' 
                      ? 'text-green-400' 
                      : 'text-white'
                }>
                  {log.type === 'command' ? '> ' : ''}{log.text}
                </span>
              </div>
            ))}
            <div ref={logEndRef} />
          </div>
        </div>
        
        <form onSubmit={onCommandSubmit} className="p-4 bg-gray-800 border-t border-gray-700">
          <div className="flex">
            <span className="text-green-400 mr-2 font-mono font-bold">{">"}</span>
            <input
              type="text"
              value={command}
              onChange={onCommandChange}
              placeholder="Type a command..."
              className="flex-1 bg-transparent border-none outline-none text-white font-mono"
              autoFocus
            />
            <button 
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md font-medium text-sm transition-colors ml-2"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Console; 