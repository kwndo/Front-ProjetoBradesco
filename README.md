# 🏦 Plataforma de Financiamento Bradesco — Front-End

> **Aplicação Web Institucional para Simulação, Análise, Concessão de Financiamentos e Gestão de Contratos de Bens e Imóveis.**  
> Desenvolvida em conformidade visual com o **Brandbook Oficial do Banco Bradesco** (Fev 2026), com arquitetura moderna em React, Vite, design responsivo, suporte completo a temas Claro/Escuro e preparada para integração com Back-end em **Java (Spring Boot) e banco de dados PostgreSQL**.

---

## 📌 Sumário

1. [Visão Geral do Projeto](#-visão-geral-do-projeto)
2. [Escopo e Requisitos de Negócio](#-escopo-e-requisitos-de-negócio)
3. [Funcionalidades e Telas do Front-End](#-funcionalidades-e-telas-do-front-end)
4. [Design System e Identidade Visual Bradesco](#-design-system-e-identidade-visual-bradesco)
5. [Estrutura do Projeto](#-estrutura-do-projeto)
6. [Guia de Execução Local do Front-End](#-guia-de-execução-local-do-front-end)
7. [Guia Completo de Integração com Back-End Java (Spring Boot)](#-guia-completo-de-integração-com-back-end-java-spring-boot)
   - [7.1. Diagrama de Comunicação](#71-diagrama-de-comunicação)
   - [7.2. Modelagem do Banco de Dados (PostgreSQL)](#72-modelagem-do-banco-de-dados-postgresql)
   - [7.3. Especificação dos Endpoints REST](#73-especificação-dos-endpoints-rest)
   - [7.4. Implementação de Exemplo em Spring Boot](#74-implementação-de-exemplo-em-spring-boot)
   - [7.5. Configuração de CORS no Spring Boot](#75-configuração-de-cors-no-spring-boot)
   - [7.6. Camada de Integração no Front-End (Service / Axios / Fetch)](#76-camada-de-integração-no-front-end-service--axios--fetch)
8. [Matriz de Conformidade com os Requisitos](#-matriz-de-conformidade-com-os-requisitos)

---

## 🎯 Visão Geral do Projeto

O **Front-ProjetoBradesco** é uma interface de autoatendimento financeiro de alta fidelidade visual, focada na contratação e gestão de crédito de bens para clientes Bradesco Prime e Clássico.

A aplicação cobre todo o ciclo de vida do crédito:
1. **Autenticação Segura** (Login via CPF ou Agência/Conta e Cadastro de Clientes com validação de idade mínima).
2. **Cadastro de Bens** (Imóveis, veículos e qualquer tipo de bens com cálculo do limite financiado de até 90%).
3. **Motor de Simulação de Financiamento** (Cálculo com juros compostos, prazos de 12 a 60 meses, valor financiado, entrada e custo total).
4. **Solicitação e Submissão para Análise Automática** (Geração de ID único de proposta e validação de regras de crédito).
5. **Acompanhamento de Propostas, Geração de Contratos e Controle de Parcelas** (Acompanhamento em tempo real, contratos gerados, monitoramento de saldo devedor, controle de inadimplência com multa de 2% + 0,033%/dia e visualização de contratos ativos e quitados).

---

## 📋 Escopo e Requisitos de Negócio

| Item | Descrição do Requisito | Status no Front |
| :--- | :--- | :---: |
| **1.1** | **Financiamento Geral**: Imóveis, veículos e qualquer categoria de bens. | ✅ Implementado |
| **1.2** | **Ciclo Completo**: Simular, submeter proposta, acompanhar aprovação, visualizar contrato, controlar pagamentos e monitorar saldo devedor. | ✅ Implementado |
| **2.1** | **Cadastro de Clientes**: Dados armazenados e validados para persistência no PostgreSQL. | ✅ Implementado |
| **2.2** | **Cadastro de Bens**: Informações detalhadas do objeto a ser financiado. | ✅ Implementado |
| **2.3** | **Simulação do Financiamento**: Valor financiado, entrada, parcelas, juros composto, valor da parcela e total pago. | ✅ Implementado |
| **2.4** | **Solicitação de Financiamento**: Conversão da simulação em proposta com ID único e status *"Em análise"*. | ✅ Implementado |
| **2.5** | **Aprovação Automática**: Validações de Renda > 3x parcela, idade > 18 anos, financiamento até 90% e Score ≥ 600. | ✅ Implementado |
| **2.6** | **Geração de Contrato**: Emissão do contrato após aprovação da solicitação com dados pertinentes. | ✅ Implementado |
| **2.7** | **Controle de Parcelas**: Status detalhado das parcelas do contrato (*Pendente*, *Paga*, *Atrasada*). | ✅ Implementado |
| **2.8** | **Registro de Pagamentos**: Atualização de saldo devedor, situação da parcela e data de liquidação. | ✅ Implementado |
| **2.9** | **Controle de Inadimplência**: Multa fixa de 2% sobre valor original da parcela após 1º dia de atraso + juros de mora de 0,033%/dia acumulados. | ✅ Implementado |
| **2.10**| **Visualização de Contratos**: Consulta de financiamentos Ativos e Quitados. | ✅ Implementado |
| **3.1** | **Segurança de Acesso**: Autenticação com login e senha protegidos. | ✅ Implementado |
| **3.2** | **Desempenho**: Interface ágil com feedback visual em menos de 3 segundos. | ✅ Implementado |

---

## 💻 Funcionalidades e Telas do Front-End

### 1. Tela de Acesso e Cadastro de Clientes (Área Pública)
- **Acessar Conta**: Formulário com alternância entre login por **CPF / E-mail** ou **Agência e Conta Bradesco**, campo de senha com medidor visual e botão de visualização/ocultação, e suporte a Chave Virtual.
- **Cadastro de Clientes**: Formulário completo com validações de Nome Completo, CPF, Celular, E-mail, confirmação de senha com cálculo de força de senha (8 dígitos, maiúsculas, números e caracteres especiais) e termo de aceite atestando maioridade (18+ anos).
- **Hero Institucional**: Apresentação da marca Bradesco com grafismo oficial, badges de segurança SSL e fotografia promocional.
- **Recuperação de Senha**: Modal interativo para solicitação de redefinição de credenciais via e-mail ou SMS.

### 2. Tela de Cadastro de Bens (Área do Cliente — Tela Cheia)
- **Layout Executivo Full-Screen**: Ocupa a largura total da página sem as distrações do painel lateral da tela inicial, mantendo Header e Footer institucionais.
- **Categorias Interativas**:
  - **Veículo**: Automóveis, motos, caminhões e utilitários leves.
  - **Imóvel**: Casas, apartamentos, terrenos e salas comerciais.
  - **Qualquer Tipo de Bens**: Máquinas industriais, maquinário agrícola e equipamentos.
- **Campos Estruturados**: Descrição completa do objeto, Identificação oficial (Placa/Chassi ou Matrícula no Cartório de Imóveis), Valor avaliado do bem com máscara em Reais (BRL) e Condição (*Novo / 0 Km* vs. *Seminovo / Usado*).
- **Painel de Resumo da Garantia em Tempo Real**: Sidebar dinâmica que acompanha a digitação, exibindo o limite máximo de financiamento pré-calculado (90%) e vantagens institucionais.

### 3. Tela de Simulação do Financiamento
- **Entrada de Parâmetros**:
  - Valor do Bem (preenchido automaticamente a partir do cadastro do bem).
  - Valor de Entrada (com validação para não ultrapassar o valor do bem).
  - Quantidade de Parcelas (12, 24, 36, 48 ou 60 meses).
  - Taxa de Juros Anual (cálculo de juros compostos em capitalização mensal).
- **Card de Resultados Imediatos (2.3)**:
  - *Valor financiado*
  - *Valor Entrada*
  - *Quantidade de parcelas*
  - *Juros (composto)*
  - *Valor da parcela mensal*
  - *Valor total pago ao final do contrato*
- **Submissão de Proposta**: Transforma a simulação em proposta oficial, gera o número único de solicitação (ID) e encaminha para análise automática de crédito.

### 4. Tela de Acompanhamento de Propostas e Contratos
- **Filtros Rápidos de Consulta (2.10)**:
  - *Todos os Financiamentos*
  - *Em Análise* (ID único gerado, aguardando validação automática de Score e Renda)
  - *Ativos / Contrato Criado* (Financiamentos vigentes com parcelas em pagamento e saldo devedor atualizado)
  - *Quitados* (Contratos finalizados com 100% das parcelas pagas)
- **Detalhes de Cada Solicitação**:
  - Número Único de Solicitação (ID) e Código do Contrato Gerado.
  - Objeto financiado e valor original contratado.
  - Saldo devedor dinâmico e status das parcelas (*Pendente*, *Paga*, *Atrasada*).
  - Exibição de alertas detalhados em caso de reprovação automática (ex.: renda inferior a 3x a parcela, score abaixo de 600 ou financiamento acima de 90%).
  - Alerta informativo com as regras oficiais de inadimplência (multa de 2% + 0,033% ao dia de mora).

---

## 🎨 Design System e Identidade Visual Bradesco

O front-end utiliza o **Brandbook Oficial do Bradesco**:
- **Cores Oficiais**:
  - `--bradesco-red`: `#CC092F` (PMS 186 — Vermelho Bradesco principal).
  - `--bradesco-dark-red`: `#900F15` (PMS 7427 — Vermelho Escuro institucional).
  - `--bradesco-vibrant-red`: `#E00B39` (Cor de apoio para CTAs e destaques).
- **Tipografia**: Família *Plus Jakarta Sans* / *Bradesco Sans* com pesos 400, 500, 600, 700 e 800.
- **Dark Mode Nativo**: Alternância instantânea via seletor deslizante no topo direito, com persistência no `localStorage`.
- **Acessibilidade e Microinterações**: Feedback tátil com estados `:hover`, `:focus`, `:active`, animações de carregamento (*spinners* integrados) e animações de tremor (*shake*) em caso de erro de validação.

---

## 📂 Estrutura do Projeto

```plaintext
Front-ProjetoBradesco/
├── index.html                   # Ponto de entrada HTML5 com SEO e tipografia
├── package.json                 # Dependências e scripts do projeto
├── vite.config.js               # Configurações do Vite e plugins
├── public/                      # Recursos estáticos públicos
│   └── hero-bradesco.jpg        # Imagem institucional de financiamento
└── src/
    ├── main.jsx                 # Inicialização do React 19
    ├── index.css                # Tokens CSS do Brandbook (variáveis de cor, reset e dark mode)
    ├── App.jsx                  # Componente Raiz: gerencia estados de autenticação e navegação
    ├── App.css                  # Estilização completa das telas, componentes e responsividade
    └── components/
        ├── BradescoLogo.jsx     # Logotipo oficial em vetor SVG (versões Prime, Clássico e Negócios)
        ├── ThemeToggle.jsx      # Alternador de tema Claro / Escuro em formato de pílula
        ├── LoginForm.jsx        # Formulário de autenticação segura (CPF/Agência/Conta + Senha)
        ├── RegisterForm.jsx     # Formulário de cadastro de clientes com medidor de força de senha
        ├── RecoveryModal.jsx    # Modal de recuperação e redefinição de senha
        ├── BensForm.jsx         # Formulário executivo de cadastro de bens (Full-Screen)
        ├── SimulacaoForm.jsx    # Motor de cálculo e simulação de crédito com juros compostos
        ├── AcompanhamentoView.jsx# Visão de propostas, contratos, saldo devedor e parcelas
        ├── InstitutionalFooter.jsx # Rodapé oficial com telefones, SAC, Ouvidoria e compliance
        ├── SegmentSelector.jsx  # Seletor de segmentos (Prime, Clássico, Exclusive, etc.)
        └── SuccessView.jsx      # Tela de confirmação e recibo de solicitação realizada
```

---

## 🚀 Guia de Execução Local do Front-End

### Pré-requisitos
- **Node.js** (versão 18.x ou superior recomendada)
- **NPM** (versão 9.x ou superior) ou **Yarn** / **PNPM**

### 1. Clonar o Repositório
```bash
git clone https://github.com/kwndo/Front-ProjetoBradesco.git
cd Front-ProjetoBradesco
```

### 2. Instalar as Dependências
```bash
npm install
```

### 3. Executar o Servidor de Desenvolvimento
```bash
npm run dev
```
A aplicação iniciará por padrão em: **`http://localhost:5173/`**

### 4. Executar o Linter (Oxlint)
```bash
npm run lint
```

### 5. Gerar a Build de Produção
```bash
npm run build
```
Os arquivos otimizados para produção serão gerados no diretório `dist/`.

---

## 🔗 Guia Completo de Integração com Back-End Java (Spring Boot)

Esta seção fornece um roteiro detalhado para que a equipe de back-end conecte este front-end a um ecossistema **Java 17/21 com Spring Boot 3.x e PostgreSQL**.

```
+-------------------------------------------------------------------------------+
|                             ARQUITETURA GERAL                                 |
|                                                                               |
|   +-----------------------+              HTTP / REST (JSON)                   |
|   |                       |  ------------------------------------------->     |
|   |  FRONT-END REACT      |        Bearer Token JWT / CORS Permitido          |
|   |  (Vite @ Porta 5173)  |  <-------------------------------------------     |
|   |                       |              Responses DTOs / Status              |
|   +-----------------------+                                                   |
|                                                                               |
|                                            |                                  |
|                                            v                                  |
|                                                                               |
|   +-----------------------------------------------------------------------+   |
|   |                      BACK-END JAVA (SPRING BOOT 3)                    |   |
|   |                                                                       |   |
|   |   [Spring Security]  -> Filtra requisições e valida JWT               |   |
|   |   [Controllers]      -> Recebe DTOs (Auth, Bens, Simulação, etc.)     |   |
|   |   [Services]         -> Aplica regras de negócio (Score, Renda 3x,    |   |
|   |                         Multa 2% + 0,033%/dia, Juros Compostos)       |   |
|   |   [Spring Data JPA]  -> Mapeia entidades e executa queries SQL        |   |
|   +-----------------------------------------------------------------------+   |
|                                            |                                  |
|                                            v                                  |
|   +-----------------------------------------------------------------------+   |
|   |                       BANCO DE DADOS (POSTGRESQL)                     |   |
|   |                                                                       |   |
|   |   Tabelas: cliente, bem, proposta_financiamento, contrato, parcela,   |   |
|   |            pagamento_parcela                                          |   |
|   +-----------------------------------------------------------------------+   |
+-------------------------------------------------------------------------------+
```

---

### 7.1. Diagrama de Comunicação

O front-end se comunica com o back-end via chamadas HTTP REST padronizadas, trafegando *payloads* em formato JSON. Todas as rotas autenticadas da Área do Cliente exigem o cabeçalho:
```http
Authorization: Bearer <TOKEN_JWT>
```

---

### 7.2. Modelagem do Banco de Dados (PostgreSQL)

Execute o script DDL abaixo no PostgreSQL para criar o banco de dados oficial do sistema:

```sql
-- Criação do banco de dados
CREATE DATABASE bradesco_financiamentos;
\c bradesco_financiamentos;

-- 1. Tabela de Clientes (Requisito 2.1)
CREATE TABLE cliente (
    id BIGSERIAL PRIMARY KEY,
    nome_completo VARCHAR(150) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    celular VARCHAR(20) NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    renda_mensal NUMERIC(12, 2) NOT NULL DEFAULT 5000.00,
    score_credito INT NOT NULL DEFAULT 750,
    segmento VARCHAR(20) DEFAULT 'PRIME',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabela de Bens (Requisito 2.2)
CREATE TABLE bem (
    id BIGSERIAL PRIMARY KEY,
    cliente_id BIGINT NOT NULL REFERENCES cliente(id) ON DELETE CASCADE,
    tipo_bem VARCHAR(20) NOT NULL CHECK (tipo_bem IN ('veiculo', 'imovel', 'outro')),
    descricao TEXT NOT NULL,
    identificacao VARCHAR(100),
    condicao VARCHAR(20) DEFAULT 'seminovo',
    valor_avaliado NUMERIC(14, 2) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabela de Propostas / Solicitações de Financiamento (Requisitos 2.3, 2.4, 2.5)
CREATE TABLE proposta_financiamento (
    id BIGSERIAL PRIMARY KEY,
    numero_proposta VARCHAR(30) UNIQUE NOT NULL, -- Ex: PROP-839201
    cliente_id BIGINT NOT NULL REFERENCES cliente(id),
    bem_id BIGINT NOT NULL REFERENCES bem(id),
    valor_bem NUMERIC(14, 2) NOT NULL,
    valor_entrada NUMERIC(14, 2) NOT NULL,
    valor_financiado NUMERIC(14, 2) NOT NULL,
    prazo_meses INT NOT NULL,
    taxa_juros_anual NUMERIC(6, 2) NOT NULL,
    valor_parcela NUMERIC(12, 2) NOT NULL,
    valor_total_pago NUMERIC(14, 2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'EM_ANALISE' CHECK (status IN ('EM_ANALISE', 'APROVADO', 'REPROVADO')),
    motivo_reprovacao TEXT,
    data_solicitacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabela de Contratos Gerados (Requisito 2.6 e 2.10)
CREATE TABLE contrato (
    id BIGSERIAL PRIMARY KEY,
    numero_contrato VARCHAR(40) UNIQUE NOT NULL, -- Ex: CTR-2026-839201
    proposta_id BIGINT UNIQUE NOT NULL REFERENCES proposta_financiamento(id),
    cliente_id BIGINT NOT NULL REFERENCES cliente(id),
    saldo_devedor NUMERIC(14, 2) NOT NULL,
    status_contrato VARCHAR(20) NOT NULL DEFAULT 'ATIVO' CHECK (status_contrato IN ('ATIVO', 'QUITADO', 'CANCELADO')),
    data_emissao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_quitacao TIMESTAMP
);

-- 5. Tabela de Parcelas (Requisitos 2.7, 2.8 e 2.9)
CREATE TABLE parcela (
    id BIGSERIAL PRIMARY KEY,
    contrato_id BIGINT NOT NULL REFERENCES contrato(id) ON DELETE CASCADE,
    numero_parcela INT NOT NULL,
    valor_original NUMERIC(12, 2) NOT NULL,
    data_vencimento DATE NOT NULL,
    status_parcela VARCHAR(20) NOT NULL DEFAULT 'PENDENTE' CHECK (status_parcela IN ('PENDENTE', 'PAGA', 'ATRASADA')),
    dias_atraso INT DEFAULT 0,
    valor_multa NUMERIC(12, 2) DEFAULT 0.00,       -- 2% sobre o valor original
    valor_juros_mora NUMERIC(12, 2) DEFAULT 0.00,  -- 0.033% ao dia
    valor_total_devido NUMERIC(12, 2) NOT NULL,
    data_pagamento TIMESTAMP,
    valor_pago NUMERIC(12, 2)
);
```

---

### 7.3. Especificação dos Endpoints REST

#### 1. Autenticação e Clientes (`/api/auth`)
- **`POST /api/auth/login`**
  - **Body (JSON)**:
    ```json
    {
      "identificador": "345.892.128-90",
      "senha": "SenhaDoCliente123@"
    }
    ```
  - **Resposta (200 OK)**:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "cliente": {
        "id": 1,
        "nome": "Kawan Silva",
        "cpf": "345.892.128-90",
        "segmento": "prime"
      }
    }
    ```

- **`POST /api/auth/register`**
  - **Body (JSON)**:
    ```json
    {
      "nomeCompleto": "Mariana Duarte Souza",
      "cpf": "456.789.012-34",
      "email": "mariana.duarte@email.com.br",
      "celular": "(11) 98765-4321",
      "senha": "SenhaForte123#",
      "dataNascimento": "1998-05-15",
      "concordaTermos": true
    }
    ```

#### 2. Cadastro de Bens (`/api/bens`)
- **`POST /api/bens`**
  - **Headers**: `Authorization: Bearer <TOKEN>`
  - **Body (JSON)**:
    ```json
    {
      "tipoBem": "veiculo",
      "descricao": "Toyota Corolla Sedan 2.0 Flex 2024",
      "identificacao": "ABC-1D23",
      "condicao": "seminovo",
      "valorAvaliado": 120000.00
    }
    ```
  - **Resposta (201 Created)**:
    ```json
    {
      "id": "BEM-4821",
      "tipoBem": "veiculo",
      "descricao": "Toyota Corolla Sedan 2.0 Flex 2024",
      "identificacao": "ABC-1D23",
      "valorNumerico": 120000.00,
      "valorFormatado": "R$ 120.000,00"
    }
    ```

#### 3. Simulação e Propostas (`/api/financiamentos`)
- **`POST /api/financiamentos/simular`**
  - **Body (JSON)**:
    ```json
    {
      "valorBem": 120000.00,
      "valorEntrada": 24000.00,
      "prazoMeses": 36,
      "taxaJurosAnual": 12.5
    }
    ```
  - **Resposta (200 OK)**:
    ```json
    {
      "valorFinanciado": 96000.00,
      "percentualFinanciado": 80.0,
      "valorEntrada": 24000.00,
      "prazoMeses": 36,
      "taxaJurosAnual": 12.5,
      "valorParcela": 3180.45,
      "valorTotalPago": 138496.20
    }
    ```

- **`POST /api/financiamentos/propostas`** (Submissão e Análise Automática)
  - **Body (JSON)**:
    ```json
    {
      "bemId": 4821,
      "valorBem": 120000.00,
      "valorEntrada": 24000.00,
      "prazoMeses": 36,
      "taxaJurosAnual": 12.5
    }
    ```
  - **Regras aplicadas no Back-end**:
    1. Percentual financiado $\le 90\%$.
    2. Idade do cliente $\ge 18$ anos.
    3. Renda do cliente $> 3 \times \text{valor da parcela}$.
    4. Score do cliente $\ge 600$.
  - **Resposta (201 Created)**:
    ```json
    {
      "idProposta": "PROP-839201",
      "contratoId": "CTR-2026-839201",
      "status": "APROVADO",
      "motivoReprovacao": null,
      "valorFinanciado": "R$ 96.000,00",
      "valorParcela": "R$ 3.180,45",
      "saldoDevedor": "R$ 96.000,00"
    }
    ```

#### 4. Acompanhamento e Contratos (`/api/contratos`)
- **`GET /api/contratos/cliente`**
  - Retorna a lista de financiamentos do cliente com suporte aos filtros: `todos`, `analise`, `ativo` e `quitado`.
- **`POST /api/parcelas/{id}/pagar`**
  - Registra o pagamento de uma parcela, recalcula o saldo devedor e, se todas as parcelas forem pagas, altera o status do contrato para `QUITADO`.

---

### 7.4. Implementação de Exemplo em Spring Boot

#### 1. Service com o Motor de Regras Automáticas (Java 17+)
```java
package br.com.bradesco.financiamento.service;

import br.com.bradesco.financiamento.dto.PropostaRequestDTO;
import br.com.bradesco.financiamento.dto.PropostaResponseDTO;
import br.com.bradesco.financiamento.model.Cliente;
import br.com.bradesco.financiamento.model.Contrato;
import br.com.bradesco.financiamento.model.PropostaFinanciamento;
import br.com.bradesco.financiamento.repository.ContratoRepository;
import br.com.bradesco.financiamento.repository.PropostaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.Period;

@Service
public class AnaliseCreditoService {

    private final PropostaRepository propostaRepository;
    private final ContratoRepository contratoRepository;

    public AnaliseCreditoService(PropostaRepository propostaRepository, ContratoRepository contratoRepository) {
        this.propostaRepository = propostaRepository;
        this.contratoRepository = contratoRepository;
    }

    @Transactional
    public PropostaResponseDTO avaliarESubmeterProposta(Cliente cliente, PropostaRequestDTO dto) {
        BigDecimal valorFinanciado = dto.valorBem().subtract(dto.valorEntrada());
        BigDecimal percentualFinanciado = valorFinanciado
                .divide(dto.valorBem(), 4, RoundingMode.HALF_UP)
                .multiply(BigDecimal.valueOf(100));

        // 1. Cálculo da Parcela com Juros Compostos (Price)
        double taxaMensal = Math.pow(1 + (dto.taxaJurosAnual() / 100.0), 1.0 / 12.0) - 1.0;
        double fator = Math.pow(1 + taxaMensal, dto.prazoMeses());
        double parcelaCalculada = (valorFinanciado.doubleValue() * (taxaMensal * fator)) / (fator - 1);
        BigDecimal valorParcela = BigDecimal.valueOf(parcelaCalculada).setScale(2, RoundingMode.HALF_UP);

        // Validação das Regras Automáticas (Requisito 2.5)
        String motivoReprovacao = null;
        boolean aprovado = true;

        int idade = Period.between(cliente.getDataNascimento(), LocalDate.now()).getYears();
        if (idade < 18) {
            aprovado = false;
            motivoReprovacao = "Regra 2.5: Titular com idade inferior a 18 anos.";
        } else if (percentualFinanciado.compareTo(BigDecimal.valueOf(90)) > 0) {
            aprovado = false;
            motivoReprovacao = "Regra 2.5: Percentual financiado ultrapassa o limite máximo de 90% do valor do bem.";
        } else if (cliente.getScoreCredito() < 600) {
            aprovado = false;
            motivoReprovacao = "Regra 2.5: Score de crédito inferior a 600 pontos.";
        } else if (cliente.getRendaMensal().compareTo(valorParcela.multiply(BigDecimal.valueOf(3))) < 0) {
            aprovado = false;
            motivoReprovacao = String.format("Regra 2.5: Renda mensal comprovada inferior a 3x o valor da parcela (exigido R$ %.2f).",
                    valorParcela.multiply(BigDecimal.valueOf(3)).doubleValue());
        }

        // Criar Proposta
        PropostaFinanciamento proposta = new PropostaFinanciamento();
        proposta.setNumeroProposta("PROP-" + (int)(100000 + Math.random() * 900000));
        proposta.setCliente(cliente);
        proposta.setValorFinanciado(valorFinanciado);
        proposta.setValorParcela(valorParcela);
        proposta.setStatus(aprovado ? "APROVADO" : "REPROVADO");
        proposta.setMotivoReprovacao(motivoReprovacao);
        propostaRepository.save(proposta);

        String contratoId = null;
        // Se aprovado, gera automaticamente o Contrato (Requisito 2.6)
        if (aprovado) {
            Contrato contrato = new Contrato();
            contrato.setNumeroContrato("CTR-2026-" + (int)(100000 + Math.random() * 900000));
            contrato.setProposta(proposta);
            contrato.setCliente(cliente);
            contrato.setSaldoDevedor(valorFinanciado);
            contrato.setStatusContrato("ATIVO");
            contratoRepository.save(contrato);
            contratoId = contrato.getNumeroContrato();
        }

        return new PropostaResponseDTO(
                proposta.getNumeroProposta(),
                contratoId,
                proposta.getStatus(),
                proposta.getMotivoReprovacao(),
                valorFinanciado,
                valorParcela
        );
    }
}
```

#### 2. Cálculo de Inadimplência das Parcelas (Requisito 2.9)
```java
package br.com.bradesco.financiamento.service;

import br.com.bradesco.financiamento.model.Parcela;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Component
public class InadimplenciaCalculator {

    // Regra 2.9: Multa fixa de 2% e juros de mora de 0,033% ao dia
    private static final BigDecimal TAXA_MULTA = BigDecimal.valueOf(0.02);
    private static final BigDecimal TAXA_MORA_DIARIA = BigDecimal.valueOf(0.00033);

    public void atualizarValoresAtraso(Parcela parcela) {
        if (parcela.getDataVencimento().isBefore(LocalDate.now()) && !"PAGA".equals(parcela.getStatusParcela())) {
            long diasAtraso = ChronoUnit.DAYS.between(parcela.getDataVencimento(), LocalDate.now());
            if (diasAtraso > 0) {
                parcela.setStatusParcela("ATRASADA");
                parcela.setDiasAtraso((int) diasAtraso);

                // Multa fixa de 2% sobre o valor original da parcela
                BigDecimal multa = parcela.getValorOriginal().multiply(TAXA_MULTA);

                // Juros de 0,033% por dia sobre o valor original
                BigDecimal jurosMora = parcela.getValorOriginal()
                        .multiply(TAXA_MORA_DIARIA)
                        .multiply(BigDecimal.valueOf(diasAtraso));

                parcela.setValorMulta(multa.setScale(2, RoundingMode.HALF_UP));
                parcela.setValorJurosMora(jurosMora.setScale(2, RoundingMode.HALF_UP));
                parcela.setValorTotalDevido(parcela.getValorOriginal().add(multa).add(jurosMora).setScale(2, RoundingMode.HALF_UP));
            }
        }
    }
}
```

---

### 7.5. Configuração de CORS no Spring Boot

Para permitir que a aplicação React (rodando em `http://localhost:5173` ou na porta de produção) efetue requisições à API sem bloqueios de segurança do navegador, declare a seguinte classe de configuração:

```java
package br.com.bradesco.financiamento.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173", "http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

---

### 7.6. Camada de Integração no Front-End (Service / Axios / Fetch)

Crie um arquivo centralizado de API no front-end em `src/services/api.js`:

```javascript
// src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

/**
 * Cliente HTTP base para comunicação com o Spring Boot
 */
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('bradesco_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Erro HTTP ${response.status}: Falha na operação.`);
  }

  return response.json();
}

export const apiService = {
  // 1. Autenticação (Requisito 3.1)
  login: (credentials) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (clienteData) => request('/auth/register', { method: 'POST', body: JSON.stringify(clienteData) }),

  // 2. Cadastro de Bens (Requisito 2.2)
  cadastrarBem: (bemData) => request('/bens', { method: 'POST', body: JSON.stringify(bemData) }),

  // 3. Simulação e Propostas (Requisitos 2.3, 2.4, 2.5)
  simularFinanciamento: (params) => request('/financiamentos/simular', { method: 'POST', body: JSON.stringify(params) }),
  submeterProposta: (propostaData) => request('/financiamentos/propostas', { method: 'POST', body: JSON.stringify(propostaData) }),

  // 4. Acompanhamento, Contratos e Parcelas (Requisitos 1.2, 2.6, 2.7, 2.8, 2.10)
  listarContratos: (filtro = 'todos') => request(`/contratos/cliente?status=${filtro}`),
  pagarParcela: (parcelaId) => request(`/parcelas/${parcelaId}/pagar`, { method: 'POST' }),
};
```

---

## 📊 Matriz de Conformidade com os Requisitos

| Item | Requisito do Documento | Como o Front-End Atende | Como o Back-End Java Integra |
| :---: | :--- | :--- | :--- |
| **1.1** | Financiamento geral (imóveis, veículos, bens) | Seleção interativa em `BensForm.jsx` com ícones e máscaras específicas. | Tabela `bem` com coluna `tipo_bem` e validação no DTO. |
| **1.2** | Ciclo completo de financiamento | Stepper de 3 etapas no header do portal e telas integradas no `App.jsx`. | Controladores REST orquestrando proposta, contrato e parcelas. |
| **2.1** | Cadastro de Clientes | Tela de cadastro com validação de CPF, e-mail, celular e confirmação de senha. | Entidade `Cliente` mapeada no PostgreSQL com senha em BCrypt. |
| **2.2** | Informações do objeto financiado | Formulário full-screen com descrição, placa/matrícula, valor e condição. | Endpoint `POST /api/bens` persistindo na tabela `bem`. |
| **2.3** | Informações completas de simulação | Card com Valor Financiado, Entrada, Parcelas, Juros Compostos e Total Pago. | `POST /api/financiamentos/simular` retornando cálculo exato pela Tabela Price. |
| **2.4** | ID único e status *"Em análise"* | Conversão instantânea da simulação com geração de ID `PROP-XXXXXX`. | `POST /api/financiamentos/propostas` gravando status `EM_ANALISE`. |
| **2.5** | Aprovação automática e validações | Alertas visuais e regras explicitadas nas legendas e feedback do formulário. | `AnaliseCreditoService` aplicando validações de Score, Renda 3x e 90%. |
| **2.6** | Geração de contrato | Propostas aprovadas exibem o número do contrato `CTR-2026-XXXXXX`. | Entidade `Contrato` criada automaticamente no banco após aprovação. |
| **2.7** | Controle de parcelas | Acompanhamento com status *Pendente*, *Paga* e *Atrasada*. | Tabela `parcela` com cronograma completo de vencimentos. |
| **2.8** | Registro de pagamentos | Exibição e atualização do saldo devedor e situação da parcela. | Endpoint de liquidação deduzindo do saldo devedor do contrato. |
| **2.9** | Controle de inadimplência | Alerta institucional informando multa de 2% + 0,033% ao dia de mora. | `InadimplenciaCalculator` no Java recalculando juros diariamente via Cron. |
| **2.10**| Visualizar contratos Ativos e Quitados | Filtros rápidos *Ativos* e *Quitados* no topo de `AcompanhamentoView.jsx`. | Query JPA filtrando por `status_contrato IN ('ATIVO', 'QUITADO')`. |
| **3.1** | Segurança de acesso | Telas de login e cadastro protegidas com autenticação em token. | Spring Security com JWT e hash de senhas via `BCryptPasswordEncoder`. |
| **3.2** | Desempenho (< 3s) | Transições fluidas em milissegundos e feedback visual com spinners de loading. | Endpoints REST otimizados com índices no PostgreSQL e paginação. |

---

## 👨‍💻 Autoria e Tecnologias

- **Front-End**: React 19, Vite, Vanilla CSS com Design Tokens Bradesco, Lucide Icons, Oxlint.
- **Back-End Recomendado**: Java 17/21, Spring Boot 3.x (Spring Web, Spring Security, Spring Data JPA).
- **Banco de Dados**: PostgreSQL 15+.
- **Instituição / Identidade**: Banco Bradesco S.A.
