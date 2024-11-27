import React, { useState } from 'react';
import { View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import TextInputComponent from '../../../common/components/TextInputComponent';
import ButtonComponent from '../../../common/components/ButtonComponent';
import { loginApi } from '../api/loginApi';
import { storeToken, storeUserId } from '@/common/utils/authStorage';
import Colors from '@/common/constants/Colors';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const { token, userId } = await loginApi(email, password);
      await storeToken(token);
      await storeUserId(userId); // Stocke l'ID utilisateur dans le stockage sécurisé
      router.push('../../(tabs)/searchBivouacList');
    } catch (error) {
      Alert.alert('Login failed', (error as Error).message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.centeredContainer}>
          <Text style={styles.leftAlignedTitle}>{t('users:loginTitle')}</Text>

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

          <Text style={styles.signupText}>
            {t('users:noAccount')} 
          </Text>
          <TouchableOpacity activeOpacity={0.8} onPress={() => router.navigate("/users/screens/signup")}>
              <Text style={styles.signupLink}>{t('users:signUp')} </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomButton}>
          <ButtonComponent
            title={loading ? t('users:loading') : t('users:login')}
            onPress={handleLogin}
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
  signupText: {
    marginTop: 20,
    fontSize: 14,
    color: Colors.black,
  },
  signupLink: {
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
