import React, { useContext, useEffect } from 'react'
import { FaArrowRight } from "react-icons/fa";
import { FiCheckCircle, FiDownload, FiShield, FiUploadCloud } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import Card from '../Components/Card';
import { ContextStore } from '../store/ContextStore';


export default function Home() {

  const { isLoggedIn } = useContext(ContextStore)
  const navigate = useNavigate()
  const featureCards = [
    {
      title: "Live preview while you edit",
      description: "See the ID update instantly as you add the student's photo, name, and course details.",
      icon: <FiUploadCloud className="text-2xl" />
    },
    {
      title: "Print-ready download flow",
      description: "Generate clean cards that are ready to save, share, and print without extra design steps.",
      icon: <FiDownload className="text-2xl" />
    },
    {
      title: "Built for campus records",
      description: "Keep student information organized in one place instead of juggling manual templates.",
      icon: <FiShield className="text-2xl" />
    }
  ]
  const quickBenefits = [
    "No design software needed",
    "Simple student onboarding",
    "Clean output for college use"
  ]
  const steps = [
    {
      number: "01",
      title: "Add student details",
      description: "Upload the photo and enter the basic information once."
    },
    {
      number: "02",
      title: "Preview the ID instantly",
      description: "Check how the card looks before you commit to export."
    },
    {
      number: "03",
      title: "Download and print",
      description: "Use the final card for student records, issue desks, or admin workflows."
    }
  ]

  useEffect(() => {
    if (isLoggedIn)
      navigate("/dashboard")
  }, [isLoggedIn, navigate])

  return (
    <section className='relative'>
      <div className='mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-16'>
        <div className='grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center'>
          <div className="content space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.32em] text-slate-600 shadow-lg shadow-slate-200/40 backdrop-blur-sm">
              <FiCheckCircle className='text-sm text-emerald-600' />
              Student ID workflow made simple
            </div>
            <div className="heading space-y-5">
              <h1 className='max-w-2xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl'>
                Create printable student ID cards in minutes, not spreadsheets.
              </h1>
              <p className='max-w-xl text-base font-medium leading-7 text-slate-600 sm:text-lg'>
                Collect student details, preview the card live, and generate polished IDs your team can download and print right away.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/register"
                className='inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-7 py-3 text-sm font-bold text-white shadow-xl shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-slate-800'
              >
                Start Free
                <FaArrowRight />
              </Link>
              <Link
                to="/login"
                className='inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white/80 px-7 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-950 hover:text-slate-950'
              >
                Login
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {quickBenefits.map((benefit) => (
                <div key={benefit} className='rounded-2xl border border-white/70 bg-white/70 px-4 py-4 text-sm font-semibold text-slate-700 shadow-lg shadow-slate-200/40 backdrop-blur-sm'>
                  {benefit}
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-4 top-10 hidden rounded-2xl border border-white/70 bg-white/75 px-4 py-3 text-sm font-semibold text-slate-700 shadow-xl shadow-slate-200/50 backdrop-blur-sm md:block">
              Upload once. Preview instantly.
            </div>
            <div className="absolute -bottom-5 right-2 hidden rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-2xl shadow-slate-900/20 md:block">
              Ready for admin teams
            </div>
            <div className="relative mx-auto max-w-[34rem]">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-white/35 blur-2xl" />
              <div className="relative rounded-[2.25rem] border border-white/70 bg-white/35 p-3 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.55)] backdrop-blur-sm md:p-4">
                <Card
                  name="Anaya Singh"
                  userId="CSE-2408"
                  phone="+91 98765 43210"
                  course="B.Tech CSE"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-xl shadow-slate-200/40 backdrop-blur-sm md:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className='space-y-4'>
              <div className='text-sm font-bold uppercase tracking-[0.35em] text-sky-700'>Built for speed</div>
              <h2 className='text-3xl font-black tracking-tight text-slate-950'>Everything teams need to go from student details to a finished ID card.</h2>
              <p className='text-base leading-7 text-slate-600'>
                Keep the workflow simple for staff and students: add information once, review the preview, and create a card that is ready for issue desks or campus printing.
              </p>
            </div>
            <div className='grid gap-4 sm:grid-cols-3'>
              {featureCards.map((feature) => (
                <div key={feature.title} className='rounded-[1.75rem] border border-slate-100 bg-slate-50 px-5 py-6 shadow-sm'>
                  <div className='mb-4 inline-flex rounded-2xl bg-sky-100 p-3 text-sky-700'>
                    {feature.icon}
                  </div>
                  <h3 className='text-lg font-black tracking-tight text-slate-900'>{feature.title}</h3>
                  <p className='mt-2 text-sm leading-6 text-slate-600'>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className='rounded-[2rem] bg-slate-950 px-6 py-8 text-white shadow-[0_24px_60px_-35px_rgba(15,23,42,0.95)] md:px-8'>
            <div className='text-sm font-bold uppercase tracking-[0.35em] text-orange-300'>Why teams choose it</div>
            <h2 className='mt-4 text-3xl font-black tracking-tight'>A cleaner workflow for registrations, issue counters, and admin staff.</h2>
            <div className='mt-6 space-y-4 text-sm leading-7 text-slate-300'>
              <p>Users understand the outcome in seconds: enter details, preview the card, and generate a polished result.</p>
              <p>The page keeps the process approachable for first-time users while still feeling professional enough for institutional use.</p>
            </div>
          </div>
          <div className='grid gap-4'>
            {steps.map((step) => (
              <div key={step.number} className='rounded-[1.75rem] border border-white/80 bg-white/75 px-5 py-5 shadow-lg shadow-slate-200/35 backdrop-blur-sm md:px-6'>
                <div className='flex items-start gap-4'>
                  <div className='min-w-14 rounded-2xl bg-orange-100 px-3 py-2 text-center text-sm font-black tracking-[0.25em] text-orange-700'>
                    {step.number}
                  </div>
                  <div>
                    <h3 className='text-xl font-black tracking-tight text-slate-950'>{step.title}</h3>
                    <p className='mt-2 text-sm leading-6 text-slate-600'>{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
