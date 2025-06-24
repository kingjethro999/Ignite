'use client';
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CodeBlock({ code, className = '' }: { code: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className={`relative group bg-ignite-charcoal rounded-lg p-4 text-sm overflow-x-auto mb-4 border border-ignite-darkred/20 ${className}`}>
      <pre className="whitespace-pre-wrap break-words text-ignite-offwhite font-mono">
        <code>{code}</code>
      </pre>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-ignite-charcoal/80 border border-ignite-orange text-ignite-orange rounded p-1.5 flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Copy code"
        title="Copy code"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </motion.button>
    </div>
  );
} 