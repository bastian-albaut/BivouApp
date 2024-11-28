import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView, Text, TouchableOpacity, Image, Dimensions, Modal, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import Colors from "@/common/constants/Colors";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { AddStackParamList } from './addStack';
import { StackNavigationProp } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';
import { updatePhotos } from '../../../common/store/slices/bivouacsSlice';

const AddPhotos: React.FC = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<StackNavigationProp<AddStackParamList, 'AddPhotos'>>();

    const [photos, setPhotos] = useState<string[]>([]);
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);  // Etat pour gérer la photo sélectionnée
    const [uploading, setUploading] = useState<boolean>(false);  // Gérer l'état de l'upload
    
    const { t } = useTranslation();

    const [currentPage, setCurrentPage] = React.useState(4);
    const totalPages = 5;

    const handleBackPress = () => {
        navigation.goBack();
    };
    
    const handleNextPress = () => {
        console.log(photos);
        dispatch(updatePhotos({
            photos
        }));
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
            quality: 1,
        });
    
        if (!result.canceled) {
            const uris = result.assets
                .map(asset => asset.uri)
                .filter((uri): uri is string => uri !== undefined); // Filtrer les `undefined`
    
            // Upload chaque photo sélectionnée et mettre à jour la liste des photos avec la réponse de l'API
            for (const uri of uris) {
                console.log(uri);
                const photo = await uploadPhoto(uri);  // Envoie la photo et récupère l'objet photo
                if (photo) {
                    setPhotos(prevPhotos => [...prevPhotos, photo]);  // Ajouter l'objet photo à la liste des photos
                }
            }
        }
    };

    const uploadPhoto = async (uri: string) => {
        const formData = new FormData();
        const fileName = uri.split('/').pop(); // Extraire le nom de fichier
        const type = 'image/jpeg';  // Type d'image, peut être ajusté selon les besoins
    
        // Créer un objet de fichier
        const file = {
            uri,
            name: fileName || 'photo.jpg', // Assurez-vous qu'il y a un nom de fichier
            type,
        };
    
        // Ajouter le fichier au FormData
        formData.append('file', file as any);
    
        try {
            const response = await fetch('http://10.0.0.54:8080/api/photos', {
                method: 'POST',
                body: formData,
                headers: {
                    // 'Content-Type': 'multipart/form-data',  // Spécifie le type de contenu
                    'Accept': 'application/json',  // Accepter une réponse JSON
                },
            });
            console.log(response);
            console.log('response.ok ', response);
            const responseText = await response.text();  // Lire la réponse en tant que texte brut

            console.log('Response Text:', responseText);
            if (response.ok) {
                const responseText = await response.text();  // Lire la réponse en tant que texte brut
                console.log('Response Text:', responseText);

                // Extraire le filename de la réponse
                const filenameMatch = responseText.match(/File uploaded successfully: (.+)/);
                if (filenameMatch && filenameMatch[1]) {
                    return filenameMatch[1];  // Retourner le filename
                } else {
                    console.error('Format de réponse inattendu');
                    return null;
                }
            } else {
                const responseText = await response.text();  // Lire la réponse en tant que texte brut
                console.error('Erreur lors de l\'upload de la photo', responseText);
                return null;
            }
        } catch (error) {
            console.error('Erreur lors de l\'upload:', error);
            return null;
        }
    };

    const handlePhotoClick = (uri: string) => {
        setSelectedPhoto(uri);  // Affiche l'image dans le modal
    };

    const handleCloseModal = () => {
        setSelectedPhoto(null);  // Ferme le modal en réinitialisant l'état
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
                    <TouchableOpacity key={index} onPress={() => handlePhotoClick(photo)}>
                        <Image source={{ uri: photo }} style={styles.photo} />
                    </TouchableOpacity>
                ))}

                <Footer
                    onBackPress={handleBackPress}
                    onNextPress={handleNextPress}
                    progress={progress}
                />

                            {/* Modal pour afficher l'image en taille réelle */}
                <Modal
                    visible={selectedPhoto !== null}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={handleCloseModal}
                >
                    <TouchableWithoutFeedback onPress={handleCloseModal}>
                        <View style={styles.modalBackground}>
                            {/* Afficher l'image si selectedPhoto est non nul */}
                            {selectedPhoto ? (
                                <Image source={{ uri: selectedPhoto }} style={styles.modalImage} />
                            ) : null}
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </ScrollView>

    )

};

const { width, height } = Dimensions.get('window');

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
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalImage: {
        maxWidth: width - 40,
        maxHeight: height / 2,
        resizeMode: 'contain',
        borderRadius: 10,
    }
});

export default AddPhotos;