import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { taskCategory } from '../../components/Dropdown/constants';
import { fetchTasks } from '../taskSlice';

export type filterStatus = 'all' | 'uncompleted' | 'completed';
export type categories = (typeof taskCategory)[keyof typeof taskCategory];

export type ControlPanelState = {
  status: filterStatus;
  category: categories;
  notesLeftCount: number;
};

const initialState: ControlPanelState = {
  status: 'all',
  category: 'ALL',
  notesLeftCount: 0,
};

const controlPanelSlice = createSlice({
  name: 'controlPanel',
  initialState,
  reducers: {
    changeStatusFilter(
      state,
      action: PayloadAction<{ checkedFilter: filterStatus }>
    ) {
      state.status = action.payload.checkedFilter;
    },
    changeCategoryFilter(
      state,
      action: PayloadAction<{ checkedCategory: categories }>
    ) {
      state.category = action.payload.checkedCategory;
    },
    setNumberOfNotesLeftCount(
      state,
      action: PayloadAction<{ notesLeftCount: number }>
    ) {
      state.notesLeftCount = action.payload.notesLeftCount;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.notesLeftCount = action.payload.length;
    });
  },
});

export const {
  changeStatusFilter,
  changeCategoryFilter,
  setNumberOfNotesLeftCount,
} = controlPanelSlice.actions;

export default controlPanelSlice.reducer;
