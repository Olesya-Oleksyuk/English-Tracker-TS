import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getMockTasks } from './mockTasks';
import { taskCategory } from '../../components/Dropdown/constants';

export type TaskCategory = keyof typeof taskCategory;

export type Task = {
  id: number;
  description: string;
  completed: boolean;
  category: TaskCategory;
  date: number;
  taskAmount: number;
};

export type TasksState = {
  tasks: Task[];
  status: 'INITIALIZATION' | 'PENDING' | 'FULFILLED' | 'REJECTED';
};

const fakeDataFetching = (): Promise<Task[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const data = getMockTasks();
      resolve(data);
    }, 3000);
  });

// async thunk
export const fetchTasks = createAsyncThunk<Task[], void>(
  'tasks/fetchTasks',
  async () => fakeDataFetching()
);

const initialState: TasksState = {
  tasks: [],
  status: 'INITIALIZATION',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    generateMockTask(state) {
      state.tasks = getMockTasks();
    },
    clearLocalStorage(state) {
      state.tasks = [];
      state.status = 'INITIALIZATION';
      localStorage.removeItem('app:englishTracker');
    },
    addTask(
      state,
      action: PayloadAction<
        Pick<Task, 'description' | 'taskAmount' | 'category'>
      >
    ) {
      const { description, category, taskAmount } = action.payload;
      state.tasks.unshift({
        id: new Date().valueOf(),
        description,
        completed: false,
        category,
        date: Date.now(),
        taskAmount,
      });
    },
    deleteTasks(state, action: PayloadAction<{ ids: number[] }>) {
      const { ids } = action.payload;
      state.tasks = state.tasks.filter((task) => !ids.includes(task.id));
    },
    changeStatus(state, action: PayloadAction<{ ids: number[] }>) {
      const { ids } = action.payload;
      state.tasks = state.tasks.map((task) =>
        ids.includes(task.id) ? { ...task, completed: !task.completed } : task
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'PENDING';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'FULFILLED';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.status = 'REJECTED';
      });
  },
});

export const {
  generateMockTask,
  clearLocalStorage,
  addTask,
  deleteTasks,
  changeStatus,
} = tasksSlice.actions;

export default tasksSlice.reducer;
