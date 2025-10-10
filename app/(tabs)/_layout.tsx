import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ArticlesProvider } from '@/context/ArticlesContext'; // <-- import your context

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <ArticlesProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false, // global removal
          tabBarButton: HapticTab,
        }}
      >
        {/* Home Screen */}
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />

        {/* Events Folder */}
        <Tabs.Screen
          name="Events"
          options={{
            headerShown: false,
            title: 'Events',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="calendar.badge.checkmark" color={color} />,
          }}
        />

        {/* Sermons Folder */}
        <Tabs.Screen
          name="Sermons"
          options={{
            headerShown: false,
            title: 'Sermons',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="music.note.list" color={color} />,
          }}
        />

        {/* Bible Folder */}
        <Tabs.Screen
          name="Bible"
          options={{
            headerShown: false,
            title: 'Bible',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="book.fill" color={color} />,
          }}
        />

        {/* Giving Folder */}
        <Tabs.Screen
          name="Giving"
          options={{
            headerShown: false,
            title: 'Giving',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="gift.fill" color={color} />,
          }}
        />
      </Tabs>
    </ArticlesProvider>
  );
}
