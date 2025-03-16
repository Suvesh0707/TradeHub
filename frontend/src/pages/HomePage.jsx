import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [text, setText] = useState('');
  const fullText = "Buy & Sell with Ease!";
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      if (!isDeleting && text.length < fullText.length) {
        setText(fullText.slice(0, text.length + 1));
      } else if (isDeleting && text.length > 0) {
        setText(fullText.slice(0, text.length - 1));
      } else {
        setIsDeleting(!isDeleting);
        setSpeed(isDeleting ? 100 : 110); 
      }
    };

    const timer = setTimeout(handleTyping, speed);

    return () => clearTimeout(timer);
  }, [text, isDeleting]);

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-black via-blue-950 to-black text-white">
        <main className="flex flex-col md:flex-row items-center justify-center flex-grow text-center md:text-left p-10">
          <div className="md:w-1/2 space-y-6">

            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-400">
              {text}
              <span className="inline-block w-1 h-8 bg-white ml-1 animate-blink"></span> 
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed">
              Empowering students to trade smarter — Buy and sell calculators, books, notes, and engineering essentials with ease.
            </p>

            <div className="flex gap-4 justify-center md:justify-start">
              <Link to="/productcard" className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition">
                Get Started
              </Link>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center"></div>
        </main>
      </div>
     
    </>
  );
}
