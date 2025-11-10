import React, { useEffect, useState } from 'react'
import { fetchAlunos, createAluno, updateAluno, deleteAluno, fetchTurmas } from '../services/api'

export default function Alunos(){
  const [alunos,setAlunos] = useState<any[]>([])
  const [turmas,setTurmas] = useState<any[]>([])
  const [loading,setLoading] = useState(true)
  const [name,setName] = useState(''); const [email,setEmail]=useState(''); const [turmaId,setTurmaId]=useState(''); const [status,setStatus]=useState('Ativo')

  useEffect(()=>{ async function load(){ setLoading(true); setAlunos(await fetchAlunos()); setTurmas(await fetchTurmas()); setLoading(false) } load() },[])

  async function handleCreate(e:any){
    e.preventDefault()
    const novo = await createAluno({ name, email, turmaId, status })
   
    setName(''); setEmail('')
  }

  if(loading) return <div>Carregando...</div>
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Alunos</h2>
      <form onSubmit={handleCreate} className="mb-4 grid grid-cols-1 sm:grid-cols-4 gap-2">
        <input placeholder="Nome" value={name} onChange={e=>setName(e.target.value)} className="p-2 border rounded" required />
        <input placeholder="E-mail" value={email} onChange={e=>setEmail(e.target.value)} className="p-2 border rounded" required />
        <select value={turmaId} onChange={e=>setTurmaId(e.target.value)} className="p-2 border rounded">
          <option value="">Sem turma</option>
          {turmas.map(t=> <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
        <div className="flex gap-2">
          <select value={status} onChange={e=>setStatus(e.target.value)} className="p-2 border rounded">
            <option>Ativo</option><option>Inativo</option>
          </select>
          <button className="px-4 py-2 bg-green-600 text-white rounded">Adicionar</button>
        </div>
      </form>

      <table className="w-full bg-white rounded shadow">
        <thead><tr className="text-left"><th className="p-2">Nome</th><th>E-mail</th><th>Turma</th><th>Status</th><th>Ações</th></tr></thead>
        <tbody>
          {alunos.map(a=>(
            <tr key={a.id} className="border-t"><td className="p-2">{a.name}</td><td>{a.email}</td><td>{turmas.find(t=>t.id===a.turmaId)?.name || '-'}</td><td>{a.status}</td><td className="p-2"><button className="mr-2">Editar</button><button onClick={async()=>{ await deleteAluno(a.id); setAlunos(s=>s.filter(x=>x.id!==a.id)) }}>Remover</button></td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
