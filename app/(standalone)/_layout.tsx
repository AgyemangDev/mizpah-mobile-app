import React from 'react';
import { Stack } from 'expo-router';

export default function StandAloneLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        presentation: 'card',
      }}
    />
  );
}
