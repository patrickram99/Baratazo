import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface LoginProps {
  onLogin: () => void
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [identifier, setIdentifier] = useState<string>('') // Campo que acepta email o username
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  // Credenciales hardcodeadas del administrador
  const adminCredentials = {
    email: 'admin@example.com',
    username: 'admin',
    password: 'securePassword123',
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'identifier') {
      setIdentifier(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validación por email o username
    if (
      (identifier === adminCredentials.email || identifier === adminCredentials.username) &&
      password === adminCredentials.password
    ) {
      localStorage.setItem('token', 'admin-token') // Simula un token
      onLogin() // Llama a la función pasada como prop
      navigate('/admin') // Redirige a la página /admin después del login exitoso
    } else {
      setError('Correo electrónico, nombre de usuario o contraseña incorrectos')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Iniciar sesión</h2>
          {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">
                Correo Electrónico o Nombre de Usuario
              </label>
              <input
                type="text"
                id="identifier"
                name="identifier"
                value={identifier}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
