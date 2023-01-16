import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getMockTasks } from './mockTasks';

const fakeDataFetching = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      const data = getMockTasks();
      resolve(data);
    }, 5000);
  });

// async thunk
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () =>
  fakeDataFetching()
);

export const STATUS = {
  INITIALIZATION: 'INITIALIZATION',
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {},
  reducers: {
    generateMockTask(state) {
      state.tasks = getMockTasks();
    },
    addTask(state, action) {
      const { description, category, date, taskAmount } = action.payload;
      state.tasks.unshift({
        id: new Date().valueOf(),
        description,
        completed: false,
        category,
        date,
        taskAmount,
      });
    },
    deleteTasks(state, action) {
      const { ids } = action.payload;
      state.tasks = state.tasks.filter((task) => !ids.includes(task.id));
    },
    changeStatus(state, action) {
      const { ids } = action.payload;
      state.tasks = state.tasks.map((task) =>
        ids.includes(task.id) ? { ...task, completed: !task.completed } : task
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = STATUS.PENDING;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = STATUS.FULFILLED;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = STATUS.REJECTED;
        state.error = action.payload;
      });
  },
});

export const { generateMockTask, addTask, deleteTasks, changeStatus } =
  tasksSlice.actions;

export default tasksSlice.reducer;
