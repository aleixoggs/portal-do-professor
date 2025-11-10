// src/mocks/mockApi.ts
export let mockDb: any = {
  users: [{ id: '1', name: 'Professor Teste', email: 'prof@escola.com', password: 'senha123' }],
  alunos: [{ id: 'a1', name: 'João Silva', email: 'joao@ex.com', turmaId: 't1', status: 'Ativo' }],
  turmas: [{ id: 't1', name: 'Turma A', capacity: 30, alunos: ['a1'], avaliacoes: [{ name: 'Prova 1', weight: 50 }, { name: 'Trabalho', weight: 50 }] }]
}

// inicializa: se houver portal_db no localStorage, usa ele; senão cria
export function initMockApi(){
  const saved = localStorage.getItem('portal_db')
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      // Atualiza o objeto mockDb mantendo a referência (opcional: Object.assign)
      mockDb = Object.assign(mockDb, parsed)
    } catch (e) {
      console.warn('Erro ao carregar portal_db do localStorage', e)
    }
  } else {
    localStorage.setItem('portal_db', JSON.stringify(mockDb))
  }
}

// função para persistir sempre que houver mudança
export function saveDb(){
  try {
    localStorage.setItem('portal_db', JSON.stringify(mockDb))
  } catch (e) {
    console.error('Erro ao salvar portal_db', e)
  }
}
