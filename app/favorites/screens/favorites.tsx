import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, StyleSheet, TextInput, View, Text, Pressable, Button, Dimensions, TouchableOpacity } from 'react-native';
import { fetchBivouacs } from '../../../common/store/slices/bivouacsSlice';
import { RootState, AppDispatch } from '../../../common/store/store';
import { useTranslation } from 'react-i18next';
import BivouacItem from '../components/bivouacItem';
import Colors from "@/common/constants/Colors";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import CustomIconButton from '@/common/components/customIconButton';
import { useRouter } from 'expo-router';
import { fetchFavouritesByUserId } from '@/common/store/slices/favouritesSlice';

export default function Favorites() {
  
  // Redux store access
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.favourites);
  useEffect(() => {
    dispatch(fetchFavouritesByUserId(1));
  }, [dispatch]);

  // Translation
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('favorites:title')}</Text>

      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}

      <FlatList
        data={data}
        renderItem={({ item }) => <BivouacItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 20,
    width: '100%',
    textAlign: 'left',
    paddingLeft: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.black,
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    height: 50,
    color: Colors.black,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    paddingBottom: 20,
  },
  containerButton: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.green1,
    borderRadius: 10,
    paddingVertical: 15,
    elevation: 5, // Adds shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  mapButtonText: {
    color: Colors.white,
    fontSize: 18,
  }
});
