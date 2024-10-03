import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';

export default function SearchPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page de recherche</Text>
      <View style={styles.separator} />
      <Text>Il y a un exemple en haut à droite de comment intégrer une modal. Je l'ai laissé si jamais ça nous sert :)</Text>
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

