import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { fetchBivouacById } from '../../searchBivouacs/store/bivouacsSlice';
import { RootState, AppDispatch } from '../../../common/store/store';
import { useTranslation } from 'react-i18next';
import Colors from "@/common/constants/Colors";
import ImageGallery from '../components/imageGalery';
import BivouacInformations from '../components/bivouacInformations';
import ReservationDates from '../components/reservationDates';
import { useLocalSearchParams } from 'expo-router';

export default function DetailBivouac() {

  // Get the search parameters
  const params = useLocalSearchParams();
  const { itemId } = params;
  const id = Array.isArray(itemId) ? Number(itemId[0]) : Number(itemId);

  // Redux store access
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.bivouacs);

  useEffect(() => {
    if (id) {
      dispatch(fetchBivouacById(id));
    }
  }, [dispatch, id]);
  
  // Translation
  const { t } = useTranslation();

  const bivouac = data.find((b) => b.id === id);

  return (
    <View style={styles.container}>

      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}

      {bivouac ? (
        <ScrollView>
          <ImageGallery images={bivouac.photos} />
          <BivouacInformations name={bivouac.name} price={bivouac.price} address={bivouac.address} rating={bivouac.rating} comments={bivouac.comments} host={bivouac.host} description={bivouac.description} equipment={bivouac.equipment} />
          <ReservationDates bivouac={bivouac}/>
        </ScrollView>
      ) : (
        <Text>No data found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
