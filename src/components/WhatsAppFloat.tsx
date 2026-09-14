import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

export const WhatsAppFloat: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const prefilledMessage = encodeURIComponent(
    `Hello ${CLINIC_INFO.doctorName}, I would like to book a dental appointment at Shree Bhagwati Dental Clinic, Bada Bazar, Rohtak.`
  );
  const whatsappUrl = `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${prefilledMessage}`;

  return (
    <div id="whatsapp-float-container" className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Small popover tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-slate-800 text-xs font-semibold py-2 px-3.5 rounded-full shadow-lg border border-slate-200 animate-in fade-in slide-in-from-right-3">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Chat with us on WhatsApp</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-slate-400 hover:text-slate-600 ml-1"
            aria-label="Dismiss message"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* WhatsApp Floating Button */}
      <a
        id="whatsapp-floating-btn"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Shree Bhagwati Dental Clinic"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105 active:scale-95 group relative cursor-pointer"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
        </span>
        <MessageCircle className="w-7 h-7 fill-white" />
      </a>
    </div>
  );
};
