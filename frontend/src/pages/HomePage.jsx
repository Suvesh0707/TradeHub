import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#060606] text-white">
      <main className="flex flex-col md:flex-row items-center justify-center flex-grow text-center md:text-left p-10">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-400">
            Buy & Sell with Ease!
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

        <div className="md:w-1/2 flex justify-center">
        </div>
      </main>
    </div>
  );
}
