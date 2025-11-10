// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react'
import * as api from '../services/api'
import { User } from '../types'

type AuthContextType = {
  user: User | null
  token: string | null
  login: (email:string,password:string)=>Promise<void>
  logout: ()=>void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{children:React.ReactNode}> = ({children})=>{
  const [user,setUser] = useState<User | null>(null)
  const [token,setToken] = useState<string | null>(null)

  // ao montar, tenta carregar do localStorage
  useEffect(()=> {
    const jwt = localStorage.getItem('jwt')
    const userStr = localStorage.getItem('user')
    if (jwt) setToken(jwt)
    if (userStr) {
      try { setUser(JSON.parse(userStr)) } catch(e){ console.warn(e) }
    }
  },[])

  async function login(email:string,password:string){
    const res = await api.login(email,password) // espera o serviço retornar { user, token }
    setUser(res.user)
    setToken(res.token)
    // persiste localmente
    localStorage.setItem('jwt', res.token)
    localStorage.setItem('user', JSON.stringify(res.user))
  }

  function logout(){
    api.logout() // se existir
    setUser(null)
    setToken(null)
    localStorage.removeItem('jwt')
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{user,token,login,logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){
  const ctx = useContext(AuthContext)
  if(!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
