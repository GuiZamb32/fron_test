import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Top5Ranking from './pages/Top5Ranking'
import Upload from './pages/Upload'
import ChemicalRef from './pages/ChemicalRef'
import './index.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-preto-deep">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ranking" element={<Top5Ranking />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/reference" element={<ChemicalRef />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App