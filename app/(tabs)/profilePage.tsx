import { Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, View } from '@/common/components/Themed';
import { useTranslation } from 'react-i18next';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../common/constants/Colors';



// Tout doit etre migrer dans la page specifique dans features/...
export default function ProfilePage() {

  const { i18n } = useTranslation();

  const { t } = useTranslation();

  const router = useRouter();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("common:profilePageTitle")}</Text>

      <View>
        <Text style={styles.subtitle}>{t("common:nextTrip")}</Text>

        <View style={styles.imageContainer}>
          <Image source={{ uri: item.photos[0] }} style={styles.bivouacImage} resizeMode="cover" />
        </View>

      </View>

      <View>
        <TouchableOpacity onPress={() => router.push("../profilePage/screens/personalInformationProfile")} style={styles.profileLine}>
          <View style={styles.lineTitle}>
            <Icon name="user-circle-o" size={20} color="black" />
            <Text style={styles.lineText}>{t("common:personalInformation")}</Text>
          </View>
          <Icon name="angle-right" size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("../profilePage/screens/yourPublications")} style={styles.profileLine}>
          <View style={styles.lineTitle}>
            <Icon name="clone" size={20} color="black" />
            <Text style={styles.lineText}>{t("common:Announces")}</Text>
          </View>
          <Icon name="angle-right" size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("../profilePage/screens/reservationHistory")} style={styles.profileLine}>
          <View style={styles.lineTitle}>
            <Icon name="history" size={20} color="black" />
            <Text style={styles.lineText}>{t("common:history")}</Text>
          </View>
          <Icon name="angle-right" size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity  onPress={() => router.push('../profilePage/screens/changeLanguage')} style={styles.profileLine}>
          <View style={styles.lineTitle}>
            <Icon name="language" size={20} color="black" />
            <Text style={styles.lineText}>{t("common:language")}</Text>
          </View>
          <Icon name="angle-right" size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('../profilePage/screens/privacyPolicy')} style={styles.profileLine}>
          <View style={styles.lineTitle}>
            <Icon name="question-circle-o" size={20} color="black" />
            <Text style={styles.lineText}>{t("common:privacyPolicy")}</Text>
          </View>
          <Icon name="angle-right" size={20} color="black" />
        </TouchableOpacity>

      </View>

      <View style={styles.separator} />
      
      <Button title={t("common:logOut")} onPress={() => router.push('../users/screens/login')} />
      
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
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 20,
    width: '100%',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  profileLine: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: 340,
    padding: 10,
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  lineTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  lineText: {
    marginLeft: 15,
    fontSize: 16,
  },
});
