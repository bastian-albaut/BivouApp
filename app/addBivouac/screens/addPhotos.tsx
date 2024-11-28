import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import Colors from "@/common/constants/Colors";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { AddStackParamList } from './addStack';
import { StackNavigationProp } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';

const AddPhotos: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<AddStackParamList, 'AddPhotos'>>();

    const [photos, setPhotos] = useState<string[]>([]);

    const { t } = useTranslation();

    const [currentPage, setCurrentPage] = React.useState(4);
    const totalPages = 5;

    const handleBackPress = () => {
        navigation.goBack();
    };
    
    const handleNextPress = () => {
        navigation.navigate('AddPrice');
    };

    const handleAddPhoto = async () => {
        // Demander la permission d'accès aux photos
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access media library is required!');
            return;
        }

        // Ouvrir la bibliothèque d'images
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            // allowsEditing: true,
            // aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const uris = result.assets
                .map(asset => asset.uri)
                .filter((uri): uri is string => uri !== undefined); // Filtrer les `undefined`

            setPhotos([...photos, ...uris]);
        }
    };

    const progress = currentPage / totalPages;

    
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

                {photos.map((photo, index) => (
                    <Image key={index} source={{ uri: photo }} style={styles.photo} />
                ))}

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
    photo: {
        width: 100,
        height: 100,
        margin: 10,
        borderRadius: 10,
    }
});

export default AddPhotos;