import { getAccessToken } from './googleAuth';
import { CLINIC_INFO } from '../data/clinicData';

export interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  location?: string;
  start: {
    dateTime?: string;
    date?: string;
    timeZone?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
    timeZone?: string;
  };
  htmlLink?: string;
  status?: string;
}

export interface CreateEventParams {
  patientName: string;
  patientPhone: string;
  serviceTitle: string;
  dateStr: string; // YYYY-MM-DD
  timeSlotStr: string;
  notes?: string;
  bookingId: string;
}

/**
 * Parses timeSlotStr e.g. "Morning (10:00 AM - 1:00 PM)" into start and end Date objects
 */
function parseSlotToTime(dateStr: string, timeSlotStr: string): { startISO: string; endISO: string } {
  let startHour = 10;
  let startMin = 0;
  let endHour = 11;
  let endMin = 0;

  if (timeSlotStr.includes('Morning')) {
    startHour = 10;
    startMin = 0;
    endHour = 11;
    endMin = 0;
  } else if (timeSlotStr.includes('Evening')) {
    startHour = 17; // 5:00 PM
    startMin = 0;
    endHour = 18;
    endMin = 0;
  } else if (timeSlotStr.includes('Emergency')) {
    const now = new Date();
    startHour = Math.min(Math.max(now.getHours() + 1, 10), 19);
    startMin = 0;
    endHour = startHour + 1;
    endMin = 0;
  }

  const [year, month, day] = dateStr.split('-').map(Number);
  const startDate = new Date(year, month - 1, day, startHour, startMin, 0);
  const endDate = new Date(year, month - 1, day, endHour, endMin, 0);

  return {
    startISO: startDate.toISOString(),
    endISO: endDate.toISOString(),
  };
}

/**
 * Adds an appointment event directly to the user's primary Google Calendar
 */
export async function createCalendarAppointment(params: CreateEventParams): Promise<CalendarEvent> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Google Calendar access token is missing. Please sign in with Google first.');
  }

  const { startISO, endISO } = parseSlotToTime(params.dateStr, params.timeSlotStr);

  const eventPayload = {
    summary: `Dental Appointment: ${params.serviceTitle} - Dr. Rohan Gupta`,
    description: `🦷 Shree Bhagwati Dental Clinic Appointment
Patient: ${params.patientName}
Phone: ${params.patientPhone}
Treatment: ${params.serviceTitle}
Slot: ${params.timeSlotStr}
Booking Ref: ${params.bookingId}
${params.notes ? `Patient Concern: ${params.notes}\n` : ''}
Doctor: Dr. Rohan Gupta (BDS, Dental Surgeon)
Clinic Address: ${CLINIC_INFO.address}, Rohtak, Haryana
Clinic Helpline: ${CLINIC_INFO.phone}
Clinic WhatsApp: https://wa.me/${CLINIC_INFO.whatsappNumber}`,
    location: `${CLINIC_INFO.name}, ${CLINIC_INFO.address}, Rohtak, Haryana`,
    start: {
      dateTime: startISO,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata',
    },
    end: {
      dateTime: endISO,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata',
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'popup', minutes: 60 },
        { method: 'popup', minutes: 1440 }, // 24 hours prior
      ],
    },
    colorId: '9', // Blueberry / Deep Blue in Google Calendar
  };

  const response = await fetch(
    'https://www.googleapis.com/calendar/v3/calendars/primary/events',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventPayload),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData?.error?.message || `Failed to create Google Calendar event (${response.status})`
    );
  }

  return response.json();
}

/**
 * List upcoming dental appointments from user's Google Calendar
 */
export async function listUpcomingCalendarAppointments(): Promise<CalendarEvent[]> {
  const token = await getAccessToken();
  if (!token) {
    return [];
  }

  const timeMin = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const url = new URL('https://www.googleapis.com/calendar/v3/calendars/primary/events');
  url.searchParams.append('timeMin', timeMin);
  url.searchParams.append('q', 'Shree Bhagwati Dental Clinic');
  url.searchParams.append('singleEvents', 'true');
  url.searchParams.append('orderBy', 'startTime');
  url.searchParams.append('maxResults', '15');

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.error('Error fetching calendar events', response.statusText);
    return [];
  }

  const data = await response.json();
  return (data.items || []) as CalendarEvent[];
}
