import { useState, useEffect } from 'react'
import { Search, Download, Filter, TrendingUp, AlertCircle } from 'lucide-react'

function Top5Ranking() {
  const [searchTerm, setSearchTerm] = useState('')
  const [rankingData, setRankingData] = useState([])
  const [selectedFeature, setSelectedFeature] = useState(null)
  
  useEffect(() => {
    // Simular carregamento de dados do Top 5
    const mockData = [
      {
        feature_id: 'F_001',
        mz: 180.0634,
        rt: 5.43,
        candidates: [
          { rank: 1, name: 'Glucose', probability: 0.89, mass_error_ppm: 2.1, formula: 'C6H12O6', source: 'PubChem' },
          { rank: 2, name: 'Fructose', probability: 0.78, mass_error_ppm: 3.5, formula: 'C6H12O6', source: 'ChEBI' },
          { rank: 3, name: 'Mannose', probability: 0.65, mass_error_ppm: 4.2, formula: 'C6H12O6', source: 'PubChem' },
          { rank: 4, name: 'Galactose', probability: 0.52, mass_error_ppm: 5.1, formula: 'C6H12O6', source: 'ChEBI' },
          { rank: 5, name: 'Allose', probability: 0.41, mass_error_ppm: 6.3, formula: 'C6H12O6', source: 'ChemSpider' },
        ]
      },
      {
        feature_id: 'F_002',
        mz: 194.0790,
        rt: 7.21,
        candidates: [
          { rank: 1, name: 'Caffeine', probability: 0.92, mass_error_ppm: 1.8, formula: 'C8H10N4O2', source: 'PubChem' },
          { rank: 2, name: 'Theobromine', probability: 0.71, mass_error_ppm: 3.2, formula: 'C7H8N4O2', source: 'ChEBI' },
          { rank: 3, name: 'Theophylline', probability: 0.68, mass_error_ppm: 3.9, formula: 'C7H8N4O2', source: 'PubChem' },
          { rank: 4, name: 'Paraxanthine', probability: 0.55, mass_error_ppm: 4.7, formula: 'C7H8N4O2', source: 'ChEBI' },
          { rank: 5, name: '1-Methylxanthine', probability: 0.38, mass_error_ppm: 6.8, formula: 'C6H6N4O2', source: 'ChemSpider' },
        ]
      },
      {
        feature_id: 'F_003',
        mz: 342.1162,
        rt: 12.87,
        candidates: [
          { rank: 1, name: 'Sucrose', probability: 0.85, mass_error_ppm: 2.4, formula: 'C12H22O11', source: 'PubChem' },
          { rank: 2, name: 'Lactose', probability: 0.73, mass_error_ppm: 3.6, formula: 'C12H22O11', source: 'ChEBI' },
          { rank: 3, name: 'Maltose', probability: 0.67, mass_error_ppm: 4.3, formula: 'C12H22O11', source: 'PubChem' },
          { rank: 4, name: 'Trehalose', probability: 0.59, mass_error_ppm: 5.2, formula: 'C12H22O11', source: 'ChEBI' },
          { rank: 5, name: 'Cellobiose', probability: 0.44, mass_error_ppm: 6.5, formula: 'C12H22O11', source: 'ChemSpider' },
        ]
      },
    ]
    setRankingData(mockData)
  }, [])
  
  const filteredData = rankingData.filter(feature =>
    feature.feature_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feature.candidates.some(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
  )
  
  const getProbabilityColor = (prob) => {
    if (prob >= 0.8) return 'text-verde-accent'
    if (prob >= 0.6) return 'text-azul-primary'
    if (prob >= 0.4) return 'text-cinza-muted'
    return 'text-vermelho-alert'
  }
  
  const getSourceBadgeColor = (source) => {
    const colors = {
      'PubChem': 'bg-verde-accent/20 text-verde-accent',
      'ChEBI': 'bg-azul-primary/20 text-azul-primary',
      'ChemSpider': 'bg-vermelho-alert/20 text-vermelho-alert'
    }
    return colors[source] || 'bg-cinza-dark/20 text-cinza-muted'
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-branco-text mb-2">Top 5 Ranking</h1>
          <p className="text-cinza-muted">Candidatos ranqueados por probabilidade analítica</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Download size={18} />
          <span>Exportar Parquet</span>
        </button>
      </div>
      
      {/* Barra de Busca e Filtros */}
      <div className="card">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cinza-muted" size={20} />
            <input
              type="text"
              placeholder="Buscar por Feature ID ou nome do composto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10 w-full"
            />
          </div>
          <button className="btn-secondary flex items-center space-x-2">
            <Filter size={18} />
            <span>Filtros</span>
          </button>
        </div>
      </div>
      
      {/* Lista de Features com Ranking */}
      <div className="space-y-4">
        {filteredData.map((feature) => (
          <div key={feature.feature_id} className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="bg-azul-primary/20 text-azul-primary px-4 py-2 rounded-lg font-mono font-bold">
                  {feature.feature_id}
                </div>
                <div>
                  <p className="text-branco-text font-medium">
                    m/z: <span className="text-verde-accent">{feature.mz.toFixed(4)}</span>
                  </p>
                  <p className="text-cinza-muted text-sm">
                    RT: {feature.rt.toFixed(2)} min
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedFeature(
                  selectedFeature === feature.feature_id ? null : feature.feature_id
                )}
                className="btn-secondary"
              >
                {selectedFeature === feature.feature_id ? 'Ocultar' : 'Ver Detalhes'}
              </button>
            </div>
            
            {/* Tabela de Candidatos */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="table-header border-b border-cinza-dark">
                    <th className="px-4 py-3 text-left">Rank</th>
                    <th className="px-4 py-3 text-left">Composto</th>
                    <th className="px-4 py-3 text-left">Fórmula</th>
                    <th className="px-4 py-3 text-left">Probabilidade</th>
                    <th className="px-4 py-3 text-left">Erro (ppm)</th>
                    <th className="px-4 py-3 text-left">Fonte</th>
                  </tr>
                </thead>
                <tbody>
                  {feature.candidates.map((candidate) => (
                    <tr key={candidate.rank} className="table-row">
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <TrendingUp 
                            size={16} 
                            className={candidate.rank === 1 ? 'text-verde-accent' : 'text-cinza-muted'} 
                          />
                          <span className="font-bold text-branco-text">#{candidate.rank}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-branco-text font-medium">{candidate.name}</td>
                      <td className="px-4 py-3 font-mono text-cinza-muted">{candidate.formula}</td>
                      <td className="px-4 py-3">
                        <span className={`font-bold ${getProbabilityColor(candidate.probability)}`}>
                          {(candidate.probability * 100).toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-cinza-muted">{candidate.mass_error_ppm.toFixed(1)}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-sm ${getSourceBadgeColor(candidate.source)}`}>
                          {candidate.source}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Detalhes Expandidos */}
            {selectedFeature === feature.feature_id && (
              <div className="mt-4 pt-4 border-t border-cinza-dark">
                <div className="bg-azul-primary/10 border border-azul-primary/30 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="text-azul-primary mt-1" size={20} />
                    <div>
                      <h4 className="text-azul-primary font-semibold mb-2">Informações Adicionais</h4>
                      <p className="text-cinza-muted text-sm">
                        O ranking considera erro de massa (40%), fragmentação (30%), score do software (20%) 
                        e padrão isotópico (10%), ajustado por abundância e estabilidade entre replicatas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {filteredData.length === 0 && (
        <div className="card text-center py-12">
          <p className="text-cinza-muted">Nenhuma feature encontrada com os critérios de busca.</p>
        </div>
      )}
    </div>
  )
}

export default Top5Ranking