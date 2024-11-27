import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { RootState, AppDispatch } from '../../../common/store/store';
import { useTranslation } from 'react-i18next';
import BivouacItem from '../components/bivouacItem';
import Colors from "@/common/constants/Colors";
import { fetchFavouritesByUserId, newFavourite, removeFavourite } from '@/common/store/slices/favouritesSlice';
import { getUserId } from '@/common/utils/authStorage';
import { fetchAllBivouacData } from '@/common/api/bivouac/bivouacsApi';

export default function Favorites() {
  const dispatch = useDispatch<AppDispatch>();
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  const { data: favourites, loading: favouritesLoading, error: favouritesError } = useSelector(
    (state: RootState) => state.favourites
  );
  const { data: bivouacs, loading: bivouacsLoading, error: bivouacsError } = useSelector(
    (state: RootState) => state.bivouacs
  );

  const [mergedFavourites, setMergedFavourites] = useState<any[]>([]);

  // Fetch current user ID
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const userId = await getUserId();
      setCurrentUserId(Number(userId));
    };
    fetchCurrentUser();
  }, []);

  // Fetch data for current user
  useEffect(() => {
    if (currentUserId) {
      dispatch(fetchFavouritesByUserId(currentUserId));
      dispatch(fetchAllBivouacData());
    }
  }, [dispatch, currentUserId]);

  // Handle removing a favorite
  const handleRemoveFavorite = (bivouacId: number) => {
    // Remove the bivouac locally first
    const updatedFavourites = mergedFavourites.filter(
      (item) => item.bivouac?.bivouacId !== bivouacId
    );
    setMergedFavourites(updatedFavourites);

    // Dispatch the removal to the backend
    if (currentUserId) {
      dispatch(removeFavourite({ userId: currentUserId, bivouacId }));
    }
  };

  const [alreadyFetch, setAlreadyFetch] = useState(false);

  // Update the useEffect for merging favourites
  useEffect(() => {
    if (favourites && bivouacs && !alreadyFetch) {
      const merged = favourites.map((favourite) => {
        const bivouac = bivouacs.find((b) => b.bivouacId === favourite.id.bivouacId);
        return {
          ...favourite,
          bivouac: bivouac ? { ...bivouac, isFavorited: true } : null,
        };
      });

      // Keep the merged favorites in sync
      setMergedFavourites(merged);
      setAlreadyFetch(true);
    }
  }, [favourites, bivouacs]);

  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('favorites:title')}</Text>

      {favouritesLoading && <Text>Loading...</Text>}
      {favouritesError && <Text>Error: {favouritesError}</Text>}

      <FlatList
        data={mergedFavourites}
        renderItem={({ item }) => (
          <BivouacItem
            item={item.bivouac}
            onRemoveFavorite={() => handleRemoveFavorite(item.bivouac?.bivouacId)}
          />
        )}
        keyExtractor={(item) => item.id.bivouacId.toString()}
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
  list: {
    paddingBottom: 20,
  },
});
