import React from 'react';
import logo from './logo.svg';
import './App.css';

import {PokeCard} from './pokemon_app';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PokeCard />
      </header>
    </div>
  );
}

export default App;
