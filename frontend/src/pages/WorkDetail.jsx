import { useParams } from 'react-router-dom'

export default function WorkDetail() {
  const { slug } = useParams()
  return <div style={{ padding: '2rem' }}><h1>Work: {slug}</h1></div>
}
