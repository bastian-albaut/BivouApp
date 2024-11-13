import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import Colors from '@/common/constants/Colors';


export default function PrivacyPolicy() {
    const { t } = useTranslation();
    
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{t('profilePage:privacyPolicyTitle')}</Text>

            <Text style={styles.textTitle}>
                {t('profilePage:privacyPolicyTitle')}
            </Text>
            <Text style={styles.text}>
                {t('profilePage:privacyPolicyContent')}
            </Text>

            <Text style={styles.textTitle}>
            {t('profilePage:collectDataSubtitle')}
            </Text>
            <Text style={styles.text}>
                {t('profilePage:collectDataContent')}
            </Text>

            <Text style={styles.textTitle}>
                {t('profilePage:useDataSubtitle')}
            </Text>
            <Text style={styles.text}>
                {t('profilePage:useDataContent')}
            </Text>

            <Text style={styles.textTitle}>
                {t('profilePage:protectDataSubtitle')}
            </Text>
            <Text style={styles.text}>
                {t('profilePage:protectDataContent')}
            </Text>

            <Text style={styles.textTitle}>
                {t('profilePage:yourRightsSubtitle')}
            </Text>
            <Text style={styles.text}>
                {t('profilePage:yourRightsContent')}
            </Text>

            <Text style={styles.textTitle}>
                {t('profilePage:modifyDataSubtitle')}
            </Text>
            <Text style={styles.text}>
                {t('profilePage:modifyDataContent')}
            </Text>

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