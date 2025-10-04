import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import Signup from './pages/Signup';

function App() {
  return (
     <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<h2>Home Page</h2>} />
      </Routes>
    </div>
  );
}

export default App;
