'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface SectionCardProps {
  title: string;
  description: string;
  href: string;
  Icon: LucideIcon;
}

export default function SectionCard({ title, description, href, Icon }: SectionCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: '0 4px 24px #f2511a33' }}
      className="bg-ignite-charcoal/50 border border-ignite-darkred/20 rounded-xl p-6 hover:border-ignite-orange/40 transition-all duration-300 group cursor-pointer"
    >
      <Link href={href} className="block h-full">
        <div className="w-12 h-12 bg-gradient-to-r from-ignite-orange to-ignite-yellow rounded-lg flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold mb-3 text-ignite-offwhite group-hover:text-ignite-orange transition-colors">
          {title}
        </h3>
        <p className="text-ignite-offwhite/70 mb-2">
          {description}
        </p>
        <span className="text-sm text-ignite-orange group-hover:text-ignite-yellow font-medium transition-colors">Learn more →</span>
      </Link>
    </motion.div>
  );
} 