import { emailService } from "./services/emailService";

let detalheAtualId: number | null = null;

function setupDate() {
  const span = document.getElementById("today-date");
  if (!span) return;

  const hoje = new Date();
  const formatado = hoje.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  span.textContent = formatado;
}

/* -------- DASHBOARD -------- */

function renderGraficoEstados() {
  const container = document.getElementById("state-chart");
  if (!container) return;

  const emails = emailService.getAll();
  if (emails.length === 0) {
    container.innerHTML =
      "<p class='empty'>Sem dados suficientes para exibir.</p>";
    return;
  }

  const ufs = [
    "AC","AL","AP","AM","BA","CE","DF","ES","GO",
    "MA","MT","MS","MG","PA","PB","PR","PE","PI",
    "RJ","RN","RS","RO","RR","SC","SP","SE","TO"
  ];

  const mapa = new Map<string, number>();
  ufs.forEach((uf) => mapa.set(uf, 0));

  emails.forEach((e) => {
    const uf = e.uf;
    if (mapa.has(uf)) {
      mapa.set(uf, (mapa.get(uf) ?? 0) + 1);
    }
  });

  const dados = ufs.map((uf) => ({
    uf,
    total: mapa.get(uf) ?? 0,
  }));

  const max = Math.max(...dados.map((d) => d.total));
  if (max === 0) {
    container.innerHTML =
      "<p class='empty'>Nenhum e-mail classificado por estado ainda.</p>";
    return;
  }

  container.innerHTML = dados
    .map((d) => {
      const largura = (d.total / max) * 100;
      return `
      <div class="bar-row">
        <span class="bar-label">${d.uf}</span>
        <div class="bar-track">
          <div class="bar-fill" style="width:${largura}%;"></div>
        </div>
        <span class="bar-value">${d.total}</span>
      </div>
    `;
    })
    .join("");
}

function renderGraficoPorDia() {
  const container = document.getElementById("daily-chart");
  if (!container) return;

  const emails = emailService.getAll();
  if (emails.length === 0) {
    container.innerHTML =
      "<p class='empty'>Sem dados suficientes para exibir.</p>";
    return;
  }

  const mapa = new Map<string, number>();

  emails.forEach((email) => {
    const data = email.criadoEm instanceof Date
      ? email.criadoEm
      : new Date(email.criadoEm);
    const chave = data.toLocaleDateString("pt-BR");
    mapa.set(chave, (mapa.get(chave) ?? 0) + 1);
  });

  const dias = Array.from(mapa.entries())
    .map(([data, total]) => ({ data, total }))
    .sort((a, b) => {
      const [da, ma, aa] = a.data.split("/").map(Number);
      const [db, mb, ab] = b.data.split("/").map(Number);
      return new Date(aa, ma - 1, da).getTime() - new Date(ab, mb - 1, db).getTime();
    })
    .slice(-7);

  const max = Math.max(...dias.map((d) => d.total));
  if (max === 0) {
    container.innerHTML =
      "<p class='empty'>Sem dados suficientes para exibir.</p>";
    return;
  }

  container.innerHTML = dias
    .map((d) => {
      const largura = (d.total / max) * 100;
      return `
        <div class="bar-row">
          <span class="bar-label">${d.data}</span>
          <div class="bar-track">
            <div class="bar-fill" style="width:${largura}%;"></div>
          </div>
          <span class="bar-value">${d.total}</span>
        </div>
      `;
    })
    .join("");
}

function renderTopDestinatarios() {
  const container = document.getElementById("top-destinatarios");
  if (!container) return;

  const emails = emailService.getAll();
  if (emails.length === 0) {
    container.innerHTML = "<p class='empty'>Nenhum dado suficiente.</p>";
    return;
  }

  const mapa = new Map<string, number>();
  emails.forEach((e) => {
    mapa.set(e.destinatario, (mapa.get(e.destinatario) ?? 0) + 1);
  });

  const top3 = Array.from(mapa.entries())
    .map(([email, count]) => ({ email, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  container.innerHTML = `
    <ul>
      ${top3
        .map(
          (d, i) =>
            `<li><span>${i + 1}. ${d.email}</span><strong>${d.count}</strong></li>`
        )
        .join("")}
    </ul>
  `;
}

/* -------- PENDÊNCIAS -------- */

function renderPendencias() {
  const container = document.getElementById("pending-list");
  if (!container) return;

  const filtroRem = (
    document.getElementById("pend-filter-remetente") as HTMLInputElement | null
  )?.value
    ?.toLowerCase()
    .trim();

  const filtroData = (
    document.getElementById("pend-filter-data") as HTMLInputElement | null
  )?.value;

  let pendentes = emailService.getPendentes();

  if (filtroRem) {
    pendentes = pendentes.filter((e) =>
      e.remetente.toLowerCase().includes(filtroRem)
    );
  }

  if (filtroData) {
    pendentes = pendentes.filter((e) => {
      const d = e.criadoEm;
      const iso = d.toISOString().slice(0, 10);
      return iso === filtroData;
    });
  }

  if (pendentes.length === 0) {
    container.classList.add("empty");
    container.innerHTML = `
      <div class="big-check">✅</div>
      <p>Nenhuma pendência encontrada. Bom trabalho!</p>
    `;
    return;
  }

  container.classList.remove("empty");

  const html = `
    <div class="pending-table-header">
      <span>Remetente</span>
      <span>Destinatário</span>
      <span>Data</span>
      <span>Local</span>
      <span>Ações</span>
    </div>
    ${pendentes
      .map((e) => {
        const data = e.criadoEm.toLocaleDateString("pt-BR");
        const local =
          e.uf && e.municipio ? `${e.uf} / ${e.municipio}` : "— / —";
        return `
        <div class="pending-row" data-id="${e.id}">
          <span title="${e.remetente}">${e.remetente}</span>
          <span title="${e.destinatario}">${e.destinatario}</span>
          <span>${data}</span>
          <span>${local}</span>
          <button data-id="${e.id}">Classificar</button>
        </div>
      `;
      })
      .join("")}
  `;

  container.innerHTML = html;

  const buttons =
    container.querySelectorAll<HTMLButtonElement>("button[data-id]");
  buttons.forEach((btn) => {
    btn.addEventListener("click", (ev) => {
      ev.stopPropagation();
      const id = Number(btn.dataset.id);
      emailService.classificar(id);
      renderStats();
    });
  });

  const rows = container.querySelectorAll<HTMLDivElement>(".pending-row");
  rows.forEach((row) => {
    row.addEventListener("click", () => {
      const id = Number(row.dataset.id);
      abrirDetalhes(id);
    });
  });
}

/* -------- HISTÓRICO -------- */

function renderHistorico() {
  const container = document.getElementById("history-table");
  if (!container) return;

  const termo = (
    document.getElementById("hist-search") as HTMLInputElement | null
  )?.value
    ?.toLowerCase()
    .trim();

  const filtroData = (
    document.getElementById("hist-date") as HTMLInputElement | null
  )?.value;

  let lista = emailService.getAll();

  if (termo) {
    lista = lista.filter(
      (e) =>
        e.remetente.toLowerCase().includes(termo) ||
        e.destinatario.toLowerCase().includes(termo) ||
        e.assunto.toLowerCase().includes(termo)
    );
  }

  if (filtroData) {
    lista = lista.filter((e) => {
      const d = e.criadoEm;
      const iso = d.toISOString().slice(0, 10);
      return iso === filtroData;
    });
  }

  if (lista.length === 0) {
    container.classList.add("empty");
    container.innerHTML =
      "<p class='empty'>Nenhum e-mail encontrado para os filtros.</p>";
    return;
  }

  container.classList.remove("empty");

  const html = `
    <div class="history-header">
      <span>Remetente</span>
      <span>Destinatário</span>
      <span>Assunto</span>
      <span>Local</span>
    </div>
    ${lista
      .map((e) => {
        const local =
          e.uf && e.municipio ? `${e.uf} / ${e.municipio}` : "— / —";
        return `
        <div class="history-row" data-id="${e.id}">
          <span title="${e.remetente}">${e.remetente}</span>
          <span title="${e.destinatario}">${e.destinatario}</span>
          <span title="${e.assunto}">${e.assunto}</span>
          <span>${local}</span>
        </div>
      `;
      })
      .join("")}
  `;

  container.innerHTML = html;

  const rows = container.querySelectorAll<HTMLDivElement>(".history-row");
  rows.forEach((row) => {
    row.addEventListener("click", () => {
      const id = Number(row.dataset.id);
      abrirDetalhes(id);
    });
  });
}

/* -------- DETALHES -------- */

function abrirDetalhes(id: number) {
  detalheAtualId = id;
  const email = emailService.getById(id);
  if (!email) return;

  const navItems = document.querySelectorAll<HTMLButtonElement>(".nav-item");
  navItems.forEach((b) => b.classList.remove("active"));

  const views = document.querySelectorAll<HTMLElement>(".view");
  views.forEach((v) => v.classList.remove("active"));

  document.getElementById("view-detalhes")?.classList.add("active");
  const pageTitle = document.getElementById("page-title");
  if (pageTitle) pageTitle.textContent = "Detalhes do E-mail";

  (document.getElementById("det-remetente") as HTMLElement).textContent =
    email.remetente;
  (document.getElementById("det-destinatario") as HTMLElement).textContent =
    email.destinatario;
  (document.getElementById("det-data") as HTMLElement).textContent =
    email.criadoEm.toLocaleString("pt-BR");
  (document.getElementById("det-assunto") as HTMLElement).textContent =
    email.assunto;
  (document.getElementById("det-local") as HTMLElement).textContent =
    email.uf && email.municipio
      ? `${email.uf} - ${email.municipio}`
      : "Não informado";
  (document.getElementById("det-mensagem") as HTMLElement).textContent =
    email.mensagem;

  const selectUf = document.getElementById("det-uf") as HTMLSelectElement;
  const inputMun = document.getElementById(
    "det-municipio"
  ) as HTMLInputElement;

  if (selectUf) selectUf.value = email.uf || "";
  if (inputMun) inputMun.value = email.municipio || "";
}

function setupDetalhesActions() {
  const btnVoltar = document.getElementById("det-voltar");
  const btnSalvar = document.getElementById("det-salvar-local");

  btnVoltar?.addEventListener("click", () => {
    const navHist = document.querySelector<HTMLButtonElement>(
      '.nav-item[data-view="historico"]'
    );
    navHist?.click();
  });

  btnSalvar?.addEventListener("click", () => {
    if (detalheAtualId == null) return;

    const ufSelect = document.getElementById(
      "det-uf"
    ) as HTMLSelectElement | null;
    const munInput = document.getElementById(
      "det-municipio"
    ) as HTMLInputElement | null;

    const uf = ufSelect?.value ?? "";
    const municipio = munInput?.value ?? "";

    emailService.atualizarLocal(detalheAtualId, uf, municipio);
    alert("Localização atualizada com sucesso.");

    renderStats();
    abrirDetalhes(detalheAtualId);
  });
}

/* -------- ESTATÍSTICAS GERAIS -------- */

function renderStats() {
  const totalEl = document.getElementById("total-emails");
  const pendEl = document.getElementById("pending-emails");
  const classEl = document.getElementById("classified-emails");
  const badgePend = document.getElementById("badge-pendentes");

  if (!totalEl || !pendEl || !classEl || !badgePend) return;

  const total = emailService.getAll().length;
  const pendentes = emailService.getPendentes().length;
  const classificados = emailService.getClassificados().length;

  totalEl.textContent = String(total);
  pendEl.textContent = String(pendentes);
  classEl.textContent = String(classificados);
  badgePend.textContent = `${pendentes} pendentes`;

  renderPendencias();
  renderGraficoEstados();
  renderGraficoPorDia();
  renderTopDestinatarios();
  renderHistorico();
}

/* -------- NAVEGAÇÃO -------- */

function setupNavigation() {
  const navItems =
    document.querySelectorAll<HTMLButtonElement>(".nav-item");
  const views = document.querySelectorAll<HTMLElement>(".view");
  const pageTitle = document.getElementById("page-title");

  navItems.forEach((btn) => {
    btn.addEventListener("click", () => {
      const viewName = btn.dataset.view;
      if (!viewName) return;

      navItems.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      views.forEach((v) => {
        v.classList.toggle("active", v.id === `view-${viewName}`);
      });

      if (pageTitle) {
        if (viewName === "dashboard") pageTitle.textContent = "Visão Geral";
        if (viewName === "pendencias")
          pageTitle.textContent = "E-mails Pendentes";
        if (viewName === "cadastro")
          pageTitle.textContent = "Novo E-mail Manual";
        if (viewName === "historico")
          pageTitle.textContent = "Histórico de E-mails";
      }
    });
  });
}

function setupDashboardShortcuts() {
  const pend = document.getElementById("goto-pendencias");
  const manual = document.getElementById("goto-manual");

  pend?.addEventListener("click", () => {
    document
      .querySelector<HTMLButtonElement>('.nav-item[data-view="pendencias"]')
      ?.click();
  });

  manual?.addEventListener("click", () => {
    document
      .querySelector<HTMLButtonElement>('.nav-item[data-view="cadastro"]')
      ?.click();
  });
}

/* -------- SIMULAÇÃO -------- */

function setupSimulationButtons() {
  const topBtn = document.getElementById("simulate-btn");

  topBtn?.addEventListener("click", () => {
    emailService.simularCaptura(10);
    renderStats();
  });
}

/* -------- FORMULÁRIO MANUAL -------- */

function setupManualForm() {
  const form = document.getElementById(
    "manual-form"
  ) as HTMLFormElement | null;
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const remetenteInput = form.querySelector<HTMLInputElement>(
      'input[placeholder="colaborador@empresa.com"]'
    );
    const destinatarioInput = form.querySelector<HTMLInputElement>(
      'input[placeholder="cliente@dominio.com"]'
    );
    const assuntoInput = form.querySelector<HTMLInputElement>(
      'input[placeholder="Ex: Proposta Comercial"]'
    );
    const msgTextarea = form.querySelector<HTMLTextAreaElement>("textarea");
    const ufSelect = document.getElementById(
      "manual-uf"
    ) as HTMLSelectElement | null;
    const municipioInput = form.querySelector<HTMLInputElement>(
      'input[placeholder="Piripiri"]'
    );
    const dataHoraInput = document.getElementById(
      "manual-datetime"
    ) as HTMLInputElement | null;

    if (
      !remetenteInput ||
      !destinatarioInput ||
      !assuntoInput ||
      !ufSelect ||
      !municipioInput
    ) {
      console.warn("Campos do formulário não encontrados");
      return;
    }

    emailService.criarManual({
      remetente: remetenteInput.value,
      destinatario: destinatarioInput.value,
      assunto: assuntoInput.value,
      mensagem: msgTextarea?.value || "",
      uf: ufSelect.value,
      municipio: municipioInput.value,
      dataHora: dataHoraInput?.value,
    });

    form.reset();
    renderStats();

    alert("E-mail registrado com sucesso (pendente de classificação).");
  });
}

/* -------- BOTÕES "SALVAR TUDO" / "EXPORTAR" (mock) -------- */

function setupPendenciasButtons() {
  const btnSalvarTudo = document.getElementById("pend-save-all");
  const btnExport = document.getElementById("pend-export");

  btnSalvarTudo?.addEventListener("click", () => {
    const pendentes = emailService.getPendentes();
    pendentes.forEach((e) => emailService.classificar(e.id));
    renderStats();
    alert("Todas as pendências foram marcadas como classificadas.");
  });

  btnExport?.addEventListener("click", () => {
    const pendentes = emailService.getPendentes();
    console.log("Exportando pendentes (mock):", pendentes);
    alert("Exportação simulada! (dados exibidos no console)");
  });
}

/* -------- INICIALIZAÇÃO -------- */

document.addEventListener("DOMContentLoaded", () => {
  setupDate();
  setupNavigation();
  setupSimulationButtons();
  setupManualForm();
  setupDashboardShortcuts();
  setupPendenciasButtons();
  setupDetalhesActions();

  renderStats();
});
