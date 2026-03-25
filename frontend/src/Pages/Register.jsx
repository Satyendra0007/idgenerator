import React, { useContext, useEffect, useState } from 'react'
import { FaUser, FaPhoneAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../Components/Spinner';
import { FaUpload } from "react-icons/fa6";
import user from '../images/user.webp'
import { PiStudentFill } from "react-icons/pi";
import { ContextStore } from '../store/ContextStore'

export default function Register() {
  const navigate = useNavigate()
  const { isLoggedIn, saveToLocalStorage } = useContext(ContextStore)
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    mode: 'onTouched',
  })
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState(user)
  const [show, setShow] = useState({
    pass: false,
    conPass: false,
  })

  const passwordValue = watch("password")
  const confirmPasswordValue = watch("confirmPassword")
  const passwordsDoNotMatch = Boolean(confirmPasswordValue) && passwordValue !== confirmPasswordValue

  const fieldWrapperClass = 'flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition-colors duration-200 focus-within:border-slate-900'
  const inputClass = 'w-full border-0 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none'

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard")
    }
  }, [isLoggedIn, navigate])

  useEffect(() => {
    if (preview === user) {
      return undefined
    }

    return () => {
      URL.revokeObjectURL(preview)
    }
  }, [preview])

  const handlefileOnChange = (event) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    setPreview(URL.createObjectURL(file))
  }

  const handleOnSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords must match before you continue.')
      return
    }

    setLoading(true)

    try {
      const formData = new FormData();
      formData.append("image", data.image[0])
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("course", data.course);
      formData.append("password", data.password);

      const serverResponse = await fetch(`${import.meta.env.VITE_APP_SERVER_URI}api/auth/signup`, {
        method: "POST",
        body: formData
      })
      const response = await serverResponse.json()

      if (!serverResponse.ok) {
        toast.warning(response.message || 'Unable to create your account right now.')
        return
      }

      saveToLocalStorage(response.token)
      toast.success(response.message)
      navigate("/dashboard")
    } catch (error) {
      toast.error('Something went wrong while creating your account. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="px-4 py-8 md:py-14">
      {loading && <Spinner />}

      <div className="mx-auto max-w-2xl">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] md:p-8">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Create account</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Get started</h1>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Add your details below to create an account and start generating student IDs.
            </p>
          </div>

          <form onSubmit={handleSubmit(handleOnSubmit)} className='space-y-5'>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className='mb-2 block text-sm font-medium text-slate-700' htmlFor="name">Full name</label>
                <div className={fieldWrapperClass}>
                  <FaUser className='text-sm text-slate-400' />
                  <input
                    className={inputClass}
                    type="text"
                    id='name'
                    placeholder='Enter your full name'
                    aria-invalid={errors.name ? 'true' : 'false'}
                    {...register("name", {
                      required: { value: true, message: "Name is required" },
                    })}
                  />
                </div>
                {errors.name && <p className='mt-2 text-sm text-rose-600'>{errors.name.message}</p>}
              </div>

              <div>
                <label className='mb-2 block text-sm font-medium text-slate-700' htmlFor="phone">Phone number</label>
                <div className={fieldWrapperClass}>
                  <FaPhoneAlt className='text-sm text-slate-400' />
                  <input
                    className={inputClass}
                    type="tel"
                    id='phone'
                    placeholder='10-digit mobile number'
                    inputMode="numeric"
                    aria-invalid={errors.phone ? 'true' : 'false'}
                    {...register("phone", {
                      required: { value: true, message: "Phone number is required" },
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Phone number must have exactly 10 digits",
                      },
                    })}
                  />
                </div>
                {errors.phone && <p className='mt-2 text-sm text-rose-600'>{errors.phone.message}</p>}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
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
                <label className='mb-2 block text-sm font-medium text-slate-700' htmlFor="course">Course</label>
                <div className={fieldWrapperClass}>
                  <PiStudentFill className='text-lg text-slate-400' />
                  <input
                    className={inputClass}
                    type="text"
                    id='course'
                    placeholder='BCA, MCA, B.Tech...'
                    aria-invalid={errors.course ? 'true' : 'false'}
                    {...register("course", {
                      required: { value: true, message: "Course is required" },
                    })}
                  />
                </div>
                {errors.course && <p className='mt-2 text-sm text-rose-600'>{errors.course.message}</p>}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className='mb-2 block text-sm font-medium text-slate-700' htmlFor="password">Password</label>
                <div className={`${fieldWrapperClass} pr-2`}>
                  <RiLockPasswordFill className='text-xl text-slate-400' />
                  <input
                    className={inputClass}
                    type={show.pass ? "text" : "password"}
                    id='password'
                    placeholder='Create a password'
                    aria-invalid={errors.password ? 'true' : 'false'}
                    {...register("password", {
                      required: { value: true, message: "Password is required" },
                      minLength: { value: 8, message: "Password must have at least 8 characters" },
                    })}
                  />
                  <button
                    type="button"
                    className='grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800'
                    onClick={() => setShow((prev) => ({ ...prev, pass: !prev.pass }))}
                    aria-label={show.pass ? 'Hide password' : 'Show password'}
                  >
                    {show.pass ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
                {errors.password && <p className='mt-2 text-sm text-rose-600'>{errors.password.message}</p>}
              </div>

              <div>
                <label className='mb-2 block text-sm font-medium text-slate-700' htmlFor="conf-pass">Confirm password</label>
                <div className={`${fieldWrapperClass} pr-2`}>
                  <RiLockPasswordFill className='text-xl text-slate-400' />
                  <input
                    className={inputClass}
                    type={show.conPass ? "text" : "password"}
                    id='conf-pass'
                    placeholder='Confirm your password'
                    aria-invalid={errors.confirmPassword || passwordsDoNotMatch ? 'true' : 'false'}
                    {...register("confirmPassword", {
                      required: { value: true, message: "Please confirm your password" },
                      minLength: { value: 8, message: "Password must have at least 8 characters" },
                    })}
                  />
                  <button
                    type="button"
                    className='grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800'
                    onClick={() => setShow((prev) => ({ ...prev, conPass: !prev.conPass }))}
                    aria-label={show.conPass ? 'Hide confirm password' : 'Show confirm password'}
                  >
                    {show.conPass ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
                {errors.confirmPassword && <p className='mt-2 text-sm text-rose-600'>{errors.confirmPassword.message}</p>}
                {!errors.confirmPassword && passwordsDoNotMatch && <p className='mt-2 text-sm text-rose-600'>Passwords must match.</p>}
              </div>
            </div>

            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-xl border border-slate-200 bg-white">
                    <img src={preview} className='h-full w-full object-cover' alt="Profile preview" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Profile photo</p>
                    <p className="mt-1 text-sm text-slate-500">
                      Upload a clear image for the ID card.
                    </p>
                  </div>
                </div>

                <label className='inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100' htmlFor="image">
                  <span>Upload photo</span>
                  <FaUpload />
                </label>
              </div>

              <input
                className='hidden'
                type="file"
                id='image'
                accept="image/*"
                aria-invalid={errors.image ? 'true' : 'false'}
                {...register("image", {
                  required: { value: true, message: "Choose a profile image" },
                  onChange: handlefileOnChange,
                })}
              />

              {errors.image && <p className='mt-3 text-sm text-rose-600'>{errors.image.message}</p>}
            </div>

            <button
              disabled={loading || isSubmitting || passwordsDoNotMatch}
              type="submit"
              className='w-full rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70'
            >
              {loading || isSubmitting ? 'Creating account...' : 'Create account'}
            </button>

            <p className="text-center text-sm text-slate-500">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-slate-900 hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
