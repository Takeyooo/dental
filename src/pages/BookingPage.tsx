import { useEffect, useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Check,
  Copy,
  ExternalLink,
  MessageSquare,
  Phone,
  RotateCcw,
} from 'lucide-react';
import {
  CLINIC_INFO,
  TIME_SLOTS,
  TREATMENTS,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  formatDisplayDate,
  getOffsetIsoDate,
  type AppointmentPayload,
} from '../data/clinicData';

const TREATMENT_OPTIONS = [
  'General Consultation / Check-up',
  ...TREATMENTS.map((t) =>
    t.bengaliName ? `${t.name} (${t.bengaliName})` : t.name
  ),
];

const QUICK_DATES = [
  { label: 'Tomorrow', offset: 1 },
  { label: 'In 2 Days', offset: 2 },
  { label: 'In 3 Days', offset: 3 },
];

const QUICK_NOTES = [
  'Tooth pain / দাঁতে ব্যথা',
  'Scaling & check-up',
  'Braces consultation',
  'Missing tooth / Implant inquiry',
];

export function BookingPage() {
  const [searchParams] = useSearchParams();
  const initialTreatmentParam = searchParams.get('treatment') ?? '';

  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [treatment, setTreatment] = useState(() =>
    TREATMENT_OPTIONS.includes(initialTreatmentParam)
      ? initialTreatmentParam
      : TREATMENT_OPTIONS[0]
  );
  const [preferredDate, setPreferredDate] = useState(() => getOffsetIsoDate(1));
  const [timeSlot, setTimeSlot] = useState(
    `${TIME_SLOTS[0].label} (${TIME_SLOTS[0].hours})`
  );
  const [visitType, setVisitType] = useState<'New Patient' | 'Follow-up Visit'>(
    'New Patient'
  );
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{
    patientName?: string;
    phone?: string;
    preferredDate?: string;
  }>({});
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (
      initialTreatmentParam &&
      TREATMENT_OPTIONS.includes(initialTreatmentParam)
    ) {
      setTreatment(initialTreatmentParam);
      setSubmittedMessage(null);
    }
  }, [initialTreatmentParam]);

  const currentPayload: AppointmentPayload = {
    patientName: patientName || '[Patient Full Name]',
    phone: phone || '[017XXXXXXXX]',
    treatment,
    preferredDate,
    timeSlot,
    visitType,
    notes,
  };

  const livePreviewMessage = buildWhatsAppMessage(currentPayload);

  const validate = (): boolean => {
    const nextErrors: {
      patientName?: string;
      phone?: string;
      preferredDate?: string;
    } = {};

    if (patientName.trim().length < 2) {
      nextErrors.patientName = 'Please enter the patient full name.';
    }

    const cleanedPhone = phone.replace(/[\s-]/g, '');
    const bdPhoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
    if (!bdPhoneRegex.test(cleanedPhone)) {
      nextErrors.phone =
        'Enter a valid 11-digit Bangladesh mobile number (e.g. 017XXXXXXXX).';
    }

    const todayIso = getOffsetIsoDate(0);
    if (!preferredDate) {
      nextErrors.preferredDate = 'Please select a preferred visit date.';
    } else if (preferredDate < todayIso) {
      nextErrors.preferredDate = 'Please select today or an upcoming date.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const finalMessage = buildWhatsAppMessage({
      patientName,
      phone,
      treatment,
      preferredDate,
      timeSlot,
      visitType,
      notes,
    });
    setSubmittedMessage(finalMessage);
    setCopied(false);
  };

  const handleCopy = async () => {
    const textToCopy = submittedMessage ?? livePreviewMessage;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleEdit = () => {
    setSubmittedMessage(null);
    setCopied(false);
  };

  const handleClearForm = () => {
    setPatientName('');
    setPhone('');
    setTreatment(TREATMENT_OPTIONS[0]);
    setPreferredDate(getOffsetIsoDate(1));
    setTimeSlot(`${TIME_SLOTS[0].label} (${TIME_SLOTS[0].hours})`);
    setVisitType('New Patient');
    setNotes('');
    setErrors({});
    setSubmittedMessage(null);
    setCopied(false);
  };

  const handleQuickNote = (preset: string) => {
    setNotes((prev) => {
      const trimmed = prev.trim();
      if (!trimmed) return preset;
      if (trimmed.includes(preset)) return prev;
      return `${trimmed}, ${preset}`;
    });
  };

  const whatsappUrl = buildWhatsAppUrl(submittedMessage ?? livePreviewMessage);
  const hasNameAndPhone =
    patientName.trim().length >= 2 && phone.trim().length >= 11;

  return (
    <>
      <section className="bg-page-banner-light border-b border-slate-200/80 py-10 sm:py-14">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#7C5E34]">
              WhatsApp Appointment Desk
            </p>
            <h1 className="mt-2 font-serif-display text-3xl font-semibold tracking-tight text-[#0B1F3A] sm:text-4xl text-balance">
              Schedule your visit directly via WhatsApp
            </h1>
            <p className="mt-3 text-base text-slate-600">
              No account or database needed—complete your details below and send
              the formatted request directly to{' '}
              <span className="font-mono font-semibold tabular-nums text-[#0B1F3A]">
                {CLINIC_INFO.phoneDisplay}
              </span>
              .
            </p>
          </div>

          <Link
            to="/services"
            className="text-sm font-semibold text-[#0B1F3A] hover:text-[#7C5E34] hover:underline whitespace-nowrap shrink-0"
          >
            Browse all 13 treatments
          </Link>
        </div>
      </section>

      <section className="bg-porcelain-canvas py-10 sm:py-14">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-6xl px-4 sm:px-6"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            <div className="card-elevated rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 lg:col-span-7">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4 text-xs">
                <span className="font-semibold text-[#0B1F3A]">
                  01. Patient Details
                </span>
                <span aria-hidden="true" className="text-slate-300">
                  ·
                </span>
                <span className="font-semibold text-[#0B1F3A]">
                  02. Treatment &amp; Session
                </span>
                <span aria-hidden="true" className="text-slate-300">
                  ·
                </span>
                <span
                  className={
                    submittedMessage
                      ? 'font-semibold text-emerald-700'
                      : hasNameAndPhone
                        ? 'font-semibold text-[#7C5E34]'
                        : 'text-slate-500'
                  }
                >
                  03. {submittedMessage ? 'Ready to Send' : 'WhatsApp Dispatch'}
                </span>
              </div>

              {submittedMessage ? (
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-semibold text-emerald-700">
                      Appointment Slip Prepared
                    </p>
                    <h2 className="mt-1 font-serif-display text-2xl font-semibold text-[#0B1F3A]">
                      Ready to send to {CLINIC_INFO.brandName}
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                      Tap the WhatsApp button below to open your chat with{' '}
                      <span className="font-mono font-semibold tabular-nums text-slate-900">
                        {CLINIC_INFO.phoneDisplay}
                      </span>{' '}
                      and confirm your serial.
                    </p>
                  </div>

                  <pre className="whitespace-pre-wrap rounded-xl border border-slate-200 bg-[#F8F7F4] p-5 font-sans-ui text-sm leading-relaxed text-slate-800">
                    {submittedMessage}
                  </pre>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[46px] items-center gap-2 rounded-lg bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
                    >
                      <MessageSquare className="h-4 w-4" aria-hidden="true" />
                      <span>Open WhatsApp &amp; Send</span>
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>

                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex min-h-[46px] items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 whitespace-nowrap cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check
                            className="h-4 w-4 text-emerald-700"
                            aria-hidden="true"
                          />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" aria-hidden="true" />
                          <span>Copy Message</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleEdit}
                      className="inline-flex min-h-[46px] items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 whitespace-nowrap cursor-pointer"
                    >
                      <RotateCcw className="h-4 w-4" aria-hidden="true" />
                      <span>Edit Details</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="patient-name"
                        className="block text-sm font-medium text-slate-800"
                      >
                        Patient Full Name
                      </label>
                      <input
                        id="patient-name"
                        type="text"
                        value={patientName}
                        onChange={(e) => {
                          setPatientName(e.target.value);
                          if (errors.patientName) {
                            setErrors((prev) => ({
                              ...prev,
                              patientName: undefined,
                            }));
                          }
                        }}
                        placeholder="e.g. Md. Rafiqul Islam"
                        aria-invalid={Boolean(errors.patientName)}
                        aria-describedby={
                          errors.patientName ? 'patient-name-error' : undefined
                        }
                        className="mt-1.5 w-full min-h-[44px] rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#9A7B4F] focus:outline-none focus:ring-2 focus:ring-[#9A7B4F]/20"
                      />
                      {errors.patientName && (
                        <p
                          id="patient-name-error"
                          role="alert"
                          className="mt-1.5 text-xs font-medium text-red-700"
                        >
                          {errors.patientName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="patient-phone"
                        className="block text-sm font-medium text-slate-800"
                      >
                        Mobile Number
                      </label>
                      <input
                        id="patient-phone"
                        type="tel"
                        inputMode="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) {
                            setErrors((prev) => ({ ...prev, phone: undefined }));
                          }
                        }}
                        placeholder="017XXXXXXXX"
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={
                          errors.phone ? 'patient-phone-error' : undefined
                        }
                        className="mt-1.5 w-full min-h-[44px] rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 font-mono text-sm tabular-nums text-slate-900 placeholder:text-slate-400 focus:border-[#9A7B4F] focus:outline-none focus:ring-2 focus:ring-[#9A7B4F]/20"
                      />
                      {errors.phone && (
                        <p
                          id="patient-phone-error"
                          role="alert"
                          className="mt-1.5 text-xs font-medium text-red-700"
                        >
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="treatment-select"
                      className="block text-sm font-medium text-slate-800"
                    >
                      Treatment / Service Needed
                    </label>
                    <select
                      id="treatment-select"
                      value={treatment}
                      onChange={(e) => setTreatment(e.target.value)}
                      className="mt-1.5 w-full min-h-[44px] rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#9A7B4F] focus:outline-none focus:ring-2 focus:ring-[#9A7B4F]/20"
                    >
                      {TREATMENT_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="preferred-date"
                        className="block text-sm font-medium text-slate-800"
                      >
                        Preferred Date
                      </label>
                      <input
                        id="preferred-date"
                        type="date"
                        min={getOffsetIsoDate(0)}
                        value={preferredDate}
                        onChange={(e) => {
                          setPreferredDate(e.target.value);
                          if (errors.preferredDate) {
                            setErrors((prev) => ({
                              ...prev,
                              preferredDate: undefined,
                            }));
                          }
                        }}
                        aria-invalid={Boolean(errors.preferredDate)}
                        aria-describedby={
                          errors.preferredDate ? 'preferred-date-error' : undefined
                        }
                        className="mt-1.5 w-full min-h-[44px] rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 font-mono text-sm tabular-nums text-slate-900 focus:border-[#9A7B4F] focus:outline-none focus:ring-2 focus:ring-[#9A7B4F]/20"
                      />
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {QUICK_DATES.map((qd) => {
                          const targetIso = getOffsetIsoDate(qd.offset);
                          const active = preferredDate === targetIso;
                          return (
                            <button
                              key={qd.label}
                              type="button"
                              onClick={() => setPreferredDate(targetIso)}
                              className={`min-h-[32px] rounded-md border px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                                active
                                  ? 'border-[#0B1F3A] bg-[#0B1F3A] text-white'
                                  : 'border-slate-200 bg-[#F8F7F4] text-slate-600 hover:bg-slate-100'
                              }`}
                            >
                              {qd.label}
                            </button>
                          );
                        })}
                      </div>
                      {errors.preferredDate && (
                        <p
                          id="preferred-date-error"
                          role="alert"
                          className="mt-1.5 text-xs font-medium text-red-700"
                        >
                          {errors.preferredDate}
                        </p>
                      )}
                    </div>

                    <div>
                      <span className="block text-sm font-medium text-slate-800">
                        Visit Type
                      </span>
                      <div className="mt-1.5 grid grid-cols-2 gap-2 rounded-lg border border-slate-200 bg-[#F8F7F4] p-1">
                        {(['New Patient', 'Follow-up Visit'] as const).map(
                          (type) => {
                            const active = visitType === type;
                            return (
                              <button
                                key={type}
                                type="button"
                                onClick={() => setVisitType(type)}
                                aria-pressed={active}
                                className={`min-h-[36px] rounded-md px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                                  active
                                    ? 'bg-white text-[#0B1F3A] font-semibold shadow-xs'
                                    : 'text-slate-600 hover:text-slate-900'
                                }`}
                              >
                                {type}
                              </button>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="block text-sm font-medium text-slate-800">
                      Preferred Visiting Session
                    </span>
                    <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                      {TIME_SLOTS.map((slot) => {
                        const fullValue = `${slot.label} (${slot.hours})`;
                        const isSelected = timeSlot === fullValue;
                        return (
                          <button
                            key={slot.id}
                            type="button"
                            onClick={() => setTimeSlot(fullValue)}
                            aria-pressed={isSelected}
                            className={`min-h-[48px] rounded-lg border px-3 py-2 text-left transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1F3A] ${
                              isSelected
                                ? 'border-[#0B1F3A] bg-[#0B1F3A] text-white'
                                : 'border-slate-200 bg-[#F8F7F4] text-slate-800 hover:border-slate-300 hover:bg-slate-100'
                            }`}
                          >
                            <span className="block text-sm font-semibold whitespace-nowrap">
                              {slot.label}
                            </span>
                            <span
                              className={`mt-0.5 block text-xs tabular-nums whitespace-nowrap ${
                                isSelected ? 'text-[#DFC191]' : 'text-slate-500'
                              }`}
                            >
                              {slot.hours}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="visit-notes"
                      className="block text-sm font-medium text-slate-800"
                    >
                      Symptoms or Note (Optional)
                    </label>
                    <textarea
                      id="visit-notes"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Briefly describe tooth pain, swelling, braces inquiry, or any question..."
                      className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#9A7B4F] focus:outline-none focus:ring-2 focus:ring-[#9A7B4F]/20"
                    />
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {QUICK_NOTES.map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => handleQuickNote(preset)}
                          className="min-h-[30px] rounded-md border border-slate-200 bg-[#F8F7F4] px-2.5 py-1 text-xs text-slate-600 transition-colors hover:border-[#9A7B4F] hover:text-[#0B1F3A] whitespace-nowrap cursor-pointer"
                        >
                          + {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="submit"
                        className="inline-flex min-h-[46px] items-center gap-2 rounded-lg bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
                      >
                        <MessageSquare className="h-4 w-4" aria-hidden="true" />
                        <span>Prepare WhatsApp Appointment</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleClearForm}
                        className="inline-flex min-h-[46px] items-center rounded-lg px-3.5 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-800 whitespace-nowrap cursor-pointer"
                      >
                        Reset
                      </button>
                    </div>

                    <a
                      href={`tel:+88${CLINIC_INFO.phoneDisplay}`}
                      className="inline-flex min-h-[40px] items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-[#0B1F3A] whitespace-nowrap tabular-nums"
                    >
                      <Phone
                        className="h-4 w-4 text-[#9A7B4F]"
                        aria-hidden="true"
                      />
                      <span>Call {CLINIC_INFO.phoneDisplay}</span>
                    </a>
                  </div>
                </form>
              )}
            </div>

            <aside className="bg-sapphire-hero card-gallery relative overflow-hidden rounded-2xl border border-[#9A7B4F]/35 p-6 text-white lg:col-span-5">
              <div
                aria-hidden="true"
                className="bg-fine-grid pointer-events-none absolute inset-0 opacity-60"
              />
              <div className="relative">
                <div className="flex items-center justify-between gap-2 border-b border-white/15 pb-4">
                  <div>
                    <h2 className="font-serif-display text-lg font-semibold text-white">
                      Clinic Reservation Slip
                    </h2>
                    <p className="mt-0.5 text-xs text-slate-300">
                      {CLINIC_INFO.brandName} ·{' '}
                      <span className="font-mono tabular-nums text-[#DFC191]">
                        {CLINIC_INFO.phoneFormatted}
                      </span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex min-h-[36px] items-center gap-1.5 rounded-md border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/15 cursor-pointer whitespace-nowrap"
                  >
                    {copied ? (
                      <>
                        <Check
                          className="h-3.5 w-3.5 text-emerald-400"
                          aria-hidden="true"
                        />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-4 space-y-2 border-b border-white/15 pb-4 text-xs text-slate-300">
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-400">Selected Date</span>
                    <span className="font-medium text-white tabular-nums">
                      {formatDisplayDate(preferredDate) || 'Not set'}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-400">Session</span>
                    <span className="font-medium text-white">{timeSlot}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-400">Treatment</span>
                    <span className="max-w-[60%] truncate text-right font-medium text-[#DFC191]">
                      {treatment}
                    </span>
                  </div>
                </div>

                <pre className="mt-4 whitespace-pre-wrap rounded-xl border border-white/10 bg-white/95 p-4 font-sans-ui text-xs sm:text-sm leading-relaxed text-slate-800">
                  {submittedMessage ?? livePreviewMessage}
                </pre>
              </div>
            </aside>
          </div>
        </motion.div>
      </section>
    </>
  );
}
