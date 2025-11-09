# 🧑‍🏫 Portal do Professor

O **Portal do Professor** é uma aplicação web desenvolvida em **React + TypeScript** que permite o gerenciamento completo de **alunos**, **turmas** e **avaliações** de forma simples, intuitiva e visual.  

O sistema foi criado para auxiliar professores no controle das informações acadêmicas, com uma interface moderna e responsiva.

---

## 🚀 Funcionalidades Principais

✅ **Autenticação de Usuário**
- Login seguro com persistência de sessão (`localStorage`).
- Proteção de rotas — só é possível acessar as páginas internas após login.

✅ **Gerenciamento de Alunos**
- Cadastro, edição e exclusão de alunos.
- Associação de alunos a turmas.
- Controle de status (Ativo/Inativo).

✅ **Gerenciamento de Turmas**
- Criação, edição e exclusão de turmas.
- Definição de capacidade máxima.
- Listagem de alunos e avaliações.

✅ **Avaliações**
- Criação de provas e trabalhos com pesos personalizados.
- Exibição de notas organizadas por turma.

✅ **Persistência Local**
- Todos os dados são armazenados em `localStorage` (mock API local).
- Mesmo após atualizar a página (F5), os dados permanecem salvos.

---

## 🧠 Tecnologias Utilizadas

| Categoria | Tecnologias |
|------------|--------------|
| **Frontend** | React + Vite |
| **Linguagem** | TypeScript |
| **Estilização** | Tailwind CSS |
| **Roteamento** | React Router DOM |
| **Gerenciamento de Estado** | Context API |
| **Banco Local (mock)** | LocalStorage |

---

## 📁 Estrutura do Projeto

