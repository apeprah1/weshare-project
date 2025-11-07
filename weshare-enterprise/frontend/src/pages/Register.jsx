import React, { useState } from 'react'
import { api } from '../api'

export default function Register({ onSuccess }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setMsg('')
    try {
      await api('/api/auth/register/', 'POST', { username, email, password })
      setMsg('Registered! You can log in now.')
      onSuccess?.()
    } catch (e) {
      setMsg('Registration failed')
    }
  }

  return (
    <form onSubmit={submit} style={{display:'grid', gap: '0.5rem', marginTop:'1rem'}}>
      <input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
      <input placeholder="Email (optional)" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button type="submit">Create account</button>
      {msg && <div>{msg}</div>}
    </form>
  )
}
