import React from 'react';
import { Award, UserCheck, Stethoscope, Sparkles, HeartPulse, Check, Calendar } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface AboutSectionProps {
  onOpenAppointment: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenAppointment }) => {
  return (
    <section id="about" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Image & Doctor Credentials badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-lg overflow-hidden shadow-lg border-4 border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80"
                alt="Doctor attending patient at Shree Bhagwati Dental Clinic Rohtak"
                className="w-full h-96 sm:h-[430px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="bg-blue-600 text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                  Clinical Lead
                </span>
                <h3 className="text-xl font-bold mt-1">{CLINIC_INFO.doctorName}</h3>
                <p className="text-sm text-blue-100">Dental Surgeon & Aesthetic Specialist</p>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-blue-700 bg-blue-50 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider mb-3">
              <HeartPulse className="w-4 h-4 text-blue-600" />
              <span>ABOUT SHREE BHAGWATI DENTAL CLINIC</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-950 tracking-tight mb-4">
              Providing Rohtak with High Quality, Honest & Painless Dental Care
            </h2>

            <p className="text-slate-600 leading-relaxed mb-4 text-base">
              At <strong>Shree Bhagwati Dental Clinic</strong>, we believe every patient deserves warm, honest, and comfortable dental treatments. Led by an experienced dental surgeon with over 5 years of hands-on clinical mastery, our clinic combines modern diagnostic tools with a gentle, patient-first touch.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6 text-base">
              Whether you require emergency relief from acute toothache with single-visit Root Canal Treatment, smile makeovers with aesthetic crowns and whitening, or routine preventive care for your children, we prioritize clear explanations, zero hidden costs, and stringent international sterilization standards.
            </p>

            {/* Points list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm font-medium text-slate-700">Painless Anesthesia & Rotary RCT</span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm font-medium text-slate-700">Autoclave Class-B Sterilization</span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm font-medium text-slate-700">Digital X-Rays with Low Exposure</span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm font-medium text-slate-700">Convenient Morning & Evening Timings</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                id="about-consult-btn"
                onClick={onOpenAppointment}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold text-sm shadow transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-blue-200" />
                <span>Consult Our Doctor</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
