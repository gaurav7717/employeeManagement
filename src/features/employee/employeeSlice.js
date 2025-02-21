import { createSlice } from '@reduxjs/toolkit';
import { employeeApi } from './employeeApiSlice';

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    data: [],
    status: 'idle',
    error: null
  },
  reducers: {
    addEmployee: (state, action) => {
      state.data.push(action.payload);
    },
    updateEmployee: (state, action) => {
      const index = state.data.findIndex(e => e.id === action.payload.id);
      if (index !== -1) state.data[index] = action.payload;
    },
    deleteEmployee: (state, action) => {
      state.data = state.data.filter(e => e.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(employeeApi.endpoints.getEmployees.matchPending, (state) => {
        state.status = 'loading';
      })
      .addMatcher(employeeApi.endpoints.getEmployees.matchFulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addMatcher(employeeApi.endpoints.getEmployees.matchRejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { addEmployee, updateEmployee, deleteEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;