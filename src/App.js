import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Single from './pages/Single';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/coins/:id" element={<Single />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
