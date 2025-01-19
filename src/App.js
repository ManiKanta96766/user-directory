import './App.css';
import {  useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import UserDetails from './components/UserDetails';
import {UserProvider} from './context/UserContext'

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <UserProvider>
      <Router>
        <div className="container">
          <button onClick={toggleDarkMode}>
            {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/:id" element={<UserDetails />} />
          </Routes>
        </div>
      </Router>
      </UserProvider>
    </div>
  );
}

export default App;
