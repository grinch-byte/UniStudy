import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Login(){

	const [email,setEmail]= useState("")
	const [password,setPassword]= useState("")
	const navigate = useNavigate()

	async function login(e){
		e.preventDefault()
		try{
			const apiUrl = import.meta.env.VITE_API_URL || ''
			const res = await fetch(`${apiUrl}/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			})
			const data = await res.json()
			if(!res.ok) return alert(data.message || 'Login failed')

			localStorage.setItem('token', data.token)
			localStorage.setItem('user', JSON.stringify(data.user))

			navigate('/profile')

		}catch(err){
			console.error(err)
			alert('Login failed')
		}
	}

	return(
		<main>

			<h1>Login</h1>

			<form onSubmit={login}>

				<input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="University Email" />

				<br/>

				<input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />

				<br/>

				<button>Login</button>

			</form>


		</main>
	)

}