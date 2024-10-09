import { Button, StyleSheet } from 'react-native';
import { Text, View } from '@/common/components/Themed';
import { useTranslation } from 'react-i18next';

export default function ProfilePage() {

  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page de profil utilisateur</Text>
      <View style={styles.separator} />
      <Button title="French" onPress={() => changeLanguage('fr')} />
      <Button title="English" onPress={() => changeLanguage('en')} />
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
