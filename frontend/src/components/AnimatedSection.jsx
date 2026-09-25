import React, { useEffect, useRef } from 'react';

/**
 * AnimatedSection - Wraps children in a div with IntersectionObserver
 * Adds 'visible' class when element enters viewport (triggers CSS reveal animation)
 */
const AnimatedSection = ({
  children,
  className = '',
  delay = 0,
  style = {},
  tag: Tag = 'div',
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Small delay for staggered animations
          setTimeout(() => {
            element.classList.add('visible');
          }, delay);
          observer.unobserve(element);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [delay]);

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={style}>
      {children}
    </Tag>
  );
};

export default AnimatedSection;
