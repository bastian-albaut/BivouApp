import React, { useState } from 'react';
import { View, Text, Button, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '@/common/constants/Colors';
import ButtonComponent from '@/common/components/ButtonComponent';

export default function ReservationDates() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  // Handle start date change
  const onStartDateChange = (event: any, selectedDate?: Date) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  // Handle end date change
  const onEndDateChange = (event: any, selectedDate?: Date) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  // Format the date in French
  const formatDate = (date: Date | null) => {
    return date ? date.toLocaleDateString('fr-FR') : 'Sélectionnez une date';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choisissez vos dates de réservation</Text>

      {/* Start Date Input */}
      <View style={styles.dateInputContainer}>
        <Text style={styles.label}>Date de début:</Text>
        <Button
          title={startDate ? formatDate(startDate) : 'Sélectionnez la date de début'}
          onPress={() => setShowStartDatePicker(true)}
          color={Colors.green1}
        />
        {showStartDatePicker && (
          <DateTimePicker
            value={startDate || new Date()}
            textColor={Colors.black}
            mode="date"
            locale="fr-FR" // Optional, Android will respect this but iOS will not
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onStartDateChange}
            />
        )}
      </View>

      {/* End Date Input */}
      <View style={styles.dateInputContainer}>
        <Text style={styles.label}>Date de fin:</Text>
        <Button
          title={endDate ? formatDate(endDate) : 'Sélectionnez la date de fin'}
          onPress={() => setShowEndDatePicker(true)}
          color={Colors.green1}
          />
        {showEndDatePicker && (
          <DateTimePicker
            value={endDate || new Date()}
            textColor={Colors.black}
            mode="date"
            locale="fr-FR" // Optional, Android will respect this but iOS will not
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onEndDateChange}
          />
        )}
      </View>

      {/* Display Selected Dates */}
      {startDate && endDate && (
        <Text style={styles.summary}>
          Réservation du {formatDate(startDate)} au {formatDate(endDate)}
        </Text>
      )}

      <ButtonComponent title="Réserver le bivouac" onPress={() => console.log('Réserver')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 10,
  },
  dateInputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: Colors.black,
    marginBottom: 5,
  },
  summary: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
    marginTop: 20,
    marginBottom: 10,
  },
});
