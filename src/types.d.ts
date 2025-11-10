export type User = { id:string; name:string; email:string }
export type Aluno = { id:string; name:string; email:string; turmaId?:string; status: 'Ativo'|'Inativo' }
export type Turma = { id:string; name:string; capacity:number; alunos:string[]; avaliacoes?: { name:string; weight:number }[] }
