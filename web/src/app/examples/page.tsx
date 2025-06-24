'use client'
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { Code, Smartphone, Rocket, Package, User, List } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const exampleSections = [
  {
    title: 'Authentication Screen',
    description: 'Login UI, state, and Firebase integration.',
    href: '/docs#examples',
    Icon: User,
  },
  {
    title: 'Chat Application',
    description: 'Real-time chat with Firestore and image picker.',
    href: '/docs#examples',
    Icon: Smartphone,
  },
  {
    title: 'Location-based Todo App',
    description: 'Tasks, location, and notifications.',
    href: '/docs#examples',
    Icon: List,
  },
  {
    title: 'Profile Settings',
    description: 'Profile, preferences, and storage.',
    href: '/docs#examples',
    Icon: Package,
  },
];

function ExampleCard({ title, description, href, Icon }: { title: string; description: string; href: string; Icon: any }) {
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
        <span className="text-sm text-ignite-orange group-hover:text-ignite-yellow font-medium transition-colors">View Example →</span>
      </Link>
    </motion.div>
  );
}

export default function ExamplesPage() {
  return (
    <div className="min-h-screen bg-ignite-charcoal">
      <NavBar />
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-10 text-center gradient-text">Examples</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {exampleSections.map((section) => (
              <ExampleCard key={section.title} {...section} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 