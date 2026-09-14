import React from 'react';
import { Calendar, PhoneCall, CheckCircle2, Award, Clock, ShieldCheck } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface HeroBannerProps {
  onOpenAppointment: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onOpenAppointment }) => {
  return (
    <section id="home" className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background Image of a clean, professional dental setup */}
      <div className="absolute inset-0 z-0">
        <img
          id="hero-bg-image"
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=2000&q=80"
          alt="Modern Dental Clinic Operatory Chair Setup"
          className="w-full h-full object-cover object-center opacity-30 sm:opacity-35 transform scale-105"
        />
        {/* Medical royal-blue gradient overlay for crystal clear contrast & medical tone */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-900/95 to-blue-950/85 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-transparent to-transparent opacity-85" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24">
        <div className="max-w-2xl">
          {/* Tagline pill with verified badge */}
          <div className="inline-flex items-center gap-2 bg-blue-900/60 border border-blue-400/40 text-blue-200 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-5 backdrop-blur-md shadow-xs">
            <ShieldCheck className="w-4 h-4 text-blue-300 shrink-0" />
            <span className="tracking-wide uppercase text-[11px] sm:text-xs">Shree Bhagwati Dental Clinic • Rohtak</span>
          </div>

          {/* Headline: Clean, balanced typography with polished accent */}
          <h1
            id="hero-headline"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.2] mb-4 text-balance"
          >
            Your smile deserves the best{' '}
            <span className="text-blue-300 font-extrabold">
              expert attention
            </span>
            .
          </h1>

          {/* Subtext: Clear, reassuring, and balanced with no orphaned words */}
          <p
            id="hero-subtext"
            className="text-base sm:text-lg text-blue-100/90 mb-7 leading-relaxed font-normal max-w-xl text-balance"
          >
            Trusted, painless, and affordable dental care in Rohtak — led by Dr. Rohan Gupta with 5+ years of clinical excellence.
          </p>

          {/* Key Quick Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8 text-sm text-blue-100 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-300 shrink-0" />
              <span>Advanced Rotary Painless RCT</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-300 shrink-0" />
              <span>100% Sterilized & Hygienic Setup</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-300 shrink-0" />
              <span>Affordable & Honest Diagnosis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-300 shrink-0" />
              <span>Digital Low-Radiation X-Rays</span>
            </div>
          </div>

          {/* Call to action buttons: "Book an Appointment" and "Call Now" */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              id="hero-book-btn"
              onClick={onOpenAppointment}
              className="inline-flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 rounded-md font-bold text-base shadow-lg transition-all duration-150 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Calendar className="w-5 h-5" />
              <span>Book an Appointment</span>
            </button>

            <a
              id="hero-call-btn"
              href={`tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-blue-50 text-blue-900 border border-white font-bold px-7 py-3.5 rounded-md text-base transition-all duration-150 transform hover:-translate-y-0.5 shadow-md"
            >
              <PhoneCall className="w-5 h-5 text-blue-600" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Doctor experience note */}
          <div className="mt-8 pt-6 border-t border-white/15 flex items-center gap-3 text-xs sm:text-sm text-blue-200">
            <div className="w-9 h-9 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <p className="font-semibold text-white">{CLINIC_INFO.doctorName}</p>
              <p className="text-blue-200">{CLINIC_INFO.experience} • Certified Dental Surgeon</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Strip at the bottom of hero */}
      <div className="relative z-10 bg-blue-900/90 border-t border-blue-800 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-white text-xs sm:text-sm">
          <div className="flex items-center justify-center gap-2 border-r border-blue-700/60 last:border-0 pr-2">
            <Award className="w-4 h-4 text-blue-300 shrink-0" />
            <span className="font-semibold">5+ Years Experience</span>
          </div>
          <div className="flex items-center justify-center gap-2 md:border-r border-blue-700/60 pr-2">
            <Clock className="w-4 h-4 text-blue-300 shrink-0" />
            <span className="font-semibold">Flexible Timings</span>
          </div>
          <div className="flex items-center justify-center gap-2 border-r border-blue-700/60 last:border-0 pr-2">
            <ShieldCheck className="w-4 h-4 text-blue-300 shrink-0" />
            <span className="font-semibold">Painless Procedures</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-300 shrink-0" />
            <span className="font-semibold">Genuine & Fair Pricing</span>
          </div>
        </div>
      </div>
    </section>
  );
};
