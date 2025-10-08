export const getESTTime = (): Date => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  };
  const parts = new Intl.DateTimeFormat('en-US', options).formatToParts(now);
  const dateParts: { [key: string]: number } = {};
 
  parts.forEach((part) => {
    if (part.type !== 'literal') {
      dateParts[part.type] = parseInt(part.value, 10);
    }
  });
  return new Date(
    dateParts.year!,
    dateParts.month! - 1,
    dateParts.day!,
    dateParts.hour!,
    dateParts.minute!,
    dateParts.second!
  );
};

export const convertESTToLocal = (
  estHour: number,
  estMinute: number,
  userTimezone: string
): { hour: number; minute: number; dayOffset: number } => {
  // Get the current real-world UTC time
  const nowUtc = new Date();
  
  // Get EST time components for today
  const estNow = getESTTime();
  
  // Calculate what the meeting time would be in UTC
  // First, get UTC time when it's the specified EST time
  const estDate = new Date(Date.UTC(
    estNow.getFullYear(),
    estNow.getMonth(),
    estNow.getDate(),
    estHour,
    estMinute,
    0,
    0
  ));
  
  // Get the offset between EST and UTC
  // Format the same instant in both timezones and compare
  const estFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  
  const utcFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  
  // Use a reference time to calculate offset
  const refTime = new Date();
  const estTime = estFormatter.format(refTime);
  const utcTime = utcFormatter.format(refTime);
  
  const [estH, estM] = estTime.split(':').map(Number);
  const [utcH, utcM] = utcTime.split(':').map(Number);
  
  let offsetHours = utcH - estH;
  if (offsetHours < -12) offsetHours += 24;
  if (offsetHours > 12) offsetHours -= 24;
  
  // Create actual UTC time for the meeting
  const meetingUtc = new Date(Date.UTC(
    estNow.getFullYear(),
    estNow.getMonth(),
    estNow.getDate(),
    estHour + offsetHours,
    estMinute,
    0,
    0
  ));
  
  // Convert to user's local timezone
  const localFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: userTimezone,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });
  
  const localParts = localFormatter.formatToParts(meetingUtc);
  const local: { [key: string]: number } = {};
  
  localParts.forEach((part) => {
    if (part.type !== 'literal') {
      local[part.type] = parseInt(part.value, 10);
    }
  });
  
  // Calculate day offset
  const estDay = estNow.getDate();
  const localDay = local.day!;
  let dayOffset = localDay - estDay;
  
  if (dayOffset > 1) {
    dayOffset = -1;
  } else if (dayOffset < -1) {
    dayOffset = 1;
  }

  return {
    hour: local.hour!,
    minute: local.minute!,
    dayOffset,
  };
};