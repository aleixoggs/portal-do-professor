import React, { useEffect, useState } from 'react'
import { fetchTurmas, createTurma, fetchAlunos, addAlunoToTurma } from '../services/api'

export default function Turmas(){
  const [turmas,setTurmas]=useState<any[]>([])
  const [alunos,setAlunos]=useState<any[]>([])
  const [name,setName]=useState(''); const [capacity,setCapacity]=useState(30)

  useEffect(()=>{ async function load(){ setTurmas(await fetchTurmas()); setAlunos(await fetchAlunos()) } load() },[])

  async function handleCreate(e:any){
    e.preventDefault()
    const novo = await createTurma({ name, capacity })
     setName(''); setCapacity(30)
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Turmas</h2>
      <form onSubmit={handleCreate} className="mb-4 flex gap-2">
        <input placeholder="Nome da turma" value={name} onChange={e=>setName(e.target.value)} className="p-2 border rounded" required />
        <input type="number" value={capacity} onChange={e=>setCapacity(Number(e.target.value))} className="p-2 border rounded w-28" />
        <button className="px-4 py-2 bg-green-600 text-white rounded">Criar</button>
      </form>
      <div className="grid gap-2">
        {turmas.map(t=> (
          <div key={t.id} className="bg-white p-3 rounded shadow flex justify-between items-center">
            <div>
              <div className="font-semibold">{t.name}</div>
              <div className="text-sm text-gray-500">Capacidade: {t.capacity} • Alunos: {t.alunos?.length || 0}</div>
            </div>
            <div>
              <select onChange={async(e)=>{ const alunoId = e.target.value; if(!alunoId) return; await addAlunoToTurma(t.id,alunoId); setTurmas(await fetchTurmas()) }} className="p-2 border rounded">
                <option value="">Adicionar aluno</option>
                {alunos.filter(a=>!t.alunos.includes(a.id)).map(a=> <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
