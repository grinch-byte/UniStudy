import { Routes, Route, Navigate } from "react-router-dom"

import MainLayout from "./layouts/MainLayout.jsx"

import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Groups from "./pages/Groups.jsx"
import Sessions from "./pages/Sessions.jsx"
import Profile from "./pages/Profile.jsx"
import Chat from "./pages/Chat.jsx"
import Lecturers from "./pages/Lecturers.jsx"
import Library from "./pages/Library.jsx"
import AdminLibrary from "./pages/AdminLibrary.jsx"

import ProtectedRoute from "./components/ProtectedRoute.jsx"

function App() {

return (

<MainLayout>

<Routes>

<Route
path="/"
element={ <Navigate
to="/login"
replace
/>
}
/>

<Route
path="/login"
element={<Login />}
/>
<Route
path="/lecturers"
element={ <ProtectedRoute> <Lecturers /> </ProtectedRoute>
}
/>

<Route
path="/admin-library"
element={ <ProtectedRoute> <AdminLibrary /> </ProtectedRoute>
}
/>


<Route
path="/register"
element={<Register />}
/>

<Route
path="/dashboard"
element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute>
}
/>

<Route
path="/groups"
element={ <ProtectedRoute> <Groups /> </ProtectedRoute>
}
/>

<Route
path="/chat"
element={ <ProtectedRoute> <Chat /> </ProtectedRoute>
}
/>

<Route
path="/sessions"
element={ <ProtectedRoute> <Sessions /> </ProtectedRoute>
}
/>

<Route
path="/library"
element={ <ProtectedRoute> <Library /> </ProtectedRoute>
}
/>

<Route
path="/profile"
element={ <ProtectedRoute> <Profile /> </ProtectedRoute>
}
/>

<Route
path="*"
element={ <Navigate
to="/login"
replace
/>
}
/>

</Routes>

</MainLayout>

)

}

export default App
