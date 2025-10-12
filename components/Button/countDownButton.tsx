import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking } from 'react-native';
import { Meeting, timezoneMap, ZOOM_ID, PASSCODE, ZOOM_LINK } from '@/assets/data/meetingConfig';
import { meetings } from '@/assets/data/meetingData';
import { getESTTime, convertESTToLocal } from '@/utils/timezoneUtils';

// Helper function to find next meeting (defined outside component)
const findInitialMeeting = (): Meeting | null => {
  const now = getESTTime();
  const currentDay = now.getDay();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeInMinutes = currentHour * 60 + currentMinute;

  for (const meeting of meetings) {
    if (meeting.dayNumber === currentDay) {
      const startTimeInMinutes = meeting.startHour * 60 + meeting.startMinute;
      const endTimeInMinutes = meeting.endHour * 60 + meeting.endMinute;

      if (currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes < endTimeInMinutes) {
        return meeting;
      }
    }
  }

  let upcoming: Meeting | null = null;

  for (const meeting of meetings) {
    if (meeting.dayNumber === currentDay) {
      const startTimeInMinutes = meeting.startHour * 60 + meeting.startMinute;
      if (startTimeInMinutes > currentTimeInMinutes) {
        if (!upcoming || startTimeInMinutes < (upcoming.startHour * 60 + upcoming.startMinute)) {
          upcoming = meeting;
        }
      }
    }
  }

  if (!upcoming) {
    for (let i = 1; i <= 7; i++) {
      const checkDay = (currentDay + i) % 7;
      const dayMeetings = meetings.filter(m => m.dayNumber === checkDay);
      if (dayMeetings.length > 0) {
        upcoming = dayMeetings[0];
        break;
      }
    }
  }

  return upcoming;
};

const MeetingCountdown: React.FC = () => {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [currentTime, setCurrentTime] = useState(getESTTime());
  const [nextMeeting, setNextMeeting] = useState<Meeting | null>(findInitialMeeting());
  const [isOngoing, setIsOngoing] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getESTTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    findNextMeeting();
  }, [currentTime]);

  const findNextMeeting = () => {
    const now = getESTTime();
    const currentDay = now.getDay();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    for (const meeting of meetings) {
      if (meeting.dayNumber === currentDay) {
        const startTimeInMinutes = meeting.startHour * 60 + meeting.startMinute;
        const endTimeInMinutes = meeting.endHour * 60 + meeting.endMinute;

        if (currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes < endTimeInMinutes) {
          setNextMeeting(meeting);
          setIsOngoing(true);
          return;
        }
      }
    }

    setIsOngoing(false);
    let upcoming: Meeting | null = null;

    for (const meeting of meetings) {
      if (meeting.dayNumber === currentDay) {
        const startTimeInMinutes = meeting.startHour * 60 + meeting.startMinute;
        if (startTimeInMinutes > currentTimeInMinutes) {
          if (!upcoming || startTimeInMinutes < (upcoming.startHour * 60 + upcoming.startMinute)) {
            upcoming = meeting;
          }
        }
      }
    }

    if (!upcoming) {
      for (let i = 1; i <= 7; i++) {
        const checkDay = (currentDay + i) % 7;
        const dayMeetings = meetings.filter(m => m.dayNumber === checkDay);
        if (dayMeetings.length > 0) {
          upcoming = dayMeetings[0];
          break;
        }
      }
    }

    setNextMeeting(upcoming);
    if (upcoming) {
      calculateCountdown(upcoming);
    }
  };

  const calculateCountdown = (meeting: Meeting) => {
    const now = getESTTime();
    
    // Create target date in EST timezone
    let daysUntil = meeting.dayNumber - now.getDay();
    if (daysUntil < 0) {
      daysUntil += 7;
    } else if (daysUntil === 0) {
      const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();
      const meetingTimeInMinutes = meeting.startHour * 60 + meeting.startMinute;
      if (currentTimeInMinutes >= meetingTimeInMinutes) {
        daysUntil = 7;
      }
    }

    // Create the target date properly
    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() + daysUntil);
    targetDate.setHours(meeting.startHour, meeting.startMinute, 0, 0);

    // Calculate difference in milliseconds
    const diff = targetDate.getTime() - now.getTime();
    
    // Ensure diff is positive
    if (diff < 0) {
      setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setCountdown({ days, hours, minutes, seconds });
  };

  const formatTime = (hour: number, minute: number): string => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    const displayMinute = minute.toString().padStart(2, '0');
    return `${displayHour}:${displayMinute}${period}`;
  };

  const getLocalMeetingTime = (meeting: Meeting): string => {
    const localStart = convertESTToLocal(meeting.startHour, meeting.startMinute, userTimezone);
    const localEnd = convertESTToLocal(meeting.endHour, meeting.endMinute, userTimezone);
    
    return `${formatTime(localStart.hour, localStart.minute)} - ${formatTime(localEnd.hour, localEnd.minute)}`;
  };

  const getLocalDayName = (meeting: Meeting): string => {
    const localStart = convertESTToLocal(meeting.startHour, meeting.startMinute, userTimezone);
    
    if (localStart.dayOffset === 1) {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return days[(meeting.dayNumber + 1) % 7];
    } else if (localStart.dayOffset === -1) {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return days[(meeting.dayNumber - 1 + 7) % 7];
    }
    
    return meeting.day;
  };

  const handleJoinMeeting = () => {
    Linking.openURL(ZOOM_LINK);
  };

  if (!nextMeeting) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingButton}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    );
  }

  const localMeetingTime = getLocalMeetingTime(nextMeeting);
  const localDayName = getLocalDayName(nextMeeting);

return (
  <View style={styles.container}>
    {isOngoing ? (
      <TouchableOpacity style={styles.ongoingButton} onPress={handleJoinMeeting}>
        <Text style={styles.ongoingIcon}>🔴</Text>
        <Text style={styles.ongoingTitle}>Meeting In Progress</Text>
        <Text style={styles.ongoingSubtitle}>Tap to Join Now</Text>
      </TouchableOpacity>
    ) : (
      <View style={styles.countdownWrapper}>
        <TouchableOpacity style={styles.countdownButton}>
          <Text style={styles.nextMeetingLabel}>Next Meeting</Text>
          <Text style={styles.meetingDetails}>
            {localDayName} {nextMeeting.session} • {localMeetingTime}
          </Text>
          <View style={styles.countdownRow}>
            <View style={styles.timeUnit}>
              <Text style={styles.timeNumber}>{countdown.days}</Text>
              <Text style={styles.timeLabel}>d</Text>
            </View>
            <Text style={styles.timeSeparator}>:</Text>
            <View style={styles.timeUnit}>
              <Text style={styles.timeNumber}>{countdown.hours}</Text>
              <Text style={styles.timeLabel}>h</Text>
            </View>
            <Text style={styles.timeSeparator}>:</Text>
            <View style={styles.timeUnit}>
              <Text style={styles.timeNumber}>{countdown.minutes}</Text>
              <Text style={styles.timeLabel}>m</Text>
            </View>
            <Text style={styles.timeSeparator}>:</Text>
            <View style={styles.timeUnit}>
              <Text style={styles.timeNumber}>{countdown.seconds}</Text>
              <Text style={styles.timeLabel}>s</Text>
            </View>
          </View>
                  <TouchableOpacity style={styles.joinMeetingButton} onPress={handleJoinMeeting}>
          <Text style={styles.joinMeetingText}>Click to Join Meeting</Text>
        </TouchableOpacity>
        </TouchableOpacity>

        {/* 👇 Add this new "Click to Join Meeting" section */}

      </View>
    )}
  </View>
);

};

export default MeetingCountdown;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    width:"91%"
  },
  loadingButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
  },
  ongoingButton: {
    backgroundColor: '#16A34A',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  ongoingIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  ongoingTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ongoingSubtitle: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
  },
countdownButton: {
  backgroundColor: '#7C3AED',
  borderRadius: 16,
  padding: 20,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 8,
  width:"100%"
},
  nextMeetingLabel: {
    color: '#FDE047',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  meetingDetails: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  countdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeUnit: {
    alignItems: 'center',
    minWidth: 40,
  },
  timeNumber: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  timeLabel: {
    color: '#FDE047',
    fontSize: 10,
    marginTop: 2,
  },
  timeSeparator: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 4,
    opacity: 0.6,
  },
  joinMeetingButton: {
  marginTop: 12,
  backgroundColor: '#10B981',
  borderRadius: 12,
  paddingVertical: 10,
  paddingHorizontal: 20,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.25,
  shadowRadius: 5,
  elevation: 4,
},
joinMeetingText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '600',
  letterSpacing: 0.5,
},
countdownWrapper: {
  alignItems: 'center',
},

});