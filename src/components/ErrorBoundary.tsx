import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo });
    console.error('CRITICAL UI CRASH:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const errorMessage = this.state.error?.message || String(this.state.error);
      const errorStack = this.state.error?.stack || 'No stack trace available';

      return (
        <div className="min-h-screen bg-[#13141f] flex flex-col items-center justify-center px-6 py-10 text-center overflow-y-auto">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
            <ShieldAlert className="text-red-500" size={32} />
          </div>
          
          <div className="text-2xl font-bold text-white mb-2">عذراً، حدث خطأ تقني</div>
          <div className="text-gray-400 mb-6 text-sm">
            واجه التطبيق مشكلة غير متوقعة عند بدء التشغيل. يمكنك نسخ تفاصيل الخطأ أدناه وإرسالها للمطور.
          </div>

          <div className="w-full max-w-md bg-black/40 border border-gray-700 rounded-xl p-4 mb-6 text-left overflow-hidden">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Error Details</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(`Error: ${errorMessage}\n\nStack: ${errorStack}`);
                  alert('تم نسخ تفاصيل الخطأ');
                }}
                className="text-[10px] bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded transition-colors"
              >
                نسخ النص
              </button>
            </div>
            <div className="font-mono text-xs text-red-400 break-words whitespace-pre-wrap max-h-40 overflow-y-auto">
              {errorMessage}
              {"\n\n"}
              <span className="text-gray-600">{errorStack}</span>
            </div>
          </div>

          <div className="flex flex-col w-full max-w-md gap-3">
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.href = '/';
              }}
              className="w-full px-4 py-3 rounded-xl bg-emerald-600 text-white font-bold active:scale-95 transition-all shadow-lg shadow-emerald-600/20"
            >
              إعادة تشغيل التطبيق
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
