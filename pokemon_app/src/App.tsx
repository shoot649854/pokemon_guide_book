import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {PokeCard} from './page/PokeApp';
import {PokeDetail} from './page/PokeDetail';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
          <Routes>
            <Route path="/" element={<PokeCard />} />
            <Route path="/pokemon:id" element={<PokeDetail />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
