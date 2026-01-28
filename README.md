# 📧 Sistema de E-mails (Front-end)

Projeto de um **sistema de e-mails com foco principal no front-end**, desenvolvido para fins educacionais.  
O objetivo é praticar **estruturação de interface**, organização de arquivos e integração básica com serviços externos, sem aprofundamento em back-end complexo.

---

## 🎯 Objetivo do Projeto

Este projeto tem como foco principal:

- Desenvolvimento da **interface front-end**
- Organização de código e arquivos
- Simulação de envio de e-mails
- Aprendizado prático com TypeScript e HTML/CSS
- Integração simples com serviços (Firebase)


---

## 🖥️ Tecnologias Utilizadas

- **HTML**
- **CSS**
- **TypeScript**
- **Node.js**
- **Firebase**

---

## 📂 Estrutura do Projeto

```bash
Meu-sistema-emails/
│
├── source/
│   ├── firebase/
│   │   └── config.ts        # Configuração do Firebase
│   │
│   ├── models/
│   │   └── Email.ts         # Modelo de dados do e-mail
│   │
│   ├── services/
│   │   └── emailService.ts  # Serviço simples de envio
│   │
│   ├── index.html           # Interface principal (Front-end)
│   ├── styles.css           # Estilização da interface
│   └── index.ts             # Integração do front com o serviço
│
├── package.json
├── package-lock.json
├── tsconfig.json
└── node_modules/

▶️ Como Executar o Projeto
Pré-requisitos

Node.js

Passos
# Clonar o repositório
git clone https://github.com/seu-usuario/seu-repositorio.git

# Acessar a pasta do projeto
cd Meu-sistema-emails

# Instalar dependências
npm install

# Executar o projeto
npm run dev
