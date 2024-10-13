import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import { fetchBivouacById } from '../../searchBivouacs/store/bivouacsSlice';
import { RootState, AppDispatch } from '../../../common/store/store';
import { useTranslation } from 'react-i18next';
import Colors from "@/common/constants/Colors";
import ImageGallery from '../components/imageGalery';

export default function DetailBivouac() {
  const { id } = {id: 1};

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
        <>
        <ImageGallery images={bivouac.photos} />
          <Text style={styles.title}>{bivouac.name}</Text>
          <Text>{bivouac.description}</Text>
        </>
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
