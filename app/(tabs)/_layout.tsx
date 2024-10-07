import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/common/constants/Colors';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  focused: boolean
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} color={props.focused ? Colors.green1 : Colors.green3} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.green1
      }}>
      <Tabs.Screen
        name="favoritePage"
        options={{
          title: 'Favoris',
          tabBarIcon: ({ focused }) => <TabBarIcon name="heart" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="addBivouakPage"
        options={{
          title: 'Ajouter un bivouak',
          tabBarIcon: ({ focused }) => <TabBarIcon name="plus-circle" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Chercher',
          tabBarIcon: ({ focused }) => <TabBarIcon name="search" focused={focused} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors.green3}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="profilePage"
        options={{
          title: 'Page de profil',
          tabBarIcon: ({ focused }) => <TabBarIcon name="user-circle" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
