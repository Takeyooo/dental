import { useState, type ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CalendarCheck2, Menu, Phone, X } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface LayoutProps {
  children: ReactNode;
}

const NAV_ITEMS = [
  { to: '/', label: 'Overview', end: true },
  { to: '/services', label: 'Treatments', end: false },
  { to: '/doctor', label: 'Dr. Rohim', end: false },
  { to: '/location', label: 'Chamber', end: false },
];

export function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-porcelain-canvas text-slate-900 pb-14 md:pb-0">
      <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="font-serif-display text-xl font-semibold tracking-tight text-[#0B1F3A] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1F3A] focus-visible:ring-offset-2 rounded-sm"
          >
            {CLINIC_INFO.brandName}
          </Link>

          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium"
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `relative py-1.5 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1F3A] rounded-sm ${
                    isActive
                      ? 'text-[#0B1F3A] font-semibold after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:rounded-full after:bg-[#9A7B4F]'
                      : 'text-slate-600 hover:text-[#0B1F3A] hover:underline hover:underline-offset-8 hover:decoration-slate-300'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-[#0B1F3A] px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-xs transition-colors duration-150 hover:bg-[#14325C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1F3A] focus-visible:ring-offset-2 whitespace-nowrap shrink-0"
            >
              Book Visit
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="inline-flex md:hidden min-h-[40px] min-w-[40px] items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1F3A] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="border-t border-slate-200 bg-white px-4 py-3 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `min-h-[44px] flex items-center justify-between rounded-lg px-3 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#0B1F3A]/8 text-[#0B1F3A] font-semibold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`
                  }
                >
                  <span>{item.label}</span>
                </NavLink>
              ))}
              <NavLink
                to="/book"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `min-h-[44px] flex items-center justify-between rounded-lg px-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#0B1F3A]/8 text-[#0B1F3A] font-semibold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`
                }
              >
                <span>WhatsApp Booking</span>
              </NavLink>
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-sapphire-hero border-t border-[#9A7B4F]/30 text-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="font-serif-display text-xl font-semibold text-white">
                {CLINIC_INFO.brandName}{' '}
                <span className="text-base font-normal text-slate-300">
                  ({CLINIC_INFO.brandNameBn})
                </span>
              </p>
              <p className="mt-2 text-sm text-[#DFC191]">
                {CLINIC_INFO.tagline}
              </p>
              <p className="mt-4 text-xs leading-relaxed text-slate-300/90">
                {CLINIC_INFO.doctorName} · {CLINIC_INFO.doctorRole}
                <br />
                {CLINIC_INFO.doctorDegreeSummary} · BMDC Reg. No.{' '}
                <span className="font-mono tabular-nums text-white">
                  {CLINIC_INFO.bmdcReg}
                </span>
              </p>
            </div>

            <div className="md:col-span-3">
              <p className="text-xs font-semibold tracking-wide text-[#DFC191]">
                Clinic Pages
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link to="/" className="text-slate-300 transition-colors hover:text-white">
                    Overview
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-slate-300 transition-colors hover:text-white">
                    All 13 Treatments
                  </Link>
                </li>
                <li>
                  <Link to="/doctor" className="text-slate-300 transition-colors hover:text-white">
                    Dr. Abdur Rohim
                  </Link>
                </li>
                <li>
                  <Link to="/book" className="text-slate-300 transition-colors hover:text-white">
                    WhatsApp Appointment
                  </Link>
                </li>
                <li>
                  <Link to="/location" className="text-slate-300 transition-colors hover:text-white">
                    Chamber &amp; Hours
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <p className="text-xs font-semibold tracking-wide text-[#DFC191]">
                Chamber &amp; Serial Desk
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {CLINIC_INFO.address}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <a
                  href={`tel:+88${CLINIC_INFO.secondaryPhoneDigits}`}
                  className="font-mono text-sm font-semibold tabular-nums text-white hover:underline"
                >
                  {CLINIC_INFO.secondaryPhoneDisplay}
                </a>
                <span aria-hidden="true" className="text-slate-500">
                  ·
                </span>
                <a
                  href={`tel:+88${CLINIC_INFO.phoneDisplay}`}
                  className="font-mono text-sm font-semibold tabular-nums text-white hover:underline"
                >
                  {CLINIC_INFO.phoneDashed}
                </a>
                <span aria-hidden="true" className="text-slate-500">
                  ·
                </span>
                <Link
                  to="/book"
                  className="text-sm font-semibold text-[#DFC191] hover:text-white"
                >
                  Book via WhatsApp
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-xs text-slate-400">
            {CLINIC_INFO.brandName} · Siddhirganj, Narayanganj · Direct
            patient appointment scheduling via WhatsApp.
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur-md md:hidden">
        <div className="grid grid-cols-2 divide-x divide-slate-200">
          <a
            href={`tel:+88${CLINIC_INFO.phoneDisplay}`}
            className="flex min-h-[48px] items-center justify-center gap-2 text-xs font-semibold text-[#0B1F3A] tabular-nums"
          >
            <Phone className="h-4 w-4 text-[#9A7B4F]" aria-hidden="true" />
            <span>Call {CLINIC_INFO.phoneDisplay}</span>
          </a>
          <Link
            to="/book"
            className="flex min-h-[48px] items-center justify-center gap-2 bg-[#0B1F3A] text-xs font-semibold text-white"
          >
            <CalendarCheck2 className="h-4 w-4 text-[#DFC191]" aria-hidden="true" />
            <span>WhatsApp Book</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
