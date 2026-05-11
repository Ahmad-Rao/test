import { TubesBackground } from "./components/magicui/tubes-background";
import { ShoppingBag, ChevronRight } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <TubesBackground className="fixed inset-0 pointer-events-none" />
      
      <header className="relative z-20 flex justify-between items-center px-8 py-6">
        <div className="text-2xl font-black tracking-tighter flex items-center gap-2">
          <span className="text-white">PSYCH</span>
          <span className="w-1 h-6 bg-white/20 rotate-12"></span>
          <span className="text-psych-purple">KICKS</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium tracking-widest uppercase opacity-60">
          <a href="#" className="hover:text-psych-purple transition-colors">Shop</a>
          <a href="#" className="hover:text-psych-purple transition-colors">Collections</a>
          <a href="#" className="hover:text-psych-purple transition-colors">About</a>
        </nav>
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <ShoppingBag size={24} />
        </button>
      </header>

      <main className="relative z-20 container mx-auto px-8 pt-20 pb-40 flex flex-col items-center text-center">
        <div className="space-y-8 max-w-4xl">
          <div className="space-y-2">
            <h2 className="text-psych-purple text-sm font-bold tracking-[0.3em] uppercase animate-in fade-in slide-in-from-top duration-1000">
              Psych Vibe | Driven Kicks
            </h2>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none animate-in fade-in slide-in-from-bottom duration-1000">
              ELEVATED<br />
              <span className="text-psych-purple italic">VISION.</span>
            </h1>
          </div>
          
          <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            Experience the fusion of high-performance design and psych-aesthetic. 
            Limited edition drops crafted for those who see the game differently.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-4">
            <button className="bg-psych-purple hover:bg-psych-purple/80 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all group active:scale-95">
              SHOP NOW
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="text-white/40 hover:text-white font-bold tracking-widest text-sm transition-colors border-b border-transparent hover:border-white">
              VIEW LOOKBOOK
            </button>
          </div>
        </div>
      </main>

      <footer className="relative z-20 px-8 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-white/30 text-xs tracking-widest">
        <div>© 2026 PSYCH KICKS. ALL RIGHTS RESERVED.</div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">INSTAGRAM</a>
          <a href="#" className="hover:text-white transition-colors">TWITTER</a>
          <a href="#" className="hover:text-white transition-colors">DISCORD</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
