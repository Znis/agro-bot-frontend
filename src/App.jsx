import { useState } from 'react'
import './App.css'

// Import components
import Header from './components/Header'
import Footer from './components/Footer'
import Dashboard from './components/Dashboard'
import FarmGrid from './components/FarmGrid'
import PlotDetailModal from './components/PlotDetailModal'
import Console from './components/Console'

// Import utilities
import { GRID_DATA } from './utils/helpers'

function App() {
  const [selectedGridItem, setSelectedGridItem] = useState(null);
  const [isConnected, setIsConnected] = useState(true);
  const [showConsole, setShowConsole] = useState(false);
  const [command, setCommand] = useState('');
  const [logs, setLogs] = useState([
    { type: 'system', text: 'Console initialized. Ready for commands.', timestamp: new Date() },
    { type: 'system', text: 'Type "help" for available commands.', timestamp: new Date() }
  ]);

  const handleConnectConsole = () => {
    if (isConnected) {
      setShowConsole(true);
    }
  };

  const handleCloseConsole = () => {
    setShowConsole(false);
  };

  const handleCommandChange = (e) => {
    setCommand(e.target.value);
  };

  const executeCommand = (cmd) => {
    // Add the command to logs
    setLogs(prev => [...prev, { 
      type: 'command', 
      text: cmd, 
      timestamp: new Date() 
    }]);
    
    // Process command (this is a mock implementation)
    setTimeout(() => {
      let response;
      const cmdLower = cmd.toLowerCase().trim();
      
      if (cmdLower === 'help') {
        response = 'Available commands: status, moisture, temperature, water [plot_id], water all, refresh';
      } else if (cmdLower === 'status') {
        response = 'All systems operational. 9 plots monitored. 3 require attention.';
      } else if (cmdLower.startsWith('water')) {
        if (cmdLower === 'water all') {
          response = 'Initiating watering sequence for all plots. Please wait...';
          setTimeout(() => {
            setLogs(prev => [...prev, { 
              type: 'response', 
              text: 'Watering complete. All plots have been watered.', 
              timestamp: new Date() 
            }]);
          }, 2000);
        } else {
          const plotId = cmdLower.split(' ')[1];
          response = plotId ? `Initiating watering sequence for plot ${plotId}...` : 'Error: Please specify a plot ID.';
        }
      } else if (cmdLower === 'moisture' || cmdLower === 'temperature') {
        response = `Average ${cmdLower} readings: ${Math.floor(Math.random() * 30) + 60}%`;
      } else if (cmdLower === 'read all') {
        response = 'Reading data from all plots...';
        
        // Simulate multiple readings coming in
        setTimeout(() => {
          const readings = GRID_DATA.map(plot => {
            return `Plot ${plot.id} (${plot.plantType}): Moisture ${plot.moisture}%, Temperature ${plot.temperature}°C, Status: ${plot.plantStatus}`;
          });
          
          readings.forEach((reading, index) => {
            setTimeout(() => {
              setLogs(prev => [...prev, { 
                type: 'response', 
                text: reading, 
                timestamp: new Date() 
              }]);
            }, index * 300);
          });
        }, 500);
      } else {
        response = `Unknown command: "${cmd}". Type "help" for available commands.`;
      }
      
      setLogs(prev => [...prev, { 
        type: 'response', 
        text: response, 
        timestamp: new Date() 
      }]);
    }, 300);
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    
    if (!command.trim()) return;
    
    executeCommand(command);
    setCommand('');
  };

  const handleQuickCommand = (cmd) => {
    executeCommand(cmd);
  };

  return (
    <div className="min-h-screen bg-gray-50 bg-[url('assets/bg.jpg')] bg-no-repeat bg-cover bg-center">
      <Header 
        isConnected={isConnected} 
        onOpenConsole={handleConnectConsole} 
      />

      <main className="container mx-auto px-4 py-8">
        <Dashboard />
        <FarmGrid onSelectGridItem={setSelectedGridItem} />
      </main>

      {selectedGridItem && (
        <PlotDetailModal 
          gridItem={selectedGridItem} 
          onClose={() => setSelectedGridItem(null)} 
        />
      )}

      {showConsole && (
        <Console 
          logs={logs}
          command={command}
          onCommandChange={handleCommandChange}
          onCommandSubmit={handleCommandSubmit}
          onClose={handleCloseConsole}
          onQuickCommand={handleQuickCommand}
        />
      )}

      <Footer />
    </div>
  )
}

export default App
