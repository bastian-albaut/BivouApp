import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import TextInputComponent from '../../../common/components/TextInputComponent';
import ButtonComponent from '../../../common/components/ButtonComponent';
import Colors from '@/common/constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/common/store/store';
import { fetchUserById, updateUser } from '@/common/store/slices/usersSlice';
import { getToken, getUserId } from '@/common/utils/authStorage';

export default function PersonalInformation() {
  const { t } = useTranslation();
  const router = useRouter();
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Redux store access
  const dispatch = useDispatch<AppDispatch>();
  const { selectedUser, loading, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await getUserId();
        if (!userId) {
          throw new Error('User ID not found');
        }
        const token = await getToken();
        if (!token) {
          throw new Error('Token not found');
        }
        await dispatch(fetchUserById({ id: userId, token })).unwrap();
      } catch (err) {
        console.error('Error fetching user data:', err);
        Alert.alert(t('common:error'), t('users:fetchUserError'));
      }
    };
    fetchUserData();
  }, [dispatch]);

  useEffect(() => {
    if (selectedUser) {
      console.log('selectedUser', selectedUser);
      setSurname(selectedUser.surname || '');
      setName(selectedUser.name || '');
      setEmail(selectedUser.email || '');
      setPhone(selectedUser.phone || '');
    }
  }, [selectedUser]);

  const handleSubmit = async () => {
    try {
      const userId = await getUserId();
      if (!userId) {
        throw new Error('User ID not found');
      }

      await dispatch(
        updateUser({
          userId,
          surname,
          name,
          email,
          phone,
        })
      ).unwrap();

      Alert.alert(t('users:updateSuccessTitle'), t('users:updateSuccessMessage'));
      router.push('../../(tabs)/profilePage');
    } catch (err) {
      console.error('Error updating user:', err);
      Alert.alert(t('common:updateErrorTitle'), t('users:updateErrorMessage'));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredContainer}>
        <Text style={styles.leftAlignedTitle}>{t('users:fillInformation')}</Text>

        <TextInputComponent
          icon="user"
          placeholder={t('users:surname')}
          value={surname}
          onChangeText={setSurname}
          secureTextEntry={false}
        />
        <TextInputComponent
          icon="user"
          placeholder={t('users:name')}
          value={name}
          onChangeText={setName}
          secureTextEntry={false}
        />
        <TextInputComponent
          icon="envelope"
          placeholder={t('users:email')}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          secureTextEntry={false}
        />
        <TextInputComponent
          icon="phone"
          placeholder={t('users:phone')}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          secureTextEntry={false}
        />
      </View>

      <View style={styles.bottomButton}>
        <ButtonComponent title={t('users:validate')} onPress={handleSubmit} />
      </View>
    </View>
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
  bottomButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
});
