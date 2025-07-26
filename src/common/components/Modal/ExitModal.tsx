import React from 'react'

type ExitModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSaveAndExit: () => void;
  onContinue: () => void;
};

const ExitModal: React.FC<ExitModalProps> = ({ isOpen,onClose, onSaveAndExit, onContinue }) => {
    if (!isOpen) return null

    return (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-brightness-90">

        <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
          <h2 className="text-lg font-semibold mb-4">Leave this page?</h2>
          <p className="mb-6 text-gray-700">Do you want to save your draft before exiting?</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={onContinue}
              className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              Continue
            </button>
            <button
              onClick={onSaveAndExit}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Save & Exit
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  export default ExitModal

  
  
  
  
  
  
  
  
  