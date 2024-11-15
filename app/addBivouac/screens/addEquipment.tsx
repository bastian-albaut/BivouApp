import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EquipmentComponent from '../components/EquipmentComponent';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import Colors from "@/common/constants/Colors";
import { AddStackParamList } from './addStack';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { updateEquipments } from '../../../common/store/slices/bivouacsSlice';

const AddEquipment: React.FC = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<StackNavigationProp<AddStackParamList, 'AddEquipment'>>();

    const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);

    const [currentPage, setCurrentPage] = React.useState(3);
    const totalPages = 5;

    const { t } = useTranslation();

    const handleBackPress = () => {
        dispatch(updateEquipments(selectedEquipment));
        navigation.goBack();
    };
    
    const handleNextPress = () => {
        dispatch(updateEquipments(selectedEquipment));
        navigation.navigate('AddPhotos');
    };

    const progress = currentPage / totalPages;

    // const handleSelect = (label: string, isSelected: boolean) => {
    //     setSelectedEquipment(prevLabels => {
    //         if (isSelected) {
    //             return [...prevLabels, label];
    //         } else {
    //             return prevLabels.filter(item => item !== label);
    //         }
    //     });
    // };

    const handleSelect = (label: string) => {
        setSelectedEquipment(prevSelected => {
            if (prevSelected.includes(label)) {
                return prevSelected.filter(item => item !== label);
            } else {
                return [...prevSelected, label];
            }
        });
    };

    const components = [
        { label: t('addBivouac:addEquipment.water'), icon: 'tint', selected: false },
        { label: t('addBivouac:addEquipment.electricity'), icon: 'bolt', selected: false },
        { label: t('addBivouac:addEquipment.shelter'), icon: 'shower', selected: false },
        { label: t('addBivouac:addEquipment.wifi'), icon: 'wifi', selected: false },
        { label: t('addBivouac:addEquipment.toilet'), icon: 'shower', selected: false },
        { label: t('addBivouac:addEquipment.shower'), icon: 'shower', selected: false },
        { label: t('addBivouac:addEquipment.campfire'), icon: 'fire', selected: false },
        { label: t('addBivouac:addEquipment.picnic'), icon: 'table', selected: false },
    ];
    
    return (

            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>{t('addBivouac:addBivouac')}</Text>
                <Text style={styles.subtitle}>{t('addBivouac:addEquipment.available')}</Text>
                <View style={styles.grid}>
                    {components.map((component, index) => (
                        <EquipmentComponent 
                            key={index}
                            label={component.label}
                            icon={component.icon}
                            selected={component.selected}
                            onPress={() => handleSelect(component.label)}
                        />
                    ))}
                </View>
                <Footer
                    onBackPress={handleBackPress}
                    onNextPress={handleNextPress}
                    progress={progress}
                />
            </ScrollView>

    )

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
    text: {
      marginHorizontal: 10,
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors.black,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: 340
    },
});

export default AddEquipment;