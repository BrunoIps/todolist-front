import { useReduxState } from '@mobile/hooks/useReduxState';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './Home.style';
import { useAppDispatch } from '@mobile/redux/store';
import { getItem } from '@mobile/utils/Storage';
import { getMe, logout } from '@mobile/redux/Auth';
import Exit from '@mobile/assets/Exit.svg';
import Empty from '@mobile/assets/Empty.svg';
import variables from '@mobile/config/variables';
import navigationService from '@mobile/services/navigation';
import Calendar from '@mobile/components/HorizontalCalendar/Calendar';
import moment from 'moment';
import { getTasks } from '@mobile/redux/Task/action';
import TaskCard from '@mobile/components/TaskCard/TaskCard';
import {
  deleteTaskAction,
  setTaskToEdit,
  Task,
  updateTaskAction,
} from '@mobile/redux/Task';

const Home = () => {
  const { user } = useReduxState().AuthState();
  const { tasks } = useReduxState().TaskState();
  const dispatch = useAppDispatch();
  const actualDate = useMemo(() => new Date(), []);
  const hitSlop = { top: 20, bottom: 20, left: 20, right: 20 };

  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);

  const handleLogout = () => {
    dispatch(logout());

    navigationService.reset('Auth');
  };

  const handleDateSelected = (date: moment.Moment) => {
    if (user && user.id) dispatch(getTasks(user?.id, date));

    setSelectedDate(date);
  };

  useEffect(() => {
    (async () => {
      const id = await getItem('id');

      if (id) {
        dispatch(getMe(id, actualDate));
      }
    })();
  }, []);

  const handleToggleComplete = (taskId: Task) => {
    const updatedTask = {
      ...taskId,
      is_done: !taskId.is_done,
    };

    dispatch(updateTaskAction(updatedTask));
  };

  const handleUpdateTask = (task: string) => {
    dispatch(setTaskToEdit(task));

    navigationService.navigate('TaskStack', { screen: 'EditTask' });
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTaskAction(taskId));
  };

  console.log('tasks', tasks);

  return (
    <SafeAreaView style={styles.contentContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Bem-vindo {user?.name}</Text>
        <TouchableOpacity
          hitSlop={hitSlop}
          activeOpacity={0.7}
          onPress={handleLogout}>
          <Exit height={30} width={30} color={variables.black} />
        </TouchableOpacity>
      </View>
      <View>
        <Calendar onDateSelected={handleDateSelected} />
      </View>

      {tasks && tasks.length > 0 && (
        <FlatList
          data={tasks}
          keyExtractor={item => item && item.id}
          renderItem={({ item }) => (
            <View style={styles.taskContainer}>
              <TaskCard
                task={item}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
                toggleCheckbox={handleToggleComplete}
              />
            </View>
          )}
        />
      )}

      {tasks?.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Empty height={200} width={200} color={variables.primaryColor} />
          <Text style={styles.emptyText}>Nenhuma tarefa encontrada</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default Home;
