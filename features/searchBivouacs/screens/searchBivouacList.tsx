import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, StyleSheet, TextInput, View, Text } from 'react-native';
import { fetchBivouacs } from '../store/bivouacsSlice';
import { RootState, AppDispatch } from '../../../common/store/store';
import { useTranslation } from 'react-i18next';
import BivouacItem from '../components/bivouacItem';
import Colors from "@/common/constants/Colors";
import FontAwesome from '@expo/vector-icons/FontAwesome';

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

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={24} color={Colors.black} style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder={t('searchBivouacs:search_bar')}
          placeholderTextColor={Colors.black}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}

      <FlatList
        data={filteredBivouacs}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.black,
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 20,
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
});
