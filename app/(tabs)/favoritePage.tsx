import { StyleSheet } from 'react-native';
import { Text, View } from '@/common/components/Themed';
import React from 'react';

// Tout doit etre migrer dans la page specifique dans features/...
export default function FavoritePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page de favoris</Text>
      <View style={styles.separator}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
