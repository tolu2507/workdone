import {configureStore} from '@reduxjs/toolkit';
import TaskReducer from './features/task';

const store = configureStore({
  reducer: {
    task: TaskReducer,
  },
});

export default store;
