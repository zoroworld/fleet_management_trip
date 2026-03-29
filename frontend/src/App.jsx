import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './pages/Dashboard';
import { Route, Routes } from 'react-router-dom';
import Vehicles from './pages/Vehicles';
import { TripProvider } from './context/TripContext';
import Drivers from './pages/Drivers';
import Trip from './pages/Trip';

function App() {
  return (
    <>
     <TripProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/trips" element={<Trip />} />
      </Routes>
      </TripProvider>
    </>
  )
}

export default App
