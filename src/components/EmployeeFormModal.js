// components/EmployeeFormModal.jsx
import React, { useState, useEffect } from "react";

export default function EmployeeFormModal({ isOpen, onClose, onSubmit, employee }) {
  // Set up local state for form data
  const [formData, setFormData] = useState({
    name: '',
    role: 'Front office',
    email: '',
    contact: '',
    address: '',
    joiningDate: '',
    leaves: 0,
  });

  // When the component mounts or the `employee` prop changes,
  // update formData with the employee data if it exists
  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || '',
        role: employee.role || 'Front office',
        email: employee.email || '',
        contact: employee.contact || '',
        address: employee.address || '',
        joiningDate: employee.joiningDate || '',
        leaves: employee.leaves || 0,
      });
    } else {
      // Reset the form if no employee is provided (for add mode)
      setFormData({
        name: '',
        role: 'Front office',
        email: '',
        contact: '',
        address: '',
        joiningDate: '',
        leaves: 0,
      });
    }
  }, [employee]);

  // Update state when inputs change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black ">
      <div className="modal-content bg-white p-6 rounded-lg w-11/12 md:w-1/2 relative">
        <div className="modal-header flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{employee ? "Edit Employee" : "Add Employee"}</h2>
          <button onClick={onClose} className="text-2xl text-gray-600">&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="name" className="block mb-1">Name:</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
              placeholder="Enter full name"
            />
          </div>
          
          <div className="form-group mb-4">
            <label htmlFor="role" className="block mb-1">Role:</label>
            <select
              id="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="Front office">Front Office</option>
              <option value="Support">Support</option>
              {/* Add more options if needed */}
            </select>
          </div>
          
          <div className="form-group mb-4">
            <label htmlFor="email" className="block mb-1">Email:</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
              placeholder="Enter email"
            />
          </div>
          
          <div className="form-group mb-4">
            <label htmlFor="contact" className="block mb-1">Contact Number:</label>
            <input
              type="tel"
              id="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
              placeholder="Enter contact number"
            />
          </div>
          
          <div className="form-group mb-4">
            <label htmlFor="address" className="block mb-1">Address:</label>
            <textarea
              id="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
              placeholder="Enter address"
            ></textarea>
          </div>
          
          <div className="form-group mb-4">
            <label htmlFor="joiningDate" className="block mb-1">Joining Date:</label>
            <input
              type="date"
              id="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="form-group mb-4">
            <label htmlFor="leaves" className="block mb-1">Number of Leaves:</label>
            <input
              type="number"
              id="leaves"
              value={formData.leaves}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="modal-actions flex justify-end gap-4">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              {employee ? "Save Changes" : "Add Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
