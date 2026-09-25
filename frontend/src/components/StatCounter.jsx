import React, { useState, useEffect, useRef } from 'react';

/**
 * StatCounter - Animates a number from 0 to `end` over 2 seconds
 * Props: end (number), label (string), suffix (string), prefix (string)
 */
const StatCounter = ({ end, label, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  // Parse end value (handles strings like "10+" or "100%")
  const numericEnd = parseFloat(String(end).replace(/[^0-9.]/g, '')) || 0;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => { if (element) observer.unobserve(element); };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const duration = 2000;
    const steps = 60;
    const increment = numericEnd / steps;
    const stepTime = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericEnd) {
        setCount(numericEnd);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [hasStarted, numericEnd]);

  // Format display (integer vs float)
  const displayCount =
    numericEnd % 1 === 0 ? Math.floor(count) : count.toFixed(1);

  return (
    <div ref={ref} className="stat-item">
      <div className="stat-number">
        {prefix}{displayCount}{suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

export default StatCounter;
