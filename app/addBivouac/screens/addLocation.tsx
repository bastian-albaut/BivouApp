import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TextInputComponent from '../../../common/components/TextInputComponent';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { updateLocation } from '../../../common/store/slices/bivouacsSlice';
import Colors from "@/common/constants/Colors";
import { AddStackParamList } from './addStack';
import { StackNavigationProp } from '@react-navigation/stack';

const AddLocation: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<AddStackParamList, 'AddLocation'>>();

  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [street, setStreet] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const { t } = useTranslation();

  const handleNextPress = () => {
    // Vérification de la validité des données avant de passer à l'étape suivante
    if ((city && postalCode && street && !(latitude || longitude)) || (latitude && longitude && !(city || postalCode || street))) {
      // Dispatch action pour mettre à jour Redux avec les informations de localisation
      dispatch(updateLocation({
        city,
        postalCode,
        street,
        latitude,
        longitude,
      }));

      // Naviguer vers la page suivante
      navigation.navigate('AddType');
    } else {
      Alert.alert(t('common:warning'), t('addBivouac:addLocation.choseFields'));
    }
  };

  const handleBackPress = () => {
    //navigation.goBack();
  };

  // const handleNextPress = () => {
  //   navigation.navigate('AddType');
  // };
  
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
        value={latitude}
        onChangeText={setLatitude}
        keyboardType="numeric"
      />
      <TextInputComponent
        icon="map-marker"
        placeholder={t('addBivouac:addLocation.longitude')}
        value={longitude}
        onChangeText={setLongitude}
        keyboardType="numeric"
      />
      <Footer
        onBackPress={handleBackPress}
        onNextPress={handleNextPress}
        progress={progress}
        showBackButton={false}
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