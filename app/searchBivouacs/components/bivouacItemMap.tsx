import React, { useState } from "react";
import { StyleSheet, Image, View, Text, Button, Pressable, TouchableOpacity } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/common/constants/Colors";
import { useRouter } from "expo-router";
import { weakMapMemoize } from "@reduxjs/toolkit";

export default function BivouacItemMap({ item }: { item: any }) {
    const router = useRouter();

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

    return (
        <View style={styles.container}>
            <View style={styles.bivouacImageContainer} >
                <BivouacImage bivouacId={item.bivouacId} />
            </View>
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
                <View style={styles.bivouacInformations}>
                    <Text style={styles.bivouacTitle}>{item.name ? item.name : 'Pas de nom'}</Text>
                    <Text style={styles.bivouacAddress}>{item.address ? `${item.address.number} ${item.address.street}, ${item.address.city} ${item.address.postalCode}`:'Privé'}</Text>
                    <View style={styles.bivouacViewHost}>
                        <FontAwesome style={styles.bivouacHostIcon} name="user-circle" size={20} color="black" />
                        <Text style={styles.bivouacHost}>{item.host ? item.host.first_name + ' ' + item.host.last_name:'Anonyme'}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: Colors.black,
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        backgroundColor: Colors.black,
        marginRight: 15,
        width: 'auto',
    },
    bivouacInformations: {
        flexDirection: 'column',
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
    },
    bivouacImageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bivouacImage: {
        height: 100,
        width: 100,
        padding: 2,
        borderRadius: 5
    },
    bivouacTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.white,
    },
    bivouacAddress: {
        color: Colors.white,
    },
    bivouacViewHost: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    bivouacHostIcon: {
        color: Colors.green3,
    },    
    bivouacHost: {
        color: Colors.green3,
    },
});
