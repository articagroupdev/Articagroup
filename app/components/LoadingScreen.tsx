'use client';

export default function LoadingScreen() {
  return (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center"
      style={{ backgroundColor: '#ffffff' }}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <img 
          src="/img/logo-mini-azul.png" 
          alt="ARTICA" 
          className="h-12 w-auto"
        />
        
        {/* Spinner simple */}
        <div 
          className="w-8 h-8 rounded-full"
          style={{
            border: '3px solid #e5e7eb',
            borderTopColor: '#13B9D5',
            animation: 'spin 0.8s linear infinite',
          }}
        />
      </div>

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
