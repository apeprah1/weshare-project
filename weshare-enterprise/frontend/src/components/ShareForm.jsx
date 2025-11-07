import React, { useState } from 'react'

export default function ShareForm({ onCreate }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const submit = (e) => {
    e.preventDefault()
    onCreate?.({ title, description })
    setTitle(''); setDescription('')
  }

  return (
    <form onSubmit={submit} style={{display:'grid', gap: '0.5rem'}}>
      <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
      <button type="submit">Create Share</button>
    </form>
  )
}
