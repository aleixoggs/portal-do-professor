import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Alunos from './pages/Alunos'
import Turmas from './pages/Turmas'
import AvaliacoesConfig from './pages/AvaliacoesConfig'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'

export default function App(){
  return (
    <div className="min-h-screen">
      <Header />
      <main className="p-4 max-w-6xl mx-auto">
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
          <Route path="/alunos" element={<ProtectedRoute><Alunos/></ProtectedRoute>} />
          <Route path="/turmas" element={<ProtectedRoute><Turmas/></ProtectedRoute>} />
          <Route path="/avaliacoes" element={<ProtectedRoute><AvaliacoesConfig/></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  )
}
