import React from 'react';
import ReactDOM from 'react-dom/client';
import { Client } from 'boardgame.io/react';
import { UBAOMatic } from './game/game';
import Board from './components/Board';

const App = Client({
  game: UBAOMatic,
  board: Board,
  debug: false,
});

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
