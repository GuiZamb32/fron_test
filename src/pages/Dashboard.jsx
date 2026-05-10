import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Database, Beaker, FileCheck, Activity } from 'lucide-react'

function Dashboard() {
  const [stats, setStats] = useState({
    totalFeatures: 0,
    totalCandidates: 0,
    totalCompounds: 0,
    externalSources: 0
  })
  
  // Dados de exemplo para os gráficos
  const abundanceData = [
    { sample: 'Amostra 1', abundance: 45000 },
    { sample: 'Amostra 2', abundance: 38000 },
    { sample: 'Amostra 3', abundance: 52000 },
    { sample: 'Amostra 4', abundance: 41000 },
    { sample: 'Amostra 5', abundance: 48000 },
  ]
  
  const sourceDistribution = [
    { name: 'PubChem', value: 450, color: '#04BDA2' },
    { name: 'ChEBI', value: 320, color: '#016FE1' },
    { name: 'ChemSpider', value: 180, color: '#bd0404' },
  ]
  
  useEffect(() => {
    // Simular carregamento de dados da API
    setTimeout(() => {
      setStats({
        totalFeatures: 1248,
        totalCandidates: 6240,
        totalCompounds: 950,
        externalSources: 3
      })
    }, 500)
  }, [])
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-branco-text mb-2">Dashboard Analítico</h1>
        <p className="text-cinza-muted">Visão geral dos dados integrados do QuimioAnalytics</p>
      </div>
      
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-gradient-to-br from-preto-elevated to-preto-pure border-verde-accent/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cinza-muted text-sm mb-1">Total de Features</p>
              <p className="text-3xl font-bold text-verde-accent">{stats.totalFeatures}</p>
            </div>
            <Database className="text-verde-accent" size={40} />
          </div>
        </div>
        
        <div className="card bg-gradient-to-br from-preto-elevated to-preto-pure border-azul-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cinza-muted text-sm mb-1">Candidatos</p>
              <p className="text-3xl font-bold text-azul-primary">{stats.totalCandidates}</p>
            </div>
            <Beaker className="text-azul-primary" size={40} />
          </div>
        </div>
        
        <div className="card bg-gradient-to-br from-preto-elevated to-preto-pure border-verde-medium/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cinza-muted text-sm mb-1">Compostos Ref.</p>
              <p className="text-3xl font-bold text-verde-medium">{stats.totalCompounds}</p>
            </div>
            <FileCheck className="text-verde-medium" size={40} />
          </div>
        </div>
        
        <div className="card bg-gradient-to-br from-preto-elevated to-preto-pure border-azul-light/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cinza-muted text-sm mb-1">Fontes Externas</p>
              <p className="text-3xl font-bold text-azul-light">{stats.externalSources}</p>
            </div>
            <Activity className="text-azul-light" size={40} />
          </div>
        </div>
      </div>
      
      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Abundância */}
        <div className="card">
          <h2 className="text-xl font-bold text-branco-text mb-4">Abundância por Amostra</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={abundanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#424242" />
              <XAxis dataKey="sample" stroke="#737373" />
              <YAxis stroke="#737373" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#111111', 
                  border: '1px solid #424242',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="abundance" fill="#04BDA2" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Gráfico de Distribuição de Fontes */}
        <div className="card">
          <h2 className="text-xl font-bold text-branco-text mb-4">Distribuição por Fonte</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sourceDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {sourceDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#111111', 
                  border: '1px solid #424242',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Tabela de Últimas Atualizações */}
      <div className="card">
        <h2 className="text-xl font-bold text-branco-text mb-4">Últimas Atualizações</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="table-header">
                <th className="px-4 py-3 text-left">Batch</th>
                <th className="px-4 py-3 text-left">Tipo</th>
                <th className="px-4 py-3 text-left">Data</th>
                <th className="px-4 py-3 text-left">Registros</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-row">
                <td className="px-4 py-3">TOP5_RANKING_MERGE</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-verde-accent/20 text-verde-accent rounded text-sm">
                    Ranking
                  </span>
                </td>
                <td className="px-4 py-3 text-cinza-muted">2026-05-05 14:32</td>
                <td className="px-4 py-3">6,240</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-azul-primary/20 text-azul-primary rounded text-sm">
                    Completo
                  </span>
                </td>
              </tr>
              <tr className="table-row">
                <td className="px-4 py-3">PUBCHEM_IMPORT_2026</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-azul-primary/20 text-azul-primary rounded text-sm">
                    Externa
                  </span>
                </td>
                <td className="px-4 py-3 text-cinza-muted">2026-05-05 14:15</td>
                <td className="px-4 py-3">450</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-azul-primary/20 text-azul-primary rounded text-sm">
                    Completo
                  </span>
                </td>
              </tr>
              <tr className="table-row">
                <td className="px-4 py-3">MERGE_RESULTADO_20260505</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-vermelho-alert/20 text-vermelho-alert rounded text-sm">
                    Interna
                  </span>
                </td>
                <td className="px-4 py-3 text-cinza-muted">2026-05-05 13:45</td>
                <td className="px-4 py-3">1,248</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-azul-primary/20 text-azul-primary rounded text-sm">
                    Completo
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard