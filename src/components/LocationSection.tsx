import React from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Navigation, 
  Shield, 
  Camera, 
  Wind, 
  Feather, 
  Car, 
  CreditCard,
  Building2
} from 'lucide-react';
import { CLINIC_INFO, FACILITIES_DATA } from '../data/clinicData';

export const LocationSection: React.FC = () => {
  const renderFacilityIcon = (iconName: string) => {
    const cls = "w-5 h-5 text-blue-600";
    switch (iconName) {
      case 'Shield':
        return <Shield className={cls} />;
      case 'Camera':
        return <Camera className={cls} />;
      case 'Wind':
        return <Wind className={cls} />;
      case 'Feather':
        return <Feather className={cls} />;
      case 'Car':
        return <Car className={cls} />;
      case 'CreditCard':
        return <CreditCard className={cls} />;
      default:
        return <Shield className={cls} />;
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading: "Our Location & Facilities" */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>VISIT OUR CLINIC</span>
          </div>
          <h2
            id="location-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-950 tracking-tight mb-3"
          >
            Our Location & Facilities
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Conveniently situated in the heart of Rohtak with modern equipment and patient-friendly amenities.
          </p>
        </div>

        {/* Location Info & Google Maps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Address & Timings Column */}
          <div className="lg:col-span-5 bg-white rounded-lg border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-blue-950 mb-6 pb-3 border-b border-slate-100 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>Clinic Address & Timings</span>
              </h3>

              <div className="space-y-6">
                {/* Requested Address text */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Address</h4>
                    {/* User requested exact address text: "Rohtak, Haryana, (Pincode-124001) India" */}
                    <p id="clinic-address-text" className="font-bold text-slate-800 text-base mt-0.5">
                      Rohtak, Haryana, (Pincode-124001) India
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {CLINIC_INFO.fullAddress}
                    </p>
                  </div>
                </div>

                {/* Timings */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">OPD & Consultation Hours</h4>
                    <p className="font-semibold text-slate-800 text-sm mt-0.5">
                      {CLINIC_INFO.timingDays}
                    </p>
                    <p className="text-xs text-blue-700 font-medium mt-1">
                      {CLINIC_INFO.timingSunday}
                    </p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Appointments & Inquiry</h4>
                    <p className="font-bold text-slate-800 text-base mt-0.5">
                      {CLINIC_INFO.phone}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Emergency contact: {CLINIC_INFO.emergencyPhone}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action button for directions */}
            <div className="pt-6 mt-6 border-t border-slate-100 flex flex-wrap items-center gap-3">
              <a
                id="get-directions-btn"
                href="https://maps.google.com/?q=Rohtak,+Haryana+124001"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded text-sm font-semibold shadow transition-colors"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>
              <a
                id="location-call-btn"
                href={`tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded text-sm font-semibold transition-colors"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                <span>Call Clinic</span>
              </a>
            </div>
          </div>

          {/* Placeholder for Google Maps embed */}
          <div className="lg:col-span-7 bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs flex flex-col">
            <div className="bg-blue-900 text-white px-4 py-3 flex items-center justify-between text-xs sm:text-sm">
              <span className="font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-300" />
                Interactive Clinic Map • Rohtak 124001
              </span>
              <a
                href="https://maps.google.com/?q=Rohtak,+Haryana+124001"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white underline text-xs"
              >
                View Larger Map
              </a>
            </div>

            {/* Google Maps Embed Placeholder iframe */}
            <div id="google-maps-placeholder" className="relative w-full h-[320px] sm:h-[380px] bg-slate-100">
              <iframe
                title="Google Maps Location for Shree Bhagwati Dental Clinic Rohtak"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111797.46083815344!2d76.54124976451634!3d28.895515286591295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d850a184323c9%3A0x965bb7429d28c3a1!2sRohtak%2C%20Haryana%20124001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />

              {/* Clinic Location Overlay Chip */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs p-3 rounded shadow-md border border-slate-200 max-w-xs text-xs">
                <p className="font-bold text-blue-950 text-sm">Shree Bhagwati Dental Clinic 🦷</p>
                <p className="text-slate-600 mt-0.5">Bada Bazar, Rohtak, Haryana (Pincode-124001)</p>
                <p className="text-blue-700 font-medium mt-1">★ 4.9 Rating • Dr. Rohan Gupta</p>
              </div>
            </div>
          </div>
        </div>

        {/* Clinic Facilities Grid */}
        <div className="mt-8">
          <h3 className="text-lg sm:text-xl font-bold text-blue-950 mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <span>Clinic Facilities & Safety Standards</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FACILITIES_DATA.map((facility, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs flex items-start gap-3.5 hover:border-blue-300 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  {renderFacilityIcon(facility.icon)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{facility.name}</h4>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                    {facility.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
