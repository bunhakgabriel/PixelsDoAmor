# 💜 PixelsDoAmor — Plataforma de Cartões Digitais

## 📖 Sobre o projeto

PixelsDoAmor é uma plataforma de cartões digitais desenvolvida para permitir que usuários encontrem, personalizem e adquiram cartões de forma totalmente online. O projeto foi pensado como uma forma prática e personalizada de presentear pessoas especiais em diferentes ocasiões, como aniversários, datas de relacionamento, aniversários de casamento e outras celebrações.

O sistema está atualmente em produção e é utilizado por usuários reais, contemplando todo o fluxo desde a apresentação dos produtos e personalização dos cartões até o processo de aquisição.

---

## ✨ Funcionalidades

### 🎨 Apresentação e prévia do produto

* Página inicial com apresentação da plataforma.
* Visualização de uma prévia do cartão antes de iniciar a criação.

### 💌 Criação e personalização do cartão

* Definição de título.
* Escolha de data ou ocasião.
* Adição de mensagem ou dedicatória personalizada.
* Upload de fotos.
* Adição de música.
* Escolha de animação para o cartão.

### 💳 Pagamento

* Integração com pagamento via PIX.
* Geração de QR Code para realização do pagamento.
* Validação do pagamento para liberação do produto.

### 📧 Entrega e acesso ao produto

* Página de confirmação após a conclusão da compra.
* Apresentação das informações necessárias para acessar o cartão.
* Envio automático das informações de acesso por e-mail.

---

## 🛠️ Tecnologias

### Frontend

* **React** — desenvolvimento da interface da aplicação.
* **TypeScript** — tipagem estática e maior segurança durante o desenvolvimento.
* **Tailwind CSS** — estilização e construção da interface.
* **React Hook Form** — gerenciamento e validação dos formulários de personalização do cartão.
* **Zustand** — gerenciamento de estado da aplicação.
* **TanStack Query** — gerenciamento de requisições e dados provenientes do backend.

### Backend

* **Node.js** — desenvolvimento das regras e serviços do backend.
* **Firebase Functions** — execução e disponibilização das funções backend em ambiente serverless.
* **Firebase** — serviços de infraestrutura utilizados pela aplicação.

### Integrações

* **Mercado Pago API** — integração com o fluxo de pagamento via PIX e geração do QR Code para pagamento.

---

## 🧩 Principais desafios técnicos

### 💳 Integração com o Mercado Pago

Um dos principais desafios foi implementar pela primeira vez uma integração com uma API de pagamentos. A aplicação utiliza a API do Mercado Pago para criar o fluxo de pagamento via PIX, gerar o QR Code e processar as informações necessárias para identificar a conclusão do pagamento e liberar o acesso ao produto.

### 📧 Envio automático de e-mails

Outro desafio foi implementar o envio automático de e-mails após a confirmação da compra. Após a conclusão do pagamento, o sistema processa as informações da aquisição e envia ao cliente as instruções necessárias para acessar o cartão adquirido.

Essas integrações representaram uma oportunidade de aplicar conceitos que ainda não havia utilizado em projetos anteriores, principalmente no desenvolvimento de fluxos envolvendo serviços externos e comunicação entre diferentes sistemas.

---

## 👨‍💻 Minha atuação no projeto

O projeto surgiu a partir de uma ideia própria de criar uma plataforma de cartões digitais personalizados. Fui responsável por transformar a ideia em um produto funcional, realizando o desenvolvimento de ponta a ponta.

Minha atuação incluiu:

* Definição da ideia e do fluxo do produto.
* Desenvolvimento completo do frontend utilizando React e TypeScript.
* Implementação das interfaces e experiência de personalização dos cartões.
* Desenvolvimento do backend utilizando Node.js e Firebase Functions.
* Integração com a API do Mercado Pago para processamento dos pagamentos via PIX.
* Implementação do fluxo de confirmação de pagamento e liberação do produto.
* Implementação do envio automático de e-mails após a conclusão da compra.
* Configuração e publicação da aplicação em ambiente de produção.
* Manutenção e evolução do produto após sua publicação.

---

## 🚀 Ambiente de produção

A aplicação está em produção desde **outubro de 2025** e está disponível para acesso público.

O sistema possui um fluxo completo de utilização, desde a criação e personalização do cartão até o pagamento e disponibilização do produto adquirido.

**Aplicação:** `https://pixelsdoamor.site/`

---

## 🎬 Demonstração

Abaixo está uma demonstração do fluxo de criação de uma WebPage, desde a personalização do cartão até a conclusão do processo.

### ▶️ Assista à demonstração completa

> **Clique na imagem abaixo para assistir ao vídeo no YouTube.**

[![Demonstração da plataforma](https://scontent.fbfh2-1.fna.fbcdn.net/v/t39.30808-6/774761631_1594098702248058_1399377443319480224_n.jpg?stp=dst-jpg_tt6&cstp=mx1314x635&ctp=s1314x635&_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=qLkv34smMU8Q7kNvwHmR8i4&_nc_oc=Adr39eH1HxR43fyHMAlWLy0CF8j6AtNBEQZTHx8fE_0JYyoKd2HCws7BXItg4PS2-3_SJ2w4-3183VCF0MT_6Fnh&_nc_zt=23&_nc_ht=scontent.fbfh2-1.fna&_nc_gid=wARTPMPQm3DdA8vgfzuYJg&_nc_ss=7b2a8&oh=00_AQGFhxpt0uUAmwdJEPapQikVVPZZRICPhWobt_vYs3ff8A&oe=6A8941E4)](https://www.youtube.com/watch?v=KEvLB9daT7k)

**▶️ Assistir à demonstração no YouTube**

---

## 📝 Observações

Este repositório apresenta o projeto e suas principais características técnicas. Informações sensíveis, credenciais, chaves de API e configurações privadas não fazem parte do repositório.

---
