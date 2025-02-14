// components/SearchFilter.jsx
import React from 'react';

export default function SearchFilter({ searchTerm, onSearchChange, filterRole, onFilterChange }) {
  return (
    <div className="search-filter flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Search name"
        value={searchTerm}
        onChange={onSearchChange}
        className="p-2 border rounded"
      />
      <select value={filterRole} onChange={onFilterChange} className="p-2 border rounded">
        <option value="all">All Roles</option>
        <option value="Front office">Front office</option>
        <option value="Support">Support</option>
      </select>
    </div>
  );
}
