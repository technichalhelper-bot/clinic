import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  X, 
  ArrowRight, 
  Clock, 
  User, 
  MapPin, 
  Phone, 
  Star, 
  Calendar,
  Sparkles,
  Shield,
  Activity,
  Check
} from 'lucide-react';
import { searchClinicData, SearchItem } from '../data/searchIndex';
import { CLINIC_INFO } from '../data/clinicData';

interface NavbarSearchProps {
  onOpenAppointment: (serviceName?: string) => void;
  isMobileDrawer?: boolean;
  onNavigate?: () => void;
}

export const NavbarSearch: React.FC<NavbarSearchProps> = ({
  onOpenAppointment,
  isMobileDrawer = false,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Popular quick searches
  const popularKeywords = [
    'RCT',
    'Teeth Cleaning',
    'Dr. Rohan Gupta',
    'Clinic Timings',
    'Crowns & Bridges',
    'Address',
    'Wisdom Tooth',
  ];

  // Update search results on query change
  useEffect(() => {
    if (query.trim()) {
      const matched = searchClinicData(query);
      setResults(matched);
    } else {
      setResults([]);
    }
  }, [query]);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Keyboard shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectItem = (item: SearchItem) => {
    setIsOpen(false);
    if (onNavigate) onNavigate();

    if (item.targetAnchor === '#appointment-modal') {
      onOpenAppointment(item.serviceTitleForBooking);
      return;
    }

    // Scroll to the targeted section
    const targetEl = document.querySelector(item.targetAnchor);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookFromSearch = (e: React.MouseEvent, item: SearchItem) => {
    e.stopPropagation();
    setIsOpen(false);
    if (onNavigate) onNavigate();
    onOpenAppointment(item.serviceTitleForBooking || item.title);
  };

  const getCategoryBadge = (category: SearchItem['category']) => {
    switch (category) {
      case 'Service':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700';
      case 'Doctor':
        return 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-700';
      case 'Timings':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700';
      case 'Contact':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700';
      case 'Facilities':
        return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300';
      case 'Reviews':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  const getCategoryIcon = (category: SearchItem['category']) => {
    switch (category) {
      case 'Service':
        return <Activity className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />;
      case 'Doctor':
        return <User className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />;
      case 'Timings':
        return <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />;
      case 'Contact':
        return <Phone className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />;
      case 'Facilities':
        return <Shield className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />;
      case 'Reviews':
        return <Star className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${isMobileDrawer ? 'w-full' : 'w-48 sm:w-64 lg:w-72'}`}
    >
      {/* Search Input Field */}
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-400">
          <Search className="w-4 h-4" />
        </div>

        <input
          ref={inputRef}
          id={isMobileDrawer ? 'mobile-navbar-search-input' : 'navbar-search-input'}
          type="search"
          autoComplete="off"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search services, doctor, timings..."
          aria-label="Search clinic services and information"
          className="w-full pl-9 pr-14 py-2 bg-slate-50 hover:bg-slate-100/90 focus:bg-white dark:bg-slate-800 dark:hover:bg-slate-700/80 dark:focus:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-400 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-400 transition-all"
        />

        {/* Clear button or keyboard shortcut indicator */}
        <div className="absolute inset-y-0 right-0 pr-2 flex items-center gap-1">
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setResults([]);
                inputRef.current?.focus();
              }}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md transition-colors"
              aria-label="Clear search input"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 dark:text-slate-400 bg-slate-200/60 dark:bg-slate-700/60 rounded border border-slate-300/60 dark:border-slate-600/60">
              ⌘K
            </span>
          )}
        </div>
      </div>

      {/* Dropdown Results / Suggestions Menu */}
      {isOpen && (
        <div
          id="navbar-search-results-menu"
          className={`absolute z-50 mt-2 left-0 right-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 ${
            isMobileDrawer ? 'max-w-full' : 'sm:w-96 sm:-right-16 lg:right-0 sm:left-auto'
          }`}
          style={{ maxHeight: '72vh' }}
        >
          {/* Header strip */}
          <div className="px-3.5 py-2 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>
              {query.trim()
                ? `${results.length} result${results.length === 1 ? '' : 's'} for "${query}"`
                : 'Quick Clinic Directory'}
            </span>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Press <kbd className="font-mono bg-slate-200 dark:bg-slate-700 px-1 rounded">Esc</kbd> to close
            </span>
          </div>

          <div className="overflow-y-auto max-h-80 divide-y divide-slate-100 dark:divide-slate-800/60">
            {/* Case 1: Query has results */}
            {query.trim() && results.length > 0 && (
              results.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectItem(item)}
                  className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors group flex items-start gap-3"
                >
                  <div className="mt-0.5 p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors shrink-0">
                    {getCategoryIcon(item.category)}
                  </div>

                  <div className="grow min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors">
                        {item.title}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getCategoryBadge(
                            item.category
                        )}`}
                      >
                        {item.category}
                      </span>
                    </div>

                    {item.subtitle && (
                      <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                        {item.subtitle}
                      </p>
                    )}

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Action pill buttons */}
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleSelectItem(item)}
                        className="text-[11px] font-semibold text-blue-600 dark:text-sky-400 hover:underline inline-flex items-center gap-1"
                      >
                        <span>{item.actionLabel || 'View Info'}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      {item.serviceTitleForBooking && (
                        <button
                          type="button"
                          onClick={(e) => handleBookFromSearch(e, item)}
                          className="text-[11px] font-bold bg-blue-600 hover:bg-blue-700 text-white px-2 py-0.5 rounded shadow-xs ml-auto"
                        >
                          Book Slot
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Case 2: Query has no results */}
            {query.trim() && results.length === 0 && (
              <div className="p-6 text-center">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center mb-2.5">
                  <Search className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  No matches for &ldquo;{query}&rdquo;
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
                  Try searching with medical keywords like <em>RCT</em>, <em>Cleaning</em>, <em>Braces</em>, or <em>Timings</em>.
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-left">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Suggested Searches
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {popularKeywords.slice(0, 4).map((kw) => (
                      <button
                        key={kw}
                        type="button"
                        onClick={() => setQuery(kw)}
                        className="text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-md transition-colors"
                      >
                        {kw}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Case 3: Empty query (Initial open state / Popular suggestions) */}
            {!query.trim() && (
              <div className="p-3.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Popular Searches
                </span>
                <div className="flex flex-wrap gap-1.5 mb-3.5">
                  {popularKeywords.map((kw) => (
                    <button
                      key={kw}
                      type="button"
                      onClick={() => setQuery(kw)}
                      className="text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-700 dark:bg-slate-800 dark:hover:bg-blue-900/30 dark:hover:text-blue-300 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-md transition-colors"
                    >
                      {kw}
                    </button>
                  ))}
                </div>

                <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div
                    onClick={() => {
                      setIsOpen(false);
                      onOpenAppointment();
                    }}
                    className="p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between text-xs transition-colors"
                  >
                    <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span>Book Online Appointment</span>
                    </div>
                    <span className="text-slate-400 text-[11px]">Instant</span>
                  </div>

                  <div
                    onClick={() => {
                      setIsOpen(false);
                      const contactEl = document.querySelector('#contact');
                      if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between text-xs transition-colors"
                  >
                    <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span>Check Timings & OPD Schedule</span>
                    </div>
                    <span className="text-slate-400 text-[11px]">Open Today</span>
                  </div>

                  <div
                    onClick={() => {
                      setIsOpen(false);
                      window.location.href = `tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`;
                    }}
                    className="p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between text-xs transition-colors"
                  >
                    <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <span>Helpline: {CLINIC_INFO.phone}</span>
                    </div>
                    <span className="text-slate-400 text-[11px]">Call Now</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
