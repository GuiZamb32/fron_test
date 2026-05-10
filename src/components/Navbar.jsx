import { Link, useLocation } from 'react-router-dom'
import { BarChart3, TrendingUp, Upload, Database } from 'lucide-react'

function Navbar() {
  const location = useLocation()
  
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/ranking', label: 'Top 5 Ranking', icon: TrendingUp },
    { path: '/upload', label: 'Upload', icon: Upload },
    { path: '/reference', label: 'Referências', icon: Database },
  ]
  
  return (
    <nav className="bg-preto-elevated border-b border-cinza-dark">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-verde-accent to-azul-primary rounded-lg flex items-center justify-center">
             <span className="flex items-center">
              <img 
                src="/logo.png" 
                alt="" 
                className="h-8 w-auto" 
              />
            </span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-branco-text">QuimioAnalytics</h1>
              <p className="text-xs text-cinza-muted">Pipeline ETL · IST Ambiental</p>
            </div>
          </div>
          
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-azul-primary text-white'
                      : 'text-cinza-muted hover:text-branco-text hover:bg-preto-pure'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar