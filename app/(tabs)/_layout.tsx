import { COLORS } from '@/constants/theme';
import { HapticTab } from '@/src/components/haptic-tab';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 20,
          height: 100,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home Screen',
          tabBarIcon: ({ color }) =>
          <Ionicons name="home" size={24} color={color} />
        }}
      />

      <Tabs.Screen
        name="ChatListScreen"
        options={{
          title: 'Chat List',
          tabBarIcon: ({ color }) => 
            <Ionicons name="chatbox-ellipses" size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="SettingsScreen"
        options={{
          title: 'Settings Screen',
          tabBarIcon: ({ color }) =>
            <Ionicons name="settings" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
