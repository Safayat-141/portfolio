import { useEffect, useState } from 'react'
import { checkHealth } from '../api.js'

export default function Home() {
  const [status, setStatus] = useState('checking...')

  useEffect(() => {
    checkHealth()
      .then((data) => setStatus(`OK — ${JSON.stringify(data)}`))
      .catch((err) => setStatus(`FAILED — ${err.message}`))
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Safayat — Portfolio (skeleton)</h1>
      <p style={{ marginTop: '1rem' }}>
        Backend health check: <strong>{status}</strong>
      </p>
    </div>
  )
}
