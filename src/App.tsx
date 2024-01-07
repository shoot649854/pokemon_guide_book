import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { PokeCard } from './page/PokeApp';
import { PokeDetail } from './page/PokeDetail';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<PokeCard />} />
            {/* <Route path="/pokemon_guide_book" element={<PokeCard />} /> */}
            <Route path="/pokemon/:id" element={<PokeDetail />} />
            <Route path="/pokemon_guide_book" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
