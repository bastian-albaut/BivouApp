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

    const [selectedEquipment, setSelectedEquipment] = useState<number[]>([]);

    const [currentPage, setCurrentPage] = React.useState(3);
    const totalPages = 5;

    const { t } = useTranslation();

    const handleBackPress = () => {
        dispatch(updateEquipments(selectedEquipment));
        navigation.goBack();
    };
    
    const handleNextPress = () => {
        dispatch(updateEquipments({
            equipmentIds: selectedEquipment
        }));
        navigation.navigate('AddPhotos');
    };

    const progress = currentPage / totalPages;

    const handleSelect = (equipment_id: number, isSelected: boolean) => {
        setSelectedEquipment(prevSelected => {
            if (isSelected) {
                return [...prevSelected, equipment_id];
            } else {
                return prevSelected.filter(item => item !== equipment_id);
            }
        });
    };

    const components = [
        { equipment_id: 1, label: t('addBivouac:addEquipment.water'), icon: 'tint', selected: false },
        { equipment_id: 2, label: t('addBivouac:addEquipment.electricity'), icon: 'bolt', selected: false },
        { equipment_id: 3, label: t('addBivouac:addEquipment.shelter'), icon: 'shower', selected: false },
        { equipment_id: 4, label: t('addBivouac:addEquipment.wifi'), icon: 'wifi', selected: false },
        { equipment_id: 5, label: t('addBivouac:addEquipment.toilet'), icon: 'shower', selected: false },
        { equipment_id: 6, label: t('addBivouac:addEquipment.shower'), icon: 'shower', selected: false },
        { equipment_id: 7, label: t('addBivouac:addEquipment.campfire'), icon: 'fire', selected: false },
        { equipment_id: 8, label: t('addBivouac:addEquipment.picnic'), icon: 'table', selected: false },
    ];
    
    return (

            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>{t('addBivouac:addBivouac')}</Text>
                <Text style={styles.subtitle}>{t('addBivouac:addEquipment.available')}</Text>
                <View style={styles.grid}>
                    {components.map((component, index) => (
                        <EquipmentComponent 
                            key={index}
                            equipment_id={component.equipment_id}
                            label={component.label}
                            icon={component.icon}
                            selected={component.selected}
                            onSelect={handleSelect}
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