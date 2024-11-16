import React, { useState } from 'react';
import { View, StyleSheet, Button, Alert, ScrollView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TextInputComponent from '../../../common/components/TextInputComponent';
import RadioButtonComponent from '../components/RadioButtonComponent';
import DropdownComponent from '../components/DropdownComponent';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import Colors from "@/common/constants/Colors";
import { AddStackParamList } from './addStack';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { updateType } from '../../../common/store/slices/bivouacsSlice';

const AddType: React.FC = () => {
  	const dispatch = useDispatch();
    const navigation = useNavigation<StackNavigationProp<AddStackParamList, 'AddType'>>();
  
    const [name, setName] = useState('');
    const [selectedPRM, setSelectedPRM] = useState<'yes' | 'no' | null>(null);
    const [selectedRental, setSelectedRental] = useState<string | number | undefined>(undefined);
    const [selectedSite, setSelectedSite] = useState<string | number | undefined>(undefined);
    const [area, setArea] = useState('');
    const [description, setDescription] = useState('');

    const [currentPage, setCurrentPage] = React.useState(2);
    const totalPages = 5;

    const { t } = useTranslation();

    const rentals = [
      { label: t('addBivouac:addType.rentalType.nothing'), value: 'nothing' },
      { label: t('addBivouac:addType.rentalType.tent'), value: 'tent' },
      { label: t('addBivouac:addType.rentalType.teepee'), value: 'teepee' },
    ];

    const sites = [
      { label: t('addBivouac:addType.siteType.underbrush'), value: 'underbrush' },
      { label: t('addBivouac:addType.siteType.sand'), value: 'sand' },
      { label: t('addBivouac:addType.siteType.field'), value: 'field' },
      { label: t('addBivouac:addType.siteType.cave'), value: 'cave' },
    ];

    const handleNextPress = () => {
      // Log des valeurs pour débogage
      console.log('name:', name);
      console.log('selectedRental:', selectedRental);
      console.log('selectedSite:', selectedSite);
      console.log('area:', area);
      console.log('description:', description);
      console.log('selectedPRM:', selectedPRM);

      if (name && selectedRental && selectedSite && area && description && selectedPRM) {
        dispatch(updateType({
          name,
          rental: selectedRental,
          site: selectedSite,
          area,
          description,
          prm: selectedPRM,
        }));
  
        navigation.navigate('AddEquipment');
      } else {
        Alert.alert(t('common:warning'), t('addBivouac:addType.fillAllFields'));
      }
    };

    const handleBackPress = () => {
		dispatch(updateType({
			name,
			rental: selectedRental,
			site: selectedSite,
			area,
			description,
			prm: selectedPRM,
		}));
      	navigation.goBack();
    };

    const progress = currentPage / totalPages;
    return (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>{t('addBivouac:addBivouac')}</Text>
          <Text style={styles.subtitle}>{t('addBivouac:addType.rental')}</Text>
          <TextInputComponent
            icon="map-marker"
            placeholder={t('addBivouac:addType.name')}
            value={name}
            onChangeText={setName}
          />
          <DropdownComponent
            icon="map-marker"
            placeholder={t('addBivouac:addType.rental')}
            items={rentals}
            onSelect={item => setSelectedRental(item.value)}
          />
          <DropdownComponent
            icon="map-marker"
            placeholder={t('addBivouac:addType.site')}
            items={sites}
            onSelect={item => setSelectedSite(item.value)}
          />
          <TextInputComponent
            icon="map-marker"
            placeholder={t('addBivouac:addType.area')}
            value={area}
            onChangeText={setArea}
          />
          <TextInputComponent
            multiline={true}
            icon="map-marker"
            placeholder={t('addBivouac:addType.description')}
            value={description}
            onChangeText={setDescription}
          />
          <Text style={styles.section}>{t('addBivouac:addType.PRM')}</Text>
          <View style={styles.radioButtonGroup}>
            <RadioButtonComponent
              label={t('common:yes')}
              selected={selectedPRM === 'yes'}
              onPress={() => setSelectedPRM('yes')}
            />
            <RadioButtonComponent
              label={t('common:no')}
              selected={selectedPRM === 'no'}
              onPress={() => setSelectedPRM('no')}
            />
          </View>
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
      marginTop: 8,
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
    },
    radioButtonGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start', // Aligns the radio button group to the left
      marginLeft: 8,
      paddingLeft: 20, // Adjust this value to match the left padding of your text inputs
    },
});
  
export default AddType;