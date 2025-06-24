'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Zap, Code, Smartphone, Package, Rocket } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import NavBar from '../components/NavBar'

export default function Home() {
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
              <span className="text-ignite-offwhite">React Native DSL</span>
            </h1>
            <p className="text-xl md:text-2xl text-ignite-offwhite/80 mb-8 max-w-3xl mx-auto">
              Transform React Native development with declarative XML-like syntax. 
              Write less code, build faster, and focus on what matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/docs/getting-started">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-gradient-to-r from-ignite-orange to-ignite-yellow text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2 hover:shadow-lg transition-all duration-300 glow"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link href="/docs/examples">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto border-2 border-ignite-orange text-ignite-orange px-8 py-4 rounded-lg font-semibold text-lg hover:bg-ignite-orange hover:text-white transition-all duration-300"
                >
                  View Examples
                </motion.button>
              </Link>
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
              Experience the power of declarative syntax with the flexibility of React Native
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
              See how Ignite simplifies React Native development
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 gap-y-8 items-center w-full">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-ignite-offwhite">
                Declarative .ignite Syntax
              </h3>
              <pre className="bg-ignite-charcoal/50 border border-ignite-darkred/20 rounded-lg p-4 text-sm overflow-x-auto max-w-full">
                <code className="text-ignite-offwhite max-w-full">
{`import { LinearGradient } from 'expo-linear-gradient'
import firebase from 'firebase'

screen title="Home" isTabScreen="true"

state user=null
state loading=false

async handleLogin() {
  const result = await firebase.auth()
    .signInWithEmailAndPassword(email, password)
  setUser(result.user)
  go('/profile')
}

<View style="container">
  <LinearGradient colors={['#ff6b6b', '#4ecdc4']}>
    <Text style="title">Welcome to Ignite</Text>
    <Input bind="username" placeholder="Username" />
    <Button onPress="handleLogin()">Login</Button>
  </LinearGradient>
</View>`}
                </code>
              </pre>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-ignite-orange to-ignite-yellow p-1 rounded-lg">
                <div className="bg-ignite-charcoal rounded-lg p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-ignite-offwhite">
                    Generated React Native
                  </h3>
                  <div className="text-left">
                    <p className="text-ignite-offwhite/80 mb-4">
                      ✅ Automatic state management<br/>
                      ✅ Navigation setup<br/>
                      ✅ Import handling<br/>
                      ✅ TypeScript support<br/>
                      ✅ Hot reloading<br/>
                      ✅ Error handling
                    </p>
                    <div className="bg-ignite-charcoal/50 rounded-lg p-4">
                      <p className="text-ignite-orange font-mono text-sm">
                        npx ignite dev
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
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
              Join thousands of developers building faster with Ignite
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/docs/getting-started">
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
    title: 'Declarative Syntax',
    description: 'Write UI components using familiar XML-like tags, reducing boilerplate and improving readability.',
    icon: Code,
  },
  {
    title: 'Automatic State Management',
    description: 'Smart state inference and generation with proper TypeScript types and setter functions.',
    icon: Zap,
  },
  {
    title: 'Flexible Imports',
    description: 'Support for any npm package with default, named, and namespace imports.',
    icon: Package,
  },
  {
    title: 'Built-in Navigation',
    description: 'Simple navigation declarations that generate proper React Navigation code automatically.',
    icon: Smartphone,
  },
  {
    title: 'Hot Reloading',
    description: 'Real-time compilation during development with instant feedback and error handling.',
    icon: Rocket,
  },
  {
    title: 'Type Safety',
    description: 'Generated code with proper TypeScript support and comprehensive error handling.',
    icon: Code,
  },
]
