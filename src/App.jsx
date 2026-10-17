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
import { ShieldCheck, Sparkles } from 'lucide-react';
import './App.css';

export function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('bradesco_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [activeTab, setActiveTab] = useState('login');
  const [isRecoveryOpen, setIsRecoveryOpen] = useState(false);
  const [with2DEffect, setWith2DEffect] = useState(true);

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

  const handleCadastroBemSuccess = (bemPayload) => {
    setCadastradoBem(bemPayload);
    setActiveTab('simulacao');
  };

  const handleSolicitacaoSuccess = (novaProposta) => {
    setPropostas((prev) => [novaProposta, ...prev]);
    setActiveTab('acompanhamento');
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
          <aside className="hero-section">
            <div className="hero-content">
              <div className="hero-badge">
                <Sparkles size={14} className="badge-sparkle" />
                <span>Simulador de Financiamentos</span>
              </div>
              <h1 className="hero-title">Realize os seus projetos com as melhores taxas.</h1>
              <p className="hero-tagline">
                <strong className="tagline-highlight">Simule em instantes.</strong> Financiamento de veículos, imóveis e bens com aprovação ágil.
              </p>
              <div className="hero-image-wrapper">
                <img src="/hero-bradesco.jpg" alt="Financiamento Bradesco" className="hero-image" />
              </div>
            </div>
          </aside>

          <section className="auth-card-section">
            <div className="auth-card-box">
              <div className="auth-card-brand-header">
                <BradescoLogo descritivo="prime" isDarkMode={isDarkMode} size="md" showTagline={true} withEffect2D={with2DEffect} />
              </div>

              <div className="auth-tabs-nav" role="tablist" style={{ overflowX: 'auto' }}>
                <button type="button" className={`tab-nav-btn ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')}>
                  Acessar
                </button>
                <button type="button" className={`tab-nav-btn ${activeTab === 'bens' ? 'active' : ''}`} onClick={() => setActiveTab('bens')}>
                  Bens
                </button>
                <button type="button" className={`tab-nav-btn ${activeTab === 'simulacao' ? 'active' : ''}`} onClick={() => setActiveTab('simulacao')}>
                  Simulação
                </button>
                <button type="button" className={`tab-nav-btn ${activeTab === 'acompanhamento' ? 'active' : ''}`} onClick={() => setActiveTab('acompanhamento')}>
                  Acompanhar
                </button>
              </div>

              <div className="auth-tab-content">
                {activeTab === 'login' && <LoginForm onForgotPassword={() => setIsRecoveryOpen(true)} onSuccessLogin={() => setActiveTab('bens')} activeSegmentName="prime" />}
                {activeTab === 'register' && <RegisterForm onSuccessRegister={() => setActiveTab('bens')} />}
                {activeTab === 'bens' && <BensForm onSuccessCadastroBem={handleCadastroBemSuccess} />}
                {activeTab === 'simulacao' && <SimulacaoForm bemCadastrado={cadastradoBem} onSuccessSolicitacao={handleSolicitacaoSuccess} />}
                {activeTab === 'acompanhamento' && <AcompanhamentoView propostas={propostas} />}
              </div>
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