import React from 'react';
import { LogOut } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ExitConfirmModal: React.FC<Props> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-6">
      {/* Backdrop - Lighter blur for simplicity */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300" 
        onClick={onClose}
      ></div>
      
      {/* Modal Content - Smaller width and more compact padding */}
      <div className="bg-[#1f212e] w-full max-w-[280px] rounded-[1.5rem] relative z-10 animate-slide-up border border-gray-700/30 shadow-xl overflow-hidden">
        
        <div className="p-6 text-center">
          {/* Simple Icon */}
          <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogOut size={24} className="text-red-500" />
          </div>

          {/* Text Content - Simplified */}
          <h2 className="text-lg font-bold text-white mb-1">
            خروج من التطبيق؟
          </h2>
          <p className="text-xs text-gray-400 mb-6">
            هل أنت متأكد من رغبتك في الخروج؟
          </p>

          {/* Action Buttons - Side by side for compactness */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 bg-[#242636] hover:bg-[#2f3245] text-gray-300 text-sm font-semibold rounded-xl border border-gray-700/50 active:scale-[0.95] transition-all"
            >
              إلغاء
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold rounded-xl active:scale-[0.95] transition-all"
            >
              خروج
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExitConfirmModal;
