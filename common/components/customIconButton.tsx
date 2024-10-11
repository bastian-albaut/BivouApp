// components/CustomButton.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from "@/common/constants/Colors";

type CustomIconButtonProps = {
  title: string;
  iconName: React.ComponentProps<typeof FontAwesome>['name'];
  onPress: () => void;
  buttonStyle?: ViewStyle; // Optional to override default styles
  textStyle?: TextStyle; // Optional to override default styles
};

const CustomIconButton = ({ title, iconName, onPress, buttonStyle, textStyle }: CustomIconButtonProps) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={[styles.button, buttonStyle]} onPress={onPress}>
      <FontAwesome name={iconName} size={20} color="white"/>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.green1,
    borderRadius: 10,
    paddingVertical: 12,
    elevation: 5, // Adds shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  text: {
    color: Colors.white,
    fontSize: 18,
  },
});

export default CustomIconButton;
