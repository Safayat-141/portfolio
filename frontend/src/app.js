const API_URL = import.meta.env.VITE_API_URL

export async function checkHealth() {
  const res = await fetch(`${API_URL}/health`, {
    method: 'GET',
    credentials: 'include',
  })

  if (!res.ok) {
    throw new Error(`Health check failed: ${res.status}`)
  }

  return res.json()
}
