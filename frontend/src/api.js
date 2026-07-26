const API_URL = import.meta.env.VITE_API_URL

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  let data = null
  try {
    data = await res.json()
  } catch {
    // no JSON body (e.g. empty 204 response) — leave data as null
  }

  if (!res.ok) {
    const message = (data && data.message) || `Request failed: ${res.status}`
    throw new Error(message)
  }

  return data
}

export async function checkHealth() {
  return request('/health', { method: 'GET' })
}

export async function login(email, password) {
  return request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export async function logout() {
  return request('/api/auth/logout', {
    method: 'POST',
  })
}

export async function getMe() {
  return request('/api/auth/me', {
    method: 'GET',
  })
}
