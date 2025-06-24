import Link from 'next/link';
import { Rocket, Terminal, Folder, Book, Code, Zap, Smartphone, Package, List, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'getting-started', label: 'Getting Started', icon: Rocket },
  { id: 'cli', label: 'CLI & Commands', icon: Terminal },
  { id: 'project-structure', label: 'Project Structure', icon: Folder },
  { id: 'usage', label: 'Usage', icon: Book },
  { id: 'features', label: 'Features', icon: List },
  { id: 'components', label: 'Components', icon: Code },
  { id: 'state-management', label: 'State Management', icon: Zap },
  { id: 'navigation', label: 'Navigation', icon: Smartphone },
  { id: 'advanced', label: 'Advanced', icon: Package },
  { id: 'examples', label: 'App Examples', icon: Code },
  { id: 'troubleshooting', label: 'Troubleshooting', icon: HelpCircle },
];

export default function DocsSidebar({ currentSection }: { currentSection?: string }) {
  return (
    <aside className="hidden lg:block w-64 pr-6 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto">
      <nav className="space-y-2">
        {sections.map(({ id, label, icon: Icon }) => (
          <Link key={id} href={`#${id}`}>
            <motion.div
              whileHover={{ scale: 1.03, backgroundColor: '#23272e' }}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors cursor-pointer ${currentSection === id ? 'bg-ignite-orange/20 text-ignite-orange font-semibold' : 'text-ignite-offwhite/80 hover:text-ignite-orange'}`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </motion.div>
          </Link>
        ))}
      </nav>
    </aside>
  );
} 