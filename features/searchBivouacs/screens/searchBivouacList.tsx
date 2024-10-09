import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, Image, StyleSheet, TextInput, View, Text, Button } from 'react-native';
import { fetchBivouacs } from '../store/bivouacsSlice';
import { RootState, AppDispatch } from '../../../common/store/store';
import { useTranslation } from 'react-i18next';

export default function SearchBivouacList() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.bivouacs);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchBivouacs());
  }, [dispatch]);

  const { t } = useTranslation();

  const filteredBivouacs = data.filter(bivouac => 
    bivouac.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderBivouacItem = ({ item }: { item: any }) => (
    <View style={styles.bivouacItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.bivouacImage} />
      <View style={styles.bivouacInfo}>
        <Text style={styles.bivouacTitle}>{item.name}</Text>
        <Text style={styles.bivouacAddress}>{`${item.address.number} ${item.address.street}, ${item.address.city}, ${item.address.postalCode}`}</Text>
        <Text style={styles.bivouacHost}>Host: {item.host.name}</Text>
      </View>
    </View>
  );

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
        renderItem={renderBivouacItem}
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
  bivouacItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  bivouacImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  bivouacInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  bivouacTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bivouacAddress: {
    color: '#555',
  },
  bivouacHost: {
    color: '#999',
  },
});
