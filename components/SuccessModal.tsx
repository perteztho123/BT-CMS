import React from 'react';
import { CheckCircle, X } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  referenceNumber: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, referenceNumber }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full text-center animate-fadeIn">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
          <CheckCircle className="text-green-600" size={32} />
        </div>
        
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Report Submitted Successfully!
        </h3>
        
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">
            Your reference number is:{' '}
            <span className="font-bold text-blue-600">{referenceNumber}</span>
          </p>
          <p className="text-sm text-gray-500">
            An MDRRMO responder will contact you shortly.
          </p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <p className="text-xs text-blue-800">
            Please save your reference number for tracking purposes. 
            You can use it to follow up on your report.
          </p>
        </div>
        
        <button
          onClick={onClose}
          className="inline-flex justify-center px-6 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
