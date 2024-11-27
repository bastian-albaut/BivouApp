import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, StyleSheet, TextInput, View, Text } from 'react-native';
import { fetchAllBivouacData } from '@/common/api/bivouac/bivouacsApi';
import { RootState, AppDispatch } from '../../../common/store/store';
import { useTranslation } from 'react-i18next';
import BivouacItem from '../components/bivouacItem';
import Colors from "@/common/constants/Colors";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import CustomIconButton from '@/common/components/customIconButton';
import { getUserId } from '@/common/utils/authStorage';
import { fetchFavouritesByUserId, newFavourite, removeFavourite } from '@/common/store/slices/favouritesSlice';
import { useRouter } from 'expo-router';

export default function SearchBivouacList() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  // Redux state
  const { data: bivouacs, status, error } = useSelector((state: RootState) => state.bivouacs);
  const { data: favourites } = useSelector((state: RootState) => state.favourites);

  const [mergedBivouacs, setMergedBivouacs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch user ID and initial data
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const userId = await getUserId();
      setCurrentUserId(Number(userId));
    };

    fetchCurrentUser();
    if (status === 'idle') {
      dispatch(fetchAllBivouacData());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (currentUserId) {
      dispatch(fetchFavouritesByUserId(currentUserId));
    }
  }, [dispatch, currentUserId]);

  // Merge bivouacs with favorites
  useEffect(() => {
    if (bivouacs && favourites) {
      const merged = bivouacs.map((bivouac) => ({
        ...bivouac,
        isFavorited: favourites.some((fav) => fav.id.bivouacId === bivouac.bivouacId),
      }));
      setMergedBivouacs(merged);
    }
  }, [bivouacs, favourites]);

  // Toggle favorite status
  const toggleFavorite = (bivouacId: number, isFavorited: boolean) => {
    const updatedBivouacs = mergedBivouacs.map((bivouac) =>
      bivouac.bivouacId === bivouacId ? { ...bivouac, isFavorited: !isFavorited } : bivouac
    );

    setMergedBivouacs(updatedBivouacs);

    if (currentUserId) {
      if (isFavorited) {
        dispatch(removeFavourite({ userId: currentUserId, bivouacId }));
      } else {
        dispatch(newFavourite({ userId: currentUserId, bivouacId }));
      }
    }
  };

  // Filter bivouacs by search query
  const filteredBivouacs = mergedBivouacs.filter((bivouac) =>
    bivouac.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInput}>
          <FontAwesome name="search" size={24} color="black" style={styles.searchIcon} />
          <TextInput
            style={styles.searchBar}
            placeholder={t('searchBivouacs:search_bar')}
            placeholderTextColor="black"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <FontAwesome name="filter" size={24} color="black" />
        </View>
      </View>

      {status === 'loading' && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}

      <FlatList
        data={filteredBivouacs}
        renderItem={({ item }) => (
          <BivouacItem
            item={item}
            onToggleFavorite={() => toggleFavorite(item.bivouacId, item.isFavorited)}
          />
        )}
        keyExtractor={(item) => item.bivouacId.toString()}
        contentContainerStyle={styles.list}
      />

      <View style={styles.containerButton}>
        <CustomIconButton
          title={t('searchBivouacs:map_button')}
          iconName="map"
          onPress={() => router.push(`/searchBivouacs/screens/searchBivouacMap`)}
        />
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
});
