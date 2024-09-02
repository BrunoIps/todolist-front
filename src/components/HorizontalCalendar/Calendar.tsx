import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import variables from '@mobile/config/variables';

moment.locale('pt-br');

interface Day {
  date: moment.Moment;
  isSelected: boolean;
}

interface CalendarProps {
  initialDate?: moment.Moment;
  onDateSelected: (date: moment.Moment) => void;
}

const Calendar: React.FC<CalendarProps> = ({ initialDate, onDateSelected }) => {
  const [currentMonth, setCurrentMonth] = useState(initialDate || moment());
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(
    initialDate || moment(),
  );
  const flatListRef = useRef<FlatList<Day>>(null);

  const daysInMonth = currentMonth.daysInMonth();

  useEffect(() => {
    if (initialDate) {
      scrollToDate(initialDate);
    }
  }, [initialDate]);

  const generateDays = (): Day[] => {
    const days: Day[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = currentMonth.clone().date(i);
      days.push({
        date,
        isSelected: selectedDate ? date.isSame(selectedDate, 'day') : false,
      });
    }
    return days;
  };

  const handleDayPress = (date: moment.Moment, index: number) => {
    setSelectedDate(date);
    onDateSelected(date);
    scrollToIndex(index);
  };

  const scrollToDate = (date: moment.Moment) => {
    const index = date.date() - 1;
    scrollToIndex(index);
  };

  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: index,
      viewPosition: 0.5,
    });
  };

  const handlePrevMonth = () => {
    const newMonth = currentMonth.clone().subtract(1, 'month');
    setCurrentMonth(newMonth);
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    const newMonth = currentMonth.clone().add(1, 'month');
    setCurrentMonth(newMonth);
    setSelectedDate(null);
  };

  const renderDay = ({ item, index }: { item: Day; index: number }) => (
    <TouchableOpacity
      style={[
        styles.dayContainer,
        item.isSelected && styles.selectedDayContainer,
      ]}
      onPress={() => handleDayPress(item.date, index)}>
      <Text style={item.isSelected ? styles.selectedDayText : styles.dayText}>
        {item.date.date()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <Text style={styles.monthChangeText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>{currentMonth.format('MMMM YYYY')}</Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Text style={styles.monthChangeText}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={generateDays()}
        renderItem={renderDay}
        keyExtractor={item => item.date.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={selectedDate && selectedDate.date() - 1}
        getItemLayout={(data, index) => ({
          length: 50,
          offset: 50 * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  monthChangeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: variables.primaryColor,
  },
  dayContainer: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  selectedDayContainer: {
    backgroundColor: variables.primaryColor,
  },
  dayText: {
    fontSize: 16,
  },
  selectedDayText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Calendar;
