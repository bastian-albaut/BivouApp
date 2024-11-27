import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, StyleSheet, TextInput, View, Text, Pressable, Button, Dimensions, TouchableOpacity } from 'react-native';
import { fetchAllBivouacData } from '@/common/api/bivouac/bivouacsApi';
import { RootState, AppDispatch } from '../../../common/store/store';
import { useTranslation } from 'react-i18next';
import BivouacItem from '../components/bivouacItem';
import Colors from "../../../common/constants/Colors";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import CustomIconButton from '../../../common/components/customIconButton';

export default function MyBivouacsList() {
  
  // Redux store access
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.bivouacs);
  useEffect(() => {
    dispatch(fetchAllBivouacData());
  }, [dispatch]);

  
  // Translation
  const { t } = useTranslation();

  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('myBivouacs:title')}</Text>
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}

      {data === undefined || data.length === 0 ? (
        <Text>No data</Text>
      ) : (
        <FlatList 
          data={data} 
          renderItem={({ item }) => (
            item?.bivouacId ? <BivouacItem item={item} /> : null
          )}
          keyExtractor={(item) => item?.bivouacId.toString()} 
          contentContainerStyle={styles.list}/>
      )}
      <View style={styles.containerButton}>
        <CustomIconButton title={t('myBivouacs:add_bivouac_button')} iconName="plus" onPress={() => router.push(`../../addBivouac/screens/addStack`)} />
      </View>
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
