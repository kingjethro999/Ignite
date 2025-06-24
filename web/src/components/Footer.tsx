'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-ignite-darkred/20 mt-20">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
            <Image src="/icon.png" alt="Ignite Logo" width={24} height={24} className="rounded" />
          </motion.div>
          <span className="text-xl font-bold gradient-text">Ignite</span>
        </div>
        <p className="text-ignite-offwhite/60">
          © 2024 Ignite Framework. Built with ❤️ for the React Native community.
        </p>
      </div>
    </footer>
  );
} 