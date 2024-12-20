import React, { useState, useEffect, useRef  } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Alert, Keyboard } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import Colors from '@/common/constants/Colors';
import { useTranslation } from 'react-i18next';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as Location from 'expo-location'; // Importer expo-location
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBivouacData } from '@/common/api/bivouac/bivouacsApi';
import { AppDispatch, RootState } from '@/common/store/store';
import BivouacItemMap from '../components/bivouacItemMap';

export default function SearchBivouacMap() {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [location, setLocation] = useState({ latitude: 48.8566, longitude: 2.3522 }); // Paris par défaut
  const [selectedBivouacIndex, setSelectedBivouacIndex] = useState<number | null>(null);
  const [visibleBivouacs, setVisibleBivouacs] = useState<any[]>([]);
  const { t } = useTranslation();

  // Redux store access
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.bivouacs);

  useEffect(() => {
    dispatch(fetchAllBivouacData());
  }, [dispatch]);

  // Search functionality
  const filteredBivouacs = data;

  // Fonction pour rechercher les suggestions de ville en France avec Nominatim
  const searchSuggestions = async (text: string) => {
    setCity(text);
    if (text.length > 2) { // Commence la recherche après 3 caractères
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?q=${text}&format=json&addressdetails=1&limit=5&countrycodes=fr`
        );

        // Filtrer et supprimer les doublons après formatage
        const filteredResults = response.data.filter((item: any) => {
          const city = item.address.city || item.address.town || item.address.village || '';
          return city.toLowerCase().startsWith(text.toLowerCase());
        });

        const uniqueSuggestions = Array.from(new Set(
          filteredResults.map((item: any) => formatSuggestion(item))
        )).map(uniqueCity => {
          return filteredResults.find((item: any) => formatSuggestion(item) === uniqueCity);
        });

        setSuggestions(uniqueSuggestions);
      } catch (error) {
        console.error('Erreur lors de la recherche de suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const formatSuggestion = (item: any) => {
    const city = item.address.city || item.address.town || item.address.village || '';
    const state = item.address.state || '';
    if (city === '' || state === '' || city === null || state === null) {
      return null;
    }
    return `${city}, ${state}`;
  };

  const selectSuggestion = (suggestion: any) => {
    const formattedCity = formatSuggestion(suggestion);
    const { lat, lon } = suggestion;
    setLocation({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
    setCity(formattedCity || suggestion.display_name);
    setSuggestions([]);
  };

  useEffect(() => {
    const getLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission refusée', 'La géolocalisation est nécessaire pour afficher votre position.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };

    getLocationPermission();
  }, []);

  const flatListRef = useRef<FlatList>(null);

  const handleMarkerPress = (index: number) => {
    setSelectedBivouacIndex(index);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const handleRegionChange = (region: any) => {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = region;
    const filtered = filteredBivouacs.filter((bivouac: any) => {
      const bivouacLat = parseFloat(bivouac.address.latitude);
      const bivouacLon = parseFloat(bivouac.address.longitude);
      return (
        bivouacLat >= latitude - latitudeDelta &&
        bivouacLat <= latitude + latitudeDelta &&
        bivouacLon >= longitude - longitudeDelta &&
        bivouacLon <= longitude + longitudeDelta
      );
    }).slice(0, 20); // Limiter à 20 bivouacs maximum

    setVisibleBivouacs(filtered);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={24} color={Colors.black} style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder={t('searchBivouacs:search_bar_map')}
          placeholderTextColor={Colors.black}
          value={city}
          onChangeText={searchSuggestions}
        />
      </View>

      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.place_id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => selectSuggestion(item)}>
              <Text style={styles.suggestionItem}>{formatSuggestion(item)}</Text>
            </TouchableOpacity>
          )}
          style={styles.suggestionList}
        />
      )}

      <View style={styles.bivouacList}>
        {/* Affichage de la liste des bivouacs */}
        {visibleBivouacs.length === 0 ? (
          <Text>No data</Text>
        ) : (
          <FlatList
            ref={flatListRef}
            data={visibleBivouacs}
            horizontal={true}
            renderItem={({ item, index }) => (
              item?.bivouacId ? <BivouacItemMap item={item} isSelected={index === selectedBivouacIndex} /> : null
            )}
            keyExtractor={(item) => item?.bivouacId.toString()}
            initialScrollIndex={selectedBivouacIndex}
          />
        )}
      </View>

      <MapView
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onPress={() => {
          Keyboard.dismiss();
        }}
        onRegionChangeComplete={handleRegionChange}
      >
        {visibleBivouacs.map((bivouac, index) => {
          if (bivouac.address && bivouac.address.latitude && bivouac.address.longitude) {
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: parseFloat(bivouac.address.latitude),
                  longitude: parseFloat(bivouac.address.longitude),
                }}
                onPress={() => handleMarkerPress(index)}
                image={index === selectedBivouacIndex ? require('@/assets/images/tantes_selected.png') : require('@/assets/images/tantes.png')}
              />
            );
          }
          return null;
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.black,
    borderWidth: 1,
    borderRadius: 30,
    marginHorizontal: 20,
    marginVertical: 20,
    paddingHorizontal: 10,
    position: 'absolute',
    zIndex: 1,
    backgroundColor: '#fff',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    height: 50,
    color: Colors.black,
  },
  suggestionList: {
    width: 330,
    maxHeight: 150,
    position: 'absolute',
    top: 72,
    left: 30,
    zIndex: 1,
    backgroundColor: '#fff',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  map: {
    flex: 1,
  },
  bivouacList: {
    zIndex: 1,
    height: 110,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    margin: 20
  }
});
