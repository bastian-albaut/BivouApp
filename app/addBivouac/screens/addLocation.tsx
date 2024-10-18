import React, { useState } from 'react';
import { View, StyleSheet, Button, Alert, ScrollView, Text } from 'react-native';
import TextInputComponent from '../../../common/components/TextInputComponent';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { addLocation } from '../store/locationSlice';
import Colors from "@/common/constants/Colors";

const AddLocation: React.FC = () => {
  const dispatch = useDispatch();

  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [street, setStreet] = useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = 6;

  const { t } = useTranslation();

  const handleSubmit = () => {
    if (city && postalCode && street) {
      // Dispatch action to add location
      dispatch(addLocation({ city, postalCode, street }));
      Alert.alert('submit', 'Emplacement ajouté avec succès!');
      // Réinitialiser les champs
      setCity('');
      setPostalCode('');
      setStreet('');
    } else {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
    }
  };

  const handleBackPress = () => {
    // Logic for back button press
    Alert.alert('Retour', 'Retour à la page précédente');
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPress = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  
  const progress = currentPage / totalPages;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{t('addBivouac:addBivouac')}</Text>
      <Text style={styles.subtitle}>{t('addBivouac:addLocation.location')}</Text>
      <Text style={styles.section}>{t('addBivouac:addLocation.address')}</Text>
      <TextInputComponent
        icon="map-marker"
        placeholder={t('addBivouac:addLocation.city')}
        value={city}
        onChangeText={setCity}
      />
      <TextInputComponent
        icon="map-marker"
        placeholder={t('addBivouac:addLocation.postalCode')}
        value={postalCode}
        onChangeText={setPostalCode}
        keyboardType="numeric"
      />
      <TextInputComponent
        icon="map-marker"
        placeholder={t('addBivouac:addLocation.street')}
        value={street}
        onChangeText={setStreet}
      />
      <View style={styles.separator}>
        <View style={styles.line} />
          <Text style={styles.text}>OU</Text>
        <View style={styles.line} />
      </View>
      <Text style={styles.section}>{t('addBivouac:addLocation.gps_coordinates')}</Text>
      <TextInputComponent
        icon="map-marker"
        placeholder={t('addBivouac:addLocation.latitude')}
        value={city}
        onChangeText={setCity}
      />
      <TextInputComponent
        icon="map-marker"
        placeholder={t('addBivouac:addLocation.longitude')}
        value={city}
        onChangeText={setCity}
      />
      <Footer
        onBackPress={handleBackPress}
        onNextPress={handleNextPress}
        progress={progress}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: Colors.white,
    alignItems: 'center'
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 15,
  },
  subtitle: {
    alignSelf: 'flex-start',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 15,
  },
  section: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 25,
    color: Colors.secondary,
    marginBottom: 5
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: 340
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.black,
  },
  text: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
  }
});

export default AddLocation;