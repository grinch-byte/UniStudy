import { Link, useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Navbar(){

	const [user, setUser] = useState(null)
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(()=>{
		const u = localStorage.getItem('user')
		setUser(u ? JSON.parse(u) : null)
	},[location.pathname])

	function logout(){
		localStorage.removeItem('token')
		localStorage.removeItem('user')
		setUser(null)
		navigate('/login')
	}

	function initials(u){
		if(!u) return ''
		return ((u.firstName||'')[0]||'') + ((u.lastName||'')[0]||'')
	}

	const isLoggedIn = Boolean(user)

	if (!isLoggedIn) return null

	return(

		<nav className="main-nav">

			<div className="nav-left">
				{!isLoggedIn ? (
					<>
						<Link to="/login">Login</Link>
						<span> | </span>
						<Link to="/register">Register</Link>
					</>
				) : (
					<>
						<Link to="/dashboard">Dashboard</Link>
						<span> | </span>
						<Link to="/groups">Groups</Link>
						<span> | </span>
						<Link to="/sessions">Sessions</Link>
					</>
				)}
			</div>

			{isLoggedIn && (
				<div className="nav-right">
					<Link to="/profile" className="avatar-link">
						<div className="avatar avatar-small">{initials(user)}</div>
					</Link>
					<button className="nav-logout" onClick={logout}>Logout</button>
				</div>
			)}

		</nav>

	)
}

