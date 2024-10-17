import { Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/common/components/Themed';
import { useTranslation } from 'react-i18next';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../common/constants/Colors';



// Tout doit etre migrer dans la page specifique dans features/...
export default function LanguagePage() {

  const { i18n } = useTranslation();

  const router = useRouter();
  const { t } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('common:language')}</Text>

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
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 20,
    width: '100%',
    textAlign: 'left',
    paddingLeft: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
