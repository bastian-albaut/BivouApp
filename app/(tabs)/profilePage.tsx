import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, View } from '@/common/components/Themed';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../common/constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/common/store/store';
import { fetchReservations } from '@/common/store/slices/reservationsSlice';
import { fetchAllBivouacData } from '@/common/api/bivouac/bivouacsApi';
import { getUserId } from '@/common/utils/authStorage';
import { removeToken, removeUserId } from '@/common/utils/authStorage';

export default function ProfilePage() {
  const { i18n, t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [nextReservation, setNextReservation] = useState<any | null>(null);

  const { data: reservations } = useSelector((state: RootState) => state.reservations);
  const { data: bivouacs } = useSelector((state: RootState) => state.bivouacs);

  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const userId = await getUserId();
      setCurrentUserId(Number(userId));
    };
    fetchCurrentUser();
    dispatch(fetchReservations());
    dispatch(fetchAllBivouacData());
  }, [dispatch]);

  useEffect(() => {
    if (reservations.length > 0) {
      const nextReservation = reservations
        ?.filter((reservation) => reservation.userId === currentUserId) // Filter by current user
        ?.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())[0]; // Sort by start date
      if (nextReservation) {
        const bivouac = bivouacs.find((b) => b.bivouacId === nextReservation.bivouacId);
        setNextReservation({ ...nextReservation, bivouac });
      }
    }
  }, [reservations, bivouacs]);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };


  const imageMapping: { [key: number]: any } = {
    1: require('@/assets/images/photo1.jpg'),
    2: require('@/assets/images/photo2.jpg'),
    3: require('@/assets/images/photo3.jpg'),
    4: require('@/assets/images/photo4.jpg'),
    5: require('@/assets/images/photo5.jpg'),
    6: require('@/assets/images/photo6.jpg'),
    7: require('@/assets/images/photo7.jpg'),
    8: require('@/assets/images/photo8.jpg'),
    9: require('@/assets/images/photo9.jpg'),
    10: require('@/assets/images/photo10.jpg'),
    11: require('@/assets/images/photo11.jpg')
  };

  const BivouacImage = ({ bivouacId }: { bivouacId: keyof typeof imageMapping }) => {
    const imageSource = imageMapping[bivouacId];
    return <Image source={imageSource} style={styles.bivouacImage} resizeMode="cover"  />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('common:profilePageTitle')}</Text>
      <Text style={styles.subtitle}>{t('common:nextTrip')}</Text>

      {nextReservation ? (
        <View style={styles.imageContainer}>
          <BivouacImage bivouacId={11} />
          {/* <Image
            source={{ uri: nextReservation.bivouac?.photos?.[0] || 'https://via.placeholder.com/150' }}
            style={styles.image}
            resizeMode="cover"
          /> */}
          <View style={styles.textOverlay}>
            <Text style={styles.textDateNextTrip}>
              {t('common:from')} {new Date(nextReservation.startDate).toLocaleDateString('fr-FR')} {t('common:to')} {new Date(nextReservation.endDate).toLocaleDateString('fr-FR')}
            </Text>
          </View>
        </View>
      ) : (
        <Text>{t('common:noUpcomingTrips')}</Text>
      )}

      <View>
        <TouchableOpacity onPress={() => router.push('../profilePage/screens/personalInformation')} style={styles.profileLine}>
          <View style={styles.lineTitle}>
            <Icon name="user-circle-o" size={20} color="black" />
            <Text style={styles.lineText}>{t('common:personalInformation')}</Text>
          </View>
          <Icon name="angle-right" size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('../profilePage/screens/reservationHistory')} style={styles.profileLine}>
          <View style={styles.lineTitle}>
            <Icon name="history" size={20} color="black" />
            <Text style={styles.lineText}>{t('common:history')}</Text>
          </View>
          <Icon name="angle-right" size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('../profilePage/screens/changeLanguage')} style={styles.profileLine}>
          <View style={styles.lineTitle}>
            <Icon name="language" size={20} color="black" />
            <Text style={styles.lineText}>{t('common:language')}</Text>
          </View>
          <Icon name="angle-right" size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('../profilePage/screens/privacyPolicy')} style={styles.profileLine}>
          <View style={styles.lineTitle}>
            <Icon name="question-circle-o" size={20} color="black" />
            <Text style={styles.lineText}>{t('common:privacyPolicy')}</Text>
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
  bivouacImage: {
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
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
