import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ContextStore } from '../store/ContextStore'
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";

const getNavLinkClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
    isActive
      ? 'bg-slate-950 text-white shadow-md shadow-slate-900/10'
      : 'text-slate-600 hover:bg-white hover:text-slate-950'
  }`

export default function Navbar() {
  const { isLoggedIn, userData } = useContext(ContextStore)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  const userName = userData?.name || 'User'
  const userImage = userData?.image

  const guestLinks = [
    { to: '/', label: 'Home' },
  ]

  const userLinks = [
    { to: '/dashboard', label: 'Dashboard' },
  ]

  const navLinks = isLoggedIn ? userLinks : guestLinks

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-[#f5efe6]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex shrink-0 items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-sm font-black tracking-[0.2em] text-white shadow-lg shadow-orange-200/60">
            ID
          </div>
          <div>
            <div className="text-xl font-black tracking-tight text-slate-950 md:text-2xl">
              <span className='text-sky-700'>Id</span>Generator
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-500">
              Student ID Studio
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-white/70 bg-white/70 px-2 py-2 shadow-lg shadow-slate-200/30 backdrop-blur-sm md:flex">
          {navLinks.map((item) => (
            <NavLink key={item.to} to={item.to} className={getNavLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {!isLoggedIn && (
            <div className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
              Fast. Printable. Ready.
            </div>
          )}

          {isLoggedIn ? (
            <>
              <div className="flex items-center gap-3 rounded-full border border-white/70 bg-white/70 px-2 py-1 shadow-lg shadow-slate-200/30 backdrop-blur-sm">
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-sky-100 text-sm font-bold text-sky-700">
                  {userImage ? (
                    <img className="h-full w-full object-cover" src={userImage} alt={`${userName} profile`} />
                  ) : (
                    userName.charAt(0).toUpperCase()
                  )}
                </div>
                <div className="pr-2">
                  <p className="max-w-28 truncate text-sm font-semibold text-slate-800">{userName}</p>
                  <p className="text-xs text-slate-500">{userData?.isAdmin ? 'Administrator' : 'Account'}</p>
                </div>
              </div>

              {userData?.isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-100"
                >
                  <MdOutlineAdminPanelSettings className='text-xl' />
                  <span>Admin Panel</span>
                </Link>
              )}

              <Link
                to="/signout"
                className="flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800"
              >
                <PiSignOutBold className='text-xl' />
                <span>Sign out</span>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-white/80 hover:text-slate-950"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-slate-950 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/75 text-slate-700 shadow-sm transition-all duration-200 hover:bg-white md:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <HiOutlineX className="text-2xl" /> : <HiOutlineMenuAlt3 className="text-2xl" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-slate-200/80 bg-[#f5efe6] px-4 py-4 shadow-lg md:hidden">
          <nav className="flex flex-col gap-2">
            {navLinks.map((item) => (
              <NavLink key={item.to} to={item.to} className={getNavLinkClass}>
                {item.label}
              </NavLink>
            ))}

            {isLoggedIn ? (
              <>
                <div className="mt-2 flex items-center gap-3 rounded-[1.5rem] border border-white/70 bg-white/80 px-3 py-3 shadow-sm">
                  <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-sky-100 text-sm font-bold text-sky-700">
                    {userImage ? (
                      <img className="h-full w-full object-cover" src={userImage} alt={`${userName} profile`} />
                    ) : (
                      userName.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{userName}</p>
                    <p className="text-xs text-slate-500">{userData?.email || 'Signed in account'}</p>
                  </div>
                </div>

                {userData?.isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center justify-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-3 text-sm font-semibold text-sky-700 transition-all duration-200 hover:bg-sky-100"
                  >
                    <MdOutlineAdminPanelSettings className='text-xl' />
                    <span>Admin Panel</span>
                  </Link>
                )}

                <Link
                  to="/signout"
                  className="mt-2 flex items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-slate-800"
                >
                  <PiSignOutBold className='text-xl' />
                  <span>Sign out</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="mt-2 flex items-center justify-center rounded-full border border-slate-200 bg-white/75 px-4 py-3 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-white"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center justify-center rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-slate-800"
                >
                  Create Account
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
