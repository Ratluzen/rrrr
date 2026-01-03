import React from 'react';
import { LogOut, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ExitConfirmModal: React.FC<Props> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-8">
      {/* Backdrop - Deep blur for premium feel */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-md transition-opacity duration-500" 
        onClick={onClose}
      ></div>
      
      {/* Modal Content - Glassmorphism & Soft UI */}
      <div className="bg-[#1c1e29]/90 w-full max-w-[300px] rounded-[2.5rem] relative z-10 animate-slide-up border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-xl">
        
        {/* Subtle Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>

        <div className="p-8 text-center">
          {/* Soft Icon Container */}
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full animate-pulse"></div>
            <div className="relative w-full h-full bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-3xl flex items-center justify-center border border-red-500/30 shadow-inner">
              <LogOut size={28} className="text-red-400" />
            </div>
          </div>

          {/* Text Content - Elegant Typography */}
          <h2 className="text-xl font-bold text-white/95 mb-2 tracking-tight">
            تسجيل الخروج
          </h2>
          <p className="text-sm text-gray-400/80 leading-relaxed mb-8 px-2">
            هل أنت متأكد أنك تريد تسجيل الخروج من حسابك؟
          </p>

          {/* Action Buttons - Modern & Soft */}
          <div className="space-y-3">
            <button
              onClick={onConfirm}
              className="w-full py-3.5 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white text-sm font-bold rounded-[1.25rem] shadow-lg shadow-red-900/30 active:scale-[0.97] transition-all duration-300"
            >
              تأكيد الخروج
            </button>
            
            <button
              onClick={onClose}
              className="w-full py-3.5 bg-white/5 hover:bg-white/10 text-gray-300 text-sm font-medium rounded-[1.25rem] border border-white/5 active:scale-[0.97] transition-all duration-300"
            >
              البقاء في التطبيق
            </button>
          </div>
        </div>

        {/* Decorative Bottom Element */}
        <div className="h-1 w-12 bg-white/10 mx-auto mb-4 rounded-full"></div>
      </div>
    </div>
  );
};

export default ExitConfirmModal;
