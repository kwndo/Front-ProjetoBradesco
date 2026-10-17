import React, { useState } from 'react';
import {
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
} from 'lucide-react';

export function AcompanhamentoView({ propostas = [] }) {
  const [filterStatus, setFilterStatus] = useState('todos');

  const propostasMock = [
    {
      idProposta: 'PROP-839201',
      dataSolicitacao: '15/10/2026',
      bemDescricao: 'Toyota Corolla Sedan 2.0',
      valorFinanciado: 'R$ 96.000,00',
      prazoMeses: 36,
      valorParcela: 'R$ 3.180,45',
      status: 'Aprovado',
      motivoReprovacao: null,
    },
    {
      idProposta: 'PROP-748291',
      dataSolicitacao: '10/10/2026',
      bemDescricao: 'Apartamento 2 quartos SP',
      valorFinanciado: 'R$ 350.000,00',
      prazoMeses: 60,
      valorParcela: 'R$ 7.920,00',
      status: 'Reprovado',
      motivoReprovacao: 'Renda inferior a 3x o valor da parcela mensal.',
    },
  ];

  const listaCompleta = propostas.length > 0 ? propostas : propostasMock;

  const listaFiltrada = listaCompleta.filter((item) => {
    if (filterStatus === 'todos') return true;
    return item.status.toLowerCase().includes(filterStatus.toLowerCase());
  });

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'aprovado':
      case 'aprovada':
        return (
          <span
            className="key-badge-btn"
            style={{
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              color: '#10B981',
              borderColor: 'rgba(16, 185, 129, 0.3)',
            }}
          >
            <CheckCircle2 size={13} /> Aprovada
          </span>
        );
      case 'reprovado':
      case 'reprovada':
        return (
          <span
            className="key-badge-btn"
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              color: '#EF4444',
              borderColor: 'rgba(239, 68, 68, 0.3)',
            }}
          >
            <XCircle size={13} /> Reprovada
          </span>
        );
      default:
        return (
          <span
            className="key-badge-btn"
            style={{
              backgroundColor: 'rgba(245, 158, 11, 0.15)',
              color: '#F59E0B',
              borderColor: 'rgba(245, 158, 11, 0.3)',
            }}
          >
            <Clock size={13} /> Em Análise
          </span>
        );
    }
  };

  return (
    <div className="auth-form">
      <div className="auth-method-selector" role="tablist">
        <button
          type="button"
          className={`auth-method-btn ${filterStatus === 'todos' ? 'active' : ''}`}
          onClick={() => setFilterStatus('todos')}
        >
          <span>Todas</span>
        </button>
        <button
          type="button"
          className={`auth-method-btn ${filterStatus === 'analise' ? 'active' : ''}`}
          onClick={() => setFilterStatus('analise')}
        >
          <span>Em Análise</span>
        </button>
        <button
          type="button"
          className={`auth-method-btn ${filterStatus === 'aprovado' ? 'active' : ''}`}
          onClick={() => setFilterStatus('aprovado')}
        >
          <span>Aprovadas</span>
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          maxHeight: '380px',
          overflowY: 'auto',
          paddingRight: '4px',
        }}
      >
        {listaFiltrada.length === 0 ? (
          <div className="auth-alert" style={{ textAlign: 'center' }}>
            Nenhuma solicitação encontrada para o filtro selecionado.
          </div>
        ) : (
          listaFiltrada.map((item, idx) => (
            <div
              key={idx}
              className="success-summary-box"
              style={{ padding: '1rem', position: 'relative' }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem',
                }}
              >
                <strong style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                  {item.idProposta}
                </strong>
                {getStatusBadge(item.status)}
              </div>

              <div className="summary-item">
                <span className="summary-label">Bem:</span>
                <span className="summary-value">{item.bemDescricao}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Valor Financiado:</span>
                <span className="summary-value">{item.valorFinanciado}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Parcela Mensal:</span>
                <span className="summary-value">
                  {item.prazoMeses}x de {item.valorParcela}
                </span>
              </div>

              {item.motivoReprovacao && (
                <div
                  className="auth-alert error"
                  style={{
                    marginTop: '0.6rem',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <AlertTriangle size={15} flexShrink={0} />
                  <span>
                    <strong>Motivo da Reprovação:</strong> {item.motivoReprovacao}
                  </span>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="form-security-footer">
        <Info size={14} className="security-icon" />
        <span>Atualizado em tempo real com o sistema de análise de crédito.</span>
      </div>
    </div>
  );
}

export default AcompanhamentoView;