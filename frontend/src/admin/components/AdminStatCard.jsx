import React from 'react';

export default function AdminStatCard({ label, value, icon, color = 'red' }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}>{icon}</div>
      <div>
        <div className="stat-number">{value ?? 0}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );
}
