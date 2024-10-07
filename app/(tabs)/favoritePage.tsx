import { useDispatch, useSelector } from 'react-redux';
import { Button, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import React, { useEffect } from 'react';
import { fetchUsers } from '../../store/slices/usersSlice';
import { RootState, AppDispatch } from '../../store/store';


export default function SearchPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  
  return (
    <View style={styles.container}>
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}
      {data && data.map((user) => <Text key={user.id}>{user.name}</Text>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
