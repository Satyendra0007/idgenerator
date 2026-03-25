import './App.css'
import Register from './Pages/Register'
import Navbar from './Components/Navbar'
import Login from './Pages/Login'
import Home from './Pages/Home'
import Footer from './Components/Footer'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import SignOut from './Pages/SignOut'
import Dashboard from './Pages/Dashboard'
import Admin from './Pages/Admin'

function AppLayout() {
  const { pathname } = useLocation()
  const isAuthRoute = pathname === '/register' || pathname === '/login'

  return (
    <div className={`min-h-screen overflow-x-hidden text-slate-900 ${isAuthRoute ? 'bg-gradient-to-br from-slate-100 via-white to-cyan-50' : 'bg-[#f5efe6]'}`}>
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className={`absolute left-[-8rem] top-[-5rem] h-72 w-72 rounded-full blur-3xl ${isAuthRoute ? 'bg-sky-200/65' : 'bg-orange-200/60'}`} />
        <div className="absolute right-[-10rem] top-20 h-80 w-80 rounded-full bg-sky-200/70 blur-3xl" />
        <div className={`absolute bottom-[-8rem] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl ${isAuthRoute ? 'bg-cyan-200/55' : 'bg-emerald-200/50'}`} />
      </div>
      <div className="relative flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signout" element={<SignOut />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        {!isAuthRoute && <Footer />}
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App;
