// components/SearchFilter.jsx
import React from 'react';

export default function SearchFilter({ searchTerm, onSearchChange, filterRole, onFilterChange , employees =[]}) {
  const roles = Array.from(new Set(employees.map(emp => emp.role)));
  return (
    <div className="search-filter flex gap-2 my-auto">
      <input
        type="text"
        placeholder="Search name"
        value={searchTerm}
        onChange={onSearchChange}
        className="  inline-flex 
                    items-center 
                    px-4 
                    py-2 
                    border 
                    border-black 
                    bg-white 
                    text-black 
                    rounded-full 
                    hover:bg-gray-100 
                    focus:ring-1 
                    focus:ring-black"
      />
      <select value={filterRole} onChange={onFilterChange} className="
            inline-flex 
            items-center 
            px-3
            py-2 
            bg-black 
            text-white 
            rounded-full 
            hover:bg-gray-800
          "    
          >
            <option value="all">All Roles</option>
         {roles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
    </div>
  );
}
