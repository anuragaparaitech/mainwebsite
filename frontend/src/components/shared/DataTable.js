import React, { useState } from 'react';
import { MdEdit, MdDelete, MdSearch, MdCheckCircle, MdCancel } from 'react-icons/md';
import './DataTable.css';

const DataTable = ({ columns, data, onEdit, onDelete, loading }) => {
  const [search, setSearch] = useState('');

  const filtered = data.filter((row) =>
    columns.some((col) =>
      String(row[col.key] || '')
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  );

  if (loading) {
    return (
      <div className="table-loading">
        <div className="loading-spinner"></div>
        <p>Loading data...</p>
      </div>
    );
  }

  return (
    <div className="data-table-wrapper">
      <div className="table-toolbar">
        <div className="search-box">
          <MdSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <span className="record-count">{filtered.length} records</span>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr className="empty-row">
                <td colSpan={columns.length + 2}>
                  No records found
                </td>
              </tr>
            ) : (
              filtered.map((row, i) => (
                <tr key={row._id || i}>
                  <td className="row-num">{i + 1}</td>
                  {columns.map((col) => (
                    <td key={col.key}>
                      {col.render ? (
                        col.render(row[col.key], row)
                      ) : col.type === 'status' ? (
                        <span className={`badge ${row[col.key] ? 'badge-success' : 'badge-danger'}`}>
                          {row[col.key] ? (
                            <><MdCheckCircle /> Active</>
                          ) : (
                            <><MdCancel /> Inactive</>
                          )}
                        </span>
                      ) : (
                        <span className="cell-text">{String(row[col.key] || '-')}</span>
                      )}
                    </td>
                  ))}
                  <td className="actions-cell">
                    <button
                      className="action-btn edit"
                      onClick={() => onEdit(row)}
                      title="Edit"
                    >
                      <MdEdit />
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => onDelete(row._id)}
                      title="Delete"
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
