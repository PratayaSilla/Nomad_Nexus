'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react'


type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  closeBtnClasses?: string
  title?: string;
};

export default function Modal({ isOpen, onClose, children, className, closeBtnClasses, title }: ModalProps) {

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div ref={modalRef} className={`bg-white p-6 rounded-xl max-w-md w-full relative shadow-lg ${className}`}>
        <div className='flex items-center justify-between pb-4'>
          <h2 className='font-bold text-xl text-text-primary'>{title}</h2>
          <button onClick={onClose} className={`top-2 right-3 text-xl font-bold cursor-pointer ${closeBtnClasses}`}>
            <X strokeWidth={3}/>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}




