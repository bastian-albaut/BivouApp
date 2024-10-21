import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Colors from "@/common/constants/Colors";

export default function RadioButtonComponent(props: any) {
  const { selected, label, onPress } = props;

  return (
    <TouchableOpacity style={styles.radioButtonContainer} onPress={onPress}>
      <View style={[styles.radioButton, selected && styles.radioButtonSelected]}>
        {selected && <View style={styles.radioInnerCircle} />}
      </View>
      <Text style={styles.radioButtonLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: Colors.green2,
    borderWidth: 2,
  },
  radioButtonLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: Colors.black,
  },
  radioInnerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: Colors.green2,
  },
});