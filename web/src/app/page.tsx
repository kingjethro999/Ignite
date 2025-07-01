'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Code, Smartphone, Package, Rocket, Download, Terminal, FileText, Settings, Database, Navigation, Copy, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import NavBar from '../components/NavBar'

export default function Home() {
  const [copied, setCopied] = useState(false)

  return (
    <div className="min-h-screen bg-ignite-charcoal overflow-x-hidden">
      {/* Navigation */}
      <NavBar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Ignite</span>
              <br />
              <span className="text-ignite-offwhite">Simplified Cross-Platform Mobile Development</span>
            </h1>
            <p className="text-xl md:text-2xl text-ignite-offwhite/80 mb-8 max-w-4xl mx-auto">
              Transform React Native development with declarative .ignite syntax. 
              Write custom DSL files, get automatic compilation, navigation, and state management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link href="/docs">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-gradient-to-r from-ignite-orange to-ignite-yellow text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2 hover:shadow-lg transition-all duration-300 glow"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link href="/examples">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto border-2 border-ignite-orange text-ignite-orange px-8 py-4 rounded-lg font-semibold text-lg hover:bg-ignite-orange hover:text-white transition-all duration-300"
                >
                  View Examples
                </motion.button>
              </Link>
            </div>
            
            {/* Quick Install */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="bg-ignite-charcoal/50 border border-ignite-darkred/20 rounded-lg p-4 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-ignite-orange" />
                  <code className="text-ignite-orange font-mono">npm install -g the-ignite</code>
                </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      navigator.clipboard.writeText('npm install -g the-ignite')
                      setCopied(true)
                      setTimeout(() => setCopied(false), 2000)
                    }}
                    className="bg-gradient-to-r from-ignite-orange to-ignite-yellow text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2 hover:shadow-lg transition-all duration-300"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        Copy
                      </>
                    )}
                  </motion.button>
              </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Why Choose Ignite?
            </h2>
            <p className="text-xl text-ignite-offwhite/80 max-w-2xl mx-auto">
              Experience the power of declarative syntax with the flexibility of React Native and Expo
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-8 w-full">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-ignite-charcoal/50 border border-ignite-darkred/20 rounded-xl p-6 hover:border-ignite-orange/40 transition-all duration-300 mb-8 md:mb-0"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-ignite-orange to-ignite-yellow rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 text-ignite-offwhite">
                  {feature.title}
                </h3>
                <p className="text-ignite-offwhite/70 text-base sm:text-lg">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CLI Commands Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-ignite-orange/5 to-ignite-yellow/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Powerful CLI Commands
            </h2>
            <p className="text-xl text-ignite-offwhite/80 max-w-2xl mx-auto">
              Complete toolkit for creating, developing, and building your apps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cliCommands.map((command, index) => (
              <motion.div
                key={command.command}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-ignite-charcoal/50 border border-ignite-darkred/20 rounded-xl p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Terminal className="w-5 h-5 text-ignite-orange" />
                  <code className="text-ignite-orange font-mono text-sm">{command.command}</code>
                </div>
                <p className="text-ignite-offwhite/80 text-sm mb-2">{command.description}</p>
                <div className="text-ignite-offwhite/60 text-xs">
                  {command.options.map((option, i) => (
                    <span key={i} className="block">• {option}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Write Less, Build More
            </h2>
            <p className="text-xl text-ignite-offwhite/80 max-w-2xl mx-auto">
              See how Ignite simplifies React Native development with .ignite files
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 gap-y-8 items-start w-full">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-ignite-offwhite">
                .ignite File (app/Home/index.ignite)
              </h3>
              <pre className="bg-ignite-charcoal/50 border border-ignite-darkred/20 rounded-lg p-4 text-sm overflow-x-auto max-w-full">
                <code className="text-ignite-offwhite max-w-full">
{`import { LinearGradient } from 'expo-linear-gradient'
import firebase from 'firebase'

screen title="Home" isTabScreen="true" tabOrder="1" tabIcon="home"

state user=null
state loading=false
state email=""
state password=""

async handleLogin() {
  setLoading(true)
  try {
    const result = await firebase.auth()
      .signInWithEmailAndPassword(email, password)
    setUser(result.user)
    go('/profile')
  } catch (error) {
    console.log('Login failed:', error)
  }
  setLoading(false)
}

<View style="container">
  <LinearGradient colors={['#ff6b6b', '#4ecdc4']} style="gradient">
    <Text style="title">Welcome to Ignite</Text>
    <Input 
      bind="email" 
      placeholder="Email" 
      keyboardType="email-address"
    />
    <Input 
      bind="password" 
      placeholder="Password" 
      secureTextEntry={true}
    />
    <Button 
      onPress="handleLogin()" 
      disabled={loading}
    >
      {loading ? 'Logging in...' : 'Login'}
    </Button>
  </LinearGradient>
</View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  gradient: {
    flex: 1,
    borderRadius: 10,
    padding: 20,
  },
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
              <div className="bg-gradient-to-r from-ignite-orange to-ignite-yellow p-1 rounded-lg">
                <div className="bg-ignite-charcoal rounded-lg p-6">
                  <h3 className="text-2xl font-semibold mb-4 text-ignite-offwhite">
                    Auto-Generated Features
                  </h3>
                  <div className="space-y-3 text-ignite-offwhite/80">
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✅</span>
                      <span>React Native component with TypeScript</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✅</span>
                      <span>Automatic state management with useState</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✅</span>
                      <span>Navigation setup with React Navigation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✅</span>
                      <span>Tab bar configuration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✅</span>
                      <span>Import handling and optimization</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✅</span>
                      <span>Function generation and binding</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✅</span>
                      <span>Hot reloading support</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-ignite-charcoal/50 border border-ignite-darkred/20 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-3 text-ignite-offwhite">
                  Development Commands
                </h4>
                <div className="space-y-2 font-mono text-sm">
                  <div className="text-ignite-orange">$ ignite create my-app</div>
                  <div className="text-ignite-orange">$ cd my-app</div>
                  <div className="text-ignite-orange">$ ignite dev</div>
                  <div className="text-ignite-offwhite/60 text-xs mt-2">
                    Automatic compilation, file watching, and Expo dev server
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-ignite-orange/5 to-ignite-yellow/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              How It Works
            </h2>
            <p className="text-xl text-ignite-offwhite/80 max-w-2xl mx-auto">
              Understanding the Ignite compilation and development process
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-ignite-orange to-ignite-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-ignite-offwhite">{step.title}</h3>
                <p className="text-ignite-offwhite/70">{step.description}</p>
                {index < workflowSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-8 h-0.5 bg-gradient-to-r from-ignite-orange to-ignite-yellow transform -translate-x-4"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-ignite-orange/10 to-ignite-yellow/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Ready to Ignite Your Development?
            </h2>
            <p className="text-xl text-ignite-offwhite/80 mb-8">
              Join developers building faster with declarative mobile development
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/docs">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-gradient-to-r from-ignite-orange to-ignite-yellow text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2 hover:shadow-lg transition-all duration-300"
                >
                  <Rocket className="w-5 h-5" />
                  Start Building
                </motion.button>
              </Link>
              <Link href="https://github.com/kingjethro999/ignite">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto border-2 border-ignite-orange text-ignite-orange px-8 py-4 rounded-lg font-semibold text-lg hover:bg-ignite-orange hover:text-white transition-all duration-300"
                >
                  View on GitHub
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-ignite-darkred/20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-r from-ignite-orange to-ignite-yellow rounded flex items-center justify-center">
              <Image src="/icon.png" alt="Ignite Logo" width={16} height={16} />
            </div>
            <span className="text-xl font-bold gradient-text">Ignite</span>
          </div>
          <p className="text-ignite-offwhite/60">
            © 2024 Ignite Framework. Built with ❤️ for the React Native community.
          </p>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: 'Declarative .ignite Syntax',
    description: 'Write UI components using familiar XML-like tags in custom .ignite files with automatic compilation to React Native.',
    icon: FileText,
  },
  {
    title: 'Automatic State Management',
    description: 'Smart state inference and generation with proper TypeScript types, useState hooks, and setter functions.',
    icon: Database,
  },
  {
    title: 'Built-in Navigation',
    description: 'Automatic React Navigation setup with tab bars, stack navigation, and route generation from file structure.',
    icon: Navigation,
  },
  {
    title: 'CLI Development Tools',
    description: 'Powerful command-line interface for creating, developing, and building apps with platform-specific options.',
    icon: Terminal,
  },
  {
    title: 'Hot Reloading & Watching',
    description: 'Real-time compilation during development with file watching, instant feedback, and comprehensive error handling.',
    icon: Zap,
  },
  {
    title: 'Package Integration',
    description: 'Seamless integration with any npm package including Firebase, Expo, and third-party libraries.',
    icon: Package,
  },
]

const cliCommands = [
  {
    command: 'ignite create <name>',
    description: 'Create a new Ignite app with Expo setup',
    options: ['Downloads starter .ignite files', 'Sets up assets and dependencies', 'Configures React Navigation']
  },
  {
    command: 'ignite dev',
    description: 'Start development server with compilation',
    options: ['Compiles .ignite files', 'Starts file watcher', 'Launches Expo dev server']
  },
  {
    command: 'ignite dev --android',
    description: 'Start development server for Android',
    options: ['Includes Android-specific setup', 'Runs on Android emulator/device']
  },
  {
    command: 'ignite dev --ios',
    description: 'Start development server for iOS',
    options: ['Includes iOS-specific setup', 'Runs on iOS simulator/device']
  },
  {
    command: 'ignite build',
    description: 'Build app for production',
    options: ['Compiles .ignite files', 'Prepares for distribution']
  },
  {
    command: 'ignite -v',
    description: 'Check version information',
    options: ['Shows CLI version', 'Displays framework info']
  },
]

const workflowSteps = [
  {
    title: 'Write .ignite Files',
    description: 'Create declarative UI components with built-in state management and navigation in your app/ directory.',
    icon: Code,
  },
  {
    title: 'Automatic Compilation',
    description: 'Ignite parser processes your files and generates optimized React Native components with TypeScript support.',
    icon: Settings,
  },
  {
    title: 'Live Development',
    description: 'File watcher detects changes, recompiles automatically, and hot reloads in Expo for instant feedback.',
    icon: Smartphone,
  },
]
