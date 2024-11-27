import { Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, View } from '@/common/components/Themed';
import { useTranslation } from 'react-i18next';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../common/constants/Colors';
import { removeToken, removeUserId } from '@/common/utils/authStorage';


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

      <Text style={styles.subtitle}>{t("common:nextTrip")}</Text>

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: "https://picsum.photos/200/300" }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.textOverlay}>
          <Text style={styles.textDateNextTrip}>Du 06/04/2025 au 09/04/2025</Text>
        </View>
      </View>

      <View>
        <TouchableOpacity onPress={() => router.push("../profilePage/screens/personalInformation")} style={styles.profileLine}>
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
      
      <TouchableOpacity onPress={async () => {
        await removeToken();
        await removeUserId();
        router.push('../users/screens/login');
      }}>
        <Text style={styles.logoutButton} >{t("common:logOut")}</Text>
      </TouchableOpacity>
      
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
    marginBottom: 10,
    width: '100%',
    paddingLeft: 20,
  },
  imageContainer: {
    width: '90%',
    height: 220,
    borderRadius: 10,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  textOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: Colors.white,
  },
  textDateNextTrip: {
    color: Colors.white,
  },
  profileLine: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '90%',
    padding: 10,
    marginTop: 10,
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
  logoutButton: {
    marginTop: 25,
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
  },
});

