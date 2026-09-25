import React from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import '../styles/admin.css';

export default function AdminLayout({ children, title }) {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="main-content">
        <AdminHeader title={title} />
        <div className="content-area">{children}</div>
      </div>
    </div>
  );
}
