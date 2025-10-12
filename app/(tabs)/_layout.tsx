import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ArticlesProvider } from '@/context/ArticlesContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <ArticlesProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
        }}
      >
        {/* Home */}
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
          }}
        />

        {/* Events */}
        <Tabs.Screen
          name="Events"
          options={{
            title: 'Events',
            tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />,
          }}
        />

        {/* Sermons */}
        <Tabs.Screen
          name="Sermons"
          options={{
            title: 'Sermons',
            tabBarIcon: ({ color, size }) => <Ionicons name="musical-notes" size={size} color={color} />,
          }}
        />

        {/* Bible */}
        <Tabs.Screen
          name="Bible"
          options={{
            title: 'Bible',
            tabBarIcon: ({ color, size }) => <Ionicons name="book" size={size} color={color} />,
          }}
        />

        {/* Giving */}
        <Tabs.Screen
          name="Giving"
          options={{
            title: 'Giving',
            tabBarIcon: ({ color, size }) => <Ionicons name="gift" size={size} color={color} />,
          }}
        />
      </Tabs>
    </ArticlesProvider>
  );
}
