import { useState } from "react"
import { useNavigate, Navigate } from "react-router-dom"

export default function Register() {

  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  if (token) {
    return <Navigate to="/profile" replace />
  }

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    program: "",
    role: "Student",
    password: ""
  })

  function update(e) {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })

  }

  async function submit(e) {

    e.preventDefault()

    try {

      const apiUrl = import.meta.env.VITE_API_URL || ''
      const res = await fetch(
        `${apiUrl}/auth/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(form)
        }
      )

      const data = await res.json()

      alert(data.message)

      if (res.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))

        setForm({
          firstName: "",
          lastName: "",
          email: "",
          program: "",
          role: "Student",
          password: ""
        })

        navigate("/profile")
      }

    }

    catch {

      alert("Registration failed")

    }

  }

  return (

    <main>

      <h1>Create UniStudy Account</h1>

      <form onSubmit={submit}>

        <input
          name="firstName"
          placeholder="Legal First Name"
          value={form.firstName}
          onChange={update}
        />

        <br /><br />

        <input
          name="lastName"
          placeholder="Legal Last Name"
          value={form.lastName}
          onChange={update}
        />

        <br /><br />

        <input
          name="email"
          placeholder="University Email"
          value={form.email}
          onChange={update}
        />

        <br /><br />

        <input
          name="program"
          placeholder="Program"
          value={form.program}
          onChange={update}
        />

        <br /><br />

        <select
          name="role"
          value={form.role}
          onChange={update}
        >
          <option>Student</option>
          <option>Lecturer</option>
        </select>

        <br /><br />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={update}
        />

        <br /><br />

        <button type="submit">
          Create Account
        </button>

      </form>

    </main>

  )

}