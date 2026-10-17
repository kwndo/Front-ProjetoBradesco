import React, { useState } from 'react';
import { X, Mail, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export function RecoveryModal({ isOpen, onClose }) {
  const [emailOrCpf, setEmailOrCpf] = useState('');
  const [step, setStep] = useState(1); // 1: input, 2: success
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailOrCpf.trim()) {
      setError('Por favor, informe seu CPF ou E-mail cadastrado.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1000);
  };

  const handleReset = () => {
    setStep(1);
    setEmailOrCpf('');
    setError('');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleReset}>
      <div
        className="modal-card animate-zoom-in"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="recovery-modal-title"
      >
        <button
          type="button"
          className="modal-close-btn"
          onClick={handleReset}
          aria-label="Fechar modal"
        >
          <X size={20} />
        </button>

        {step === 1 ? (
          <div>
            <div className="modal-header">
              <div className="modal-icon-badge">
                <ShieldCheck size={26} color="#CC092F" />
              </div>
              <h3 id="recovery-modal-title" className="modal-title">
                Recuperação de Acesso
              </h3>
              <p className="modal-subtitle">
                Informe o CPF ou e-mail cadastrado no Bradesco para receber as instruções de redefinição de senha com segurança.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group mb-4">
                <label htmlFor="recovery-input" className="form-label">
                  CPF ou E-mail
                </label>
                <div className="input-with-icon">
                  <Mail size={18} className="input-icon" />
                  <input
                    id="recovery-input"
                    type="text"
                    className="form-input"
                    placeholder="000.000.000-00 ou nome@email.com"
                    value={emailOrCpf}
                    onChange={(e) => {
                      setEmailOrCpf(e.target.value);
                      setError('');
                    }}
                    required
                  />
                </div>
                {error && <span className="field-error-msg">{error}</span>}
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleReset}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-primary-bradesco"
                  disabled={isLoading}
                >
                  {isLoading ? 'Enviando link...' : 'Enviar Instruções'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="modal-success-content text-center py-4">
            <div className="success-icon-badge">
              <CheckCircle2 size={48} color="#10B981" />
            </div>
            <h3 className="modal-title">Instruções Enviadas!</h3>
            <p className="modal-subtitle">
              Enviamos um token de verificação e um link seguro para{' '}
              <strong>{emailOrCpf}</strong>. Verifique sua caixa de entrada e siga as orientações.
            </p>
            <button
              type="button"
              className="btn-primary-bradesco mt-4"
              onClick={handleReset}
            >
              Voltar para o Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecoveryModal;
