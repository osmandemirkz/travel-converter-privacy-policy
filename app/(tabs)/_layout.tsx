import { Tabs } from 'expo-router';
import { Zap } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0a0e27',
          borderTopColor: '#00d9ff',
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: '#00d9ff',
        tabBarInactiveTintColor: '#666',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Converter',
          tabBarIcon: ({ size, color }) => (
            <Zap size={size} color={color} fill={color} />
          ),
        }}
      />
    </Tabs>
  );
}
