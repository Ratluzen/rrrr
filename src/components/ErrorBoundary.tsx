import React from 'react';
import { ShieldAlert, RefreshCcw, Copy, Trash2 } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  persistedCrash: any | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    let savedCrash = null;
    try {
      const raw = localStorage.getItem('last_app_crash');
      if (raw) savedCrash = JSON.parse(raw);
    } catch (e) {}

    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      persistedCrash: savedCrash
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo });
    console.error('CRITICAL UI CRASH:', error, errorInfo);
    
    // Also save this crash immediately in case of total exit
    try {
      const crashData = {
        message: error.message || String(error),
        stack: error.stack || 'No stack trace',
        time: new Date().toISOString(),
        type: 'ReactErrorBoundary'
      };
      localStorage.setItem('last_app_crash', JSON.stringify(crashData));
    } catch (e) {}
  }

  clearCrash = () => {
    localStorage.removeItem('last_app_crash');
    this.setState({ persistedCrash: null, hasError: false, error: null });
    window.location.reload();
  };

  render() {
    const isCrashed = this.state.hasError || this.state.persistedCrash;
    
    if (isCrashed) {
      const crash = this.state.persistedCrash || {
        message: this.state.error?.message || String(this.state.error),
        stack: this.state.error?.stack || 'No stack trace available',
        type: 'ActiveCrash'
      };

      return (
        <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center px-6 py-10 text-center overflow-y-auto">
          <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mb-6 border border-red-500/20 shadow-2xl shadow-red-500/10">
            <ShieldAlert className="text-red-500" size={40} />
          </div>
          
          <div className="text-2xl font-black text-white mb-2 tracking-tight">تم اكتشاف انهيار سابق</div>
          <div className="text-gray-400 mb-8 text-sm leading-relaxed max-w-xs mx-auto">
            يبدو أن التطبيق خرج بشكل مفاجئ. تم التقاط سجل الخطأ أدناه لمساعدتنا في إصلاح المشكلة.
          </div>

          <div className="w-full max-w-md bg-[#13141f] border border-gray-800 rounded-2xl p-5 mb-8 text-left shadow-xl">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-800/50">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-1">Crash Log Detected</span>
                <span className="text-[9px] text-gray-500 font-mono">{crash.time || 'Just now'}</span>
              </div>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(`Type: ${crash.type}\nMessage: ${crash.message}\n\nStack: ${crash.stack}`);
                  alert('تم نسخ تفاصيل الخطأ بنجاح');
                }}
                className="flex items-center gap-2 text-[10px] bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 px-3 py-1.5 rounded-lg transition-all border border-emerald-500/20 font-bold"
              >
                <Copy size={12} />
                نسخ السجل
              </button>
            </div>
            <div className="font-mono text-[11px] text-gray-300 break-words whitespace-pre-wrap max-h-60 overflow-y-auto no-scrollbar bg-black/20 p-3 rounded-xl border border-black/40">
              <span className="text-red-400 font-bold">[{crash.type}]</span> {crash.message}
              {"\n\n"}
              <span className="text-gray-600 leading-loose">{crash.stack}</span>
            </div>
          </div>

          <div className="flex flex-col w-full max-w-md gap-3">
            <button
              onClick={this.clearCrash}
              className="w-full px-4 py-4 rounded-2xl bg-white text-black font-black text-sm active:scale-[0.98] transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <RefreshCcw size={18} />
              إعادة تشغيل التطبيق
            </button>
            
            <button
              onClick={() => {
                localStorage.removeItem('last_app_crash');
                this.setState({ persistedCrash: null, hasError: false, error: null });
              }}
              className="w-full px-4 py-3 rounded-2xl bg-transparent text-gray-500 font-bold text-xs hover:text-gray-300 transition-all flex items-center justify-center gap-2"
            >
              <Trash2 size={14} />
              مسح السجل والمتابعة
            </button>
          </div>

          <div className="mt-12 text-[10px] text-gray-600 font-medium tracking-widest uppercase">
            Ratnzer Services Debug System v2.0
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
