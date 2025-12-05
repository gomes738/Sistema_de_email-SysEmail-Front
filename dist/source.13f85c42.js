function setupDate() {
    const span = document.getElementById("today-date");
    if (!span) return;
    const hoje = new Date();
    const formatado = hoje.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
    span.textContent = formatado;
}
function setupNavigation() {
    const navItems = document.querySelectorAll(".nav-item");
    const views = document.querySelectorAll(".view");
    const pageTitle = document.getElementById("page-title");
    navItems.forEach((btn)=>{
        btn.addEventListener("click", ()=>{
            const viewName = btn.dataset.view;
            if (!viewName) return;
            // ativa botão
            navItems.forEach((b)=>b.classList.remove("active"));
            btn.classList.add("active");
            // troca view
            views.forEach((v)=>{
                v.classList.toggle("active", v.id === `view-${viewName}`);
            });
            // título simples
            if (pageTitle) {
                if (viewName === "dashboard") pageTitle.textContent = "Vis\xe3o Geral";
                if (viewName === "pendencias") pageTitle.textContent = "Classifica\xe7\xe3o de E-mails";
                if (viewName === "cadastro") pageTitle.textContent = "Novo E-mail";
            }
        });
    });
}
function setupSimulationButtons() {
    const topBtn = document.getElementById("simulate-btn");
    const bottomBtn = document.getElementById("simulate-btn-bottom");
    const totalEl = document.getElementById("total-emails");
    const pendEl = document.getElementById("pending-emails");
    const classEl = document.getElementById("classified-emails");
    const badgePend = document.getElementById("badge-pendentes");
    function simulate() {
        if (!totalEl || !pendEl || !classEl || !badgePend) return;
        const total = parseInt(totalEl.textContent || "0") + 5;
        const pendentes = parseInt(pendEl.textContent || "0") + 2;
        const classificados = total - pendentes;
        totalEl.textContent = String(total);
        pendEl.textContent = String(pendentes);
        classEl.textContent = String(classificados);
        badgePend.textContent = `${pendentes} pendentes`;
    }
    topBtn?.addEventListener("click", simulate);
    bottomBtn?.addEventListener("click", simulate);
}
document.addEventListener("DOMContentLoaded", ()=>{
    setupDate();
    setupNavigation();
    setupSimulationButtons();
});

//# sourceMappingURL=source.13f85c42.js.map
