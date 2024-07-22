import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome6 } from '@expo/vector-icons';
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#092635' }}>
    <Tabs.Screen
      name="index"
      options={{
        title: 'Incidencia',
        tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
      }}
    />
      <Tabs.Screen
        name="listado"
        options={{
          title: 'Lista de Incidencias',
          tabBarIcon: ({ color }) => <FontAwesome6 name="table-list" size={24} color={color} />
          ,
        }}
      />
    </Tabs>
  );
}
