import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import MainHeader from '@/components/header/MainHeader';
import RequestPrayerTab from '@/components/Tabs/RequestPrayerTab';
import PrayForOthersTab from '@/components/Tabs/PrayForOthersTab';
import mockPrayers from '@/assets/data/mockPrayers';

const Prayers = () => {
  const router = useRouter();
  const params = useLocalSearchParams() as { id?: string };
  const id = params.id;

  const [activeTab, setActiveTab] = useState<'request' | 'pray'>('request');

  useEffect(() => {
    if (id === 'pray') setActiveTab('pray');
    else setActiveTab('request');
  }, [id]);

  const handleTabSwitch = (tab: 'request' | 'pray') => {
    setActiveTab(tab);
    router.setParams({ id: tab }); // ✅ update param without breaking gestures
  };

  return (
    <View style={styles.container}>
      <MainHeader title="Prayer" onNavigateBack={() => router.back()} />

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'request' && styles.activeTab]}
          onPress={() => handleTabSwitch('request')}
        >
          <Text style={[styles.tabText, activeTab === 'request' && styles.activeTabText]}>
            Request Prayer
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'pray' && styles.activeTab]}
          onPress={() => handleTabSwitch('pray')}
        >
          <Text style={[styles.tabText, activeTab === 'pray' && styles.activeTabText]}>
            Pray for Others
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <View style={[styles.contentContainer, { flex: 1 }]}>
        {activeTab === 'request' ? <RequestPrayerTab /> : <PrayForOthersTab prayers={mockPrayers} />}
      </View>
    </View>
  );
};

export default Prayers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#7C3AED',
  },
  tabText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#7C3AED',
    fontWeight: '700',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
});
