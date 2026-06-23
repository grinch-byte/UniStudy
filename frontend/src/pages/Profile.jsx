import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Profile(){
  const [user,setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(!token){ navigate('/login'); return }
    const apiUrl = import.meta.env.VITE_API_URL || ''
    fetch(`${apiUrl}/auth/me`, {
      headers: { Authorization: 'Bearer ' + token }
    }).then(r=>r.json()).then(data=>{
      if(data.message){ alert(data.message); navigate('/login'); return }
      setUser(data)
      localStorage.setItem('user', JSON.stringify(data))
    }).catch(err=>{ console.error(err); navigate('/login') })
  },[])

  if(!user) return (
    <main>
      <h1>Your Profile</h1>
      <p>Loading...</p>
    </main>
  )

  const initials = ((user.firstName||'')[0]||'') + ((user.lastName||'')[0]||'')

  return (
    <main>
      <h1>Your Profile</h1>
      <div className="profile-header">
        <div className="avatar avatar-large">{initials}</div>
        <div>
          <p className="profile-name"><strong>{user.firstName} {user.lastName}</strong></p>
          <p>{user.email}</p>
          <p>{user.program}</p>
          <p>Role: {user.role}</p>
        </div>
      </div>
    </main>
  )
}