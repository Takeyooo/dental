import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  CalendarCheck2,
  MapPin,
  Phone,
  ShieldCheck,
  Smile,
  Stethoscope,
} from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

const SPECIALTY_PILLARS = [
  {
    number: '01',
    icon: ShieldCheck,
    title: 'Implantology & Prosthodontics',
    summary:
      'Permanent dental implants, zirconia crowns & bridges, root canal treatment, and complete dentures built for natural function.',
    to: '/services?category=restorative',
    cta: 'View restorative care',
  },
  {
    number: '02',
    icon: Smile,
    title: 'Orthodontics & Smile Aesthetics',
    summary:
      'Braces alignment, composite & zirconia veneers, teeth whitening, diastema closure, and tailored cosmetic smile design.',
    to: '/services?category=aesthetic',
    cta: 'View aesthetic care',
  },
  {
    number: '03',
    icon: Stethoscope,
    title: 'Oral Surgery & General Care',
    summary:
      'Painless surgical extractions, composite fillings, routine oral check-ups, and preventive gum care for the whole family.',
    to: '/services?category=general',
    cta: 'View surgical & general',
  },
];

const QUICK_BOOK_SHORTCUTS = [
  'General Dentistry (সাধারণ দন্ত চিকিৎসা)',
  'RCT (Root Canal Treatment)',
  'Dental Implant',
  'Orthodontic Treatment (ব্রেসেস)',
  'Teeth Whitening (দাঁত সাদা করা)',
  'Extraction (দাঁত তোলা)',
];

const BOOKING_STEPS = [
  {
    step: '01',
    title: 'Select your treatment',
    detail:
      'Pick from 13 specialized dental & aesthetic services or book a general check-up.',
  },
  {
    step: '02',
    title: 'Choose date & session',
    detail:
      'Tap Tomorrow or any date, and select Morning, Afternoon, or Evening hours.',
  },
  {
    step: '03',
    title: 'Confirm on WhatsApp',
    detail:
      'Send your pre-filled slip straight to 01750643086 and receive your serial.',
  },
];

export function HomePage() {
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <section className="border-b border-slate-200/80 bg-porcelain-canvas">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-center lg:col-span-6"
            >
              <p className="text-sm font-semibold text-[#7C5E34]">
                <span>{CLINIC_INFO.brandNameBn}</span>
                <span aria-hidden="true" className="mx-2 text-slate-300">
                  ·
                </span>
                <span>{CLINIC_INFO.tagline}</span>
              </p>

              <h1 className="mt-4 font-serif-display text-[clamp(2.25rem,4vw,3.45rem)] font-semibold leading-[1.08] tracking-tight text-[#0B1F3A] text-balance">
                Refined dental, implant &amp; surgical care by{' '}
                {CLINIC_INFO.doctorName}
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">
                {CLINIC_INFO.doctorRole} ({CLINIC_INFO.doctorDegreeSummary}).
                Serving Siddhirganj, Narayanganj with gentle clinical precision
                and effortless WhatsApp serial scheduling.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/book"
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-lg bg-[#0B1F3A] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#14325C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1F3A] focus-visible:ring-offset-2 whitespace-nowrap shrink-0"
                >
                  <CalendarCheck2
                    className="h-4 w-4 text-[#DFC191]"
                    aria-hidden="true"
                  />
                  <span>Schedule via WhatsApp</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <a
                  href={`tel:+88${CLINIC_INFO.phoneDisplay}`}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-lg border border-slate-300/90 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-xs transition-all duration-150 hover:-translate-y-0.5 hover:border-[#0B1F3A] hover:text-[#0B1F3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1F3A] focus-visible:ring-offset-2 whitespace-nowrap shrink-0 tabular-nums"
                >
                  <Phone
                    className="h-4 w-4 text-[#9A7B4F]"
                    aria-hidden="true"
                  />
                  <span>Call {CLINIC_INFO.phoneDashed}</span>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col lg:col-span-6"
            >
              <figure className="card-gallery flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-2.5">
                {!imageError ? (
                  <div className="overflow-hidden rounded-xl bg-slate-100">
                    <img
                      src={CLINIC_INFO.signboardImage}
                      alt="Dental Indoor — Dr. Abdur Rohim clinic signboard showing services, credentials, and contact 01750643086"
                      referrerPolicy="no-referrer"
                      onError={() => setImageError(true)}
                      className="block h-auto w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl bg-sapphire-hero p-8 text-center text-white">
                    <p className="font-serif-display text-2xl font-semibold text-white">
                      {CLINIC_INFO.brandNameBn} · {CLINIC_INFO.brandName}
                    </p>
                    <p className="mt-2 text-base font-semibold text-[#DFC191]">
                      {CLINIC_INFO.doctorName}
                    </p>
                    <p className="mt-1 text-sm text-slate-300">
                      {CLINIC_INFO.doctorRole}
                    </p>
                    <p className="mt-4 font-mono text-sm text-slate-200 tabular-nums">
                      BMDC Reg. No. {CLINIC_INFO.bmdcReg} ·{' '}
                      {CLINIC_INFO.phoneDashed}
                    </p>
                  </div>
                )}
                <figcaption className="flex flex-wrap items-center justify-between gap-2 px-2 pt-3 pb-1 text-xs text-slate-600">
                  <span className="font-medium text-slate-700">
                    {CLINIC_INFO.brandName} · {CLINIC_INFO.doctorName} (
                    {CLINIC_INFO.doctorDegreeSummary})
                  </span>
                  <span className="font-mono tabular-nums text-[#7C5E34]">
                    BMDC Reg. {CLINIC_INFO.bmdcReg}
                  </span>
                </figcaption>
              </figure>
            </motion.div>
          </div>

          <div className="card-elevated bg-silk-surface mt-12 grid grid-cols-1 divide-y divide-slate-200/90 rounded-2xl border border-slate-200/90 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            <div className="p-5 sm:p-6">
              <p className="text-xs font-medium text-slate-500">
                Clinical Scope
              </p>
              <p className="mt-1 font-serif-display text-lg font-semibold text-[#0B1F3A] tabular-nums">
                13 Specialized Services
              </p>
            </div>
            <div className="p-5 sm:p-6 border-slate-200 sm:border-l lg:border-l-0">
              <p className="text-xs font-medium text-slate-500">Registration</p>
              <p className="mt-1 font-serif-display text-lg font-semibold text-[#0B1F3A] tabular-nums">
                BMDC Reg. No. {CLINIC_INFO.bmdcReg}
              </p>
            </div>
            <div className="p-5 sm:p-6 border-t border-slate-200 lg:border-t-0">
              <p className="text-xs font-medium text-slate-500">
                WhatsApp &amp; Serial Desk
              </p>
              <p className="mt-1 font-serif-display text-base font-semibold text-[#0B1F3A] tabular-nums">
                {CLINIC_INFO.phoneDashed} · {CLINIC_INFO.secondaryPhoneDisplay}
              </p>
            </div>
            <div className="p-5 sm:p-6 border-t border-slate-200 sm:border-l lg:border-t-0 lg:border-l-0">
              <p className="text-xs font-medium text-slate-500">
                Clinic Chamber
              </p>
              <p className="mt-1 font-serif-display text-base font-semibold text-[#0B1F3A]">
                Sahebpara Bazar, Siddhirganj
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200/90 bg-white/90 p-5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-semibold text-[#7C5E34]">
                  Express Booking Shortcuts
                </p>
                <p className="mt-0.5 text-sm text-slate-600">
                  Tap a common treatment to jump straight to WhatsApp scheduling:
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {QUICK_BOOK_SHORTCUTS.map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() =>
                      navigate(`/book?treatment=${encodeURIComponent(label)}`)
                    }
                    className="min-h-[38px] rounded-lg border border-slate-200 bg-[#F8F7F4] px-3 py-1.5 text-xs font-medium text-[#0B1F3A] transition-colors duration-150 hover:border-[#9A7B4F] hover:bg-[#0B1F3A] hover:text-white whitespace-nowrap cursor-pointer"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-[#7C5E34]">
                Three Pillars of Care
              </p>
              <h2 className="mt-2 font-serif-display text-2xl font-semibold tracking-tight text-[#0B1F3A] sm:text-3xl text-balance">
                Focused treatment pathways tailored to your smile
              </h2>
            </div>

            <Link
              to="/services"
              className="inline-flex min-h-[40px] items-center gap-1.5 text-sm font-semibold text-[#0B1F3A] hover:text-[#7C5E34] whitespace-nowrap shrink-0"
            >
              <span>Explore all 13 treatments</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {SPECIALTY_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article
                  key={pillar.number}
                  className="card-elevated bg-silk-surface group flex flex-col justify-between rounded-2xl border border-slate-200/90 p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#9A7B4F]/60"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
                      <span className="font-mono text-xs font-semibold tabular-nums text-[#9A7B4F]">
                        {pillar.number}
                      </span>
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#0B1F3A] transition-colors group-hover:border-[#9A7B4F]/50 group-hover:text-[#7C5E34]">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                    </div>
                    <h3 className="mt-5 font-serif-display text-xl font-semibold text-[#0B1F3A]">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {pillar.summary}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-slate-200/70 pt-4">
                    <Link
                      to={pillar.to}
                      className="inline-flex min-h-[40px] items-center gap-1.5 text-sm font-semibold text-[#0B1F3A] transition-colors group-hover:text-[#7C5E34] whitespace-nowrap"
                    >
                      <span>{pillar.cta}</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200/80 bg-porcelain-canvas">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#7C5E34]">
              Simple Appointment Process
            </p>
            <h2 className="mt-2 font-serif-display text-2xl font-semibold tracking-tight text-[#0B1F3A] sm:text-3xl text-balance">
              Book your clinic serial in three effortless steps
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {BOOKING_STEPS.map((item) => (
              <div
                key={item.step}
                className="card-elevated rounded-2xl border border-slate-200/90 bg-white p-6"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#0B1F3A] font-mono text-xs font-semibold tabular-nums text-[#DFC191]">
                  {item.step}
                </span>
                <h3 className="mt-4 font-serif-display text-lg font-semibold text-[#0B1F3A]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-sapphire-hero card-gallery relative mt-12 overflow-hidden rounded-2xl border border-[#9A7B4F]/35 p-8 text-white sm:p-10">
            <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <p className="text-sm font-semibold text-[#DFC191]">
                  Direct Specialist Access
                </p>
                <h2 className="mt-2 font-serif-display text-2xl font-semibold tracking-tight text-white sm:text-3xl text-balance">
                  Meet {CLINIC_INFO.doctorName} or reserve your visit today
                </h2>
                <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-300">
                  Review Dr. Rohim&apos;s postgraduate training from Dhaka Dental
                  College &amp; Hospital, check chamber visiting sessions, or
                  send your preferred appointment slot straight to WhatsApp.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
                <Link
                  to="/doctor"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/15 whitespace-nowrap"
                >
                  <span>Doctor Profile</span>
                </Link>
                <Link
                  to="/location"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/15 whitespace-nowrap"
                >
                  <MapPin
                    className="h-4 w-4 text-[#DFC191]"
                    aria-hidden="true"
                  />
                  <span>Chamber Map</span>
                </Link>
                <Link
                  to="/book"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-500 whitespace-nowrap"
                >
                  <span>Book via WhatsApp</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
