import logo from "../images/logo.svg"
import user from '../images/user.webp'

export default function Card({ image, name, userId, phone, course }) {
  const cardDetails = [
    { title: "Student ID", value: userId || "CSE-2408" },
    { title: "Phone", value: phone || "+91 98765 43210" },
    { title: "Course", value: course || "B.Tech CSE" }
  ]

  return (
    <div className='relative w-full overflow-hidden rounded-[2rem] bg-[linear-gradient(160deg,#0f3c5b_0%,#1d6a92_58%,#c59f6b_130%)] p-5 text-white shadow-[0_20px_60px_rgba(15,60,91,0.28)] md:p-6'>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.20),_transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.06),transparent_36%)]" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="max-w-[7rem] md:max-w-[8rem]">
            <img src={logo} alt="IdGenerator logo" />
          </div>
          <div className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/85">
            Preview
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-[8.5rem_1fr] md:items-start">
          <div className="mx-auto w-full max-w-[8.5rem] rounded-[1.6rem] bg-white/8 p-3 backdrop-blur-sm">
            <div className="overflow-hidden rounded-[1.2rem] border border-white/20 bg-white/85">
              <img
                className='h-36 w-full object-cover md:h-44'
                src={image || user}
                alt={name ? `${name} profile preview` : "Student profile preview"}
              />
            </div>
          </div>

          <div className="min-w-0">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75">
                Student name
              </div>
              <div className="mt-2 text-2xl font-bold leading-tight text-white md:text-[2rem]">
                {name || "Anaya Singh"}
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              {cardDetails.map((detail) => (
                <div key={detail.title} className="rounded-[1.1rem] bg-black/14 px-4 py-3 backdrop-blur-sm">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">
                    {detail.title}
                  </div>
                  <div className="mt-1.5 text-base font-semibold leading-6 text-white break-words">
                    {detail.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
