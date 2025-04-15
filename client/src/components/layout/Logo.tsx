import React from 'react';

interface LogoProps {
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ showText = true, size = 'md', className = '' }) => {
  // Size configs
  const sizeConfig = {
    sm: {
      iconSize: 24,
      textClass: 'text-sm',
      containerClass: 'gap-1',
    },
    md: {
      iconSize: 32,
      textClass: 'text-lg',
      containerClass: 'gap-2',
    },
    lg: {
      iconSize: 40,
      textClass: 'text-xl md:text-2xl',
      containerClass: 'gap-3',
    },
  };
  
  const config = sizeConfig[size];
  
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Logo Icon */}
      <div 
        className={`relative rounded-lg overflow-hidden flex items-center justify-center bg-dark-blue p-2`}
        style={{ width: config.iconSize * 1.5, height: config.iconSize * 1.5 }}
      >
        {/* Document Icon */}
        <svg width={config.iconSize} height={config.iconSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 2V8H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 18C13.6569 18 15 16.6569 15 15C15 13.3431 13.6569 12 12 12C10.3431 12 9 13.3431 9 15C9 16.6569 10.3431 18 12 18Z" fill="#00B894"/>
          <path d="M12 15.5C12.2761 15.5 12.5 15.2761 12.5 15C12.5 14.7239 12.2761 14.5 12 14.5C11.7239 14.5 11.5 14.7239 11.5 15C11.5 15.2761 11.7239 15.5 12 15.5Z" fill="white"/>
          <path d="M12 14V12.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      
      {/* Logo Text */}
      {showText && (
        <div className={`flex flex-col items-center mt-1`}>
          <span className={`font-bold ${config.textClass} text-dark-blue`}>Mawthiq</span>
          <span className={`font-bold ${config.textClass} text-dark-blue`}>موثّق</span>
        </div>
      )}
    </div>
  );
};

export default Logo;