import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Demo from './pages/Demo'; // Adjust path based on where you save the Demo component
import './App.css';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Renault Parts Catalog System
        </h1>
        <p className="text-gray-600 mb-8">
          Professional OEM Parts Lookup Platform
        </p>
        <div className="space-y-4">
          
           <a href="/demo"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-colors"
          >
            View Demo
          </a>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;