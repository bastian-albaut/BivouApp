import React, { useState, useRef, useEffect } from 'react';
import { TextInput, View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TextInputComponent(props: any) {
  const [isFocused, setIsFocused] = useState(false);
  const animatedLabelPosition = useRef(new Animated.Value(0)).current;
  const multiline = props.multiline || false;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  useEffect(() => {
    Animated.timing(animatedLabelPosition, {
      toValue: (isFocused || !!props.value) ? 1 : 0, // Utiliser props.value pour gérer l'état du champ
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, props.value]);


  const labelStyle = {
    top: animatedLabelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [15, -8],
    }),
    fontSize: animatedLabelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedLabelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: ['#aaa', '#000'],
    }),
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <FontAwesome name={props.icon} size={20} color={Colors.black} style={multiline && styles.iconMultiline} />

      <View style={styles.inputContainer}>
        <Animated.Text style={[styles.label, labelStyle]}>
          {props.placeholder}
        </Animated.Text>

        <TextInput
          style={[styles.input, multiline ? styles.multiline : styles.singleLine]}
          multiline={multiline}
          numberOfLines={multiline ? 4 : 1} // Ajuste le nombre de lignes visibles par défaut
          value={props.value}
          keyboardType={props.keyboardType || 'default'}
          secureTextEntry={props.secureTextEntry && !isPasswordVisible}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={props.onChangeText} // Appeler le callback des props
          editable={props.editable}
        />
      </View>

      {props.secureTextEntry && (
        <TouchableOpacity onPress={togglePasswordVisibility} activeOpacity={0.8}>
          <FontAwesome
            style={styles.eyeIcon}
            name={isPasswordVisible ? 'eye' : 'eye-slash'}
            size={20}
            color={Colors.black}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 340,
    margin: 8,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    borderRadius: 5,
  },
  inputContainer: {
    flex: 1,
    position: 'relative',
  },
  input: {
    height: '100%',
    paddingLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  label: {
    position: 'absolute',
    left: 10,
    backgroundColor: Colors.white,
    paddingHorizontal: 5,
  },
  eyeIcon: {
    marginRight: 10,
  },
  singleLine: {
    height: 50, // Hauteur pour une seule ligne
  },
  multiline: { // Ajuste la hauteur pour les entrées multi-lignes
    height: 100,
  },
  iconMultiline: {
    alignSelf: 'flex-start', // Aligne l'icône en haut
    marginTop: 15,
  },
});