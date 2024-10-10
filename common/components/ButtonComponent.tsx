import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

export default function ButtonComponent(props: any) {
  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={props.onPress}
      activeOpacity={0.8} 
    >
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 340,
    height: 50,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.green1,
    borderRadius: 10, 
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
  },
});
