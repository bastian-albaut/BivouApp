import React, { useState } from "react";
import { StyleSheet, Image, View, Text, Button, Pressable, TouchableOpacity } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/common/constants/Colors";
import { useRouter } from "expo-router";
import { weakMapMemoize } from "@reduxjs/toolkit";

export default function BivouacItemMap({ item }: { item: any }) {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.bivouacImageContainer} >
                <Image source={{ uri: 'https://picsum.photos/200/300' }} style={styles.bivouacImage} resizeMode="cover" />
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
