'use client'

import { motion } from 'framer-motion'
import { Code, Copy, CheckCircle, ArrowRight, Database, Navigation, Smartphone, Package, Zap, FileText } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'

export default function ExamplesPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

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
                <span className="gradient-text">Code Examples</span>
                <br />
                <span className="text-ignite-offwhite">Learn by Building</span>
              </h1>
              <p className="text-xl md:text-2xl text-ignite-offwhite/80 mb-8 max-w-3xl mx-auto">
                Explore comprehensive .ignite examples showcasing state management, navigation, 
                API integration, and more. Copy and paste to get started quickly.
              </p>
              <Link href="/docs">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-ignite-orange to-ignite-yellow text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2 hover:shadow-lg transition-all duration-300 mx-auto"
                >
                  Read Documentation
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Quick Start */}
        <section className="px-4 sm:px-6 lg:px-8 mb-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                Quick Start
              </h2>
              <p className="text-lg text-ignite-offwhite/80 max-w-2xl mx-auto">
                Get up and running with Ignite in minutes
              </p>
            </motion.div>

            <div className="bg-ignite-charcoal/50 border border-ignite-darkred/20 rounded-xl p-6 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-ignite-offwhite">Installation & Setup</h3>
                  <div className="space-y-3 font-mono text-sm">
                    <div className="flex items-center justify-between bg-ignite-charcoal/30 p-3 rounded">
                      <span className="text-ignite-orange">npm install -g the-ignite</span>
                      <button 
                        onClick={() => copyToClipboard('npm install -g the-ignite', 'install')}
                        className="text-ignite-offwhite/60 hover:text-ignite-orange"
                      >
                        {copiedCode === 'install' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <div className="flex items-center justify-between bg-ignite-charcoal/30 p-3 rounded">
                      <span className="text-ignite-orange">ignite create my-app</span>
                      <button 
                        onClick={() => copyToClipboard('ignite create my-app', 'create')}
                        className="text-ignite-offwhite/60 hover:text-ignite-orange"
                      >
                        {copiedCode === 'create' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <div className="flex items-center justify-between bg-ignite-charcoal/30 p-3 rounded">
                      <span className="text-ignite-orange">cd my-app && ignite dev</span>
                      <button 
                        onClick={() => copyToClipboard('cd my-app && ignite dev', 'dev')}
                        className="text-ignite-offwhite/60 hover:text-ignite-orange"
                      >
                        {copiedCode === 'dev' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-ignite-offwhite">What You Get</h3>
                  <div className="space-y-2">
                    {quickStartFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-ignite-offwhite/80 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Code Examples */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                Example .ignite Files
              </h2>
              <p className="text-lg text-ignite-offwhite/80 max-w-2xl mx-auto">
                Real-world examples showcasing different features and patterns
              </p>
            </motion.div>

            <div className="space-y-16">
              {examples.map((example, index) => (
                <motion.div
                  key={example.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                  {/* Description */}
                  <div className="lg:col-span-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-ignite-orange to-ignite-yellow rounded-lg flex items-center justify-center">
                        <example.icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-2xl font-semibold text-ignite-offwhite">{example.title}</h3>
                    </div>
                    <p className="text-ignite-offwhite/70 mb-6">{example.description}</p>
                    
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-ignite-offwhite">Features Demonstrated:</h4>
                      <ul className="space-y-2">
                        {example.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-ignite-offwhite/60">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Code */}
                  <div className="lg:col-span-2">
                    <div className="relative">
                      <div className="flex items-center justify-between bg-ignite-charcoal/30 px-4 py-2 rounded-t-lg border-b border-ignite-darkred/20">
                        <span className="text-ignite-offwhite/80 text-sm font-mono">{example.filename}</span>
                        <button
                          onClick={() => copyToClipboard(example.code, example.id)}
                          className="flex items-center gap-2 text-ignite-offwhite/60 hover:text-ignite-orange transition-colors"
                        >
                          {copiedCode === example.id ? (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              <span className="text-sm">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <span className="text-sm">Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="bg-ignite-charcoal/50 border border-ignite-darkred/20 rounded-b-lg p-4 text-sm overflow-x-auto">
                        <code className="text-ignite-offwhite whitespace-pre">
                          {example.code}
                        </code>
                      </pre>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 lg:px-8 mt-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-ignite-orange/10 to-ignite-yellow/10 rounded-2xl p-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
                Ready to Build Your App?
              </h2>
              <p className="text-lg text-ignite-offwhite/80 mb-8">
                Start with these examples and create your own amazing mobile applications
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
                <Link href="/features">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-ignite-orange text-ignite-orange px-8 py-4 rounded-lg font-semibold text-lg hover:bg-ignite-orange hover:text-white transition-all duration-300"
                  >
                    View Features
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

const quickStartFeatures = [
  'Complete Expo project setup',
  'React Navigation with bottom tabs',
  'Sample .ignite files with examples',
  'Assets (icons, splash screens)',
  'Hot reloading development server',
  'TypeScript support',
  'Platform-specific optimizations'
]

const examples = [
  {
    id: 'basic-screen',
    title: 'Basic Screen with State',
    filename: 'app/(tabs)/Home/index.ignite',
    description: 'Simple screen demonstrating state management, functions, and basic UI components.',
    icon: FileText,
    features: [
      'State management with type inference',
      'Function declarations',
      'Component usage with styling',
      'Tab navigation setup'
    ],
    code: `import { LinearGradient } from 'expo-linear-gradient'

screen title="Home" isTabScreen="true" tabOrder="1" tabIcon="home"

state count=0
state message="Welcome to Ignite!"
state isVisible=true

handleIncrement() {
  setCount(count + 1)
  setMessage(\`Count is now \${count + 1}\`)
}

handleToggle() {
  setIsVisible(!isVisible)
}

<View style="container">
  <LinearGradient colors={['#667eea', '#764ba2']} style="gradient">
    <Text style="title">{message}</Text>
    {isVisible && (
      <Text style="counter">Current count: {count}</Text>
    )}
    <Button onPress="handleIncrement()" style="button">
      Increment Count
    </Button>
    <Button onPress="handleToggle()" style="toggleButton">
      {isVisible ? 'Hide Counter' : 'Show Counter'}
    </Button>
  </LinearGradient>
</View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  gradient: {
    flex: 1,
    borderRadius: 15,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  counter: {
    fontSize: 18,
    color: 'white',
    opacity: 0.9,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  toggleButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 15,
    borderRadius: 10,
  },
});`
  },
  {
    id: 'firebase-auth',
    title: 'Firebase Authentication',
    filename: 'app/(tabs)/Auth/index.ignite',
    description: 'Complete authentication screen with Firebase integration, form handling, and error management.',
    icon: Database,
    features: [
      'Firebase integration',
      'Async function handling',
      'Form input binding',
      'Error state management',
      'Navigation on success'
    ],
    code: `import firebase from 'firebase'
import { Alert } from 'react-native'

screen title="Login" isTabScreen="true" tabOrder="2" tabIcon="user"

state email=""
state password=""
state loading=false
state user=null
state error=""

async handleLogin() {
  if (!email || !password) {
    setError("Please fill in all fields")
    return
  }
  
  setLoading(true)
  setError("")
  
  try {
    const result = await firebase.auth()
      .signInWithEmailAndPassword(email, password)
    setUser(result.user)
    Alert.alert("Success", "Logged in successfully!")
    go('/profile')
  } catch (error) {
    setError(error.message)
    console.log('Login error:', error)
  }
  
  setLoading(false)
}

async handleSignUp() {
  if (!email || !password) {
    setError("Please fill in all fields")
    return
  }
  
  setLoading(true)
  setError("")
  
  try {
    const result = await firebase.auth()
      .createUserWithEmailAndPassword(email, password)
    setUser(result.user)
    Alert.alert("Success", "Account created successfully!")
    go('/profile')
  } catch (error) {
    setError(error.message)
  }
  
  setLoading(false)
}

clearError() {
  setError("")
}

<View style="container">
  <View style="formContainer">
    <Text style="title">Welcome Back</Text>
    
    {error ? (
      <View style="errorContainer">
        <Text style="errorText">{error}</Text>
        <Button onPress="clearError()" style="errorButton">×</Button>
      </View>
    ) : null}
    
    <Input
      bind="email"
      placeholder="Email address"
      style="input"
      keyboardType="email-address"
      autoCapitalize="none"
      onChangeText={clearError}
    />
    
    <Input
      bind="password"
      placeholder="Password"
      style="input"
      secureTextEntry={true}
      onChangeText={clearError}
    />
    
    <Button 
      onPress="handleLogin()" 
      disabled={loading || !email || !password}
      style="primaryButton"
    >
      {loading ? 'Signing In...' : 'Sign In'}
    </Button>
    
    <Button 
      onPress="handleSignUp()" 
      disabled={loading || !email || !password}
      style="secondaryButton"
    >
      Create Account
    </Button>
  </View>
</View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: '#667eea',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#667eea',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  errorContainer: {
    backgroundColor: '#fee',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorText: {
    color: '#c33',
    flex: 1,
  },
  errorButton: {
    backgroundColor: 'transparent',
    padding: 0,
    marginLeft: 10,
  },
});`
  },
  {
    id: 'api-integration',
    title: 'API Integration & Lists',
    filename: 'app/(tabs)/Posts/index.ignite',
    description: 'Fetch data from APIs, display in lists, handle loading states, and implement pull-to-refresh.',
    icon: Package,
    features: [
      'API data fetching',
      'List rendering with FlatList',
      'Loading and error states',
      'Pull-to-refresh functionality',
      'Empty state handling'
    ],
    code: `import { FlatList, RefreshControl } from 'react-native'

screen title="Posts" isTabScreen="true" tabOrder="3" tabIcon="list"

state posts=[]
state loading=false
state refreshing=false
state error=""

async fetchPosts() {
  setLoading(true)
  setError("")
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await response.json()
    setPosts(data.slice(0, 20)) // Limit to 20 posts
  } catch (error) {
    setError("Failed to fetch posts")
    console.log('Fetch error:', error)
  }
  
  setLoading(false)
}

async handleRefresh() {
  setRefreshing(true)
  await fetchPosts()
  setRefreshing(false)
}

// Fetch posts when screen loads
useEffect(() => {
  fetchPosts()
}, [])

renderPost({ item }) {
  return (
    <View style="postCard">
      <Text style="postTitle">{item.title}</Text>
      <Text style="postBody" numberOfLines={3}>
        {item.body}
      </Text>
      <View style="postFooter">
        <Text style="postId">Post #{item.id}</Text>
        <Text style="postUser">User {item.userId}</Text>
      </View>
    </View>
  )
}

<View style="container">
  <Text style="header">Latest Posts</Text>
  
  {loading && posts.length === 0 ? (
    <View style="centerContent">
      <Text style="loadingText">Loading posts...</Text>
    </View>
  ) : error ? (
    <View style="centerContent">
      <Text style="errorText">{error}</Text>
      <Button onPress="fetchPosts()" style="retryButton">
        Try Again
      </Button>
    </View>
  ) : (
    <FlatList
      data={posts}
      renderItem={renderPost}
      keyExtractor={(item) => item.id.toString()}
      style="list"
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor="#667eea"
        />
      }
      ListEmptyComponent={() => (
        <View style="centerContent">
          <Text style="emptyText">No posts available</Text>
        </View>
      )}
      showsVerticalScrollIndicator={false}
    />
  )}
</View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    color: '#333',
  },
  list: {
    flex: 1,
    paddingHorizontal: 20,
  },
  postCard: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  postBody: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postId: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  postUser: {
    fontSize: 12,
    color: '#667eea',
    fontWeight: '500',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#c33',
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#667eea',
    padding: 15,
    borderRadius: 10,
  },
});`
  },
  {
    id: 'navigation-example',
    title: 'Complex Navigation',
    filename: 'app/Profile/index.ignite',
    description: 'Advanced navigation patterns with parameter passing, nested screens, and navigation guards.',
    icon: Navigation,
    features: [
      'Stack navigation outside tabs',
      'Navigation with parameters',
      'Navigation guards',
      'Deep linking support',
      'Back button handling'
    ],
    code: `import { BackHandler } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

screen title="Profile" headerShown="true"

state user=null
state editing=false
state name=""
state bio=""
state avatar=""

// Get user data from navigation params or storage
useEffect(() => {
  const userData = route.params?.user || getUserFromStorage()
  if (userData) {
    setUser(userData)
    setName(userData.name || "")
    setBio(userData.bio || "")
    setAvatar(userData.avatar || "")
  }
}, [route.params])

// Handle hardware back button on Android
useFocusEffect(
  useCallback(() => {
    const onBackPress = () => {
      if (editing) {
        setEditing(false)
        return true // Prevent default behavior
      }
      return false // Allow default behavior
    }

    BackHandler.addEventListener('hardwareBackPress', onBackPress)
    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress)
  }, [editing])
)

handleEdit() {
  setEditing(true)
}

handleSave() {
  const updatedUser = { ...user, name, bio, avatar }
  setUser(updatedUser)
  saveUserToStorage(updatedUser)
  setEditing(false)
}

handleCancel() {
  if (user) {
    setName(user.name || "")
    setBio(user.bio || "")
    setAvatar(user.avatar || "")
  }
  setEditing(false)
}

goToSettings() {
  go('/settings', { userId: user?.id })
}

goToFollowers() {
  go('/followers', { user })
}

goBack() {
  navigation.goBack()
}

<View style="container">
  <View style="header">
    <Button onPress="goBack()" style="backButton">
      ← Back
    </Button>
    <Text style="headerTitle">Profile</Text>
    <Button onPress="goToSettings()" style="settingsButton">
      Settings
    </Button>
  </View>

  {user ? (
    <View style="profileContainer">
      <View style="avatarContainer">
        <Image 
          source={{ uri: avatar || 'https://via.placeholder.com/150' }}
          style="avatar"
        />
        {editing && (
          <Button onPress="handleAvatarChange()" style="avatarButton">
            Change Photo
          </Button>
        )}
      </View>

      <View style="infoContainer">
        {editing ? (
          <View>
            <Input
              bind="name"
              placeholder="Your name"
              style="editInput"
            />
            <Input
              bind="bio"
              placeholder="Tell us about yourself"
              style="editInput"
              multiline={true}
              numberOfLines={3}
            />
            <View style="editActions">
              <Button onPress="handleSave()" style="saveButton">
                Save Changes
              </Button>
              <Button onPress="handleCancel()" style="cancelButton">
                Cancel
              </Button>
            </View>
          </View>
        ) : (
          <View>
            <Text style="userName">{name || 'Anonymous User'}</Text>
            <Text style="userBio">{bio || 'No bio available'}</Text>
            <Button onPress="handleEdit()" style="editButton">
              Edit Profile
            </Button>
          </View>
        )}
      </View>

      <View style="statsContainer">
        <Button onPress="goToFollowers()" style="statButton">
          <Text style="statNumber">1.2K</Text>
          <Text style="statLabel">Followers</Text>
        </Button>
        <Button onPress="go('/following')" style="statButton">
          <Text style="statNumber">834</Text>
          <Text style="statLabel">Following</Text>
        </Button>
        <Button onPress="go('/posts')" style="statButton">
          <Text style="statNumber">42</Text>
          <Text style="statLabel">Posts</Text>
        </Button>
      </View>
    </View>
  ) : (
    <View style="loadingContainer">
      <Text style="loadingText">Loading profile...</Text>
    </View>
  )}
</View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    backgroundColor: 'transparent',
    color: '#667eea',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  settingsButton: {
    backgroundColor: 'transparent',
    color: '#667eea',
  },
  profileContainer: {
    flex: 1,
    padding: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ddd',
  },
  avatarButton: {
    backgroundColor: '#667eea',
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  userBio: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#667eea',
    padding: 12,
    borderRadius: 10,
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  editActions: {
    flexDirection: 'row',
    gap: 10,
  },
  saveButton: {
    backgroundColor: '#28a745',
    flex: 1,
    padding: 12,
    borderRadius: 10,
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    flex: 1,
    padding: 12,
    borderRadius: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
  },
  statButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
});`
  }
] 