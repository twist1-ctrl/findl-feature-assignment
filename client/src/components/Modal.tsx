import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className = "" }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className={`bg-white rounded-xl shadow-xl p-8 relative w-full max-w-lg mx-4 ${className}`}
        style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}>
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-700 text-2xl font-light"
          aria-label="Close"
          style={{ zIndex: 10 }}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
