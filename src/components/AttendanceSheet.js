// components/AttendanceSheet.jsx
import { useState, useEffect } from 'react';
import SearchFilter from './SearchFilter';
import toast from 'react-hot-toast';

export default function AttendanceSheet({ employees, onBack, onSave, attendanceRecords }) {
  // Default the date to today
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  // Attendance state: an object mapping employee IDs to boolean values (false by default)
  const [attendance, setAttendance] = useState({});

  // Reusable search/filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  // Filter employees using universal search filter logic
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || emp.role === filterRole;
    return matchesSearch && matchesRole;
  });

  // When attendanceDate or attendanceRecords change, load the saved record for that date if it exists
  useEffect(() => {
    const record = attendanceRecords.find(r => r.date === attendanceDate);
    if (record) {
      setAttendance(record.records);
    } else {
      // Otherwise, initialize all employees' attendance to false
      const initialAttendance = {};
      employees.forEach(emp => {
        initialAttendance[emp.id] = false;
      });
      setAttendance(initialAttendance);
    }
  }, [employees, attendanceRecords, attendanceDate]);

  const handleCheckboxChange = (id) => {
    setAttendance(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = () => {
    const attendanceData = {
      date: attendanceDate,
      records: attendance,
    };
    onSave(attendanceData);
    toast.success("Attendance saved succesfully")
  };

  return (
    <div className="attendance-page p-4 w-11/12 mx-auto">
      <div className="header flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Attendance</h2>
        <button onClick={onBack} className="bg-gray-500 text-white px-4 py-2 rounded">
          Back
        </button>
      </div>

      <div className="controls-header flex justify-between items-center mb-4 w-full my-auto">
  <SearchFilter
    searchTerm={searchTerm}
    onSearchChange={(e) => setSearchTerm(e.target.value)}
    filterRole={filterRole}
    onFilterChange={(e) => setFilterRole(e.target.value)}
    employees={employees}
  />
  <div className="form-group flex items-center mb-4">
    <label className="mr-2 font-medium">Date:</label>
    <input
      type="date"
      value={attendanceDate}
      onChange={(e) => setAttendanceDate(e.target.value)}
      className="p-2 border rounded"
      max={new Date().toISOString().split("T")[0]}
    />
  </div>
</div>

      <table className="attendance-table w-11/12 border-collapse mb-4 mx-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Contact</th>
            <th className="p-2 border">Present</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map(emp => (
            <tr key={emp.id} className="text-center">
              <td className="p-2 border">{emp.name}</td>
              <td className="p-2 border">{emp.role}</td>
              <td className="p-2 border">{emp.contact}</td>
              <td className="p-2 border">
                <input
                  type="checkbox"
                  checked={attendance[emp.id] || false}
                  onChange={() => handleCheckboxChange(emp.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="actions flex justify-end">
        <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded ">
          Save Attendance
        </button>
      </div>
    </div>
  );
}
