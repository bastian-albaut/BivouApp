import React, { useState } from 'react';
import { View, Text, Button, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '@/common/constants/Colors';
import ButtonComponent from '@/common/components/ButtonComponent';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';

export default function ReservationDates(props : any) {
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

  const { t } = useTranslation();

  const router = useRouter();

  // Handle reservation button click
  const handleReservation = () => {
    if (!startDate || !endDate) {
      alert(t('reservationBivouacs:error_not_select_dates'));
      return;
    }

    // Start date after end date
    if (startDate.getTime() > endDate.getTime()) {
      alert(t('reservationBivouacs:error_start_date_after_end_date'));
      return;
    }

    router.push({
      pathname: '/reservationBivouacs/screens/detailReservation',
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        bivouac: JSON.stringify(props.bivouac),    
      },
    });
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('reservationBivouacs:title_date_reservation')}</Text>

      <View style={styles.dateInputContainer}>
        <Text style={styles.label}>{t('reservationBivouacs:start_date')}</Text>
        <Button
          title={startDate ? formatDate(startDate) : t('reservationBivouacs:select_start_date')}
          onPress={() => setShowStartDatePicker(true)}
          color={Colors.green1}
        />
        {showStartDatePicker && (
          <DateTimePicker
            value={startDate || new Date()}
            textColor={Colors.black}
            mode="date"
            locale="fr-FR"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onStartDateChange}
            />
        )}
      </View>

      <View style={styles.dateInputContainer}>
        <Text style={styles.label}>{t('reservationBivouacs:end_date')}</Text>
        <Button
          title={endDate ? formatDate(endDate) : t('reservationBivouacs:select_end_date')}
          onPress={() => setShowEndDatePicker(true)}
          color={Colors.green1}
          />
        {showEndDatePicker && (
          <DateTimePicker
            value={endDate || new Date()}
            textColor={Colors.black}
            mode="date"
            locale="fr-FR"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onEndDateChange}
          />
        )}
      </View>

      <ButtonComponent title={t('reservationBivouacs:book_bivouac')} onPress={handleReservation}/>
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
});
