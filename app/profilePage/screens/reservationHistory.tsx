import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import Colors from '@/common/constants/Colors';


export default function ReservationHistory() {
    const { t } = useTranslation();
    
    return (
        <ScrollView style={styles.container}>
            
            <Text style={styles.title}>Hello 2</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
        marginBottom: 20,
    },
    textTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: Colors.black,
        marginTop: 20,
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        color: Colors.black,
        textAlign: 'justify',
    },
});