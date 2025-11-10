import { mockDb, initMockApi,saveDb } from '../mocks/mockApi'
initMockApi()


export async function login(email:string,password:string){
  await new Promise(r=>setTimeout(r,250))
  const user = mockDb.users.find((u:any)=>u.email===email && u.password===password)
  if(!user) throw new Error('Credenciais inválidas')
  const token = btoa(`${user.id}:${Date.now()+1000*60*60}`)
  localStorage.setItem('jwt', token)
  return { user: { id: user.id, email: user.email, name: user.name }, token }
}

export function getAuth(){
  const token = localStorage.getItem('jwt')
  if(!token) return null
  try{
    const raw = atob(token).split(':')
    const id = raw[0]
    const user = mockDb.users.find((u:any)=>u.id===id)
    if(!user) return null
    return { token, user: { id: user.id, email: user.email, name: user.name } }
  }catch{ return null }
}

export function logout(){ localStorage.removeItem('jwt') }

export async function fetchAlunos(){ await new Promise(r=>setTimeout(r,200)); return mockDb.alunos }
export async function createAluno(payload:any){ const novo = { ...payload, id: String(Date.now()) }; mockDb.alunos.push(novo);saveDb (); return novo }
export async function updateAluno(id:string,payload:any){ const idx = mockDb.alunos.findIndex((a:any)=>a.id===id); if(idx===-1) throw new Error('Aluno não encontrado'); mockDb.alunos[idx] = { ...mockDb.alunos[idx], ...payload }; saveDb (); return mockDb.alunos[idx] }
export async function deleteAluno(id:string){ mockDb.alunos = mockDb.alunos.filter((a:any)=>a.id!==id);saveDb ();return true }

export async function fetchTurmas(){ await new Promise(r=>setTimeout(r,200)); return mockDb.turmas }
export async function createTurma(payload:any){ const novo={...payload,id:String(Date.now()),alunos:[]}; mockDb.turmas.push(novo); saveDb ();return novo }
export async function updateTurma(id:string,payload:any){ const i=mockDb.turmas.findIndex((t:any)=>t.id===id); if(i===-1) throw new Error('Turma não'); mockDb.turmas[i]={...mockDb.turmas[i],...payload}; saveDb ();return mockDb.turmas[i] }
export async function addAlunoToTurma(turmaId:string,alunoId:string){ const t = mockDb.turmas.find((t:any)=>t.id===turmaId); if(!t) throw new Error('Turma não existe'); if(!t.alunos.includes(alunoId)) t.alunos.push(alunoId); saveDb ();return t }

export async function fetchAvaliacoes(turmaId:string){ await new Promise(r=>setTimeout(r,150)); const t = mockDb.turmas.find((t:any)=>t.id===turmaId);saveDb ();return t?.avaliacoes || [] }
export async function saveAvaliacoes(turmaId:string,avaliacoes:any[]){ const t = mockDb.turmas.find((t:any)=>t.id===turmaId); if(!t) throw new Error('Turma não existe'); t.avaliacoes = avaliacoes;saveDb ();return t.avaliacoes }
