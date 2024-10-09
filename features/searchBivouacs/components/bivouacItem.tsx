import React from "react";
import { StyleSheet, Image, View, Text } from 'react-native';

export default function BivouacItem({ item }: { item: any }) {
    return (

        <View style={styles.bivouacItem}>
        <Image source={{ uri: item.imageUrl }} style={styles.bivouacImage} />
        <View style={styles.bivouacInfo}>
            <Text style={styles.bivouacTitle}>{item.name}</Text>
            <Text style={styles.bivouacAddress}>{`${item.address.number} ${item.address.street}, ${item.address.city}, ${item.address.postalCode}`}</Text>
            <Text style={styles.bivouacHost}>Host: {item.host.name}</Text>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    bivouacItem: {
        flexDirection: 'row',
        padding: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        marginHorizontal: 20,
        alignItems: 'center',
    },
    bivouacImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
    },
    bivouacInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    bivouacTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    bivouacAddress: {
        color: '#555',
    },
        bivouacHost: {
        color: '#999',
    },
});