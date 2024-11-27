import React, { useState } from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/common/constants/Colors";
import { useRouter } from "expo-router";
import CustomIconButton from "@/common/components/customIconButton";

export default function BivouacItem({ item }: { item: any }) {
    const router = useRouter();

    // State to manage favorite status
    const [isFavorited, setIsFavorited] = useState(false);

    // Toggle the favorite status
    const toggleFavorite = () => {
        setIsFavorited(!isFavorited);
    };

    // Handle Delete Action
    const handleDelete = () => {
        console.log(`Deleting bivouac with ID: ${item.bivouacId}`);
    };

    return (
        <TouchableOpacity 
            activeOpacity={0.8} 
            onPress={() => 
            router.push({
                pathname: '/reservationBivouacs/screens/detailBivouac',
                params: {
                    itemId: item.bivouacId
                },
            })}
        >
            <View style={styles.bivouacItem}>
                {/* Image Section */}
                <View style={styles.imageContainer}>
                    <Image source={{ uri: "https://picsum.photos/200/300" }} style={styles.bivouacImage} resizeMode="cover" />
                </View>

                {/* Information and Action Section */}
                <View style={styles.informationContainer}>
                    <Text style={styles.bivouacTitle}>{item.name ? item.name : 'Pas de nom'}</Text>
                    
                    {/* Delete Button */}
                    <View style={styles.actionContainer}>
                        <CustomIconButton
                            title="Supprimer"
                            iconName="trash"
                            onPress={handleDelete}
                            buttonStyle={styles.deleteButton}
                            textStyle={styles.deleteButtonText}
                        />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    bivouacItem: {
        flexDirection: 'row',
        padding: 10,
    },
    imageContainer: {
        position: 'relative',
        flex: 2,
    },
    informationContainer: {
        flex: 3,
        marginLeft: 10,
        justifyContent: 'space-between',
    },
    bivouacImage: {
        alignSelf: 'stretch',
        height: 100,
        borderRadius: 10,
    },
    bivouacTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    bivouacAddress: {
        color: '#555',
        marginBottom: 10,
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    deleteButton: {
        backgroundColor: Colors.red,
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    deleteButtonText: {
        fontSize: 15,
    },
});
