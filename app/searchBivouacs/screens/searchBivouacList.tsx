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

export default function SearchBivouacList() {
  
  // Redux store access
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.bivouacs);
  useEffect(() => {
    dispatch(fetchBivouacs());
  }, [dispatch]);

  
  // Search functionality
  const [searchQuery, setSearchQuery] = useState('');
  const filteredBivouacs = data.filter(bivouac => 
    bivouac.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Translation
  const { t } = useTranslation();

  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInput}>
          <FontAwesome name="search" size={24} color={Colors.black} style={styles.searchIcon} />
          <TextInput
            style={styles.searchBar}
            placeholder={t('searchBivouacs:search_bar')}
            placeholderTextColor={Colors.black}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <FontAwesome name="filter" size={24} color={Colors.black} />
        </View>

      </View>

      

      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}

      <FlatList
        data={filteredBivouacs}
        renderItem={({ item }) => <BivouacItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
      
      <View style={styles.containerButton}>
        <CustomIconButton title={t('searchBivouacs:map_button')} iconName="map" onPress={() => router.push(`/searchBivouacs/screens/searchBivouacMap`)} />
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
  searchContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: Colors.black,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    color: Colors.black,
    flex: 1,
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