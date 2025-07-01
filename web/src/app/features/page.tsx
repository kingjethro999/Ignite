'use client'

import { motion } from 'framer-motion'
import { 
  Code, 
  Database, 
  Navigation, 
  Terminal, 
  Zap, 
  Package, 
  Smartphone, 
  FileText, 
  Settings, 
  Download,
  CheckCircle,
  ArrowRight,
  Layers,
  Palette,
  Globe,
  Shield
} from 'lucide-react'
import Link from 'next/link'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'

export default function FeaturesPage() {
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
                <span className="gradient-text">Powerful Features</span>
                <br />
                <span className="text-ignite-offwhite">Built for Modern Development</span>
              </h1>
              <p className="text-xl md:text-2xl text-ignite-offwhite/80 mb-8 max-w-3xl mx-auto">
                Ignite provides a comprehensive toolkit for simplified cross-platform mobile development 
                with declarative syntax, automatic compilation, and seamless integration.
              </p>
              <Link href="/docs">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-ignite-orange to-ignite-yellow text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2 hover:shadow-lg transition-all duration-300 mx-auto"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Core Features Grid */}
        <section className="px-4 sm:px-6 lg:px-8 mb-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                Core Features
              </h2>
              <p className="text-xl text-ignite-offwhite/80 max-w-2xl mx-auto">
                Everything you need to build modern cross-platform mobile applications
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-ignite-charcoal/50 border border-ignite-darkred/20 rounded-xl p-6 hover:border-ignite-orange/40 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-ignite-orange to-ignite-yellow rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-ignite-offwhite">
                    {feature.title}
                  </h3>
                  <p className="text-ignite-offwhite/70 mb-4">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-ignite-offwhite/60">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Development Experience Section */}
        <section className="px-4 sm:px-6 lg:px-8 mb-20 bg-gradient-to-r from-ignite-orange/5 to-ignite-yellow/5 py-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                Developer Experience
              </h2>
              <p className="text-xl text-ignite-offwhite/80 max-w-2xl mx-auto">
                Built with developer productivity and happiness in mind
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold mb-6 text-ignite-offwhite">
                  Streamlined Development Workflow
                </h3>
                {developmentFeatures.map((feature, index) => (
                  <div key={feature.title} className="flex items-start gap-4 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-ignite-orange to-ignite-yellow rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-ignite-offwhite mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-ignite-offwhite/70">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-ignite-charcoal/50 border border-ignite-darkred/20 rounded-xl p-6"
              >
                <h3 className="text-xl font-semibold mb-4 text-ignite-offwhite">
                  Development Commands
                </h3>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-ignite-orange" />
                    <span className="text-ignite-orange">npm install -g the-ignite</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-ignite-orange" />
                    <span className="text-ignite-orange">ignite create my-app</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-ignite-orange" />
                    <span className="text-ignite-orange">cd my-app</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-ignite-orange" />
                    <span className="text-ignite-orange">ignite dev</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-ignite-charcoal/30 rounded-lg">
                  <p className="text-ignite-offwhite/60 text-sm">
                    🚀 Your app is now running with hot reloading, automatic compilation, 
                    and file watching enabled!
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Architecture Section */}
        <section className="px-4 sm:px-6 lg:px-8 mb-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                Architecture & Integration
              </h2>
              <p className="text-xl text-ignite-offwhite/80 max-w-2xl mx-auto">
                Built on proven technologies with seamless integrations
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {architectureFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-ignite-orange to-ignite-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-ignite-offwhite">
                    {feature.title}
                  </h3>
                  <p className="text-ignite-offwhite/70 text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Code Example Section */}
        <section className="px-4 sm:px-6 lg:px-8 mb-20 bg-gradient-to-r from-ignite-orange/5 to-ignite-yellow/5 py-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                See It In Action
              </h2>
              <p className="text-xl text-ignite-offwhite/80 max-w-2xl mx-auto">
                Simple .ignite syntax that compiles to powerful React Native apps
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold mb-4 text-ignite-offwhite">
                  .ignite File
                </h3>
                <pre className="bg-ignite-charcoal/50 border border-ignite-darkred/20 rounded-lg p-4 text-sm overflow-x-auto">
                  <code className="text-ignite-offwhite">
{`import { LinearGradient } from 'expo-linear-gradient'
import firebase from 'firebase'

screen title="Profile" isTabScreen="true" tabIcon="user"

state user=null
state loading=false
state followers=[]

async fetchUserData() {
  setLoading(true)
  try {
    const userData = await firebase.auth().currentUser
    setUser(userData)
    const followersData = await getFollowers(userData.uid)
    setFollowers(followersData)
  } catch (error) {
    console.log('Error:', error)
  }
  setLoading(false)
}

<View style="container">
  <LinearGradient colors={['#667eea', '#764ba2']} style="gradient">
    <Text style="title">Welcome {user?.displayName}</Text>
    <Text style="followers">{followers.length} Followers</Text>
    <Button onPress="fetchUserData()" disabled={loading}>
      {loading ? 'Loading...' : 'Refresh'}
    </Button>
  </LinearGradient>
</View>

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  gradient: { flex: 1, borderRadius: 15, padding: 20 },
  title: { fontSize: 24, color: 'white', fontWeight: 'bold' },
  followers: { fontSize: 16, color: 'white', opacity: 0.8 },
});`}
                  </code>
                </pre>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="bg-ignite-charcoal/50 border border-ignite-darkred/20 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4 text-ignite-offwhite">
                    What Gets Generated
                  </h3>
                  <div className="space-y-3">
                    {generatedFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-ignite-offwhite/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-ignite-charcoal/50 border border-ignite-darkred/20 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4 text-ignite-offwhite">
                    Automatic Features
                  </h3>
                  <div className="space-y-2">
                    {automaticFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Zap className="w-4 h-4 text-ignite-orange mt-1" />
                        <span className="text-ignite-offwhite/70 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
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
                Ready to Experience These Features?
              </h2>
              <p className="text-lg text-ignite-offwhite/80 mb-8">
                Start building your next mobile app with Ignite's powerful features
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/docs">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-ignite-orange to-ignite-yellow text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2 hover:shadow-lg transition-all duration-300"
                  >
                    <Code className="w-5 h-5" />
                    Get Started
                  </motion.button>
                </Link>
                <Link href="/examples">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-ignite-orange text-ignite-orange px-8 py-4 rounded-lg font-semibold text-lg hover:bg-ignite-orange hover:text-white transition-all duration-300"
                  >
                    View Examples
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

const coreFeatures = [
  {
    title: 'Declarative .ignite Syntax',
    description: 'Write UI components using familiar XML-like tags in custom .ignite files.',
    icon: FileText,
    details: [
      'XML-like component definitions',
      'Custom DSL compilation to React Native',
      'Complex JSX expressions support',
      'Automatic component mapping'
    ]
  },
  {
    title: 'Automatic State Management',
    description: 'Smart state inference and generation with proper TypeScript types.',
    icon: Database,
    details: [
      'Smart type inference from values',
      'Automatic useState generation',
      'Setter functions (setUser, setLoading)',
      'Support for all JS types'
    ]
  },
  {
    title: 'Built-in Navigation',
    description: 'Automatic React Navigation setup with tab bars and stack navigation.',
    icon: Navigation,
    details: [
      'React Navigation integration',
      'Tab navigation with ordering',
      'Stack navigation support',
      'Route generation from file structure'
    ]
  },
  {
    title: 'CLI Development Tools',
    description: 'Powerful command-line interface for creating, developing, and building apps.',
    icon: Terminal,
    details: [
      'Project scaffolding with Expo',
      'Hot reloading development server',
      'Platform-specific building',
      'Asset management'
    ]
  },
  {
    title: 'Package Integration',
    description: 'Seamless integration with Firebase, Expo, and third-party libraries.',
    icon: Package,
    details: [
      'Flexible import system',
      'Firebase integration',
      'Expo packages support',
      'Third-party library compatibility'
    ]
  },
  {
    title: 'Cross-Platform Support',
    description: 'iOS, Android, and Web support through Expo with consistent UI.',
    icon: Smartphone,
    details: [
      'iOS and Android native apps',
      'Web support with Expo Web',
      'Platform-specific optimizations',
      'Consistent UI across platforms'
    ]
  }
]

const developmentFeatures = [
  {
    title: 'Hot Reloading',
    description: 'Real-time compilation with file watching for instant feedback during development.',
    icon: Zap
  },
  {
    title: 'File Watching',
    description: 'Automatic detection of changes in .ignite files with immediate recompilation.',
    icon: FileText
  },
  {
    title: 'Error Handling',
    description: 'Comprehensive error messages and validation throughout the compilation process.',
    icon: Shield
  },
  {
    title: 'TypeScript Support',
    description: 'Generated code with proper TypeScript types and comprehensive type safety.',
    icon: Code
  }
]

const architectureFeatures = [
  {
    title: 'Expo Framework',
    description: 'Built on top of Expo for cross-platform development',
    icon: Layers
  },
  {
    title: 'React Navigation',
    description: 'Automatic setup of React Navigation for routing',
    icon: Navigation
  },
  {
    title: 'Asset Management',
    description: 'Cloudinary integration for asset delivery',
    icon: Download
  },
  {
    title: 'Styling System',
    description: 'StyleSheet.create integration with optimizations',
    icon: Palette
  }
]

const generatedFeatures = [
  'React Native component with TypeScript',
  'useState hooks with proper types',
  'Navigation configuration',
  'Tab bar setup with icons and ordering',
  'Import optimization and cleanup',
  'Function binding and event handlers',
  'StyleSheet integration',
  'Error boundaries and validation'
]

const automaticFeatures = [
  'State type inference from initial values',
  'Component name generation from file paths',
  'Route configuration from directory structure',
  'Import statement optimization',
  'File cleanup and organization',
  'Hot reloading configuration',
  'Platform-specific optimizations',
  'Asset path resolution'
] 