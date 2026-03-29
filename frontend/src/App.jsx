import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './pages/Dashboard';
import { Route, Routes } from 'react-router-dom';
import Vehicles from './pages/Vehicles';
import { TripProvider } from './context/TripContext';
import Drivers from './pages/Drivers';
import Trip from './pages/Trip';
import Base from './pages/layout/Base';
import History from './pages/History';

function App() {
  return (
    <>

      <Base>
        <Routes>
          <Route path="/" element={<TripProvider><Dashboard /></TripProvider>} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/trips" element={<Trip />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Base>
    </>
  )
}

export default App
