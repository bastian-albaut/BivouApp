import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import Colors from "@/common/constants/Colors";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';

const AddPhotos: React.FC = () => {

    const { t } = useTranslation();

    const [photos, setPhotos] = useState([]);

    const [currentPage, setCurrentPage] = React.useState(4);
    const totalPages = 6;

    const handleBackPress = () => {
        Alert.alert('Retour', 'Retour à la page précédente');
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };
    
    const handleNextPress = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const progress = currentPage / totalPages;

    const handleAddPhoto = () => {
        ImagePicker.launchImageLibrary(
            { mediaType: 'photo', selectionLimit: 15 - photos.length },
            response => {
                if (!response.didCancel && !response.errorCode) {
                    const selectedPhotos = response.assets.map(asset => asset.uri);
                    setPhotos(prevPhotos => [...prevPhotos, ...selectedPhotos]);
                }
            }
        );
    };
    
    return (

            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>{t('addBivouac:addBivouac')}</Text>
                <Text style={styles.subtitle}>{t('addBivouac:addPhotos.photos')}</Text>


                <TouchableOpacity 
                    style={[styles.button]}
                    onPress={handleAddPhoto}
                    activeOpacity={0.8} 
                >
                    <View style={styles.buttonIconCircle}>
                        <FontAwesome name="plus" size={16} color={Colors.black} />
                    </View>
                    <Text style={[styles.buttonText]}>{t('addBivouac:addPhotos.add')}</Text>
                </TouchableOpacity>

                <View style={styles.gallery}>
                    {photos.map((photo, index) => (
                        <Image key={index} source={{ uri: photo }} style={styles.photo} />
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
    gallery: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 20,
    },
    photo: {
        width: 100,
        height: 100,
        borderRadius: 10,
        margin: 5,
    },
});

export default AddPhotos;