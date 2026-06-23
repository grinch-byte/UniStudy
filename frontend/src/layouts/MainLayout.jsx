import Navbar from "../components/navbar.jsx"

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}