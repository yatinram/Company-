import React from 'react';
import { FaEdit, FaTrash, FaInbox } from 'react-icons/fa';

export default function AdminDataTable({
  columns = [],
  data = [],
  onEdit,
  onDelete,
  loading = false,
  emptyMessage = 'No records found in database',
}) {
  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <span>Loading data from server...</span>
      </div>
    );
  }

  const safeData = Array.isArray(data) ? data : (data?.data && Array.isArray(data.data) ? data.data : []);

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key || col.label}>{col.label}</th>
            ))}
            {(onEdit || onDelete) && <th style={{ textAlign: 'right' }}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {safeData.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}>
                <div className="table-empty">
                  <FaInbox />
                  <p>{emptyMessage}</p>
                </div>
              </td>
            </tr>
          ) : (
            safeData.map((row, idx) => (
              <tr key={row?.id || row?._id || idx}>
                {columns.map((col) => {
                  const val = row ? row[col.key] : '';
                  return (
                    <td key={col.key || col.label}>
                      {col.render ? (
                        col.render(val, row)
                      ) : col.truncate ? (
                        <span className="td-truncate" title={val || ''}>
                          {val || '—'}
                        </span>
                      ) : (
                        val ?? '—'
                      )}
                    </td>
                  );
                })}
                {(onEdit || onDelete) && (
                  <td>
                    <div className="td-actions" style={{ justifyContent: 'flex-end' }}>
                      {onEdit && (
                        <button
                          type="button"
                          className="btn btn-sm btn-icon btn-edit"
                          onClick={() => onEdit(row)}
                          title="Edit record"
                        >
                          <FaEdit />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          type="button"
                          className="btn btn-sm btn-icon btn-delete"
                          onClick={() => onDelete(row)}
                          title="Delete record"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
