import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Colors from '@/common/constants/Colors';
import ButtonComponent from '@/common/components/ButtonComponent';
import { FontAwesome } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

export default function ReservationConfirmation() {

    // Get the search parameters
    const params = useLocalSearchParams();
    const { startDate, endDate, bivouac } = params;
    const start = new Date(Array.isArray(startDate) ? startDate[0] : startDate);
    const end = new Date(Array.isArray(endDate) ? endDate[0] : endDate);
    const bivouacData = JSON.parse(Array.isArray(bivouac) ? bivouac[0] : bivouac);

    const { t } = useTranslation();

    // Calculate number of nights, tax (1%) and total price
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    const priceWithoutTax = bivouacData.price * nights;
    const tax = priceWithoutTax * 0.01;
    const total = priceWithoutTax + tax;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Détail de la réservation</Text>
            <Text style={styles.subtitle}>Emplacement</Text>
            <Image source={{ uri: bivouacData.photos[0] }} style={styles.bivouacImage} resizeMode="cover" />
            <Text style={styles.bivouacName}>{bivouacData.name}</Text>
            <Text style={styles.bivouacAddress}>{bivouacData.address.street}, {bivouacData.address.city}</Text>

            <View style={styles.hostContainer}>
                <FontAwesome name="user-circle" size={18} color={Colors.black} />
                <Text style={styles.host}>{t('common:host')}: {bivouacData.host.name}</Text>
            </View>

            <Text style={styles.subtitle}>Voyage</Text>
            <Text style={styles.dates}>Du {start.toLocaleDateString('fr-FR')} au {end.toLocaleDateString('fr-FR')}</Text>

            <Text style={styles.subtitle}>Prix</Text>
            <View style={styles.priceContainer}>
                <Text style={styles.priceText}>{bivouacData.price}€ x {nights}</Text>
                <Text style={styles.priceText}>{priceWithoutTax}€</Text>
            </View>
            <View style={styles.priceContainer}>
                <Text style={styles.priceText}>Frais de service</Text>
                <Text style={styles.priceText}>{tax}€</Text>
            </View>

            <ButtonComponent title="Confirmer la réservation" onPress={() => console.log('Confirmation de réservation')} />
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.white,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.black,
    },
    subtitle: {
        fontSize: 19,
        fontWeight: "600",
        color: Colors.black,
        marginTop: 30,
        marginBottom: 15,
    },
    bivouacImage: {
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    bivouacName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.black,
    },
    bivouacAddress: {
        fontSize: 16,
        color: Colors.black,
        marginTop: 5,
    },
    dates: {
        fontSize: 16,
        color: Colors.black,
    },
    confirmationMessage: {
        marginTop: 30,
        fontSize: 18,
        color: Colors.black,
    },
    hostContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    host: {
        fontSize: 16,
        marginLeft: 5,
        color: Colors.black,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    priceText: {
        fontSize: 16,
        color: Colors.black,
    },
});
