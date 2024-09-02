import Input from '@mobile/components/Input';
import { translator } from '@mobile/services/translate';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './EditTask.style';
import Header from '@mobile/components/Header';
import DefaultButton from '@mobile/components/DefaultButton';
import CustomDatePicker from '@mobile/components/DatePicker';
import { useReduxState } from '@mobile/hooks/useReduxState';
import { useAppDispatch } from '@mobile/redux/store';
import {
  CreateTaskSuccess,
  getTasks,
  updateTaskAction,
} from '@mobile/redux/Task';
import moment from 'moment';
import { show } from '@mobile/utils/Alert';

type CreateTaskProps = {
  title: string;
  description: string;
  start_date: Date;
  is_done: boolean;
  user_id: string;
  id: string;
};

const initialValue: CreateTaskProps = {
  title: '',
  description: '',
  start_date: moment().toDate(),
  is_done: false,
  user_id: '',
  id: '',
};

const EditTask = () => {
  const dispatch = useAppDispatch();
  const { user } = useReduxState().AuthState();
  const { createTaskSuccess, taskToEdit, tasks } = useReduxState().TaskState();

  const [form, setForm] = useState<CreateTaskProps>(initialValue);
  const [errors, setErrors] = useState<string[] | null>(null);

  const handleForm = (key: string, value: string | Date) => {
    setForm({ ...form, [key]: value });
  };

  const handleDateChange = (date: Date) => {
    handleForm('start_date', date.toISOString());
  };

  const handleSubmit = () => {
    setErrors(null);

    const newErrors = [];

    if (!form.title.trim()) {
      newErrors.push('ERRORS.CREATE_TASK.TITLE');
    }

    if (!form.description.trim()) {
      newErrors.push('ERRORS.CREATE_TASK.DESCRIPTION');
    }

    setErrors(newErrors);

    if (newErrors.length === 0) {
      dispatch(updateTaskAction(form));
    }
  };

  useEffect(() => {
    if (taskToEdit) {
      if (tasks) {
        const myTask = tasks.find(task => task.id === taskToEdit);

        console.log(myTask);

        if (myTask) {
          setForm({
            title: myTask.title,
            description: myTask.description || '',
            start_date: myTask.start_date,
            is_done: myTask.is_done,
            user_id: myTask.user_id,
            id: myTask.id ?? '',
          });
        }
      }
    }
  }, [taskToEdit]);

  useEffect(() => {
    if (user) {
      handleForm('user_id', user.id);
    }

    if (createTaskSuccess && user?.id) {
      setForm({ ...initialValue, user_id: user?.id });
      dispatch(getTasks(user?.id, moment(moment().toDate())));
      dispatch(CreateTaskSuccess(false));
      show(translator('SCREENS.EDIT_TASK.BUTTONS.UPDATED'));
    }
  }, [user, createTaskSuccess]);

  return (
    <SafeAreaView style={styles.container}>
      <Header back screenName={translator('SCREENS.EDIT_TASK.TITLE')} />
      <View style={styles.content}>
        <Text style={styles.text}>
          {translator('SCREENS.CREATE_TASK.HOLDERS.TITLE')}
        </Text>

        <View style={styles.column}>
          <Input
            autoCapitalize="none"
            placeholder={translator('SCREENS.CREATE_TASK.INPUT.TITLE')}
            value={form.title}
            onChangeText={(title: string) => handleForm('title', title)}
          />
        </View>
        <Text style={styles.text}>
          {translator('SCREENS.CREATE_TASK.HOLDERS.DESCRIPTION')}
        </Text>

        <View style={styles.column}>
          <Input
            autoCapitalize="none"
            placeholder={translator('SCREENS.CREATE_TASK.INPUT.DESCRIPTION')}
            value={form.description}
            onChangeText={(description: string) =>
              handleForm('description', description)
            }
          />
        </View>
        <Text style={styles.text}>
          {translator('SCREENS.CREATE_TASK.HOLDERS.DATE')}
        </Text>
        <View style={styles.column}>
          <CustomDatePicker onDateChange={handleDateChange} />
        </View>
        <View>
          {errors &&
            errors.map(error => (
              <Text key={error} style={styles.error}>
                * {translator(error)}
              </Text>
            ))}
        </View>
      </View>
      <View style={styles.footer}>
        <DefaultButton
          buttonText={translator('SCREENS.EDIT_TASK.BUTTONS.UPDATE')}
          onPress={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditTask;
