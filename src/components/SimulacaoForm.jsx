import React, { useState, useMemo } from 'react';
import {
  Calendar,
  DollarSign,
  Percent,
  CheckCircle2,
  Send,
} from 'lucide-react';

export function SimulacaoForm({ bemCadastrado, onSuccessSolicitacao }) {
  const valorInicialBem = bemCadastrado ? bemCadastrado.valorNumerico : 100000;

  const [valorBem, setValorBem] = useState(valorInicialBem);
  const [valorEntrada, setValorEntrada] = useState(valorInicialBem * 0.2);
  const [prazoMeses, setPrazoMeses] = useState(36);
  const [taxaJurosAnual, setTaxaJurosAnual] = useState(12.5);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const calculo = useMemo(() => {
    const financiado = valorBem - valorEntrada;
    if (financiado <= 0 || prazoMeses <= 0) {
      return { valorFinanciado: 0, parcela: 0, totalPago: 0, percentualFinanciado: 0 };
    }

    const percentualFinanciado = (financiado / valorBem) * 100;
    const taxaMensal = Math.pow(1 + taxaJurosAnual / 100, 1 / 12) - 1;

    let parcela = 0;
    if (taxaMensal === 0) {
      parcela = financiado / prazoMeses;
    } else {
      parcela =
        (financiado * (taxaMensal * Math.pow(1 + taxaMensal, prazoMeses))) /
        (Math.pow(1 + taxaMensal, prazoMeses) - 1);
    }

    const totalPago = valorEntrada + parcela * prazoMeses;

    return {
      valorFinanciado: financiado,
      parcela: Math.round(parcela * 100) / 100,
      totalPago: Math.round(totalPago * 100) / 100,
      percentualFinanciado: Math.round(percentualFinanciado * 10) / 10,
    };
  }, [valorBem, valorEntrada, prazoMeses, taxaJurosAnual]);

  const formatBRL = (val) =>
    val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const handleSolicitarProposta = (e) => {
    e.preventDefault();
    setError('');

    if (valorEntrada > valorBem) {
      setError('O valor da entrada não pode ser maior do que o valor do bem.');
      return;
    }
    if (calculo.percentualFinanciado > 90) {
      setError(
        `O financiamento máximo permitido é de 90% do valor do bem. (Atual: ${calculo.percentualFinanciado}%)`
      );
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const novaProposta = {
        idProposta: `PROP-${Math.floor(100000 + Math.random() * 900000)}`,
        dataSolicitacao: new Date().toLocaleDateString('pt-BR'),
        bemDescricao: bemCadastrado ? bemCadastrado.descricao : 'Bem Simulado',
        valorBem: formatBRL(valorBem),
        valorEntrada: formatBRL(valorEntrada),
        valorFinanciado: formatBRL(calculo.valorFinanciado),
        prazoMeses,
        valorParcela: formatBRL(calculo.parcela),
        totalPago: formatBRL(calculo.totalPago),
        status: 'Em análise',
      };
      onSuccessSolicitacao(novaProposta);
    }, 1200);
  };

  return (
    <form className="auth-form" onSubmit={handleSolicitarProposta} noValidate>
      {bemCadastrado && (
        <div
          className="auth-alert"
          style={{
            backgroundColor: 'var(--tag-bg)',
            color: 'var(--tag-text)',
            border: '1px solid rgba(204, 9, 47, 0.2)',
          }}
        >
          <strong>Bem Vinculado:</strong> {bemCadastrado.descricao} (
          {bemCadastrado.valorFormatado})
        </div>
      )}

      {error && (
        <div className="auth-alert error animate-shake" role="alert">
          <span>{error}</span>
        </div>
      )}

      <div className="form-row-account">
        <div className="form-group flex-1">
          <label className="form-label">Valor do Bem (R$)</label>
          <div className="input-with-icon">
            <DollarSign size={18} className="input-icon" />
            <input
              type="number"
              className="form-input"
              value={valorBem}
              onChange={(e) => {
                setValorBem(Number(e.target.value));
                setError('');
              }}
              min="1000"
              required
            />
          </div>
        </div>

        <div className="form-group flex-1">
          <label className="form-label">Valor da Entrada (R$)</label>
          <div className="input-with-icon">
            <DollarSign size={18} className="input-icon" />
            <input
              type="number"
              className="form-input"
              value={valorEntrada}
              onChange={(e) => {
                setValorEntrada(Number(e.target.value));
                setError('');
              }}
              min="0"
              required
            />
          </div>
        </div>
      </div>

      <div className="form-row-account">
        <div className="form-group flex-1">
          <label className="form-label">Prazo (Meses)</label>
          <div className="input-with-icon">
            <Calendar size={18} className="input-icon" />
            <select
              className="form-input"
              value={prazoMeses}
              onChange={(e) => setPrazoMeses(Number(e.target.value))}
            >
              <option value={12}>12 parcelas (1 ano)</option>
              <option value={24}>24 parcelas (2 anos)</option>
              <option value={36}>36 parcelas (3 anos)</option>
              <option value={48}>48 parcelas (4 anos)</option>
              <option value={60}>60 parcelas (5 anos)</option>
            </select>
          </div>
        </div>

        <div className="form-group flex-1">
          <label className="form-label">Taxa de Juros (% a.a.)</label>
          <div className="input-with-icon">
            <Percent size={18} className="input-icon" />
            <input
              type="number"
              className="form-input"
              value={taxaJurosAnual}
              onChange={(e) => setTaxaJurosAnual(Number(e.target.value))}
              step="0.1"
              required
            />
          </div>
        </div>
      </div>

      <div className="success-summary-box" style={{ marginTop: '0.5rem' }}>
        <div className="summary-item">
          <span className="summary-label">Valor Financiado:</span>
          <strong className="summary-value">
            {formatBRL(calculo.valorFinanciado)} ({calculo.percentualFinanciado}%)
          </strong>
        </div>
        <div className="summary-item">
          <span className="summary-label">Valor da Parcela Mensal:</span>
          <strong
            className="summary-value"
            style={{ color: 'var(--bradesco-red)', fontSize: '1.05rem' }}
          >
            {prazoMeses}x de {formatBRL(calculo.parcela)}
          </strong>
        </div>
        <div className="summary-item">
          <span className="summary-label">Custo Total Previsto:</span>
          <span className="summary-value">{formatBRL(calculo.totalPago)}</span>
        </div>
      </div>

      <button
        type="submit"
        className="btn-primary-bradesco"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="btn-loading-content">
            <span className="spinner-circle" />
            <span>Enviando proposta para análise...</span>
          </span>
        ) : (
          <span className="btn-content">
            <span>Transformar em Solicitação (Enviar)</span>
            <Send size={18} className="btn-arrow-icon" />
          </span>
        )}
      </button>

      <div className="form-security-footer">
        <CheckCircle2 size={14} className="security-icon" />
        <span>Sujeito a análise automática de crédito em tempo real.</span>
      </div>
    </form>
  );
}

export default SimulacaoForm;