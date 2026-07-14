import React from 'react';

export default function RansomText({ text, className = '', shadowColor = '#732424', extreme = false, redChars = [], blackChars = [], whiteChars = [], redIndices = [], whiteIndices = [] }) {
  const words = text.split(' ');
  let i = 0;

  return (
    <span className={`inline-flex flex-wrap justify-center ${className}`}>
      {words.map((word, wIdx) => (
        <React.Fragment key={wIdx}>
          <span className="inline-flex whitespace-nowrap">
            {word.split('').map((char) => {
              const currentI = i++;
              
              if (extreme) {
                // Extreme alternating styles for Persona 5 ransom note effect
                const rotMap = ['rotate-[8deg]', '-rotate-[6deg]', 'rotate-[4deg]', '-rotate-[10deg]', 'rotate-[12deg]'];
                const skewMap = ['-skew-x-[20deg]', 'skew-x-[15deg]', '-skew-x-[10deg]', 'skew-x-[25deg]', '-skew-x-[18deg]'];
                const sizeMap = ['scale-125', 'scale-95', 'scale-110', 'scale-90', 'scale-115'];
                const yMap = ['translate-y-[8px]', '-translate-y-[6px]', 'translate-y-[4px]', '-translate-y-[10px]', 'translate-y-[2px]'];
                
                const rot = rotMap[currentI % 5];
                const skew = skewMap[currentI % 5];
                const size = sizeMap[currentI % 5];
                const y = yMap[currentI % 5];
                
                return (
                  <span 
                    key={currentI} 
                    className={`relative inline-block transform transition-transform hover:scale-150 hover:z-20 cursor-default shrink-0 ${rot} ${skew} ${size} ${y}`}
                    style={{ 
                      marginLeft: currentI > 0 ? '-0.05em' : '0' 
                    }}
                  >
                    {/* Shadow Layer: customizable fill with black stroke */}
                    <span 
                      className="absolute top-[5px] left-[5px] md:top-[8px] md:left-[8px] -z-10 ransom-stroke"
                      style={{ 
                        color: shadowColor,
                      }}
                    >
                      {char}
                    </span>
                    <span 
                      className={`relative z-10 ransom-stroke ${
                        redIndices.includes(currentI) || redChars.includes(char.toUpperCase()) ? 'text-[#d92323]' : 
                        (blackChars.includes(char.toUpperCase()) ? 'text-black' : 
                        (whiteIndices.includes(currentI) || whiteChars.includes(char.toUpperCase()) ? 'text-white' : 'text-white'))}`}
                    >
                      {char}
                    </span>
                  </span>
                );
              }

              // Original mild styling
              const rotMapMild = ['rotate-[6deg]', '-rotate-[4deg]', 'rotate-[2deg]', '-rotate-[6deg]'];
              const skewMapMild = ['skew-x-[12deg]', '-skew-x-[10deg]', 'skew-x-[8deg]', '-skew-x-[15deg]'];
              const sizeMapMild = ['scale-110', 'scale-105', 'scale-100', 'scale-115'];
              const yMapMild = ['-translate-y-[4px] md:-translate-y-[20px]', '-translate-y-[2px]', 'translate-y-[1px]', '-translate-y-[5px]'];
              
              const rotMild = rotMapMild[currentI % 4];
              const skewMild = skewMapMild[currentI % 4];
              const sizeMild = sizeMapMild[currentI % 4];
              const yMild = yMapMild[currentI % 4];

              return (
                <span 
                  key={currentI} 
                  className={`inline-block transform transition-transform hover:scale-125 hover:z-10 cursor-default shrink-0 ransom-stroke ransom-shadow ${rotMild} ${skewMild} ${sizeMild} ${yMild}`}
                  style={{ 
                    color: redIndices.includes(currentI) || redChars.includes(char.toUpperCase()) ? '#d92323' : 
                           (blackChars.includes(char.toUpperCase()) ? 'black' : 
                           (whiteIndices.includes(currentI) || whiteChars.includes(char.toUpperCase()) ? 'white' : 'inherit')),
                    marginLeft: currentI > 0 ? '-0.05em' : '0' 
                  }}
                >
                  {char}
                </span>
              );
            })}
          </span>
          {wIdx < words.length - 1 && (() => { i++; return <span key={`space-${wIdx}`} className="w-[0.4em] inline-block"></span>; })()}
        </React.Fragment>
      ))}
    </span>
  );
}
