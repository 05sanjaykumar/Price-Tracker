import { Routes, Route } from 'react-router-dom';
import EasyBuyLanding  from './pages/LandingPage'
import AuthPage from './pages/AuthPage';
import ComingSoon from './pages/ComingSoon';
function App() {

  return (
    <>
      <Routes>
          <Route path="/" element={<EasyBuyLanding />} />
          <Route path='/auth' element={<AuthPage/>} />
          <Route path='/soon' element={<ComingSoon/>} />
      </Routes>
    </>
  )
}

export default App
