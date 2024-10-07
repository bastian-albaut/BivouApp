import { StyleSheet } from 'react-native';

import { Text, View } from '@/common/components/Themed';

export default function ProfilePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page de profil utilisateur</Text>
      <View style={styles.separator} />
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
