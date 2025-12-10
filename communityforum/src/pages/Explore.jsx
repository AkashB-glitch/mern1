import React from "react";
import MagicBento from './MagicBento';
import TextType from './TextType';

export default function Explore({ setCurrentPage }) {
  return (
    <main className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <TextType
            text={["ABOUT US"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            className="text-lg text-gray-700 font-bold"
          />
        </div>

        <div className="mt-6">
          <MagicBento 
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="132, 0, 255"
          />
        </div>
      </div>
    </main>
  );
}
