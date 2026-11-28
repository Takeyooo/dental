export type TreatmentCategory =
  | 'all'
  | 'general'
  | 'restorative'
  | 'aesthetic';

export interface TreatmentItem {
  id: string;
  number: string;
  name: string;
  bengaliName?: string;
  category: Exclude<TreatmentCategory, 'all'>;
  categoryLabel: string;
  description: string;
  clinicalNote: string;
  keywords: string[];
}

export interface TimeSlot {
  id: string;
  label: string;
  hours: string;
}

export const CLINIC_INFO = {
  brandName: 'Dental Indoor',
  brandNameBn: 'ডেন্টাল ইনডোর',
  tagline: 'Implant, Orthodontic and Aesthetics Care',
  doctorName: 'Dr. Abdur Rohim',
  doctorNameBn: 'ডাঃ আব্দুর রহিম',
  doctorRole: 'Specialized Oral & Dental Surgeon',
  doctorRoleBn: 'মুখ ও দন্তরোগ বিশেষজ্ঞ এবং সার্জন',
  doctorDegreeSummary: 'BDS (DU), PGT (Dhaka Dental College)',
  bmdcReg: '15191',
  bmdcRegBn: '১৫১৯১',
  phoneDisplay: '01750643086',
  phoneFormatted: '+880 1750-643086',
  phoneDashed: '01750-643086',
  secondaryPhoneDisplay: '01836-032685',
  secondaryPhoneDigits: '01836032685',
  whatsappDigits: '8801750643086',
  address: 'Signboard, Sahebpara Bazar, Canalpar, Siddhirganj, Narayanganj',
  addressBn: 'সাইনবোর্ড, সাহেবপাড়া বাজার, ক্যানেলপাড়, সিদ্ধিরগঞ্জ, নারায়ণগঞ্জ।',
  signboardImage: '/assets/aistudio/image_20afa0f8.png',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Signboard+Sahebpara+Bazar+Canalpar+Siddhirganj+Narayanganj',
};

export const DOCTOR_CREDENTIALS = [
  {
    title: 'BDS (DU)',
    titleBn: 'বি.ডি.এস (ঢাকা বিশ্ববিদ্যালয়)',
    detail: 'Bachelor of Dental Surgery, University of Dhaka',
  },
  {
    title: 'PGT (Oral & Maxillofacial Surgery)',
    titleBn: 'পিজিটি (ওরাল এন্ড ম্যাক্সিলোফেসিয়াল সার্জারি)',
    detail: 'Post-Graduate Training in Oral & Maxillofacial Surgical Care',
  },
  {
    title: 'PGT (Conservative Dentistry & Endodontics)',
    titleBn: 'পিজিটি (কনজারভেটিভ ডেন্টিস্ট্রি ও এন্ডোডন্টিক্স)',
    detail: 'Post-Graduate Training in Endodontics & Tooth Preservation',
  },
  {
    title: 'PGT (Dhaka Dental College & Hospital)',
    titleBn: 'পিজিটি (ঢাকা ডেন্টাল কলেজ ও হাসপাতাল)',
    detail: 'Post-Graduate Clinical Residency & Hospital Training',
  },
  {
    title: 'Advanced Training on Endo, Perio & Prosthodontics',
    titleBn: 'এডভান্সড ট্রেনিং অন এন্ডো, পেরিও এন্ড প্রস্থোডন্টিক্স',
    detail: 'Root Canal Therapy, Gum Care, Crowns, Bridges & Dentures',
  },
  {
    title: 'Special Trained in Aesthetics',
    titleBn: 'এস্থেটিক ডেন্টিস্ট্রিতে বিশেষ প্রশিক্ষণপ্রাপ্ত',
    detail: 'Veneers, Diastema Closure, Smile Design & Teeth Whitening',
  },
];

export const TREATMENT_CATEGORIES: { id: TreatmentCategory; label: string }[] = [
  { id: 'all', label: 'All Treatments (13)' },
  { id: 'general', label: 'General & Surgical' },
  { id: 'restorative', label: 'Implants & Restorative' },
  { id: 'aesthetic', label: 'Orthodontics & Aesthetics' },
];

export const TREATMENTS: TreatmentItem[] = [
  {
    id: 'general-dentistry',
    number: '01',
    name: 'General Dentistry',
    bengaliName: 'সাধারণ দন্ত চিকিৎসা',
    category: 'general',
    categoryLabel: 'General Care',
    description:
      'Comprehensive oral examination, diagnostic check-up, scaling, and routine dental consultations for adults and children.',
    clinicalNote: 'Ideal starting visit for diagnosis and treatment planning.',
    keywords: ['checkup', 'check-up', 'consultation', 'scaling', 'cleaning', 'wash', 'pain', 'দাঁত পরিষ্কার', 'চেকআপ'],
  },
  {
    id: 'dental-filling',
    number: '02',
    name: 'Dental Filling',
    bengaliName: 'দাঁতের ফিলিং',
    category: 'general',
    categoryLabel: 'General Care',
    description:
      'Tooth-colored composite restorations to treat cavities and repair chipped or worn enamel naturally.',
    clinicalNote: 'Shade-matched composite blended seamlessly with natural enamel.',
    keywords: ['filling', 'cavity', 'hole', 'composite', 'broken tooth', 'ফিলিং', 'পোকা'],
  },
  {
    id: 'rct',
    number: '03',
    name: 'RCT (Root Canal Treatment)',
    category: 'restorative',
    categoryLabel: 'Endodontics',
    description:
      'Pain-relieving endodontic therapy to remove deep nerve infection and save natural teeth without extraction.',
    clinicalNote: 'Performed under local anesthesia with precision canal sealing.',
    keywords: ['rct', 'root canal', 'nerve', 'toothache', 'pain', 'endo', 'রুট ক্যানেল', 'ব্যথা'],
  },
  {
    id: 'extraction',
    number: '04',
    name: 'Extraction',
    bengaliName: 'দাঁত তোলা',
    category: 'general',
    categoryLabel: 'Oral Surgery',
    description:
      'Safe, gentle tooth removal including impacted wisdom teeth and surgical extractions under local anesthesia.',
    clinicalNote: 'Atraumatic surgical protocol with post-care guidance.',
    keywords: ['extract', 'remove', 'tooth removal', 'wisdom', 'surgery', 'আক্কেল দাঁত', 'দাঁত তোলা'],
  },
  {
    id: 'dental-implant',
    number: '05',
    name: 'Dental Implant',
    category: 'restorative',
    categoryLabel: 'Implantology',
    description:
      'Permanent titanium root replacements topped with natural-looking crowns to restore missing teeth.',
    clinicalNote: 'Long-term fixed replacement preserving jawbone structure.',
    keywords: ['implant', 'missing tooth', 'titanium', 'screw', 'fixed tooth', 'ইমপ্ল্যান্ট'],
  },
  {
    id: 'crown-bridge',
    number: '06',
    name: 'Crown & Bridge',
    category: 'restorative',
    categoryLabel: 'Prosthodontics',
    description:
      'Custom porcelain, zirconia, and ceramic caps or fixed bridges to protect weak teeth and replace gaps.',
    clinicalNote: 'High-strength zirconia and ceramic prosthetics tailored to bite.',
    keywords: ['cap', 'crown', 'bridge', 'zirconia', 'ceramic', 'porcelain', 'ক্যাপ', 'ব্রিজ'],
  },
  {
    id: 'veneer',
    number: '07',
    name: 'Veneer',
    bengaliName: 'কম্পোজিট ও জিরকোনিয়া',
    category: 'aesthetic',
    categoryLabel: 'Aesthetics',
    description:
      'Ultra-thin composite or zirconia shells bonded to front teeth for balanced shape, shade, and symmetry.',
    clinicalNote: 'Minimal-prep cosmetic sculpting for natural smile proportion.',
    keywords: ['veneer', 'composite', 'zirconia', 'smile', 'front teeth', 'ভিনিয়ার'],
  },
  {
    id: 'orthodontic-treatment',
    number: '08',
    name: 'Orthodontic Treatment',
    bengaliName: 'ব্রেসেস',
    category: 'aesthetic',
    categoryLabel: 'Orthodontics',
    description:
      'Structured braces and bite alignment programs to straighten crowded teeth and correct jaw spacing.',
    clinicalNote: 'Scheduled monthly adjustments mapped to clear alignment milestones.',
    keywords: ['braces', 'orthodontic', 'clip', 'align', 'straighten', 'crooked', 'ব্রেসেস', 'আঁকাবাঁকা'],
  },
  {
    id: 'teeth-whitening',
    number: '09',
    name: 'Teeth Whitening',
    bengaliName: 'দাঁত সাদা করা',
    category: 'aesthetic',
    categoryLabel: 'Aesthetics',
    description:
      'Safe clinical stain removal and shade brightening for discolored or coffee-stained teeth.',
    clinicalNote: 'Enamel-safe clinical brightening with sensitivity control.',
    keywords: ['whitening', 'bleaching', 'white', 'stain', 'yellow', 'bright', 'দাঁত সাদা'],
  },
  {
    id: 'diastema-closure',
    number: '10',
    name: 'Diastema Closure',
    bengaliName: 'দাঁতের ফাঁক বন্ধ',
    category: 'aesthetic',
    categoryLabel: 'Aesthetics',
    description:
      'Precision aesthetic bonding or orthodontic closure for noticeable gaps between front teeth.',
    clinicalNote: 'Non-invasive composite sculpting often completed in a single visit.',
    keywords: ['gap', 'diastema', 'space', 'front gap', 'ফাঁক', 'ফাঁকা দাঁত'],
  },
  {
    id: 'cosmetic-dentistry',
    number: '11',
    name: 'Cosmetic Dentistry',
    bengaliName: 'সৌন্দর্যবর্ধন',
    category: 'aesthetic',
    categoryLabel: 'Aesthetics',
    description:
      'Tailored smile enhancement combining contouring, enamel polishing, and shade correction.',
    clinicalNote: 'Personalized smile proportion evaluation before treatment.',
    keywords: ['cosmetic', 'smile design', 'polish', 'contour', 'aesthetic', 'সৌন্দর্য'],
  },
  {
    id: 'complete-denture',
    number: '12',
    name: 'Complete Denture',
    bengaliName: 'কৃত্রিম দাঁত',
    category: 'restorative',
    categoryLabel: 'Prosthodontics',
    description:
      'Comfortable, well-fitted full or partial removable dentures designed for natural chewing and speech.',
    clinicalNote: 'Custom impression fitting for comfortable daily wear.',
    keywords: ['denture', 'false teeth', 'artificial', 'removable', 'set', 'কৃত্রিম দাঁত', 'বাঁধানো দাঁত'],
  },
  {
    id: 'preventive-restorative',
    number: '13',
    name: 'Preventive & Restorative Care',
    category: 'general',
    categoryLabel: 'Preventive Care',
    description:
      'Gum health maintenance, plaque control, and structural repair to prevent long-term tooth loss.',
    clinicalNote: 'Recommended every 6 months for lifelong periodontal health.',
    keywords: ['gum', 'bleeding', 'plaque', 'tartar', 'scaling', 'perio', 'মাড়ি'],
  },
];

export const TIME_SLOTS: TimeSlot[] = [
  { id: 'morning', label: 'Morning', hours: '10:00 AM – 1:00 PM' },
  { id: 'afternoon', label: 'Afternoon', hours: '4:00 PM – 6:30 PM' },
  { id: 'evening', label: 'Evening', hours: '6:30 PM – 9:30 PM' },
];

export interface AppointmentPayload {
  patientName: string;
  phone: string;
  treatment: string;
  preferredDate: string;
  timeSlot: string;
  visitType: 'New Patient' | 'Follow-up Visit';
  notes: string;
}

export function getOffsetIsoDate(daysOffset: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDisplayDate(isoDate: string): string {
  if (!isoDate) return '';
  const parts = isoDate.split('-');
  if (parts.length !== 3) return isoDate;
  const date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function buildWhatsAppMessage(payload: AppointmentPayload): string {
  const lines = [
    `Assalamu Alaikum, I would like to request a dental appointment at ${CLINIC_INFO.brandName} (${CLINIC_INFO.doctorName}).`,
    '',
    `Patient Name: ${payload.patientName.trim()}`,
    `Mobile Number: ${payload.phone.trim()}`,
    `Visit Type: ${payload.visitType}`,
    `Treatment: ${payload.treatment}`,
    `Preferred Date: ${formatDisplayDate(payload.preferredDate)}`,
    `Preferred Time: ${payload.timeSlot}`,
  ];

  if (payload.notes.trim()) {
    lines.push(`Symptoms / Note: ${payload.notes.trim()}`);
  }

  lines.push('', 'Please confirm my serial and visiting time. Thank you.');
  return lines.join('\n');
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${CLINIC_INFO.whatsappDigits}?text=${encodeURIComponent(message)}`;
}
