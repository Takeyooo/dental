import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Award, CalendarCheck2, ShieldCheck, Stethoscope } from 'lucide-react';
import { CLINIC_INFO, DOCTOR_CREDENTIALS } from '../data/clinicData';

const CLINICAL_PRINCIPLES = [
  {
    icon: ShieldCheck,
    title: 'Hospital-Grade Sterilization',
    detail:
      'Strict autoclave instrument sterilization and disposable clinical barriers for every patient session.',
  },
  {
    icon: Stethoscope,
    title: 'Conservative Tooth Preservation',
    detail:
      'Priority focus on saving natural tooth structure through meticulous endodontics and restorative bonding.',
  },
  {
    icon: Award,
    title: 'Clear Consultation Before Care',
    detail:
      'Transparent diagnosis, options, and expected timeline explained calmly prior to starting any procedure.',
  },
];

export function DoctorPage() {
  return (
    <>
      <section className="bg-page-banner-light border-b border-slate-200/80 py-10 sm:py-14">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-sm font-semibold text-[#7C5E34]">
              Attending Dental Surgeon
            </p>
            <h1 className="mt-2 font-serif-display text-3xl font-semibold tracking-tight text-[#0B1F3A] sm:text-4xl text-balance">
              {CLINIC_INFO.doctorName}
            </h1>
            <p className="mt-2 text-base font-medium text-slate-700">
              {CLINIC_INFO.doctorRole}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-600">
              <span className="font-mono font-semibold tabular-nums text-[#0B1F3A]">
                BMDC Reg. No. {CLINIC_INFO.bmdcReg}
              </span>
              <span aria-hidden="true">·</span>
              <span>Dhaka Dental College &amp; Hospital</span>
            </div>
          </div>

          <div className="hidden sm:flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-[#9A7B4F]/40 bg-white font-serif-display text-2xl font-semibold tracking-wider text-[#0B1F3A] shadow-xs">
            AR
          </div>
        </div>
      </section>

      <section className="bg-porcelain-canvas py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-6xl px-4 sm:px-6"
        >
          <div className="grid grid-cols-1 gap-10 border-b border-slate-200/90 pb-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <p className="text-sm font-semibold text-[#7C5E34]">
                Clinical Philosophy
              </p>
              <h2 className="mt-2 font-serif-display text-2xl font-semibold tracking-tight text-[#0B1F3A] text-balance">
                Specialist surgical precision in a calm neighborhood chamber
              </h2>

              <p className="mt-4 text-base leading-relaxed text-slate-600">
                With postgraduate training across maxillofacial surgery,
                conservative dentistry, endodontics, periodontics,
                prosthodontics, and smile aesthetics, Dr. Abdur Rohim leads
                Dental Indoor with a focus on gentle, evidence-based clinical
                outcomes.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/book"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#0B1F3A] px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-all hover:-translate-y-0.5 hover:bg-[#14325C] whitespace-nowrap"
                >
                  <CalendarCheck2
                    className="h-4 w-4 text-[#DFC191]"
                    aria-hidden="true"
                  />
                  <span>Book Consultation</span>
                </Link>
                <Link
                  to="/services"
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-[#0B1F3A] hover:text-[#0B1F3A] whitespace-nowrap"
                >
                  <span>View Treatments</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="card-elevated bg-silk-surface rounded-2xl border border-slate-200/90 px-6 py-3">
                <div className="divide-y divide-slate-200/80">
                  {DOCTOR_CREDENTIALS.map((cred, index) => (
                    <div
                      key={cred.title}
                      className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-xs font-semibold tabular-nums text-[#9A7B4F]">
                          0{index + 1}
                        </span>
                        <h3 className="font-sans-ui text-base font-semibold text-[#0B1F3A]">
                          {cred.title}
                        </h3>
                      </div>
                      <p className="pl-7 text-sm text-slate-600 sm:pl-0 sm:text-right">
                        {cred.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12">
            <p className="text-sm font-semibold text-[#7C5E34]">
              Practice Standards
            </p>
            <h2 className="mt-2 font-serif-display text-2xl font-semibold text-[#0B1F3A]">
              What patients can expect at every visit
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {CLINICAL_PRINCIPLES.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="card-elevated bg-silk-surface rounded-2xl border border-slate-200/90 p-6"
                  >
                    <div className="flex items-center justify-between border-b border-slate-200/70 pb-3">
                      <span className="font-mono text-xs font-semibold tabular-nums text-[#9A7B4F]">
                        0{idx + 1}
                      </span>
                      <Icon
                        className="h-4 w-4 text-[#0B1F3A]"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="mt-4 font-serif-display text-lg font-semibold text-[#0B1F3A]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {item.detail}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
