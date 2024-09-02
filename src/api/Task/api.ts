import { updateTask } from './../../redux/Task/action';
import { Task } from '@mobile/redux/Task';
import { getClient } from '../axios';

const TaskApi = () => {
  const createTask = async (task: Task) => {
    const client = getClient();
    const { data } = await client.post('/task', task);

    return data;
  };

  const getTasks = async (user_id: string, start_date: moment.Moment) => {
    const client = getClient();
    const { data } = await client.get(
      `/task/${user_id}?start_date=${start_date.toISOString()}`,
    );

    return data;
  };

  const updateTask = async (task: Task) => {
    const client = getClient();
    const { data } = await client.put(`/task/${task.id}`, task);

    return data;
  };

  const deleteTask = async (task_id: string) => {
    const client = getClient();
    const data = await client.delete(`/task/${task_id}`);

    return data;
  };

  return {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
  };
};

export default TaskApi;
