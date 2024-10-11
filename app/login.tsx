import React, { useState } from 'react';
import { View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import TextInputComponent from '../common/components/TextInputComponent';
import ButtonComponent from '../common/components/ButtonComponent';
import Colors from '@/common/constants/Colors';

export default function Login() {
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation();

  const router = useRouter();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.centeredContainer}>
          {/* <Text style={styles.leftAlignedTitle}>t('login:loginTitle')</Text> */}
          <Text style={styles.leftAlignedTitle}>Se connecter</Text>

          <TextInputComponent icon="envelope" placeholder="Adresse mail" value="" secureTextEntry={false} />
          <TextInputComponent icon="lock" placeholder="Mot de passe" value="" secureTextEntry={true} />

          <Text style={styles.signupText}>
            Vous n'avez pas encore de compte ?
          </Text>
          <TouchableOpacity activeOpacity={0.8} onPress={() => router.navigate("./signup")}>
              <Text style={styles.signupLink}>S'inscrire</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomButton}>
          <ButtonComponent title="Se connecter" onPress={() => console.log('Se connecter')} />
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
