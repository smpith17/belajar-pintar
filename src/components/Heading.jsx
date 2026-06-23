import React from 'react';

const Heading = ({ level = "h1", children, className = "" }) => {
  const Tag = level; // h1, h2, h3, etc.
  
  const styles = {
    h1: "text-2xl font-bold text-gray-800",
    h2: "text-lg font-semibold text-gray-700",
    h3: "text-md font-medium text-gray-600",
  };

  return (
    <Tag className={`${styles[level]} ${className}`}>
      {children}
    </Tag>
  );
};

export default Heading;