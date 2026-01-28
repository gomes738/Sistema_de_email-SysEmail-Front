// source/services/emailService.ts
import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import type { Email } from "../models/Email";

const EMAILS_COLLECTION = "emails";

class EmailService {
  private mapDocToEmail(snapshot: any): Email {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      remetente: data.remetente,
      destinatario: data.destinatario,
      assunto: data.assunto,
      mensagem: data.mensagem,
      observacoes: data.observacoes,
      uf: data.uf,
      municipio: data.municipio,
      dataHora: data.dataHora,
      status: data.status,
    };
  }

  async getAll(): Promise<Email[]> {
    const colRef = collection(db, EMAILS_COLLECTION);
    const snap = await getDocs(colRef);
    return snap.docs.map((d) => this.mapDocToEmail(d));
  }

  async getById(id: string): Promise<Email | null> {
    const ref = doc(db, EMAILS_COLLECTION, id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return this.mapDocToEmail(snap);
  }

  async getPendentes(): Promise<Email[]> {
    const colRef = collection(db, EMAILS_COLLECTION);
    const q = query(colRef, where("status", "==", "pendente"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => this.mapDocToEmail(d));
  }

  async getClassificados(): Promise<Email[]> {
    const colRef = collection(db, EMAILS_COLLECTION);
    const q = query(colRef, where("status", "==", "classificado"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => this.mapDocToEmail(d));
  }

  async criarManual(data: {
    remetente: string;
    destinatario: string;
    assunto: string;
    mensagem?: string;
    uf?: string;
    municipio?: string;
    dataHora?: string;
  }): Promise<Email> {
    const agora = new Date();
    const payload: Omit<Email, "id"> = {
      remetente: data.remetente,
      destinatario: data.destinatario,
      assunto: data.assunto,
      mensagem: data.mensagem ?? "",
      uf: data.uf,
      municipio: data.municipio,
      status: "pendente",
      dataHora: data.dataHora || agora.toISOString(),
    };

    const colRef = collection(db, EMAILS_COLLECTION);
    const docRef = await addDoc(colRef, payload);
    return { ...payload, id: docRef.id };
  }

  async simularCaptura(qtd: number = 5) {
    const ufList = [
      "AC","AL","AP","AM","BA","CE","DF","ES","GO",
      "MA","MT","MS","MG","PA","PB","PR","PE","PI",
      "RJ","RN","RS","RO","RR","SC","SP","SE","TO"
    ];

    const assuntos = [
      "Proposta Comercial",
      "Agendamento de Reunião",
      "Cobrança em aberto",
      "Pedido de Informações",
      "Relatório Mensal",
      "Suporte Técnico",
    ];
    const destinatarios = [
      "clienteA@empresa.com",
      "clienteB@empresa.com",
      "clienteC@empresa.com",
      "financeiro@empresa.com",
      "contato@site.com",
    ];
    const remetentes = [
      "colaborador1@empresa.com",
      "colaborador2@empresa.com",
      "colaborador3@empresa.com",
      "colaborador4@empresa.com",
    ];
    const municipios = [
      "Teresina",
      "São Luís",
      "Fortaleza",
      "Salvador",
      "Recife",
      "São Paulo",
      "Rio de Janeiro",
    ];

    const colRef = collection(db, EMAILS_COLLECTION);
    const promises: Promise<any>[] = [];

    for (let i = 0; i < qtd; i++) {
      const agora = new Date();
      const deltaDias = Math.floor(Math.random() * 7);
      agora.setDate(agora.getDate() - deltaDias);

      const payload: Omit<Email, "id"> = {
        remetente:
          remetentes[Math.floor(Math.random() * remetentes.length)],
        destinatario:
          destinatarios[Math.floor(Math.random() * destinatarios.length)],
        assunto: assuntos[Math.floor(Math.random() * assuntos.length)],
        mensagem: "Mensagem simulada",
        uf: ufList[Math.floor(Math.random() * ufList.length)],
        municipio:
          municipios[Math.floor(Math.random() * municipios.length)],
        status: Math.random() < 0.5 ? "pendente" : "classificado",
        dataHora: agora.toISOString(),
      };

      promises.push(addDoc(colRef, payload));
    }

    await Promise.all(promises);
  }

  async classificar(id: string, dados?: { uf?: string; municipio?: string }) {
    const ref = doc(db, EMAILS_COLLECTION, id);
    const updates: any = { status: "classificado" };

    if (dados?.uf) updates.uf = dados.uf;
    if (dados?.municipio) updates.municipio = dados.municipio;

    await updateDoc(ref, updates);
  }

  async salvarLocal(id: string, uf: string, municipio: string) {
    const ref = doc(db, EMAILS_COLLECTION, id);
    await updateDoc(ref, { uf, municipio, status: "classificado" });
  }

  async salvarTodasPendenciasComoClassificadas() {
    const pendentes = await this.getPendentes();
    const promises = pendentes.map((e) => {
      const ref = doc(db, EMAILS_COLLECTION, e.id!);
      return updateDoc(ref, { status: "classificado" });
    });
    await Promise.all(promises);
  }

  async getEmailsPorUF() {
    const emails = await this.getAll();
    const mapa = new Map<string, number>();

    for (const e of emails) {
      const uf = e.uf || "N/A";
      mapa.set(uf, (mapa.get(uf) ?? 0) + 1);
    }

    return Array.from(mapa.entries())
      .map(([uf, total]) => ({ uf, total }))
      .sort((a, b) => b.total - a.total);
  }

  async getTendenciaUltimos7Dias() {
    const emails = await this.getAll();
    const hoje = new Date();
    const dias: { data: string; total: number }[] = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(hoje);
      d.setDate(hoje.getDate() - i);
      const label = d.toISOString().slice(0, 10);

      const total = emails.filter((e) =>
        e.dataHora.startsWith(label)
      ).length;

      dias.push({ data: label, total });
    }

    return dias;
  }

  async getTopDestinatarios(limit = 3) {
    const emails = await this.getAll();
    const mapa = new Map<string, number>();

    for (const e of emails) {
      const dest = e.destinatario || "N/A";
      mapa.set(dest, (mapa.get(dest) ?? 0) + 1);
    }

    return Array.from(mapa.entries())
      .map(([destinatario, total]) => ({ destinatario, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, limit);
  }
}

export const emailService = new EmailService();

