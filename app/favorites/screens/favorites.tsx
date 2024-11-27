import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, StyleSheet, TextInput, View, Text, Pressable, Button, Dimensions, TouchableOpacity } from 'react-native';
import { RootState, AppDispatch } from '../../../common/store/store';
import { useTranslation } from 'react-i18next';
import BivouacItem from '../components/bivouacItem';
import Colors from "@/common/constants/Colors";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import CustomIconButton from '@/common/components/customIconButton';
import { useRouter } from 'expo-router';
import { fetchFavouritesByUserId } from '@/common/store/slices/favouritesSlice';
import { getUserId } from '@/common/utils/authStorage';
import { fetchAllBivouacData } from '@/common/api/bivouac/bivouacsApi';

export default function Favorites() {
  
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.favourites);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  const { data: favourites, loading: favouritesLoading, error: favouritesError } = useSelector(
    (state: RootState) => state.favourites
  );
  const { data: bivouacs, loading: bivouacsLoading, error: bivouacsError } = useSelector(
    (state: RootState) => state.bivouacs
  );

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const userId = await getUserId(); // Ensure getUserId retrieves the logged-in user ID
      setCurrentUserId(Number(userId));
    };
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUserId) {
      dispatch(fetchFavouritesByUserId(currentUserId));
      dispatch(fetchAllBivouacData());
    }
  }, [dispatch, currentUserId]);

  const mergeFavouritesWithBivouacs = (favourites: any[], bivouacs: any[]) => {
    if (!favourites || !bivouacs) {
      console.warn('Favourites or Bivouacs data is missing.');
      return [];
    }

    return favourites.map((favourite) => {
      const bivouac = bivouacs.find((b) => b.bivouacId === favourite.id.bivouacId);

      if (!bivouac) {
        console.warn(`Bivouac with ID ${favourite.id.bivouacId} not found.`);
      }

      return {
        ...favourite,
        bivouac: bivouac || null, // Attach bivouac details, or null if not found
      };
    });
  };

const mergedFavourites = mergeFavouritesWithBivouacs(favourites, bivouacs);


  // Translation
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('favorites:title')}</Text>

      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}

      <FlatList
        data={mergedFavourites}
        renderItem={({ item }) => (
          <BivouacItem item={item.bivouac} /> // Pass the bivouac details to BivouacItem
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
