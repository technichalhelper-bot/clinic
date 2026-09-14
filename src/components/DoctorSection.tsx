import React from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Calendar, 
  MessageCircle, 
  Activity, 
  HeartHandshake,
  Flame,
  Scissors,
  Instagram,
  Phone,
  Facebook
} from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface DoctorSectionProps {
  onOpenAppointment: () => void;
}

export const DoctorSection: React.FC<DoctorSectionProps> = ({ onOpenAppointment }) => {
  const whatsappUrl = `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(
    `Hello Dr. Rohan Gupta, I would like to book a dental consultation with you at Shree Bhagwati Dental Clinic, Bada Bazar, Rohtak.`
  )}`;

  const specializations = [
    {
      title: 'Painless Dentistry',
      desc: 'Advanced rotary technology & gentle anesthesia protocols ensuring zero-pain comfort for every patient.',
      icon: Sparkles,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      title: 'Scaling & Polishing',
      desc: 'Ultrasonic stain and tartar removal, preventing gum recession, bleeding, and bad breath.',
      icon: Flame,
      color: 'bg-sky-50 text-sky-700 border-sky-200',
    },
    {
      title: 'Root Canal Treatment (RCT)',
      desc: 'Single-sitting precision endodontic therapy to preserve infected teeth without pain.',
      icon: Activity,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    },
    {
      title: 'Safe Extractions',
      desc: 'Gentle, minimally invasive tooth removals including problematic and impacted wisdom teeth.',
      icon: Scissors,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
  ];

  return (
    <section id="doctor" className="py-16 sm:py-24 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
            <HeartHandshake className="w-4 h-4 text-blue-700" />
            <span>EXPERT CLINICAL LEADERSHIP</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-950 tracking-tight mb-3">
            Meet the Doctor
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Get to know the dedicated professional behind your family's healthy, confident smiles in Rohtak.
          </p>
        </motion.div>

        {/* Profile Card Container */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10 lg:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Doctor Portrait and Badges */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-xl overflow-hidden shadow-md border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1000&q=80"
                  alt="Dr. Rohan Gupta - Shree Bhagwati Dental Clinic Rohtak"
                  className="w-full h-96 sm:h-[450px] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-transparent to-transparent" />
                
                {/* Overlay Name on Image */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-md mb-2 shadow-xs">
                    <span>Shree Bhagwati Dental Clinic 🦷</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight leading-tight">
                    {CLINIC_INFO.doctorName}
                  </h3>
                  <p className="text-blue-200 text-sm font-medium">
                    {CLINIC_INFO.doctorTitle}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Bio, Philosophy, Specializations & Credentials */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-7 space-y-6"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-blue-700 bg-blue-100/80 px-2.5 py-1 rounded">
                    Dental Surgeon
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-600 font-semibold bg-white border border-slate-200 px-2.5 py-1 rounded">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    Bada Bazar, Rohtak
                  </span>
                  <a
                    id="doctor-instagram-badge"
                    href={CLINIC_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-pink-700 bg-pink-50 hover:bg-pink-100 border border-pink-200 px-2.5 py-1 rounded font-semibold transition-colors"
                    title="Follow on Instagram"
                  >
                    <Instagram className="w-3.5 h-3.5 text-pink-600" />
                    <span>@{CLINIC_INFO.instagramHandle}</span>
                  </a>
                  <a
                    id="doctor-facebook-badge"
                    href={CLINIC_INFO.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2.5 py-1 rounded font-semibold transition-colors"
                    title="Connect on Facebook"
                  >
                    <Facebook className="w-3.5 h-3.5 text-blue-600" />
                    <span>Facebook Profile</span>
                  </a>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-950 tracking-tight">
                  {CLINIC_INFO.doctorName}
                </h3>
                <p className="text-slate-500 text-sm font-medium mt-1">
                  Doctor at <strong className="text-slate-700">Shree Bhagwati Dental Clinic 🦷</strong>
                </p>
              </div>

              {/* Philosophy of Care Quote Box */}
              <div className="bg-white border-l-4 border-blue-600 p-4 sm:p-5 rounded-r-lg shadow-xs">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-800 mb-1">
                  Philosophy of Care
                </p>
                <p className="text-base sm:text-lg font-semibold text-slate-800 italic leading-snug">
                  "Creating confident smiles every day through gentle, painless dentistry."
                </p>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  "My commitment is to ensure no patient ever fears visiting the dentist. By combining modern clinical techniques with honest communication, every procedure at Shree Bhagwati Dental Clinic is delivered with utmost precision, affordability, and warmth."
                </p>
              </div>

              {/* Specializations Grid */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>Key Clinical Specializations</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {specializations.map((spec, i) => {
                    const Icon = spec.icon;
                    return (
                      <div 
                        key={i} 
                        className="bg-white p-3.5 rounded-lg border border-slate-200 flex items-start gap-3 hover:border-blue-300 transition-colors shadow-2xs"
                      >
                        <div className={`p-2 rounded-md border shrink-0 ${spec.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-900 text-xs sm:text-sm">{spec.title}</h5>
                          <p className="text-slate-500 text-xs mt-0.5 leading-snug">{spec.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Verified Credentials */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>5 Years Clinical Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>100% Painless Tech</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Ethical Diagnosis</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  id="doctor-book-consult-btn"
                  onClick={onOpenAppointment}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-bold text-sm shadow transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation with Dr. Gupta</span>
                </button>

                <a
                  id="doctor-whatsapp-btn"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-3 rounded-md font-bold text-sm shadow transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Direct</span>
                </a>

                <a
                  id="doctor-call-direct-btn"
                  href={`tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-950 text-white px-5 py-3 rounded-md font-bold text-sm shadow transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {CLINIC_INFO.phone}</span>
                </a>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
