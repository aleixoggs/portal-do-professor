import React, { useEffect, useState } from 'react'
import { fetchAlunos, fetchTurmas } from '../services/api'

export default function Dashboard(){
  const [alunos,setAlunos] = useState<any[]>([])
  const [turmas,setTurmas] = useState<any[]>([])
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    async function load(){ setLoading(true); const a = await fetchAlunos(); const t = await fetchTurmas(); setAlunos(a); setTurmas(t); setLoading(false) }
    load()
  },[])

  if(loading) return <div>Carregando...</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-sm text-gray-500">Alunos</h3>
        <p className="text-2xl font-bold">{alunos.length}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-sm text-gray-500">Turmas</h3>
        <p className="text-2xl font-bold">{turmas.length}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-sm text-gray-500">Próximas Avaliações</h3>
        <p className="text-base">Nenhuma agendada (mock)</p>
      </div>
    </div>
  )
}
