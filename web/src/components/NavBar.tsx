'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-ignite-charcoal/80 backdrop-blur-sm border-b border-ignite-darkred/20 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <div className="flex items-center space-x-2">
              <motion.div initial={{ rotate: -10 }} animate={{ rotate: 0 }} transition={{ duration: 0.5 }}>
                <Image src="/icon.png" alt="Ignite Logo" width={32} height={32} className="rounded-lg" />
              </motion.div>
              <span className="text-2xl font-bold gradient-text">Ignite</span>
            </div>
          </Link>
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/features" className="text-ignite-offwhite hover:text-ignite-orange transition-colors">Features</Link>
            <Link href="/docs" className="text-ignite-offwhite hover:text-ignite-orange transition-colors">Documentation</Link>
            <Link href="/examples" className="text-ignite-offwhite hover:text-ignite-orange transition-colors">Examples</Link>
            <Link href="/versions" className="text-ignite-offwhite hover:text-ignite-orange transition-colors">Versions</Link>
            <Link href="https://github.com/kingjethro999/ignite" className="text-ignite-offwhite hover:text-ignite-orange transition-colors">GitHub</Link>
          </div>
          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded focus:outline-none focus:ring-2 focus:ring-ignite-orange group"
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {/* Stylized Hamburger Icon */}
            <span className="block w-7 h-1 rounded-full bg-ignite-orange mb-1.5 transition-all duration-300 group-hover:bg-ignite-yellow" style={{ transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none' }} />
            <span className="block w-7 h-1 rounded-full bg-ignite-orange mb-1.5 transition-all duration-300 group-hover:bg-ignite-yellow" style={{ opacity: menuOpen ? 0 : 1 }} />
            <span className="block w-7 h-1 rounded-full bg-ignite-orange transition-all duration-300 group-hover:bg-ignite-yellow" style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none' }} />
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-ignite-charcoal/95 px-6 py-4 border-b border-ignite-darkred/20 shadow-lg"
          >
            <div className="flex flex-col space-y-4 text-lg">
              <Link href="/features" className="text-ignite-offwhite hover:text-ignite-orange transition-colors" onClick={() => setMenuOpen(false)}>Features</Link>
              <Link href="/docs" className="text-ignite-offwhite hover:text-ignite-orange transition-colors" onClick={() => setMenuOpen(false)}>Documentation</Link>
              <Link href="/examples" className="text-ignite-offwhite hover:text-ignite-orange transition-colors" onClick={() => setMenuOpen(false)}>Examples</Link>
              <Link href="/versions" className="text-ignite-offwhite hover:text-ignite-orange transition-colors" onClick={() => setMenuOpen(false)}>Versions</Link>
              <Link href="https://github.com/kingjethro999/ignite" className="text-ignite-offwhite hover:text-ignite-orange transition-colors" onClick={() => setMenuOpen(false)}>GitHub</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 