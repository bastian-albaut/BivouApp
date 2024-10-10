import { Button, StyleSheet } from 'react-native';
import { Text, View } from '@/common/components/Themed';
import { useTranslation } from 'react-i18next';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';


// Tout doit etre migrer dans la page specifique dans features/...
export default function ProfilePage() {

  const { i18n } = useTranslation();

  const router = useRouter();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page de profil utilisateur</Text>
      <View style={styles.separator} />
      <Button title="French" onPress={() => changeLanguage('fr')} />
      <Button title="English" onPress={() => changeLanguage('en')} />
      
      <Button title="Login" onPress={() => router.push('../login')} />
      
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
