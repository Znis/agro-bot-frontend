import React from 'react';

const Header = ({ isConnected, onOpenConsole }) => {
  return (
    <header className="flex jusitfy-center gap-4 bg-[#2E7D32] text-white p-6 shadow-md">
      <img className="h-24 w-24" src="assets/logo.png" alt="Agro Bot Farm Logo" />
      <div className="container flex flex-col justify-center mx-auto">
        <h1 className="text-3xl font-bold">AgroBot Farm Monitor</h1>
        <p className="mt-2">Real-time IoT-based farm monitoring system</p>
      </div>
      <button
        className={`flex items-center justify-center w-[14rem] py-3 px-4 my-auto rounded-lg transition-all duration-200 ${
          isConnected 
            ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-green-500/30 cursor-pointer' 
            : 'bg-gray-600 text-gray-200 cursor-not-allowed'
        }`}
        disabled={!isConnected}
        onClick={onOpenConsole}
      >
        <span className={`h-3 w-3 rounded-full mr-3 ${isConnected ? 'bg-green-300 animate-pulse' : 'bg-red-400'}`}></span>
        <span className="font-medium">
          {isConnected ? 'Open Console' : 'Console Offline'}
        </span>
      </button>
    </header>
  );
};

export default Header; 