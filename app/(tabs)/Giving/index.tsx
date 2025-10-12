import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router'; // <-- Import router
import MainHeader from '@/components/header/MainHeader';
import PaymentCard from '@/components/Card/PaymentCard';

const Giving = () => {
  const router = useRouter();

  const handleViewGallery = () => {
    router.push('/Gallery'); // <-- Navigate to Gallery screen
  };

  return (
    <View style={styles.container}>
      <MainHeader title="Giving" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Spiritual Quote Section */}
        <View style={styles.quoteSection}>
          <Text style={styles.quoteText}>
            "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
          </Text>
          <Text style={styles.quoteReference}>— 2 Corinthians 9:7</Text>
        </View>

        <Text style={styles.sectionTitle}>Choose Payment Method</Text>
        <PaymentCard />

        {/* About Section */}
        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>Our Mission</Text>
          <Text style={styles.aboutText}>
            Your generous contributions help us spread the Gospel, support our community outreach programs, 
            and maintain our church facilities. Every gift, no matter the size, makes a meaningful impact 
            in advancing God's kingdom and touching lives.
          </Text>
          <Text style={styles.aboutText}>
            We are committed to transparency and faithful stewardship of all donations received.
          </Text>

          {/* Gallery Button */}
          <TouchableOpacity style={styles.galleryButton} onPress={handleViewGallery}>
            <Text style={styles.galleryButtonText}>View Our Ministry Gallery</Text>
          </TouchableOpacity>
        </View>

        {/* Blessing Section */}
        <View style={styles.blessingSection}>
          <Text style={styles.blessingText}>
            "Give, and it will be given to you. A good measure, pressed down, shaken together and running over."
          </Text>
          <Text style={styles.blessingReference}>— Luke 6:38</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Giving;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  scrollView: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  quoteSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#7C3AED',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quoteText: { fontSize: 16, color: '#374151', fontStyle: 'italic', lineHeight: 24, marginBottom: 8 },
  quoteReference: { fontSize: 14, color: '#7C3AED', fontWeight: '600', textAlign: 'right' },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#111827', marginBottom: 16 },
  aboutSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  aboutTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 12 },
  aboutText: { fontSize: 14, color: '#4B5563', lineHeight: 22, marginBottom: 12 },
  galleryButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 8,
    alignItems: 'center',
  },
  galleryButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  blessingSection: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  blessingText: { fontSize: 14, color: '#4B5563', fontStyle: 'italic', lineHeight: 21, textAlign: 'center', marginBottom: 6 },
  blessingReference: { fontSize: 13, color: '#7C3AED', fontWeight: '600', textAlign: 'center' },
});
