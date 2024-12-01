import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/common/store/store';
import { fetchReservations } from '@/common/store/slices/reservationsSlice';
import { fetchAllBivouacData } from '@/common/api/bivouac/bivouacsApi';
import Colors from '@/common/constants/Colors';
import { getUserId } from '@/common/utils/authStorage';

export default function ReservationHistory() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  const { data: reservations, loading: reservationsLoading, error: reservationsError } = useSelector(
    (state: RootState) => state.reservations
  );
  const { data: bivouacs, loading: bivouacsLoading, error: bivouacsError } = useSelector(
    (state: RootState) => state.bivouacs
  );

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const userId = await getUserId();
      setCurrentUserId(Number(userId));
    };

    fetchCurrentUser();
    dispatch(fetchReservations());
    dispatch(fetchAllBivouacData());
  }, [dispatch]);

  const mergeAndFilterReservationsByUser = (reservations: any[], bivouacs: any[], currentUserId: number | null) => {
    if (!reservations || !bivouacs) {
      console.warn("Reservations or Bivouacs data is missing.");
      return [];
    }
  
    return reservations
      .filter((reservation) => reservation.userId === currentUserId) // Filter by current user
      .map((reservation) => {
        const bivouac = bivouacs.find((b) => b.bivouacId === reservation.bivouacId);
  
        if (!bivouac) {
          console.warn(`Bivouac with ID ${reservation.bivouacId} not found.`);
        }
  
        return {
          ...reservation,
          bivouac: bivouac || null, // Attach bivouac details, or null if not found
        };
      });
  };
  

  const mergedReservations = mergeAndFilterReservationsByUser(reservations, bivouacs, currentUserId);

  const renderReservation = ({ item }: { item: any }) => {
    const { bivouac } = item;
    return (
      <View style={styles.reservationItem}>
        <Text style={styles.bivouacName}>{"Bivouac en centre-ville"}</Text>
        <Text style={styles.dates}>
          {t('common:from')} {new Date(item.startDate).toLocaleDateString('fr-FR')} {t('common:to')} {new Date(item.endDate).toLocaleDateString('fr-FR')}
        </Text>
        <Text style={styles.price}>{item.price}€</Text>
      </View>
    );
  };

  if (reservationsLoading || bivouacsLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.green1} />
      </View>
    );
  }

  if (reservationsError || bivouacsError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{t('profilePage:fetchError')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('profilePage:historyTitle')}</Text>
      {mergedReservations.length === 0 ? (
        <Text style={styles.noReservationsText}>{t('profilePage:noReservations')}</Text>
      ) : (
        <FlatList
          data={mergedReservations}
          keyExtractor={(item) => item.reservationId.toString()}
          renderItem={renderReservation}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  reservationItem: {
    backgroundColor: Colors.lightGrey,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  bivouacName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
  },
  dates: {
    fontSize: 16,
    color: Colors.grey,
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    color: Colors.green1,
    fontWeight: 'bold',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: Colors.red,
  },
  noReservationsText: {
    fontSize: 16,
    color: Colors.grey,
    textAlign: 'center',
    marginTop: 20,
  },
});
