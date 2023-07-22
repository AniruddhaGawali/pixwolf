import { useRef } from 'react';

export default function Modal({ onClose = () => {}, children }) {
  let overlayRef = useRef();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div
        ref={overlayRef}
        onClick={(e) => {
          if (e.target === overlayRef.current) {
            onClose();
          }
        }}
        className="absolute inset-0 z-40"
      />
      <div className="bg-white shadow-lg lg:w-5/6 w-11/12 h-[85vh] rounded-lg z-50 lg:overflow-hidden overflow-scroll">{children}</div>
    </div>
  );
}
