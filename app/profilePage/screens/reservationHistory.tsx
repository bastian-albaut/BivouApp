import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/common/store/store';
import { fetchReservations } from '@/common/store/slices/reservationsSlice';
import { fetchBivouacs } from '@/common/store/slices/bivouacsSlice';
import Colors from '@/common/constants/Colors';

export default function ReservationHistory() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const { data: reservations, loading: reservationsLoading, error: reservationsError } = useSelector(
    (state: RootState) => state.reservations
  );
  const { data: bivouacs, loading: bivouacsLoading, error: bivouacsError } = useSelector(
    (state: RootState) => state.bivouacs
  );

  useEffect(() => {
    dispatch(fetchReservations());
    dispatch(fetchBivouacs());
  }, [dispatch]);

  // Merge reservation with bivouac details
  const mergedReservations = (reservations || []).map((reservation) => {
    const bivouac = (bivouacs || []).find((b) => b.id === reservation.bivouacId);
    return {
      ...reservation,
      bivouac, // Add bivouac details to the reservation
    };
  });

  const renderReservation = ({ item }: { item: any }) => {
    const { bivouac } = item;
    return (
      <View style={styles.reservationItem}>
        <Text style={styles.bivouacName}>{bivouac?.name || t('profilePage:unknownBivouac')}</Text>
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
