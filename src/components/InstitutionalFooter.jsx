import React from 'react';
import { Phone, Headphones, Shield, Accessibility, ExternalLink } from 'lucide-react';

/**
 * Rodapé Institucional Bradesco
 * Implementa as diretrizes do Brandbook (Página 45 - Telefones Obrigatórios):
 * - Fone Fácil Bradesco
 * - SAC Alô Bradesco
 * - Atendimento em Libras
 * - Ouvidoria
 */
export function InstitutionalFooter() {
  return (
    <footer className="institutional-footer">
      <div className="footer-container">
        {/* Canais Obrigatórios Brandbook p.45 */}
        <div className="footer-channels-grid">
          <div className="footer-channel-item">
            <div className="channel-icon-circle">
              <Phone size={16} />
            </div>
            <div className="channel-info">
              <span className="channel-name">Fone Fácil Bradesco</span>
              <span className="channel-number">4002 0022 / 0800 570 0022</span>
              <span className="channel-hours">Capitais e regiões metropolitanas / Demais regiões</span>
            </div>
          </div>

          <div className="footer-channel-item">
            <div className="channel-icon-circle">
              <Headphones size={16} />
            </div>
            <div className="channel-info">
              <span className="channel-name">SAC – Alô Bradesco</span>
              <span className="channel-number">0800 704 8383</span>
              <span className="channel-hours">Reclamações, cancelamentos e informações 24h</span>
            </div>
          </div>

          <div className="footer-channel-item">
            <div className="channel-icon-circle">
              <Accessibility size={16} />
            </div>
            <div className="channel-info">
              <span className="channel-name">Deficiência Auditiva / Libras</span>
              <span className="channel-number">0800 722 0099</span>
              <span className="channel-hours">Atendimento inclusivo em Libras 24 horas</span>
            </div>
          </div>

          <div className="footer-channel-item">
            <div className="channel-icon-circle">
              <Shield size={16} />
            </div>
            <div className="channel-info">
              <span className="channel-name">Ouvidoria Bradesco</span>
              <span className="channel-number">0800 727 9933</span>
              <span className="channel-hours">Seg. a sex., das 09h às 18h (exceto feriados)</span>
            </div>
          </div>
        </div>

        {/* Linha Divisória */}
        <div className="footer-divider" />

        {/* Declaração Institucional Oficial */}
        <div className="footer-bottom-row">
          <div className="footer-legal">
            <p>
              <strong>Banco Bradesco S.A.</strong> | CNPJ: 60.746.948/0001-12 | Cidade de Deus, s/nº, Vila Yara, Osasco, SP, CEP 06029-900.
            </p>
            <p className="academic-badge-text">
              Ambiente de Internet Banking desenvolvido em React com base nas diretrizes do Brandbook Oficial Bradesco (Fev 2026), com aplicação do Logo Vertical com Descritivo e Suporte a Tema Escuro.
            </p>
          </div>
          <div className="footer-links">
            <a href="https://banco.bradesco" target="_blank" rel="noreferrer" className="footer-link">
              Portal Oficial <ExternalLink size={12} />
            </a>
            <a href="https://banco.bradesco/seguranca" target="_blank" rel="noreferrer" className="footer-link">
              Segurança <ExternalLink size={12} />
            </a>
            <a href="https://banco.bradesco/privacidade" target="_blank" rel="noreferrer" className="footer-link">
              Privacidade LGPD <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default InstitutionalFooter;
