import React, { useState } from 'react';
import { View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import TextInputComponent from '../../../common/components/TextInputComponent';
import ButtonComponent from '../../../common/components/ButtonComponent';
import Colors from '@/common/constants/Colors';

export default function personalInformationProfile() {
    const { t } = useTranslation();
    const router = useRouter();

    const [editable, setEditable] = useState(false);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <View style={styles.centeredContainer}>
                <Text style={styles.leftAlignedTitle}>{t('users:fillInformation')}</Text>

                <TextInputComponent editable={editable} icon="user" placeholder={t('users:surname')} value="" secureTextEntry={false} />
                <TextInputComponent editable={editable}  icon="user" placeholder={t('users:name')} value="" secureTextEntry={false} />

                <TextInputComponent editable={editable}  icon="envelope" placeholder={t('users:mailAddress')} keyboardType="email-address" value="" secureTextEntry={false} />
                
                <TextInputComponent editable={editable}  icon="phone" placeholder={t('users:phone')} keyboardType="phone-pad" value="" secureTextEntry={false} />

                

            </View>

            <View style={styles.bottomButton}>
                <ButtonComponent title={t('users:modify')} onPress={() => setEditable(true)} />
            </View>
        </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'space-between', 
    padding: 20,
  },
  centeredContainer: {
    alignItems: 'center',
    height: '70%',
    justifyContent: 'center',
  },
  leftAlignedTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 20,
    width: '100%',
    textAlign: 'left',
    paddingLeft: 10,
  },
  loginText: {
    marginTop: 20,
    fontSize: 14,
    color: Colors.black,
  },
  loginLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: Colors.green1,
    marginTop: 2,
  },
  bottomButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
});
 