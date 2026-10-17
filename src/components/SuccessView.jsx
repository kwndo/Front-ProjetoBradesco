import React from 'react';
import { CheckCircle2, User, LogOut, ShieldCheck, CreditCard } from 'lucide-react';
import BradescoLogo from './BradescoLogo';

export function SuccessView({ data, type, onBack, isDarkMode }) {
  const isRegister = type === 'register';

  return (
    <div className="success-view-card animate-zoom-in">
      <div className="success-header">
        <div className="success-badge-icon">
          <CheckCircle2 size={42} color="#10B981" />
        </div>

        {/* Logo Vertical com Descritivo na tela de sucesso */}
        <div className="my-4">
          <BradescoLogo
            descritivo={data.segment || 'prime'}
            isDarkMode={isDarkMode}
            size="md"
            showTagline={true}
          />
        </div>

        <h2 className="success-title">
          {isRegister ? 'Conta Aberta com Sucesso!' : 'Bem-vindo ao Banco Bradesco!'}
        </h2>
        <p className="success-desc">
          {isRegister
            ? 'Sua solicitação de abertura de conta foi concluída e aprovada com segurança.'
            : 'Autenticação segura realizada via criptografia de ponta a ponta.'}
        </p>
      </div>

      <div className="success-summary-box">
        <div className="summary-item">
          <span className="summary-label">Titular da Conta:</span>
          <span className="summary-value font-bold">{data.fullName || data.name}</span>
        </div>

        {data.identifier && (
          <div className="summary-item">
            <span className="summary-label">Identificação:</span>
            <span className="summary-value">{data.identifier}</span>
          </div>
        )}

        {data.cpf && (
          <div className="summary-item">
            <span className="summary-label">CPF:</span>
            <span className="summary-value">{data.cpf}</span>
          </div>
        )}

        {data.email && (
          <div className="summary-item">
            <span className="summary-label">E-mail Cadastrado:</span>
            <span className="summary-value">{data.email}</span>
          </div>
        )}

        {isRegister && data.protocol && (
          <div className="summary-item">
            <span className="summary-label">Protocolo de Abertura:</span>
            <span className="summary-value font-mono font-bold" style={{ color: '#CC092F' }}>
              {data.protocol}
            </span>
          </div>
        )}
      </div>

      <div className="success-action-buttons">
        <button
          type="button"
          className="btn-primary-bradesco"
          onClick={onBack}
        >
          <LogOut size={16} />
          <span>Voltar ao Acesso</span>
        </button>
      </div>

      <div className="success-security-note">
        <ShieldCheck size={14} />
        <span>Sessão ativa protegida pelo ecossistema de segurança Bradesco.</span>
      </div>
    </div>
  );
}

export default SuccessView;
