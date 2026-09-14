import { CLINIC_INFO, SERVICES_DATA, FACILITIES_DATA } from './clinicData';

export interface SearchItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'Service' | 'Doctor' | 'Timings' | 'Contact' | 'Facilities' | 'Reviews';
  description: string;
  targetAnchor: string;
  keywords: string[];
  serviceTitleForBooking?: string;
  actionLabel?: string;
}

export const SEARCHABLE_DATABASE: SearchItem[] = [
  // 1. Services
  ...SERVICES_DATA.map((service): SearchItem => ({
    id: `search-service-${service.id}`,
    title: service.title,
    subtitle: `${service.duration} • Painless Tech`,
    category: 'Service',
    description: service.shortDesc,
    targetAnchor: '#services',
    serviceTitleForBooking: service.title,
    actionLabel: 'Book Treatment',
    keywords: [
      service.title.toLowerCase(),
      service.id.toLowerCase(),
      ...service.benefits.map((b) => b.toLowerCase()),
      service.shortDesc.toLowerCase(),
      service.fullDesc.toLowerCase(),
      // Extra domain synonyms
      ...(service.id === 'rct' ? ['rct', 'root canal', 'tooth ache', 'pain', 'nerve', 'abscess', 'single sitting'] : []),
      ...(service.id === 'crowns-bridges' ? ['cap', 'caps', 'bridges', 'crowns', 'zirconia', 'ceramic', 'broken tooth'] : []),
      ...(service.id === 'fillings' ? ['cavity', 'filling', 'hole in tooth', 'decay', 'composite', 'cement'] : []),
      ...(service.id === 'cleaning-polishing' ? ['cleaning', 'scaling', 'tartar', 'plaque', 'stains', 'yellow teeth', 'pyorrhea', 'gums'] : []),
      ...(service.id === 'whitening' ? ['bleaching', 'whitening', 'white teeth', 'bright smile', 'yellow'] : []),
      ...(service.id === 'braces' ? ['braces', 'aligners', 'invisalign', 'crooked teeth', 'gap', 'clips', 'teeth wire', 'ortho'] : []),
      ...(service.id === 'implants' ? ['implant', 'missing tooth', 'titanium', 'artificial tooth', 'fixed teeth'] : []),
      ...(service.id === 'wisdom-tooth' ? ['wisdom tooth', 'third molar', 'extraction', 'tooth removal', 'swelling', 'jaw pain'] : []),
      ...(service.id === 'kids-dentistry' ? ['pediatric', 'kids', 'child', 'children', 'milk tooth', 'cavities'] : []),
    ],
  })),

  // 2. Doctor Information
  {
    id: 'search-doctor-profile',
    title: `${CLINIC_INFO.doctorName} (${CLINIC_INFO.doctorTitle})`,
    subtitle: `${CLINIC_INFO.experience} • Painless Rotary Specialist`,
    category: 'Doctor',
    description: `Consult Dr. Rohan Gupta with 5 Years of clinical dental expertise at Bada Bazar, Rohtak. Specializing in single-sitting RCT, laser-assisted treatments, and aesthetic dentistry.`,
    targetAnchor: '#doctor',
    actionLabel: 'View Doctor Profile',
    keywords: [
      'dr rohan gupta',
      'doctor',
      'dentist',
      'surgeon',
      'experience',
      'qualifications',
      'degree',
      'bds',
      'laser',
      'rohan',
      'gupta',
      'consultant',
      'specialist',
    ],
  },

  // 3. Timings & Working Hours
  {
    id: 'search-clinic-timings',
    title: 'Clinic Timings & OPD Schedule',
    subtitle: 'Mon - Sat: 9:30 AM - 8:30 PM (Lunch: 1:30 - 4:30 PM)',
    category: 'Timings',
    description: `Morning session: 9:30 AM to 1:30 PM. Evening session: 4:30 PM to 8:30 PM. Sunday: 10:00 AM to 2:00 PM (Prior Appointment Only).`,
    targetAnchor: '#contact',
    actionLabel: 'View Timings',
    keywords: [
      'timing',
      'hours',
      'open',
      'close',
      'lunch',
      'lunch break',
      'opd',
      'schedule',
      'sunday',
      'morning',
      'evening',
      'working hours',
      'visiting hours',
      'time',
    ],
  },

  // 4. Location & Address
  {
    id: 'search-clinic-location',
    title: 'Clinic Address & Directions',
    subtitle: 'Bada Bazar, Near Main Chowk, Rohtak',
    category: 'Contact',
    description: `${CLINIC_INFO.fullAddress}. Easily accessible from Railway Road, Delhi Bypass, and Subhash Chowk with direct patient parking.`,
    targetAnchor: '#contact',
    actionLabel: 'View Map & Directions',
    keywords: [
      'location',
      'address',
      'bada bazar',
      'rohtak',
      'haryana',
      'pincode 124001',
      'near main chowk',
      'directions',
      'map',
      'google maps',
      'how to reach',
      'landmark',
      'route',
    ],
  },

  // 5. Direct Helpline & Call
  {
    id: 'search-clinic-phone',
    title: `Phone Helpline: ${CLINIC_INFO.phone}`,
    subtitle: 'Direct Calling & Emergency Queries',
    category: 'Contact',
    description: `Call our front desk and Dr. Rohan Gupta at ${CLINIC_INFO.phone} for immediate dental guidance, fee estimates, and same-day emergency appointments.`,
    targetAnchor: '#contact',
    actionLabel: 'Call Clinic',
    keywords: [
      'phone',
      'call',
      'number',
      'mobile',
      'telephone',
      'contact number',
      'helpline',
      'emergency phone',
      'reception',
      '7015479872',
      '917015479872',
    ],
  },

  // 6. WhatsApp Direct Consultation
  {
    id: 'search-clinic-whatsapp',
    title: 'WhatsApp Direct Consultation',
    subtitle: `Instant chat at +91 ${CLINIC_INFO.whatsappNumber}`,
    category: 'Contact',
    description: `Message Dr. Rohan Gupta on WhatsApp for fast booking confirmation, dental x-ray reviews, and preliminary consultation inquiries.`,
    targetAnchor: '#contact',
    actionLabel: 'Open WhatsApp',
    keywords: [
      'whatsapp',
      'chat',
      'message',
      'online inquiry',
      'send message',
      'text',
    ],
  },

  // 7. Booking & Appointment
  {
    id: 'search-clinic-appointment',
    title: 'Book an Appointment',
    subtitle: 'Zero Waiting Time • Flexible Date & Slots',
    category: 'Timings',
    description: `Schedule your dental visit with Dr. Rohan Gupta. Choose preferred date, time slot, and treatment with instant SMS/WhatsApp confirmation.`,
    targetAnchor: '#appointment-modal',
    actionLabel: 'Book Appointment',
    keywords: [
      'book',
      'appointment',
      'schedule',
      'slot',
      'visit',
      'consultation',
      'reserve',
    ],
  },

  // 8. Facilities & Hygiene
  ...FACILITIES_DATA.map((fac): SearchItem => ({
    id: `search-facility-${fac.name.toLowerCase().replace(/\s+/g, '-')}`,
    title: fac.name,
    subtitle: 'Clinic Facility & Hygiene Standard',
    category: 'Facilities',
    description: fac.description,
    targetAnchor: '#contact',
    actionLabel: 'View Facilities',
    keywords: [
      fac.name.toLowerCase(),
      fac.description.toLowerCase(),
      'sterilization',
      'hygiene',
      'clean',
      'safety',
      'technology',
      'equipment',
    ],
  })),

  // 9. Reviews & Patient Testimonials
  {
    id: 'search-clinic-reviews',
    title: `Google Patient Reviews (${CLINIC_INFO.googleRating} ★ Rating)`,
    subtitle: `Based on ${CLINIC_INFO.totalReviews}+ Verified Patient Experiences`,
    category: 'Reviews',
    description: `Read authentic reviews from Rohtak residents praising painless root canals, ethical dental advice, transparent pricing, and courteous staff.`,
    targetAnchor: '#testimonials',
    actionLabel: 'Read Reviews',
    keywords: [
      'reviews',
      'ratings',
      'testimonials',
      'google reviews',
      'feedback',
      'patient stories',
      'rating 4.9',
      'stars',
    ],
  },

  // 10. Instagram Cases
  {
    id: 'search-instagram-cases',
    title: `Instagram Case Studies (@${CLINIC_INFO.instagramHandle})`,
    subtitle: 'Real Before-and-After Smile Transformations',
    category: 'Reviews',
    description: `View clinical photography of anterior composites, smile makeovers, dental caps, and painless RCT recoveries treated by Dr. Rohan Gupta.`,
    targetAnchor: '#instagram-feed',
    actionLabel: 'View Case Studies',
    keywords: [
      'instagram',
      'cases',
      'before after',
      'photos',
      'smile makeover',
      'results',
      'gallery',
      'case studies',
      'pictures',
    ],
  },
];

export function searchClinicData(query: string): SearchItem[] {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return [];

  const searchWords = cleanQuery.split(/\s+/).filter(Boolean);

  const scoredResults: { item: SearchItem; score: number }[] = [];

  for (const item of SEARCHABLE_DATABASE) {
    const titleLower = item.title.toLowerCase();
    const descLower = item.description.toLowerCase();
    const subtitleLower = (item.subtitle || '').toLowerCase();
    const catLower = item.category.toLowerCase();

    let score = 0;

    // Exact title match
    if (titleLower === cleanQuery) {
      score += 100;
    } else if (titleLower.startsWith(cleanQuery)) {
      score += 60;
    } else if (titleLower.includes(cleanQuery)) {
      score += 40;
    }

    // Keyword matching
    for (const kw of item.keywords) {
      if (kw === cleanQuery) {
        score += 50;
      } else if (kw.startsWith(cleanQuery)) {
        score += 30;
      } else if (kw.includes(cleanQuery)) {
        score += 20;
      }
    }

    // Word-by-word matching
    for (const word of searchWords) {
      if (titleLower.includes(word)) score += 15;
      if (subtitleLower.includes(word)) score += 10;
      if (descLower.includes(word)) score += 8;
      if (catLower.includes(word)) score += 10;
      for (const kw of item.keywords) {
        if (kw.includes(word)) score += 5;
      }
    }

    if (score > 0) {
      scoredResults.push({ item, score });
    }
  }

  // Sort descending by score
  return scoredResults
    .sort((a, b) => b.score - a.score)
    .map((res) => res.item);
}
