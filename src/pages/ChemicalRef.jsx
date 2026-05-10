import { useState } from 'react'
import { Search, Database, ExternalLink, Beaker, Tag } from 'lucide-react'

function ChemicalRef() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSource, setSelectedSource] = useState('all')
  
  const compounds = [
    {
      id: 1,
      name: 'Glucose',
      formula: 'C6H12O6',
      inchikey: 'WQZGKKKJIJFFOK-GASJEMHNSA-N',
      pubchem_cid: '5793',
      chebi_id: 'CHEBI:17234',
      chemspider_id: '5589',
      molecular_weight: 180.16,
      sources: ['PubChem', 'ChEBI', 'ChemSpider'],
      classes: ['Monosaccharide', 'Hexose']
    },
    {
      id: 2,
      name: 'Caffeine',
      formula: 'C8H10N4O2',
      inchikey: 'RYYVLZVUVIJVGH-UHFFFAOYSA-N',
      pubchem_cid: '2519',
      chebi_id: 'CHEBI:27732',
      chemspider_id: '2424',
      molecular_weight: 194.19,
      sources: ['PubChem', 'ChEBI', 'ChemSpider'],
      classes: ['Alkaloid', 'Xanthine']
    },
    {
      id: 3,
      name: 'Sucrose',
      formula: 'C12H22O11',
      inchikey: 'CZMRCDWAGMRECN-UGDNZRGBSA-N',
      pubchem_cid: '5988',
      chebi_id: 'CHEBI:17992',
      chemspider_id: '5768',
      molecular_weight: 342.30,
      sources: ['PubChem', 'ChEBI'],
      classes: ['Disaccharide', 'Glycoside']
    },
    {
      id: 4,
      name: 'Aspirin',
      formula: 'C9H8O4',
      inchikey: 'BSYNRYMUTXBXSQ-UHFFFAOYSA-N',
      pubchem_cid: '2244',
      chebi_id: 'CHEBI:15365',
      chemspider_id: '2157',
      molecular_weight: 180.16,
      sources: ['PubChem', 'ChEBI', 'ChemSpider'],
      classes: ['Salicylate', 'NSAID']
    },
  ]
  
  const sources = [
    { value: 'all', label: 'Todas as Fontes', count: compounds.length },
    { value: 'pubchem', label: 'PubChem', count: compounds.filter(c => c.sources.includes('PubChem')).length },
    { value: 'chebi', label: 'ChEBI', count: compounds.filter(c => c.sources.includes('ChEBI')).length },
    { value: 'chemspider', label: 'ChemSpider', count: compounds.filter(c => c.sources.includes('ChemSpider')).length },
  ]
  
  const filteredCompounds = compounds.filter(compound => {
    const matchesSearch = 
      compound.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      compound.formula.toLowerCase().includes(searchTerm.toLowerCase()) ||
      compound.inchikey.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSource = 
      selectedSource === 'all' || 
      compound.sources.some(s => s.toLowerCase() === selectedSource)
    
    return matchesSearch && matchesSource
  })
  
  const getSourceBadgeColor = (source) => {
    const colors = {
      'PubChem': 'bg-verde-accent/20 text-verde-accent border-verde-accent/30',
      'ChEBI': 'bg-azul-primary/20 text-azul-primary border-azul-primary/30',
      'ChemSpider': 'bg-vermelho-alert/20 text-vermelho-alert border-vermelho-alert/30'
    }
    return colors[source] || 'bg-cinza-dark/20 text-cinza-muted border-cinza-dark/30'
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-branco-text mb-2">Referências Químicas</h1>
        <p className="text-cinza-muted">Banco integrado de compostos químicos de fontes externas</p>
      </div>
      
      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {sources.map((source) => (
          <button
            key={source.value}
            onClick={() => setSelectedSource(source.value)}
            className={`card transition-all ${
              selectedSource === source.value
                ? 'border-azul-primary bg-azul-primary/10'
                : 'hover:border-cinza-muted'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cinza-muted text-sm mb-1">{source.label}</p>
                <p className="text-2xl font-bold text-branco-text">{source.count}</p>
              </div>
              <Database className={selectedSource === source.value ? 'text-azul-primary' : 'text-cinza-muted'} size={32} />
            </div>
          </button>
        ))}
      </div>
      
      {/* Barra de Busca */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cinza-muted" size={20} />
          <input
            type="text"
            placeholder="Buscar por nome, fórmula ou InChIKey..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10 w-full"
          />
        </div>
      </div>
      
      {/* Lista de Compostos */}
      <div className="grid grid-cols-1 gap-4">
        {filteredCompounds.map((compound) => (
          <div key={compound.id} className="card hover:border-azul-primary/50 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <Beaker className="text-verde-accent" size={24} />
                  <h3 className="text-xl font-bold text-branco-text">{compound.name}</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-cinza-muted text-sm mb-1">Fórmula Molecular</p>
                    <p className="text-branco-text font-mono font-medium">{compound.formula}</p>
                  </div>
                  <div>
                    <p className="text-cinza-muted text-sm mb-1">Peso Molecular</p>
                    <p className="text-branco-text font-medium">{compound.molecular_weight} g/mol</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-cinza-muted text-sm mb-1">InChIKey</p>
                    <p className="text-branco-text font-mono text-sm">{compound.inchikey}</p>
                  </div>
                </div>
                
                {/* Classes Químicas */}
                <div className="mb-4">
                  <p className="text-cinza-muted text-sm mb-2">Classes Químicas</p>
                  <div className="flex flex-wrap gap-2">
                    {compound.classes.map((cls, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-azul-primary/20 text-azul-primary border border-azul-primary/30 rounded-full text-sm flex items-center space-x-1"
                      >
                        <Tag size={14} />
                        <span>{cls}</span>
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* IDs Externos */}
                <div className="space-y-2">
                  <p className="text-cinza-muted text-sm mb-2">Identificadores Externos</p>
                  <div className="flex flex-wrap gap-3">
                    {compound.pubchem_cid && (
                      <a
                        href={`https://pubchem.ncbi.nlm.nih.gov/compound/${compound.pubchem_cid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-3 py-1.5 bg-verde-accent/20 text-verde-accent border border-verde-accent/30 rounded-lg text-sm hover:bg-verde-accent/30 transition-colors"
                      >
                        <span>PubChem: {compound.pubchem_cid}</span>
                        <ExternalLink size={14} />
                      </a>
                    )}
                    {compound.chebi_id && (
                      <a
                        href={`https://www.ebi.ac.uk/chebi/searchId.do?chebiId=${compound.chebi_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-3 py-1.5 bg-azul-primary/20 text-azul-primary border border-azul-primary/30 rounded-lg text-sm hover:bg-azul-primary/30 transition-colors"
                      >
                        <span>ChEBI: {compound.chebi_id}</span>
                        <ExternalLink size={14} />
                      </a>
                    )}
                    {compound.chemspider_id && (
                      <a
                        href={`http://www.chemspider.com/Chemical-Structure.${compound.chemspider_id}.html`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-3 py-1.5 bg-vermelho-alert/20 text-vermelho-alert border border-vermelho-alert/30 rounded-lg text-sm hover:bg-vermelho-alert/30 transition-colors"
                      >
                        <span>ChemSpider: {compound.chemspider_id}</span>
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Badge de Fontes */}
              <div className="ml-4">
                <p className="text-cinza-muted text-xs mb-2 text-right">Fontes</p>
                <div className="flex flex-col space-y-1">
                  {compound.sources.map((source, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-1 rounded text-xs text-center border ${getSourceBadgeColor(source)}`}
                    >
                      {source}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredCompounds.length === 0 && (
        <div className="card text-center py-12">
          <Database className="mx-auto mb-4 text-cinza-muted" size={48} />
          <p className="text-cinza-muted">Nenhum composto encontrado com os critérios de busca.</p>
        </div>
      )}
    </div>
  )
}

export default ChemicalRef