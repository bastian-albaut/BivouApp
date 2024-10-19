import React, { useState } from 'react';
import { View, StyleSheet, Button, Alert, ScrollView, Text } from 'react-native';
import TextInputComponent from '../../../common/components/TextInputComponent';
import RadioButtonComponent from '../components/RadioButtonComponent';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import Colors from "@/common/constants/Colors";

const AddType: React.FC = () => {
  
    const [selectedPRM, setSelectedPRM] = useState(null);
    const [currentPage, setCurrentPage] = React.useState(2);
    const totalPages = 6;

    const { t } = useTranslation();

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
          <Text style={styles.subtitle}>{t('addBivouac:addType.rental')}</Text>
          <TextInputComponent
            icon="map-marker"
            placeholder={t('addBivouac:addType.rental')}
          />
          <TextInputComponent
            icon="map-marker"
            placeholder={t('addBivouac:addType.site')}
            keyboardType="numeric"
          />
          <TextInputComponent
            icon="map-marker"
            placeholder={t('addBivouac:addType.area')}
          />
          <TextInputComponent
            multiline={true}
            icon="map-marker"
            placeholder={t('addBivouac:addType.description')}
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