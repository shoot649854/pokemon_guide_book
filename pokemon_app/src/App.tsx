import React from 'react';
import logo from './logo.svg';
import './App.css';

import PokemonComponent from './pokemon_app';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <PokemonComponent />
      </header>
    </div>
  );
}

export default App;
