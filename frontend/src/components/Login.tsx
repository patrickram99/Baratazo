import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface LoginProps {
  onLogin: () => void
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [identifier, setIdentifier] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errors, setErrors] = useState<{
    identifier?: string
    password?: string
    general?: string
  }>({})
  const navigate = useNavigate()

  const adminCredentials = {
    email: 'admin@example.com',
    username: 'admin',
    password: 'securePassword123',
  }

  useEffect(() => {
    const isLogged = localStorage.getItem('isLogged') === 'true'
    if (isLogged) {
      navigate('/dashboard')
    }
  }, [navigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'identifier') {
      setIdentifier(value)
      // Limpiar error cuando el usuario empieza a escribir
      setErrors(prev => ({ ...prev, identifier: undefined }))
    } else if (name === 'password') {
      setPassword(value)
      // Limpiar error cuando el usuario empieza a escribir
      setErrors(prev => ({ ...prev, password: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: { identifier?: string; password?: string } = {}
    let isValid = true

    if (!identifier.trim()) {
      newErrors.identifier = 'El correo electrónico o nombre de usuario es obligatorio'
      isValid = false
    }

    if (!password.trim()) {
      newErrors.password = 'La contraseña es obligatoria'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    if (!validateForm()) {
      return
    }

    if (
      (identifier === adminCredentials.email || identifier === adminCredentials.username) &&
      password === adminCredentials.password
    ) {
      localStorage.setItem('token', 'admin-token')
      localStorage.setItem('isLogged', 'true')
      onLogin()
      navigate('/dashboard')
    } else {
      setErrors({
        general: 'Credenciales incorrectas. Por favor, inténtalo de nuevo.',
      })
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-black">Iniciar sesión</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="identifier" className="sr-only">
                Correo electrónico o nombre de usuario
              </label>
              <input
                id="identifier"
                name="identifier"
                type="text"
                required
                className={`relative block w-full appearance-none rounded-none border px-3 py-2 ${
                  errors.identifier ? 'border-red-500' : 'border-gray-300'
                } rounded-t-md text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                placeholder="Correo electrónico o nombre de usuario"
                value={identifier}
                onChange={handleChange}
              />
              {errors.identifier && (
                <p className="mt-1 text-sm text-red-600">{errors.identifier}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={`relative block w-full appearance-none rounded-none border px-3 py-2 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } rounded-b-md text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                placeholder="Contraseña"
                value={password}
                onChange={handleChange}
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>
          </div>

          {errors.general && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{errors.general}</h3>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Iniciar sesión
            </button>
          </div>
        </form>

        <div className="text-center text-sm">
          <a
            href="/recuperar-contrasena"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-white hover:text-indigo-200"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>
    </div>
  )
}

export default Login
