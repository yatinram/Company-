import React, { useState, useEffect } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

export default function AdminHeader({ title }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">{title || 'Dashboard'}</h1>
      </div>
      <div className="header-right">
        <div className="header-time" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <FaCalendarAlt style={{ color: '#d94452' }} />
          <span>{formatDate(time)} &nbsp;·&nbsp; {formatTime(time)}</span>
        </div>
      </div>
    </header>
  );
}
