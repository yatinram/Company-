import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaLeaf,
  FaShoppingCart,
  FaHeartbeat,
  FaGraduationCap,
  FaIndustry,
  FaTruck,
  FaBuilding,
  FaHospital,
  FaArrowRight,
} from 'react-icons/fa';

const iconMap = {
  FaLeaf,
  FaShoppingCart,
  FaHeartbeat,
  FaGraduationCap,
  FaIndustry,
  FaTruck,
  FaBuilding,
  FaHospital,
};

/**
 * IndustryCard - Displays an industry with color theme and icon
 * Props: industry { title, description, icon, bgColor, textColor, iconBg }
 */
const IndustryCard = ({ industry }) => {
  const { title, description, icon, bgColor, textColor, iconBg } = industry;

  const IconComponent = iconMap[icon] || FaIndustry;

  return (
    <div
      className="industry-card"
      style={{
        background: bgColor || '#f0faf7',
        color: textColor || '#1a1a1a',
      }}
    >
      <div
        className="industry-card-icon"
        style={{
          background: iconBg || 'rgba(0,0,0,0.08)',
          color: textColor || '#1a1a1a',
        }}
      >
        <IconComponent />
      </div>

      <h3 style={{ color: textColor || '#1a1a1a' }}>{title}</h3>

      <p style={{ color: textColor ? `${textColor}cc` : '#333' }}>
        {description}
      </p>

      <div
        style={{
          marginTop: '1.25rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.82rem',
          fontWeight: 600,
          color: textColor || '#1a1a1a',
          opacity: 0.75,
        }}
      >
        Explore <FaArrowRight style={{ fontSize: '0.7rem' }} />
      </div>
    </div>
  );
};

export default IndustryCard;
