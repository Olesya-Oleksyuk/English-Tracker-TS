import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tasksReducer, { TasksState } from './taskSlice';
import controlPanelReducer from './controlPanelSlice';

const reHydrateStore = (): { mainReducer: { tasks: TasksState } } => ({
  mainReducer: { tasks: { tasks: [], status: 'INITIALIZATION' } },
});

const persistConfig = {
  key: 'englishTracker',
  keyPrefix: 'app:',
  storage,
  whitelist: ['tasks'],
};

const rootReducer = combineReducers({
  tasks: tasksReducer,
  controlPanel: controlPanelReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const toolkitStore = configureStore({
  reducer: {
    mainReducer: persistedReducer,
  },
  preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(toolkitStore);

export default toolkitStore;

// в видео
// export type RootState = ReturnType<typeof toolkitStore.getState>;
// определяем тип глобального state
export type RootState = ReturnType<typeof toolkitStore.getState>;
// export type AppDispatch = typeof toolkitStore.dispatch;
export type AppDispatch = typeof toolkitStore.dispatch;
