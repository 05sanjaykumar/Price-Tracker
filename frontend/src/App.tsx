import { Routes, Route } from 'react-router-dom';
import EasyBuyLanding  from './pages/LandingPage'
function App() {

  return (
    <>
      <Routes>
          <Route path="/" element={<EasyBuyLanding />} />
      </Routes>
    </>
  )
}

export default App
