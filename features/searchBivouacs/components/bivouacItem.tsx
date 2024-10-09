import React from "react";
import { StyleSheet, Image, View, Text, Button } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/common/constants/Colors";

export default function BivouacItem({ item }: { item: any }) {

    return (
        <View style={styles.bivouacItem}>
        <Image source={{ uri: item.imageUrl }} style={styles.bivouacImage} resizeMode="cover" />
        <View>
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
    bivouacItem: {
        flexDirection: 'column',
        padding: 10,
    },
    bivouacImage: {
        alignSelf: 'stretch',
        height: 250,
        borderRadius: 10,
        marginBottom: 10,
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
        color: Colors.secondary
    },    
    bivouacHost: {
        color: Colors.secondary
    },
});