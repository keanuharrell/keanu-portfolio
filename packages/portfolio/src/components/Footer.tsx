import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-8 border-t border-neutral-200">
      <div className="container-width">
        <p className="text-sm text-neutral-500">
          © {new Date().getFullYear()} Keanu Harrell
        </p>
      </div>
    </footer>
  );
};