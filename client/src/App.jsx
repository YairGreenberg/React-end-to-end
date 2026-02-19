import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DataPage from './components/DataPage';
import TestPage from './components/TestPage';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3033/api/data')
      .then(res => {
        console.log("Data received from server:", res.data);
        setData(res.data);
      })
      .catch(err => console.error("Could not connect to server:", err));
  }, []);

  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="nav-link"> Data Table</Link>
        <Link to="/test" className="nav-link"> Dynamic Test</Link>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<DataPage data={data} />} />
          <Route path="/test" element={<TestPage data={data} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;