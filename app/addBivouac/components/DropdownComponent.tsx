import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Colors from "@/common/constants/Colors";
import FontAwesome from '@expo/vector-icons/FontAwesome';

// Définir le type pour chaque item de la liste
interface DropdownItem {
	label: string;
	value: string | number; // Peut être une chaîne ou un nombre
}

// Définir le type pour les props du composant
interface DropdownProps {
	placeholder: string;
	items: DropdownItem[];
	onSelect: (item: DropdownItem) => void; // Fonction appelée lors de la sélection
	icon: string;
}

export default function DropdownComponent(props: DropdownProps) {
    const [selectedValue, setSelectedValue] = useState<string | number | undefined>(undefined); // Initialiser avec undefined
    const [isFocused, setIsFocused] = useState(false);
    const animatedLabelPosition = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(animatedLabelPosition, {
			toValue: isFocused || selectedValue ? 1 : 0,
			duration: 200,
			useNativeDriver: false,
		}).start();
	}, [isFocused, selectedValue]);

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

	// Ajouter le type pour itemValue
	const handleValueChange = (itemValue: string | number) => {
		setSelectedValue(itemValue);
		const selectedItem = props.items.find(item => item.value === itemValue);
		if (itemValue === undefined || itemValue === '') {
			setIsFocused(false);
		} else {
			setIsFocused(true);
		}
		if (selectedItem) {
			props.onSelect(selectedItem); // Passer l'item sélectionné au composant parent
		}
	};

	return (

		<View style={styles.container}>
			<FontAwesome name={props.icon as any} size={20} color={Colors.black} />

			<View style={styles.inputContainer}>
				<Animated.Text style={[styles.label, labelStyle]}>
					{props.placeholder}
				</Animated.Text>

				<RNPickerSelect
					onValueChange={handleValueChange}
					items={props.items}
					style={pickerSelectStyles}
					useNativeAndroidPickerStyle={false} // Permet de personnaliser le style sous Android
					placeholder={{ label: '', value: '' }}
					/>
			</View>

<FontAwesome name="chevron-down" size={20} color={Colors.black} />
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
		paddingRight: 10,
		borderRadius: 5,
		height: 50,
    },
    inputContainer: {
		height: 50,
		flex: 1,
		position: 'relative',
		justifyContent: 'center',
    },
    picker: {
		height: 50,
		width: '100%',
		backgroundColor: 'transparent',
    },
    label: {
		position: 'absolute',
		left: 10,
		backgroundColor: Colors.white,
		paddingHorizontal: 5,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
		height: 50,
		fontSize: 16,
		paddingVertical: 10,
		paddingHorizontal: 10,
		color: 'black',
		paddingRight: 30, // To ensure the text is never behind the icon
		backgroundColor: 'transparent',
    },
    inputAndroid: {
		height: 50,
		fontSize: 16,
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderWidth: 0.5,
		borderColor: 'purple',
		borderRadius: 8,
		color: 'black',
		paddingRight: 30, // To ensure the text is never behind the icon
		backgroundColor: 'transparent',
    },
  });