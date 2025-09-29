import { useEffect, useCallback } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: Array<{ imagem: string | File; previewImagem: string }>;
  currentIndex: number;
  onNext: () => void;
  onPrevious: () => void;
}

export function Modal({ isOpen, onClose, children, className = "" }: ModalProps) {
  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className={`relative rounded-2xl shadow-2xl w-[calc(100%-60px)] h-[90vh] overflow-hidden transform transition-all duration-300 scale-100 ${className}`}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
        >
          <FaTimes className="text-gray-600 text-lg" />
        </button>
        {children}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export function ImageModal({ 
  isOpen, 
  onClose, 
  images, 
  currentIndex, 
  onNext, 
  onPrevious 
}: ImageModalProps) {
  const currentImage = images[currentIndex];


  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNext();
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPrevious();
  };

  if (!isOpen || !currentImage) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative w-full h-full flex items-center">
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/30 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
            >
              <FaChevronLeft className="text-black-600 text-lg" />
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/30 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
            >
              <FaChevronRight className="text-black-600 text-lg" />
            </button>
          </>
        )}

        {/* Image */}
        <div className="flex items-center justify-center p-0 w-full h-full">
          <img
            src={currentImage.imagem instanceof File ? currentImage.previewImagem : currentImage.imagem}
            alt={`Memória ${currentIndex + 1}`}
            className="w-full h-full object-contain rounded-lg shadow-lg"
          />
        </div>

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 px-4 py-2 rounded-full shadow-lg">
            <span className="text-sm font-medium text-gray-600">
              {currentIndex + 1} de {images.length}
            </span>
          </div>
        )}
      </div>
    </Modal>
  );
}
