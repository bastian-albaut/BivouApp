import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import Colors from "@/common/constants/Colors";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { AddStackParamList } from './addStack';
import { StackNavigationProp } from '@react-navigation/stack';

const AddPhotos: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<AddStackParamList, 'AddPhotos'>>();

    const { t } = useTranslation();

    const [currentPage, setCurrentPage] = React.useState(4);
    const totalPages = 5;

    const handleBackPress = () => {
        navigation.goBack();
    };
    
    const handleNextPress = () => {
        navigation.navigate('AddPrice');
    };

    const progress = currentPage / totalPages;

    
    return (

            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>{t('addBivouac:addBivouac')}</Text>
                <Text style={styles.subtitle}>{t('addBivouac:addPhotos.photos')}</Text>


                <TouchableOpacity 
                    style={[styles.button]}
                    //onPress={handleAddPhoto}
                    activeOpacity={0.8} 
                >
                    <View style={styles.buttonIconCircle}>
                        <FontAwesome name="plus" size={16} color={Colors.black} />
                    </View>
                    <Text style={[styles.buttonText]}>{t('addBivouac:addPhotos.add')}</Text>
                </TouchableOpacity>


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
    button: {
        width: 340,
        height: 50,
        margin: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonIconCircle: {
        width: 25,       // Ajuster la taille du cercle
        height: 25,
        borderRadius: 15, // Pour créer le cercle
        borderColor: Colors.black,
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.black,
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});

export default AddPhotos;