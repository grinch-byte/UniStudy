import { useState, useEffect } from "react"

export default function Sessions() {
  const [sessions, setSessions] = useState([])
  const [formData, setFormData] = useState({ title: "", description: "", startTime: "", duration: 60 })
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  const apiUrl = import.meta.env.VITE_API_URL || ''
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchSessions()
  }, [])

  async function fetchSessions(){
    try{
      setLoading(true)
      const res = await fetch(`${apiUrl}/sessions`, {
        headers: { Authorization: 'Bearer ' + token }
      })
      const data = await res.json()
      if(!res.ok) return alert(data.message || 'Failed to fetch sessions')
      setSessions(data)
    }catch(err){
      console.error(err)
      alert('Failed to fetch sessions')
    }finally{
      setLoading(false)
    }
  }

  async function handleCreateSession(e){
    e.preventDefault()
    if(!formData.title) return alert('Session title is required')

    try{
      const res = await fetch(`${apiUrl}/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({ ...formData, duration: parseInt(formData.duration) })
      })
      const data = await res.json()
      if(!res.ok) return alert(data.message || 'Failed to create session')

      alert('Session created!')
      setFormData({ title: "", description: "", startTime: "", duration: 60 })
      setShowForm(false)
      fetchSessions()
    }catch(err){
      console.error(err)
      alert('Failed to create session')
    }
  }

  if(loading) return (
    <main>
      <h1>Sessions</h1>
      <p>Loading...</p>
    </main>
  )

  return (
    <main>
      <h1>Sessions</h1>

      <button onClick={() => setShowForm(!showForm)} style={{ marginBottom: '16px' }}>
        {showForm ? 'Cancel' : 'Create Session'}
      </button>

      {showForm && (
        <form onSubmit={handleCreateSession} style={{ marginBottom: '16px', padding: '12px', border: '1px solid #ccc' }}>
          <input
            type="text"
            placeholder="Session title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <br /><br />
          <textarea
            placeholder="Session description (optional)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            style={{ width: '100%', minHeight: '80px' }}
          />
          <br /><br />
          <input
            type="datetime-local"
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
          />
          <br /><br />
          <label>Duration (minutes):</label>
          <input
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          />
          <br /><br />
          <button type="submit">Create</button>
        </form>
      )}

      {sessions.length === 0 ? (
        <p>No upcoming sessions.</p>
      ) : (
        <div>
          {sessions.map(session => (
            <div key={session.id} style={{ padding: '12px', border: '1px solid #ddd', marginBottom: '8px' }}>
              <h3>{session.title}</h3>
              <p>{session.description}</p>
              <p><strong>Duration:</strong> {session.duration} minutes</p>
              <p><strong>Participants:</strong> {session.participants?.length || 0}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}