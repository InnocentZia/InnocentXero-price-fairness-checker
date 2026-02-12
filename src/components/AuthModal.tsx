import { useState } from 'react'
import { X, Mail, Lock, User } from 'lucide-react'
import { registerUser, loginUser } from '../api'
import type { AuthUser } from '../api'

interface AuthModalProps {
  onClose: () => void
  onAuth: (user: AuthUser, token: string) => void
}

export function AuthModal({ onClose, onAuth }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const result = mode === 'login'
        ? await loginUser(email, password)
        : await registerUser(email, password, displayName)
      localStorage.setItem('fairprice_token', result.token)
      localStorage.setItem('fairprice_user', JSON.stringify(result.user))
      onAuth(result.user, result.token)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{mode === 'login' ? 'Welcome back' : 'Create account'}</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  placeholder="Your name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder={mode === 'register' ? 'Min 6 characters' : 'Your password'}
                required
                minLength={mode === 'register' ? 6 : undefined}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {error && <p className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          {mode === 'login' ? (
            <>No account? <button onClick={() => { setMode('register'); setError('') }} className="text-indigo-600 font-semibold hover:underline">Sign up</button></>
          ) : (
            <>Already have an account? <button onClick={() => { setMode('login'); setError('') }} className="text-indigo-600 font-semibold hover:underline">Sign in</button></>
          )}
        </div>
      </div>
    </div>
  )
}
