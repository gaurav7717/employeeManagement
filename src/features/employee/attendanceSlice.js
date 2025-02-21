import { createSlice } from '@reduxjs/toolkit';

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: { records: [] },
  reducers: {
    markAttendance: (state, action) => {
      const { date, records } = action.payload;
      const index = state.records.findIndex(r => r.date === date);
      if (index === -1) {
        state.records.push({ date, records });
      } else {
        state.records[index].records = records;
      }
    }
  }
});

export const { markAttendance } = attendanceSlice.actions;
export default attendanceSlice.reducer;