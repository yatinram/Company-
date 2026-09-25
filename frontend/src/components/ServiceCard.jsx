import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaGlobe,
  FaMobileAlt,
  FaCode,
  FaRobot,
  FaComments,
  FaShieldAlt,
  FaCloud,
  FaDatabase,
  FaPalette,
  FaSearch,
  FaChartBar,
  FaLayerGroup,
  FaArrowRight,
  FaCog,
  FaBrain,
  FaNetworkWired,
  FaServer,
  FaLaptopCode,
  FaHeadset,
  FaStore,
} from 'react-icons/fa';

// Icon mapping from string name to component
const iconMap = {
  FaGlobe,
  FaMobileAlt,
  FaCode,
  FaRobot,
  FaComments,
  FaShieldAlt,
  FaCloud,
  FaDatabase,
  FaPalette,
  FaSearch,
  FaChartBar,
  FaLayerGroup,
  FaCog,
  FaBrain,
  FaNetworkWired,
  FaServer,
  FaLaptopCode,
  FaHeadset,
  FaStore,
};

/**
 * ServiceCard - Displays a single service with icon, title, description and link
 * Props: service { id, title, description, icon, color }
 */
const ServiceCard = ({ service }) => {
  const { id, title, description, icon, color } = service;

  const IconComponent = iconMap[icon] || FaCode;
  const cardColor = color || '#d94452';

  const bgColor = `${cardColor}18`; // ~10% opacity

  return (
    <div className="service-card">
      <div
        className="service-card-icon"
        style={{ background: bgColor, color: cardColor }}
      >
        <IconComponent />
      </div>

      <h3>{title}</h3>

      <p>
        {description?.length > 120
          ? `${description.substring(0, 120)}...`
          : description}
      </p>

      <Link
        to={`/services/${id}`}
        className="service-card-link"
        style={{ color: cardColor }}
      >
        Learn More <FaArrowRight style={{ fontSize: '0.75rem' }} />
      </Link>
    </div>
  );
};

export default ServiceCard;
