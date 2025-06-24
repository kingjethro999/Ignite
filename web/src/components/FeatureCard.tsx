'use client';
import { motion } from 'framer-motion';

export default function FeatureCard({ title, description, Icon }: { title: string; description: string; Icon: any }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: '0 4px 24px #f2511a33' }}
      className="bg-ignite-charcoal/50 border border-ignite-darkred/20 rounded-xl p-6 hover:border-ignite-orange/40 transition-all duration-300 group cursor-pointer"
    >
      <div className="w-12 h-12 bg-gradient-to-r from-ignite-orange to-ignite-yellow rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-ignite-offwhite group-hover:text-ignite-orange transition-colors">
        {title}
      </h3>
      <p className="text-ignite-offwhite/70 mb-2">
        {description}
      </p>
    </motion.div>
  );
} 