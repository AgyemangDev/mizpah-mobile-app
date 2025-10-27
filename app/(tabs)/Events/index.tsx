import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import React from 'react';
import MainHeader from '@/components/header/MainHeader';
import { UpcomingProgram, Program } from '@/assets/data/upcomingProgram';

const formatDays = (days: string[]) => {
  if (days.length > 2) {
    return `${days[0].slice(0, 3)} - ${days[days.length - 1].slice(0, 3)}`;
  }
  return days.map(d => d.slice(0, 3)).join(', ');
};

const Events = () => {
  const renderProgram = ({ item }: { item: Program }) => {
    return (
      <View style={styles.programContainer}>
        {/* Program Image */}
        <Image source={item.image as any} style={styles.programImage} resizeMode="cover" />

        {/* Program Name */}
        <Text style={styles.programName}>{item.name}</Text>

        {/* Program Dates */}
        <Text style={styles.programDates}>
          {item.startDate.toDateString()} - {item.endDate.toDateString()}
        </Text>

        {/* Schedule */}
        {item.schedule.map((schedule, index) => (
          <Text key={index} style={styles.scheduleText}>
            {formatDays(schedule.days)}: {schedule.startTime} - {schedule.endTime}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <MainHeader title="Events" />

      <FlatList
        data={UpcomingProgram}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderProgram}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default Events;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  programContainer: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#e6f0ff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  programImage: {
    width: '100%',
    height: 300, // fixed height for consistent cards
    borderRadius: 12,
    marginBottom: 12,
  },
  programName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
    color: '#003366',
  },
  programDates: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  scheduleText: {
    fontSize: 14,
    color: '#003366',
    marginBottom: 4,
    backgroundColor: '#d0e4ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start', // makes the schedule "tag-like"
  },
});

