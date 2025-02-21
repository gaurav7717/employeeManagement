import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux';

export default function EmployeeFormModal({
  isOpen,
  onClose,
  onSubmit,
  employee,
  mode, // "add", "edit", or "view"
}) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    gender: "male",
    contact: "",
    email: "",
    leaves: 0,
    location: "",
    address: "",
    role: "",
    salary: 0,
    joiningDate: "",
  });

  // Update form data if employee prop changes (with fallback keys)
  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name ?? "",
        gender: employee.gender ?? "male",
        // Use contact if available; otherwise use demo's "contact"
        contact: employee.contact ?? employee.contact ?? "",
        email: employee.email ?? "",
        leaves: employee.leaves ?? 0,
        location: employee.location ?? "",
        address: employee.address ?? "",
        role: employee.role ?? "",
        salary: employee.salary ?? 0,
        // Use joiningDate if available; otherwise use demo's "joiningDate"
        joiningDate: employee.joiningDate ?? employee.joiningDate ?? "",
      });
    } else {
      setFormData({
        name: "",
        gender: "male",
        contact: "",
        email: "",
        leaves: 0,
        location: "",
        address: "",
        role: "",
        salary: 0,
        joiningDate: "",
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert values to numbers for validation
    const contactNumber = Number(formData.contact);
    const salary = Number(formData.salary);
    const leaves = Number(formData.leaves);

    // Validate each field: if not a number or not positive, alert and return.
    if (isNaN(contactNumber) || contactNumber <= 0) {
      toast.error("Contact number must be a positive number.");
      return;
    }
    if (isNaN(salary) || salary <= 0) {
      toast.error("Salary must be a positive number.");
      return;
    }
    if (isNaN(leaves) || leaves <= 0) {
      toast.error("Number of leaves must be a positive number.");
      return;
    }

    dispatch(onSubmit(e));
    toast.success("Submitted successfully")
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      style={{ opacity: 1, transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1)" }}
      tabIndex="-1"
    >
      <div className="overflow-y-auto max-h-[80vh] p-[30px] bg-white w-3/6 min-w-fit rounded shadow-xl">
        <div className="p-4 w-full">
          {/* Header with close button */}
          <div className="relative mb-4">
            <h2 className="text-xl font-bold text-center">
              {mode === "edit"
                ? "Edit Employee"
                : mode === "view"
                ? "View Employee"
                : "Add Employee"}
            </h2>
            <button
              onClick={onClose}
              className="absolute top-0 right-0 text-2xl text-gray-600 z-10 p-2"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
          <form className="w-full mx-auto" onSubmit={handleSubmit}>
            <div className="w-full space-y-5">
              {/* Name */}
              <div className="mb-5">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                  Name<span className="pl-1 text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required={mode !== "view"}
                  value={formData.name}
                  onChange={handleChange}
                  readOnly={mode === "view"}
                  disabled={mode === "view"}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter full name"
                />
              </div>

              {/* Gender */}
              <div className="mb-5">
                <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">
                  Gender<span className="pl-1 text-red-500">*</span>
                </label>
                <select
                  id="gender"
                  required={mode !== "view"}
                  value={formData.gender}
                  onChange={handleChange}
                  disabled={mode === "view"}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Contact Number */}
              <div className="mb-5">
                <label htmlFor="contact" className="block mb-2 text-sm font-medium text-gray-900">
                  Contact Number<span className="pl-1 text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="contact"
                  required={mode !== "view"}
                  value={formData.contact}
                  onChange={handleChange}
                  readOnly={mode === "view"}
                  disabled={mode === "view"}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter contact number"
                />
              </div>

              {/* Email */}
              <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                  Email<span className="pl-1 text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  required={mode !== "view"}
                  value={formData.email}
                  onChange={handleChange}
                  readOnly={mode === "view"}
                  disabled={mode === "view"}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter email"
                />
              </div>

              {/* Number of Holidays */}
              <div className="mb-5">
                <label htmlFor="leaves" className="block mb-2 text-sm font-medium text-gray-900">
                  Number of Holidays
                </label>
                <input
                  type="number"
                  id="leaves"
                  value={formData.leaves}
                  onChange={handleChange}
                  readOnly={mode === "view"}
                  disabled={mode === "view"}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="0"
                />
              </div>

              {/* Location */}
              <div className="mb-5">
                <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900">
                  Location<span className="pl-1 text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  required={mode !== "view"}
                  value={formData.location}
                  onChange={handleChange}
                  readOnly={mode === "view"}
                  disabled={mode === "view"}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter location"
                />
              </div>

              {/* Address */}
              <div className="mb-5">
                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">
                  Address<span className="pl-1 text-red-500">*</span>
                </label>
                <textarea
                  id="address"
                  rows="2"
                  required={mode !== "view"}
                  value={formData.address}
                  onChange={handleChange}
                  readOnly={mode === "view"}
                  disabled={mode === "view"}
                  className="block p-2.5 w-full text-sm rounded-lg border border-gray-300 
                             focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter address"
                ></textarea>
              </div>

              {/* Role */}
              <div className="mb-5">
                <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900">
                  Role<span className="pl-1 text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="role"
                  required={mode !== "view"}
                  value={formData.role}
                  onChange={handleChange}
                  readOnly={mode === "view"}
                  disabled={mode === "view"}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter role"
                />
              </div>

              {/* Annual Salary */}
              <div className="mb-5">
                <label htmlFor="salary" className="block mb-2 text-sm font-medium text-gray-900">
                  Annual Salary<span className="pl-1 text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="salary"
                  required={mode !== "view"}
                  value={formData.salary}
                  onChange={handleChange}
                  readOnly={mode === "view"}
                  disabled={mode === "view"}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter salary"
                />
              </div>

              {/* Date of Joining */}
              <div className="mb-5">
                <label htmlFor="joiningDate" className="block mb-2 text-sm font-medium text-gray-900">
                  Date of Joining<span className="pl-1 text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="joiningDate"
                  required={mode !== "view"}
                  value={formData.joiningDate}
                  onChange={handleChange}
                  readOnly={mode === "view"}
                  disabled={mode === "view"}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter date of joining"
                />
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                >
                  {mode === "view" ? "Close" : "Cancel"}
                </button>
                {mode !== "view" && (
                  <button
                    type="submit"
                    className="bg-blue-700 text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-low rounded-lg px-5 py-2.5 text-center transition-colors"
                  >
                    {mode === "edit" ? "Save" : "Submit"}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
