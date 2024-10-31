import Dashboard from './components/Dashboard'
import Sigin from './components/Sigin'
import Login from './components/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {

  return (
    <Router>
      <Routes>
            <Route path="/signin" element={<Sigin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </Router>
  )
}

export default App
