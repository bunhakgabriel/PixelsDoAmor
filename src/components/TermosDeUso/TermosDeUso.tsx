import { useNavigate } from "react-router-dom";
import BackButton from "../BackButton/BackButon";

export default function TermosDeUso() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="text-[18px] max-w-4xl mx-auto p-6">
        <BackButton
          text="Voltar para formulário"
          color="blue"
          onClick={() => navigate(-1)}
        />
      </div>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-2xl text-gray-800 leading-relaxed mb-10">
        <h1 className="text-3xl font-bold mb-4 text-center">Termos de Uso</h1>
        <p className="text-sm text-gray-500 text-center mb-8">
          Última atualização: 12 de outubro de 2025
        </p>

        <p>
          Bem-vindo(a) à nossa plataforma de{" "}
          <strong>cartões digitais personalizados</strong> PixelsDoAmor. Ao
          acessar ou utilizar nossos serviços, você concorda integralmente com
          os presentes Termos de Uso. Recomendamos que leia atentamente antes de
          prosseguir.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          1. Descrição do Serviço
        </h2>
        <p>
          A Plataforma permite que o usuário crie uma{" "}
          <strong>webpage digital personalizada</strong> (“Cartão Digital”) para
          momentos especiais, contendo textos, imagens, músicas e etc. O acesso
          ao Cartão Digital é concedido mediante{" "}
          <strong>pagamento único de R$ 5,90</strong>, com validade de{" "}
          <strong>12 (doze) meses </strong>a partir da data da confirmação do
          pagamento. Após os 12 meses será enviado um email para que o usuário
          faça a renovação do serviço por mais 12 meses pela metade do valor,
          até a renovação ser efetuada o acesso ao cartão será parcialmente
          bloqueado, e o usuário terá <strong>45 dias</strong> para fazer a
          renovação antes do cartão ser excluido.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          2. Cadastro e Responsabilidade do Usuário
        </h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            O usuário é responsável por fornecer informações verdadeiras,
            completas e atualizadas.
          </li>
          <li>
            É de responsabilidade exclusiva do usuário manter a
            confidencialidade de seus dados de acesso.
          </li>
          <li>
            O uso da Plataforma deve ser apenas para fins pessoais, lícitos e
            conforme estes Termos.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          3. Duração do Acesso
        </h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            O Cartão Digital permanecerá ativo por <strong>1 (um) ano</strong> a
            contar da confirmação do pagamento.
          </li>
          <li>
            Ao término desse período, o usuário terá o prazo de{" "}
            <strong>45 (quarenta e cinco) dias</strong> para{" "}
            <strong>renovar o acesso por mais 1 (um) ano</strong>, mediante o
            pagamento de{" "}
            <strong>R$ 7,45 (sete reais e quarenta e cinco centavos)</strong>.
          </li>
          <li>
            Caso a renovação não seja efetuada dentro desse prazo, o Cartão
            Digital e todo o seu conteúdo poderão ser{" "}
            <strong>permanentemente excluídos</strong>, sem obrigação de
            retenção ou backup pela Plataforma.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          4. Cancelamento e Exclusão
        </h2>
        <p>
          O usuário pode solicitar a exclusão ou desativação do seu Cartão
          Digital a qualquer momento pelos canais de suporte oficiais (WhatsApp
          ou e-mail). Após a exclusão, todos os dados e mídias poderão ser
          permanentemente apagados, sem possibilidade de recuperação.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Reembolso</h2>
        <p>
          O usuário poderá solicitar <strong>reembolso total</strong> do valor
          pago em até <strong>7 (sete) dias corridos</strong> a partir da
          confirmação do pagamento, conforme o{" "}
          <strong>Código de Defesa do Consumidor (Art. 49)</strong>.
        </p>
        <p>
          Para solicitar o reembolso, o usuário deve enviar o{" "}
          <strong>comprovante de pagamento</strong> e o{" "}
          <strong>e-mail cadastrado</strong> na compra. Por motivos de
          segurança, será enviado um <strong>código de verificação</strong> para
          o e-mail informado, que deverá ser confirmado nos canais de suporte
          para que o reembolso e a exclusão da webpage sejam processados.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          6. Propriedade Intelectual
        </h2>
        <p>
          Todo o conteúdo, layout, design, logotipo, marca e código da
          Plataforma são de propriedade exclusiva dos desenvolvedores da
          plataforma. O conteúdo criado pelo usuário permanece de sua autoria e
          responsabilidade, cabendo ao mesmo garantir os direitos sobre os
          materiais enviados.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          7. Conduta e Conteúdo do Usuário
        </h2>
        <p>O usuário não poderá utilizar a Plataforma para:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Publicar conteúdos ilegais, ofensivos, discriminatórios ou que
            violem direitos autorais;
          </li>
          <li>Usar a Plataforma para fins comerciais não autorizados;</li>
          <li>Inserir vírus, scripts ou códigos maliciosos.</li>
        </ul>
        <p>
          A Plataforma reserva-se o direito de remover ou desativar qualquer
          Cartão Digital que viole estas regras, sem aviso prévio e sem
          reembolso.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">8. Suporte</h2>
        <p>
          O suporte está disponível por WhatsApp e e-mail para esclarecimento de
          dúvidas, solicitações de exclusão, reembolso ou ajustes técnicos.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          9. Limitação de Responsabilidade
        </h2>
        <p>
          A Plataforma não se responsabiliza por danos ou prejuízos decorrentes
          de mau uso, uso indevido ou compartilhamento indevido do link do
          Cartão Digital. A disponibilidade do serviço pode ser temporariamente
          interrompida para manutenção, sem direito a indenização.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          10. Alterações dos Termos de Uso
        </h2>
        <p>
          Estes Termos poderão ser alterados a qualquer momento mediante
          publicação da nova versão neste site. O uso contínuo da Plataforma
          implica aceitação das novas condições.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          11. Privacidade e Proteção de Dados
        </h2>
        <p>
          A coleta e o tratamento de dados pessoais seguem as diretrizes da{" "}
          <strong>Lei Geral de Proteção de Dados (Lei nº 13.709/2018)</strong>.
          As informações fornecidas pelos usuários são utilizadas apenas para a
          prestação do serviço e não são compartilhadas com terceiros sem
          consentimento.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          12. Disposições Finais
        </h2>
        <p>
          Estes Termos são regidos pelas leis da República Federativa do Brasil.
          O uso da Plataforma implica concordância plena com todas as cláusulas
          aqui descritas.
        </p>

        <div className="mt-8 pt-4 text-sm flex justify-between items-center border-t text-gray-600">
          <div>
            <p>
              <strong>PixelsDoAmor</strong>
            </p>
            <p>E-mail: pixelsamor@gmail.com</p>
            <p>WhatsApp: (41)99538-7676</p>
          </div>
          <div className="text-[18px]">
            <BackButton
              text="Voltar para formulário"
              color="blue"
              onClick={() => navigate(-1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
