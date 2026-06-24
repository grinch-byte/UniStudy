import { useState, useEffect } from "react"

export default function Groups() {
  const [groups, setGroups] = useState([])
  const [formData, setFormData] = useState({ name: "", description: "" })
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  const apiUrl = import.meta.env.VITE_API_URL || ''
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchGroups()
  }, [])

  async function fetchGroups(){
    try{
      setLoading(true)
      const res = await fetch(`${apiUrl}/groups`, {
        headers: { Authorization: 'Bearer ' + token }
      })
      const data = await res.json()
      if(!res.ok) return alert(data.message || 'Failed to fetch groups')
      setGroups(data)
    }catch(err){
      console.error(err)
      alert('Failed to fetch groups')
    }finally{
      setLoading(false)
    }
  }

  async function handleCreateGroup(e){
    e.preventDefault()
    if(!formData.name) return alert('Group name is required')

    try{
      const res = await fetch(`${apiUrl}/groups`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if(!res.ok) return alert(data.message || 'Failed to create group')

      alert('Group created!')
      setFormData({ name: "", description: "" })
      setShowForm(false)
      fetchGroups()
    }catch(err){
      console.error(err)
      alert('Failed to create group')
    }
  }

  if(loading) return (
    <main>
      <h1>Your Groups</h1>
      <p>Loading...</p>
    </main>
  )

  return (
    <main>
      <h1>Your Groups</h1>

      <button onClick={() => setShowForm(!showForm)} style={{ marginBottom: '16px' }}>
        {showForm ? 'Cancel' : 'Create Group'}
      </button>

      {showForm && (
        <form onSubmit={handleCreateGroup} style={{ marginBottom: '16px', padding: '12px', border: '1px solid #ccc' }}>
          <input
            type="text"
            placeholder="Group name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <br /><br />
          <textarea
            placeholder="Group description (optional)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            style={{ width: '100%', minHeight: '80px' }}
          />
          <br /><br />
          <button type="submit">Create</button>
        </form>
      )}

      {groups.length === 0 ? (
        <p>You have not joined any groups.</p>
      ) : (
        <div>
          {groups.map(group => (
            <div key={group.id} style={{ padding: '12px', border: '1px solid #ddd', marginBottom: '8px' }}>
              <h3>{group.name}</h3>
              <p>{group.description}</p>
              <p><strong>Members:</strong> {group.members?.length || 0}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}