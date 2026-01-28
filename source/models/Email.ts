// source/models/Email.ts

export type EmailStatus = "pendente" | "classificado";

export interface Email {
  id?: string; // id do documento no Firestore

  remetente: string;
  destinatario: string;
  assunto: string;

  mensagem?: string;
  observacoes?: string;

  uf?: string;
  municipio?: string;

  dataHora: string; // ISO string (ex: "2025-12-05T10:30:00.000Z")
  status: EmailStatus;
}
