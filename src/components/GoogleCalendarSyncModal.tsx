import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  Plus,
  Clock,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  LogOut,
  RefreshCw,
  X,
  ChevronRight
} from 'lucide-react';
import { User } from 'firebase/auth';
import { initAuth, googleSignIn, logout, getAccessToken } from '../services/googleAuth';
import {
  listUpcomingCalendarAppointments,
  createCalendarAppointment,
  CalendarEvent
} from '../services/googleCalendar';
import { CLINIC_INFO } from '../data/clinicData';

interface GoogleCalendarSyncProps {
  // If invoked after booking to auto-add
  pendingBooking?: {
    patientName: string;
    patientPhone: string;
    serviceTitle: string;
    dateStr: string;
    timeSlotStr: string;
    notes?: string;
    bookingId: string;
  } | null;
  onEventAdded?: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleCalendarSyncModal: React.FC<GoogleCalendarSyncProps> = ({
  pendingBooking,
  onEventAdded,
  isOpen,
  onClose,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [addedSuccessLink, setAddedSuccessLink] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = initAuth(
      (authedUser, userToken) => {
        setUser(authedUser);
        setToken(userToken);
      },
      () => {
        setUser(null);
        setToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Fetch upcoming clinic events if token is present
  const fetchEvents = async () => {
    try {
      setIsSyncing(true);
      const items = await listUpcomingCalendarAppointments();
      setEvents(items);
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchEvents();
    }
  }, [token]);

  if (!isOpen) return null;

  const handleSignIn = async () => {
    try {
      setIsLoadingAuth(true);
      setStatusMessage(null);
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setToken(res.accessToken);
        setStatusMessage({ type: 'success', text: `Connected as ${res.user.displayName || res.user.email}!` });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Google Sign-in failed';
      setStatusMessage({ type: 'error', text: msg });
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      setUser(null);
      setToken(null);
      setEvents([]);
      setStatusMessage({ type: 'info', text: 'Signed out of Google account.' });
    } catch (err: unknown) {
      console.error(err);
    }
  };

  const handleAddPendingToCalendar = async () => {
    if (!pendingBooking) return;
    try {
      setIsSyncing(true);
      setStatusMessage(null);
      setAddedSuccessLink(null);

      const created = await createCalendarAppointment(pendingBooking);
      setStatusMessage({
        type: 'success',
        text: `Successfully scheduled in your Google Calendar for ${pendingBooking.dateStr}!`,
      });
      if (created.htmlLink) {
        setAddedSuccessLink(created.htmlLink);
      }
      if (onEventAdded) onEventAdded();
      await fetchEvents();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to add appointment to Google Calendar';
      setStatusMessage({ type: 'error', text: msg });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div
      id="google-calendar-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="google-calendar-modal-card"
        className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 relative my-6 text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-xs">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-blue-950">
                Google Calendar Integration
              </h3>
              <p className="text-xs text-slate-500">
                Sync appointments & set automated patient reminders
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Alert if any */}
        {statusMessage && (
          <div
            className={`p-3 rounded-lg text-xs flex items-start gap-2.5 mb-4 ${
              statusMessage.type === 'success'
                ? 'bg-blue-50 border border-blue-200 text-blue-800'
                : statusMessage.type === 'error'
                ? 'bg-red-50 border border-red-200 text-red-700'
                : 'bg-slate-50 border border-slate-200 text-slate-700'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            )}
            <div className="grow">
              <p className="font-medium">{statusMessage.text}</p>
              {addedSuccessLink && (
                <a
                  href={addedSuccessLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold underline mt-1 text-blue-700 hover:text-blue-900"
                >
                  <span>Open in Google Calendar</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        )}

        {/* Auth State Panel */}
        {!user || !token ? (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center mb-4">
            <p className="text-xs text-slate-600 mb-3.5 leading-relaxed">
              Connect your Google account with permission to add scheduled dental appointments, OPD follow-ups, and receive 24-hour and 1-hour notifications directly to your phone.
            </p>

            {/* Official Google Material Button */}
            <button
              id="google-signin-btn"
              onClick={handleSignIn}
              disabled={isLoadingAuth}
              className="inline-flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-4 py-2.5 rounded-lg border border-slate-300 shadow-xs text-xs sm:text-sm cursor-pointer transition-all hover:shadow w-full disabled:opacity-60"
            >
              <svg className="w-4 h-4" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
              <span>{isLoadingAuth ? 'Connecting Google Calendar...' : 'Sign in with Google'}</span>
            </button>
          </div>
        ) : (
          <div className="bg-blue-50/60 border border-blue-200/80 rounded-xl p-3.5 mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'Google User'}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full border border-blue-300"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                  {(user.displayName || user.email || 'G')[0].toUpperCase()}
                </div>
              )}
              <div className="min-w-0">
                <p className="text-xs font-bold text-blue-950 truncate">
                  {user.displayName || 'Connected Account'}
                </p>
                <p className="text-[11px] text-blue-700 truncate">{user.email}</p>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-red-600 px-2 py-1 rounded-md hover:bg-white/80 transition-colors cursor-pointer"
              title="Disconnect Google Account"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Disconnect</span>
            </button>
          </div>
        )}

        {/* If pending booking is available to add */}
        {pendingBooking && (
          <div className="border border-blue-200 bg-blue-50/30 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800">
                Pending Consultation Ready To Add
              </span>
              <span className="text-xs font-mono font-bold text-blue-900">
                {pendingBooking.bookingId}
              </span>
            </div>

            <div className="text-xs space-y-1 text-slate-700 mb-3.5">
              <p><strong>Patient:</strong> {pendingBooking.patientName} ({pendingBooking.patientPhone})</p>
              <p><strong>Treatment:</strong> {pendingBooking.serviceTitle}</p>
              <p><strong>Date & Slot:</strong> {pendingBooking.dateStr} • {pendingBooking.timeSlotStr}</p>
            </div>

            <button
              onClick={handleAddPendingToCalendar}
              disabled={!token || isSyncing}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white py-2.5 px-4 rounded-lg font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
            >
              <CalendarIcon className="w-4 h-4" />
              <span>
                {isSyncing
                  ? 'Adding to Calendar...'
                  : !token
                  ? 'Sign in with Google above to Add'
                  : 'Add to My Google Calendar'}
              </span>
            </button>
          </div>
        )}

        {/* Upcoming Dental Calendar Events from user's primary calendar */}
        {token && (
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2.5">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5 text-blue-600" />
                <span>Your Scheduled Dental Appointments</span>
              </h4>
              <button
                onClick={fetchEvents}
                disabled={isSyncing}
                className="text-[11px] text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer"
                title="Refresh events"
              >
                <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>Sync</span>
              </button>
            </div>

            {events.length === 0 ? (
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
                No upcoming dental appointments found for Shree Bhagwati Dental Clinic in your Google Calendar.
              </div>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {events.map((evt) => (
                  <div
                    key={evt.id}
                    className="p-2.5 rounded-lg border border-slate-200 hover:border-blue-300 bg-white hover:bg-slate-50 text-xs transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-bold text-slate-900">{evt.summary}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-blue-600" />
                          <span>
                            {evt.start.dateTime
                              ? new Date(evt.start.dateTime).toLocaleString([], {
                                  dateStyle: 'medium',
                                  timeStyle: 'short',
                                })
                              : evt.start.date}
                          </span>
                        </p>
                      </div>

                      {evt.htmlLink && (
                        <a
                          href={evt.htmlLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 text-slate-400 hover:text-blue-600 rounded transition-colors"
                          title="Open in Google Calendar"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
