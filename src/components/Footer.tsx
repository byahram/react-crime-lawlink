import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-100 py-4 text-center text-sm text-gray-600">
      © {currentYear} Ahram Kim. All rights reserved.
    </footer>
  );
};

export default Footer;
