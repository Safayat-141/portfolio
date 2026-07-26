import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <p>Checking session...</p>
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}
