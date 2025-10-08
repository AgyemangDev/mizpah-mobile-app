export interface Meeting {
  id: string;
  day: string;
  dayNumber: number;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  session: 'MORNING' | 'EVENING';
}

export const timezoneMap: { [key: string]: { country: string; flag: string; timezone: string } } = {
  'America/New_York': { country: 'USA', flag: '🇺🇸', timezone: 'America/New_York' },
  'America/Jamaica': { country: 'Jamaica', flag: '🇯🇲', timezone: 'America/Jamaica' },
  'Africa/Accra': { country: 'Ghana', flag: '🇬🇭', timezone: 'Africa/Accra' },
  'Africa/Nairobi': { country: 'Kenya', flag: '🇰🇪', timezone: 'Africa/Nairobi' },
  'Europe/London': { country: 'UK', flag: '🇬🇧', timezone: 'Europe/London' },
  'Europe/Paris': { country: 'France', flag: '🇫🇷', timezone: 'Europe/Paris' },
};

export const ZOOM_ID = '3022979645';
export const PASSCODE = 'Pray';
export const ZOOM_LINK = `https://us02web.zoom.us/j/3022979645?pwd=UFIvYTloM09uZ1IyeFZ5TG9RVng0UT09`;