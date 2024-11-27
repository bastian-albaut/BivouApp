import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
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
import { fetchAllEquipments } from '@/common/store/slices/equipmentSlice';

export default function SearchBivouacList() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  // Redux state
  const { data: bivouacs, status, error } = useSelector((state: RootState) => state.bivouacs);
  const { data: favourites } = useSelector((state: RootState) => state.favourites);
  const { dataEquipment, loadingEquipment, errorEquipment } = useSelector((state: RootState) => state.equipments);

  const [mergedBivouacs, setMergedBivouacs] = useState<any[]>([]);

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

  useEffect(() => {
    dispatch(fetchAllEquipments());
  }, [dispatch]);


  // Fonctionnalité de recherche et filtres
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterBox, setShowFilterBox] = useState(false);
  const [selectedEquipments, setSelectedEquipments] = useState<Set<number>>(new Set());

  // Bivouacs filtrés
  const filteredBivouacs = bivouacs.filter((bivouac) => {
    const matchesSearch = bivouac.name.toLowerCase().includes(searchQuery.toLowerCase());
  
    const matchesEquipment =
      selectedEquipments.size === 0 || 
      Array.from(selectedEquipments).every((selectedEquipId) => 
        bivouac.equipments.some((equip: { equipmentId: number }) => equip.equipmentId === selectedEquipId)
      );
  
    return matchesSearch && matchesEquipment;
  });

  const toggleEquipment = (equipmentId: number) => {
    setSelectedEquipments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(equipmentId)) {
        newSet.delete(equipmentId);
      } else {
        newSet.add(equipmentId);
      }
      return newSet;
    });
  };  

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
          <FontAwesome
            name="filter"
            size={24}
            color="black"
            onPress={() => setShowFilterBox((prev) => !prev)}
          />
        </View>
      </View>

      {showFilterBox && (
        <View style={styles.filterBox}>
          <Text style={styles.filterTitle}>{t('searchBivouacs:filter_by_equipment')}</Text>
          <View style={styles.filterGrid}>
            {dataEquipment.map((item) => (
              <TouchableOpacity
                key={item.equipmentId}
                onPress={() => toggleEquipment(item.equipmentId)}
                style={[
                  styles.filterBadge,
                  selectedEquipments.has(item.equipmentId) && styles.selectedFilterBadge,
                ]}
              >
                <FontAwesome name={item.icon} size={20} color={Colors.white} style={styles.filterIcon} />
                <Text style={styles.filterBadgeText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}



      {/* Affichage des états de chargement ou d'erreur */}
      {status === 'loading' && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}

      {/* Affichage de la liste des bivouacs */}
      {filteredBivouacs.length === 0 ? (
        <Text style={styles.noDataText}>No bivouac corresponding</Text>
      ) : (
        <FlatList
          data={filteredBivouacs}
          renderItem={({ item }) => (
            item?.bivouacId ? <BivouacItem item={item} onToggleFavorite={() => toggleFavorite(item.bivouacId, item.isFavorited)} /> : null
          )}
          keyExtractor={(item) => item?.bivouacId.toString()}
          contentContainerStyle={styles.list}
        />
      )}

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
  noDataText: {
    textAlign: 'center',
    fontSize: 18,
    color: Colors.black,
    marginTop: 20,
  },
  filterBox: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 10,
    textAlign: 'center',
  },
  filterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  filterBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.black,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    margin: 5,
    borderWidth: 1,
    borderColor: Colors.black,
  },
  selectedFilterBadge: {
    backgroundColor: Colors.green1,
    borderColor: Colors.green2,
  },
  filterBadgeText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.white,
    marginLeft: 8,
  },
  filterIcon: {
    marginRight: 5,
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
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.green1,
    borderRadius: 10,
    paddingVertical: 15,
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  mapButtonText: {
    color: Colors.white,
    fontSize: 18,
  }
});

