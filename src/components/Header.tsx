import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header(){
  const { user, token, logout } = useAuth()
  return (
    <header className="p-4 border-b">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Portal Professor</div>
        <nav>
          {token ? (
            <>
              <Link to="/" className="mr-4">Dashboard</Link>
              <Link to="/alunos" className="mr-4">Alunos</Link>
              <Link to="/turmas" className="mr-4">Turmas</Link>
              <Link to="/avaliacoes" className="mr-4">Avaliações</Link>
              <button onClick={logout} className="ml-4">Sair</button>
            </>
          ) : (
            <Link to="/login">Entrar</Link>
          )}
        </nav>
      </div>
    </header>
  )
}
