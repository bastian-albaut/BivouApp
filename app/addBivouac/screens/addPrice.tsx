import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ScrollView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TextInputComponent from '../../../common/components/TextInputComponent';
import RadioButtonComponent from '../components/RadioButtonComponent';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import Colors from "@/common/constants/Colors";
import { AddStackParamList } from './addStack';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { updatePrice } from '../../../common/store/slices/bivouacsSlice';

const AddPrice: React.FC = () => {
	const dispatch = useDispatch();
    const navigation = useNavigation<StackNavigationProp<AddStackParamList, 'AddPrice'>>();
  
    const [privacy, setPrivacy] = useState<'public' | 'private' | null>(null);
    const [payForStay, setPayForStay] = useState<'yes' | 'no' | null>(null);
    const [price, setPrice] = useState(0);
    
    const [currentPage, setCurrentPage] = React.useState(5);
    const totalPages = 5;

    const { t } = useTranslation();

	useEffect(() => {
        if (privacy === 'public') {
            setPrice(0);
            setPayForStay(null);
        }
    }, [privacy]);

    const handleBackPress = () => {
        navigation.goBack();
    };
    
    const handleNextPress = () => {
        if (privacy) {
            dispatch(updatePrice({ privacy, price: payForStay === 'yes' ? price : 0 }));
            // Uncomment the following line to navigate to the next screen if applicable
            // navigation.navigate('AddType');
        } else {
            Alert.alert(t('common:warning'), t('addBivouac:addPrice.selectPrivacy'));
        }
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
              selected={privacy === 'public'}
              onPress={() => setPrivacy('public')}
            />
            <RadioButtonComponent
              label={t('addBivouac:addPrice.private')}
              selected={privacy === 'private'}
              onPress={() => setPrivacy('private')}
            />
          </View>

          {privacy === 'public' && (
            <Text style={styles.place} >{t('addBivouac:addPrice.noPrice')}</Text>
          )}
          
          {privacy === 'private' && (
            <>
              <Text style={styles.place} >{t('addBivouac:addPrice.canPrice')}</Text>
              
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
                  placeholder={t('addBivouac:addPrice.nightPrice')}
                  keyboardType="numeric"
                  value={price}
                  onChangeText={setPrice}
                  euro={true}
                />
              )}
            </>
          )}


          <Footer
            onBackPress={handleBackPress}
            onNextPress={handleNextPress}
            progress={progress}
            isLastStep={true}
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
    place: {
        alignSelf: 'flex-start',
        marginTop: 8,
        fontSize: 16,
        paddingLeft: 25,
        marginBottom: 5,
        width: 340
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
      alignSelf: 'flex-start',
      marginLeft: 8,
      paddingLeft: 20,
    },
});
  
export default AddPrice;