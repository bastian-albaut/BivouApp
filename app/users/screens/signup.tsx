import React, { useState } from 'react';
import { View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import TextInputComponent from '../../../common/components/TextInputComponent';
import ButtonComponent from '../../../common/components/ButtonComponent';
import registerApi from '../api/registerApi';
import Colors from '@/common/constants/Colors';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const router = useRouter();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert(t('users:passwordMismatch'), t('users:passwordMismatchMessage'));
      return;
    }

    setLoading(true);
    try {
      await registerApi(email, password);
      Alert.alert(t('users:signUpSuccess'), t('users:signUpSuccessMessage'));
      router.push('/profilePage/screens/personalInformation');
    } catch (error) {
      Alert.alert(t('users:signUpFailed'), (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.centeredContainer}>
          <Text style={styles.leftAlignedTitle}>{t('users:signUp')}</Text>

          <TextInputComponent
            icon="envelope"
            placeholder={t('users:mailAddress')}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            secureTextEntry={false}
          />
          <TextInputComponent
            icon="lock"
            placeholder={t('users:password')}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <TextInputComponent
            icon="lock"
            placeholder={t('users:confirmPassword')}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
          />

          <Text style={styles.loginText}>{t('users:alreadyAccount')}</Text>

          <TouchableOpacity activeOpacity={0.8} onPress={() => router.navigate('./login')}>
            <Text style={styles.loginLink}>{t('users:login')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomButton}>
          <ButtonComponent
            title={loading ? t('users:loading') : t('users:signUp')}
            onPress={handleSignUp}
            disabled={loading}
          />
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
