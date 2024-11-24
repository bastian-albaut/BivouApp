import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from "@/common/constants/Colors";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function EquipmentComponent(props: any) {

    const { label, icon, onSelect } = props;
    const [selected, setSelected] = useState(false);

    const handlePress = () => {
        const newSelectedState = !selected;
        setSelected(newSelectedState);
        if (onSelect) {
            onSelect(label, newSelectedState); // Notify the parent component
        }
    };

    return (
        <TouchableOpacity onPress={handlePress} style={[styles.container, selected && styles.selectedContainer]}>
            <FontAwesome name={icon} size={20} color={Colors.black} />
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 150,
        margin: 8,
        borderWidth: 1,
        borderColor: Colors.black,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 5,
    },
    selectedContainer: {
        backgroundColor: Colors.green4,
    },
    label: {
        fontSize: 20,
        color: Colors.black,
    },
});
