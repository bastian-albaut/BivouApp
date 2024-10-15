import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Colors from '@/common/constants/Colors';
import ButtonComponent from '@/common/components/ButtonComponent';

export default function ReservationConfirmation() {

    // Get the search parameters
    const params = useLocalSearchParams();
    const { startDate, endDate, bivouac } = params;
    const start = new Date(Array.isArray(startDate) ? startDate[0] : startDate);
    const end = new Date(Array.isArray(endDate) ? endDate[0] : endDate);
    const bivouacData = JSON.parse(Array.isArray(bivouac) ? bivouac[0] : bivouac);

    console.log('bivouacData', bivouacData);

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Détail de la réservation</Text>

        <View style={styles.bivouacInfoContainer}>
            <Text style={styles.bivouacName}>{bivouacData.name}</Text>
            <Text style={styles.bivouacAddress}>{bivouacData.address.street}, {bivouacData.address.city}</Text>
        </View>

        {/* Display Selected Dates */}
        <Text style={styles.label}>Date de début:</Text>
        <Text style={styles.date}>{start.toLocaleDateString('fr-FR')}</Text>

        <Text style={styles.label}>Date de fin:</Text>
        <Text style={styles.date}>{end.toLocaleDateString('fr-FR')}</Text>

        <Text style={styles.confirmationMessage}>
            Réservation du {start.toLocaleDateString('fr-FR')} au {end.toLocaleDateString('fr-FR')}.
        </Text>

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
        marginBottom: 20,
    },
    bivouacInfoContainer: {
        marginBottom: 20,
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
    label: {
        fontSize: 16,
        color: Colors.black,
        marginTop: 10,
    },
    date: {
        fontSize: 18,
        color: Colors.green1,
        marginTop: 5,
    },
    confirmationMessage: {
        marginTop: 30,
        fontSize: 18,
        color: Colors.black,
    },
});
