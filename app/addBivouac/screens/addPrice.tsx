import React, { useState } from 'react';
import { View, StyleSheet, Button, Alert, ScrollView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TextInputComponent from '../../../common/components/TextInputComponent';
import RadioButtonComponent from '../components/RadioButtonComponent';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import Colors from "@/common/constants/Colors";
import { AddStackParamList } from './addStack';
import { StackNavigationProp } from '@react-navigation/stack';

const AddPrice: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<AddStackParamList, 'AddPrice'>>();
  
    const [selectedPrivacy, setSelectedPrivacy] = useState(null);
    const [payForStay, setPayForStay] = useState(null);
    const [currentPage, setCurrentPage] = React.useState(5);
    const totalPages = 5;

    const { t } = useTranslation();

    const handleBackPress = () => {
        navigation.goBack();
    };
    
    const handleNextPress = () => {
        //navigation.navigate('AddType');
    };

    const progress = currentPage / totalPages;
    return (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>{t('addBivouac:addBivouac')}</Text>
          <Text style={styles.subtitle}>{t('addBivouac:addPrice.askedPrice')}</Text>
          <Text style={styles.section}>{t('addBivouac:addPrice.place')}</Text>
          <View style={styles.radioButtonGroup}>
            <RadioButtonComponent
              label={t('addBivouac:addPrice.public')}
              selected={selectedPrivacy === 'public'}
              onPress={() => setSelectedPrivacy('public')}
            />
            <RadioButtonComponent
              label={t('addBivouac:addPrice.private')}
              selected={selectedPrivacy === 'private'}
              onPress={() => setSelectedPrivacy('private')}
            />
          </View>

          {selectedPrivacy === 'public' && (
            <Text>{t('addBivouac:addPrice.noPrice')}</Text>
          )}
          
          {selectedPrivacy === 'private' && (
            <>
              <Text>{t('addBivouac:addPrice.canPrice')}</Text>
              
              <Text style={styles.section}>{t('addBivouac:addPrice.makePayment')}</Text>
              <View style={styles.radioButtonGroup}>
                <RadioButtonComponent
                  label={t('common:no')}
                  selected={payForStay === 'no'}
                  onPress={() => {
                    setPayForStay('no');
                  }}
                />
                <RadioButtonComponent
                  label={t('common:yes')}
                  selected={payForStay === 'yes'}
                  onPress={() => {
                    setPayForStay('yes');
                  }}
                />
              </View>

              {payForStay === 'yes' && (
                <TextInputComponent
                  icon="money"
                  placeholder={t('addBivouac:addPrice.area')}
                  keyboardType="numeric"
                />
              )}
            </>
          )}


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
      marginBottom: 5,
      width: 340
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
  
export default AddPrice;