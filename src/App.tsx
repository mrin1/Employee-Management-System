import  { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true); 

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-slate-50 text-slate-900'} font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-300`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>
        <Dashboard darkMode={darkMode} />
      </main>
    </div>
  );
}

export default App;

