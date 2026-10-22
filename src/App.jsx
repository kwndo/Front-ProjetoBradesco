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
import { ShieldCheck, Sparkles, UserCheck, LogOut, ChevronRight } from 'lucide-react';
import './App.css';

export function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('bradesco_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Estado do Utilizador Autenticado: inicializa logado para exibir a tela de Cadastro de Bens
  const [currentUser, setCurrentUser] = useState(() => {
    const isLoggedOut = localStorage.getItem('bradesco_logged_out');
    if (isLoggedOut === 'true') return null;
    const saved = localStorage.getItem('bradesco_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    // Usuário padrão para acesso direto à tela de cadastro de bens
    return {
      name: 'Kawan Silva',
      identifier: '345.892.128-90',
      segment: 'prime',
    };
  });

  // Aba do formulário público inicial (Login/Cadastro)
  const [publicTab, setPublicTab] = useState('login');

  // Aba interna do perfil logado ('bens' | 'simulacao' | 'acompanhamento')
  const [internalTab, setInternalTab] = useState('bens');

  const [isRecoveryOpen, setIsRecoveryOpen] = useState(false);
  const with2DEffect = true;

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
    localStorage.removeItem('bradesco_logged_out');
    localStorage.setItem('bradesco_user', JSON.stringify(userData));
    setCurrentUser(userData);
    setInternalTab('bens'); // Redireciona diretamente para a tela de Cadastro de Bens
  };

  // Handler de Sucesso no Registro
  const handleRegisterSuccess = (regData) => {
    localStorage.removeItem('bradesco_logged_out');
    const user = {
      name: regData.fullName,
      identifier: regData.cpf,
      segment: 'prime',
    };
    localStorage.setItem('bradesco_user', JSON.stringify(user));
    setCurrentUser(user);
    setInternalTab('bens');
  };

  // Handler de Logout
  const handleLogout = () => {
    localStorage.setItem('bradesco_logged_out', 'true');
    localStorage.removeItem('bradesco_user');
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
      {/* HEADER SUPERIOR BRADESCO */}
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

      {/* ÁREA PRINCIPAL */}
      <main className={`main-content ${currentUser ? 'portal-mode' : 'auth-mode'}`}>
        {!currentUser ? (
          /* VISTA PÚBLICA (LOGIN / CADASTRO): HERO À ESQUERDA + CARD À DIREITA */
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
              </div>
            </section>
          </div>
        ) : (
          /* TELA DE CADASTRO DE BENS & PORTAL AUTENTICADO: FORMULÁRIO COM O TAMANHO DA TELA (SEM HERO / SEM IMAGEM DA ESQUERDA) */
          <div className="portal-full-container">
            {/* Barra Superior do Portal do Cliente */}
            <div className="portal-header-bar">
              <div className="portal-brand-area">
                <BradescoLogo descritivo="prime" isDarkMode={isDarkMode} size="sm" showTagline={false} withEffect2D={with2DEffect} />
                <div className="portal-divider" />
                <div className="portal-stepper" aria-label="Etapas do Financiamento">
                  <span className={`stepper-step ${internalTab === 'bens' ? 'active' : cadastradoBem ? 'completed' : ''}`}>
                    <span className="step-num">1</span>
                    <span className="step-text">Cadastro de Bens</span>
                  </span>
                  <ChevronRight size={14} className="stepper-arrow" />
                  <span className={`stepper-step ${internalTab === 'simulacao' ? 'active' : propostas.length > 0 ? 'completed' : ''}`}>
                    <span className="step-num">2</span>
                    <span className="step-text">Simulação</span>
                  </span>
                  <ChevronRight size={14} className="stepper-arrow" />
                  <span className={`stepper-step ${internalTab === 'acompanhamento' ? 'active' : ''}`}>
                    <span className="step-num">3</span>
                    <span className="step-text">Acompanhamento</span>
                  </span>
                </div>
              </div>

              {/* Perfil do Usuário e Botão de Logout */}
              <div className="portal-user-meta">
                <div className="user-profile-badge">
                  <div className="user-avatar-circle">
                    <UserCheck size={18} />
                  </div>
                  <div className="user-info-text">
                    <span className="user-name">{currentUser.name}</span>
                    <span className="user-segment">Prime • {currentUser.identifier}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="portal-logout-btn"
                  title="Sair da Conta"
                >
                  <LogOut size={15} />
                  <span>Sair</span>
                </button>
              </div>
            </div>

            {/* Abas de Navegação das Telas Internas */}
            <div className="portal-nav-tabs" role="tablist">
              <button
                type="button"
                className={`portal-tab-btn ${internalTab === 'bens' ? 'active' : ''}`}
                onClick={() => setInternalTab('bens')}
              >
                <span>1. Cadastro do Bem</span>
              </button>
              <button
                type="button"
                className={`portal-tab-btn ${internalTab === 'simulacao' ? 'active' : ''}`}
                onClick={() => setInternalTab('simulacao')}
              >
                <span>2. Simulação de Crédito</span>
              </button>
              <button
                type="button"
                className={`portal-tab-btn ${internalTab === 'acompanhamento' ? 'active' : ''}`}
                onClick={() => setInternalTab('acompanhamento')}
              >
                <span>3. Acompanhamento {propostas.length > 0 ? `(${propostas.length})` : ''}</span>
              </button>
            </div>

            {/* Card com o tamanho da tela para o Formulário de Cadastro de Bens */}
            <div className="portal-screen-card animate-zoom-in">
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
          </div>
        )}
      </main>

      <RecoveryModal isOpen={isRecoveryOpen} onClose={() => setIsRecoveryOpen(false)} />
      <InstitutionalFooter />
    </div>
  );
}

export default App;