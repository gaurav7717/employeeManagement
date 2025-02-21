import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const employeeApi = createApi({
  reducerPath: 'employeeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://hub.dummyapis.com' }),
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => '/employee?noofRecords=20&idStarts=1001',
      transformResponse: (response) => 
        response.map(emp => ({
          id: emp.id,
          name: `${emp.firstName} ${emp.lastName}`,
          role: 'Employee',
          email: emp.email,
          contact: emp.contactNumber,
          address: emp.address,
          joiningDate: new Date(emp.dob.split('/').reverse().join('-')).toISOString().split('T')[0],
          leaves: 0
        }))
    }),
  }),
});

export const { useGetEmployeesQuery } = employeeApi;