import React from 'react'

export default function ShareList({ items = [], onDelete }) {
  return (
    <ul style={{listStyle:'none', padding:0}}>
      {items.map(s => (
        <li key={s.id} style={{border:'1px solid #ddd', padding:'0.75rem', borderRadius:8, marginBottom:'0.5rem'}}>
          <strong>{s.title}</strong>
          <div style={{fontSize:14, opacity:0.8}}>{s.description}</div>
          <div style={{display:'flex', gap:'0.5rem', marginTop:'0.5rem'}}>
            <button onClick={() => onDelete?.(s.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  )
}
