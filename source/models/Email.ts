// source/models/Email.ts

export type EmailStatus = "pendente" | "classificado";

export interface Email {
  id: number;
  remetente: string;
  destinatario: string;
  assunto: string;
  mensagem: string;
  uf: string;
  municipio: string;
  status: EmailStatus;
  criadoEm: Date;
}
