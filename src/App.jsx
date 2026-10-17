import React, { useState, useEffect } from 'react';
import BradescoLogo from './components/BradescoLogo';
import ThemeToggle from './components/ThemeToggle';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import BensForm from './components/BensForm';
import SimulacaoForm from './components/SimulacaoForm';
import AcompanhamentoView from './components/AcompanhamentoView';
import RecoveryModal from './components/RecoveryModal';
import InstitutionalFooter from './components/InstitutionalFooter';
import { ShieldCheck, Sparkles, UserCheck, LogOut } from 'lucide-react';
import './App.css';

export function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('bradesco_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Estado do Utilizador Autenticado
  const [currentUser, setCurrentUser] = useState(null);

  // Aba do formulário inicial (Login/Cadastro)
  const [publicTab, setPublicTab] = useState('login');

  // Aba interna do perfil logado ('bens' | 'simulacao' | 'acompanhamento')
  const [internalTab, setInternalTab] = useState('bens');

  const [isRecoveryOpen, setIsRecoveryOpen] = useState(false);
  const [with2DEffect, setWith2DEffect] = useState(true);

  // Dados armazenados durante a sessão do utilizador
  const [cadastradoBem, setCadastradoBem] = useState(null);
  const [propostas, setPropostas] = useState([]);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('bradesco_theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('bradesco_theme', 'light');
    }
  }, [isDarkMode]);

  // Handler de Sucesso no Login
  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    setInternalTab('bens'); // Redireciona diretamente para o Cadastro de Bens
  };

  // Handler de Sucesso no Registo
  const handleRegisterSuccess = (regData) => {
    setCurrentUser({
      name: regData.fullName,
      identifier: regData.cpf,
      segment: 'prime',
    });
    setInternalTab('bens');
  };

  // Handler de Logout
  const handleLogout = () => {
    setCurrentUser(null);
    setCadastradoBem(null);
    setPublicTab('login');
  };

  const handleCadastroBemSuccess = (bemPayload) => {
    setCadastradoBem(bemPayload);
    setInternalTab('simulacao'); // Avança para a simulação
  };

  const handleSolicitacaoSuccess = (novaProposta) => {
    setPropostas((prev) => [novaProposta, ...prev]);
    setInternalTab('acompanhamento'); // Avança para acompanhamento
  };

  return (
    <div className={`app-root ${isDarkMode ? 'theme-dark' : 'theme-light'}`}>
      <header className="app-header">
        <div className="header-inner">
          <div className="header-left">
            <div className="institutional-badge">
              <ShieldCheck size={17} className="security-badge-icon" />
              <span>Ambiente Seguro • Financiamento Bradesco</span>
            </div>
          </div>
          <div className="header-right">
            <ThemeToggle isDarkMode={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="auth-container">
          {/* LADO ESQUERDO: HERO */}
          <aside className="hero-section">
            <div className="hero-content">
              <div className="hero-badge">
                <Sparkles size={14} className="badge-sparkle" />
                <span>Simulador de Financiamentos</span>
              </div>
              <h1 className="hero-title">Realize os seus projetos com as melhores taxas.</h1>
              <p className="hero-tagline">
                <strong className="tagline-highlight">Você primeiro.</strong> Soluções de financiamento personalizadas com análise em tempo real.
              </p>
              <div className="hero-image-wrapper">
                <img src="/hero-bradesco.jpg" alt="Financiamento Bradesco" className="hero-image" />
              </div>
            </div>
          </aside>

          {/* LADO DIREITO: CARD PRINCIPAL */}
          <section className="auth-card-section">
            <div className="auth-card-box">
              <div className="auth-card-brand-header">
                <BradescoLogo descritivo="prime" isDarkMode={isDarkMode} size="md" showTagline={true} withEffect2D={with2DEffect} />
              </div>

              {!currentUser ? (
                /* VISTA PÚBLICA: LOGIN / CADASTRAR */
                <>
                  <div className="auth-tabs-nav" role="tablist">
                    <button
                      type="button"
                      className={`tab-nav-btn ${publicTab === 'login' ? 'active' : ''}`}
                      onClick={() => setPublicTab('login')}
                    >
                      <span>Acessar Conta</span>
                    </button>
                    <button
                      type="button"
                      className={`tab-nav-btn ${publicTab === 'register' ? 'active' : ''}`}
                      onClick={() => setPublicTab('register')}
                    >
                      <span>Criar conta</span>
                    </button>
                  </div>

                  <div className="auth-tab-content">
                    {publicTab === 'login' ? (
                      <LoginForm
                        onForgotPassword={() => setIsRecoveryOpen(true)}
                        onSuccessLogin={handleLoginSuccess}
                        activeSegmentName="prime"
                      />
                    ) : (
                      <RegisterForm onSuccessRegister={handleRegisterSuccess} />
                    )}
                  </div>
                </>
              ) : (
                /* VISTA AUTENTICADA: ÁREA DO CLIENTE (BENS, SIMULAÇÃO, ACOMPANHAR) */
                <>
                  {/* Cabeçalho do Perfil do Cliente */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.6rem 0.9rem',
                      marginBottom: '1rem',
                      borderRadius: '12px',
                      backgroundColor: 'var(--bg-card-secondary)',
                      border: '1px solid var(--card-border)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <UserCheck size={18} style={{ color: 'var(--bradesco-red)' }} />
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                          {currentUser.name}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          {currentUser.identifier}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="text-link-btn"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem' }}
                      title="Sair da Conta"
                    >
                      <LogOut size={14} />
                      <span>Sair</span>
                    </button>
                  </div>

                  {/* NAVEGAÇÃO INTERNA DAS TUAS TELAS */}
                  <div className="auth-tabs-nav" role="tablist">
                    <button
                      type="button"
                      className={`tab-nav-btn ${internalTab === 'bens' ? 'active' : ''}`}
                      onClick={() => setInternalTab('bens')}
                    >
                      Bens
                    </button>
                    <button
                      type="button"
                      className={`tab-nav-btn ${internalTab === 'simulacao' ? 'active' : ''}`}
                      onClick={() => setInternalTab('simulacao')}
                    >
                      Simulação
                    </button>
                    <button
                      type="button"
                      className={`tab-nav-btn ${internalTab === 'acompanhamento' ? 'active' : ''}`}
                      onClick={() => setInternalTab('acompanhamento')}
                    >
                      Acompanhar
                    </button>
                  </div>

                  {/* RENDERIZAÇÃO DAS TUAS TELAS DENTRO DO PERFIL */}
                  <div className="auth-tab-content">
                    {internalTab === 'bens' && (
                      <BensForm onSuccessCadastroBem={handleCadastroBemSuccess} />
                    )}
                    {internalTab === 'simulacao' && (
                      <SimulacaoForm
                        bemCadastrado={cadastradoBem}
                        onSuccessSolicitacao={handleSolicitacaoSuccess}
                      />
                    )}
                    {internalTab === 'acompanhamento' && (
                      <AcompanhamentoView propostas={propostas} />
                    )}
                  </div>
                </>
              )}
            </div>
          </section>
        </div>
      </main>

      <RecoveryModal isOpen={isRecoveryOpen} onClose={() => setIsRecoveryOpen(false)} />
      <InstitutionalFooter />
    </div>
  );
}

export default App;