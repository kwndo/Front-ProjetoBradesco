import React, { useState } from 'react';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  CreditCard,
  KeyRound,
  CheckCircle2,
} from 'lucide-react';

export function LoginForm({ onForgotPassword, onSuccessLogin, activeSegmentName }) {
  const [authMethod, setAuthMethod] = useState('cpf'); // 'cpf' | 'account'
  const [cpfOrEmail, setCpfOrEmail] = useState('');
  const [agencia, setAgencia] = useState('');
  const [conta, setConta] = useState('');
  const [contaDigito, setContaDigito] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [useVirtualKey, setUseVirtualKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Formatador dinâmico de CPF
  const handleCpfChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      if (value.length > 9) {
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
      } else if (value.length > 6) {
        value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
      } else if (value.length > 3) {
        value = value.replace(/(\d{3})/, '$1.');
      }
      setCpfOrEmail(value);
    } else {
      // Se for e-mail ou identificador livre
      setCpfOrEmail(e.target.value);
    }
    setLoginError('');
  };

  const handleAgenciaChange = (e) => {
    const v = e.target.value.replace(/\D/g, '').slice(0, 4);
    setAgencia(v);
  };

  const handleContaChange = (e) => {
    const v = e.target.value.replace(/\D/g, '').slice(0, 7);
    setConta(v);
  };

  const handleContaDigitoChange = (e) => {
    const v = e.target.value.replace(/[^0-9kK]/g, '').slice(0, 1).toUpperCase();
    setContaDigito(v);
  };

  // Preenchimento de teste rápido para facilidade de avaliação acadêmica
  const fillTestCredentials = () => {
    if (authMethod === 'cpf') {
      setCpfOrEmail('345.892.128-90');
    } else {
      setAgencia('1824');
      setConta('0382914');
      setContaDigito('8');
    }
    setPassword('Bradesco2026@');
    setLoginError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError('');

    if (authMethod === 'cpf' && !cpfOrEmail) {
      setLoginError('Por favor, informe seu CPF ou E-mail cadastrado.');
      return;
    }
    if (authMethod === 'account' && (!agencia || !conta)) {
      setLoginError('Por favor, informe agência e conta completas.');
      return;
    }
    if (!password) {
      setLoginError('Por favor, digite sua senha de 4 a 8 dígitos.');
      return;
    }

    setIsLoading(true);

    // Simulação de autenticação com latência realista
    setTimeout(() => {
      setIsLoading(false);
      const identifier = authMethod === 'cpf' ? cpfOrEmail : `Ag. ${agencia} / Cc. ${conta}-${contaDigito}`;
      onSuccessLogin({
        name: 'Kawan Silva',
        identifier,
        segment: activeSegmentName,
      });
    }, 1200);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      {/* Seletor de Método de Acesso Institucional Bradesco */}
      <div className="auth-method-selector" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={authMethod === 'cpf'}
          className={`auth-method-btn ${authMethod === 'cpf' ? 'active' : ''}`}
          onClick={() => {
            setAuthMethod('cpf');
            setLoginError('');
          }}
        >
          <User size={15} />
          <span>CPF ou E-mail</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={authMethod === 'account'}
          className={`auth-method-btn ${authMethod === 'account' ? 'active' : ''}`}
          onClick={() => {
            setAuthMethod('account');
            setLoginError('');
          }}
        >
          <CreditCard size={15} />
          <span>Agência e Conta</span>
        </button>
      </div>

      {loginError && (
        <div className="auth-alert error animate-shake" role="alert">
          <span>{loginError}</span>
        </div>
      )}

      {/* Campos de Identificação */}
      {authMethod === 'cpf' ? (
        <div className="form-group">
          <label htmlFor="login-identifier" className="form-label">
            CPF ou E-mail
          </label>
          <div className="input-with-icon">
            <User size={18} className="input-icon" />
            <input
              id="login-identifier"
              type="text"
              className="form-input"
              placeholder="000.000.000-00 ou seu e-mail"
              value={cpfOrEmail}
              onChange={handleCpfChange}
              autoComplete="username"
              required
            />
          </div>
        </div>
      ) : (
        <div className="form-row-account">
          <div className="form-group ag-group">
            <label htmlFor="login-agencia" className="form-label">
              Agência
            </label>
            <input
              id="login-agencia"
              type="text"
              className="form-input text-center"
              placeholder="0000"
              maxLength={4}
              value={agencia}
              onChange={handleAgenciaChange}
              required
            />
          </div>
          <div className="form-group cc-group">
            <label htmlFor="login-conta" className="form-label">
              Conta
            </label>
            <div className="conta-input-split">
              <input
                id="login-conta"
                type="text"
                className="form-input text-center"
                placeholder="0000000"
                maxLength={7}
                value={conta}
                onChange={handleContaChange}
                required
              />
              <span className="conta-separator">-</span>
              <input
                id="login-digito"
                type="text"
                className="form-input digito-input text-center"
                placeholder="0"
                maxLength={1}
                value={contaDigito}
                onChange={handleContaDigitoChange}
                required
              />
            </div>
          </div>
        </div>
      )}

      {/* Campo de Senha */}
      <div className="form-group">
        <div className="form-label-row">
          <label htmlFor="login-password" className="form-label">
            Senha de 4 ou 6 dígitos
          </label>
          <button
            type="button"
            className="text-link-btn"
            onClick={onForgotPassword}
            tabIndex={0}
          >
            Esqueci a senha
          </button>
        </div>
        <div className="input-with-icon">
          <Lock size={18} className="input-icon" />
          <input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            className="form-input"
            placeholder="Digite sua senha de acesso"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setLoginError('');
            }}
            autoComplete="current-password"
            required
          />
          <button
            type="button"
            className="password-toggle-btn"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
            title={showPassword ? 'Ocultar senha' : 'Exibir senha'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Opções de Segurança Adicionais */}
      <div className="login-options-row">
        <label className="checkbox-custom-label">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="checkbox-native"
          />
          <span className="checkbox-box">
            {rememberMe && <CheckCircle2 size={13} className="check-svg" />}
          </span>
          <span className="checkbox-text">Lembrar neste navegador</span>
        </label>

        <button
          type="button"
          className={`key-badge-btn ${useVirtualKey ? 'active' : ''}`}
          onClick={() => setUseVirtualKey(!useVirtualKey)}
          title="Ativar Chave de Segurança Eletrônica"
        >
          <Smartphone size={13} />
          <span>{useVirtualKey ? 'Chave Ativa' : 'Chave Virtual'}</span>
        </button>
      </div>

      {/* Botão de Ação Principal */}
      <button
        type="submit"
        className="btn-primary-bradesco"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="btn-loading-content">
            <span className="spinner-circle" />
            <span>Validando credenciais...</span>
          </span>
        ) : (
          <span className="btn-content">
            <span>Acessar Conta</span>
            <ArrowRight size={18} className="btn-arrow-icon" />
          </span>
        )}
      </button>

      {/* Botão de Teste Rápido */}
      <div className="demo-helper-box">
        <button
          type="button"
          className="demo-autofill-btn"
          onClick={fillTestCredentials}
        >
          <KeyRound size={13} />
          <span>Preencher dados de teste</span>
        </button>
      </div>

      {/* Rodapé de Segurança do Formulário */}
      <div className="form-security-footer">
        <ShieldCheck size={14} className="security-icon" />
        <span>Ambiente Criptografado 256-bit SSL • Certificado Bradesco</span>
      </div>
    </form>
  );
}

export default LoginForm;
