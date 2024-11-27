import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import { RootState, AppDispatch } from '../../../common/store/store';
import { useTranslation } from 'react-i18next';
import Colors from "@/common/constants/Colors";
import ImageGallery from '../components/imageGalery';
import BivouacInformations from '../components/bivouacInformations';
import ReservationDates from '../components/reservationDates';
import { useLocalSearchParams } from 'expo-router';
import { fetchAllBivouacData } from '@/common/api/bivouac/bivouacsApi';

export default function DetailBivouac() {

  // Get the search parameters
  const params = useLocalSearchParams();
  const { itemId } = params;
  const id = Array.isArray(itemId) ? Number(itemId[0]) : Number(itemId);

  // Redux store access
  const dispatch = useDispatch<AppDispatch>();
  const { data: bivouacs, loading, error } = useSelector((state: RootState) => state.bivouacs);

  useEffect(() => {
    dispatch(fetchAllBivouacData());
  }, [dispatch]);
  
  const [bivouac, setBivouac] = useState<any>(null);

  useEffect(() => {
    if(bivouacs.length > 0) {
      const foundBivouac = bivouacs.find((b) => b.bivouacId === id);
      setBivouac(foundBivouac);
    }
  }, [bivouacs]);

  // Translation
  const { t } = useTranslation();

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
    return <Image source={imageSource} style={styles.bivouacImage} resizeMode="cover" />;
  };

  return (
    <View style={styles.container}>

      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}

      {bivouac ? (
        <ScrollView>
          <BivouacImage bivouacId={bivouac.bivouacId} />
          <BivouacInformations name={bivouac.name} price={bivouac.price} address={bivouac.address} rating={bivouac.rating} comments={bivouac.comments} host={bivouac.host} description={bivouac.description} equipment={bivouac.equipments} />
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
  bivouacImage: {
    width: '100%',
    height: 300,
  },
});
