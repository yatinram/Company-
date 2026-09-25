import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminShortcutListener() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check for Ctrl + Shift + L (or Cmd + Shift + L on macOS)
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;
      const isShift = e.shiftKey;
      const isL = e.key === 'l' || e.key === 'L';

      if (isCtrlOrCmd && isShift && isL) {
        e.preventDefault();
        // If already on login or inside admin, don't re-navigate
        if (location.pathname === '/login' || location.pathname.startsWith('/admin')) {
          return;
        }

        if (isAuthenticated) {
          navigate('/admin');
        } else {
          navigate('/login');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, location, isAuthenticated]);

  return null;
}
