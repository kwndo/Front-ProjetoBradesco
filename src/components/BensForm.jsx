import React, { useState } from 'react';
import {
  Car,
  Home,
  Package,
  DollarSign,
  FileText,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export function BensForm({ onSuccessCadastroBem }) {
  const [tipoBem, setTipoBem] = useState('veiculo');
  const [descricao, setDescricao] = useState('');
  const [valorBem, setValorBem] = useState('');
  const [identificacao, setIdentificacao] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleValorChange = (e) => {
    let raw = e.target.value.replace(/\D/g, '');
    if (!raw) {
      setValorBem('');
      return;
    }
    const valFloat = parseFloat(raw) / 100;
    setValorBem(
      valFloat.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
    );
    setError('');
  };

  const handleAutoFill = () => {
    setTipoBem('veiculo');
    setDescricao('Toyota Corolla Sedan 2.0 Flex 2024');
    setIdentificacao('ABC-1D23');
    setValorBem('R$ 120.000,00');
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const numericValue = parseFloat(
      valorBem.replace(/[^\d,]/g, '').replace(',', '.')
    );

    if (!descricao.trim()) {
      setError('Por favor, descreva o bem que deseja financiar.');
      return;
    }
    if (!numericValue || numericValue <= 0) {
      setError('O valor do bem deve ser maior que R$ 0,00.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const payload = {
        id: `BEM-${Math.floor(1000 + Math.random() * 9000)}`,
        tipoBem,
        descricao,
        identificacao: identificacao || 'N/A',
        valorNumerico: numericValue,
        valorFormatado: valorBem,
      };
      onSuccessCadastroBem(payload);
    }, 1000);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <div className="demo-helper-box">
        <button
          type="button"
          className="demo-autofill-btn"
          onClick={handleAutoFill}
        >
          <Sparkles size={13} />
          <span>Preencher bem de exemplo</span>
        </button>
      </div>

      <div className="form-group">
        <label className="form-label">Tipo do Bem</label>
        <div className="auth-method-selector" role="tablist">
          <button
            type="button"
            className={`auth-method-btn ${tipoBem === 'veiculo' ? 'active' : ''}`}
            onClick={() => setTipoBem('veiculo')}
          >
            <Car size={15} />
            <span>Veículo</span>
          </button>
          <button
            type="button"
            className={`auth-method-btn ${tipoBem === 'imovel' ? 'active' : ''}`}
            onClick={() => setTipoBem('imovel')}
          >
            <Home size={15} />
            <span>Imóvel</span>
          </button>
          <button
            type="button"
            className={`auth-method-btn ${tipoBem === 'outro' ? 'active' : ''}`}
            onClick={() => setTipoBem('outro')}
          >
            <Package size={15} />
            <span>Outro</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="auth-alert error animate-shake" role="alert">
          <span>{error}</span>
        </div>
      )}

      <div className="form-group">
        <label htmlFor="bem-descricao" className="form-label">
          Descrição / Modelo do Bem
        </label>
        <div className="input-with-icon">
          <FileText size={18} className="input-icon" />
          <input
            id="bem-descricao"
            type="text"
            className="form-input"
            placeholder={
              tipoBem === 'veiculo'
                ? 'Ex: Honda Civic 2.0 Flex 2023'
                : tipoBem === 'imovel'
                ? 'Ex: Apartamento 2 quartos - São Paulo/SP'
                : 'Ex: Maquinário Industrial'
            }
            value={descricao}
            onChange={(e) => {
              setDescricao(e.target.value);
              setError('');
            }}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="bem-identificacao" className="form-label">
          Identificação (Placa, Matrícula ou Chassi)
        </label>
        <div className="input-with-icon">
          <ShieldCheck size={18} className="input-icon" />
          <input
            id="bem-identificacao"
            type="text"
            className="form-input"
            placeholder={tipoBem === 'veiculo' ? 'Ex: BRA-2E19' : 'Ex: Matrícula nº 123.456'}
            value={identificacao}
            onChange={(e) => setIdentificacao(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="bem-valor" className="form-label">
          Valor Avaliado do Bem (R$)
        </label>
        <div className="input-with-icon">
          <DollarSign size={18} className="input-icon" />
          <input
            id="bem-valor"
            type="text"
            className="form-input"
            placeholder="R$ 0,00"
            value={valorBem}
            onChange={handleValorChange}
            required
          />
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
            <span>Cadastrando bem...</span>
          </span>
        ) : (
          <span className="btn-content">
            <span>Cadastrar e Avançar para Simulação</span>
            <ArrowRight size={18} className="btn-arrow-icon" />
          </span>
        )}
      </button>

      <div className="form-security-footer">
        <CheckCircle2 size={14} className="security-icon" />
        <span>Os bens cadastrados ficam vinculados ao seu perfil para simulações.</span>
      </div>
    </form>
  );
}

export default BensForm;