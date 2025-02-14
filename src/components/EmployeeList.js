import { useState } from "react";
import SearchFilter from "./SearchFilter";

export default function EmployeeList({ employees, onAddEmployee, onAttendance, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  // Filter employees based on search term and role filter
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || emp.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="employee-list-container p-4">
      <div className="controls-header flex justify-between items-center mb-4">
        <div>
          <SearchFilter 
            searchTerm={searchTerm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
            filterRole={filterRole}
            onFilterChange={(e) => setFilterRole(e.target.value)}
          />
        </div>
        <div className="action-buttons flex gap-2">
          <button 
            onClick={onAddEmployee}
            className="add-employee-btn bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Employee
          </button>
          <button 
            onClick={onAttendance}
            className="attendance-btn bg-green-600 text-white px-4 py-2 rounded"
          >
            Attendance
          </button>
        </div>
      </div>

      <table className="employee-table w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Contact</th>
            <th className="p-2 border">Leaves</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map(emp => (
            <tr key={emp.id} className="text-center">
              <td className="p-2 border">{emp.name}</td>
              <td className="p-2 border">{emp.role}</td>
              <td className="p-2 border">{emp.contact}</td>
              <td className="p-2 border">{emp.leaves}</td>
              <td className="p-2 border">
                <button 
                  onClick={() => onEdit(emp)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button 
                  onClick={() => onDelete(emp.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
