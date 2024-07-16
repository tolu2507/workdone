import {createSlice} from '@reduxjs/toolkit';
import {Task} from '../../component/addtask';

const initialState: Task[] = [];

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    createTask(state, action) {
      let task = [action.payload, ...state];
      return task;
    },
    updateTask(state, action) {
      const index = state.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    setTasks(state, action: {payload: Task[]; type: string}) {
      return action.payload;
    },
  },
});

export const {setTasks, createTask, updateTask} = taskSlice.actions;
export const getTask = (state: any) => state.task;
export default taskSlice.reducer;
