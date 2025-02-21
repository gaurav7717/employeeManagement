// App.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetEmployeesQuery } from './features/employee/employeeApiSlice';
import { addEmployee, updateEmployee, deleteEmployee } from './features/employee/employeeSlice';
import { markAttendance } from './features/employee/attendanceSlice';
import EmployeeList from './components/EmployeeList';
import EmployeeFormModal from './components/EmployeeFormModal';
import AttendanceSheet from './components/AttendanceSheet';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const dispatch = useDispatch();
  const { data: apiEmployees = [], isLoading, isError } = useGetEmployeesQuery();
  const reduxEmployees = useSelector(state => state.employees.data);
  const attendanceRecords = useSelector(state => state.attendance.records);
  
  // Local state for UI control
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [view, setView] = useState('employees');
  const [employeeModalMode, setEmployeeModalMode] = useState("add");

  // Sync API data with Redux store
  useEffect(() => {
    if (apiEmployees.length > 0 && reduxEmployees.length === 0) {
      apiEmployees.forEach(emp => dispatch(addEmployee(emp)));
    }
  }, [apiEmployees, dispatch, reduxEmployees.length]);

  // Employee handlers
  const handleOpenAddEmployee = () => {
    setSelectedEmployee(null);
    setEmployeeModalMode("add");
    setIsEmployeeModalOpen(true);
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setEmployeeModalMode("edit");
    setIsEmployeeModalOpen(true);
  };

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setEmployeeModalMode("view");
    setIsEmployeeModalOpen(true);
  };

  const handleCloseEmployeeModal = () => {
    setIsEmployeeModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleSaveEmployee = (employeeData) => {
    if (selectedEmployee) {
      dispatch(updateEmployee({ ...employeeData, id: selectedEmployee.id }));
      toast.success('Employee updated successfully');
    } else {
      dispatch(addEmployee({ ...employeeData, id: Date.now() }));
      toast.success('Employee added successfully');
    }
    handleCloseEmployeeModal();
  };

  // Attendance handler
  const handleSaveAttendance = (attendanceData) => {
    dispatch(markAttendance(attendanceData));
    toast.success('Attendance saved for session');
    setView('employees');
  };

  if (isLoading) return <div className="loading">Loading employees...</div>;
  if (isError) return <div className="error">Error loading employees!</div>;

  return (
    <div className="app-container">
      {/* Employee Form Modal */}
      {isEmployeeModalOpen && (
        <EmployeeFormModal
          isOpen={isEmployeeModalOpen}
          onClose={handleCloseEmployeeModal}
          onSubmit={handleSaveEmployee}
          employee={selectedEmployee}
          mode={employeeModalMode}
        />
      )}

      <main className="main-content">
        {view === 'employees' ? (
          <EmployeeList
            employees={reduxEmployees}
            onAddEmployee={handleOpenAddEmployee}
            onAttendance={() => setView('attendance')}
            onEdit={handleEditEmployee}
            onDelete={(id) => dispatch(deleteEmployee(id))}
            onView={handleViewEmployee}
          />
        ) : (
          <AttendanceSheet
            employees={reduxEmployees}
            onBack={() => setView('employees')}
            onSave={handleSaveAttendance}
            attendanceRecords={attendanceRecords}
          />
        )}
      </main>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;