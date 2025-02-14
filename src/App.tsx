import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { HeartIcon, SparklesIcon } from "@heroicons/react/24/solid";

const LoveLetter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [memories] = useState([
    "The first time we met, I immediately fell in love with you ❤️",
    "When you came to visit me in Sweden, my heart overflowed with joy ✈️",
    "Our adorable pictures together during your time here 🌅",
    "All the funny moments we've shared together 😂"
  ]);
  const [currentMemory, setCurrentMemory] = useState(0);

  const loveMessages = [
    "You are my special one and my everything 🌟",
    "Every day with you is a gift 🎁",
    "Your smile makes the world brighter ☀️",
    "I fall for you more every day 🍂",
  ];

  const pictures = [
    "/images/first.jpg",
    "/images/second_cute.jpg",
    "/images/3_cute.jpg",
    "/images/Funny.mp4", 
  ];

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      if (audioRef.current) {
        audioRef.current.currentTime = 25;
        audioRef.current.play();
      }} else {
        if (audioRef.current) {
          audioRef.current.pause();
        }
    }
  }, [isOpen]);

  const handleNextMemory = () => {
    setCurrentMemory((prev) => (prev + 1) % memories.length);
  };

  const isVideo = (path: string) => path.endsWith('.mp4');

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-red-100 flex flex-col items-center justify-center p-4">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-5xl font-bold text-rose-600 mb-8 text-center"
      >
        <SparklesIcon className="h-8 w-8 md:h-12 md:w-12 inline-block text-yellow-400 mr-2" />
        To My Lovely Partner
        <SparklesIcon className="h-8 w-8 md:h-12 md:w-12 inline-block text-yellow-400 ml-2" />
      </motion.h1>
      
      <div>
        <img src="/images/duck.gif" alt="Romantic animation" className="w-32 h-32 rounded-full" />
      </div>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="cursor-pointer relative flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <HeartIcon className={`h-32 w-32 ${isOpen ? 'text-red-500' : 'text-rose-300'} transition-all duration-300`} />
        {!isOpen && <span className="text-rose-500 font-semibold text-lg">Click me pls 💖</span>}
      </motion.div>
      
      {!isOpen && <p className="mt-2 text-sm text-rose-500">Turn on sound 🔊</p>}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-8 bg-white/90 backdrop-blur-lg rounded-xl p-6 shadow-xl max-w-md w-full"
          >
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-xl font-semibold text-rose-700 mb-4">
                  {loveMessages[Math.floor(Math.random() * loveMessages.length)]}
                </p>
              </div>

              <div className="border-t border-rose-100 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-rose-700">Our Memories:</h3>
                  <button 
                    onClick={handleNextMemory}
                    className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full hover:bg-rose-200 transition"
                  >
                    →
                  </button>
                </div>
                <p className="text-rose-600 italic mb-4">"{memories[currentMemory]}"</p>
                
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  {isVideo(pictures[currentMemory]) ? (
                    <video 
                      src={pictures[currentMemory]} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                      controls
                      className="w-full h-full object-cover"
                    ></video>
                  ) : (
                    <img 
                      src={pictures[currentMemory]} 
                      alt="Our memory" 
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <audio ref={audioRef} src="/music/Honeymoon.mp3" />
      <footer className="mt-8 text-rose-400 text-sm">
        Made with ❤️ by Gold Fish
      </footer>
    </div>
  );
};

export default LoveLetter;
