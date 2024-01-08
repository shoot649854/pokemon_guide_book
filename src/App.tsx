import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import AppLayout from './component/AppLayout';
import { PokeCard } from './page/PokeApp';
import { PokeDetail } from './page/PokeDetail';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            {/* アプリケーション用ルーティング */}
            <Route path="/" element={<AppLayout />}>
              <Route path="/pokemon_guide_book" element={<Navigate to="/" />} />
              <Route index element={<PokeCard />} />
              <Route path="/pokemon/:id" element={<PokeDetail />} />
            </Route>
          </Routes>
        </Router>
      </header>
    </div>
  );

}

export default App;