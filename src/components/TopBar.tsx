import React from 'react';
import { Mail, Phone, Clock, Facebook, Instagram, Youtube, MessageCircle, MapPin, Sparkles } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

export const TopBar: React.FC = () => {
  return (
    <div id="top-bar" className="bg-[#1e40af] text-white text-xs py-1.5 sm:py-2 px-3 sm:px-4 border-b border-blue-700 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Mobile View: Show only open time of clinic */}
        <div className="flex md:hidden items-center justify-center w-full text-[11px] py-0.5">
          <div className="inline-flex items-center gap-1.5 text-blue-100 font-semibold tracking-wide">
            <Clock className="w-3.5 h-3.5 text-blue-200 shrink-0" />
            <span>Open: Mon - Sat 9:30 AM - 8:30 PM</span>
          </div>
        </div>

        {/* Desktop View (md and up): Complete clinic contact directory */}
        <div className="hidden md:flex items-center gap-6 text-blue-50">
          <a
            id="topbar-phone"
            href={`tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`}
            className="inline-flex items-center gap-1.5 font-bold text-white hover:text-blue-200 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-blue-200 shrink-0" />
            <span>{CLINIC_INFO.phone}</span>
          </a>

          <a
            id="topbar-email"
            href={`mailto:${CLINIC_INFO.email}`}
            className="inline-flex items-center gap-1.5 text-blue-100 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-blue-200 shrink-0" />
            <span className="truncate">{CLINIC_INFO.email}</span>
          </a>
        </div>

        <div className="hidden md:flex items-center gap-5 text-blue-100">
          <div className="inline-flex items-center gap-1.5 text-xs text-blue-100">
            <Clock className="w-3.5 h-3.5 text-blue-200 shrink-0" />
            <span>Mon - Sat: 9:30 AM - 8:30 PM <span className="text-blue-200 text-[11px]">(Lunch 1:30 - 4:30 PM)</span></span>
          </div>

          <div className="flex items-center gap-2 border-l border-blue-600 pl-3">
            <a
              id="topbar-social-instagram"
              href={CLINIC_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Shree Bhagwati Dental Clinic on Instagram"
              className="inline-flex items-center gap-1 p-1 hover:text-white transition-colors"
              title="@shreebhagwatidentalclinic"
            >
              <Instagram className="w-3.5 h-3.5 text-blue-200" />
              <span className="hidden xl:inline text-[11px] font-medium text-blue-100">@{CLINIC_INFO.instagramHandle}</span>
            </a>
            <a
              id="topbar-social-facebook"
              href={CLINIC_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Profile of Dr. Rohan Gupta"
              className="p-1 hover:text-white transition-colors"
              title="Dr. Rohan Gupta on Facebook"
            >
              <Facebook className="w-3.5 h-3.5 text-blue-200" />
            </a>
            <a
              id="topbar-social-youtube"
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="p-1 hover:text-white transition-colors"
            >
              <Youtube className="w-3.5 h-3.5 text-blue-200" />
            </a>
            <a
              id="topbar-social-whatsapp"
              href={`https://wa.me/${CLINIC_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="p-1 text-blue-200 hover:text-white transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-blue-200" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
