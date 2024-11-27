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
import { useDispatch, useSelector } from 'react-redux';
import { updatePrice } from '../../../common/store/slices/bivouacsSlice';
import { createBivouac, createAddress } from '../../../common/api/bivouac/bivouacsApi';
import { RootState } from '../../../common/store/store';
import { useRouter } from 'expo-router';
import { getUserId } from '../../../common/utils/authStorage';

const AddPrice: React.FC = () => {
	const dispatch = useDispatch();
    const navigation = useNavigation<StackNavigationProp<AddStackParamList, 'AddPrice'>>();
	const router = useRouter();
  
    const [privacy, setPrivacy] = useState<'public' | 'private' | null>(null);
    const [payForStay, setPayForStay] = useState<'yes' | 'no' | null>(null);
    const [price, setPrice] = useState(0);
    
    const [currentPage, setCurrentPage] = React.useState(5);
    const totalPages = 5;

    const { t } = useTranslation();


	// Sélection des données du store Redux
	const bivouacDataFromStore = useSelector((state: RootState) => state.bivouacs);

	useEffect(() => {
        if (privacy === 'public') {
            setPrice(0);
            setPayForStay(null);
        }
    }, [privacy]);

    const handleBackPress = () => {
        navigation.goBack();
    };
    
    const handleNextPress = async () => {
        if (privacy) {
            dispatch(updatePrice({ privacy, price: payForStay === 'yes' ? price : 0 }));
            // Appel à l'api pour ajouter le bivouac avec les données du store
            try {
				const hostId = await getUserId();
				if (hostId !== null) {
					try {
						console.log('trying to create a Address');
						const { num: number, street, city, postalCode } = bivouacDataFromStore;
						const addressData = { 
							number, 
							street, 
							city,
							postalCode
						};
						console.log('addressData : ', addressData);
						console.log('Before calling createAddress');
						const response = await createAddress(addressData);
						console.log('Address created successfully:', response);
						// Ajoutez toute autre logique après la création réussie, comme la navigation vers une autre page
						if (response && response.addressId !== undefined) {
							const addressId = response.addressId;
							console.log('Address ID:', addressId);
							if (addressId !== null) {
								try {
									console.log('trying to create a Bivouac');
									const { name, rental_type, field_type, area, description, is_pmr, equipmentIds } = bivouacDataFromStore;
									const bivouacData = { 
										hostId,
										addressId,
										name, 
										price: payForStay === 'yes' ? price : 0, 
										rental_type: rental_type || null, 
										field_type: field_type || null, 
										area: area || 0, 
										description, 
										is_pmr, 
										privacy, 
										equipmentIds: equipmentIds || []
									};
									console.log('bivouacData : ', bivouacData);
									console.log('Before calling createBivouac');
									const response = await createBivouac(bivouacData);
									console.log('Bivouac created successfully:', response);
									// Ajoutez toute autre logique après la création réussie, comme la navigation vers une autre page
									router.back();
								} catch (error) {
									console.error('Failed to create bivouac:', error);
									Alert.alert('Error', 'Failed to create bivouac. Please try again.');
								}
							}
						} else {
							console.error('Failed to retrieve addressId from response.');
						}
					} catch (error) {
						console.error('Failed to create address:', error);
						Alert.alert('Error', 'Failed to create address. Please try again.');
					}
				} else {
					Alert.alert('Error', 'Failed to get id. Please login and try again.');
				}
            } catch (error) {
              console.error('Error fetching user id', error);
			  Alert.alert('Error', 'Failed to get id. Please login and try again.');
            }
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
