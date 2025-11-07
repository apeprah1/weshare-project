import React, { useState } from 'react'
import { api } from '../api'
import { saveTokens } from '../auth'

export default function Login({ onSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    try {
      const data = await api('/api/auth/token/', 'POST', { username, password })
      saveTokens(data)
      onSuccess?.()
    } catch (e) {
      setErr('Login failed')
    }
  }

  return (
    <form onSubmit={submit} style={{display:'grid', gap: '0.5rem', marginTop:'1rem'}}>
      <input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button type="submit">Sign in</button>
      {err && <div style={{color:'crimson'}}>{err}</div>}
    </form>
  )
}
