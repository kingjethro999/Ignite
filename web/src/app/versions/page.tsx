'use client'

import { motion } from 'framer-motion'
import { 
  Package, 
  CheckCircle, 
  Star, 
  Download, 
  GitBranch, 
  Calendar,
  ArrowRight,
  Terminal,
  Zap,
  AlertCircle,
  Code,
  Rocket,
  Shield
} from 'lucide-react'
import Link from 'next/link'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'

export default function VersionsPage() {
  return (
    <div className="min-h-screen bg-ignite-charcoal">
      <NavBar />
      
      <main className="pt-28 pb-20">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 mb-20">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">Version History</span>
                <br />
                <span className="text-ignite-offwhite">Track Every Update</span>
              </h1>
              <p className="text-xl md:text-2xl text-ignite-offwhite/80 mb-8 max-w-3xl mx-auto">
                Follow the evolution of Ignite with detailed changelogs, migration guides, 
                and upcoming features in our development roadmap.
              </p>
              
              {/* Current Version Badge */}
              <div className="inline-flex items-center gap-4 bg-gradient-to-r from-ignite-orange/10 to-ignite-yellow/10 border border-ignite-orange/20 rounded-xl p-6 mb-8">
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 text-ignite-orange" />
                  <span className="text-2xl font-bold text-ignite-offwhite">Current: v1.2.0</span>
                </div>
                <div className="h-6 w-px bg-ignite-darkred/20"></div>
                <div className="text-ignite-offwhite/60">
                  <span className="font-mono">npm install -g the-ignite</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Version Timeline */}
        <section className="px-4 sm:px-6 lg:px-8 mb-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                Release Timeline
              </h2>
              <p className="text-lg text-ignite-offwhite/80">
                Major releases and feature additions
              </p>
            </motion.div>

            <div className="space-y-8">
              {versions.map((version, index) => (
                <motion.div
                  key={version.version}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Timeline line */}
                  {index < versions.length - 1 && (
                    <div className="absolute left-6 top-16 w-0.5 h-16 bg-gradient-to-b from-ignite-orange to-ignite-yellow"></div>
                  )}
                  
                  <div className="flex items-start gap-6">
                    {/* Version icon */}
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-ignite-orange to-ignite-yellow rounded-full flex items-center justify-center">
                      <version.icon className="w-6 h-6 text-white" />
                    </div>
                    
                    {/* Version details */}
                    <div className="flex-1 bg-ignite-charcoal/50 border border-ignite-darkred/20 rounded-xl p-6 hover:border-ignite-orange/40 transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <h3 className="text-2xl font-bold text-ignite-offwhite">{version.version}</h3>
                          {version.isLatest && (
                            <span className="bg-gradient-to-r from-ignite-orange to-ignite-yellow text-white px-3 py-1 rounded-full text-sm font-semibold">
                              Latest
                            </span>
                          )}
                          {version.isLTS && (
                            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                              LTS
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-ignite-offwhite/60">
                          <Calendar className="w-4 h-4" />
                          <span>{version.date}</span>
                        </div>
                      </div>
                      
                      <p className="text-ignite-offwhite/80 mb-4">{version.description}</p>
                      
                      {/* Features */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {version.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                            <span className="text-ignite-offwhite/70 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Breaking changes */}
                      {version.breaking && version.breaking.length > 0 && (
                        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4 mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertCircle className="w-4 h-4 text-red-400" />
                            <span className="text-red-400 font-semibold">Breaking Changes</span>
                          </div>
                          <ul className="space-y-1">
                            {version.breaking.map((change, i) => (
                              <li key={i} className="text-red-300 text-sm">• {change}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Migration guide */}
                      {version.migration && (
                        <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <GitBranch className="w-4 h-4 text-blue-400" />
                            <span className="text-blue-400 font-semibold">Migration Guide</span>
                          </div>
                          <p className="text-blue-300 text-sm">{version.migration}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="px-4 sm:px-6 lg:px-8 mb-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                Feature Evolution
              </h2>
              <p className="text-lg text-ignite-offwhite/80">
                Track how features have evolved across versions
              </p>
            </motion.div>

            <div className="bg-ignite-charcoal/50 border border-ignite-darkred/20 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-ignite-charcoal/80 border-b border-ignite-darkred/20">
                      <th className="text-left p-4 text-ignite-offwhite font-semibold">Feature</th>
                      <th className="text-center p-4 text-ignite-offwhite font-semibold">v1.0.0</th>
                      <th className="text-center p-4 text-ignite-offwhite font-semibold">v1.1.0</th>
                      <th className="text-center p-4 text-ignite-offwhite font-semibold">v1.2.0</th>
                    </tr>
                  </thead>
                  <tbody>
                    {featureComparison.map((row, index) => (
                      <tr key={row.feature} className={`border-b border-ignite-darkred/10 ${index % 2 === 0 ? 'bg-ignite-charcoal/20' : ''}`}>
                        <td className="p-4 text-ignite-offwhite font-medium">{row.feature}</td>
                        <td className="p-4 text-center">{getFeatureStatus(row.v1_0_0)}</td>
                        <td className="p-4 text-center">{getFeatureStatus(row.v1_1_0)}</td>
                        <td className="p-4 text-center">{getFeatureStatus(row.v1_2_0)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="px-4 sm:px-6 lg:px-8 mb-20 bg-gradient-to-r from-ignite-orange/5 to-ignite-yellow/5 py-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                Roadmap
              </h2>
              <p className="text-lg text-ignite-offwhite/80">
                What's coming next in Ignite development
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roadmapItems.map((item, index) => (
                <motion.div
                  key={item.version}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-ignite-charcoal/50 border border-ignite-darkred/20 rounded-xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-ignite-orange to-ignite-yellow rounded-lg flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-ignite-offwhite">{item.version}</h3>
                      <span className="text-sm text-ignite-offwhite/60">{item.timeline}</span>
                    </div>
                  </div>
                  <p className="text-ignite-offwhite/70 mb-4">{item.description}</p>
                  <ul className="space-y-2">
                    {item.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-ignite-offwhite/60">
                        <ArrowRight className="w-3 h-3 text-ignite-orange mt-1 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-ignite-orange/10 to-ignite-yellow/10 rounded-2xl p-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-ignite-offwhite/80 mb-8">
                Install the latest version and start building amazing mobile apps
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="bg-ignite-charcoal/50 border border-ignite-darkred/20 rounded-lg p-4 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-ignite-orange" />
                  <code className="text-ignite-orange font-mono">npm install -g the-ignite</code>
                </div>
                <Link href="/docs">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-ignite-orange to-ignite-yellow text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2 hover:shadow-lg transition-all duration-300"
                  >
                    <Code className="w-5 h-5" />
                    View Documentation
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function getFeatureStatus(status: string) {
  if (status === 'full') {
    return <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
  } else if (status === 'partial') {
    return <AlertCircle className="w-5 h-5 text-yellow-400 mx-auto" />
  } else {
    return <span className="text-ignite-offwhite/40 mx-auto">—</span>
  }
}

const versions = [
  {
    version: 'v1.2.0',
    date: 'January 15, 2025',
    isLatest: true,
    isLTS: false,
    icon: Star,
    description: 'Major update with enhanced TypeScript support, improved error handling, and advanced navigation features.',
    features: [
      'Advanced TypeScript code generation',
      'Comprehensive error handling and validation',
      'Enhanced navigation with parameter passing',
      'Improved CLI with better debugging',
      'Hot reloading performance optimizations',
      'Extended package compatibility',
      'Better asset management system',
      'Advanced state type inference'
    ],
    breaking: [
      'Screen declaration syntax updated (old syntax still supported)',
      'Import system requires explicit package declarations'
    ],
    migration: 'Update screen declarations to new syntax. Run `ignite migrate` for automatic conversion.'
  },
  {
    version: 'v1.1.0',
    date: 'December 8, 2024',
    isLatest: false,
    isLTS: true,
    icon: Shield,
    description: 'Stability release with improved compilation pipeline and expanded component support.',
    features: [
      'Flexible import system (default, named, namespace)',
      'Support for any React Native/Expo component',
      'Async and regular function declarations',
      'Advanced JSX expression support',
      'Enhanced file watching and compilation',
      'Improved project scaffolding',
      'Better error messages and debugging'
    ],
    breaking: [],
    migration: null
  },
  {
    version: 'v1.0.0',
    date: 'November 20, 2024',
    isLatest: false,
    isLTS: false,
    icon: Rocket,
    description: 'First stable release with core .ignite DSL, automatic state management, and React Navigation integration.',
    features: [
      'Declarative .ignite file syntax',
      'Automatic state management with type inference',
      'Built-in React Navigation setup',
      'Tab and stack navigation support',
      'StyleSheet integration',
      'Basic CLI commands (create, dev, build)',
      'Expo project scaffolding',
      'Hot reloading development server'
    ],
    breaking: [],
    migration: null
  }
]

const featureComparison = [
  { feature: 'Basic Components', v1_0_0: 'partial', v1_1_0: 'full', v1_2_0: 'full' },
  { feature: 'State Management', v1_0_0: 'partial', v1_1_0: 'full', v1_2_0: 'full' },
  { feature: 'Navigation System', v1_0_0: 'partial', v1_1_0: 'full', v1_2_0: 'full' },
  { feature: 'Import System', v1_0_0: 'none', v1_1_0: 'full', v1_2_0: 'full' },
  { feature: 'Function Support', v1_0_0: 'none', v1_1_0: 'full', v1_2_0: 'full' },
  { feature: 'TypeScript Support', v1_0_0: 'partial', v1_1_0: 'partial', v1_2_0: 'full' },
  { feature: 'Error Handling', v1_0_0: 'partial', v1_1_0: 'partial', v1_2_0: 'full' },
  { feature: 'Package Integration', v1_0_0: 'none', v1_1_0: 'full', v1_2_0: 'full' },
  { feature: 'Hot Reloading', v1_0_0: 'partial', v1_1_0: 'full', v1_2_0: 'full' },
  { feature: 'Asset Management', v1_0_0: 'partial', v1_1_0: 'partial', v1_2_0: 'full' }
]

const roadmapItems = [
  {
    version: 'v1.3.0',
    timeline: 'Q2 2025',
    icon: Code,
    description: 'Developer experience improvements and testing framework integration.',
    features: [
      'Built-in testing framework',
      'Component library generator',
      'Advanced debugging tools',
      'Performance optimization tools',
      'VSCode extension',
      'Storybook integration'
    ]
  },
  {
    version: 'v1.4.0',
    timeline: 'Q3 2025',
    icon: Zap,
    description: 'Advanced features and enterprise capabilities.',
    features: [
      'Theme system with dark/light mode',
      'Advanced animation support',
      'State persistence',
      'Offline-first capabilities',
      'Enterprise security features',
      'Advanced caching system'
    ]
  },
  {
    version: 'v2.0.0',
    timeline: 'Q4 2025',
    icon: Rocket,
    description: 'Next generation with Web3 integration and advanced platform support.',
    features: [
      'Web3 and blockchain integration',
      'Desktop app support (Electron)',
      'Advanced AI/ML integration',
      'Multi-platform deployment',
      'Enterprise dashboard',
      'Advanced analytics'
    ]
  }
] 