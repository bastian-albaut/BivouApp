import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView, Text } from 'react-native';
import EquipmentComponent from '../components/EquipmentComponent';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import Colors from "@/common/constants/Colors";

const AddEquipment: React.FC = () => {

    const { t } = useTranslation();

    const [currentPage, setCurrentPage] = React.useState(3);
    const totalPages = 6;

    const handleBackPress = () => {
        Alert.alert('Retour', 'Retour à la page précédente');
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };
    
    const handleNextPress = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const progress = currentPage / totalPages;

    const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

    const handleSelect = (label: string, isSelected: boolean) => {
        setSelectedLabels(prevLabels => {
            if (isSelected) {
                return [...prevLabels, label];
            } else {
                return prevLabels.filter(item => item !== label);
            }
        });
    };

    const [components, setComponents] = useState([
        { label: t('addBivouac:addEquipment.water'), icon: 'tint', selected: false },
        { label: t('addBivouac:addEquipment.electricity'), icon: 'bolt', selected: false },
        { label: t('addBivouac:addEquipment.shelter'), icon: 'shower', selected: false },
        { label: t('addBivouac:addEquipment.wifi'), icon: 'wifi', selected: false },
        { label: t('addBivouac:addEquipment.toilet'), icon: 'shower', selected: false },
        { label: t('addBivouac:addEquipment.shower'), icon: 'shower', selected: false },
        { label: t('addBivouac:addEquipment.campfire'), icon: 'fire', selected: false },
        { label: t('addBivouac:addEquipment.picnic'), icon: 'table', selected: false },
    ]);
    
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