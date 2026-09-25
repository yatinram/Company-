import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../config/api';

const CompanyContext = createContext(null);

const defaultCompany = {
  company_name: 'Aventrix Solutions',
  tagline: 'Turning Ideas Into Powerful Digital Solutions.',
  email: 'yatinpatel2747@gmail.com',
  phone: '7863880313',
  address: 'Vaishnodevi, Ahmedabad',
  social_links: {
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: '',
  },
};

export const CompanyProvider = ({ children }) => {
  const [company, setCompany] = useState(defaultCompany);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/api/company-settings')
      .then((r) => {
        const data = r.data?.data || r.data;
        if (data && typeof data === 'object') {
          setCompany((prev) => ({
            ...prev,
            ...data,
            company_name: data.company_name || data.name || prev.company_name,
            social_links: {
              ...prev.social_links,
              ...(data.social_links || {}),
            },
          }));
        }
      })
      .catch((err) => {
        console.warn('Company settings fetch info:', err?.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <CompanyContext.Provider value={{ company, loading }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => useContext(CompanyContext);
