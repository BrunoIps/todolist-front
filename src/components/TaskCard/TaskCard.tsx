import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import DotIcon from '@mobile/assets/Dot.svg';
import CustomCheckbox from '../Check/CheckBox';
import { Task } from '@mobile/redux/Task';
import variables from '@mobile/config/variables';
import { translator } from '@mobile/services/translate';

interface CardProps {
  task: Task;
  onUpdate: (id: string) => void;
  onDelete: (id: string) => void;
  toggleCheckbox: (task: Task) => void;
}

const TaskCard = ({ task, onUpdate, onDelete, toggleCheckbox }: CardProps) => {
  const openRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
      rowMap[rowKey].manuallySwipeRow(-200);
    }
  };

  return (
    <SwipeListView
      data={[task]}
      keyExtractor={item => item && item?.id}
      renderItem={(data, rowMap) => (
        <View style={styles.taskContainer}>
          <View style={styles.taskContent}>
            <CustomCheckbox
              isChecked={task.is_done}
              onToggle={() => toggleCheckbox(task)}
            />
            <Text
              style={{
                ...styles.taskText,
                textDecorationLine: task.is_done ? 'line-through' : 'none',
              }}>
              {task.title}
            </Text>
            <TouchableOpacity onPress={() => openRow(rowMap, data.item.id)}>
              <DotIcon height={24} width={24} color="#000" />
            </TouchableOpacity>
          </View>
          <Text style={styles.taskDescription}>{task.description}</Text>
        </View>
      )}
      renderHiddenItem={(data, rowMap) => (
        <View style={styles.hiddenContainer}>
          <TouchableOpacity
            style={[styles.hiddenButton, styles.updateButton]}
            onPress={() => onUpdate(task.id)}>
            <Text style={styles.hiddenButtonText}>
              {translator('SCREENS.TASKS.BUTTONS.UPDATE')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.hiddenButton, styles.deleteButton]}
            onPress={() => onDelete(task.id)}>
            <Text style={styles.hiddenButtonText}>
              {translator('SCREENS.TASKS.BUTTONS.DELETE')}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      rightOpenValue={-200}
      stopRightSwipe={-150}
      disableRightSwipe
      friction={8}
      tension={40}
    />
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    backgroundColor: variables.lighterPurple,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  taskDescription: {
    fontSize: 12,
    marginLeft: 60,
    width: '100%',
  },
  hiddenContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
  },
  hiddenButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: '100%',
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  hiddenButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TaskCard;
