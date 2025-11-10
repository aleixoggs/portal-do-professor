import React, { useEffect, useState } from 'react'
import { fetchTurmas, fetchAvaliacoes, saveAvaliacoes } from '../services/api'

export default function AvaliacoesConfig() {
  const [turmas, setTurmas] = useState<any[]>([])
  const [selected, setSelected] = useState<string>('')
  const [avaliacoes, setAvaliacoes] = useState<any[]>([])
  const [alert, setAlert] = useState('')

  // Carrega as turmas ao montar o componente
  useEffect(() => {
    async function load() {
      setTurmas(await fetchTurmas())
    }
    load()
  }, [])

  // Carrega as avaliações quando a turma selecionada mudar
  useEffect(() => {
    async function load() {
      if (!selected) return
      setAvaliacoes(await fetchAvaliacoes(selected))
    }
    load()
  }, [selected])

  // Soma dos pesos
  function sumWeights(list: any[]) {
    return list.reduce((s: any, i: any) => s + i.weight, 0)
  }

  // Adiciona novo critério
  function add() {
    setAvaliacoes((s) => [...s, { name: 'Novo', weight: 0 }])
  }

  // Atualiza um campo de um critério
  function update(i: number, field: string, value: any) {
    const copy = [...avaliacoes]
    copy[i] = { ...copy[i], [field]: value }
    setAvaliacoes(copy)

    if (sumWeights(copy) !== 100) {
      setAlert('Soma dos pesos deve ser 100%')
    } else {
      setAlert('')
    }
  }

  // Salva as avaliações
  async function save() {
    if (sumWeights(avaliacoes) !== 100) {
      setAlert('Soma dos pesos deve ser 100%')
      return
    }

    await saveAvaliacoes(selected, avaliacoes)
    setAlert('Salvo com sucesso!')
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Configuração de Avaliações</h2>

      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="p-2 border rounded mb-4"
      >
        <option value="">Selecione uma turma</option>
        {turmas.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>

      {selected && (
        <div>
          <div className="mb-2">Pesos totais: {sumWeights(avaliacoes)}%</div>
          {alert && <div className="text-red-600 mb-2">{alert}</div>}

          <div className="space-y-2 mb-2">
            {avaliacoes.map((a: any, idx: number) => (
              <div key={idx} className="flex gap-2">
                <input
                  value={a.name}
                  onChange={(e) => update(idx, 'name', e.target.value)}
                  className="p-2 border rounded flex-1"
                />
                <input
                  type="number"
                  value={a.weight}
                  onChange={(e) => update(idx, 'weight', Number(e.target.value))}
                  className="p-2 border rounded w-28"
                />
                <button
                  onClick={() =>
                    setAvaliacoes((s) => s.filter((_, i) => i !== idx))
                  }
                  className="px-3 py-1 border rounded"
                >
                  Remover
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button onClick={add} className="px-4 py-2 border rounded">
              Adicionar critério
            </button>
            <button
              onClick={save}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Salvar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
