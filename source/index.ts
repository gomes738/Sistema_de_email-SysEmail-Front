// source/index.ts
import { emailService } from "./services/emailService";

let detalheAtualId: string | null = null;

/* ---------- DATA NO CABEÇALHO ---------- */

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

/* ---------- DASHBOARD ---------- */

async function renderGraficoEstados() {
  const container = document.getElementById("state-chart");
  if (!container) return;

  const dados = await emailService.getEmailsPorUF();

  if (!dados.length || dados.every((d) => d.total === 0)) {
    container.innerHTML =
      "<p class='empty'>Sem dados suficientes para exibir.</p>";
    return;
  }

  const max = Math.max(...dados.map((d) => d.total));

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

async function renderGraficoPorDia() {
  const container = document.getElementById("daily-chart");
  if (!container) return;

  const dias = await emailService.getTendenciaUltimos7Dias();

  if (!dias.length || dias.every((d) => d.total === 0)) {
    container.innerHTML =
      "<p class='empty'>Sem dados suficientes para exibir.</p>";
    return;
  }

  const max = Math.max(...dias.map((d) => d.total));

  container.innerHTML = dias
    .map((d) => {
      const dataBr = new Date(d.data).toLocaleDateString("pt-BR");
      const largura = (d.total / max) * 100;
      return `
        <div class="bar-row">
          <span class="bar-label">${dataBr}</span>
          <div class="bar-track">
            <div class="bar-fill" style="width:${largura}%;"></div>
          </div>
          <span class="bar-value">${d.total}</span>
        </div>
      `;
    })
    .join("");
}

async function renderTopDestinatarios() {
  const container = document.getElementById("top-destinatarios");
  if (!container) return;

  const top3 = await emailService.getTopDestinatarios(3);

  if (!top3.length) {
    container.innerHTML = "<p class='empty'>Nenhum dado suficiente.</p>";
    return;
  }

  container.innerHTML = `
    <ul>
      ${top3
        .map(
          (d, i) =>
            `<li><span>${i + 1}. ${d.destinatario}</span><strong>${d.total}</strong></li>`
        )
        .join("")}
    </ul>
  `;
}

/* ---------- PENDÊNCIAS ---------- */

async function renderPendencias() {
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

  let pendentes = await emailService.getPendentes();

  if (filtroRem) {
    pendentes = pendentes.filter((e) =>
      e.remetente.toLowerCase().includes(filtroRem)
    );
  }

  if (filtroData) {
    pendentes = pendentes.filter((e) => e.dataHora.startsWith(filtroData));
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
        const dataBr = new Date(e.dataHora).toLocaleDateString("pt-BR");
        const local =
          e.uf && e.municipio ? `${e.uf} / ${e.municipio}` : "— / —";
        return `
        <div class="pending-row" data-id="${e.id}">
          <span title="${e.remetente}">${e.remetente}</span>
          <span title="${e.destinatario}">${e.destinatario}</span>
          <span>${dataBr}</span>
          <span>${local}</span>
          <button data-id="${e.id}">Classificar</button>
        </div>
      `;
      })
      .join("")}
  `;

  container.innerHTML = html;

  // botões de classificar
  const buttons =
    container.querySelectorAll<HTMLButtonElement>("button[data-id]");
  buttons.forEach((btn) => {
    btn.addEventListener("click", async (ev) => {
      ev.stopPropagation();
      const id = btn.dataset.id!;
      await emailService.classificar(id);
      await renderStats();
    });
  });

  // clique na linha abre detalhes
  const rows = container.querySelectorAll<HTMLDivElement>(".pending-row");
  rows.forEach((row) => {
    row.addEventListener("click", () => {
      const id = row.dataset.id!;
      void abrirDetalhes(id);
    });
  });
}

/* ---------- HISTÓRICO ---------- */

async function renderHistorico() {
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

  let lista = await emailService.getAll();

  if (termo) {
    lista = lista.filter(
      (e) =>
        e.remetente.toLowerCase().includes(termo) ||
        e.destinatario.toLowerCase().includes(termo) ||
        e.assunto.toLowerCase().includes(termo)
    );
  }

  if (filtroData) {
    lista = lista.filter((e) => e.dataHora.startsWith(filtroData));
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
      const id = row.dataset.id!;
      void abrirDetalhes(id);
    });
  });
}

/* ---------- DETALHES ---------- */

async function abrirDetalhes(id: string) {
  detalheAtualId = id;
  const email = await emailService.getById(id);
  if (!email) return;

  // desmarca navegação
  const navItems = document.querySelectorAll<HTMLButtonElement>(".nav-item");
  navItems.forEach((b) => b.classList.remove("active"));

  // mostra view de detalhes
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
    new Date(email.dataHora).toLocaleString("pt-BR");
  (document.getElementById("det-assunto") as HTMLElement).textContent =
    email.assunto;
  (document.getElementById("det-local") as HTMLElement).textContent =
    email.uf && email.municipio
      ? `${email.uf} - ${email.municipio}`
      : "Não informado";
  (document.getElementById("det-mensagem") as HTMLElement).textContent =
    email.mensagem || "";

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

  btnSalvar?.addEventListener("click", async () => {
    if (!detalheAtualId) return;

    const ufSelect = document.getElementById(
      "det-uf"
    ) as HTMLSelectElement | null;
    const munInput = document.getElementById(
      "det-municipio"
    ) as HTMLInputElement | null;

    const uf = ufSelect?.value ?? "";
    const municipio = munInput?.value ?? "";

    await emailService.salvarLocal(detalheAtualId, uf, municipio);
    alert("Localização atualizada com sucesso.");

    await renderStats();
    await abrirDetalhes(detalheAtualId);
  });
}

/* ---------- ESTATÍSTICAS GERAIS ---------- */

async function renderStats() {
  const totalEl = document.getElementById("total-emails");
  const pendEl = document.getElementById("pending-emails");
  const classEl = document.getElementById("classified-emails");
  const badgePend = document.getElementById("badge-pendentes");

  if (!totalEl || !pendEl || !classEl || !badgePend) return;

  const [todos, pendentes, classificados] = await Promise.all([
    emailService.getAll(),
    emailService.getPendentes(),
    emailService.getClassificados(),
  ]);

  totalEl.textContent = String(todos.length);
  pendEl.textContent = String(pendentes.length);
  classEl.textContent = String(classificados.length);
  badgePend.textContent = `${pendentes.length} pendentes`;

  await renderPendencias();
  await renderGraficoEstados();
  await renderGraficoPorDia();
  await renderTopDestinatarios();
  await renderHistorico();
}

/* ---------- NAVEGAÇÃO LATERAL ---------- */

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

/* ---------- ATALHOS DO DASHBOARD ---------- */

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

/* ---------- SIMULAÇÃO ---------- */

function setupSimulationButtons() {
  const topBtn = document.getElementById("simulate-btn");

  topBtn?.addEventListener("click", async () => {
    await emailService.simularCaptura(10);
    await renderStats();
  });
}

/* ---------- FORMULÁRIO MANUAL ---------- */

function setupManualForm() {
  const form = document.getElementById(
    "manual-form"
  ) as HTMLFormElement | null;
  if (!form) return;

  form.addEventListener("submit", async (event) => {
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

    await emailService.criarManual({
      remetente: remetenteInput.value,
      destinatario: destinatarioInput.value,
      assunto: assuntoInput.value,
      mensagem: msgTextarea?.value || "",
      uf: ufSelect.value,
      municipio: municipioInput.value,
      dataHora: dataHoraInput?.value || undefined,
    });

    form.reset();
    await renderStats();

    alert("E-mail registrado com sucesso (pendente de classificação).");
  });
}
async function exportarPendenciasCSV() {
  const pendentes = await emailService.getPendentes();

  if (!pendentes.length) {
    alert("Não há pendências para exportar.");
    return;
  }

  // Cabeçalho do CSV
  const headers = [
    "Remetente",
    "Destinatário",
    "Assunto",
    "DataHora",
    "UF",
    "Município",
    "Status",
  ];

  // Cada linha do CSV
  const linhas = pendentes.map((e) => {
    const dataBr = new Date(e.dataHora).toLocaleString("pt-BR");

    return [
      e.remetente,
      e.destinatario,
      e.assunto,
      dataBr,
      e.uf ?? "",
      e.municipio ?? "",
      e.status ?? "Pendente",
    ]
      .map((campo) =>
        `"${String(campo).replace(/"/g, '""')}"` // escapa aspas
      )
      .join(";");
  });

  // CORREÇÃO: adiciona BOM pra Excel ler acentuação certo
  const conteudo = "\uFEFF" + [headers.join(";"), ...linhas].join("\n");

  // Cria o arquivo em memória
  const blob = new Blob([conteudo], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);

  // Cria link temporário pra download
  const link = document.createElement("a");
  link.href = url;
  const hoje = new Date().toISOString().slice(0, 10);
  link.download = `pendencias_sysemail_${hoje}.csv`;
  document.body.appendChild(link);
  link.click();

  // Limpa
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}


/* ---------- BOTÕES EXTRAS DE PENDÊNCIAS ---------- */

function setupPendenciasButtons() {
  const btnSalvarTudo = document.getElementById("pend-save-all");
  const btnExport = document.getElementById("pend-export");

  btnSalvarTudo?.addEventListener("click", async () => {
    await emailService.salvarTodasPendenciasComoClassificadas();
    await renderStats();
    alert("Todas as pendências foram marcadas como classificadas.");
  });

    btnExport?.addEventListener("click", async () => {
    await exportarPendenciasCSV();
  });

}

/* ---------- INICIALIZAÇÃO GERAL ---------- */

async function init() {
  console.log("Init chamado");
  setupDate();
  setupNavigation();
  setupSimulationButtons();
  setupManualForm();
  setupDashboardShortcuts();
  setupPendenciasButtons();
  setupDetalhesActions();

  await renderStats();
}

document.addEventListener("DOMContentLoaded", () => {
  void init();
});
