# Plataforma de Cartões Digitais

## Sobre o projeto

MoMents é uma plataforma de cartões digitais desenvolvida para permitir que usuários encontrem, personalizem e adquiram cartões de forma totalmente online. O projeto foi pensado como uma forma prática e personalizada de presentear pessoas especiais em diferentes ocasiões, como aniversários, datas de relacionamento, aniversários de casamento e outras celebrações.

O sistema está atualmente em produção e é utilizado por usuários reais, contemplando todo o fluxo desde a apresentação dos produtos e personalização dos cartões até o processo de aquisição.

## Funcionalidades

* **Apresentação e prévia do produto**

  * Página inicial com apresentação da plataforma.
  * Visualização de uma prévia do cartão antes de iniciar a criação.

* **Criação e personalização do cartão**

  * Definição de título.
  * Escolha de data ou ocasião.
  * Adição de mensagem ou dedicatória personalizada.
  * Upload de fotos.
  * Adição de música.
  * Escolha de animação para o cartão.

* **Pagamento**

  * Integração com pagamento via PIX.
  * Geração de QR Code para realização do pagamento.
  * Validação do pagamento para liberação do produto.

* **Entrega e acesso ao produto**

  * Página de confirmação após a conclusão da compra.
  * Apresentação das informações necessárias para acessar o cartão.
  * Envio automático das informações de acesso por e-mail.

## Tecnologias

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

