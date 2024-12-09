import './App.css';
import { ConfigProvider } from './hooks/ConfigContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Menu from './components/menu/Menu';
import Board from './components/Board/board';

function App() {
  return (
    <ConfigProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/Game" element={<Board />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;

