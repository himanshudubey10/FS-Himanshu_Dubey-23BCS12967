import React, { useState } from 'react';
const App = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  const decrement = () => {
    setCount(prevCount => prevCount - 1);
  };

  const reset = () => {
    setCount(0);
  };

  const CounterButton = ({ onClick, children, bgColor }) => (
    <button
      onClick={onClick}
      className={`
        w-full py-4 text-xl font-semibold 
        rounded-xl shadow-lg transition-all duration-300 ease-in-out
        transform hover:scale-[1.02] active:scale-[0.98] 
        focus:outline-none focus:ring-4 ${bgColor} 
        text-white
      `}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
          React Counter
        </h1>

        
        <div className="mb-10 p-6 sm:p-8 bg-indigo-50 rounded-2xl border-4 border-indigo-200">
          <p className="text-xl font-medium text-indigo-600 mb-2">Current Value</p>
          <span className={`
            text-7xl sm:text-9xl font-black 
            transition-all duration-300 
            ${count === 0 ? 'text-gray-500' : count > 0 ? 'text-green-600' : 'text-red-600'}
          `}>
            {count}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <CounterButton onClick={decrement} bgColor="bg-red-500 hover:bg-red-600 focus:ring-red-300">
            Decrement
          </CounterButton>
          
          <CounterButton onClick={reset} bgColor="bg-gray-500 hover:bg-gray-600 focus:ring-gray-300">
            Reset
          </CounterButton>
          
          <CounterButton onClick={increment} bgColor="bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-300">
            Increment
          </CounterButton>
        </div>
      </div>
    </div>
  );
};

export default App;