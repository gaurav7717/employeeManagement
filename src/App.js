// App.js
import React, { useState } from 'react';
import EmployeeList from './components/EmployeeList';
import EmployeeFormModal from './components/EmployeeFormModal';
import AttendanceSheet from './components/AttendanceSheet';
import toast , {Toaster} from 'react-hot-toast';
function App() {
  // Demo employee data...
  const demoEmployees = [
    {
      "id": 1,
      "name": "Alice Johnson",
      "role": "Front Office",
      "email": "alice.johnson@example.com",
      "contact": "1234567890",
      "address": "123 Main St, City",
      "joiningDate": "2023-01-15",
      "leaves": 5
    },
    {
      "id": 2,
      "name": "Bob Smith",
      "role": "Support",
      "email": "bob.smith@example.com",
      "contact": "2345678901",
      "address": "456 Elm St, City",
      "joiningDate": "2023-02-10",
      "leaves": 3
    },
    {
      "id": 3,
      "name": "Charlie Davis",
      "role": "Front Office",
      "email": "charlie.davis@example.com",
      "contact": "3456789012",
      "address": "789 Oak St, City",
      "joiningDate": "2023-03-05",
      "leaves": 2
    },
    {
      "id": 4,
      "name": "Diana Evans",
      "role": "Management",
      "email": "diana.evans@example.com",
      "contact": "4567890123",
      "address": "101 Pine St, City",
      "joiningDate": "2022-11-20",
      "leaves": 8
    },
    {
      "id": 5,
      "name": "Evan Foster",
      "role": "IT",
      "email": "evan.foster@example.com",
      "contact": "5678901234",
      "address": "202 Maple Ave, City",
      "joiningDate": "2023-05-01",
      "leaves": 4
    },
    {
      "id": 6,
      "name": "Fiona Garcia",
      "role": "HR",
      "email": "fiona.garcia@example.com",
      "contact": "6789012345",
      "address": "303 Cedar Rd, City",
      "joiningDate": "2023-04-15",
      "leaves": 6
    },
    {
      "id": 7,
      "name": "George Harris",
      "role": "Support",
      "email": "george.harris@example.com",
      "contact": "7890123456",
      "address": "404 Birch St, City",
      "joiningDate": "2023-06-10",
      "leaves": 1
    },
    {
      "id": 8,
      "name": "Hannah Ingram",
      "role": "Front Office",
      "email": "hannah.ingram@example.com",
      "contact": "8901234567",
      "address": "505 Walnut St, City",
      "joiningDate": "2023-07-01",
      "leaves": 3
    },
    {
      "id": 9,
      "name": "Ian Jacobs",
      "role": "IT",
      "email": "ian.jacobs@example.com",
      "contact": "9012345678",
      "address": "606 Spruce Ln, City",
      "joiningDate": "2023-08-15",
      "leaves": 5
    },
    {
      "id": 10,
      "name": "Jessica King",
      "role": "Management",
      "email": "jessica.king@example.com",
      "contact": "0123456789",
      "address": "707 Oak St, City",
      "joiningDate": "2023-09-05",
      "leaves": 2
    }
  ];  

  // Global state
  const [employees, setEmployees] = useState(demoEmployees);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  // "employees" or "attendance"
  const [view, setView] = useState('employees');
  // New state to track modal mode: "add", "edit", or "view"
  const [employeeModalMode, setEmployeeModalMode] = useState("add");
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  // --- Employee Handlers ---
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
      // Edit mode: update employee
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === selectedEmployee.id ? { ...employeeData, id: selectedEmployee.id } : emp
        )
      );
    } else {
      // Add mode: add new employee with unique id
      setEmployees((prev) => [...prev, { ...employeeData, id: Date.now() }]);
    }
    handleCloseEmployeeModal();
  };

  // Attendance handler remains the same...
  const handleSaveAttendance = (attendanceData) => {
    setAttendanceRecords((prev) => {
      const index = prev.findIndex((record) => record.date === attendanceData.date);
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
        
      {/* Employee Form Modal (for add/edit/view) */}
      {isEmployeeModalOpen && (
        <EmployeeFormModal
          isOpen={isEmployeeModalOpen}
          onClose={handleCloseEmployeeModal}
          onSubmit={handleSaveEmployee}
          employee={selectedEmployee} // prefilled data if editing or viewing
          mode={employeeModalMode} // Pass the current mode ("add", "edit", or "view")
        />
      )}

      <main className="main-content">
        {view === 'employees' ? (
          <EmployeeList
            employees={employees}
            onAddEmployee={handleOpenAddEmployee}
            onAttendance={() => setView('attendance')}
            onEdit={handleEditEmployee}
            onDelete={(id) => setEmployees((prev) => prev.filter((emp) => emp.id !== id))}
            onView={handleViewEmployee} // Pass the new view handler
          />
        ) : (
          <AttendanceSheet
            employees={employees}
            onBack={() => setView('employees')}
            onSave={handleSaveAttendance}
            attendanceRecords={attendanceRecords}
          />
        )}
      </main>
      <Toaster />
    </div>
  );
}

export default App;
