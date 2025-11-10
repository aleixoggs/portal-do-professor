import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState<string | null>(null)
  const { login } = useAuth()
  const nav = useNavigate()

  async function handleSubmit(e:React.FormEvent){
    e.preventDefault()
    try{
      await login(email,password)
      nav('/')
    }catch(err:any){ setError(err.message || 'Erro ao logar') }
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">E-mail
          <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full mt-1 p-2 border rounded" type="email" required />
        </label>
        <label className="block mb-2">Senha
          <input value={password} onChange={e=>setPassword(e.target.value)} className="w-full mt-1 p-2 border rounded" type="password" required />
        </label>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <button className="w-full py-2 bg-blue-600 text-white rounded">Entrar</button>
      </form>
      <p className="mt-4 text-sm text-gray-500">Use <code>prof@escola.com / senha123</code></p>
    </div>
  )
}
