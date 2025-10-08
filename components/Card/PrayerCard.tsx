// src/components/PrayerCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export type PrayerRequest = {
  id: string;
  name?: string;
  message: string;
  isAnonymous: boolean;
  createdAt: Date | any; // can be Date or Firebase Timestamp
};

interface PrayerCardProps {
  prayer: PrayerRequest;
}

const PrayerCard: React.FC<PrayerCardProps> = ({ prayer }) => {
  const nameDisplay = prayer.isAnonymous ? 'Anonymous' : prayer.name || 'Church Member';

  let timeDisplay = 'Just now';
  if (prayer.createdAt instanceof Date) {
    timeDisplay = formatRelativeTime(prayer.createdAt);
  } else if (prayer.createdAt?.toDate) {
    timeDisplay = formatRelativeTime(prayer.createdAt.toDate());
  }

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.name}>{nameDisplay}</Text>
        <Text style={styles.time}>{timeDisplay}</Text>
      </View>
      <Text style={styles.message}>{prayer.message}</Text>
    </View>
  );
};

// Helper function for relative time formatting
const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  // If older than a week, show the actual date
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export default PrayerCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontWeight: '700',
    color: '#111827',
    fontSize: 17,
  },
  time: {
    fontSize: 12,
    color: '#9ca3af',
  },
  message: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 21,
  },
});