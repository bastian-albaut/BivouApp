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
            <View>
                <Image source={{ uri: item.photos[0] }} style={styles.bivouacImage} resizeMode="cover" />
            </View>
            <View style={styles.bivouacInformations}>
                <Text style={styles.bivouacTitle}>{item.name}</Text>
                <Text style={styles.bivouacAddress}>{`${item.address.number} ${item.address.street}, ${item.address.city}, ${item.address.postalCode}`}</Text>
                <View style={styles.bivouacViewHost}>
                    <FontAwesome style={styles.bivouacHostIcon} name="user-circle" size={20} color="black" />
                    <Text style={styles.bivouacHost}>{item.host.name}</Text>
                </View>
            </View>
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
        backgroundColor: '#fff',
        marginRight: 15,
    },
    bivouacInformations: {
        flexDirection: 'column',
        
    },
    bivouacImage: {
        height: 100,
        width: 100,
        borderRadius: 5
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