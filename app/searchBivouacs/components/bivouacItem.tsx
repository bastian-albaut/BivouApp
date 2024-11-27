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

    const imageMapping: { [key: number]: any } = {
        1: require('@/assets/images/photo1.jpg'),
        2: require('@/assets/images/photo2.jpg'),
        3: require('@/assets/images/photo3.jpg'),
        4: require('@/assets/images/photo4.jpg'),
        5: require('@/assets/images/photo5.jpg'),
        6: require('@/assets/images/photo6.jpg'),
        7: require('@/assets/images/photo7.jpg'),
        8: require('@/assets/images/photo8.jpg'),
        9: require('@/assets/images/photo9.jpg'),
        10: require('@/assets/images/photo10.jpg'),
        11: require('@/assets/images/photo11.jpg')
      };

      const BivouacImage = ({ bivouacId }: { bivouacId: keyof typeof imageMapping }) => {
        const imageSource = imageMapping[bivouacId];
        return <Image source={imageSource} style={styles.bivouacImage} resizeMode="cover" />;
      };

    if (!item) {
        console.error('BivouacItem received an undefined or null item:', item);
        return null;
    }

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
                <View style={styles.imageContainer}>
                <BivouacImage bivouacId={item.bivouacId} />
                    <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteIcon}>
                        <FontAwesome name="heart" size={28} color={isFavorited ? "red" : "gray"} />
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={styles.bivouacTitle}>{item.name ? item.name : 'Pas de nom'}</Text>
                    <Text style={styles.bivouacAddress}>{item.address ? `${item.address.number} ${item.address.street}, ${item.address.city} ${item.address.postalCode}`:'Privé'}</Text>
                    <View style={styles.bivouacViewHost}>
                        <FontAwesome style={styles.bivouacHostIcon} name="user-circle" size={20} color="black" />
                        <Text style={styles.bivouacHost}>{item.host ? item.host.first_name + ' ' + item.host.last_name:'Anonyme'}</Text>
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
        width: '100%',
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