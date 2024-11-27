import React from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Colors from '@/common/constants/Colors';
import ButtonComponent from '@/common/components/ButtonComponent';
import { FontAwesome } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { addReservation } from '@/common/store/slices/reservationsSlice';
import { getUserId } from '@/common/utils/authStorage';

export default function ReservationConfirmation() {

    // Get the search parameters
    const params = useLocalSearchParams();
    const { startDate, endDate, bivouac } = params as { startDate: string | string[], endDate: string | string[], bivouac: string | string[] };
    const start = new Date(Array.isArray(startDate) ? startDate[0] : startDate);
    const end = new Date(Array.isArray(endDate) ? endDate[0] : endDate);
    const bivouacData = JSON.parse(Array.isArray(bivouac) ? bivouac[0] : bivouac);

    const { t } = useTranslation();

    // Calculate number of nights, tax (1%) and total price
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    const priceWithoutTax = (bivouacData.price * nights).toFixed(2);
    const tax = (parseFloat(priceWithoutTax) * 0.01).toFixed(2);
    const total = (parseFloat(priceWithoutTax) + parseFloat(tax)).toFixed(2);
    
    // Handle reservation confirmation
    const router = useRouter();
    const dispatch = useDispatch();
    const handleConfirmReservation = async () => {
        console.log('Confirm reservation');
        
        try {
            const hostId = await getUserId();
            if (hostId === null) {
                throw new Error('User ID not found');
            }
            await dispatch(
                addReservation({
                    bivouacId: bivouacData.id,
                    userId: hostId,
                    startDate: start.toISOString(),
                    endDate: end.toISOString(),
                    price: parseFloat(total),
                }) as any
            ).unwrap(); // Unwraps the promise to handle errors
            Alert.alert(t('reservationBivouacs:success_reservation_title'), t('reservationBivouacs:success_reservation_message'), [{text: "OK",onPress: () => router.push('../../(tabs)/profilePage'),},
            ]);
        } catch (error) {
            Alert.alert(t('reservationBivouacs:error_reservation_title'), t('reservationBivouacs:error_reservation_message'));
            console.error('Error confirming reservation:', error);
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('reservationBivouacs:reservation_details')}</Text>
            <Text style={styles.subtitle}>{t('reservationBivouacs:location')}</Text>
            <Image source={{ uri: bivouacData.photos[0] }} style={styles.bivouacImage} resizeMode="cover" />
            <Text style={styles.bivouacName}>{bivouacData.name}</Text>
            <Text style={styles.bivouacAddress}>{bivouacData.address.street}, {bivouacData.address.city}</Text>

            <View style={styles.hostContainer}>
                <FontAwesome name="user-circle" size={18} color={Colors.black} />
                <Text style={styles.host}>{t('common:host')}: {bivouacData.host.name}</Text>
            </View>

            <Text style={styles.subtitle}>{t('reservationBivouacs:journey')}</Text>
            <Text style={styles.dates}>{t('common:from')} {start.toLocaleDateString('fr-FR')} {t('common:to')} {end.toLocaleDateString('fr-FR')}</Text>

            <Text style={styles.subtitle}>{t('common:price')}</Text>
            <View style={styles.priceContainer}>
                <Text style={styles.priceText}>{bivouacData.price}€ x {nights}</Text>
                <Text style={styles.priceText}>{priceWithoutTax}€</Text>
            </View>
            <View style={styles.priceContainer}>
                <Text style={styles.priceText}>{t('reservationBivouacs:service_fees')}</Text>
                <Text style={styles.priceText}>{tax}€</Text>
            </View>
            <View style={[ styles.priceContainer, styles.totalContainer ]}>
                <Text style={[ styles.priceText, styles.total ]}>Total</Text>
                <Text style={[ styles.priceText, styles.total ]}>{total}€</Text>
            </View>

            <ButtonComponent title={t('reservationBivouacs:confirm_reservation')} onPress={handleConfirmReservation} />
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
        marginBottom: 10,
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
    totalContainer: {
        marginTop: 10,
        marginBottom: 30,
    },
    priceText: {
        fontSize: 16,
        color: Colors.black,
    },
    total: {
        fontWeight: 'bold',
    },
});
