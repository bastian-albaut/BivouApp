import React, { useState } from "react";
import { StyleSheet, Image, View, Text, Button, Pressable, TouchableOpacity } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/common/constants/Colors";
import { useRouter } from "expo-router";

export default function BivouacItem({ item }: { item: any }) {
    const router = useRouter();

    // State to manage favorite status
    const [isFavorited, setIsFavorited] = useState(false);

    // Toggle the favorite status
    const toggleFavorite = () => {
        setIsFavorited(!isFavorited);
    };

    return (
        <TouchableOpacity 
            activeOpacity={0.8} 
            onPress={() => 
            router.push({
                pathname: '/reservationBivouacs/screens/detailBivouac',
                params: {
                itemId: item.id
                },
            })}
        >
            <View style={styles.bivouacItem}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.photos[0] }} style={styles.bivouacImage} resizeMode="cover" />
                    <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteIcon}>
                        <FontAwesome name="heart" size={28} color={isFavorited ? "red" : "gray"} />
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={styles.bivouacTitle}>{item.name}</Text>
                    <Text style={styles.bivouacAddress}>{`${item.address.number} ${item.address.street}, ${item.address.city}, ${item.address.postalCode}`}</Text>
                    <View style={styles.bivouacViewHost}>
                        <FontAwesome style={styles.bivouacHostIcon} name="user-circle" size={20} color="black" />
                        <Text style={styles.bivouacHost}>{item.host.name}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    bivouacItem: {
        flexDirection: 'column',
        padding: 10,
    },
    imageContainer: {
        position: 'relative',
    },
    bivouacImage: {
        alignSelf: 'stretch',
        height: 250,
        borderRadius: 10,
        marginBottom: 10,
    },
    favoriteIcon: {
        position: 'absolute',
        top: 15,
        right: 15,
        zIndex: 1,
    },
    bivouacTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    bivouacAddress: {
        color: '#555',
    },
    bivouacViewHost: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        marginTop: 5,
    },
    bivouacHostIcon: {
        color: Colors.secondary,
    },    
    bivouacHost: {
        color: Colors.secondary,
    },
});