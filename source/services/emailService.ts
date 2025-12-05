// source/services/emailService.ts

import { Email } from "../models/Email";

class EmailService {
  private emails: Email[] = [];
  private nextId = 1;

  // retorna todos os e-mails
  getAll(): Email[] {
    return this.emails;
  }

  getById(id: number): Email | undefined {
    return this.emails.find((e) => e.id === id);
  }

  getPendentes(): Email[] {
    return this.emails.filter((e) => e.status === "pendente");
  }

  getClassificados(): Email[] {
    return this.emails.filter((e) => e.status === "classificado");
  }

  atualizarLocal(id: number, uf: string, municipio: string): void {
    const email = this.getById(id);
    if (email) {
      email.uf = uf;
      email.municipio = municipio;
    }
  }

  classificar(id: number): void {
    const email = this.getById(id);
    if (email) {
      email.status = "classificado";
    }
  }

  criarManual(dados: {
    remetente: string;
    destinatario: string;
    assunto: string;
    mensagem: string;
    uf: string;
    municipio: string;
    dataHora?: string; // opcional, se vier do input
  }): Email {
    const criadoEm = dados.dataHora
      ? new Date(dados.dataHora)
      : new Date();

    const novo: Email = {
      id: this.nextId++,
      remetente: dados.remetente,
      destinatario: dados.destinatario,
      assunto: dados.assunto,
      mensagem: dados.mensagem,
      uf: dados.uf,
      municipio: dados.municipio,
      status: "pendente",
      criadoEm,
    };

    this.emails.push(novo);
    return novo;
  }

  // gera e-mails mockados (Simular Captura)
  simularCaptura(qtd = 5): void {
    const ufs = [
      "AC","AL","AP","AM","BA","CE","DF","ES","GO",
      "MA","MT","MS","MG","PA","PB","PR","PE","PI",
      "RJ","RN","RS","RO","RR","SC","SP","SE","TO"
    ];

    const cidades = [
      "Teresina","Piripiri","Fortaleza","São Luís","Salvador",
      "Curitiba","São Paulo","Rio de Janeiro","Florianópolis"
    ];

    const destinatarios = [
      "clienteA@empresa.com",
      "clienteB@empresa.com",
      "clienteC@empresa.com",
      "financeiro@empresa.com",
      "contato@site.com",
    ];

    const assuntos = [
      "Proposta Comercial",
      "Cobrança em aberto",
      "Pedido de Informações",
      "Agendamento de Reunião",
      "Fatura do mês",
    ];

    const mensagens = [
      "Prezados, segue em anexo a proposta referente ao projeto X.",
      "Olá, estamos com uma fatura em aberto, favor verificar.",
      "Gostaria de mais informações sobre o serviço.",
      "Vamos alinhar uma reunião para tratar dos próximos passos.",
    ];

    for (let i = 0; i < qtd; i++) {
      const uf = ufs[Math.floor(Math.random() * ufs.length)];
      const municipio = cidades[Math.floor(Math.random() * cidades.length)];
      const destinatario =
        destinatarios[Math.floor(Math.random() * destinatarios.length)];
      const assunto = assuntos[Math.floor(Math.random() * assuntos.length)];
      const mensagem =
        mensagens[Math.floor(Math.random() * mensagens.length)];

      const remetente = `colaborador${Math.floor(
        Math.random() * 50
      )}@empresa.com`;

      const status = Math.random() < 0.6 ? "classificado" : "pendente";

      // data nos últimos 7 dias
      const hoje = new Date();
      const diasAtras = Math.floor(Math.random() * 7);
      const criadoEm = new Date(
        hoje.getFullYear(),
        hoje.getMonth(),
        hoje.getDate() - diasAtras,
        Math.floor(Math.random() * 24),
        Math.floor(Math.random() * 60)
      );

      const email: Email = {
        id: this.nextId++,
        remetente,
        destinatario,
        assunto,
        mensagem,
        uf,
        municipio,
        status,
        criadoEm,
      };

      this.emails.push(email);
    }
  }
}

export const emailService = new EmailService();
