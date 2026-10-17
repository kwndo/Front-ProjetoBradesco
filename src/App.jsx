import React, { useState, useEffect } from 'react';
import BradescoLogo from './components/BradescoLogo';
import ThemeToggle from './components/ThemeToggle';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import RecoveryModal from './components/RecoveryModal';
import SuccessView from './components/SuccessView';
import InstitutionalFooter from './components/InstitutionalFooter';
import {
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import './App.css';

export function App() {
  // Estado do Tema (Dark Mode vs Light Mode)
  // Armazena preferência no localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('bradesco_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Aba ativa: 'login' | 'register'
  const [activeTab, setActiveTab] = useState('login');

  // Modal de recuperação de senha
  const [isRecoveryOpen, setIsRecoveryOpen] = useState(false);

  // Efeito 2D no logotipo (recurso oficial do Brandbook p.25)
  const [with2DEffect, setWith2DEffect] = useState(true);

  // Estado de sucesso (quando logado ou cadastrado)
  const [successData, setSuccessData] = useState(null);
  const [successType, setSuccessType] = useState(null);

  // Sincroniza atributo data-theme no <html>
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

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleLoginSuccess = (userPayload) => {
    setSuccessData(userPayload);
    setSuccessType('login');
  };

  const handleRegisterSuccess = (regPayload) => {
    setSuccessData(regPayload);
    setSuccessType('register');
  };

  const handleBackToAuth = () => {
    setSuccessData(null);
    setSuccessType(null);
  };

  return (
    <div className={`app-root ${isDarkMode ? 'theme-dark' : 'theme-light'}`}>
      {/* Background institucional com grafismos do símbolo Bradesco (Brandbook p.26) */}
      <div className="bradesco-bg-watermark" aria-hidden="true">
        <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M-50 400 C 150 150, 480 80, 850 320"
            stroke="currentColor"
            strokeWidth="80"
            strokeOpacity="0.035"
          />
          <path
            d="M50 500 C 250 250, 600 180, 950 420"
            stroke="currentColor"
            strokeWidth="50"
            strokeOpacity="0.025"
          />
        </svg>
      </div>

      {/* HEADER SUPERIOR */}
      <header className="app-header">
        <div className="header-inner">
          {/* Lado Esquerdo: Identificação Institucional Segura (sem a palavra acadêmico) */}
          <div className="header-left">
            <div className="institutional-badge">
              <ShieldCheck size={17} className="security-badge-icon" />
              <span>Ambiente Seguro • Banco Bradesco</span>
            </div>
          </div>

          {/* Lado Direito: OPÇÃO NO CANTO SUPERIOR DIREITO PARA TEMA ESCURO (Requisito Principal) */}
          <div className="header-right">
            <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
          </div>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL (SPLIT HERO BANCÁRIO) */}
      <main className="main-content">
        <div className="auth-container">
          {/* COLUNA ESQUERDA: HERO BANCÁRIO INSTITUCIONAL */}
          <aside className="hero-section">
            <div className="hero-content">
              {/* Badge de Destaque */}
              <div className="hero-badge">
                <Sparkles size={14} className="badge-sparkle" />
                <span>Internet Banking & Soluções Financeiras</span>
              </div>

              {/* Título Principal de Impacto */}
              <h1 className="hero-title">
                O banco completo para o seu dia a dia e para o seu futuro.
              </h1>

              {/* Assinatura de Marca Bradesco (Brandbook p.23-24) */}
              <p className="hero-tagline">
                <strong className="tagline-highlight">Você primeiro.</strong> Soluções completas de conta digital, crédito, investimentos, cartões e Pix com a solidez e tradição do Bradesco.
              </p>

              {/* Fotografia Bradesco Lifestyle Bancário */}
              <div className="hero-image-wrapper">
                <img
                  src="/hero-bradesco.jpg"
                  alt="Cliente conectado utilizando as soluções financeiras digitais do Banco Bradesco"
                  className="hero-image"
                  loading="eager"
                />
              </div>
            </div>
          </aside>

          {/* COLUNA DIREITA: CARD DE LOGIN E CADASTRO */}
          <section className="auth-card-section">
            <div className="auth-card-box">
              {successData ? (
                /* Tela de Sucesso após Login ou Cadastro */
                <SuccessView
                  data={successData}
                  type={successType}
                  onBack={handleBackToAuth}
                  isDarkMode={isDarkMode}
                />
              ) : (
                <>
                  {/* CABEÇALHO DO CARD: LOGO VERTICAL COM DESCRITIVO (Brandbook p.6) */}
                  <div className="auth-card-brand-header">
                    <BradescoLogo
                      descritivo="prime"
                      isDarkMode={isDarkMode}
                      size="md"
                      showTagline={true}
                      withEffect2D={with2DEffect}
                    />

                    {/* Botão sutil para alternar o Efeito 2D do Brandbook (p.25) */}
                    <button
                      type="button"
                      className="effect-toggle-pill"
                      onClick={() => setWith2DEffect(!with2DEffect)}
                      title="Alternar efeito 2D iluminado do símbolo (Brandbook p.25)"
                    >
                      <Sparkles size={11} />
                      <span>{with2DEffect ? 'Efeito 2D Ativo' : 'Efeito Flat'}</span>
                    </button>
                  </div>

                  {/* ABAS DE NAVEGAÇÃO: ENTRAR / CRIAR CONTA */}
                  <div className="auth-tabs-nav" role="tablist">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeTab === 'login'}
                      className={`tab-nav-btn ${activeTab === 'login' ? 'active' : ''}`}
                      onClick={() => setActiveTab('login')}
                    >
                      <span>Acessar Conta</span>
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeTab === 'register'}
                      className={`tab-nav-btn ${activeTab === 'register' ? 'active' : ''}`}
                      onClick={() => setActiveTab('register')}
                    >
                      <span>Criar conta</span>
                    </button>
                  </div>

                  {/* FORMULÁRIO DINÂMICO CONFORME ABA SELECIONADA */}
                  <div className="auth-tab-content">
                    {activeTab === 'login' ? (
                      <LoginForm
                        onForgotPassword={() => setIsRecoveryOpen(true)}
                        onSuccessLogin={handleLoginSuccess}
                        activeSegmentName="prime"
                      />
                    ) : (
                      <RegisterForm
                        onSuccessRegister={handleRegisterSuccess}
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* MODAL DE RECUPERAÇÃO DE SENHA */}
      <RecoveryModal
        isOpen={isRecoveryOpen}
        onClose={() => setIsRecoveryOpen(false)}
      />

      {/* RODAPÉ INSTITUCIONAL COM CANAIS OFICIAIS (BRANDBOOK P.45) */}
      <InstitutionalFooter />
    </div>
  );
}

export default App;
