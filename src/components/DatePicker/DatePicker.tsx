import { translator } from '@mobile/services/translate';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import styles from './DatePicker.style';
import moment from 'moment';

interface CustomDatePickerProps {
  initialDate?: Date;
  onDateChange?: (date: Date) => void;
}

const CustomDatePicker = ({
  initialDate,
  onDateChange,
}: CustomDatePickerProps) => {
  const [date, setDate] = useState(initialDate || moment().toDate());
  const [open, setOpen] = useState(false);

  const handleConfirm = (selectedDate: Date) => {
    setOpen(false);
    setDate(selectedDate);
    if (onDateChange) {
      onDateChange(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7} onPress={() => setOpen(true)}>
        <Text style={styles.selectedDateText}>
          {translator('SCREENS.DATE_PICKER.SELECT_DATE')}{' '}
          {date.toLocaleDateString('pt-BR')}
        </Text>
      </TouchableOpacity>

      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        locale="pt-BR"
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
        minimumDate={new Date(2000, 0, 1)}
        maximumDate={new Date(2030, 11, 31)}
        theme="auto"
        title="Escolha uma data"
        confirmText={translator('SCREENS.DATE_PICKER.BUTTONS.CONFIRM')}
        cancelText={translator('SCREENS.DATE_PICKER.BUTTONS.CANCEL')}
      />
    </View>
  );
};

export default CustomDatePicker;
