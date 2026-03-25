import React, { useContext, useEffect, useState } from 'react'
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../Components/Spinner';
import { ContextStore } from '../store/ContextStore';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { sendPostRequest } from '../actions/serverActions';

export default function Login() {
  const navigate = useNavigate()
  const { isLoggedIn, saveToLocalStorage } = useContext(ContextStore)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    mode: 'onTouched',
  })
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)

  const fieldWrapperClass = 'flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition-colors duration-200 focus-within:border-slate-900'
  const inputClass = 'w-full border-0 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none'

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard")
    }
  }, [isLoggedIn, navigate])

  const handleOnSubmit = async (data) => {
    setLoading(true)

    try {
      const serverResponse = await sendPostRequest(`${import.meta.env.VITE_APP_SERVER_URI}api/auth/login`, data)
      const response = await serverResponse.json()

      if (!serverResponse.ok) {
        toast.error(response.message || 'Unable to sign in right now.')
        return
      }

      saveToLocalStorage(response.token)
      toast.success(response.message)
      navigate("/dashboard")
    } catch (error) {
      toast.error('Something went wrong while signing in. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="px-4 py-8 md:py-14">
      {loading && <Spinner />}

      <div className="mx-auto max-w-md">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] md:p-8">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Welcome back</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Sign in</h1>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Continue to your dashboard and manage student IDs.
            </p>
          </div>

          <form onSubmit={handleSubmit(handleOnSubmit)} className='space-y-5'>
            <div>
              <label className='mb-2 block text-sm font-medium text-slate-700' htmlFor="email">Email address</label>
              <div className={fieldWrapperClass}>
                <MdEmail className='text-xl text-slate-400' />
                <input
                  className={inputClass}
                  type="email"
                  id='email'
                  placeholder='name@example.com'
                  aria-invalid={errors.email ? 'true' : 'false'}
                  {...register("email", {
                    required: { value: true, message: "Email is required" },
                  })}
                />
              </div>
              {errors.email && <p className='mt-2 text-sm text-rose-600'>{errors.email.message}</p>}
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-slate-700' htmlFor="password">Password</label>
              <div className={`${fieldWrapperClass} pr-2`}>
                <RiLockPasswordFill className='text-xl text-slate-400' />
                <input
                  className={inputClass}
                  type={show ? "text" : "password"}
                  id='password'
                  placeholder='Enter your password'
                  aria-invalid={errors.password ? 'true' : 'false'}
                  {...register("password", {
                    required: { value: true, message: "Password is required" },
                    minLength: { value: 8, message: "Password must have at least 8 characters" },
                  })}
                />
                <button
                  type="button"
                  className='grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800'
                  onClick={() => setShow((prev) => !prev)}
                  aria-label={show ? 'Hide password' : 'Show password'}
                >
                  {show ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {errors.password && <p className='mt-2 text-sm text-rose-600'>{errors.password.message}</p>}
            </div>

            <button
              disabled={loading || isSubmitting}
              type="submit"
              className='w-full rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70'
            >
              {loading || isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>

            <p className="text-center text-sm text-slate-500">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="font-semibold text-slate-900 hover:underline">
                Create account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
