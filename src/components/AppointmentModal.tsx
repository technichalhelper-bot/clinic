import React, { useState, useEffect } from 'react';
import { 
  X, 
  ArrowLeft,
  Calendar, 
  Clock, 
  User, 
  Phone, 
  CheckCircle2, 
  MessageCircle, 
  Stethoscope, 
  ShieldAlert,
  ExternalLink,
  Plus
} from 'lucide-react';
import { CLINIC_INFO, SERVICES_DATA } from '../data/clinicData';
import { AppointmentFormData } from '../types';
import { GoogleCalendarSyncModal } from './GoogleCalendarSyncModal';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  preSelectedService = '',
}) => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    fullName: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    timeSlot: 'Morning (10:00 AM - 1:00 PM)',
    service: preSelectedService || 'General Consultation / Checkup',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [showCalendarSync, setShowCalendarSync] = useState(false);

  useEffect(() => {
    if (preSelectedService) {
      setFormData((prev) => ({ ...prev, service: preSelectedService }));
    }
  }, [preSelectedService]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      return;
    }
    const generatedId = `SBDC-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingId(generatedId);
    setSubmitted(true);
  };

  const handleWhatsAppConfirm = () => {
    const text = encodeURIComponent(
      `*New Appointment Request - Shree Bhagwati Dental Clinic*\n` +
      `Booking ID: ${bookingId}\n` +
      `Name: ${formData.fullName}\n` +
      `Phone: ${formData.phone}\n` +
      `Date: ${formData.date}\n` +
      `Slot: ${formData.timeSlot}\n` +
      `Service: ${formData.service}\n` +
      (formData.notes ? `Concern: ${formData.notes}\n` : '')
    );
    window.open(`https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  const handleBackToForm = () => {
    setSubmitted(false);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      phone: '',
      date: new Date().toISOString().split('T')[0],
      timeSlot: 'Morning (10:00 AM - 1:00 PM)',
      service: 'General Consultation / Checkup',
      notes: '',
    });
    onClose();
  };

  return (
    <div
      id="appointment-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
      onClick={resetForm}
    >
      <div
        id="appointment-modal-card"
        className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-7 shadow-2xl border border-slate-200 relative my-6 text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Action Bar: Back and Close Buttons */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          {submitted ? (
            <button
              id="back-to-form-btn"
              onClick={handleBackToForm}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 hover:text-blue-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back / Edit Details</span>
            </button>
          ) : (
            <button
              id="back-close-modal-btn"
              onClick={resetForm}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          )}

          <button
            id="close-appointment-modal"
            onClick={resetForm}
            className="inline-flex items-center gap-1 p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close dialog"
            title="Close"
          >
            <span className="text-xs font-medium hidden xs:inline">Close</span>
            <X className="w-5 h-5" />
          </button>
        </div>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-blue-950 leading-tight">Book Doctor Appointment</h3>
                <p className="text-xs text-slate-500">
                  {CLINIC_INFO.name} • Rohtak
                </p>
              </div>
            </div>

            {/* Quick trust strip */}
            <div className="bg-blue-50/80 border border-blue-200/70 rounded-lg p-2.5 mb-5 flex items-center gap-2.5 text-xs text-blue-900">
              <Stethoscope className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Consult with Dr. Rohan Gupta. Quick confirmation with zero waiting.</span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5 text-sm">
              {/* Patient Name */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1 text-xs uppercase tracking-wider">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    id="input-patient-name"
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm bg-white"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1 text-xs uppercase tracking-wider">
                  Phone Number (Mobile) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    id="input-patient-phone"
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm bg-white"
                  />
                </div>
              </div>

              {/* Service selection */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1 text-xs uppercase tracking-wider">
                  Service / Treatment Needed
                </label>
                <select
                  id="input-patient-service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm bg-white cursor-pointer"
                >
                  <option value="General Consultation / Checkup">General Consultation / Checkup</option>
                  {SERVICES_DATA.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date and Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1 text-xs uppercase tracking-wider">
                    Preferred Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="input-patient-date"
                    type="date"
                    required
                    value={formData.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1 text-xs uppercase tracking-wider">
                    Preferred Slot
                  </label>
                  <select
                    id="input-patient-slot"
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm bg-white cursor-pointer"
                  >
                    <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                    <option value="Evening (4:30 PM - 8:30 PM)">Evening (4:30 PM - 8:30 PM)</option>
                    <option value="Emergency (Same Day Urgent)">Emergency (Urgent Pain)</option>
                  </select>
                </div>
              </div>

              {/* Additional notes / Dental concern */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1 text-xs uppercase tracking-wider">
                  Dental Symptoms / Notes (Optional)
                </label>
                <textarea
                  id="input-patient-notes"
                  rows={2}
                  placeholder="Describe your pain, problem tooth, or symptoms..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm bg-white"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                <button
                  id="cancel-appointment-btn"
                  type="button"
                  onClick={resetForm}
                  className="w-full sm:w-1/3 order-2 sm:order-1 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-sm transition-colors cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  id="submit-appointment-btn"
                  type="submit"
                  className="w-full sm:w-2/3 order-1 sm:order-2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-bold text-sm shadow-xs transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Confirm Appointment</span>
                </button>
              </div>

              <p className="text-center text-[11px] text-slate-400 pt-1">
                Clinic will send a confirmation SMS / Call within 30 minutes during OPD hours.
              </p>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-2">
            <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-blue-950 mb-1">Appointment Requested!</h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-5">
              Thank you, <strong>{formData.fullName}</strong>. Your consultation has been provisionally registered.
            </p>

            {/* Summary card */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left mb-5 text-xs sm:text-sm space-y-2">
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Booking Reference:</span>
                <span className="font-bold text-blue-700">{bookingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Treatment:</span>
                <span className="font-medium text-slate-800">{formData.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date & Slot:</span>
                <span className="font-medium text-slate-800">{formData.date} ({formData.timeSlot})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Clinic Contact:</span>
                <span className="font-medium text-slate-800">{CLINIC_INFO.phone}</span>
              </div>
            </div>

            {/* WhatsApp & Google Calendar confirmation buttons */}
            <div className="space-y-2.5">
              <button
                id="add-google-calendar-btn"
                onClick={() => setShowCalendarSync(true)}
                className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-bold text-sm shadow-xs transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Add to Google Calendar & Set Alert</span>
              </button>

              <button
                id="confirm-whatsapp-btn"
                onClick={handleWhatsAppConfirm}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-2.5 px-4 rounded-xl font-bold text-sm shadow-xs transition-colors cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Send via WhatsApp to Doctor</span>
              </button>

              <div className="flex items-center gap-2 pt-1">
                <button
                  id="back-edit-appointment-btn"
                  onClick={handleBackToForm}
                  className="w-1/2 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Edit Booking</span>
                </button>
                <button
                  id="done-appointment-btn"
                  onClick={resetForm}
                  className="w-1/2 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Close Window</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Google Calendar Sync Modal */}
      {showCalendarSync && (
        <GoogleCalendarSyncModal
          isOpen={showCalendarSync}
          onClose={() => setShowCalendarSync(false)}
          pendingBooking={{
            patientName: formData.fullName,
            patientPhone: formData.phone,
            serviceTitle: formData.service,
            dateStr: formData.date,
            timeSlotStr: formData.timeSlot,
            notes: formData.notes,
            bookingId: bookingId,
          }}
        />
      )}
    </div>
  );
};
