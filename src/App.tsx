import { Client } from 'boardgame.io/react';
import { ArtefactoAbsurdo } from './Game';
import { ArtefactoBoard } from './Board';
import './App.css';

const App = Client({
  game: ArtefactoAbsurdo,
  board: ArtefactoBoard,
});

export default App;
