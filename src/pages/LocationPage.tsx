import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  CalendarCheck2,
  Clock,
  ExternalLink,
  MapPin,
  MessageSquare,
  Navigation,
  Phone,
} from 'lucide-react';
import { CLINIC_INFO, TIME_SLOTS, buildWhatsAppUrl } from '../data/clinicData';

export function LocationPage() {
  const quickChatUrl = buildWhatsAppUrl(
    `Assalamu Alaikum, I would like directions or visiting hour details for ${CLINIC_INFO.brandName} (${CLINIC_INFO.doctorName}).`
  );

  return (
    <>
      <section className="bg-page-banner-light border-b border-slate-200/80 py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-sm font-semibold text-[#7C5E34]">
            Chamber &amp; Visiting Hours
          </p>
          <h1 className="mt-2 font-serif-display text-3xl font-semibold tracking-tight text-[#0B1F3A] sm:text-4xl text-balance">
            Visit {CLINIC_INFO.brandName} in Siddhirganj, Narayanganj
          </h1>
          <p className="mt-3 max-w-2xl text-base text-slate-600">
            Located at Signboard, Sahebpara Bazar, Canalpar. Confirm your serial
            via WhatsApp or phone call before visiting to minimize waiting time.
          </p>
        </div>
      </section>

      <section className="bg-porcelain-canvas py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-6xl px-4 sm:px-6"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            <div className="card-elevated bg-silk-surface rounded-2xl border border-slate-200/90 p-6 sm:p-8 lg:col-span-7">
              <div className="divide-y divide-slate-200/80">
                <div className="flex items-start gap-4 pb-6">
                  <MapPin
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#9A7B4F]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Full Chamber Address
                    </p>
                    <p className="mt-1 font-serif-display text-lg font-semibold text-[#0B1F3A]">
                      {CLINIC_INFO.address}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                      <Navigation
                        className="h-3.5 w-3.5 text-[#9A7B4F]"
                        aria-hidden="true"
                      />
                      <span>Signboard Intersection</span>
                      <span aria-hidden="true">·</span>
                      <span>Sahebpara Bazar</span>
                      <span aria-hidden="true">·</span>
                      <span>Canalpar, Siddhirganj</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 py-6">
                  <Phone
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#9A7B4F]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Direct Phone &amp; WhatsApp Serial Numbers
                    </p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-4">
                      <a
                        href={`tel:+88${CLINIC_INFO.secondaryPhoneDigits}`}
                        className="font-mono text-lg sm:text-xl font-semibold tabular-nums text-[#0B1F3A] hover:underline"
                      >
                        {CLINIC_INFO.secondaryPhoneDisplay}
                      </a>
                      <span aria-hidden="true" className="text-slate-300">
                        ·
                      </span>
                      <a
                        href={`tel:+88${CLINIC_INFO.phoneDisplay}`}
                        className="font-mono text-lg sm:text-xl font-semibold tabular-nums text-[#0B1F3A] hover:underline"
                      >
                        {CLINIC_INFO.phoneDashed}
                      </a>
                    </div>
                    <p className="mt-1.5 text-xs text-slate-500">
                      WhatsApp Desk:{' '}
                      <span className="font-mono tabular-nums">
                        {CLINIC_INFO.phoneFormatted}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pt-6">
                  <Clock
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#9A7B4F]"
                    aria-hidden="true"
                  />
                  <div className="w-full">
                    <p className="text-xs font-medium text-slate-500">
                      Appointment Visiting Sessions
                    </p>
                    <div className="mt-3 divide-y divide-slate-200/80 rounded-xl border border-slate-200/90 bg-white">
                      {TIME_SLOTS.map((slot) => (
                        <div
                          key={slot.id}
                          className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
                        >
                          <span className="font-semibold text-[#0B1F3A]">
                            {slot.label}
                          </span>
                          <span className="font-mono text-xs sm:text-sm tabular-nums text-slate-600">
                            {slot.hours}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-5 lg:col-span-5">
              <div className="bg-sapphire-hero card-gallery relative overflow-hidden rounded-2xl border border-[#9A7B4F]/35 p-6 text-white sm:p-8">
                <div
                  aria-hidden="true"
                  className="bg-fine-grid pointer-events-none absolute inset-0 opacity-60"
                />
                <div className="relative">
                  <p className="text-xs font-semibold text-[#DFC191]">
                    Quick Actions
                  </p>
                  <h2 className="mt-2 font-serif-display text-2xl font-semibold text-white">
                    Need directions or a quick serial?
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    Open Google Maps for turn-by-turn navigation to Sahebpara
                    Bazar, or message the clinic desk directly on WhatsApp.
                  </p>

                  <div className="mt-6 flex flex-col gap-3">
                    <a
                      href={CLINIC_INFO.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#0B1F3A] transition-colors hover:bg-slate-100 whitespace-nowrap"
                    >
                      <MapPin
                        className="h-4 w-4 text-[#9A7B4F]"
                        aria-hidden="true"
                      />
                      <span>Open in Google Maps</span>
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>

                    <Link
                      to="/book"
                      className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-500 whitespace-nowrap"
                    >
                      <CalendarCheck2 className="h-4 w-4" aria-hidden="true" />
                      <span>Schedule Appointment</span>
                    </Link>

                    <a
                      href={quickChatUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/15 whitespace-nowrap"
                    >
                      <MessageSquare className="h-4 w-4" aria-hidden="true" />
                      <span>Ask on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
