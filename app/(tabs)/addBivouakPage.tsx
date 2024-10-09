import { StyleSheet } from 'react-native';

import { Text, View } from '@/common/components/Themed';

// Tout doit etre migrer dans la page specifique dans features/...
export default function SearchPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page d'ajout de bivouak</Text>
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
