import { useState } from "react";
import SearchFilter from "./SearchFilter";

export default function EmployeeList({
  employees,
  onAddEmployee,
  onAttendance,
  onEdit,
  onDelete,
  onView, // New prop for view action
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  // Filter employees based on search term and role filter
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || emp.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="employee-list-container p-4 w-11/12 mx-auto">
      <div className="controls-header flex justify-between items-center mb-4">
        <div>
          <SearchFilter
            searchTerm={searchTerm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
            filterRole={filterRole}
            onFilterChange={(e) => setFilterRole(e.target.value)}
            employees = {employees}
          />
        </div>
        <div className="action-buttons flex gap-2">
          <button
            onClick={onAddEmployee}
            className="
            inline-flex 
            items-center 
            px-4 
            py-2 
            bg-black 
            text-white 
            rounded-full 
            hover:bg-gray-800
          "
          >
            <svg
              class="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M5 12h14m-7 7V5"
              />
            </svg>

            <span>Add Employee</span>
          </button>
          <button
            onClick={onAttendance}
            className="attendance-btn  inline-flex 
                    items-center 
                    px-4 
                    py-2 
                    border 
                    border-green-500 
                    text-black-500 
                    bg-white 
                    rounded-full 
                    hover:bg-green-50 
                    focus:ring-1 
                    focus:ring-green-500
                    transition-colors"
          >
            <svg
              class="w-6 h-6 text-black-800 dark:text-green-500 mr-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                clip-rule="evenodd"
              />
            </svg>

            <span>Attendance</span>
          </button>
        </div>
      </div>

      <table className="employee-table w-11/12 border-collapse mx-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Contact</th>
            <th className="p-2 border">Leaves</th>
            <th className="p-2 border w-2/12">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((emp) => (
            <tr key={emp.id} className="text-center">
              <td className="p-2 border">{emp.name}</td>
              <td className="p-2 border">{emp.role}</td>
              <td className="p-2 border">{emp.contact}</td>
              <td className="p-2 border">{emp.leaves}</td>
              <td className="p-2 border flex place-content-center space-x-5 justify-between">
                {/* View Button */}
                <button
                  onClick={() => onView(emp)}
                  className="
                    inline-flex 
                    items-center 
                    border 
                    p-2
                    border-blue-500 
                    text-blue-500 
                    bg-white 
                    rounded-full 
                    hover:bg-blue-50 
                    focus:ring-1 
                    focus:ring-blue-500
                    transition-colors
                  "
                >
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {/* <span className="font-semibold">View</span> */}
                </button>

                {/* Edit Button */}
                <button
                  onClick={() => onEdit(emp)}
                  className="
                    inline-flex 
                    items-center 
                    border 
                    m-auto
                    p-2
                    border-black 
                    bg-white 
                    text-black 
                    rounded-full 
                    hover:bg-gray-100 
                    focus:ring-1 
                    focus:ring-black
                  "
                >
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                    />
                  </svg>
                  {/* <span className="font-semibold">Edit</span> */}
                </button>

                {/* Remove Button */}
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this employee?")) {
                      onDelete(emp.id);
                    }
                  }}
                  className="
                    inline-flex 
                    items-center 
                    p-2
                    border 
                    border-red-500 
                    text-red-500 
                    bg-white 
                    rounded-full 
                    hover:bg-red-50 
                    focus:outline-none 
                    focus:ring-2 
                    focus:ring-red-500
                    transition-colors
                  "
                >
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-red-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M16 12h4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
