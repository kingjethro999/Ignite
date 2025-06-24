'use client'

import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { Package, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const versions = [
  {
    version: 'v0.2.0',
    date: '2025-06-24',
    Icon: CheckCircle,
  },
  {
    version: 'v0.1.0',
    date: '2025-06-15',
    Icon: Package,
  },
];

const featureRows = [
  { feature: 'Basic Components', v1: '✅ View, Text, Button, Input', v2: '✅ All v0.1.0 + Pressable, Modal, SafeAreaView' },
  { feature: 'State Management', v1: '✅ Basic state binding', v2: '✅ Advanced state types (string, number, boolean, object, array)' },
  { feature: 'Navigation', v1: '✅ Basic tab/stack navigation', v2: '✅ Enhanced navigation with custom options' },
  { feature: 'Styling', v1: '✅ StyleSheet integration', v2: '✅ Advanced style expressions and references' },
  { feature: 'Import System', v1: '❌ Hardcoded imports only', v2: '✅ Flexible imports (default, named, namespace)' },
  { feature: 'Custom Components', v1: '❌ Limited to predefined components', v2: '✅ Any component or npm package' },
  { feature: 'Function Support', v1: '❌ No custom functions', v2: '✅ Async and regular functions' },
  { feature: 'Package Support', v1: '❌ React Native only', v2: '✅ Any npm package (Firebase, Expo, etc.)' },
  { feature: 'Expression Support', v1: '❌ Limited expressions', v2: '✅ Full JSX expression support' },
  { feature: 'Type Safety', v1: '❌ Basic type inference', v2: '✅ Advanced type inference and validation' },
  { feature: 'Error Handling', v1: '❌ Basic error messages', v2: '✅ Comprehensive error handling' },
  { feature: 'Documentation', v1: '❌ Basic README', v2: '✅ Complete documentation with examples' },
];

export default function VersionsPage() {
  return (
    <div className="min-h-screen bg-ignite-charcoal">
      <NavBar />
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-10 text-center gradient-text">Versions</h1>
          <div className="space-y-10 mb-12">
            {versions.map((v) => (
              <motion.div
                key={v.version}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-ignite-charcoal/50 border border-ignite-darkred/20 rounded-xl p-8"
              >
                <div className="flex items-center mb-4">
                  <v.Icon className="w-7 h-7 text-ignite-orange mr-3" />
                  <span className="text-2xl font-bold text-ignite-offwhite mr-4">{v.version}</span>
                  <span className="text-ignite-offwhite/60">{v.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <h2 className="text-3xl font-bold mb-6 gradient-text text-center">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-ignite-darkred/20 rounded-lg text-ignite-offwhite/90">
              <thead>
                <tr className="bg-ignite-charcoal/80">
                  <th className="p-3 border-b border-ignite-darkred/20 text-left">Feature</th>
                  <th className="p-3 border-b border-ignite-darkred/20 text-left">v0.1.0</th>
                  <th className="p-3 border-b border-ignite-darkred/20 text-left">v0.2.0</th>
                </tr>
              </thead>
              <tbody>
                {featureRows.map(row => (
                  <tr key={row.feature} className="border-b border-ignite-darkred/10">
                    <td className="p-3 font-semibold">{row.feature}</td>
                    <td className="p-3">{row.v1}</td>
                    <td className="p-3">{row.v2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 