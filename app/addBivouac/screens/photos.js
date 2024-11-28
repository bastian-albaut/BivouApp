// import * as ImagePicker from 'expo-image-picker';
// import React, { useState } from 'react';
// import { Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import MapView, { MapEvent, Marker } from 'react-native-maps';
// import { useDispatch } from 'react-redux';
// import amenitiesData from '../data/amenities.json';
// import { addLocation } from '../features/locations/locationSlice';
// import CustomButton from './CustomButton';

// interface LocationFormProps {
//     onSubmit: () => void;
//     initialValues?: {
//         idLocation: number;
//         name: string;
//         address: string;
//         description: string;
//         amenities: string[];
//         latitude: number;
//         longitude: number;
//         pricePerNight: number;
//     };
// }

// const LocationForm: React.FC<LocationFormProps> = ({ onSubmit, initialValues }) => {
//     const [name, setName] = useState(initialValues?.name || '');
//     const [address, setAddress] = useState(initialValues?.address || '');
//     const [description, setDescription] = useState(initialValues?.description || '');
//     const [pricePerNight, setPricePerNight] = useState(initialValues?.pricePerNight.toString() || '');
//     const [selectedAmenities, setSelectedAmenities] = useState<string[]>(initialValues?.amenities || []);
//     const [coordinate, setCoordinate] = useState({
//         latitude: initialValues?.latitude || 37.78825,
//         longitude: initialValues?.longitude || -122.4324,
//     });
//     const [selectedImage, setSelectedImage] = useState<string | null>(null);
//     const dispatch = useDispatch();

//     const toggleAmenity = (amenity: string) => {
//         if (selectedAmenities.includes(amenity)) {
//             setSelectedAmenities(selectedAmenities.filter(item => item !== amenity));
//         } else {
//             setSelectedAmenities([...selectedAmenities, amenity]);
//         }
//     };

//     const handleMapPress = (event: MapEvent) => {
//         setCoordinate(event.nativeEvent.coordinate);
//     };

//     const pickImage = async () => {
//         const result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             aspect: [4, 3],
//             quality: 1,
//         });

//         if (!result.canceled) {
//             setSelectedImage(result.assets[0].uri);
//         }
//     };

//     const handleAddLocation = () => {
//         if (name && address && description && pricePerNight && selectedAmenities.length > 0) {
//             dispatch(addLocation({
//                 idLocation: initialValues?.idLocation || Math.floor(Math.random() * 10000),
//                 idHost: 1,
//                 name,
//                 address,
//                 description,
//                 amenities: selectedAmenities,
//                 image: selectedImage || require('../../assets/images/biv2.jpg'),
//                 latitude: coordinate.latitude,
//                 longitude: coordinate.longitude,
//                 pricePerNight: parseFloat(pricePerNight),
//             }));
//             onSubmit();
//         }
//     };

//     return (
//         <ScrollView contentContainerStyle={styles.scrollContainer}>
//             <View style={styles.form}>
//                 <Text style={styles.label}>Nom :</Text>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Nom de l'emplacement"
//                     value={name}
//                     onChangeText={setName}
//                 />
//                 <Text style={styles.label}>Adresse :</Text>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Adresse"
//                     value={address}
//                     onChangeText={setAddress}
//                 />
//                 <Text style={styles.label}>Description :</Text>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Description de l'emplacement"
//                     value={description}
//                     onChangeText={setDescription}
//                 />

//                 {/* Carte interactive */}
//                 <Text style={styles.label}>Emplacement sur la carte :</Text>
//                 <MapView
//                     style={styles.map}
//                     initialRegion={{
//                         latitude: coordinate.latitude,
//                         longitude: coordinate.longitude,
//                         latitudeDelta: 0.0922,
//                         longitudeDelta: 0.0421,
//                     }}
//                     onPress={handleMapPress}
//                 >
//                     <Marker coordinate={coordinate} />
//                 </MapView>

//                 <Text style={styles.label}>Prix par nuit :</Text>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Prix par nuit (€)"
//                     value={pricePerNight}
//                     keyboardType="numeric"
//                     onChangeText={setPricePerNight}
//                 />

//                 <Text style={styles.label}>Commodités :</Text>
//                 <View style={styles.amenitiesContainer}>
//                     {amenitiesData.map((amenity) => (
//                         <TouchableOpacity
//                             key={amenity.id}
//                             style={[
//                                 styles.amenityButton,
//                                 selectedAmenities.includes(amenity.name) ? styles.amenitySelected : styles.amenityUnselected
//                             ]}
//                             onPress={() => toggleAmenity(amenity.name)}
//                         >
//                             <Text style={styles.amenityText}>{amenity.name}</Text>
//                         </TouchableOpacity>
//                     ))}
//                 </View>

//                 <Button title="Choisir une image" onPress={pickImage} />
//                 {selectedImage && (
//                     <Image source={{ uri: selectedImage }} style={styles.image} />
//                 )}

//                 <CustomButton action={handleAddLocation} color="#f0ad4e" text="Valider" />
//             </View>
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     scrollContainer: {
//         paddingBottom: 20,
//     },
//     form: {
//         padding: 20,
//         marginBottom: 20,
//     },
//     label: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginBottom: 5,
//     },
//     input: {
//         borderColor: '#ccc',
//         borderWidth: 1,
//         borderRadius: 5,
//         padding: 10,
//         marginBottom: 10,
//     },
//     map: {
//         height: 200,
//         marginVertical: 10,
//         borderRadius: 10,
//     },
//     amenitiesContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         marginBottom: 10,
//     },
//     amenityButton: {
//         padding: 10,
//         borderRadius: 5,
//         marginRight: 10,
//         marginBottom: 10,
//     },
//     amenitySelected: {
//         backgroundColor: '#f0ad4e',
//     },
//     amenityUnselected: {
//         backgroundColor: '#e0e0e0',
//     },
//     amenityText: {
//         color: '#fff',
//         fontWeight: 'bold',
//     },
//     image: {
//         width: 200,
//         height: 200,
//         marginVertical: 10,
//         borderRadius: 10,
//     },
// });

// export default LocationForm;