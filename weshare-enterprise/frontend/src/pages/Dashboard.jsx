import React, { useEffect, useState } from 'react'
import { api } from '../api'
import { getToken, clearTokens } from '../auth'
import ShareForm from '../components/ShareForm'
import ShareList from '../components/ShareList'


export default function Dashboard({ onLogout }) {
  const [user, setUser] = useState(null)
  const [shares, setShares] = useState([])
  const token = getToken()

  async function load() {
    const me = await api('/api/auth/me/', 'GET', null, token)
    setUser(me)
    const items = await api('/api/shares/', 'GET', null, token)
    setShares(items)
  }

  useEffect(() => { load().catch(console.error) }, [])

  async function createShare(payload) {
    const s = await api('/api/shares/', 'POST', payload, token)
    setShares(prev => [s, ...prev])
  }

  async function removeShare(id) {
    await api(`/api/shares/${id}/`, 'DELETE', null, token)
    setShares(prev => prev.filter(x => x.id !== id))
  }

  function logout() {
    clearTokens()
    onLogout?.()
  }

  return (
    <div style={{maxWidth:800, margin:'2rem auto', fontFamily:'sans-serif'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h2>WeShare Enterprise</h2>
        <div>
          <span style={{marginRight: '1rem'}}>Hello, {user?.username}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
      <ShareForm onCreate={createShare} />
      <hr style={{margin:'1rem 0'}} />
      <ShareList items={shares} onDelete={removeShare} />
    </div>
  )
}
