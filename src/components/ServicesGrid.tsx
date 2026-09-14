import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  HeartPulse, 
  Crown, 
  Sparkles, 
  Waves, 
  Smile, 
  Sliders, 
  Anchor, 
  Scissors, 
  Baby,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
  X,
  Stethoscope,
  Activity
} from 'lucide-react';
import { SERVICES_DATA } from '../data/clinicData';
import { DentalService } from '../types';

interface ServicesGridProps {
  onSelectServiceToBook: (serviceTitle: string) => void;
}

interface ServiceVisualConfig {
  icon: React.ComponentType<{ className?: string }>;
  accentHex: string;
  bgLight: string;
  bgDark: string;
  textLight: string;
  textDark: string;
  hoverBg: string;
  borderHover: string;
  badge: string;
}

const SERVICE_VISUAL_MAP: Record<string, ServiceVisualConfig> = {
  'rct': {
    icon: HeartPulse,
    accentHex: '#e11d48',
    bgLight: 'bg-rose-50',
    bgDark: 'dark:bg-rose-950/40',
    textLight: 'text-rose-600',
    textDark: 'dark:text-rose-400',
    hoverBg: 'group-hover:bg-rose-600',
    borderHover: 'hover:border-rose-400 dark:hover:border-rose-700',
    badge: 'Rotary Endodontics',
  },
  'crowns-bridges': {
    icon: Crown,
    accentHex: '#d97706',
    bgLight: 'bg-amber-50',
    bgDark: 'dark:bg-amber-950/40',
    textLight: 'text-amber-600',
    textDark: 'dark:text-amber-400',
    hoverBg: 'group-hover:bg-amber-600',
    borderHover: 'hover:border-amber-400 dark:hover:border-amber-700',
    badge: 'CAD/CAM Zirconia',
  },
  'fillings': {
    icon: Sparkles,
    accentHex: '#0d9488',
    bgLight: 'bg-teal-50',
    bgDark: 'dark:bg-teal-950/40',
    textLight: 'text-teal-600',
    textDark: 'dark:text-teal-400',
    hoverBg: 'group-hover:bg-teal-600',
    borderHover: 'hover:border-teal-400 dark:hover:border-teal-700',
    badge: 'Composite Resin',
  },
  'cleaning-polishing': {
    icon: Waves,
    accentHex: '#0284c7',
    bgLight: 'bg-sky-50',
    bgDark: 'dark:bg-sky-950/40',
    textLight: 'text-sky-600',
    textDark: 'dark:text-sky-400',
    hoverBg: 'group-hover:bg-sky-600',
    borderHover: 'hover:border-sky-400 dark:hover:border-sky-700',
    badge: 'Ultrasonic Scaling',
  },
  'whitening': {
    icon: Smile,
    accentHex: '#f59e0b',
    bgLight: 'bg-yellow-50',
    bgDark: 'dark:bg-yellow-950/40',
    textLight: 'text-amber-600',
    textDark: 'dark:text-amber-300',
    hoverBg: 'group-hover:bg-amber-500',
    borderHover: 'hover:border-amber-400 dark:hover:border-amber-700',
    badge: 'Aesthetic Bleaching',
  },
  'braces': {
    icon: Sliders,
    accentHex: '#6366f1',
    bgLight: 'bg-indigo-50',
    bgDark: 'dark:bg-indigo-950/40',
    textLight: 'text-indigo-600',
    textDark: 'dark:text-indigo-400',
    hoverBg: 'group-hover:bg-indigo-600',
    borderHover: 'hover:border-indigo-400 dark:hover:border-indigo-700',
    badge: 'Aligners & Braces',
  },
  'implants': {
    icon: Anchor,
    accentHex: '#2563eb',
    bgLight: 'bg-blue-50',
    bgDark: 'dark:bg-blue-950/40',
    textLight: 'text-blue-600',
    textDark: 'dark:text-blue-400',
    hoverBg: 'group-hover:bg-blue-600',
    borderHover: 'hover:border-blue-400 dark:hover:border-blue-700',
    badge: 'Titanium Root',
  },
  'wisdom-tooth': {
    icon: Scissors,
    accentHex: '#dc2626',
    bgLight: 'bg-red-50',
    bgDark: 'dark:bg-red-950/40',
    textLight: 'text-red-600',
    textDark: 'dark:text-red-400',
    hoverBg: 'group-hover:bg-red-600',
    borderHover: 'hover:border-red-400 dark:hover:border-red-700',
    badge: 'Gentle Minor Surgery',
  },
  'kids-dentistry': {
    icon: Baby,
    accentHex: '#ec4899',
    bgLight: 'bg-pink-50',
    bgDark: 'dark:bg-pink-950/40',
    textLight: 'text-pink-600',
    textDark: 'dark:text-pink-400',
    hoverBg: 'group-hover:bg-pink-600',
    borderHover: 'hover:border-pink-400 dark:hover:border-pink-700',
    badge: 'Pediatric Care',
  },
};

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onSelectServiceToBook }) => {
  const [selectedService, setSelectedService] = useState<DentalService | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Helper to render relevant dental Lucide-react icons with visual context
  const renderServiceIcon = (service: DentalService, inModal = false) => {
    const config = SERVICE_VISUAL_MAP[service.id] || {
      icon: Activity,
      accentHex: '#0d9488',
      bgLight: 'bg-teal-50',
      bgDark: 'dark:bg-teal-950/40',
      textLight: 'text-teal-600',
      textDark: 'dark:text-teal-400',
      hoverBg: 'group-hover:bg-teal-600',
      borderHover: 'hover:border-teal-400',
      badge: 'Dental Procedure',
    };

    const IconComp = config.icon;

    if (inModal) {
      return (
        <div className={`w-14 h-14 rounded-xl ${config.bgLight} ${config.bgDark} ${config.textLight} ${config.textDark} flex items-center justify-center shrink-0 shadow-xs border border-slate-200/50 dark:border-slate-700`}>
          <IconComp className="w-7 h-7" />
        </div>
      );
    }

    return (
      <div className={`w-12 h-12 rounded-xl ${config.bgLight} ${config.bgDark} ${config.textLight} ${config.textDark} ${config.hoverBg} group-hover:text-white flex items-center justify-center transition-all duration-200 shrink-0 shadow-xs border border-slate-200/40 dark:border-slate-700/60`}>
        <IconComp className="w-6 h-6 transition-transform group-hover:scale-110" />
      </div>
    );
  };

  const handleOpenDetail = (service: DentalService) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <section id="services" className="py-16 sm:py-20 bg-slate-50 dark:bg-[#0b0f19] border-b border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 border border-blue-200/50 dark:border-blue-800">
            <Stethoscope className="w-3.5 h-3.5 text-blue-600 dark:text-blue-300" />
            <span>COMPREHENSIVE DENTAL CARE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-950 dark:text-white tracking-tight mb-3">
            Our Dental Treatments & Services
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            From routine checkups and cavity prevention to specialized root canals, implants, and cosmetic smile designs in Rohtak.
          </p>
        </motion.div>

        {/* The 9 Exact Services with Lucide-react Icons in a Clean Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service, index) => {
            const visualConfig = SERVICE_VISUAL_MAP[service.id];

            return (
              <motion.div
                key={service.id}
                id={`service-card-${service.id}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: (index % 3) * 0.08, ease: 'easeOut' }}
                className={`group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs hover:shadow-lg ${
                  visualConfig?.borderHover || 'hover:border-blue-500/50'
                } transition-all duration-200 flex flex-col justify-between relative overflow-hidden cursor-pointer`}
                onClick={() => handleOpenDetail(service)}
              >
                {/* Subtle top indicator bar */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1 bg-slate-100 dark:bg-slate-800 transition-colors"
                  style={{
                    backgroundColor: undefined,
                  }}
                />

                <div>
                  {/* Icon box, badge and number */}
                  <div className="flex items-center justify-between mb-4">
                    {renderServiceIcon(service)}
                    
                    <div className="flex items-center gap-2">
                      {visualConfig?.badge && (
                        <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                          {visualConfig.badge}
                        </span>
                      )}
                      <span className="text-xs font-bold text-slate-400 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors">
                        0{index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-lg font-bold text-blue-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-300 transition-colors mb-2">
                    {service.title}
                  </h3>

                  {/* Service Short Description */}
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Bottom row: duration & action buttons */}
                <div>
                  {service.duration && (
                    <div className="mb-3 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-400" />
                      <span>Avg Duration: {service.duration}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold">
                    <span className="text-blue-600 dark:text-sky-400 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                      Learn Details <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectServiceToBook(service.title);
                      }}
                      className="text-slate-600 dark:text-slate-300 hover:text-white hover:bg-blue-600 dark:hover:bg-blue-600 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-md transition-colors"
                    >
                      Book This
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Underneath: button saying "Explore All Services" */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <button
            id="explore-all-services-btn"
            onClick={() => handleOpenDetail(SERVICES_DATA[0])}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-md font-semibold text-sm tracking-wide shadow transition-all duration-150 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Explore All Services</span>
            <ArrowRight className="w-4 h-4 text-blue-200" />
          </button>
        </motion.div>
      </div>

      {/* Service Detail Modal */}
      {isModalOpen && selectedService && (
        <div 
          id="service-detail-modal" 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white dark:bg-slate-900 rounded-xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              id="close-service-modal"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5 mb-4">
              {renderServiceIcon(selectedService, true)}
              <div>
                <span className="text-xs font-bold text-blue-700 dark:text-sky-400 uppercase tracking-wider block">
                  {SERVICE_VISUAL_MAP[selectedService.id]?.badge || 'Clinical Procedure'}
                </span>
                <h3 className="text-xl font-bold text-blue-950 dark:text-white">
                  {selectedService.title}
                </h3>
                {selectedService.duration && (
                  <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    <Clock className="w-3 h-3" /> Duration: {selectedService.duration}
                  </span>
                )}
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-5">
              {selectedService.fullDesc}
            </p>

            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-lg p-4 mb-6 border border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2.5">
                Key Benefits & Highlights:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedService.benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-sky-400 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                id="modal-book-service-btn"
                type="button"
                onClick={() => {
                  const s = selectedService.title;
                  setIsModalOpen(false);
                  onSelectServiceToBook(s);
                }}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 text-sm font-semibold rounded shadow transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book This Treatment</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
