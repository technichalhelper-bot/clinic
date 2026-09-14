/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { AboutSection } from './components/AboutSection';
import { DoctorSection } from './components/DoctorSection';
import { ServicesGrid } from './components/ServicesGrid';
import { InstagramFeed } from './components/InstagramFeed';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { AppointmentModal } from './components/AppointmentModal';
import { GoogleCalendarSyncModal } from './components/GoogleCalendarSyncModal';

function AppContent() {
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [calendarSyncModalOpen, setCalendarSyncModalOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string>('');

  const handleOpenAppointment = (serviceName?: string) => {
    setSelectedServiceForBooking(serviceName || '');
    setAppointmentModalOpen(true);
  };

  const handleCloseAppointment = () => {
    setAppointmentModalOpen(false);
    setSelectedServiceForBooking('');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 flex flex-col font-sans antialiased transition-colors duration-200 selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-200">
      {/* 1. Top Bar (Above Navbar) */}
      <TopBar />

      {/* 2. Main Navbar */}
      <Navbar
        onOpenAppointment={(serviceName) => handleOpenAppointment(serviceName)}
        onOpenCalendarSync={() => setCalendarSyncModalOpen(true)}
      />

      <main className="grow">
        {/* 3. Hero Banner Section */}
        <HeroBanner onOpenAppointment={() => handleOpenAppointment()} />

        {/* About Section with clinic overview */}
        <AboutSection onOpenAppointment={() => handleOpenAppointment()} />

        {/* Dedicated Meet the Doctor Profile Section */}
        <DoctorSection onOpenAppointment={() => handleOpenAppointment()} />

        {/* 4. Services Grid (Mimic reference site's exact 9 services & Explore All Services button) */}
        <ServicesGrid
          onSelectServiceToBook={(serviceTitle) => handleOpenAppointment(serviceTitle)}
        />

        {/* Live Instagram Feed & Clinical Cases Showcase (@shreebhagwatidentalclinic) */}
        <InstagramFeed />

        {/* 5. Google Reviews Section (Trustindex style) */}
        <ReviewsSection />

        {/* 6. Location & Facilities Section */}
        <LocationSection />
      </main>

      {/* 7. Footer */}
      <Footer
        onOpenAppointment={() => handleOpenAppointment()}
        onSelectService={(serviceTitle) => handleOpenAppointment(serviceTitle)}
      />

      {/* Fixed WhatsApp Floating Icon (Bottom Right) */}
      <WhatsAppFloat />

      {/* Interactive Appointment Booking Dialog */}
      <AppointmentModal
        isOpen={appointmentModalOpen}
        onClose={handleCloseAppointment}
        preSelectedService={selectedServiceForBooking}
      />

      {/* Standalone Google Calendar Sync & Management Dialog */}
      <GoogleCalendarSyncModal
        isOpen={calendarSyncModalOpen}
        onClose={() => setCalendarSyncModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

