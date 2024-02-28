'use client'

import { useState } from 'react';

const SlidingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div className="fixed bottom-0 left-0 z-10 p-4 text-white bg-blue-500">
        <button onClick={toggleMenu}>
          {isOpen ? 'Cerrar' : 'Abrir'}
        </button>
      </div>

      <div
        className={`fixed bottom-0 left-0 z-0 w-64 h-screen bg-gray-800 text-white transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <ul className="p-4">
          <li className="mb-2">
            <a href="#" className="text-white hover:text-blue-500">
              Opción 1
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-white hover:text-blue-500">
              Opción 2
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-white hover:text-blue-500">
              Opción 3
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SlidingMenu;