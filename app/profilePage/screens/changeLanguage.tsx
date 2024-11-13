import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/common/components/Themed';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../../common/constants/Colors';
import { useState } from 'react';

export default function LanguagePage() {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const router = useRouter();
  const { t } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setSelectedLanguage(lang);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('common:language')}</Text>

      <TouchableOpacity 
        style={[styles.languageOption, selectedLanguage === 'fr' && styles.selectedOption]}
        onPress={() => changeLanguage('fr')}
      >
        <Text style={styles.languageText}>Français (France)</Text>
        <Icon
          name={selectedLanguage === 'fr' ? 'dot-circle-o' : 'circle-o'}
          size={24}
          color={Colors.black}
          style={styles.radioIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.languageOption, selectedLanguage === 'en' && styles.selectedOption]}
        onPress={() => changeLanguage('en')}
      >
        <Text style={styles.languageText}>English (UK)</Text>
        <Icon
          name={selectedLanguage === 'en' ? 'dot-circle-o' : 'circle-o'}
          size={24}
          color={Colors.black}
          style={styles.radioIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: Colors.white,
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
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: 340,
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
  },
  selectedOption: {
    backgroundColor: Colors.white, // Option sélectionnée mise en surbrillance
  },
  languageText: {
    fontSize: 18,
    color: Colors.black,
  },
  radioIcon: {
    marginLeft: 10,
  },
});