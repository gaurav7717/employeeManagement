import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './employeeSlice';
import attendanceReducer from './attendanceSlice';
import { employeeApi } from './employeeApiSlice';

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
    attendance: attendanceReducer,
    [employeeApi.reducerPath]: employeeApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(employeeApi.middleware) 
});