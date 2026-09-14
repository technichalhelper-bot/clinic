import React, { useState } from 'react';
import { Calendar, Menu, X, Sun, Moon, Search } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { useTheme } from '../context/ThemeContext';
import { NavbarSearch } from './NavbarSearch';

// Custom high-precision SVG icon depicting a dental tooth with dental examination/hygiene tools
const DentalToothToolsIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Crossed Dental Tool 1: Mirror / Probe */}
    <line
      x1="8"
      y1="8"
      x2="40"
      y2="40"
      stroke="#93c5fd"
      strokeWidth="2.5"
      strokeLinecap="round"
      opacity="0.9"
    />
    <circle
      cx="9"
      cy="9"
      r="4"
      stroke="#93c5fd"
      strokeWidth="2"
      fill="#1e40af"
      opacity="0.9"
    />
    <line
      x1="36"
      y1="36"
      x2="42"
      y2="42"
      stroke="#bfdbfe"
      strokeWidth="3.5"
      strokeLinecap="round"
    />

    {/* Crossed Dental Tool 2: Explorer Hook */}
    <line
      x1="40"
      y1="8"
      x2="8"
      y2="40"
      stroke="#60a5fa"
      strokeWidth="2.5"
      strokeLinecap="round"
      opacity="0.9"
    />
    <path
      d="M37 6 C41 7, 43 11, 39 14"
      stroke="#60a5fa"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    <line
      x1="12"
      y1="36"
      x2="6"
      y2="42"
      stroke="#60a5fa"
      strokeWidth="3.5"
      strokeLinecap="round"
    />

    {/* Stylized Anatomical Tooth Centered */}
    <path
      d="M24 13 C18 13 15 15.5 14.5 19 C14 23 16 26 17 29 C18 32 18.5 37 19.5 37 C20.5 37 21.5 33 24 33 C26.5 33 27.5 37 28.5 37 C29.5 37 30 32 31 29 C32 26 34 23 33.5 19 C33 15.5 30 13 24 13 Z"
      fill="white"
      stroke="#1e40af"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    
    {/* Inner Tooth Gloss Highlight */}
    <path
      d="M20 17.5 C17.5 18 17 21 17.5 24"
      stroke="#2563eb"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <circle cx="28" cy="18" r="1" fill="#2563eb" />
  </svg>
);

interface NavbarProps {
  onOpenAppointment: (serviceName?: string) => void;
  onOpenCalendarSync?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAppointment, onOpenCalendarSync }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const { theme, isDark, toggleTheme } = useTheme();

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Meet Doctor', href: '#doctor' },
    { label: 'Services', href: '#services' },
    { label: 'Instagram Cases', href: '#instagram-feed' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact Us', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0d1527]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-4">
          {/* Left: Brand Logo with Circular Tooth & Tools Logo and Unified Clinic Name */}
          <a
            id="nav-brand-logo"
            href="#home"
            className="flex items-center gap-2 sm:gap-3 group text-left cursor-pointer shrink min-w-0"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500 flex items-center justify-center p-1.5 sm:p-2 shadow-sm shrink-0 border-2 border-blue-400/40 group-hover:scale-105 transition-transform">
              <DentalToothToolsIcon className="w-full h-full" />
            </div>
            <div className="min-w-0">
              <span className="block font-bold text-xs xs:text-sm sm:text-base lg:text-lg text-blue-950 dark:text-white tracking-tight leading-tight group-hover:text-blue-600 dark:group-hover:text-sky-300 transition-colors whitespace-nowrap">
                Shree Bhagwati Dental Clinic
              </span>
              <span className="block text-[10px] sm:text-xs font-semibold text-blue-600 dark:text-blue-300 tracking-wider uppercase whitespace-nowrap">
                Rohtak
              </span>
            </div>
          </a>

          {/* Center: Links (Home, About Us, Services, Testimonials, Contact Us) */}
          <nav className="hidden xl:flex items-center gap-5 xl:gap-6 text-sm font-semibold text-slate-700 dark:text-slate-200 shrink-0">
            {navLinks.map((link) => (
              <a
                key={link.label}
                id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-blue-600 dark:hover:text-sky-300 relative py-2 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 hover:after:w-full after:transition-all whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Desktop Search, Theme Switcher & Book Appointment */}
          <div className="hidden md:flex items-center gap-2 lg:gap-2.5 shrink-0">
            {/* Quick Search Bar Filter */}
            <NavbarSearch onOpenAppointment={onOpenAppointment} />

            {/* Theme Switcher Toggle */}
            <button
              id="navbar-theme-toggle"
              onClick={toggleTheme}
              role="switch"
              aria-checked={isDark}
              aria-label={isDark ? "Switch to standard light theme" : "Switch to high-contrast dark mode"}
              title={isDark ? "High-Contrast Dark Mode Active. Click for Standard Light Theme." : "Standard Light Theme. Click for High-Contrast Dark Mode."}
              className={`inline-flex items-center gap-1.5 px-2.5 xl:px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 border cursor-pointer select-none shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-amber-400/40 shadow-sm focus-visible:ring-amber-400'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300 shadow-xs focus-visible:ring-slate-400'
              }`}
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-semibold hidden xl:inline">Light</span>
                  <span className="bg-amber-400/20 text-amber-300 text-[10px] font-extrabold px-1.5 py-0.5 rounded tracking-wide uppercase">
                    Contrast
                  </span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-600 shrink-0" />
                  <span className="font-semibold hidden xl:inline">Dark</span>
                  <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                    A11y
                  </span>
                </>
              )}
            </button>

            {/* Google Calendar Sync Button */}
            {onOpenCalendarSync && (
              <button
                id="nav-calendar-sync-btn"
                onClick={onOpenCalendarSync}
                className="inline-flex items-center gap-1.5 px-2.5 xl:px-3 py-2 rounded-lg text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200 dark:border-blue-800 transition-colors cursor-pointer shrink-0"
                title="Google Calendar Integration - Sync Appointments"
              >
                <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span className="hidden xl:inline">Sync Calendar</span>
              </button>
            )}

            <button
              id="nav-book-appointment-btn"
              onClick={() => onOpenAppointment()}
              className="inline-flex items-center gap-1.5 xl:gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3.5 xl:px-5 py-2.5 rounded-lg font-semibold text-xs xl:text-sm tracking-wide shadow-xs transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shrink-0"
            >
              <Calendar className="w-4 h-4" />
              <span className="whitespace-nowrap">Book Appointment</span>
            </button>
          </div>

          {/* Mobile buttons: Clean, uncluttered, and spacious */}
          <div className="flex md:hidden items-center gap-2 shrink-0">
            {/* Quick Book Button */}
            <button
              id="mobile-book-appointment-btn"
              onClick={() => onOpenAppointment()}
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book</span>
            </button>

            {/* Mobile Hamburger Menu Toggle (Search is easily accessible right inside drawer) */}
            <button
              id="mobile-menu-toggle"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                if (mobileSearchOpen) setMobileSearchOpen(false);
              }}
              className="p-1.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Dropdown Bar */}
      {mobileSearchOpen && (
        <div id="mobile-search-dropdown-bar" className="sm:hidden px-4 py-3 bg-slate-50 dark:bg-slate-800/95 border-t border-slate-200 dark:border-slate-700 shadow-inner">
          <div className="max-w-md mx-auto">
            <NavbarSearch
              isMobileDrawer
              onOpenAppointment={(svc) => {
                setMobileSearchOpen(false);
                onOpenAppointment(svc);
              }}
              onNavigate={() => setMobileSearchOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1527] px-4 pt-3 pb-5 shadow-xl transition-colors">
          <div className="flex flex-col space-y-3">
            {/* Quick search inside mobile drawer */}
            <div className="pb-3 border-b border-slate-200 dark:border-slate-700">
              <span className="block text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider mb-2">
                Quick Clinic Directory
              </span>
              <NavbarSearch
                isMobileDrawer
                onOpenAppointment={(svc) => {
                  setMobileMenuOpen(false);
                  onOpenAppointment(svc);
                }}
                onNavigate={() => setMobileMenuOpen(false)}
              />
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                id={`mobile-nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-base font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-sky-300 hover:bg-blue-50 dark:hover:bg-blue-900/40 px-3 py-2 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}

            {/* Accessibility Theme Switcher row in mobile drawer */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded-md ${isDark ? 'bg-amber-400/20 text-amber-400' : 'bg-slate-200 text-slate-700'}`}>
                    {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-900 dark:text-white">
                      {isDark ? 'High-Contrast Dark' : 'Standard Light'}
                    </span>
                    <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                      Accessibility theme
                    </span>
                  </div>
                </div>

                <button
                  id="mobile-drawer-theme-toggle"
                  onClick={toggleTheme}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                    isDark
                      ? 'bg-amber-400 text-slate-900 hover:bg-amber-300'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Switch to {isDark ? 'Light' : 'Dark'}
                </button>
              </div>
            </div>

            {/* Google Calendar Sync button in mobile drawer */}
            {onOpenCalendarSync && (
              <button
                id="mobile-drawer-calendar-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCalendarSync();
                }}
                className="w-full flex items-center justify-center gap-2 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 px-4 py-2.5 rounded-lg font-semibold text-xs transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Google Calendar Sync & Alerts</span>
              </button>
            )}

            <div className="pt-2">
              <button
                id="mobile-drawer-book-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAppointment();
                }}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold text-sm shadow cursor-pointer transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
