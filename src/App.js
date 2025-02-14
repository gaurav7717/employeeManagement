// App.js
import React, { useState } from 'react';
import EmployeeList from './components/EmployeeList';
import EmployeeFormModal from './components/EmployeeFormModal';
import AttendanceSheet from './components/AttendanceSheet';

function App() {
  // Demo employee data
  const demoEmployees = [
    {
      id: 1,
      name: 'Alice Johnson',
      role: 'Front office',
      email: 'alice@example.com',
      contact: '1234567890',
      address: '123 Main St, City',
      joiningDate: '2023-01-15',
      leaves: 5,
    },
    {
      id: 2,
      name: 'Bob Smith',
      role: 'Support',
      email: 'bob@example.com',
      contact: '2345678901',
      address: '456 Elm St, City',
      joiningDate: '2023-02-10',
      leaves: 3,
    },
    {
      id: 3,
      name: 'Charlie Davis',
      role: 'Front office',
      email: 'charlie@example.com',
      contact: '3456789012',
      address: '789 Oak St, City',
      joiningDate: '2023-03-05',
      leaves: 2,
    },
  ];

  // Global state
  const [employees, setEmployees] = useState(demoEmployees);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  // "employees" or "attendance"
  const [view, setView] = useState('employees');
  // Stores attendance records: each record is an object { date, records: { employeeId: boolean, ... } }
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  // --- Employee Handlers ---
  const handleOpenAddEmployee = () => {
    setSelectedEmployee(null);
    setIsEmployeeModalOpen(true);
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setIsEmployeeModalOpen(true);
  };

  const handleCloseEmployeeModal = () => {
    setIsEmployeeModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleSaveEmployee = (employeeData) => {
    if (selectedEmployee) {
      // Edit mode: update employee
      setEmployees(prev =>
        prev.map(emp =>
          emp.id === selectedEmployee.id ? { ...employeeData, id: selectedEmployee.id } : emp
        )
      );
    } else {
      // Add mode: add new employee with unique id
      setEmployees(prev => [...prev, { ...employeeData, id: Date.now() }]);
    }
    handleCloseEmployeeModal();
  };

  const handleDeleteEmployee = (id) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  // --- Attendance Handler ---
  // Save attendance data: if a record for the selected date exists, update it; otherwise, add a new one.
  const handleSaveAttendance = (attendanceData) => {
    setAttendanceRecords(prev => {
      const index = prev.findIndex(record => record.date === attendanceData.date);
      if (index !== -1) {
        const updated = [...prev];
        updated[index] = attendanceData;
        return updated;
      }
      return [...prev, attendanceData];
    });
    setView('employees');
  };

  return (
    <div className="app-container">
      {/* Employee Form Modal (for adding/editing) */}
      {isEmployeeModalOpen && (
        <EmployeeFormModal
          isOpen={isEmployeeModalOpen}
          onClose={handleCloseEmployeeModal}
          onSubmit={handleSaveEmployee}
          employee={selectedEmployee}  // Passed for prefilled data in edit mode
        />
      )}

      <main className="main-content">
        {view === 'employees' ? (
          <EmployeeList
            employees={employees}
            onAddEmployee={handleOpenAddEmployee}
            onAttendance={() => setView('attendance')}
            onEdit={handleEditEmployee}
            onDelete={handleDeleteEmployee}
          />
        ) : (
          <AttendanceSheet
            employees={employees}
            onBack={() => setView('employees')}
            onSave={handleSaveAttendance}
            attendanceRecords={attendanceRecords} // Entire array passed so sheet can load any date's record
          />
        )}
      </main>
    </div>
  );
}

export default App;
