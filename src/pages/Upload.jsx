import { useState } from 'react'
import { Upload as UploadIcon, FileSpreadsheet, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'

function Upload() {
  const [files, setFiles] = useState({
    identification: null,
    abundance: null
  })
  const [uploadStatus, setUploadStatus] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  
  const handleFileChange = (type, event) => {
    const file = event.target.files[0]
    if (file) {
      setFiles(prev => ({ ...prev, [type]: file }))
      setUploadStatus(null)
    }
  }
  
  const handleUpload = async () => {
    if (!files.identification || !files.abundance) {
      setUploadStatus({
        type: 'error',
        message: 'Por favor, selecione ambos os arquivos antes de enviar.'
      })
      return
    }
    
    setIsProcessing(true)
    
    // Simular upload e processamento
    setTimeout(() => {
      setUploadStatus({
        type: 'success',
        message: 'Arquivos carregados com sucesso! O ETL foi iniciado.',
        details: {
          identification_rows: 1248,
          abundance_rows: 3744,
          batch_name: `UPLOAD_${new Date().toISOString().split('T')[0]}`
        }
      })
      setIsProcessing(false)
    }, 3000)
  }
  
  const handleReset = () => {
    setFiles({ identification: null, abundance: null })
    setUploadStatus(null)
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-branco-text mb-2">Upload de Planilhas</h1>
        <p className="text-cinza-muted">Envie as planilhas de Identificação e Abundância para processamento ETL</p>
      </div>
      
      {/* Card de Instruções */}
      <div className="card bg-azul-primary/10 border-azul-primary/30">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="text-azul-primary mt-1" size={24} />
          <div>
            <h3 className="text-azul-primary font-semibold mb-2">Instruções de Upload</h3>
            <ul className="text-cinza-muted text-sm space-y-1">
              <li>• Selecione a planilha de <strong>Identificação</strong> (.xlsx ou .csv)</li>
              <li>• Selecione a planilha de <strong>Abundância</strong> (.xlsx ou .csv)</li>
              <li>• Os arquivos serão processados automaticamente pelo pipeline ETL</li>
              <li>• Aguarde a confirmação antes de sair da página</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Upload Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload Identificação */}
        <div className="card">
          <div className="text-center">
            <FileSpreadsheet className="mx-auto mb-4 text-verde-accent" size={48} />
            <h3 className="text-lg font-semibold text-branco-text mb-2">Planilha de Identificação</h3>
            <p className="text-cinza-muted text-sm mb-4">
              Contém dados de m/z, RT, fórmula molecular e candidatos
            </p>
            
            <label 
              htmlFor="identification-upload"
              className="btn-secondary cursor-pointer inline-flex items-center space-x-2"
            >
              <UploadIcon size={18} />
              <span>{files.identification ? 'Alterar Arquivo' : 'Selecionar Arquivo'}</span>
            </label>
            <input
              id="identification-upload"
              type="file"
              accept=".xlsx,.csv"
              onChange={(e) => handleFileChange('identification', e)}
              className="hidden"
            />
            
            {files.identification && (
              <div className="mt-4 p-3 bg-preto-pure rounded-lg">
                <p className="text-verde-accent font-medium flex items-center justify-center space-x-2">
                  <CheckCircle size={16} />
                  <span>{files.identification.name}</span>
                </p>
                <p className="text-cinza-muted text-xs mt-1">
                  {(files.identification.size / 1024).toFixed(2)} KB
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Upload Abundância */}
        <div className="card">
          <div className="text-center">
            <FileSpreadsheet className="mx-auto mb-4 text-azul-primary" size={48} />
            <h3 className="text-lg font-semibold text-branco-text mb-2">Planilha de Abundância</h3>
            <p className="text-cinza-muted text-sm mb-4">
              Contém valores de abundância por amostra e replicata
            </p>
            
            <label 
              htmlFor="abundance-upload"
              className="btn-primary cursor-pointer inline-flex items-center space-x-2"
            >
              <UploadIcon size={18} />
              <span>{files.abundance ? 'Alterar Arquivo' : 'Selecionar Arquivo'}</span>
            </label>
            <input
              id="abundance-upload"
              type="file"
              accept=".xlsx,.csv"
              onChange={(e) => handleFileChange('abundance', e)}
              className="hidden"
            />
            
            {files.abundance && (
              <div className="mt-4 p-3 bg-preto-pure rounded-lg">
                <p className="text-azul-primary font-medium flex items-center justify-center space-x-2">
                  <CheckCircle size={16} />
                  <span>{files.abundance.name}</span>
                </p>
                <p className="text-cinza-muted text-xs mt-1">
                  {(files.abundance.size / 1024).toFixed(2)} KB
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Botões de Ação */}
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={handleReset}
          className="px-8 py-3 bg-cinza-dark text-branco-text rounded-lg hover:bg-cinza-muted transition-colors"
          disabled={isProcessing}
        >
          Limpar Seleção
        </button>
        <button
          onClick={handleUpload}
          className="btn-primary px-8 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!files.identification || !files.abundance || isProcessing}
        >
          {isProcessing ? 'Processando...' : 'Iniciar ETL'}
        </button>
      </div>
      
      {/* Status do Upload */}
      {uploadStatus && (
        <div className={`card ${
          uploadStatus.type === 'success' 
            ? 'bg-verde-accent/10 border-verde-accent/30' 
            : 'bg-vermelho-alert/10 border-vermelho-alert/30'
        }`}>
          <div className="flex items-start space-x-3">
            {uploadStatus.type === 'success' ? (
              <CheckCircle className="text-verde-accent mt-1" size={24} />
            ) : (
              <XCircle className="text-vermelho-alert mt-1" size={24} />
            )}
            <div className="flex-1">
              <h3 className={`font-semibold mb-2 ${
                uploadStatus.type === 'success' ? 'text-verde-accent' : 'text-vermelho-alert'
              }`}>
                {uploadStatus.type === 'success' ? 'Sucesso!' : 'Erro'}
              </h3>
              <p className="text-branco-text mb-3">{uploadStatus.message}</p>
              
              {uploadStatus.details && (
                <div className="bg-preto-pure rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-cinza-muted">Linhas de Identificação:</span>
                    <span className="text-branco-text font-medium">
                      {uploadStatus.details.identification_rows}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cinza-muted">Linhas de Abundância:</span>
                    <span className="text-branco-text font-medium">
                      {uploadStatus.details.abundance_rows}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cinza-muted">Batch Name:</span>
                    <span className="text-verde-accent font-mono text-sm">
                      {uploadStatus.details.batch_name}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Histórico de Uploads */}
      <div className="card">
        <h2 className="text-xl font-bold text-branco-text mb-4">Histórico de Uploads</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="table-header">
                <th className="px-4 py-3 text-left">Data/Hora</th>
                <th className="px-4 py-3 text-left">Batch</th>
                <th className="px-4 py-3 text-left">Arquivos</th>
                <th className="px-4 py-3 text-left">Registros</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-row">
                <td className="px-4 py-3 text-cinza-muted">2026-05-05 13:45</td>
                <td className="px-4 py-3 font-mono text-sm">MERGE_RESULTADO_20260505</td>
                <td className="px-4 py-3 text-branco-text">2 arquivos</td>
                <td className="px-4 py-3 text-cinza-muted">1,248</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-verde-accent/20 text-verde-accent rounded text-sm">
                    Completo
                  </span>
                </td>
              </tr>
              <tr className="table-row">
                <td className="px-4 py-3 text-cinza-muted">2026-05-04 16:22</td>
                <td className="px-4 py-3 font-mono text-sm">UPLOAD_20260504</td>
                <td className="px-4 py-3 text-branco-text">2 arquivos</td>
                <td className="px-4 py-3 text-cinza-muted">987</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-verde-accent/20 text-verde-accent rounded text-sm">
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

export default Upload