import './App.css';
import Dashboard from './Page/Dashboard';
import Add from './Page/Dashboard/Add';
import Edit from './Page/Dashboard/Edit';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/edit" element={<Edit />} />
          <Route path="/add" element={<Add />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
