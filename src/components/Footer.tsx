import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ChevronRight, 
  PlusCircle, 
  Facebook, 
  Instagram, 
  Youtube, 
  MessageCircle,
  ShieldCheck
} from 'lucide-react';
import { CLINIC_INFO, SERVICES_DATA } from '../data/clinicData';

interface FooterProps {
  onOpenAppointment: () => void;
  onSelectService: (serviceName: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAppointment, onSelectService }) => {
  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Our Dental Services', href: '#services' },
    { label: 'Patient Testimonials', href: '#testimonials' },
    { label: 'Location & Facilities', href: '#contact' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-blue-950 text-slate-300 pt-16 pb-8 border-t border-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-blue-900/60">
          {/* Column 1: Clinic Branding & Overview */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-sm border border-blue-400/40">
                <PlusCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">
                  {CLINIC_INFO.name}
                </h3>
                <p className="text-xs text-blue-300 font-medium">
                  Dental Surgeon & Implant Center
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Dedicated to delivering painless, ethical, and affordable oral healthcare in Rohtak, Haryana. Backed by 5 years of clinical expertise.
            </p>

            <div className="flex items-center gap-3 text-slate-400">
              <a
                href={CLINIC_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Profile of Dr. Rohan Gupta"
                className="w-8 h-8 rounded bg-blue-900/60 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors"
                title="Dr. Rohan Gupta on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={CLINIC_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @shreebhagwatidentalclinic"
                className="w-8 h-8 rounded bg-blue-900/60 hover:bg-pink-600 hover:text-white flex items-center justify-center transition-colors"
                title="@shreebhagwatidentalclinic"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded bg-blue-900/60 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${CLINIC_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded bg-blue-900/60 hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 pb-2 border-b border-blue-800 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="hover:text-blue-300 transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={onOpenAppointment}
                  className="hover:text-blue-200 transition-colors flex items-center gap-1.5 text-left text-sm font-semibold text-blue-400 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span>Book an Appointment</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 pb-2 border-b border-blue-800 inline-block">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {SERVICES_DATA.slice(0, 7).map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => onSelectService(s.title)}
                    className="hover:text-blue-300 transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    <span className="truncate">{s.title}</span>
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleScroll(e, '#services')}
                  className="text-xs text-blue-300 hover:underline pt-1 inline-block"
                >
                  View all 9 treatments →
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info (Phone, Email, Address) */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 pb-2 border-b border-blue-800 inline-block">
              Contact Info
            </h4>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-1" />
                <span className="text-slate-300 leading-snug">
                  {/* Exact requested address */}
                  <strong>Rohtak, Haryana, (Pincode-124001) India</strong>
                  <br />
                  <span className="text-xs text-slate-400">Bada Bazar, Rohtak, Haryana 124001</span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <div>
                  <a
                    href={`tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`}
                    className="hover:text-blue-300 transition-colors block font-semibold text-white"
                  >
                    {CLINIC_INFO.phone}
                  </a>
                  <span className="text-xs text-slate-400">Doctor Helpline / Emergency</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a
                  href={`mailto:${CLINIC_INFO.email}`}
                  className="hover:text-blue-300 transition-colors break-all"
                >
                  {CLINIC_INFO.email}
                </a>
              </div>

              <div className="flex items-start gap-3 pt-1">
                <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300">
                  Mon - Sat: 9:30 AM - 1:30 PM &amp; 4:30 PM - 8:30 PM
                  <br />
                  <span className="text-blue-300 font-medium">Sunday: 10:00 AM - 2:00 PM (Prior Appt)</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            © {new Date().getFullYear()} {CLINIC_INFO.name}. All Rights Reserved. Rohtak, Haryana.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-blue-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Sterilized Clinic
            </span>
            <span>•</span>
            <span>{CLINIC_INFO.doctorName}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
