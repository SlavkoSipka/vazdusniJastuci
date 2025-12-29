import React from 'react';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = "Učitavanje..." }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-r from-red-600 to-red-700 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="animate-pulse mb-8">
          <img 
            src="https://aislike.rs/Jastuci/logo.png" 
            alt="Vazdušni Jastuci Logo" 
            className="h-80 w-auto mx-auto"
          />
        </div>
        
        <div className="w-96 mx-auto mb-6">
          <div className="bg-white bg-opacity-20 h-3 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full animate-loading-progress"
            />
          </div>
        </div>
        
        <p className="text-white text-xl font-bold mt-4 uppercase tracking-wide">
          {message}
        </p>
      </div>
      
      <style jsx>{`
        @keyframes loading-progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-loading-progress {
          animation: loading-progress 2.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;