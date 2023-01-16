import { createSlice } from '@reduxjs/toolkit';
import { taskCategory } from '../../components/Dropdown/constants';
import { fetchTasks } from '../taskSlice';

const controlPanelSlice = createSlice({
  name: 'controlPanel',
  initialState: {
    status: 'all',
    category: taskCategory.ALL,
    notesLeftCount: 0,
  },
  reducers: {
    changeStatusFilter(state, action) {
      state.status = action.payload.checkedFilter;
    },
    changeCategoryFilter(state, action) {
      state.category = action.payload.checkedCategory;
    },
    setNumberOfNotesLeftCount(state, action) {
      state.notesLeftCount = action.payload.notesLeftCount;
    },
  },
  extraReducers: {
    [fetchTasks.fulfilled]: (state, action) => {
      state.notesLeftCount = action.payload.length;
    },
  },
});

export const {
  changeStatusFilter,
  changeCategoryFilter,
  setNumberOfNotesLeftCount,
} = controlPanelSlice.actions;

export default controlPanelSlice.reducer;
