import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, Image, StyleSheet, TextInput, View, Text, Button } from 'react-native';
import { fetchBivouacs } from '../store/bivouacsSlice';
import { RootState, AppDispatch } from '../../../common/store/store';
import { useTranslation } from 'react-i18next';
import BivouacItem from '../components/bivouacItem';

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
      <TextInput
        style={styles.searchBar}
        placeholder={t('searchBivouacs:search_bar')}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

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
    backgroundColor: '#fff',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
});
